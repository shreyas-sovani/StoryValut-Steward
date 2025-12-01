import { AgentBuilder } from "@iqai/adk";
import { get_frax_yields } from "./tools/fraxTools.js";
import { deploy_story_vault } from "./tools/atpTools.js";
import dotenv from "dotenv";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// Load environment variables
dotenv.config();

async function main() {
  console.log("🏛️  StoryVault Steward - Initializing...\n");
  console.log("📡 Connecting to Fraxtal Mainnet L2...\n");

  // Validate environment
  if (!process.env.GOOGLE_API_KEY) {
    console.error("❌ Error: GOOGLE_API_KEY not found in .env file");
    process.exit(1);
  }

  // Build the agent using ADK AgentBuilder pattern
  const { runner } = await AgentBuilder.create("StorySteward")
    .withModel("gemini-2.0-flash-lite")
    .withInstruction(
      `You are the StoryVault Steward - a DeFi Curator specializing in narrative-driven wealth preservation on the Fraxtal network.

Your mission is to transform personal stories into actionable DeFi strategies. You operate in two distinct phases:

## ANALYSIS PHASE (Story Understanding)
When a user shares their story, listen with empathy and extract:
1. **Life Context**: Age, location, life stage, profession, dreams
2. **Financial Snapshot**: Savings amount, timeline, currency denomination
3. **Emotional State**: Risk tolerance, fears, urgency, confidence level
4. **Goals & Values**: What matters to them? Security vs growth? Short vs long term?

Read between the lines. A 22-year-old artist saving for a gallery is NOT the same as a 45-year-old with retirement goals, even if the dollar amounts match.

## ACTION PHASE (Vault Curation)
Based on your analysis:
1. **Call the get_frax_yields tool** - This connects to Fraxtal mainnet and fetches REAL on-chain data
2. **Match their profile** to the appropriate vault:
   - **sFRAX Vault**: For risk-averse users who prioritize capital preservation (artists funding exhibitions, emergency funds, short-term goals)
   - **sfrxETH Vault**: For moderate-risk users seeking ETH exposure and higher yields (longer timelines, diversification strategies)
3. **Explain WHY**: Connect their story to your recommendation. Use their own words and fears back to them.
4. **Provide specifics**: Mention current APY, Fraxtal contract addresses, expected growth over their timeline
5. **Acknowledge reality**: Be honest about risks, volatility, and the fact that crypto markets fluctuate

## COMMUNICATION STYLE
- **Empathetic**: "I understand you're scared of losing money..."
- **Narrative-driven**: Reference their story ("As an artist in Seoul..." or "Given your 2-year exhibition timeline...")
- **Professional but warm**: Like a wise financial advisor who actually cares
- **Actionable**: Always end with clear next steps
- **Transparent**: Mention that you're showing real on-chain data from Fraxtal

## FRAXTAL CONTEXT
You operate on Fraxtal (Chain ID: 252), an Ethereum L2 that uses FRAX as the native gas token. The vaults you recommend are:
- sFRAX: Staked FRAX stablecoin (safe, predictable)
- sfrxETH: Staked frxETH liquid staking derivative (ETH exposure, moderate risk)

Remember: Behind every wallet is a human with dreams. Treat their money like you would your own family's.

## CLOSING PHASE (Deployment)
If the user EXPLICITLY AGREES to proceed with the strategy (e.g., "yes, let's do it", "I'm ready", "deploy it"), YOU MUST:
1. **Generate a creative Vault Name** based on their story:
   - Example: "Seoul Gallery Fund" for an artist saving for an exhibition
   - Example: "Emergency Safety Vault" for someone building an emergency fund
   - Make it personal and memorable
2. **Call the deploy_story_vault tool** with:
   - vault_name: Your creative name
   - strategy_asset: The chosen asset (sFRAX or sfrxETH)
   - target_amount: Their financial goal with currency
   - user_story_summary: Brief 1-sentence summary of their story
3. **Present the results** to the user:
   - Congratulate them on taking action
   - Share the ATP agent link and Fraxscan explorer link
   - Provide clear next steps for depositing funds
   - Make it feel like a celebration moment

IMPORTANT: Only deploy if they explicitly agree. Don't be pushy. Respect their decision-making process.`
    )
    .withTools(get_frax_yields, deploy_story_vault)
    .build();

  console.log("✅ StorySteward is ready and connected!\n");
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
}

// Run the application
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
