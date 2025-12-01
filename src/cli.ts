import { createStoryStewardAgent } from "./agent.js";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

/**
 * CLI Interface for StoryVault Steward
 * This is the terminal-based chat interface for testing and demos
 */
async function main() {
  console.log("🏛️  StoryVault Steward - CLI Mode\n");
  console.log("📡 Connecting to Fraxtal Mainnet L2...\n");

  try {
    // Create the agent
    const { runner } = await createStoryStewardAgent();

    console.log("\n✅ StorySteward is ready and connected!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("💬 Welcome to StoryVault Steward");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\nI'm here to help you find the perfect DeFi vault on Fraxtal");
    console.log("by understanding YOUR story and YOUR goals.\n");
    console.log("Share your financial story with me:");
    console.log("• Your life situation (age, profession, location)");
    console.log("• How much you've saved and your timeline");
    console.log("• What you're trying to achieve");
    console.log("• Your feelings about risk\n");
    console.log("Type 'exit' to quit anytime.\n");

    // Create readline interface for CLI interaction
    const rl = readline.createInterface({ input, output });

    // Chat loop
    while (true) {
      try {
        const userInput = await rl.question("You: ");

        if (userInput.trim().toLowerCase() === "exit") {
          console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("👋 Thank you for trusting StoryVault Steward.");
          console.log("   May your yields be ever in your favor! 🏛️");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
          rl.close();
          process.exit(0);
        }

        if (!userInput.trim()) {
          continue;
        }

        // Run the agent with user input
        console.log("\n💭 StorySteward is analyzing your story...\n");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        const response = await runner.ask(userInput);
        console.log(response + "\n");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

      } catch (error) {
        console.error("\n❌ Error:", error instanceof Error ? error.message : "Unknown error");
        console.log("Please try again.\n");
      }
    }
  } catch (error) {
    console.error("❌ Failed to initialize agent:", error);
    process.exit(1);
  }
}

// Run the CLI application
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
