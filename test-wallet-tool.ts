/**
 * Test Script for Wallet Awareness Tool
 * 
 * This tests the check_fraxtal_balance tool with real Fraxtal addresses
 */

import { checkFraxtalBalance } from "./src/tools/walletTool.js";
import dotenv from "dotenv";

dotenv.config();

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
      // Call the tool's fn function directly
      const result = await checkFraxtalBalance.fn({
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
    const result = await checkFraxtalBalance.fn({
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
