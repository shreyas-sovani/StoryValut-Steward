/**
 * Test Script for Wallet Awareness Tool
 * 
 * This tests the check_fraxtal_balance tool with real Fraxtal addresses
 */

import { checkFraxtalBalance } from "./src/tools/walletTool.js";
import dotenv from "dotenv";

dotenv.config();

// ============================================================================
// RESILIENT TOOL CALLER
// ============================================================================
// Handles various tool shapes: function, .fn, .run, .execute, .handler, .default
// ============================================================================

function isObject(x: any): x is Record<string, any> {
  return typeof x === "object" && x !== null;
}

async function callTool(tool: any, args: any) {
  // direct function
  if (typeof tool === "function") return await tool(args);

  // if module namespace with default
  if (isObject(tool) && typeof tool.default === "function") {
    return await tool.default(args);
  }

  // common tool shapes (ADK uses 'func', others use 'fn', 'run', 'execute', 'handler')
  const candidates = ["func", "fn", "run", "execute", "handler"];
  for (const k of candidates) {
    if (isObject(tool) && typeof tool[k] === "function") {
      return await tool[k](args);
    }
  }

  // if default is object, recurse
  if (isObject(tool) && isObject(tool.default)) {
    return await callTool(tool.default, args);
  }

  // Debug output to help root-cause if it fails
  console.error("❌ Imported tool shape (not callable):", Object.keys(tool || {}));
  throw new Error("Imported tool has no callable entrypoint (.func/.fn/.run/.execute or function)");
}

// ============================================================================
// TEST SUITE
// ============================================================================

async function testWalletTool() {
  console.log("🧪 Testing Wallet Awareness Tool\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Test addresses
  const testAddresses = [
    {
      name: "Fraxtal Multisig",
      address: "0x8412ebf45bAC1B340BbE8F318b928C466c4E39CA",
      note: "Official Fraxtal treasury address",
    },
    {
      name: "Random Address",
      address: "0x0000000000000000000000000000000000000001",
      note: "Likely empty wallet",
    },
  ];

  for (const test of testAddresses) {
    console.log(`\n📍 Testing: ${test.name}`);
    console.log(`   Address: ${test.address}`);
    console.log(`   Note: ${test.note}\n`);

    try {
      // Call the tool using resilient helper
      const result = await callTool(checkFraxtalBalance, {
        walletAddress: test.address,
      });

      if (result.success) {
        console.log("✅ SUCCESS!");
        console.log("\nBalance Data:");
        console.log(`   FRAX: ${result.balances.frax.amount.toFixed(4)} FRAX`);
        console.log(`   sfrxETH: ${result.balances.sfrxETH.amount.toFixed(6)} sfrxETH`);
        console.log(`\nWarnings:`);
        console.log(`   Low Gas: ${result.warnings.lowGas ? "⚠️  YES" : "✅ NO"}`);
        console.log(`   No Assets: ${result.warnings.noAssets ? "⚠️  YES" : "✅ NO"}`);
        console.log(`\nNetwork Info:`);
        console.log(`   Chain: ${result.network} (Chain ID: ${result.chainId})`);
        console.log(`   Block: ${result.blockNumber}`);
        
        // Show the formatted message
        console.log("\n📄 Agent Message:");
        console.log(result.message);
      } else {
        console.log("❌ ERROR!");
        console.log(`   ${result.error}`);
      }
    } catch (error: any) {
      console.error("❌ Test failed with exception:");
      console.error(`   ${error.message}`);
    }

    console.log("\n" + "━".repeat(80) + "\n");
  }

  // Test invalid address
  console.log("🧪 Testing Invalid Address Format\n");
  try {
    const result = await callTool(checkFraxtalBalance, {
      walletAddress: "invalid-address",
    });
    console.log("Result:", result);
  } catch (error: any) {
    console.log("✅ Correctly rejected invalid address");
    console.log(`   Error: ${error.message}\n`);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Wallet Tool Test Complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

// Run tests
testWalletTool().catch(console.error);
