#!/usr/bin/env tsx
/**
 * Blockchain Connectivity Test
 * Tests real viem connection to Fraxtal mainnet
 */

import { createPublicClient, http, parseAbi, defineChain } from "viem";

const fraxtal = defineChain({
  id: 252,
  name: "Fraxtal",
  nativeCurrency: { decimals: 18, name: "Frax", symbol: "FRAX" },
  rpcUrls: {
    default: { http: ["https://rpc.frax.com"] },
    public: { http: ["https://rpc.frax.com"] },
  },
  blockExplorers: {
    default: { name: "Fraxscan", url: "https://fraxscan.com" },
  },
});

const client = createPublicClient({
  chain: fraxtal,
  transport: http("https://rpc.frax.com"),
});

const SFRXETH_ADDRESS = "0xfc00000000000000000000000000000000000005" as const;

const erc20Abi = parseAbi([
  "function totalSupply() view returns (uint256)",
  "function symbol() view returns (string)",
]);

async function testConnection() {
  console.log("🧪 Testing Fraxtal Mainnet Connection...\n");
  
  try {
    // Test 1: Get latest block
    console.log("📊 Test 1: Fetching latest block number...");
    const blockNumber = await client.getBlockNumber();
    console.log(`✅ Latest block: ${blockNumber}\n`);

    // Test 2: Get sfrxETH symbol
    console.log("📊 Test 2: Reading sfrxETH contract symbol...");
    const symbol = await client.readContract({
      address: SFRXETH_ADDRESS,
      abi: erc20Abi,
      functionName: "symbol",
    });
    console.log(`✅ Token symbol: ${symbol}\n`);

    // Test 3: Get sfrxETH total supply
    console.log("📊 Test 3: Reading sfrxETH totalSupply...");
    const totalSupply = await client.readContract({
      address: SFRXETH_ADDRESS,
      abi: erc20Abi,
      functionName: "totalSupply",
    });
    
    const totalSupplyETH = Number(totalSupply) / 1e18;
    console.log(`✅ Total Supply: ${totalSupplyETH.toLocaleString("en-US")} ETH`);
    console.log(`   Raw value: ${totalSupply.toString()}\n`);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 ALL TESTS PASSED!");
    console.log("✅ Fraxtal mainnet connection verified");
    console.log("✅ sfrxETH contract is accessible");
    console.log("✅ Real-time on-chain data retrieval working");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  } catch (error) {
    console.error("❌ Connection test failed:", error);
    process.exit(1);
  }
}

testConnection();
