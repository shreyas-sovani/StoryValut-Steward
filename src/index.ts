import { AgentBuilder } from "@iqai/adk";
import { get_frax_yields } from "./tools/fraxTools.js";
import dotenv from "dotenv";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// Load environment variables
dotenv.config();

async function main() {
  console.log("🏛️  StoryVault Steward - Initializing...\n");

  // Validate environment
  if (!process.env.GOOGLE_API_KEY) {
    console.error("❌ Error: GOOGLE_API_KEY not found in .env file");
    process.exit(1);
  }

  // Build the agent using ADK AgentBuilder pattern
  const { runner } = await AgentBuilder.create("StorySteward")
    .withModel("gemini-2.0-flash-lite") // Using Gemini 2.0 Flash Lite
    .withInstruction(
      `You are a DeFi steward for the StoryVault platform. Your role is to analyze users' life stories and financial situations to determine their risk profile and recommend appropriate yield strategies on the Fraxtal network.

When a user shares their story:
1. Listen carefully to understand their financial situation, goals, and risk tolerance
2. Identify if they need safe, stable yield (recommend sFRAX) or can handle moderate risk for higher returns (recommend sfrxETH)
3. Use the get_frax_yields tool to check current APY rates
4. Provide personalized recommendations based on their story and the current yields

Be empathetic, clear, and actionable in your advice. Remember that behind every financial decision is a real person with dreams and concerns.`
    )
    .withTools(get_frax_yields)
    .build();

  console.log("✅ StorySteward is ready!\n");
  console.log("💬 Share your story and I'll help you find the best yield strategy on Fraxtal.");
  console.log("   Type 'exit' to quit.\n");

  // Create readline interface for CLI interaction
  const rl = readline.createInterface({ input, output });

  // Chat loop
  while (true) {
    try {
      const userInput = await rl.question("You: ");

      if (userInput.trim().toLowerCase() === "exit") {
        console.log("\n👋 Thank you for using StoryVault Steward. Goodbye!");
        rl.close();
        process.exit(0);
      }

      if (!userInput.trim()) {
        continue;
      }

      // Run the agent with user input
      console.log("\nStorySteward: ");
      const response = await runner.ask(userInput);
      console.log(response + "\n");

    } catch (error) {
      console.error("\n❌ Error:", error instanceof Error ? error.message : "Unknown error");
      console.log("Please try again.\n");
    }
  }
}

// Run the application
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
