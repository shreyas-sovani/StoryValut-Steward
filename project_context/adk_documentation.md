# Get Started
URL: /docs/framework/get-started

Overview of the Agent Development Kit (ADK) for TypeScript

***

title: Get Started
description: Overview of the Agent Development Kit (ADK) for TypeScript
-----------------------------------------------------------------------

import { Cards, Card } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";

<Callout type="warn" title="Work in Progress">
  This is a TypeScript port inspired by the original Python ADK. Features and
  stability are actively being developed.
</Callout>

## What is ADK-TS?

Agent Development Kit (ADK) for TypeScript is a powerful, open-source framework for **building, orchestrating, and deploying AI agents**.

Inspired by the architectural principles of Google's Python ADK, our project is reimagined for the TypeScript ecosystem. We offer first-class support for Google Gemini models while providing the freedom to **integrate with any LLM, tool, or data source**. ADK-TS makes it easy to start with simple agents and scales to support complex, multi-agent systems in any Node.js environment.

### Why Choose ADK-TS?

Our vision is to empower every developer to build intelligent agents with the same confidence as any modern software. We achieve this through three core pillars:

* **Unparalleled Developer Experience:** We are TypeScript-first, providing full type-safety and autocompletion out of the box. Our intuitive `AgentBuilder` API lets you create powerful agents with minimal, readable code.
* **Powerful & Flexible Architecture:** ADK-TS is modular by design. Compose multiple agents, equip them with custom tools, and orchestrate complex workflows. Our provider-agnostic foundation means you're never locked into a single ecosystem.
* **Production-Ready from Day One:** Go beyond prototypes. With built-in session management, persistent memory, and first-class OpenTelemetry support for observability, ADK-TS provides the robust foundation needed for real-world applications.

### What You Can Build

ADK-TS enables a wide range of AI agent applications:

#### Simple Agents

```typescript
// Question answering agent
const response = await AgentBuilder.withModel("gemini-2.5-flash").ask(
  "Explain quantum computing in simple terms"
);
```

**Use cases**: Q\&A bots, content generation, text analysis

#### Tool-Enhanced Agents

```typescript
// Research agent with web search and file operations
const agent = new LlmAgent({
  name: "researcher",
  model: "gemini-2.5-flash",
  tools: [new GoogleSearch(), new FileOperationsTool()],
  instruction: "Research topics thoroughly and cite sources",
});
```

**Use cases**: Research assistants, data analysis, automated reporting

#### Multi-Agent Workflows

```typescript
// Workflow: Research → Analyze → Summarize
const workflow = await AgentBuilder.create("content_pipeline")
  .asSequential([researchAgent, analysisAgent, summaryAgent])
  .build();
```

**Use cases**: Content pipelines, complex analysis, quality assurance

#### Interactive Applications

```typescript
// Persistent chat with memory
const { runner } = await AgentBuilder.create("chat_assistant")
  .withModel("gemini-2.5-flash")
  .withSessionService(sessionService, userId, "chat-app")
  .build();
```

**Use cases**: Chatbots, virtual assistants, customer support

## Core Concepts

ADK-TS is built on a set of powerful, modular concepts that allow you to build sophisticated AI agents with ease. These are the features that make ADK-TS special.

<Cards>
  <Card title="🤖 Flexible Agent Architecture" description="Compose sophisticated agentic workflows using a variety of agent types, from simple LLM agents to complex multi-agent systems." href="/docs/framework/agents" />

  <Card title="🛠️ Extensible Tooling with MCP" description="Connect to a universe of tools and services through the Model Context Protocol (MCP), or create your own custom tools with ease." href="/docs/framework/tools" />

  <Card title="🧠 Multi-LLM Support" description="Leverage multiple language models across providers like OpenAI, Anthropic, Google Gemini, and more with a unified, provider-agnostic API." href="/docs/framework/agents/models" />

  <Card title="🚀 Developer-First Experience" description="Enjoy a seamless development workflow with TypeScript-native APIs, a powerful AgentBuilder, and a CLI for testing and iteration." href="/docs/framework/get-started/quickstart" />

  <Card title="📈 Production-Ready by Design" description="Build robust, scalable applications with built-in session management, OpenTelemetry tracing for observability, and integrated evaluation." href="/docs/framework/sessions/session" />

  <Card title="🌐 Easy to Deploy" description="Deploy your agents anywhere Node.js runs—from serverless functions to containers, edge environments to traditional servers." />
</Cards>

## Next Steps

Ready to start building? Here's how to get started:

<Cards>
  <Card title="🏗️ Installation" description="Set up ADK-TS in your project" href="/docs/framework/get-started/installation" />

  <Card title="⚡ Quickstart" description="Build your first agent in 5 minutes" href="/docs/framework/get-started/quickstart" />
</Cards>

## Community & Support

Join our community for help, discussions, and updates:

<Cards>
  <Card title="💻 GitHub Issues" description="Report bugs, request features, and contribute" href="https://github.com/IQAIcom/adk-ts/issues" target="_blank" rel="noopener noreferrer" />

  <Card title="💬 Discussions" description="Ask questions, share ideas, and get help" href="https://github.com/IQAIcom/adk-ts/discussions" target="_blank" rel="noopener noreferrer" />

  <Card title="💼 Discord" description="Join our Discord server for real-time collaboration and support" href="https://discord.gg/w2Uk6ACK4D" target="_blank" rel="noopener noreferrer" />

  <Card title="📊 Examples" description="Browse working code examples" href="https://github.com/IQAIcom/adk-ts/tree/main/apps/examples" target="_blank" rel="noopener noreferrer" />
</Cards>

# Installation
URL: /docs/framework/get-started/installation

Install ADK-TS and set up your development environment

***

title: Installation
description: Install ADK-TS and set up your development environment
-------------------------------------------------------------------

import { Steps } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";

## Prerequisites

Before you begin, ensure your development environment meets the following requirements:

* **Node.js**: `v22.0` or higher
* **Package Manager**: `npm`, `yarn`, or
  `pnpm`
* **TypeScript**: `v5.3` or higher (optional but recommended)

## Installation Methods

You can install ADK-TS in two ways: using our CLI for a new project, or adding it manually to an existing one.

### Method 1: Use the CLI (Recommended)

The following command will guide you through creating a new project.

```bash
npx @iqai/adk-cli new
```

You can also install the CLI globally and use it from anywhere:

<Tabs items={["npm", "yarn", "pnpm"]}>
  <Tab value="npm">
    ```bash
    npm install -g @iqai/adk-cli
    adk new
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn global add @iqai/adk-cli
    adk new
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add -g @iqai/adk-cli
    adk new
    ```
  </Tab>
</Tabs>

### Method 2: Manual Installation

To add ADK-TS to an existing project, use your preferred package manager:

<Tabs items={['npm', 'yarn', 'pnpm']}>
  <Tab value="npm">
    ```bash
    npm install @iqai/adk
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn add @iqai/adk
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add @iqai/adk
    ```
  </Tab>
</Tabs>

## Common Errors

If you run into trouble, here are a few common issues and their solutions:

<Callout type="warn" title="Node.js Version Mismatch">
  Errors during installation are often caused by an incompatible Node.js
  version. Verify you are using `v22.0` or higher: `node --version`
</Callout>

<Callout type="warn" title="TypeScript Compatibility">
  For TypeScript projects, using a version lower than `v5.3` may cause
  type-related errors. Check your version with: `npx tsc --version`
</Callout>

<Callout type="warn" title="API Key Configuration Issues">
  If you get authentication errors, ensure:

  * You have imported and configured dotenv in your agent file:
    ```typescript
    import * as dotenv from "dotenv";
    dotenv.config();
    ```
  * Your API key is correctly set in the `.env` file
  * You have access to the model you're trying to use
  * The `.env` file is in the project root directory
</Callout>

## Next Steps

Now that you have ADK-TS installed, you're ready to start building. Where to next?

<Cards>
  <Card title="🚀 Quickstart" description="Build your first fully-functional agent and understand the core concepts." href="/docs/framework/get-started/quickstart" />

  <Card title="🤖 Explore Agents" description="Learn about the different types of agents you can build, from simple to complex." href="/docs/framework/agents" />

  <Card title="🛠️ Discover Tools" description="See how to add capabilities to your agents using built-in and custom tools." href="/docs/framework/tools" />

  <Card title="📊 Run Examples" description="Browse working code examples to deepen your understanding." href="https://github.com/IQAIcom/adk-ts/tree/main/apps/examples" target="_blank" rel="noopener noreferrer" />
</Cards>

# Quickstart
URL: /docs/framework/get-started/quickstart

Build your first AI agent with ADK-TS in 5 minutes

***

title: Quickstart
description: Build your first AI agent with ADK-TS in 5 minutes
---------------------------------------------------------------

import { Steps } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

Ready to build your first AI agent? This guide will take you from zero to a working agent with tools in just a few minutes.

<Callout title="Quick Start with CLI">
  Want to skip the manual setup? Use our CLI to create a complete project with examples:

  ```bash
  npx @iqai/adk-cli new
  ```

  This creates a project with working agents already set up and ready to run!

  [Learn more about installation options](/docs/framework/get-started/installation) including adding ADK-TS to existing projects.
</Callout>

## Build Your First Agent

Let's walk through creating your first AI agent step by step.

<Steps>
  ### 1. Set Up a New Project

  Create a new project from scratch:

  ```bash
  mkdir my-first-agent && cd my-first-agent
  pnpm init -y
  pnpm install @iqai/adk tsx typescript dotenv
  npx tsc --init --target ES2022 --module ESNext --moduleResolution bundler --allowImportingTsExtensions --noEmit
  ```

  ### 2. Configure Environment Variables

  Create a `.env` file in your project root with your API key:

  ```bash
  echo "GOOGLE_API_KEY=your_google_api_key_here" > .env
  echo -e ".env\nnode_modules/" > .gitignore
  ```

  <Callout type="warn" title="API Key Required">
    Replace `your_google_api_key_here` with your actual API key from [Google AI
    Studio](https://aistudio.google.com/app/apikey). ADK-TS supports Google Gemini
    models by default.
  </Callout>

  ### 3. Create Your First Agent

  Create a simple agent in `src/agents/assistant/agent.ts`:

  ```typescript
  // src/agents/assistant/agent.ts
  import { AgentBuilder } from "@iqai/adk";
  import * as dotenv from "dotenv";

  dotenv.config();

  export async function agent() {
    return await AgentBuilder.create("assistant")
      .withModel("gemini-2.5-flash")
      .withInstruction("You are a helpful assistant.")
      .build();
  }
  ```

  <Callout type="info" title="Using Different Models">
    You can easily use other LLM models by changing the model parameter:

    ```typescript
    // For OpenAI models
    .withModel("gpt-4o")

    // For Anthropic models
    .withModel("claude-3-5-sonnet")

    ```

    ADK-TS will automatically detect the provider from the model name, but you'll need to set
    the appropriate API key in your `.env` file (e.g., `OPENAI_API_KEY` for OpenAI
    models or `ANTHROPIC_API_KEY` for Anthropic models).

    For advanced LLM configurations, check our [Models
    documentation](/docs/framework/agents/models).
  </Callout>

  ### 4. Test Your Agent

  Now let's test your agent. Create a simple script to interact with it. Add the following to `src/agents/index.ts`:

  ```typescript
  // src/agents/index.ts
  import { agent } from "./assistant/agent";

  async function main() {
  const { runner } = await agent();

  const response = await runner.ask("What is the capital of France?");
  console.log("🤖 Response:", response);
  }

  main().catch(console.error);
  ```

  Run it in your terminal:

  ```bash
  npx tsx src/agents/index.ts
  ```

  You should see something like:

  ```
  🤖 Response: The capital of France is Paris.
  ```

  **Congratulations!** 🎉 You've just created and run your first AI agent.
</Steps>

## Adding Tools to Your Agent

Now let's make your agent more powerful by adding the ability to search the web using our built-in GoogleSearch tool:

<Steps>
  ### 1. Update Your Agent with Tools

  Replace your `src/agents/assistant/agent.ts` with this enhanced version:

  ```typescript
  // src/agents/assistant/agent.ts
  import { AgentBuilder, GoogleSearch } from "@iqai/adk";
  import * as dotenv from "dotenv";

  dotenv.config();

  export async function agent() {
    return await AgentBuilder.create("research_assistant")
      .withModel("gemini-2.5-flash")
      .withDescription(
        "A helpful research assistant with web search capabilities"
      )
      .withInstruction(
        "You are a helpful research assistant. When you need current information " +
          "or want to search for specific topics, use the Google Search tool. " +
          "Always cite your sources when providing information from search results."
      )
      .withTools(new GoogleSearch())
      .build();
  }
  ```

  ### 2. Test the Tool Integration

  Update your test script to ask a question that requires web search:

  ```typescript
  // src/agents/index.ts
  import { agent } from "./assistant/agent";

  async function main() {
    const { runner } = await agent();

    const response = await runner.ask(
      "What are the latest developments in AI technology in 2024?"
    );
    console.log("🤖 Response:", response);
  }

  main().catch(console.error);
  ```

  Run it again:

  ```bash
  npx tsx src/agents/index.ts
  ```

  Your agent will now search the web for current information and provide a more comprehensive, up-to-date answer!

  <Callout type="info" title="Implementation Note">
    The current GoogleSearch implementation returns mock results. Integration with
    actual [Google Search
    API](https://developers.google.com/custom-search/v1/overview) requires
    additional configuration.
  </Callout>
</Steps>

## Using the CLI for Interactive Testing

Instead of writing test scripts, you can interact with your agent directly using our [CLI](/docs/cli). The CLI provides two ways to test your agents:

### Terminal-Based Chat (`adk run`)

For a command-line chat experience, install the CLI globally and start the chat:

```bash
# Install the CLI globally
pnpm install -g @iqai/adk-cli

# Start terminal-based chat with your agent
adk run
```

Or use `npx` without global installation:

```bash
npx @iqai/adk-cli run
```

<Callout type="info" title="Agent Discovery">
  For the CLI to auto-discover your agents, make sure your agent files are
  placed under the `src/agents` directory.
</Callout>

This command will:

* Auto-discover your agent file
* Start an interactive chat session in your terminal
* Allow you to ask questions and see responses in real-time
* Show tool usage and agent reasoning (if applicable)

### Web-Based Interface (`adk web`)

For a more visual chat experience with a web interface, if you have the ADK-TS CLI installed globally, run:

```bash
adk web
```

Or use `npx` without global installation:

```bash
npx @iqai/adk-cli web
```

This command will:

* Launch a local web server with a chat interface
* Display the URL where you can access the web interface ([https://adk-web.iqai.com](https://adk-web.iqai.com))
* Provide a more user-friendly way to test your agent
* Show conversation history and formatting

<Callout type="info" title="No Scripts Required">
  Both `adk run` and `adk web` let you test your agents interactively without
  writing any test scripts. Perfect for quick testing and experimentation!
</Callout>

## Recommended Project Structure

As your project grows, we recommend organizing your code like this:

```
my-agent-project/
├── .env                # Environment variables (API keys)
├── .gitignore          # Don't commit .env files!
├── package.json
├── tsconfig.json
└── src/
    ├── agent.ts        # Main agent export
    ├── main.ts         # Script runner (optional)
    └── tools/          # Custom tools (optional)
        └── customTool.ts
```

For larger projects with multiple agents:

```
my-multi-agent-project/
├── .env
├── package.json
└── src/
    ├── agents/
    │   ├── research-agent/
    │   │   ├── agent.ts
    │   │   └── tools.ts
    │   ├── analysis-agent/
    │   │   ├── agent.ts
    │   │   └── tools.ts
    │   └── coordinator/
    │       └── agent.ts
    └── shared/
    │   └── tools/
    │       └── customTool.ts
    └── main.ts         # Script runner (optional)

```

## Next Steps

Congratulations! You've built your first AI agent and learned how to add tools to it. Here's what to explore next:

<Cards>
  <Card title="🤖 Learn About Agents" description="Explore different types of agents: LLM agents, workflow agents, and multi-agent systems" href="/docs/framework/agents" />

  <Card title="🛠️ Discover More Tools" description="Learn about all built-in tools and how to create custom ones" href="/docs/framework/tools/built-in-tools" />

  <Card title="🔌 MCP Tools" description="Connect to external services and tools through the Model Context Protocol" href="/docs/framework/tools/mcp-tools" />

  <Card title="🧠 Models & Providers" description="Learn how to use different LLM providers and configure model settings" href="/docs/framework/agents/models" />

  <Card title="💾 Sessions & Memory" description="Add persistent conversations and memory to your agents" href="/docs/framework/sessions/session" />

  <Card title="📊 Real Examples" description="See complete working examples with different patterns and use cases" href="https://github.com/IQAIcom/adk-ts/tree/main/apps/examples" target="_blank" rel="noopener noreferrer" />
</Cards>

# LLM Agents
URL: /docs/framework/agents/llm-agents

Create AI-powered agents with language models for reasoning, conversation, and intelligent tool usage

***

title: LLM Agents
description: Create AI-powered agents with language models for reasoning, conversation, and intelligent tool usage
------------------------------------------------------------------------------------------------------------------

import { Cards, Card } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";

`LLMAgent` is the most commonly used agent type in ADK-TS. It leverages Large Language Models (LLMs) for reasoning, understanding natural language, making decisions, and interacting with tools to accomplish complex tasks.

Unlike deterministic workflow agents that follow predefined paths, `LLMAgent` instances are dynamic and context-aware. They interpret instructions, analyze situations, and decide how to proceed - whether that's using tools, transferring control to other agents, or generating responses directly.

## Configuration Options

All `LLMAgent` provides a rich set of configuration options to customize behaviour, capabilities, and integrations. Below is a comprehensive overview of all available options, organized by category. All options are optional unless marked except `name` and `description`.

### Core Configuration

Essential agent identity and model settings.

| Option        | Required | Type                                 | Description                                                   |
| ------------- | -------- | ------------------------------------ | ------------------------------------------------------------- |
| `name`        | ✅        | `string`                             | Unique identifier for your agent                              |
| `description` | ✅        | `string`                             | Brief description of your agent's capabilities                |
| `model`       | ❌\*      | `string \| BaseLlm \| LanguageModel` | LLM model you want to use (\*inherits from parent if not set) |

### Instructions

Define agent behavior and communication patterns.

| Option              | Type                            | Description                                    |
| ------------------- | ------------------------------- | ---------------------------------------------- |
| `instruction`       | `string \| InstructionProvider` | Primary behaviour instructions                 |
| `globalInstruction` | `string \| InstructionProvider` | Global instructions for your entire agent tree |

### Input/Output Configuration

Control data validation, response formatting, and LLM generation parameters.

| Option                  | Type                    | Description                               |
| ----------------------- | ----------------------- | ----------------------------------------- |
| `inputSchema`           | `ZodSchema`             | Input validation schema                   |
| `outputSchema`          | `ZodSchema`             | Output validation schema                  |
| `outputKey`             | `string`                | Session state key for your agent's output |
| `includeContents`       | `"default" \| "none"`   | Context inclusion behaviour               |
| `generateContentConfig` | `GenerateContentConfig` | LLM generation parameters                 |

### Tools & Execution

External capabilities and code execution:

| Option         | Type               | Description                     |
| -------------- | ------------------ | ------------------------------- |
| `tools`        | `ToolUnion[]`      | Tools available for your agent  |
| `planner`      | `BasePlanner`      | Planning and reasoning strategy |
| `codeExecutor` | `BaseCodeExecutor` | Code execution capability       |

### Multi-Agent Configuration

Configure agent hierarchies and delegation behavior.

| Option                     | Type          | Description                    |
| -------------------------- | ------------- | ------------------------------ |
| `subAgents`                | `BaseAgent[]` | Sub-agents for delegation      |
| `disallowTransferToParent` | `boolean`     | Disable parent agent transfers |
| `disallowTransferToPeers`  | `boolean`     | Disable peer agent transfers   |

### Callback Hooks

Hooks for monitoring, logging, analytics, and custom processing at key execution points.

| Option                | Type                  | Description               |
| --------------------- | --------------------- | ------------------------- |
| `beforeAgentCallback` | `BeforeAgentCallback` | Pre-execution hooks       |
| `afterAgentCallback`  | `AfterAgentCallback`  | Post-execution hooks      |
| `beforeModelCallback` | `BeforeModelCallback` | Pre-LLM call hooks        |
| `afterModelCallback`  | `AfterModelCallback`  | Post-LLM call hooks       |
| `beforeToolCallback`  | `BeforeToolCallback`  | Pre-tool execution hooks  |
| `afterToolCallback`   | `AfterToolCallback`   | Post-tool execution hooks |

### Session and Service Options

Session management and external service integrations.

| Option            | Type                  | Description                  |
| ----------------- | --------------------- | ---------------------------- |
| `userId`          | `string`              | User identifier for sessions |
| `appName`         | `string`              | Application identifier       |
| `memoryService`   | `BaseMemoryService`   | Long-term memory storage     |
| `sessionService`  | `BaseSessionService`  | Conversation management      |
| `artifactService` | `BaseArtifactService` | File storage and management  |

## Configuration Options Details

### name & description (Required)

**Type:** `string` (both)

A unique identifier and brief description for your agent. Both are required fields that work together to define your agent's identity and capabilities.

The `name` must follow JavaScript identifier rules (start with letter/underscore, contain only letters, numbers, underscores). In multi-agent systems, the LLM uses these names to route tasks to specialists.

The `description` should be specific about your agent's capabilities to differentiate from sibling agents in multi-agent systems.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "weather_agent", // ✅ Valid
  // name: "user", // ❌ Reserved keyword
  // name: "123agent", // ❌ Cannot start with number
  description:
    "Provides current weather conditions and forecasts for any city worldwide",
});
```

### model

**Type:** `string | BaseLlm | LanguageModel` | **Default:** Inherited from parent

Choose the LLM that powers your agent's reasoning and text generation. You can provide a string identifier ("gemini-2.0-flash"), `BaseLlm` instance, or `LanguageModel` object.

Your agent inherits the model from its parent if you omit this. Your model choice significantly affects its quality, speed, and cost, so choose wisely. See [Models & Providers](/docs/framework/agents/models) for details.

```ts
import { LlmAgent, OpenAiLlm } from "@iqai/adk";

// String identifier
export const agent1 = new LlmAgent({
  name: "agent1",
  description: "An agent that uses Gemini 2.0 Flash",
  model: "gemini-2.0-flash-exp",
});

// Custom LLM instance
const customLlm = new OpenAiLlm("gpt-4o");

export const agent2 = new LlmAgent({
  name: "agent2",
  description: "An agent that uses a custom OpenAI LLM instance",
  model: customLlm,
});
```

### instruction

**Type:** `string | InstructionProvider` | **Default:** `""`

Primary instructions that shape how your agent responds, makes decisions, and interacts. This is your most important configuration that transforms a generic LLM into a specialized agent.

Instructions can be static strings or dynamic functions that define role, communication style, and tool usage. See [Agent Instructions Guide](/docs/framework/guides/agent-instructions) for best practices.

```ts
import { LlmAgent } from "@iqai/adk";

// Static instruction
export const agent1 = new LlmAgent({
  name: "translator",
  description: "Professional translator that preserves meaning and tone",
  instruction:
    "You are a professional translator. Translate text to the requested language while preserving meaning and tone.",
});

// Dynamic instruction with context
export const agent2 = new LlmAgent({
  name: "personalized_assistant",
  description: "Personalized assistant that adapts to user communication style",
  instruction: (ctx) =>
    `You are assisting user ${ctx.sessionId}. Adapt to their communication preferences.`,
});

// Template with state interpolation
export const agent3 = new LlmAgent({
  name: "location_agent",
  description: "Location-aware assistant that provides local context",
  instruction:
    "You help users in {user_city}. Use local context when relevant.",
});
```

### globalInstruction

**Type:** `string | InstructionProvider` | **Default:** `""`

System-wide instructions that apply to all agents in your hierarchy. These only take effect when you set them on the root agent and cascade to sub-agents.

Use these for organization-wide policies like "Always prioritize user safety" or "Never provide financial advice".

```ts
import { LlmAgent } from "@iqai/adk";

const customerServiceAgent = new LlmAgent({
  name: "customer_service_agent",
  description:
    "Specialized agent for handling customer service inquiries and support requests",
  instruction:
    "Help customers with questions, complaints, and requests professionally. Prioritize satisfaction and escalate when needed.",
});

const technicalSupportAgent = new LlmAgent({
  name: "technical_support_agent",
  description:
    "Specialized agent for providing technical support and troubleshooting assistance",
  instruction:
    "Help users with technical issues, provide troubleshooting guidance, and offer clear solutions.",
});

export const rootAgent = new LlmAgent({
  name: "root_agent",
  description:
    "Root coordinator agent that manages customer service operations",
  globalInstruction:
    "Always prioritize user safety. Never provide harmful information. Escalate sensitive requests appropriately.",
  subAgents: [customerServiceAgent, technicalSupportAgent],
});
```

### inputSchema & outputSchema

**Type:** `ZodSchema` | **Default:** `undefined`

Defines Zod schemas that enforce input validation and structured output formatting.

Input schemas validate incoming data before your agent processes it.

Output schemas force structured JSON responses but disable tool usage, making them perfect for data transformation, classification, and API integrations.

```ts
import { LlmAgent } from "@iqai/adk";
import { z } from "zod";

const InputSchema = z.object({
  text: z.string(),
  language: z.string(),
});

const OutputSchema = z.object({
  translation: z.string(),
  confidence: z.number(),
});

export const translatorAgent = new LlmAgent({
  name: "translator",
  description: "Translation agent with structured input/output validation",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  instruction: "Translate text and provide confidence score.",
});
```

### outputKey

**Type:** `string` | **Default:** `undefined`

Specifies a session state key where your agent's output will be stored, enabling inter-agent communication and workflow coordination.

This becomes essential for multi-step processes like "research → analysis → report generation" where agents need to build on previous results.

```ts
import { LlmAgent } from "@iqai/adk";

export const analysisAgent = new LlmAgent({
  name: "data_analyzer",
  description: "Data analysis agent that stores results for other agents",
  outputKey: "analysis_results",
  instruction:
    "Analyze the provided data and store results for other agents to use.",
});

// Later, another agent can access: ctx.session.state.analysis_results
```

### includeContents

**Type:** `"default" | "none"` | **Default:** `"default"`

Controls whether conversation history is included in LLM requests. Use "default" to include history and enable contextual responses.

Set this to "none" to create stateless agents, which is useful for privacy-sensitive scenarios, computational tasks, or high-throughput apps where you want to optimize costs.

```ts
import { LlmAgent } from "@iqai/adk";

// Stateless agent (no conversation history)
export const statelessAgent = new LlmAgent({
  name: "calculator",
  description: "Stateless calculator agent for mathematical operations",
  includeContents: "none",
});

// Stateful agent (includes history)
export const chatAgent = new LlmAgent({
  name: "assistant",
  description: "Conversational assistant that maintains context",
  includeContents: "default", // Default behavior
});
```

### generateContentConfig

**Type:** `GenerateContentConfig` | **Default:** `undefined`

Fine-tune LLM parameters including `temperature` (creativity vs consistency), `maxOutputTokens` (response length), `topP`/`topK` (randomness), and safety settings.

Use `temperature` 0.1 for factual responses or 0.9 for creative writing. Proper parameter tuning can dramatically improve your agent's response quality.

```ts
import { LlmAgent } from "@iqai/adk";

export const creativeAgent = new LlmAgent({
  name: "creative_writer",
  description:
    "Creative writing agent with high temperature for imaginative content",
  generateContentConfig: {
    temperature: 0.9, // High creativity
    maxOutputTokens: 1000, // Longer responses
    topP: 0.95, // Nucleus sampling
    topK: 40, // Top-k sampling
  },
});

export const preciseAgent = new LlmAgent({
  name: "fact_checker",
  description: "Fact-checking agent with low temperature for precise responses",
  generateContentConfig: {
    temperature: 0.1, // Low creativity, high precision
    maxOutputTokens: 200, // Concise responses
  },
});
```

### tools

**Type:** `ToolUnion[]` | **Default:** `[]`

An array of tools that extend your agent's capabilities beyond text generation, enabling API calls, calculations, external systems, and code execution.

You can provide `BaseTool` instances, `FunctionTool` wrappers, or raw functions. The LLM decides when to use tools based on context. See [Tools documentation](/docs/framework/tools).

```ts
import { LlmAgent, GoogleSearch, FunctionTool } from "@iqai/adk";

// Define a database search function
const searchDatabase = async (query: string) => {
  // Mock database search implementation
  return { results: ["result1", "result2"], count: 2 };
};

// Mixed tool types
export const agent = new LlmAgent({
  name: "research_agent",
  description: "Research agent with web search and calculation capabilities",
  tools: [
    new GoogleSearch(), // Built-in tool
    new FunctionTool((expression: string) => eval(expression), {
      // WARNING: In production, use a safe math parser instead of eval() due to security risks.
      name: "calculate",
      description: "Perform mathematical calculations",
    }),
    new FunctionTool(searchDatabase, {
      name: "search_database",
      description: "Search internal database for relevant information",
    }),
  ],
});
```

### planner

**Type:** `BasePlanner` | **Default:** `undefined`

Provides strategic planning capabilities for complex, multi-step problems. Your agent can break tasks into subtasks, create execution strategies, and adapt based on results.

This becomes essential for sophisticated workflows like project management where agents need to maintain context between steps and coordinate multiple actions over time.

```ts
import { LlmAgent, PlanReActPlanner } from "@iqai/adk";

export const projectAgent = new LlmAgent({
  name: "project_manager",
  description:
    "Project manager agent that creates and executes strategic plans",
  instruction:
    "Break down complex projects into actionable steps and execute them systematically.",
  planner: new PlanReActPlanner(),
});
```

### codeExecutor

**Type:** `BaseCodeExecutor` | **Default:** `undefined`

Enables your agent to execute code using the model's built-in code execution capabilities. This is particularly powerful for data analysis, calculations, visualizations, and dynamic problem solving with Gemini 2.0+ models.

This transforms your agents from conversational interfaces into programming assistants that can actually execute solutions rather than just describing them.

```ts
import { LlmAgent, BuiltInCodeExecutor } from "@iqai/adk";

export const dataAgent = new LlmAgent({
  name: "data_analyst",
  description:
    "Data analyst agent capable of executing Python code for analysis",
  codeExecutor: new BuiltInCodeExecutor(),
  instruction:
    "Analyze data and create visualizations using Python. Execute code to provide accurate results.",
});
```

### subAgents

**Type:** `BaseAgent[]` | **Default:** `[]`

Child agents that enable task delegation and hierarchical architectures. You can create coordinator agents that route to specialists or build complex workflows.

Each sub-agent can have its own tools, models, and instructions while the parent makes delegation decisions based on task requirements. See [Multi-Agent Systems](/docs/framework/agents/multi-agents).

```ts
import { LlmAgent } from "@iqai/adk";

const emailAgent = new LlmAgent({
  name: "email_specialist",
  description: "Specialist agent for handling email-related tasks",
});
const calendarAgent = new LlmAgent({
  name: "calendar_specialist",
  description: "Specialist agent for managing calendar and scheduling tasks",
});

export const assistantAgent = new LlmAgent({
  name: "personal_assistant",
  description:
    "Personal assistant that coordinates email and calendar specialists",
  instruction:
    "Route email tasks to the email specialist and calendar tasks to the calendar specialist.",
  subAgents: [emailAgent, calendarAgent],
});
```

### disallowTransferToParent

**Type:** `boolean` | **Default:** `false`

Controls whether your agent can transfer conversations to parent agents (escalation). Disabling this creates isolated agents for security-sensitive scenarios.

Enabling transfers allows dynamic routing but can reduce predictability.

```ts
import { LlmAgent } from "@iqai/adk";

export const restrictedAgent = new LlmAgent({
  name: "secure_agent",
  description: "Security-focused agent with restricted transfer capabilities",
  disallowTransferToParent: true, // Cannot escalate to parent agents
  instruction:
    "Handle all requests independently without transferring control.",
});
```

### disallowTransferToPeers

**Type:** `boolean` | **Default:** `false`

Controls whether your agent can transfer conversations to peer agents (delegation). Disabling this creates isolated agents for security-sensitive scenarios.

Enabling transfers allows dynamic routing but can reduce predictability.

```ts
import { LlmAgent } from "@iqai/adk";

export const restrictedAgent = new LlmAgent({
  name: "secure_agent",
  description: "Security-focused agent with restricted transfer capabilities",
  disallowTransferToPeers: true, // Cannot delegate to sibling agents
  instruction:
    "Handle all requests independently without transferring control.",
});
```

### beforeAgentCallback

**Type:** `BeforeAgentCallback` | **Default:** `undefined`

Pre-execution hooks that allow you to monitor and control agent execution before it starts.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with pre-execution monitoring",
  beforeAgentCallback: (ctx) => {
    console.log(`Starting agent: ${ctx.agentName}`);
    // Return content to skip agent execution, or undefined to continue
    return undefined;
  },
});
```

### afterAgentCallback

**Type:** `AfterAgentCallback` | **Default:** `undefined`

Post-execution hooks that allow you to monitor agent execution after it completes.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with post-execution monitoring",
  afterAgentCallback: (ctx) => {
    console.log(`Completed agent: ${ctx.agentName}`);
    // Return content to skip agent execution, or undefined to continue
    return undefined;
  },
});
```

### beforeModelCallback

**Type:** `BeforeModelCallback` | **Default:** `undefined`

Pre-LLM call hooks that allow you to monitor and control LLM requests.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with LLM request monitoring",
  beforeModelCallback: ({ callbackContext, llmRequest }) => {
    console.log("Calling LLM with:", llmRequest.contents);
    // Return LlmResponse to skip model call, or undefined to continue
    return undefined;
  },
});
```

### afterModelCallback

**Type:** `AfterModelCallback` | **Default:** `undefined`

Post-LLM call hooks that allow you to monitor LLM responses.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with LLM response monitoring",
  afterModelCallback: ({ callbackContext, llmResponse }) => {
    console.log("LLM responded:", llmResponse.content);
    // Return content to skip agent execution, or undefined to continue
    return undefined;
  },
});
```

### beforeToolCallback

**Type:** `BeforeToolCallback` | **Default:** `undefined`

Pre-tool execution hooks that allow you to monitor and control tool calls.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with tool execution monitoring",
  beforeToolCallback: (tool, args, ctx) => {
    console.log(`Calling tool: ${tool.name}`);
    // Return content to skip tool execution, or undefined to continue
    return undefined;
  },
});
```

### afterToolCallback

**Type:** `AfterToolCallback` | **Default:** `undefined`

Post-tool execution hooks that allow you to monitor tool responses.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "monitored_agent",
  description: "Agent with tool response monitoring",
  afterToolCallback: (tool, args, ctx, response) => {
    console.log(`Tool ${tool.name} returned:`, response);
    // Return content to skip agent execution, or undefined to continue
    return undefined;
  },
});
```

### userId

**Type:** `string` | **Default:** `undefined`

Provides user identifier that enables session management, analytics, personalization, and multi-tenancy capabilities.

The `userId` enables user-specific customization and privacy compliance.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "user_agent",
  description: "User-specific agent with session tracking",
  userId: "user_12345",
});
```

### appName

**Type:** `string` | **Default:** `undefined`

Provides file storage and management for documents, images, and generated content. This becomes crucial for agents that work with files across multiple conversations.

You can configure this service to handle various file types, versioning, access controls, and cloud storage integration.

```ts
import { LlmAgent, InMemoryArtifactService } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "document_agent",
  description: "Document management agent with file storage capabilities",
  artifactService: new InMemoryArtifactService(),
  instruction:
    "Help users manage and analyze documents. Save important files for future reference.",
});
```

### appName

**Type:** `string` | **Default:** `undefined`

Provides application identifier that enables application-level configuration and billing separation.

```ts
import { LlmAgent } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "app_agent",
  description: "Application-specific agent",
  appName: "my_assistant_app",
});
```

### memoryService

**Type:** `BaseMemoryService` | **Default:** `undefined`

Provides long-term memory storage for persisting information across conversations and sessions. Your agent can store user facts, preferences, history, and learned insights.

This is particularly valuable for personal assistants and customer service where your agents automatically query relevant memories. See [Sessions & Memory](/docs/framework/sessions/session).

```ts
import { LlmAgent, InMemoryMemoryService } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "knowledge_agent",
  description: "Knowledge agent with long-term memory capabilities",
  memoryService: new InMemoryMemoryService(),
  instruction:
    "Remember important facts about users and reference them in future conversations.",
});
```

### sessionService

**Type:** `BaseSessionService` | **Default:** `undefined`

Manages conversation state, message history, and ephemeral data during a single session. It handles the LLM context and tracks intermediate results between agent calls.

`AgentBuilder` provides this automatically, but you can customize it for multi-tenant apps or custom storage needs. See [Sessions & Memory](/docs/framework/sessions/session).

```ts
import { LlmAgent, InMemorySessionService } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "chat_agent",
  description: "Chat agent with custom session management",
  sessionService: new InMemorySessionService(),
  instruction: "Manage chat sessions and user interactions effectively.",
});
```

### artifactService

**Type:** `BaseArtifactService` | **Default:** `undefined`

Provides file storage and management for documents, images, and generated content. This becomes crucial for agents that work with files across multiple conversations.

You can configure this service to handle various file types, versioning, access controls, and cloud storage integration.

```ts
import { LlmAgent, InMemoryArtifactService } from "@iqai/adk";

export const agent = new LlmAgent({
  name: "document_agent",
  description: "Document management agent with file storage capabilities",
  artifactService: new InMemoryArtifactService(),
  instruction:
    "Help users manage and analyze documents. Save important files for future reference.",
});
```

## Complete Configuration Example

Here's a comprehensive example of a **Research Analyst Agent** that demonstrates comprehensive configuration for a specialized use case:

```ts
import {
  LlmAgent,
  FunctionTool,
  GoogleSearch,
  InMemoryMemoryService,
  InMemorySessionService,
  AgentBuilder,
} from "@iqai/adk";
import { z } from "zod";
import { config } from "dotenv";

//  Load environment variables from .env file
config();

// Define structured input/output schemas
const AnalysisRequestSchema = z.object({
  topic: z.string(),
  depth: z.enum(["brief", "detailed", "comprehensive"]),
  format: z.enum(["summary", "report", "presentation"]),
});

const AnalysisResponseSchema = z.object({
  topic: z.string(),
  summary: z.string(),
  keyFindings: z.array(z.string()),
  data: z.record(z.string(), z.any()),
  confidence: z.number(),
  sources: z.array(z.string()),
  recommendations: z.array(z.string()),
});

// Custom analysis tools
const analyzeData = (data: any[]) => {
  const stats = {
    count: data.length,
    average: data.reduce((a, b) => a + b, 0) / data.length,
    min: Math.min(...data),
    max: Math.max(...data),
  };
  return stats;
};

const generateReport = (findings: any) => {
  return `# Analysis Report\n\n${JSON.stringify(findings, null, 2)}`;
};

// Research Analyst Agent
const researchAnalyst = new LlmAgent({
  name: "research_analyst",
  description:
    "Specialized agent for research, data analysis, and structured reporting",

  // Core model configuration
  model: "gemini-2.0-flash-exp",

  // Dynamic instructions with context awareness
  instruction: (ctx) => `
    You are an expert research analyst. Your expertise includes:
    - Web research and information gathering
    - Data analysis and statistical processing
    - Structured report generation
    - Critical evaluation of sources and findings

    Current user: ${ctx.state.userProfile?.name || "Researcher"}
    Previous analyses: ${ctx.state.completedAnalyses?.length || 0} completed

    Always provide evidence-based conclusions with confidence scores.
    Use tools strategically and explain your analytical process.
  `,

  // Tool integration for enhanced capabilities
  tools: [
    new GoogleSearch(),
    new FunctionTool(analyzeData, {
      name: "analyze_dataset",
      description: "Perform statistical analysis on numerical datasets",
    }),
    new FunctionTool(generateReport, {
      name: "format_report",
      description: "Generate formatted analysis reports from findings",
    }),
  ],

  // Persistence and memory
  memoryService: new InMemoryMemoryService(),
  sessionService: new InMemorySessionService(),

  // Structured I/O validation
  inputSchema: AnalysisRequestSchema,
  outputSchema: AnalysisResponseSchema,

  // Optimized generation parameters
  generateContentConfig: {
    temperature: 0.2, // Low creativity for analytical accuracy
    maxOutputTokens: 2000,
    topP: 0.9,
    topK: 30,
  },

  // Session state management
  outputKey: "analysis_result",
  userId: "analyst_user",
  appName: "research_suite",

  // Monitoring and logging
  beforeAgentCallback: (ctx) => {
    console.log(`🔍 Starting analysis for: ${ctx.agentName}`);
    return undefined;
  },

  afterAgentCallback: (ctx) => {
    console.log(
      `✅ Analysis completed for ${ctx.agentName} - stored in session state`
    );
    return undefined;
  },
});

// Build and use the agent
async function initializeAgent() {
  const { runner } = await AgentBuilder.create()
    .withModel("gemini-2.0-flash")
    .withAgent(researchAnalyst)
    .build();

  // Example usage with structured input
  const result = await runner.ask(
    "Analyze the impact of renewable energy adoption on global carbon emissions"
  );

  // Parse the structured JSON response
  const analysis = JSON.parse(result);
  console.log("Analysis Summary:", analysis.summary);
  console.log("Key Findings:", analysis.keyFindings);
  console.log("Confidence Score:", analysis.confidence);
}

// Initialize the agent
initializeAgent().catch(console.error);
```

This example demonstrates a **focused, production-ready research analyst** with:

* **Specialized Purpose**: Research and data analysis with structured outputs
* **Comprehensive Configuration**: All major options in a practical context
* **Real-world Tools**: Web search, data analysis, and report generation
* **Production Features**: Memory, planning, monitoring, and error handling
* **Type Safety**: Full Zod schema validation for inputs and outputs
* **Best Practices**: Proper error handling, logging, and state management

<Callout type="info" title="Key Benefits of This Approach">
  - **Focused**: Each configuration option serves the research analysis purpose
  - **Comprehensive**: Shows advanced features without overwhelming complexity -
    **Production-Ready**: Includes monitoring, persistence, and error handling -
    **Extensible**: Easy to add new analysis tools or modify behavior -
    **Type-Safe**: Full TypeScript support with schema validation
</Callout>

## Related Topics

<Cards>
  <Card title="🤖 Models & Providers" description="Configure LLM models, providers, and generation settings" href="/docs/framework/agents/models" />

  <Card title="🛠️ Tools" description="Available tools, agent tools, and how to create custom tools" href="/docs/framework/tools" />

  <Card title="🧠 Sessions & Memory" description="Manage conversation state, memory, and session persistence" href="/docs/framework/sessions/session" />

  <Card title="👥 Multi-Agent Systems" description="Coordinate agents, delegate tasks, and use system-wide instructions" href="/docs/framework/agents/multi-agents" />

  <Card title="📋 Callbacks" description="Hook into agent execution for monitoring and control" href="/docs/framework/callbacks" />

  <Card title="🔧 Agent Builder" description="Fluent API for rapid agent creation and configuration" href="/docs/framework/agents/agent-builder" />
</Cards>

# Models & Providers
URL: /docs/framework/agents/models

Configure LLM models from Gemini, OpenAI, Anthropic, and other providers with ADK-TS agents

***

title: Models & Providers
description: Configure LLM models from Gemini, OpenAI, Anthropic, and other providers with ADK-TS agents
--------------------------------------------------------------------------------------------------------

import { Cards, Card } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";

ADK-TS provides flexible model integration, allowing you to use various Large Language Models (LLMs) with your agents. The framework defaults to Google Gemini models but supports extensive customization through two main approaches.

## Model Integration Options

ADK-TS supports two primary ways to configure models:

<Cards>
  <Card title="🎯 Option 1: Direct Model Names" description="Pass model names directly to agents. Gemini is default, others require environment configuration" />

  <Card title="🔌 Option 2: Vercel AI SDK" description="Use model instances from Vercel AI SDK for extensive provider support" />
</Cards>

## Option 1: Direct Model Names

The simplest approach - pass model names as strings directly to your agents. ADK-TS defaults to **Gemini models** but supports other providers when properly configured.

### Default: Google Gemini Models (Easiest Setup)

**For Gemini models (default), you only need to set the API key:**

```bash
# .env file
GOOGLE_API_KEY=your_google_api_key_here
```

That's it! You can now use Gemini models with agents. The framework defaults to `gemini-2.0-flash`:

```ts
import { LlmAgent } from "@iqai/adk";

// Uses default Gemini model (gemini-2.0-flash)
const agent = new LlmAgent({
  name: "my_agent",
  description: "An agent using the default Gemini model",
  instruction: "You are a helpful assistant",
});

// Use a different Gemini model
const advancedAgent = new LlmAgent({
  name: "advanced_agent",
  description: "Using a more powerful Gemini model",
  model: "gemini-2.5-pro", // Just pass the model name
  instruction: "You are an expert analyst",
});

export { agent, advancedAgent };
```

### Using Other Providers or Different Gemini Models

To use **non-Gemini models or change the default Gemini model**, you must configure both the model name and API key:

**1. Set both the model name and corresponding API key in your `.env` file:**

```bash
# .env file
# For OpenAI:
LLM_MODEL=gpt-4o
OPENAI_API_KEY=your_openai_api_key_here

# Or for Claude:
LLM_MODEL=claude-sonnet-4-5-20250929
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Or for Groq:
LLM_MODEL=llama-3.3-70b-versatile
GROQ_API_KEY=your_groq_api_key_here

# Or for a different Gemini model:
LLM_MODEL=gemini-2.5-pro
GOOGLE_API_KEY=your_google_api_key_here
```

**2. Use the model in your agents:**

```ts
import { LlmAgent } from "@iqai/adk";

const { LLM_MODEL } = process.env;

// Using environment-configured model
const agent = new LlmAgent({
  name: "my_agent",
  model: LLM_MODEL, // Will use whatever is set in .env
  instruction: "You are a helpful assistant",
});

// Or directly specify a model name
const openAiAgent = new LlmAgent({
  name: "openai_agent",
  model: "gpt-4o", // Direct model name
  instruction: "You are an expert assistant",
});

export { agent, openAiAgent };
```

## How It Works

The framework is **smart enough to automatically detect which LLM provider to use** based on the model name you pass. Just set the API key for that provider and pass the model name - the framework handles the rest!

* **Default Gemini**: Only need `GOOGLE_API_KEY` (framework defaults to `gemini-2.0-flash`)
* **Different model**: Set the corresponding API key and pass the model name (e.g., `model: "gpt-4o"`, `model: "claude-3-5-sonnet-20241022"`)
* **Provider detection**: Framework automatically recognizes OpenAI, Claude, Groq, and other providers from the model name

## Option 2: Vercel AI SDK Integration

For more control and advanced features, use model instances from the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction). This approach provides access to multiple providers with consistent APIs and advanced capabilities.

### Setup Requirements

**1. Install Provider Packages:**

```bash
# Install the providers you want to use
npm install @ai-sdk/openai      # For OpenAI models
npm install @ai-sdk/anthropic   # For Anthropic models
npm install @ai-sdk/mistral     # For Mistral models
```

**2. Configure API Keys:**

```bash
# .env file
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
```

**3. Use Model Instances:**

```typescript
import { LlmAgent } from "@iqai/adk";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { mistral } from "@ai-sdk/mistral";

// OpenAI models
const gpt4Agent = new LlmAgent({
  name: "gpt4_agent",
  description: "GPT-4 powered assistant",
  model: openai("gpt-4o"),
  instruction: "You are a helpful assistant",
});
// Anthropic models
const claudeAgent = new LlmAgent({
  name: "claude_agent",
  description: "Claude powered assistant",
  model: anthropic("claude-3-5-sonnet-20241022"),
  instruction: "You are a helpful assistant",
});
// Mistral models
const mistralAgent = new LlmAgent({
  name: "mistral_agent",
  description: "Mistral powered assistant",
  model: mistral("mistral-large-latest"),
  instruction: "You are a helpful assistant",
});
```

### Supported Providers

<Cards>
  <Card title="🤖 OpenAI" description="GPT-4o, GPT-4, GPT-3.5, and latest ChatGPT models" />

  <Card title="🧠 Anthropic" description="Claude 3.5 Sonnet, Claude 3 Opus, and Haiku models" />

  <Card title="🔥 Mistral" description="Mistral Large, Codestral, and specialized models" />

  <Card title="⚡ Groq" description="Ultra-fast inference for Llama, Mixtral, and Gemma models" />

  <Card title="🌐 Many Others" description="Google, Perplexity, Cohere, and other providers" />
</Cards>

The Vercel AI SDK supports many more providers beyond what's shown here. Check the [official documentation](https://ai-sdk.dev/providers) for the complete list of supported providers and models.

<Callout type="info" title="Local & Open Source Models">
  Local and open source models (like Ollama, self-hosted models) are also
  supported through the Vercel AI SDK approach. Install the appropriate provider
  package (`@ai-sdk/ollama`, etc.) and configure as needed. Note that not all
  local models support function calling reliably.
</Callout>

## Which Option Should You Choose?

| Use Case                 | Recommended Option        | Why                                        |
| ------------------------ | ------------------------- | ------------------------------------------ |
| **Getting Started**      | Option 1 (Gemini default) | Simple setup, just need GOOGLE\_API\_KEY   |
| **Production Apps**      | Option 1 with env config  | Simple, reliable, fewer dependencies       |
| **Multi-Provider**       | Option 2 (Vercel AI SDK)  | Unified interface, consistent APIs         |
| **Advanced Features**    | Option 2 (Vercel AI SDK)  | Streaming, advanced config, type safety    |
| **Local/Private Models** | Option 2 (Vercel AI SDK)  | Only option that supports local deployment |

## Next Steps

<Cards>
  <Card title="🤖 Create Your First LLM Agent" description="Learn how to use models with LLM agents and get started building" href="/docs/framework/agents/llm-agents" />

  <Card title="🔧 Use Agent Builder" description="Rapidly create agents with the fluent API and model configuration" href="/docs/framework/agents/agent-builder" />

  <Card title="🛠️ Add Tools to Your Agents" description="Integrate tools with different model types for enhanced capabilities" href="/docs/framework/tools" />

  <Card title="👥 Build Multi-Agent Systems" description="Coordinate multiple agents with different models and specializations" href="/docs/framework/agents/multi-agents" />
</Cards>

# Agent Builder
URL: /docs/framework/agents/agent-builder

Fluent API for rapid agent creation with automatic session management and smart defaults

***

title: Agent Builder
description: Fluent API for rapid agent creation with automatic session management and smart defaults
-----------------------------------------------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

`AgentBuilder` provides a fluent, chainable API for rapid agent creation and configuration. While [LLM Agents](/docs/framework/agents/llm-agents) give you maximum control and are recommended for most use cases, `AgentBuilder` shines when you need quick prototyping, automatic session management, or want to create multi-agent workflows without boilerplate.

Unlike direct agent instantiation, `AgentBuilder` handles session creation, memory management, and configuration defaults automatically, letting you focus on building great agent experiences rather than infrastructure setup.

<Callout type="info" title="When to Use AgentBuilder">
  Use `AgentBuilder` for rapid prototyping, automatic session management,
  multi-agent workflows, or when you want smart defaults. Use [LLM
  Agents](/docs/framework/agents/llm-agents) directly when you need maximum
  control over configuration, memory, sessions, or production systems with
  specific requirements.
</Callout>

## Quick Start

The simplest way to get started is with the convenience method:

```typescript
import { AgentBuilder } from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const response = await AgentBuilder.withModel("gemini-2.5-flash").ask(
    "Hello, what can you help me with?"
  );
  console.log("response: ", response);
}

main().catch(console.error);
```

For more control, use the full builder pattern:

```typescript
import { AgentBuilder } from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const { runner } = await AgentBuilder.create("my_assistant")
    .withModel("gemini-2.5-flash")
    .withInstruction("You are a helpful research assistant")
    .build();

  const response = await runner.ask("What is quantum computing?");
  console.log("response: ", response);
}

main().catch(console.error);
```

## Configuration Options

`AgentBuilder` provides a comprehensive set of configuration methods organized by functionality. All methods are **optional** except where noted in the usage patterns below.

### Core Configuration

Basic agent setup and behavior:

| Method                         | Type                                 | Description                      |
| ------------------------------ | ------------------------------------ | -------------------------------- |
| `create(name)`                 | `string`                             | Creates a named builder instance |
| `withModel(model)`             | `string \| BaseLlm \| LanguageModel` | Sets the LLM model               |
| `withDescription(description)` | `string`                             | Adds agent description           |
| `withInstruction(instruction)` | `string \| InstructionProvider`      | Sets behavior instructions       |
| `withAgent(agent)`             | `BaseAgent`                          | Wraps existing agent             |

### Input/Output Configuration

Data validation, schemas, and response formatting:

| Method                     | Type         | Description                                                      |
| -------------------------- | ------------ | ---------------------------------------------------------------- |
| `withInputSchema(schema)`  | `ZodSchema`  | Input validation schema                                          |
| `withOutputSchema(schema)` | `ZodType<T>` | Structured output format                                         |
| `withOutputKey(outputKey)` | `string`     | The output key in session state to store the output of the agent |

### Tools & Execution

External capabilities and code execution:

| Method                           | Type               | Description                    |
| -------------------------------- | ------------------ | ------------------------------ |
| `withTools(...tools)`            | `BaseTool[]`       | Adds tools to the agent        |
| `withSubAgents(subAgents)`       | `BaseAgent[]`      | Adds sub-agents to the agent   |
| `withPlanner(planner)`           | `BasePlanner`      | Sets the planner for the agent |
| `withCodeExecutor(codeExecutor)` | `BaseCodeExecutor` | Enables code execution         |

### Callback Methods

Monitoring and customization hooks:

| Method                              | Type                  | Description                       |
| ----------------------------------- | --------------------- | --------------------------------- |
| `withBeforeAgentCallback(callback)` | `BeforeAgentCallback` | Before agent execution callback   |
| `withAfterAgentCallback(callback)`  | `AfterAgentCallback`  | After agent execution callback    |
| `withBeforeModelCallback(callback)` | `BeforeModelCallback` | Before model interaction callback |
| `withAfterModelCallback(callback)`  | `AfterModelCallback`  | After model interaction callback  |
| `withBeforeToolCallback(callback)`  | `BeforeToolCallback`  | Before tool execution callback    |
| `withAfterToolCallback(callback)`   | `AfterToolCallback`   | After tool execution callback     |

### Session & Memory

State management and persistence:

| Method                                 | Type                                 | Description                       |
| -------------------------------------- | ------------------------------------ | --------------------------------- |
| `withMemory(memoryService)`            | `BaseMemoryService`                  | Adds long-term memory             |
| `withSessionService(service, options)` | `BaseSessionService, SessionOptions` | Custom session management         |
| `withSession(session)`                 | `Session`                            | Uses existing session instance    |
| `withQuickSession(options)`            | `SessionOptions`                     | In-memory session with custom IDs |
| `withArtifactService(artifactService)` | `BaseArtifactService`                | File storage capability           |
| `withRunConfig(config)`                | `RunConfig \| Partial<RunConfig>`    | Configures runtime behavior       |

### Multi-Agent Workflows

Agent orchestration patterns *(mutually exclusive - choose one)*:

| Method                             | Type                      | Description                 |
| ---------------------------------- | ------------------------- | --------------------------- |
| `asSequential(subAgents)`          | `BaseAgent[]`             | Creates sequential workflow |
| `asParallel(subAgents)`            | `BaseAgent[]`             | Creates parallel execution  |
| `asLoop(subAgents, maxIterations)` | `BaseAgent[], number`     | Creates iterative execution |
| `asLangGraph(nodes, rootNode)`     | `LangGraphNode[], string` | Creates complex workflows   |

### Build Methods

Final agent construction *(choose one to complete the configuration)*:

| Method              | Type                       | Description                 |
| ------------------- | -------------------------- | --------------------------- |
| `build()`           | `Promise<BuiltAgent>`      | Builds the configured agent |
| `buildWithSchema()` | `Promise<BuiltAgent>`      | Type-safe build with schema |
| `ask(message)`      | `Promise<RunnerAskReturn>` | Quick execution helper      |

### Requirement Patterns

`AgentBuilder` supports three different usage patterns, each with different requirements:

**✅ Pattern 1: Named Agent (Recommended)**

* **Required:** `create(name)` + `withModel()`
* **Use when:** You want a named agent for multi-agent systems or production use

```typescript
const { runner } = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .build();
```

**✅ Pattern 2: Quick Start**

* **Required:** `withModel()` only
* **Use when:** Rapid prototyping or simple one-off tasks

```typescript
const response = await AgentBuilder.withModel("gemini-2.5-flash").ask("Hello!");
console.log("response: ", response);
```

**✅ Pattern 3: Wrap Existing Agent**

* **Required:** `create(name)` + `withAgent()`
* **Use when:** Adding AgentBuilder features to existing agents

```typescript
import { existingLlmAgent } from "./existingLlmAgent";

const agent = await AgentBuilder.create("my_assistant")
  .withModel("gemini-2.5-flash")
  .withAgent(existingLlmAgent)
  .build();
```

**All other configuration methods are optional** and can be chained as needed with any pattern.

## Configuration Options Details

### create(name)

**Type:** `string` | **Default:** Auto-generated name

Creates a named builder instance that will generate an LLM agent with the specified name. The name serves as both a unique identifier and helps with debugging in multi-agent systems where multiple agents interact.

The name must follow JavaScript identifier rules (start with letter/underscore, contain only letters, numbers, underscores). Choose descriptive names that clearly indicate the agent's purpose.

```typescript
const builder = await AgentBuilder.create("research_assistant").withModel(
  "gemini-2.5-flash"
);
const builder2 = await AgentBuilder.create("_data_processor2").withModel(
  "gemini-2.5-flash"
);

// Invalid names (will throw errors)
```

### withModel(model)

**Type:** `string | BaseLlm | LanguageModel`

Specifies the Large Language Model that powers your agent's reasoning and text generation capabilities. You can provide a simple string identifier for common models, a configured BaseLlm instance for custom settings, or a Vercel AI SDK LanguageModel object for advanced features.

Your model choice significantly affects response quality, speed, and cost. See [Models & Providers](/docs/framework/agents/models) for detailed configuration options and available models.

```typescript
import { AgentBuilder, OpenAiLlm } from "@iqai/adk";

// Example 1: Using a string model identifier (most common)
const agent1 = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent using Gemini")
  .build();

// Example 2: Using a custom LLM instance
const agent2 = await AgentBuilder.create("my_agent")
  .withModel(new OpenAiLlm("gpt-4o"))
  .withDescription("An agent using OpenAI GPT-4")
  .build();
```

### withDescription(description)

**Type:** `string` | **Default:** `""`

Adds a brief description that explains the agent's capabilities and purpose. This is particularly important in multi-agent systems where parent agents use descriptions to make intelligent routing decisions. The description should clearly differentiate your agent from others.

```typescript
const agent = await AgentBuilder.create("financial_analyst")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "Specializes in financial data analysis and investment recommendations"
  )
  .build();
```

### withInstruction(instruction)

**Type:** `string | InstructionProvider` | **Default:** `""`

Defines the agent's behavior, decision-making patterns, and interaction style. This is your most important configuration as it transforms a generic LLM into a specialized agent with distinct expertise and personality.

Instructions can be static strings for consistent behavior or dynamic functions that adapt based on context. See [Agent Instructions Guide](/docs/framework/guides/agent-instructions) for comprehensive guidance on writing effective instructions.

```typescript
// Static instruction
const financeAgent = await AgentBuilder.create("financial_analyst")
  .withModel("gemini-2.5-flash")
  .withInstruction(
    "You are a financial advisor. Provide clear, actionable investment advice."
  )
  .build();

// Dynamic instruction using template literals
const travelAgent = await AgentBuilder.create("travel_agent")
  .withModel("gemini-2.5-flash")
  .withInstruction(
    `You are a travel guide. 
    User Preferences: {user_preferences}
    Suggest personalized travel itineraries based on user preferences.`
  )
  .build();
```

### withAgent(agent)

**Type:** `BaseAgent`

Wraps an existing agent instance with `AgentBuilder`'s session management and runner interface. This is useful when you have pre-configured agents but want `AgentBuilder`'s automatic session management and convenient runner interface.

```typescript
import { AgentBuilder, LlmAgent } from "@iqai/adk";

const existingAgent = new LlmAgent({
  name: "my_agent",
  description: "An agent for general tasks",
});

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent wrapping an existing LlmAgent")
  .withAgent(existingAgent)
  .build();
```

<Callout type="warn" title="Configuration After Wrapping">
  When using `withAgent()`, subsequent configuration methods like `withModel()`
  or `withTools()` are ignored. The existing agent's configuration is used
  as-is.
</Callout>

### withInputSchema(schema)

**Type:** `ZodSchema` | **Default:** `undefined`

Validates and structures input data before processing, ensuring your agent receives properly formatted data. This provides type safety and automatic validation for complex input requirements.

```typescript
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(1),
  filters: z.array(z.string()).optional(),
  maxResults: z.number().min(1).max(100).default(10),
});

const agent = await AgentBuilder.create("coordinator_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("A coordinator agent that processes user queries")
  .withInputSchema(inputSchema)
  .build();

// The agent will validate inputs against the defined schema
```

### withOutputSchema(schema)

**Type:** `ZodType<T>` | **Default:** `undefined`

Enforces structured JSON output with TypeScript type safety, ensuring predictable, parseable responses. Perfect for API integrations and data processing workflows. **Important:** This disables tool usage as the agent can only generate structured responses.

```typescript
import { z } from "zod";

const outputSchema = z.object({
  summary: z.string(),
  confidence: z.number().min(0).max(1),
  categories: z.array(z.string()),
});

const agent = await AgentBuilder.create("coordinator_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent that summarizes and categorizes text")
  .withOutputSchema(outputSchema)
  .build();

// The agent's responses will now conform to the defined output schema
```

### withOutputKey(outputKey)

**Type:** `string` | **Default:** `undefined`

Sets the key in session state where the agent's output will be stored. This makes the agent's response available to subsequent agents in multi-agent workflows, enabling data flow between agents.

```typescript
const agent = await AgentBuilder.create("analyzer_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "An agent that analyzes documents and provides structured output"
  )
  .withOutputKey("analysis")
  .build();

// The agent's output will be stored in session state under the "analysis" key
```

### withTools(...tools)

**Type:** `BaseTool[]` | **Default:** `[]`

Adds tools that dramatically extend your agent's capabilities beyond text generation, enabling interaction with external systems, API calls, calculations, and code execution. You can provide multiple tools in a single call, mixing different tool types.

Accepts `BaseTool` instances (built-in or custom), `FunctionTool` wrappers for easy integration, or raw async functions that get automatically wrapped. The agent's LLM intelligently decides when and how to use each tool based on context. See [Tools documentation](/docs/framework/tools) for available tools and creating custom ones.

```typescript
import {
  AgentBuilder,
  FileOperationsTool,
  GoogleSearch,
  createTool,
} from "@iqai/adk";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const getWeather = async (city: string): Promise<string> => {
  // Mock implementation of a weather fetching function
  return `The current weather in ${city} is sunny with a temperature of 25°C.`;
};
const weatherTool = createTool({
  name: "get_weather",
  description: "Get current weather",
  schema: z.object({
    city: z.string().describe("The city to get weather for"),
  }),
  fn: async (params) => getWeather(params.city),
});

async function main() {
  const { runner } = await AgentBuilder.create("my_agent")
    .withModel("gemini-2.5-flash")
    .withTools(
      new GoogleSearch(), // Built-in tool
      new FileOperationsTool(), // Another built-in tool
      weatherTool
    )
    .build();

  const response = await runner.ask("Hello, what can you help me with?");
  console.log("response: ", response);
}

main().catch(console.error);
```

### withSubAgents(subAgents)

**Type:** `BaseAgent[]` | **Default:** `[]`

Adds specialized sub-agents that the main agent can delegate specific tasks to. This creates a hierarchical agent system where the main agent acts as a coordinator.

```typescript
import { AgentBuilder, LlmAgent } from "@iqai/adk";

const researchAgent = new LlmAgent({
  name: "researcher_agent",
  model: "gemini-2.5-flash",
  description: "Specialize in research tasks",
});

const analysisAgent = new LlmAgent({
  name: "analyst_agent",
  model: "gemini-2.5-flash",
  description: "Specialize in data analysis tasks",
});

async function main() {
  const agent = await AgentBuilder.create("coordinator_agent")
    .withModel("gemini-2.5-flash")
    .withDescription("An agent coordinating research and analysis tasks")
    .withSubAgents([researchAgent, analysisAgent])
    .build();
}
```

### withPlanner(planner)

**Type:** `BasePlanner` | **Default:** `undefined`

Adds strategic planning capabilities that help agents break down complex tasks into manageable steps. Planners analyze requests and create execution strategies before proceeding with the actual work.

```typescript
import {
  AgentBuilder,
  FileOperationsTool,
  GoogleSearch,
  PlanReActPlanner,
} from "@iqai/adk";

const agent = await AgentBuilder.create("strategic_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "A strategic agent that uses planning and tools to accomplish complex tasks"
  )
  .withPlanner(new PlanReActPlanner())
  .withTools(new GoogleSearch(), new FileOperationsTool())
  .build();
```

### withCodeExecutor(codeExecutor)

**Type:** `BaseCodeExecutor` | **Default:** `undefined`

Enables your agent to write and execute code in a secure, sandboxed environment. This dramatically expands problem-solving capabilities beyond text generation, making agents capable of data analysis, calculations, visualizations, and dynamic computation.

```typescript
import { AgentBuilder, BuiltInCodeExecutor } from "@iqai/adk";

const agent = await AgentBuilder.create("strategic_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "A strategic agent that uses planning and tools to accomplish complex tasks"
  )
  .withCodeExecutor(new BuiltInCodeExecutor())
  .build();
```

### withBeforeAgentCallback(callback)

**Type:** `BeforeAgentCallback` | **Default:** `undefined`

Executes before the agent processes any request. Perfect for logging, authentication, or context preparation.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withBeforeAgentCallback(async (context) => {
    console.log("Before agent execution:", context);
    return undefined;
  })
  .build();
```

### withAfterAgentCallback(callback)

**Type:** `AfterAgentCallback` | **Default:** `undefined`

Executes after the agent completes processing. Ideal for logging results, cleanup, or post-processing.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withAfterAgentCallback(async (context) => {
    console.log("After agent execution:", context);
    return undefined;
  })
  .build();
```

### withBeforeModelCallback(callback)

**Type:** `BeforeModelCallback` | **Default:** `undefined`

Executes before each LLM model call. Useful for request modification, caching checks, or usage tracking.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withBeforeModelCallback(async ({ callbackContext, llmRequest }) => {
    console.log("Before model execution:", { callbackContext, llmRequest });
    return undefined;
  })
  .build();
```

### withAfterModelCallback(callback)

**Type:** `AfterModelCallback` | **Default:** `undefined`

Executes after each LLM model response. Perfect for response processing, caching, or usage analytics.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withAfterModelCallback(async ({ callbackContext, llmResponse }) => {
    console.log("After model execution:", { callbackContext, llmResponse });
    return undefined;
  })
  .build();
```

### withBeforeToolCallback(callback)

**Type:** `BeforeToolCallback` | **Default:** `undefined`

Executes before each tool execution. Useful for authorization, logging, or parameter validation.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withBeforeToolCallback(async (tool, args, context) => {
    console.log("Before tool execution:", context);
    return undefined;
  })
  .build();
```

### withAfterToolCallback(callback)

**Type:** `AfterToolCallback` | **Default:** `undefined`

Executes after each tool execution. Perfect for result processing, error handling, or usage tracking.

```typescript
const agent = await AgentBuilder.create("monitored_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with monitoring capabilities")
  .withAfterToolCallback(async (tool, args, context, response) => {
    console.log("After tool execution:", context);
    return undefined;
  })
  .build();
```

### withMemory(memoryService)

**Type:** `BaseMemoryService` | **Default:** `undefined`

Adds long-term memory storage that persists information across conversations and sessions. Memory enables agents to remember user preferences, learned insights, and important context from previous interactions.

Available memory services include `InMemoryMemoryService` for simple in-memory storage and `VertexAiRagMemoryService` for Vertex AI RAG-based memory with semantic search capabilities. Particularly valuable for personal assistants, customer service agents, and knowledge workers that need to build relationships over time. See [Sessions & Memory](/docs/framework/sessions) for memory configuration options.

```typescript
import { AgentBuilder, InMemoryMemoryService } from "@iqai/adk";

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "An agent that utilizes memory for enhanced context retention"
  )
  .withMemory(new InMemoryMemoryService())
  .build();
```

### withSessionService(service, options)

**Type:** `BaseSessionService, SessionOptions` | **Default:** Auto-created in-memory session

Provides custom session management for conversation state, message history, and ephemeral data during a single session. `AgentBuilder` creates in-memory sessions automatically, but you can customize this for persistence or multi-tenant applications.

Available session services include `InMemorySessionService` for simple in-memory storage, `DatabaseSessionService` for database-backed persistence, and `VertexAiSessionService` for Vertex AI integration. Sessions are lighter-weight than memory and typically reset between conversations. See [Sessions & Memory](/docs/framework/sessions) for session configuration.

```typescript
import { AgentBuilder, createDatabaseSessionService } from "@iqai/adk";

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent with persistent session storage")
  .withSessionService(createDatabaseSessionService("sqlite://sessions.db"))
  .build();
```

**Using Together:** You can combine both for comprehensive state management - sessions for current conversation context and memory for long-term retention:

```typescript
import {
  AgentBuilder,
  InMemoryMemoryService,
  createDatabaseSessionService,
} from "@iqai/adk";

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An advanced agent with memory and session management")
  .withMemory(new InMemoryMemoryService()) // Long-term insights
  .withSessionService(createDatabaseSessionService("sqlite://sessions.db")) // Persistent sessions
  .build();
```

### withSession(session)

**Type:** `Session` | **Default:** `undefined`

Provides a specific session instance for conversation state management. Use this when you need to continue an existing conversation or share sessions between agents. Requires `withSessionService()` to be called first.

```typescript
import { AgentBuilder, InMemorySessionService } from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

// First set up the session service
const sessionService = new InMemorySessionService();

async function main() {
  // Create a session with some initial state
  const existingSession = await sessionService.createSession(
    "my_app",
    "user-123",
    { conversationCount: 1 },
    "session-456"
  );

  const agent = await AgentBuilder.create("continuing_agent")
    .withModel("gemini-2.5-flash")
    .withDescription("An agent that continues existing conversations")
    .withSessionService(sessionService) // Required before withSession()
    .withSession(existingSession) // Use the existing session
    .build();

  // User asks the agent to pick up the previous conversation
  const response = await agent.runner.ask(
    "Can you summarize where we left off?"
  );
  console.log("response: ", response);
}

main().catch(console.error);
```

### withQuickSession(options)

**Type:** `SessionOptions` | **Default:** `{}`

Creates an in-memory session with optional identifiers for user, app, state, or a custom session ID. Handy when you need lightweight session tracking without configuring a dedicated session service.

```typescript
const { runner } = await AgentBuilder.create("quick_agent")
  .withDescription("An agent that uses quick sessions for user interactions")
  .withModel("gemini-2.5-flash")
  .withQuickSession({
    userId: "user-456",
    appName: "quick-chat",
    state: { greetingCount: 1 },
    sessionId: "session-456",
  })
  .build();

// Automatically manages the session using the provided identifiers
// User asks the agent to recall their prior exchange
const response = await runner.ask("Remember this conversation");
console.log("response: ", response);
```

### withArtifactService(artifactService)

**Type:** `BaseArtifactService` | **Default:** `undefined`

Provides artifact storage and management capabilities for documents, images, and generated content. Use `InMemoryArtifactService` for in-memory storage or `GcsArtifactService` for cloud-based persistence. Essential for agents that work with files across multiple conversations.

```typescript
import { AgentBuilder, InMemoryArtifactService } from "@iqai/adk";

const { runner } = await AgentBuilder.create("document_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent that manages files and documents")
  .withArtifactService(new InMemoryArtifactService())
  .build();

// User asks the agent to work with files
const response = await runner.ask("Process and store this document");
console.log("response: ", response);
```

### withRunConfig(config)

**Type:** `(config: RunConfig | Partial<RunConfig>) => this` | **Default:** `{}`

Configures runtime behavior including streaming mode, LLM call limits, input/output audio transcription, and other execution parameters. Essential for production deployments with specific performance and execution requirements.

```typescript
import { AgentBuilder, StreamingMode } from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const { runner } = await AgentBuilder.create("production_agent")
    .withModel("gemini-2.5-flash")
    .withRunConfig({
      streamingMode: StreamingMode.SSE,
      maxLlmCalls: 100,
      saveInputBlobsAsArtifacts: true,
    })
    .build();

  // User asks the agent to process a request with configured limits
  const response = await runner.ask("Process this data with safeguards");

  console.log("response: ", response);
}

main().catch(console.error);
```

### asSequential(subAgents)

**Type:** `BaseAgent[]`

Transforms your builder into a sequential workflow where agents execute in order, with each agent receiving the output of the previous one. Perfect for pipeline workflows like research → analysis → report generation.

See [Sequential Agents](/docs/framework/agents/workflow-agents/sequential-agents) for detailed patterns and examples.

```typescript
import { getResearchAgent } from "./agents/researcher-agent.js";
import { getAnalysisAgent } from "./agents/analyzer-agent.js";
import { getReportingAgent } from "./agents/reporter-agent.js";

const researcherAgent = getResearchAgent();
const analyzerAgent = getAnalysisAgent();
const reporterAgent = getReportingAgent();

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("A multi-step agent for research, analysis, and reporting")
  .asSequential([researcherAgent, analyzerAgent, reporterAgent])
  .build();
```

### asParallel(subAgents)

**Type:** `BaseAgent[]`

Creates a parallel execution pattern where multiple agents run simultaneously on the same input. Useful when you need different perspectives or want to process multiple aspects of a task concurrently.

See [Parallel Agents](/docs/framework/agents/workflow-agents/parallel-agents) for coordination patterns.

```typescript
import { getAnalysisAgent } from "./agents/analysis-agent.js";
import { getResearchAgent } from "./agents/research-agent.js";
import { getReportingAgent } from "./agents/reporting-agent.js";

const sentimentAnalyzer = getAnalysisAgent();
const topicExtractor = getResearchAgent();
const summaryGenerator = getReportingAgent();

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "An agent that performs sentiment analysis, topic extraction, and summarization"
  )
  .asParallel([sentimentAnalyzer, topicExtractor, summaryGenerator])
  .build();
```

### asLoop(subAgents, maxIterations)

**Type:** `BaseAgent[], number`

Creates an iterative execution pattern where agents repeat until a condition is met or maximum iterations reached. Essential for problem-solving workflows that require refinement and improvement.

See [Loop Agents](/docs/framework/agents/workflow-agents/loop-agents) for termination conditions and patterns.

```typescript
import { getProblemSolverAgent } from "./agents/problem-solver-agent.js";
import { getValidatorAgent } from "./agents/validator-agent.js";

const problemSolver = getProblemSolverAgent();
const validator = getValidatorAgent();

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "An agent that performs sentiment analysis, topic extraction, and summarization"
  )
  .asLoop([problemSolver, validator], 5) // Max 5 iterations
  .build();
```

### asLangGraph(nodes, rootNode)

**Type:** `LangGraphNode[], string`

Creates complex, graph-based workflows with conditional branching, loops, and dynamic routing. Most powerful option for sophisticated multi-agent orchestration. See [Language Graph Agents](/docs/framework/agents/workflow-agents/lang-graph-agents) for detailed examples and patterns.

```typescript
import { AgentBuilder, LlmAgent, LangGraphAgent } from "@iqai/adk";

const sentimentAgent = new LlmAgent({
  name: "sentiment_analysis_agent",
  description: "Analyzes sentiment of text",
});

const topicAgent = new LlmAgent({
  name: "topic_extraction_agent",
  description: "Extracts topics from text",
});

const summaryAgent = new LlmAgent({
  name: "summarization_agent",
  description: "Summarizes text",
});

const workflowNodes = [
  {
    id: "start-node",
    name: "sentiment_analysis",
    agent: sentimentAgent,
    next: "topic-extraction-node",
  },
  {
    id: "topic-extraction-node",
    name: "topic_extraction",
    agent: topicAgent,
    next: "summarization-node",
  },
  {
    id: "summarization-node",
    name: "summarization",
    agent: summaryAgent,
    next: null,
  },
];

const agent = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription(
    "An agent that performs sentiment analysis, topic extraction, and summarization"
  )
  .asLangGraph(workflowNodes, "start-node")
  .build();
```

<Callout type="info" title="Choosing Agent Types">
  **You can only use ONE agent type method per builder.** If you don't use any
  agent type method, `AgentBuilder` creates a single LLM agent with your
  configuration.
</Callout>

### build()

**Type:** `Promise<BuiltAgent>`

Creates the configured agent and optionally returns the runner and session for immediate use. This is the most common way to finalize your agent configuration.

```typescript
const { agent, runner, session } = await AgentBuilder.create("my_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("A helpful research assistant")
  .build();

// Use runner for conversations
// User asks the agent for the latest AI news
const response = await runner.ask("Search for recent AI news");

// Access agent directly for advanced usage
console.log("Agent name:", agent.name);
console.log("Session app:", session.appName);
console.log("Session user:", session.userId);
```

### buildWithSchema()

**Type:** `<T>() => Promise<BuiltAgent<T, TMulti>>`

Builds an agent with typed output schema, providing full TypeScript type safety for responses. The runner's `ask()` method returns properly typed results. Use this after calling `withOutputSchema()` to define the response structure.

```typescript
import { z } from "zod";

const responseSchema = z.object({
  summary: z.string(),
  confidence: z.number(),
  sources: z.array(z.string()),
});

const { runner } = await AgentBuilder.create("typed_agent")
  .withModel("gemini-2.5-flash")
  .withOutputSchema(responseSchema)
  .buildWithSchema();

// TypeScript knows the exact return type
const result = await runner.ask("What is machine learning?");
console.log(result.summary, result.confidence, result.sources);
```

### ask(message)

**Type:** `(message: string | FullMessage) => Promise<string>`

Convenience method that builds the agent and immediately processes a single message. Returns a string response directly without needing to access a runner object. Perfect for one-off queries, rapid prototyping, or simple interactions.

```typescript
import { AgentBuilder, GoogleSearch } from "@iqai/adk";

// Quick one-liner for simple queries
const response = await AgentBuilder.create("quick_agent")
  .withModel("gemini-2.5-flash")
  .withTools(new GoogleSearch())
  .ask("What are the latest AI developments in 2025?");

console.log("response: ", response); // Direct string response
```

## When to Use `AgentBuilder` vs LLM Agents

### Use `AgentBuilder` When

* **Rapid prototyping** - Need to test ideas quickly without configuration overhead
* **Automatic session management** - Want sessions handled automatically with smart defaults
* **Multi-agent workflows** - Building sequential, parallel, or loop patterns
* **Learning and experimentation** - Getting started with ADK-TS concepts
* **Simple applications** - Basic agents without complex requirements

### Use LLM Agents When

* **Production systems** - Need precise control over configuration and behavior
* **Custom memory/sessions** - Specific requirements for data persistence and management
* **Complex integrations** - Integrating with existing systems and architectures
* **Performance optimization** - Fine-tuning for specific performance requirements
* **Advanced features** - Need access to all configuration options and callbacks

<Callout type="info" title="Migration Path">
  Start with `AgentBuilder` for rapid development, then migrate to direct LLM
  Agents when you need more control. `AgentBuilder` essentially creates LLM
  agents under the hood with smart defaults.
</Callout>

## Complete Configuration Example

Here's `AgentBuilder` with multiple configuration options showcasing the full range of capabilities:

```typescript
import {
  AgentBuilder,
  InMemoryMemoryService,
  BuiltInCodeExecutor,
  GoogleSearch,
  StreamingMode,
} from "@iqai/adk";
import { config } from "dotenv";

//  Load environment variables from .env file
config();

const { runner } = await AgentBuilder.create("advanced_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("Advanced research and analysis agent")
  .withInstruction("You are a thorough research assistant")
  .withTools(new GoogleSearch())
  .withCodeExecutor(new BuiltInCodeExecutor())
  .withMemory(new InMemoryMemoryService())
  .withQuickSession({
    userId: "user-123",
    appName: "research-app",
  })
  .withRunConfig({
    streamingMode: StreamingMode.SSE,
    maxLlmCalls: 50,
    saveInputBlobsAsArtifacts: true,
  })
  .withBeforeAgentCallback(async (context) => {
    console.log(`Starting research task: ${context.sessionId}`);
    return undefined;
  })
  .withAfterToolCallback(async (context) => {
    console.log(`Tool ${context.name} completed`);
  })
  .build();

// User asks the agent to research the requested topic
const result = await runner.ask("Research quantum computing trends");
```

## Related Topics

<Cards>
  <Card title="🤖 LLM Agents" description="Direct agent configuration with maximum control" href="/docs/framework/agents/llm-agents" />

  <Card title="🛠️ Tools" description="Available tools and creating custom ones" href="/docs/framework/tools" />

  <Card title="🔗 Sequential Agents" description="Execute agents in order for pipeline workflows" href="/docs/framework/agents/workflow-agents/sequential-agents" />

  <Card title="⚡ Parallel Agents" description="Run multiple agents simultaneously" href="/docs/framework/agents/workflow-agents/parallel-agents" />

  <Card title="🔄 Loop Agents" description="Repeat agent execution until conditions are met" href="/docs/framework/agents/workflow-agents/loop-agents" />

  <Card title="🧠 Sessions & Memory" description="Manage conversation state and long-term memory" href="/docs/framework/sessions/session" />
</Cards>

# Sequential Agents
URL: /docs/framework/agents/workflow-agents/sequential-agents

Execute agents one after another in a specific order

***

title: Sequential Agents
description: Execute agents one after another in a specific order
-----------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

Sequential agents create powerful pipelines where agents execute in a specific order, with each step building on the results of the previous one. Think assembly line for AI - each agent specializes in one part of the process, and the final result is the combined output of all steps working together.

Perfect for workflows where order matters: research before analysis, writing before editing, data collection before processing. Unlike [parallel agents](/docs/framework/agents/workflow-agents/parallel-agents) that run simultaneously, sequential agents guarantee execution order and enable sophisticated multi-step reasoning.

<Callout type="info" title="When Order Matters">
  Use sequential agents when each step depends on the previous one's output. The
  magic happens when agents pass enriched context down the pipeline, creating
  more sophisticated results than any single agent could achieve.
</Callout>

## Quick Start Example

Here's a content creation pipeline that writes, edits, and fact-checks articles in sequence:

```typescript
import { LlmAgent, SequentialAgent } from "@iqai/adk";

// Step 1: Create initial content
const writerAgent = new LlmAgent({
  name: "writer_agent",
  description: "Creates engaging and informative articles on given topics",
  instruction: `Write a comprehensive, engaging article on the given topic. Include an introduction, main points with examples, and a conclusion.`,
  outputKey: "draft_content", // Key for passing output to next agent
});

// Step 2: Edit for clarity and style
const editorAgent = new LlmAgent({
  name: "editor_agent",
  description: "Edits content for clarity, grammar, and style",
  instruction: `Review and edit the article for clarity, grammar, and style. Improve readability while maintaining the original voice and message.`,
  outputKey: "edited_content", // Key for passing output to next agent
});

// Step 3: Verify facts and add citations
const factCheckerAgent = new LlmAgent({
  name: "fact_checker_agent",
  description: "Verifies factual claims and adds citations where needed",
  instruction: `Verify factual claims in the content. Flag any unsupported statements and add citations where needed. Ensure accuracy and credibility.`,
  outputKey: "verified_content", // Final output key
});

// Sequential pipeline: write → edit → fact_check
const contentCreationAgent = new SequentialAgent({
  name: "content_creation_agent",
  description: "End-to-end content creation with quality controls",
  subAgents: [writerAgent, editorAgent, factCheckerAgent],
});

// Export the sequential agent for use
export { contentCreationAgent };
```

### Visual Flow

<Mermaid
  chart="
flowchart TD
A[User Query] --> B[Writer Agent]
B --> C[Editor Agent]
C --> D[Fact Checker Agent]
D --> E[Final Verified Content]
"
/>

## How Sequential Processing Works

Sequential agents create a data pipeline where information gets progressively enriched at each step:

**🔄 Execution Flow**

1. **Agent 1** receives the original input and processes it
2. **Agent 2** gets both the original input AND Agent 1's output
3. **Agent 3** receives original input + Agent 1's output + Agent 2's output
4. This continues for each agent in the sequence

**💡 Context Accumulation**\
Each agent sees the full conversation history, so later agents can reference and build upon earlier agents' work. This creates sophisticated reasoning chains that single agents can't achieve.

**🎯 Deterministic Order**\
Execution order is guaranteed - no race conditions or unpredictable results. Perfect for production workflows where consistency matters.

<Callout type="info" title="Data Flow Between Agents">
  Agents automatically share session state, so later agents can reference
  earlier results. Use unique `outputKey` values for each agent and clear
  instructions to help agents understand what information to pass forward.
</Callout>

## Real-World Use Cases

**📊 Business Intelligence Pipeline**\
Research → Analysis → Strategic Recommendations → Executive Summary

**📝 Content Creation Workflow**\
Draft → Fact-check → Edit → Style Review → Final Polish

**🔍 Technical Documentation**\
Code Analysis → Documentation Draft → Technical Review → User Testing → Publication

**⚖️ Legal Document Review**\
Initial Review → Compliance Check → Risk Assessment → Final Approval

**🧪 Scientific Analysis**\
Data Collection → Statistical Analysis → Peer Review → Conclusion Generation

## When to Choose Sequential Agents

<Callout type="success" title="Perfect For Sequential Processing">
  * **Use when:** Each step builds on the previous one's output
  * **Benefit:** Creates sophisticated reasoning chains impossible with single agents
</Callout>

### ✅ Choose Sequential When:

* **Dependencies matter** - Later steps need earlier results
* **Quality control** - Each stage validates and improves the work
* **Specialization** - Different expertise needed at each step
* **Compliance** - Regulated workflows requiring specific order
* **Complex reasoning** - Multi-step analysis and decision making

### ❌ Don't Use Sequential When:

* Tasks are completely independent
* Speed is more important than thoroughness
* You need real-time parallel processing
* Simple, single-step operations

## Related Topics

<Cards>
  <Card title="⚡ Parallel Agents" description="Run multiple agents simultaneously for faster processing" href="/docs/framework/agents/workflow-agents/parallel-agents" />

  <Card title="🔄 Loop Agents" description="Iterative processing with retry logic and refinement" href="/docs/framework/agents/workflow-agents/loop-agents" />

  <Card title="🏗️ Agent Builder" description="Fluent API for creating sequential workflows quickly" href="/docs/framework/agents/agent-builder" />

  <Card title="🤖 LLM Agents" description="Building blocks that power sequential workflows" href="/docs/framework/agents/llm-agents" />
</Cards>

# Parallel Agents
URL: /docs/framework/agents/workflow-agents/parallel-agents

Run multiple agents simultaneously for faster processing

***

title: Parallel Agents
description: Run multiple agents simultaneously for faster processing
---------------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

Parallel agents unleash the power of concurrent processing, running multiple agents simultaneously to tackle independent tasks. Think of it as your AI team working in parallel - while one agent analyzes sentiment, another extracts topics, and a third generates summaries, all at the same time.

Unlike [sequential agents](/docs/framework/agents/workflow-agents/sequential-agents) that process step-by-step, parallel agents maximize speed and efficiency by utilizing multiple processing streams. Perfect when you have independent tasks that don't need to wait for each other.

<Callout type="info" title="Speed Through Parallelism">
  * **Key benefit:** Process multiple independent tasks simultaneously instead of waiting for each one to finish.
  * **Performance boost:** 3 tasks that take 10 seconds each = 10 seconds total (not 30!)
</Callout>

## Quick Start Example

Here's a comprehensive parallel analysis agent that evaluates user feedback from multiple angles simultaneously:

```typescript
import { LlmAgent, ParallelAgent } from "@iqai/adk";

// Parallel analysis agents for user feedback - each analyzes different aspects simultaneously
const sentimentAgent = new LlmAgent({
  name: "sentiment_agent",
  description:
    "Analyzes the overall sentiment and emotional tone of user feedback",
  instruction: `Analyze the sentiment of the user feedback. Classify as positive, negative, or neutral, and provide a confidence score. Identify specific emotional indicators.`,
  outputKey: "sentiment_analysis", // Key for storing sentiment results
});

const topicAgent = new LlmAgent({
  name: "topic_agent",
  description: "Categorizes feedback into relevant topics and themes",
  instruction: `Identify the main topics and themes in the user feedback. Categorize into areas like product features, customer service, pricing, usability, etc. List specific topics mentioned.`,
  outputKey: "topic_categories", // Key for storing topic results
});

const issueAgent = new LlmAgent({
  name: "issue_agent",
  description:
    "Identifies specific problems, bugs, or concerns mentioned in feedback",
  instruction: `Extract and categorize any specific issues, problems, or concerns mentioned in the feedback. Prioritize critical issues and suggest severity levels.`,
  outputKey: "identified_issues", // Key for storing issue results
});

const suggestionAgent = new LlmAgent({
  name: "suggestion_agent",
  description: "Extracts user suggestions and improvement ideas",
  instruction: `Identify any suggestions, recommendations, or improvement ideas mentioned in the feedback. Organize them by category and feasibility.`,
  outputKey: "user_suggestions", // Key for storing suggestion results
});

const satisfactionAgent = new LlmAgent({
  name: "satisfaction_agent",
  description: "Rates overall user satisfaction and likelihood to recommend",
  instruction: `Rate the user's overall satisfaction on a scale of 1-10. Assess likelihood to recommend and identify key satisfaction drivers or pain points.`,
  outputKey: "satisfaction_rating", // Key for storing satisfaction results
});

// Parallel analysis system - demonstrates concurrent execution pattern
const feedbackAgent = new ParallelAgent({
  name: "feedback_agent",
  description:
    "Comprehensive parallel analysis of user feedback across multiple dimensions",
  subAgents: [
    sentimentAgent,
    topicAgent,
    issueAgent,
    suggestionAgent,
    satisfactionAgent,
  ],
});

// Export the parallel agent for use
export { feedbackAgent };
```

### Visual Flow

<Mermaid
  chart="
flowchart TD
U[User Feedback] --> P[ParallelAgent]
P --> S[Sentiment Agent]
P --> T[Topic Agent]
P --> I[Issue Agent]
P --> SG[Suggestion Agent]
P --> SA[Satisfaction Agent]
S -. sentiment_analysis .-> P
T -. topic_categories .-> P
I -. identified_issues .-> P
SG -. user_suggestions .-> P
SA -. satisfaction_rating .-> P
"
/>

## How Parallel Processing Works

Parallel agents maximize efficiency by running all sub-agents simultaneously:

**⚡ Concurrent Execution**

1. **All agents start together** - No waiting for previous agents to finish
2. **Independent processing** - Each agent works on the same input independently
3. **Simultaneous completion** - Results become available as each agent finishes
4. **Non-deterministic order** - Faster agents finish first, slower ones catch up

**📊 Performance Benefits**

* **Time savings:** N agents running for T seconds = T total time (not N×T)
* **Resource utilization:** Maximizes CPU/GPU usage across multiple agents
* **Scalability:** Add more agents without increasing total processing time

**🔄 Result Aggregation**
Each agent writes to unique keys in shared session state. Later agents (or your application) can access all results together for final processing.

<Callout type="info" title="State Management">
  Use unique `outputKey` values for each agent to prevent conflicts. Results are
  available immediately as each agent completes - perfect for real-time updates!
</Callout>

## Real-World Use Cases

**📝 Multi-Perspective Content Analysis**\
Sentiment + Topics + Keywords + Priority Assessment (all simultaneously)

**🔍 Comprehensive Research**\
Web Search + Academic Papers + News + Social Media (parallel data gathering)

**📊 Financial Analysis**\
Technical Analysis + Fundamental Analysis + News Sentiment + Risk Assessment

**🛠️ Quality Assurance**\
Grammar Check + Fact Verification + Style Review + Compliance Check

**🌍 Multi-Language Processing**\
Translation + Sentiment + Cultural Context + Localization (per language)

**📊 Data Validation**\
Format Check + Business Rules + Data Quality + Duplicate Detection

## When to Choose Parallel Agents

<Callout type="success" title="Perfect For Independent Tasks">
  * **Use when:** Tasks don't depend on each other's results during execution
  * **Benefit:** Dramatic speed improvements through simultaneous processing
</Callout>

### ✅ Choose Parallel When:

* **Independent analysis** - Multiple perspectives on the same data
* **Speed is critical** - Need results as fast as possible
* **Resource optimization** - Want to maximize processing power
* **Multi-source data** - Gathering from different sources simultaneously
* **Comparative analysis** - Need multiple approaches to the same problem

### ❌ Don't Use Parallel When:

* Tasks depend on each other's intermediate results
* You need guaranteed execution order
* Sequential processing is part of the business logic
* Resource constraints limit concurrent execution
* Results from one agent affect how another should process

## Related Topics

<Cards>
  <Card title="🔄 Sequential Agents" description="Step-by-step processing when order and dependencies matter" href="/docs/framework/agents/workflow-agents/sequential-agents" />

  <Card title="🔁 Loop Agents" description="Iterative processing with retry logic and refinement" href="/docs/framework/agents/workflow-agents/loop-agents" />

  <Card title="🏗️ Agent Builder" description="Fluent API for creating parallel workflows with asParallel()" href="/docs/framework/agents/agent-builder" />

  <Card title="🤖 LLM Agents" description="Individual agents that power parallel processing workflows" href="/docs/framework/agents/llm-agents" />
</Cards>

# Loop Agents
URL: /docs/framework/agents/workflow-agents/loop-agents

Repeat agent execution until conditions are met

***

title: Loop Agents
description: Repeat agent execution until conditions are met
------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

Loop agents create powerful iterative workflows that keep improving until they reach the desired outcome. Think of it as your AI perfectionist - it won't stop until the work meets quality standards or maximum attempts are reached.

Perfect for scenarios where "good enough" isn't good enough. Whether you're refining content, debugging code, or iterating on creative work, loop agents ensure continuous improvement through repeated cycles of execution and evaluation.

Unlike [sequential agents](/docs/framework/agents/workflow-agents/sequential-agents) that run once, or [parallel agents](/docs/framework/agents/workflow-agents/parallel-agents) that run simultaneously, loop agents focus on iterative refinement and progressive enhancement.

<Callout type="info" title="Iterative Excellence">
  * **Key benefit:** Keep improving until you hit quality standards or resource
    limits.
  * **Perfect for:** Content refinement, problem solving, creative
    iteration, and quality convergence.
</Callout>

## Quick Start Example

Here's a research synthesis agent that iteratively gathers and refines information until a comprehensive understanding is achieved:

```typescript
import { LlmAgent, LoopAgent, Event, EventActions } from "@iqai/adk";

// Research question generator
const researchPlannerAgent = new LlmAgent({
  name: "research_planner_agent",
  model: "gemini-2.5-flash",
  description: "Generates focused research questions and search strategies",
  instruction:
    "Break down the research topic into specific, answerable questions. Prioritize the most important questions to investigate.",
  outputKey: "research_questions", // Key for storing generated questions
});

// Information gatherer using search
const infoGathererAgent = new LlmAgent({
  name: "info_gatherer_agent",
  model: "gemini-2.5-flash",
  description: "Gathers information from various sources",
  instruction:
    "Search for and collect relevant information to answer the research questions. Be thorough but focused.",
  outputKey: "gathered_info", // Key for storing gathered information
});

// Synthesis and gap analyzer
const synthesisAgent = new LlmAgent({
  name: "synthesis_agent",
  model: "gemini-2.5-flash",
  description: "Synthesizes information and identifies knowledge gaps",
  instruction:
    "Analyze the gathered information. Synthesize key findings and identify what important questions remain unanswered.",
  outputKey: "synthesis_analysis", // Key for storing synthesis results
});

// Research completion checker
const researchCompleterAgent = new (class extends LlmAgent {
  constructor() {
    super({
      name: "research_completer_agent",
      description: "Determines if research is sufficiently complete",
    });
  }

  protected async *runAsyncImpl(ctx: any) {
    const synthesis = ctx.session.state.get("synthesis_analysis", "");
    const questions = ctx.session.state.get("research_questions", "");

    // Check if major knowledge gaps remain
    const hasMajorGaps =
      synthesis.toLowerCase().includes("major gap") ||
      synthesis.toLowerCase().includes("insufficient") ||
      synthesis.toLowerCase().includes("unclear");

    // Emit event indicating whether to escalate (continue research) or not
    yield new Event({
      author: this.name,
      actions: new EventActions({ escalate: !hasMajorGaps }),
    });
  }
})();

// Research synthesis loop - iterative research refinement
const researchSynthesisAgent = new LoopAgent({
  name: "research_synthesis_agent",
  description:
    "Iteratively researches and synthesizes information until comprehensive understanding is achieved",
  subAgents: [
    researchPlannerAgent,
    infoGathererAgent,
    synthesisAgent,
    researchCompleterAgent,
  ],
  maxIterations: 4,
});

// Export the loop agent for use
export { researchSynthesisAgent };
```

### Visual Flow

<Mermaid
  chart="
flowchart TD
A[Start Research] --> L[LoopAgent]
L --> RP[Research Planner Agent]
RP --> IG[Information Gatherer Agent]
IG --> S[Synthesis Agent]
S --> RC[Research Completer Agent]
RC -->|Not Complete| L
RC -->|Complete| E[Final Synthesis Output]
"
/>

## How Loop Processing Works

Loop agents create iterative cycles where each iteration can build upon and improve previous results:

**🔄 Iteration Cycle**

1. **Execute sub-agents** - Run all agents in sequence (like sequential agents)
2. **Evaluate conditions** - Check if stopping criteria are met
3. **Continue or stop** - Either start next iteration or exit loop
4. **Progressive improvement** - Each cycle can reference and improve previous results

**🚪 Termination Strategies**

**Maximum Iterations** (Safety Net)

```typescript
maxIterations: 5; // Prevents infinite loops
```

**Quality-Based Stopping** (Smart Exit)

```typescript
// Agent evaluates quality and signals when done
yield new Event({
  actions: new EventActions({ escalate: qualityMet }),
});
```

**📊 Progressive Enhancement**
Each iteration sees the full session history, allowing agents to:

* Reference previous attempts
* Learn from past iterations
* Build incrementally toward the goal
* Avoid repeating unsuccessful approaches

<Callout type="info" title="Loop Safety">
  Always set `maxIterations` as a safety net! Even with smart stopping
  conditions, having a maximum prevents runaway loops and unexpected resource
  consumption.
</Callout>

## Real-World Use Cases

**📝 Content Refinement Loop**\
Draft → Improve → Evaluate → Repeat until quality standards met

**🔍 Research Deep-Dive**\
Initial Research → Analyze Gaps → Research More → Repeat until comprehensive

**🛠️ Code Optimization**\
Generate Code → Test Performance → Optimize → Repeat until benchmarks hit

**🎨 Creative Iteration**\
Generate Ideas → Evaluate Creativity → Refine → Repeat until breakthrough

**🐛 Problem Debugging**\
Try Solution → Test → Debug Issues → Repeat until tests pass

**🎯 Marketing Copy Testing**\
Write Copy → A/B Test → Analyze Results → Improve → Repeat

## When to Choose Loop Agents

<Callout type="success" title="Perfect For Iterative Improvement">
  * **Use when:** You need progressive refinement and have clear quality
    criteria
  * **Benefit:** Achieve higher quality results through iterative
    enhancement
</Callout>

### ✅ Choose Loop When:

* **Quality matters more than speed** - Need excellent results, not just "good enough"
* **Clear success criteria** - You can define "done" or "good enough"
* **Improvable processes** - Each iteration can meaningfully build on the last
* **Resource tolerance** - Can afford multiple processing cycles
* **Learning from attempts** - Previous tries inform better approaches

### ❌ Don't Use Loop When:

* Single execution produces sufficient results
* No clear improvement path exists between iterations
* Time/cost constraints prevent multiple cycles
* Risk of infinite loops without proper safeguards
* Tasks are already optimized and won't benefit from repetition

<Callout type="warn" title="Always Set Limits">
  - **Critical:** Always set `maxIterations` to prevent runaway loops.
  - **Monitor:** Watch resource usage during extended iterations.
  - **Test:** Validate your stopping conditions work reliably.
</Callout>

## Related Topics

<Cards>
  <Card title="🔄 Sequential Agents" description="Building blocks that loop agents execute in each iteration" href="/docs/framework/agents/workflow-agents/sequential-agents" />

  <Card title="⚡ Parallel Agents" description="Alternative for concurrent processing without iteration" href="/docs/framework/agents/workflow-agents/parallel-agents" />

  <Card title="🏗️ Agent Builder" description="Fluent API for creating loop workflows with asLoop()" href="/docs/framework/agents/agent-builder" />

  <Card title="🤖 LLM Agents" description="Individual agents that power iterative loop workflows" href="/docs/framework/agents/llm-agents" />
</Cards>

# LangGraph Agents
URL: /docs/framework/agents/workflow-agents/langgraph-agents

Complex workflows with conditional branching and dynamic routing

***

title: LangGraph Agents
description: Complex workflows with conditional branching and dynamic routing
-----------------------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

LangGraph agents orchestrate sophisticated workflows with conditional branching, dynamic routing, and state-dependent decisions. Think of them as the master conductors for complex, multi-path processes where the next step depends on the results of previous steps.

Unlike simple workflow patterns ([sequential](/docs/framework/agents/workflow-agents/sequential-agents), [parallel](/docs/framework/agents/workflow-agents/parallel-agents), [loop](/docs/framework/agents/workflow-agents/loop-agents)), LangGraph agents handle complex decision trees, conditional flows, and dynamic routing based on content analysis, user preferences, or business rules.

<Callout type="info" title="Advanced Orchestration">
  * **Power:** Handle complex branching logic and conditional workflows -
    **Flexibility:** Dynamic routing based on content, context, or business rules
  * **Best for:** Sophisticated processes that require intelligent
    decision-making
</Callout>

## Quick Start Example

Here's a customer support system that intelligently routes inquiries based on analysis:

```typescript
import { LlmAgent, LangGraphAgent } from "@iqai/adk";

// Analyze incoming customer inquiry
const inquiryAnalyzerAgent = new LlmAgent({
  name: "inquiry_analyzer_agent",
  model: "gemini-2.5-flash",
  description:
    "Analyzes customer inquiries to determine category, urgency, and routing",
  instruction: `
    Analyze the customer inquiry and determine:
    - Category: technical, billing, refund, general, complaint
    - Urgency: low, medium, high, critical
    - Complexity: simple, moderate, complex
    - Sentiment: positive, neutral, negative, angry

    Output as JSON with these exact fields: category, urgency, complexity, sentiment.
  `,
  outputKey: "inquiry_analysis",
});

// Specialized support agents
const technicalSupportAgent = new LlmAgent({
  name: "technical_support_agent",
  model: "gemini-2.5-flash",
  description: "Handles technical issues with step-by-step troubleshooting",
  instruction: `
    Provide technical support for the customer's issue:
    - Diagnose the technical problem
    - Provide step-by-step troubleshooting guidance
    - Offer workarounds or solutions
    - Escalate to engineering if needed

    Be patient, clear, and technically accurate.
  `,
  outputKey: "technical_response",
});

const billingSupportAgent = new LlmAgent({
  name: "billing_support_agent",
  model: "gemini-2.5-flash",
  description: "Handles billing inquiries and payment issues",
  instruction: `
    Handle billing and payment-related inquiries:
    - Review account charges and billing history
    - Explain billing policies and charges
    - Process refunds or adjustments when appropriate
    - Escalate complex billing disputes

    Be transparent about charges and helpful with resolutions.
  `,
  outputKey: "billing_response",
});

const escalationHandlerAgent = new LlmAgent({
  name: "escalation_handler_agent",
  model: "gemini-2.5-flash",
  description: "Handles escalated cases requiring human intervention",
  instruction: `
    Handle escalated customer cases with empathy and urgency:
    - Acknowledge the customer's frustration
    - Provide immediate relief or compensation if appropriate
    - Escalate to appropriate internal teams
    - Provide clear next steps and timelines
    - Follow up personally on resolution

    Show genuine concern and commitment to resolution.
  `,
  outputKey: "escalation_response",
});

const generalSupportAgent = new LlmAgent({
  name: "general_support_agent",
  model: "gemini-2.5-flash",
  description: "Handles general inquiries and provides information",
  instruction: `
    Provide helpful information and support for general inquiries:
    - Answer questions about products/services
    - Provide account information and guidance
    - Direct to appropriate resources
    - Offer proactive assistance

    Be friendly, informative, and proactive.
  `,
  outputKey: "general_response",
});

/**
 * Customer Support Workflow
 *
 * Implements the following routing logic:
 * 1. Analyze Inquiry -> Decision
 * 2. Decision Branches:
 *    - Critical/Angry -> Escalation Handler
 *    - Technical -> Technical Support -> End
 *    - Billing/Refund -> Billing Support -> Resolved?
 *      - No -> Escalation Handler -> End
 *      - Yes -> End
 *    - General -> General Support -> End
 */
const supportWorkflowAgent = new LangGraphAgent({
  name: "support_workflow_agent",
  description:
    "Intelligent customer support routing and handling system using LangGraph for agent orchestration.",
  rootNode: "analyze",
  maxSteps: 10,
  nodes: [
    {
      name: "analyze",
      agent: inquiryAnalyzerAgent,
      targets: ["escalate", "technical", "billing", "general"],
    },
    {
      name: "technical",
      agent: technicalSupportAgent,
      condition: (event: any) => {
        try {
          // Parse JSON analysis from the previous event
          const analysis = JSON.parse(
            event.content.match(/\{[\s\S]*\}/)?.[0] || "{}"
          );
          // Route to technical support if category matches and not critical/angry
          return (
            analysis.category === "technical" &&
            analysis.urgency !== "critical" &&
            analysis.sentiment !== "angry"
          );
        } catch {
          return false;
        }
      },
    },
    {
      name: "billing",
      agent: billingSupportAgent,
      targets: ["escalate"], // Can escalate if unresolved
      condition: (event: any) => {
        try {
          // Parse JSON analysis from the previous event
          const analysis = JSON.parse(
            event.content.match(/\{[\s\S]*\}/)?.[0] || "{}"
          );
          // Route to billing support if category matches and not critical/angry
          return (
            ["billing", "refund"].includes(analysis.category) &&
            analysis.urgency !== "critical" &&
            analysis.sentiment !== "angry"
          );
        } catch {
          return false;
        }
      },
    },
    {
      name: "escalate",
      agent: escalationHandlerAgent,
      condition: (event: any) => {
        try {
          // Parse JSON analysis from the previous event
          const analysis = JSON.parse(
            event.content.match(/\{[\s\S]*\}/)?.[0] || "{}"
          );

          // Escalate if critical, angry, or complaint
          if (
            analysis.urgency === "critical" ||
            analysis.sentiment === "angry" ||
            analysis.category === "complaint"
          ) {
            return true;
          }

          // Also escalate if billing agent mentions escalation
          return event.content.toLowerCase().includes("escalate");
        } catch {
          return false;
        }
      },
    },
    {
      name: "general",
      agent: generalSupportAgent,
      condition: (event: any) => {
        try {
          // Parse JSON analysis from the previous event
          const analysis = JSON.parse(
            event.content.match(/\{[\s\S]*\}/)?.[0] || "{}"
          );
          // Route to general support if category matches and not critical/angry
          return (
            analysis.category === "general" &&
            analysis.urgency !== "critical" &&
            analysis.sentiment !== "angry"
          );
        } catch {
          return false;
        }
      },
    },
  ],
});

// Export the main workflow agent for use in other modules
export { supportWorkflowAgent };
```

### Visual Flow

<Mermaid
  chart="
graph TD
Start[Customer Inquiry] --> A[Analyze Inquiry]
A[Analyze Inquiry] -->|Critical/Angry| B[Escalation Handler]
A -->|Technical| C[Technical Support]
A -->|Billing/Refund| D[Billing Support]
D -->|Not Resolved| B
D -->|Resolved| E[End]
A -->|General| F[General Support]
B --> E
C --> E
F --> E
E[End]
"
/>

## How LangGraph Processing Works

LangGraph agents enable sophisticated workflow orchestration through conditional routing and state-dependent decisions:

**🌐 Node-Based Architecture**

* **Nodes:** Individual processing steps (typically agents)
* **Edges:** Conditional transitions between nodes
* **State:** Shared context that influences routing decisions
* **Dynamic routing:** Next step determined by current state and results

**🧠 Intelligent Decision Making**

1. **Execute current node** - Run the agent at current workflow position
2. **Evaluate state** - Analyze results and current context
3. **Determine next step** - Use conditional logic to choose next node
4. **Route dynamically** - Move to appropriate next node or terminate

**🔀 Conditional Flows**

Conditional flows determine which path the workflow takes based on the results of previous steps. Each node can have a `condition` function that evaluates the current context and returns `true` to execute that node, or routes to alternative targets when conditions aren't met.

```typescript
// Example: Route based on analysis results
{
  name: "technical-support",
  agent: technicalSupportAgent,
  condition: (event: any) => {
    try {
      const analysis = JSON.parse(event.content);
      // Execute this node if category is technical and not critical
      return analysis.category === "technical" &&
             analysis.urgency !== "critical";
    } catch {
      return false;
    }
  },
}
```

**📊 State Management**

* All nodes share the same session state
* Previous results influence future routing decisions
* Context accumulates throughout the workflow
* Decisions can reference any previous step's output

<Callout type="info" title="Graph Design Patterns">
  - **Start simple:** Begin with basic routing logic, add complexity gradually
  - **Plan thoroughly:** Map out all possible paths before implementation
  - **Handle edge cases:** Always have fallback routes for unexpected conditions
</Callout>

## Real-World Use Cases

**🏥 Medical Diagnosis Workflow**\
Symptoms → Initial Assessment → Specialist Routing → Tests → Diagnosis → Treatment Plan

**⚖️ Legal Document Review**\
Document Analysis → Risk Assessment → Complexity Routing → Specialist Review → Approval Flow

**💼 Loan Application Processing**\
Application Review → Risk Assessment → Manual/Auto Route → Verification → Decision → Notification

**📱 App Feature Requests**\
Request Analysis → Category Assignment → Feasibility Check → Priority Routing → Development Queue

**🎯 Content Moderation**\
Content Analysis → Risk Scoring → Auto-Approve/Review Route → Human Review → Action Decision

**🔍 Fraud Detection**\
Transaction Analysis → Risk Scoring → Investigation Routing → Evidence Gathering → Resolution

## When to Choose LangGraph Agents

<Callout type="success" title="Perfect for Complex Decision Trees">
  * **Use when:** You need sophisticated branching logic and conditional
    workflows - **Benefit:** Handle complex processes that simple linear or
    parallel patterns can't address
</Callout>

### ✅ Choose LangGraph When:

* **Complex routing logic** - Next step depends on content analysis or business rules
* **Multi-path workflows** - Different paths through the process based on conditions
* **State-dependent decisions** - Routing changes based on accumulated context
* **Exception handling** - Need sophisticated error handling and escalation paths
* **Adaptive processes** - Workflow adapts based on intermediate results
* **Integration of patterns** - Combining sequential, parallel, and loop behaviors

### ❌ Don't Use LangGraph When:

* Simple linear workflows are sufficient (use Sequential)
* All tasks can run independently (use Parallel)
* Simple iteration is needed (use Loop)
* Workflow complexity outweighs the benefits
* Debugging and maintenance overhead is too high

## Advanced Patterns

### Multi-Stage Decision Trees

Build complex workflows with multiple evaluation points and conditional routing based on accumulated results. Use when you need sophisticated decision trees that adapt based on intermediate outcomes, such as triage systems that require multiple assessment stages before final resolution.

```typescript
const multiStageWorkflow = new LangGraphAgent({
  name: "multi_stage_workflow",
  description: "Multi-stage decision tree with triage and processing phases",
  rootNode: "initial-triage",
  maxSteps: 10,
  nodes: [
    {
      name: "initial-triage",
      agent: triageAgent,
      targets: ["automated-processing", "human-review"],
    },
    {
      name: "automated-processing",
      agent: automatedProcessor,
      targets: ["finalize", "human-review"],
      condition: (event: any) => {
        // Route based on confidence score
        const result = JSON.parse(event.content);
        return result.confidence > 0.9;
      },
    },
    {
      name: "human-review",
      agent: humanReviewAgent,
      targets: ["finalize"],
    },
    {
      name: "finalize",
      agent: finalizationAgent,
    },
  ],
});
```

### Loop Within Graph

Create iterative workflows that can repeat processing steps until conditions are met. Use for quality assurance, iterative improvement, or validation loops where work needs to be refined through multiple cycles before completion.

```typescript
const iterativeWorkflow = new LangGraphAgent({
  name: "iterative_workflow",
  description: "Quality improvement loop with maximum attempts",
  rootNode: "process",
  maxSteps: 15, // Allow more steps for iterations
  nodes: [
    {
      name: "process",
      agent: contentProcessor,
      targets: ["quality-check"],
    },
    {
      name: "quality-check",
      agent: qualityAssessor,
      targets: ["approve", "improve", "escalate"],
      condition: (event: any) => {
        const quality = JSON.parse(event.content);
        const attempts =
          event.session?.state?.get("improvement_attempts", 0) || 0;

        if (quality.score >= 8) return true; // Approve
        if (attempts >= 3) return false; // Escalate (condition false means try next target)
        return false; // Improve (loop back)
      },
    },
    {
      name: "improve",
      agent: improvementAgent,
      targets: ["process"], // Loop back to process
    },
    {
      name: "approve",
      agent: approvalAgent,
    },
    {
      name: "escalate",
      agent: escalationAgent,
    },
  ],
});
```

### Parallel Processing Integration

Integrate parallel processing capabilities within graph workflows to handle concurrent tasks. Use when you need to combine the benefits of parallel execution with conditional routing, such as consensus-based decision making or multi-perspective analysis.

```typescript
const parallelIntegratedWorkflow = new LangGraphAgent({
  name: "parallel_integrated_workflow",
  description: "Workflow integrating parallel analysis for consensus decisions",
  rootNode: "parallel-analysis",
  maxSteps: 8,
  nodes: [
    {
      name: "parallel-analysis",
      agent: parallelAnalysisAgent, // ParallelAgent handling concurrent tasks
      targets: ["proceed", "additional-review"],
      condition: (event: any) => {
        const results = JSON.parse(event.content);
        const consensus = analyzeConsensus(results);
        return consensus.agreement > 0.8; // Proceed if high agreement
      },
    },
    {
      name: "proceed",
      agent: nextStepAgent,
    },
    {
      name: "additional-review",
      agent: reviewAgent,
    },
  ],
});
```

## Design Best Practices

### Design Principles

**Start Simple:** Begin with basic routing logic and add complexity gradually. Map out all possible paths before implementation to avoid unexpected edge cases and ensure comprehensive coverage.

**Keep Nodes Focused:** Design each node with a single, clear responsibility. A routing node should only handle decision logic, while processing nodes focus solely on their specific tasks. This separation improves maintainability and testing.

**Handle Edge Cases:** Always provide fallback routes for unexpected conditions and malformed data. Include error handling nodes and default paths to ensure your graph can reach a terminal state under all circumstances.

**Test Thoroughly:** Validate every possible execution path through your graph with real data. Test both expected scenarios and edge cases to ensure robust error handling and predictable behavior.

### Communication Patterns

**State Management:** Use descriptive, unique state keys and document data flow between nodes. Clear state contracts prevent conflicts and make debugging easier when nodes don't receive expected data.

**Progress Feedback:** Provide meaningful progress updates during execution. Users need visibility into long-running workflows, especially those with multiple decision points and processing stages.

### Development Tips

**Flow Mapping:** Plan your graph structure thoroughly before coding. Identify all entry points, decision criteria, and exit conditions to create a comprehensive workflow design.

**Documentation:** Document complex routing logic and state dependencies. Clear documentation is essential for maintaining and debugging sophisticated graph workflows.

**Complexity Awareness:** Be mindful of debugging challenges with complex graphs. Start with simpler patterns and gradually add sophistication as you understand the interaction patterns.

<Callout type="warn" title="Graph Complexity Warning">
  * **Start simple:** Complex graphs are hard to debug and maintain - **Document
    thoroughly:** Clear documentation is crucial for complex flows - **Test
    extensively:** Every path and edge case should be tested
</Callout>

## Related Topics

<Cards>
  <Card title="🔄 Sequential Agents" description="Building blocks that can be nodes within LangGraph workflows" href="/docs/framework/agents/workflow-agents/sequential-agents" />

  <Card title="⚡ Parallel Agents" description="Can be integrated as nodes for concurrent processing steps" href="/docs/framework/agents/workflow-agents/parallel-agents" />

  <Card title="🔁 Loop Agents" description="Can be used as nodes for iterative processing within graphs" href="/docs/framework/agents/workflow-agents/loop-agents" />

  <Card title="🏗️ Agent Builder" description="Fluent API for creating LangGraph workflows with asLangGraph()" href="/docs/framework/agents/agent-builder" />

  <Card title="🤖 LLM Agents" description="Individual agents that serve as nodes in LangGraph workflows" href="/docs/framework/agents/llm-agents" />
</Cards>

# Custom Agents
URL: /docs/framework/agents/custom-agents

Build agents with completely custom orchestration logic by inheriting from BaseAgent

***

title: Custom Agents
description: Build agents with completely custom orchestration logic by inheriting from BaseAgent
-------------------------------------------------------------------------------------------------

import { Callout } from "fumadocs-ui/components/callout";
import { Cards, Card } from "fumadocs-ui/components/card";

Custom agents provide ultimate flexibility in ADK-TS for orchestrating sophisticated workflows with conditional branching, dynamic routing, and state-dependent decisions. Think of them as the master conductors for complex, multi-path processes where the next step depends on the results of previous steps.

Unlike simple workflow patterns (`SequentialAgent`, `ParallelAgent`, `LoopAgent`), custom agents handle complex decision trees, conditional flows, and dynamic routing based on content analysis, user preferences, or business rules. They allow you to define arbitrary orchestration logic by inheriting directly from `BaseAgent` and implementing your own control flow.

<Callout type="warn" title="Advanced Feature">
  Custom agents require deep understanding of `ADK-TS` fundamentals. Master [LLM
  agents](/docs/framework/agents/llm-agents) and [workflow
  agents](/docs/framework/agents/workflow-agents) before implementing custom
  orchestration logic.
</Callout>

## Implementing Custom Logic

The core of any custom agent is the `runAsyncImpl` method where you define unique behavior:

**Signature**: `protected async *runAsyncImpl(ctx: InvocationContext): AsyncGenerator<Event, void, unknown>`

* **AsyncGenerator**: Must be an `async *` function that yields events
* **InvocationContext**: Provides access to session state, user context, and services
* **Event Yielding**: Forward events from sub-agents or create custom progress updates

### Core Concepts

**1. Sub-Agent Initialization**

Store sub-agents as instance properties and initialize them in the constructor:

```typescript
import { BaseAgent, LlmAgent } from "@iqai/adk";

export class CustomWorkflowAgent extends BaseAgent {
  private processor: LlmAgent;
  private validator: LlmAgent;

  constructor() {
    super({ name: "custom_workflow_agent" });

    this.processor = new LlmAgent({
      name: "content_processor_agent",
      model: "gemini-2.5-flash",
      description:
        "Processes user input to extract and format key information.",
      instruction: "Process the input: {user_input}",
      outputKey: "processed_content",
    });

    this.validator = new LlmAgent({
      name: "content_validator_agent",
      model: "gemini-2.5-flash",
      description:
        "Validates the processed content and determines its validity status.",
      instruction: "Validate: {processed_content}. Return 'valid' or 'invalid'",
      outputKey: "validation_result",
    });
  }
}
```

**2. State Management**

Read and write session state within `runAsyncImpl` to manage data flow:

```typescript
protected async *runAsyncImpl(
  ctx: InvocationContext
): AsyncGenerator<Event, void, unknown> {
  // Read state with defaults
  const complexity = ctx.session.state.get("complexity", "standard");

  // Make decisions based on state
  if (complexity === "high") {
    yield new Event({
      author: this.name,
      content: { parts: [{ text: "⚙️ Using advanced processing..." }] },
    });
  }

  // Set state for downstream agents
  ctx.session.state.set("processing_stage", "validation");

  // Use EventActions for auditable state updates
  yield new Event({
    author: this.name,
    content: { parts: [{ text: "✅ Processing started" }] },
    actions: new EventActions({
      stateDelta: { processing_started: true },
    }),
  });
}
```

**3. Custom Control Flow**

Implement conditional logic and retries within `runAsyncImpl`:

```typescript
protected async *runAsyncImpl(
  ctx: InvocationContext
): AsyncGenerator<Event, void, unknown> {
  // Call sub-agents and forward their events
  for await (const event of this.processor.runAsync(ctx)) {
    yield event;
  }
  for await (const event of this.validator.runAsync(ctx)) {
    yield event;
  }
  // Check validation result and implement retry logic
  const validationResult = ctx.session.state.get("validation_result");
  if (validationResult === "invalid") {
    yield new Event({
      author: this.name,
      content: { parts: [{ text: "❌ Validation failed, retrying..." }] },
    });
    // Retry logic - call processor again
    for await (const event of this.processor.runAsync(ctx)) {
      yield event;
    }
  }
}
```

**4. Template Variables**

Sub-agents access session state dynamically through template variables in their instructions:

```typescript
this.processor = new LlmAgent({
  name: "content_processor_agent",
  model: "gemini-2.5-flash",
  description: "Processes user input to extract and format key information.",
  instruction: "Process the input: {user_input}", // Using template variable
  outputKey: "processed_content",
});

this.validator = new LlmAgent({
  name: "content_validator_agent",
  model: "gemini-2.5-flash",
  description:
    "Validates the processed content and determines its validity status.",
  instruction: "Validate: {processed_content}. Return 'valid' or 'invalid'", // Using template variable
  outputKey: "validation_result",
});
```

Each sub-agent receives values like `{user_input}` and `{processed_content}` from session state automatically.

## Real-World Example: Content Quality Agent

A complete custom agent that processes content through validation, quality checks, and conditional refinement with retry logic.

```typescript
import {
  BaseAgent,
  LlmAgent,
  LoopAgent,
  InvocationContext,
  Event,
  EventActions,
} from "@iqai/adk";

export class ContentQualityAgent extends BaseAgent {
  private processor: LlmAgent;
  private validator: LlmAgent;
  private critic: LlmAgent;
  private reviser: LlmAgent;
  private qualityChecker: LlmAgent;
  private critiqueLoop: LoopAgent;

  constructor() {
    super({ name: "content_quality_agent" });

    this.processor = new LlmAgent({
      name: "content_processor_agent",
      model: "gemini-2.5-flash",
      description: "Processes and formats user content for quality enhancement",
      instruction: "Process and format: {user_input}",
      outputKey: "processed_content",
    });

    this.validator = new LlmAgent({
      name: "content_validator_agent",
      model: "gemini-2.5-flash",
      description: "Validates the processed content for required standards",
      instruction: "Validate: {processed_content}. Return 'valid' or 'invalid'",
      outputKey: "validation_result",
    });

    this.critic = new LlmAgent({
      name: "content_critic_agent",
      model: "gemini-2.5-flash",
      description: "Critiques the processed content and suggests improvements",
      instruction: "Critique: {processed_content}. Suggest improvements.",
      outputKey: "critique",
    });

    this.reviser = new LlmAgent({
      name: "content_reviser_agent",
      model: "gemini-2.5-flash",
      description:
        "Revises the processed content based on critique suggestions",
      instruction: "Revise: {processed_content} based on: {critique}",
      outputKey: "processed_content",
    });

    this.qualityChecker = new LlmAgent({
      name: "quality_checker_agent",
      model: "gemini-2.5-flash",
      description: "Checks the quality score of the processed content",
      instruction:
        "Rate quality 1-10: {processed_content}. Output only number.",
      outputKey: "quality_score",
    });

    this.critiqueLoop = new LoopAgent({
      name: "critique_loop_agent",
      description:
        "Iteratively critiques and revises content to enhance quality",
      maxIterations: 2,
      subAgents: [this.critic, this.reviser],
    });
  }

  protected async *runAsyncImpl(
    ctx: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {
    const maxRetries = 2;
    let retryCount = 0;

    // Read user preferences from state
    const complexity = ctx.session.state.get("content_complexity", "standard");
    const qualityThreshold = ctx.session.state.get("quality_threshold", 7);

    while (retryCount <= maxRetries) {
      // Step 1: Conditional processing based on complexity
      if (complexity === "high") {
        yield new Event({
          author: this.name,
          content: { parts: [{ text: "⚙️ Using advanced processing..." }] },
        });
      }

      // Step 2: Process content
      for await (const event of this.processor.runAsync(ctx)) {
        yield event;
      }

      // Step 3: Validate processed content
      for await (const event of this.validator.runAsync(ctx)) {
        yield event;
      }

      const validationResult = ctx.session.state.get("validation_result");

      if (validationResult === "invalid") {
        retryCount++;
        if (retryCount <= maxRetries) {
          yield new Event({
            author: this.name,
            content: {
              parts: [
                {
                  text: `❌ Validation failed. Retry ${retryCount}/${maxRetries}`,
                },
              ],
            },
          });
          continue;
        } else {
          yield new Event({
            author: this.name,
            content: { parts: [{ text: "⚠️ Max retries reached" }] },
          });
          return;
        }
      }

      // Step 4: Quality enhancement loop
      for await (const event of this.critiqueLoop.runAsync(ctx)) {
        yield event;
      }

      // Step 5: Final quality check
      for await (const event of this.qualityChecker.runAsync(ctx)) {
        yield event;
      }

      const qualityScore = parseInt(
        ctx.session.state.get("quality_score", "0"),
        10
      );

      // Step 6: Decision based on quality
      if (qualityScore >= qualityThreshold) {
        yield new Event({
          author: this.name,
          content: {
            parts: [{ text: `✅ Quality approved! Score: ${qualityScore}` }],
          },
          actions: new EventActions({
            stateDelta: {
              processing_complete: true,
              final_quality_score: qualityScore,
            },
          }),
        });
        return;
      } else {
        retryCount++;
        if (retryCount <= maxRetries) {
          yield new Event({
            author: this.name,
            content: {
              parts: [
                {
                  text: `🔄 Quality below threshold. Regenerating (${retryCount}/${maxRetries})...`,
                },
              ],
            },
          });
        } else {
          yield new Event({
            author: this.name,
            content: {
              parts: [{ text: "⚠️ Max regeneration attempts reached" }],
            },
          });
          return;
        }
      }
    }
  }
}
```

**What Makes This Custom:**

* **State-driven decisions**: Routes based on complexity and quality thresholds
* **Retry logic with limits**: Handles validation failures with bounded retries
* **Mixed orchestration**: Combines LoopAgent with custom conditional flow
* **Quality gates**: Multi-stage validation before approval
* **Auditable state updates**: Uses EventActions for transparency

## Real-World Use Cases

**📝 Multi-Perspective Content Analysis**
Sentiment + Topics + Keywords + Priority Assessment (all simultaneously)

**🔍 Comprehensive Research**
Web Search + Academic Papers + News + Social Media (parallel data gathering)

**📊 Financial Analysis**
Technical Analysis + Fundamental Analysis + News Sentiment + Risk Assessment

**🛠️ Quality Assurance**
Grammar Check + Fact Verification + Style Review + Compliance Check

**🌍 Multi-Language Processing**
Translation + Sentiment + Cultural Context + Localization (per language)

**📊 Data Validation**
Format Check + Business Rules + Data Quality + Duplicate Detection

## When to Use Custom Agents

Use custom agents when standard workflow patterns don't meet your needs:

* **Conditional Logic**: Execute different sub-agents based on runtime conditions or results
* **Dynamic Agent Selection**: Choose sub-agents dynamically based on evaluation or analysis
* **Complex State Management**: Implement intricate state logic beyond simple sequential passing
* **External Integrations**: Incorporate API calls, databases, or custom libraries in orchestration
* **Unique Workflow Patterns**: Implement logic that doesn't fit sequential, parallel, or loop structures
* **Advanced Error Handling**: Custom retry logic, fallback strategies, and recovery mechanisms

## Common Custom Agent Patterns

### Routing Agent Pattern

Dynamically route requests to specialized sub-agents based on runtime analysis. This pattern evaluates input complexity, user tier, or content characteristics to select the optimal processing path.

**Key Features:**

* Input complexity analysis
* Multi-tier processing logic
* Dynamic agent selection based on multiple criteria
* Conditional branching without nested if-else chains

**Use Cases:** Customer support ticket routing, content processing tiers, complexity-based workflows, resource optimization

```typescript
import { BaseAgent, LlmAgent, InvocationContext, Event } from "@iqai/adk";

export class IntelligentRouterAgent extends BaseAgent {
  private basicProcessor: LlmAgent;
  private advancedProcessor: LlmAgent;
  private expertProcessor: LlmAgent;

  constructor() {
    super({ name: "intelligent_router_agent" });

    this.basicProcessor = new LlmAgent({
      name: "basic_processor_agent",
      model: "gemini-2.5-flash",
      description: "Handles basic processing tasks",
      instruction: "Handle with basic processing: {user_input}",
      outputKey: "result",
    });

    this.advancedProcessor = new LlmAgent({
      name: "advanced_processor_agent",
      model: "gemini-2.5-flash",
      description: "Handles advanced processing tasks",
      instruction: "Apply advanced analysis: {user_input}",
      outputKey: "result",
    });

    this.expertProcessor = new LlmAgent({
      name: "expert_processor_agent",
      model: "gemini-2.5-flash",
      description: "Handles expert-level processing tasks",
      instruction: "Provide expert-level analysis: {user_input}",
      outputKey: "result",
    });
  }

  protected async *runAsyncImpl(
    ctx: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {
    // Analyze input to determine routing
    const complexity = this.analyzeComplexity(
      ctx.session.state.get("user_input", "")
    );
    const userTier = ctx.session.state.get("user_tier", "standard");

    yield new Event({
      author: this.name,
      content: {
        parts: [
          {
            text: `📊 Analyzing: Complexity ${complexity.toFixed(
              2
            )}, Tier ${userTier}`,
          },
        ],
      },
    });

    // Route based on multiple criteria
    let selectedAgent;
    let processingLevel;

    if (complexity > 0.8 && userTier === "premium") {
      selectedAgent = this.expertProcessor;
      processingLevel = "expert";
    } else if (complexity > 0.5 || userTier === "professional") {
      selectedAgent = this.advancedProcessor;
      processingLevel = "advanced";
    } else {
      selectedAgent = this.basicProcessor;
      processingLevel = "basic";
    }

    yield new Event({
      author: this.name,
      content: {
        parts: [{ text: `🎯 Routing to ${processingLevel} processor` }],
      },
    });

    // Execute selected agent
    for await (const event of selectedAgent.runAsync(ctx)) {
      yield event;
    }
  }

  private analyzeComplexity(input: string): number {
    const factors = {
      length: Math.min(input.length / 1000, 1),
      technicalTerms:
        (input.match(/\b(API|database|algorithm|framework)\b/gi) || []).length /
        10,
      questionComplexity: (input.match(/\?/g) || []).length / 5,
    };

    return Math.min(
      (factors.length + factors.technicalTerms + factors.questionComplexity) /
        3,
      1
    );
  }
}
```

### Retry with Backoff Pattern

Implement sophisticated retry logic with exponential backoff, different retry strategies per failure type, and graceful fallback when all retries are exhausted. This pattern goes beyond basic retries by adding timing strategies and fallback agents.

**Key Features:**

* Exponential backoff with configurable timing
* Attempt tracking and limits
* Fallback strategy when primary fails
* Graceful degradation

**Use Cases:** External API integration, unreliable services, quality assurance with fallback options, resilient processing

```typescript
import { BaseAgent, LlmAgent, InvocationContext, Event } from "@iqai/adk";

export class ResilientProcessorAgent extends BaseAgent {
  private primaryAgent: LlmAgent;
  private fallbackAgent: LlmAgent;

  constructor() {
    super({ name: "resilient_processor_agent" });

    this.primaryAgent = new LlmAgent({
      name: "primary_processor_agent",
      model: "gemini-2.5-flash",
      description: "Primary processor with high accuracy",
      instruction: "Process with high accuracy: {user_input}",
      outputKey: "result",
    });

    this.fallbackAgent = new LlmAgent({
      name: "fallback_processor_agent",
      model: "gemini-2.5-flash",
      description: "Fallback processor with robust handling",
      instruction: "Process with fallback method: {user_input}",
      outputKey: "result",
    });
  }

  protected async *runAsyncImpl(
    ctx: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {
    const maxRetries = 3;
    let attempt = 0;
    let backoffMs = 1000; // Start with 1 second

    while (attempt < maxRetries) {
      try {
        yield new Event({
          author: this.name,
          content: {
            parts: [{ text: `🔄 Attempt ${attempt + 1}/${maxRetries}` }],
          },
        });

        // Try primary processing
        for await (const event of this.primaryAgent.runAsync(ctx)) {
          yield event;
        }

        // Success - exit retry loop
        yield new Event({
          author: this.name,
          content: { parts: [{ text: "✅ Processing successful" }] },
        });
        return;
      } catch (error) {
        attempt++;
        const errorMessage = (error as Error).message;

        yield new Event({
          author: this.name,
          content: {
            parts: [{ text: `❌ Attempt ${attempt} failed: ${errorMessage}` }],
          },
        });

        if (attempt < maxRetries) {
          yield new Event({
            author: this.name,
            content: {
              parts: [{ text: `⏳ Retrying in ${backoffMs}ms...` }],
            },
          });

          await new Promise((resolve) => setTimeout(resolve, backoffMs));
          backoffMs *= 2; // Exponential backoff
        }
      }
    }

    // All retries failed - use fallback strategy
    yield new Event({
      author: this.name,
      content: {
        parts: [{ text: "🔄 All retries exhausted, using fallback processor" }],
      },
    });

    for await (const event of this.fallbackAgent.runAsync(ctx)) {
      yield event;
    }
  }
}
```

### State Machine Pattern

Implement workflows with explicit state transitions, validation rules, and conditional branching based on current state. This pattern defines valid transitions between states and enforces workflow rules throughout execution.

**Key Features:**

* Explicit state transition validation
* State-to-state mapping with allowed transitions
* Loop-back capabilities for retries
* Clear workflow visualization

**Use Cases:** Approval workflows, multi-stage processes, complex business logic with validation, document processing pipelines

```typescript
import { BaseAgent, InvocationContext, Event } from "@iqai/adk";

type WorkflowState =
  | "initialized"
  | "analyzing"
  | "processing"
  | "validating"
  | "completed"
  | "failed";

export class WorkflowStateMachineAgent extends BaseAgent {
  private readonly stateTransitions: Record<WorkflowState, WorkflowState[]> = {
    initialized: ["analyzing", "failed"],
    analyzing: ["processing", "failed"],
    processing: ["validating", "analyzing", "failed"],
    validating: ["completed", "processing", "failed"],
    completed: [],
    failed: ["initialized"],
  };

  constructor() {
    super({ name: "workflow_state_machine_agent" });
  }

  protected async *runAsyncImpl(
    ctx: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {
    let currentState: WorkflowState = ctx.session.state.get(
      "workflow_state",
      "initialized"
    );

    while (currentState !== "completed" && currentState !== "failed") {
      yield new Event({
        author: this.name,
        content: { parts: [{ text: `🔄 State: ${currentState}` }] },
      });

      const nextState = await this.executeStateLogic(currentState, ctx);

      // Validate state transition
      if (!this.isValidTransition(currentState, nextState)) {
        yield new Event({
          author: this.name,
          content: {
            parts: [
              {
                text: `❌ Invalid transition: ${currentState} → ${nextState}`,
              },
            ],
          },
        });
        currentState = "failed";
        break;
      }

      // Update state and continue
      yield new Event({
        author: this.name,
        content: {
          parts: [{ text: `➡️ Transition: ${currentState} → ${nextState}` }],
        },
      });

      currentState = nextState;
      ctx.session.state.set("workflow_state", currentState);
      ctx.session.state.set("state_transition_time", new Date().toISOString());
    }

    yield new Event({
      author: this.name,
      content: { parts: [{ text: `🏁 Final state: ${currentState}` }] },
    });
  }

  private async executeStateLogic(
    state: WorkflowState,
    ctx: InvocationContext
  ): Promise<WorkflowState> {
    switch (state) {
      case "initialized":
        return this.canStartAnalysis(ctx) ? "analyzing" : "failed";
      case "analyzing":
        return await this.performAnalysis(ctx);
      case "processing":
        return await this.performProcessing(ctx);
      case "validating":
        return await this.performValidation(ctx);
      default:
        return "failed";
    }
  }

  private isValidTransition(from: WorkflowState, to: WorkflowState): boolean {
    return this.stateTransitions[from].includes(to);
  }

  private canStartAnalysis(ctx: InvocationContext): boolean {
    return !!ctx.session.state.get("user_input", "");
  }

  private async performAnalysis(
    ctx: InvocationContext
  ): Promise<WorkflowState> {
    // Analysis logic here
    return "processing";
  }

  private async performProcessing(
    ctx: InvocationContext
  ): Promise<WorkflowState> {
    // Processing logic here
    const processingSuccess = Math.random() > 0.3; // 70% success rate
    return processingSuccess ? "validating" : "analyzing";
  }

  private async performValidation(
    ctx: InvocationContext
  ): Promise<WorkflowState> {
    // Validation logic here
    const validationSuccess = Math.random() > 0.2; // 80% success rate
    return validationSuccess ? "completed" : "processing";
  }
}
```

## Best Practices

### Design Principles

**Single Responsibility:** Design each custom agent with a focused, specific orchestration purpose. A content workflow agent should handle content generation and validation, while a routing agent should focus on request analysis and delegation. This focused approach makes agents easier to test, debug, and reuse across different workflows.

**Clear State Contracts:** Use descriptive, unique state keys (`user_preferences`, `analysis_results`, `validation_status`) and document what data flows between agents. This prevents conflicts and makes debugging much easier when agents don't receive expected data.

**Predictable Logic:** Make your conditional logic easy to understand and test. Use clear variable names, document decision points, and structure your code so that execution paths are obvious. Avoid deeply nested conditions that obscure the flow.

**Efficient Execution:** Skip unnecessary work and provide meaningful progress feedback. Check preconditions early, exit fast when possible, and yield progress events during long operations to keep users informed.

### Communication Patterns

**Progress Events:** Provide regular feedback during long-running operations. Users need to understand what's happening, especially for complex workflows that may take time to complete.

**State Updates:** Use `EventActions` to update session state for better auditability and transparency. This creates a clear audit trail of state changes throughout the workflow.

### Development Tips

**Start Simple:** Begin with sequential workflows before moving to complex conditional logic. Add decision points gradually as you understand the agent interactions and state flow requirements.

**Test Isolation:** Test individual agents independently before testing the complete custom workflow. Mock external dependencies and sub-agents during unit testing to isolate orchestration logic.

**State Debugging:** Use clear state key names and log state transitions to make debugging easier when agents don't receive expected data or make wrong decisions.

## Related Topics

<Cards>
  <Card title="🤖 LLM Agents" description="The building blocks that custom agents orchestrate" href="/docs/framework/agents/llm-agents" />

  <Card title="🔄 Workflow Agents" description="Standard patterns to use before building custom logic" href="/docs/framework/agents/workflow-agents" />

  <Card title="📡 Events & Actions" description="Communication system for agent coordination" href="/docs/framework/events" />

  <Card title="🧠 Sessions & State" description="Managing data flow and persistence" href="/docs/framework/sessions/session" />
</Cards>

# Multi-Agent Systems
URL: /docs/framework/agents/multi-agents

Compose specialized agents for complex distributed tasks

***

title: Multi-Agent Systems
description: Compose specialized agents for complex distributed tasks
---------------------------------------------------------------------

import { Cards, Card } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";

Multi-Agent Systems enable you to build sophisticated applications by combining specialized agents, each with distinct capabilities and expertise. Rather than creating a single agent that handles everything, you compose multiple focused agents that work together—some for research, others for analysis, writing, or validation—creating powerful systems that can tackle complex problems no single agent could handle effectively.

ADK-TS provides a robust foundation for multi-agent systems through hierarchical agent organization, shared state management, and flexible communication patterns. You can build everything from simple sequential pipelines to complex, dynamic routing systems that adapt based on user needs.

<Callout type="info" title="When to Use Multi-Agent Systems">
  **Best for:** Complex workflows requiring multiple specializations, tasks
  needing different perspectives simultaneously, applications requiring clear
  separation of concerns, or systems where components need independent
  development and maintenance.
</Callout>

## Quick Start Example

Here's a content processing system that analyzes customer feedback using multiple specialized agents working in parallel and sequence:

```typescript
import {
  LlmAgent,
  SequentialAgent,
  ParallelAgent,
  AgentBuilder,
} from "@iqai/adk";
import * as dotenv from "dotenv";

dotenv.config();

// Specialist agents for content analysis
const sentimentAnalyzerAgent = new LlmAgent({
  name: "sentiment_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes emotional tone and sentiment",
  instruction:
    "Analyze the sentiment and emotional tone of the content. Classify as positive, negative, or neutral with confidence scores.",
  outputKey: "sentiment_analysis",
});

const topicExtractorAgent = new LlmAgent({
  name: "topic_extractor_agent",
  model: "gemini-2.5-flash",
  description: "Identifies key topics and themes",
  instruction:
    "Extract the main topics, themes, and key concepts from the content. Provide a hierarchical list.",
  outputKey: "topic_analysis",
});

// Parallel analysis phase
const analysisPhaseAgent = new ParallelAgent({
  name: "content_analysis_agent",
  description: "Perform multiple types of content analysis simultaneously",
  subAgents: [sentimentAnalyzerAgent, topicExtractorAgent],
});

// Content processor and formatter
const contentSummarizerAgent = new LlmAgent({
  name: "content_summarizer_agent",
  model: "gemini-2.5-flash",
  description: "Creates comprehensive summaries",
  instruction:
    "Based on sentiment analysis: {sentiment_analysis} and topic analysis: {topic_analysis}, create a comprehensive summary highlighting key insights.",
  outputKey: "content_summary",
});

// Complete processing pipeline
const contentProcessorAgent = new SequentialAgent({
  name: "content_processing_system_agent",
  description: "Analyze and summarize content using multiple perspectives",
  subAgents: [
    analysisPhaseAgent, // Parallel: sentiment + topic analysis
    contentSummarizerAgent, // Sequential: combine insights into summary
  ],
});

// Usage with AgentBuilder
const { runner } = await AgentBuilder.create("root_agent")
  .withAgent(contentProcessorAgent)
  .build();

const result = await runner.ask(
  "Analyze this customer feedback: 'I love the new features, but the interface is confusing and slow.'"
);

console.log("Result:", result);
```

### What Makes This Multi-Agent

This system demonstrates key multi-agent capabilities in ADK-TS:

* **⚡ Parallel Processing**: Sentiment and topic analysis happen simultaneously, reducing total processing time
* **🎯 Specialization**: Each agent has a focused responsibility—one analyzes emotions, another extracts topics
* **📊 State Flow**: Results flow between agents using `outputKey` and `{key}` state references
* **🔄 Orchestration**: `ParallelAgent` and `SequentialAgent` coordinate execution patterns
* **🧩 Modularity**: Each agent can be tested, modified, or replaced independently
* **🔗 Composability**: Workflow agents can be nested within other workflow agents

## Core Multi-Agent Concepts

ADK-TS provides foundational building blocks that enable sophisticated multi-agent system architectures. Understanding these concepts is essential for building effective multi-agent applications.

### Agent Hierarchy and Organization

Multi-agent systems in ADK-TS are organized as tree structures where agents have parent-child relationships through the `subAgents` parameter.

**Creating Hierarchy:** When you create an agent with `subAgents`, ADK-TS automatically establishes the parent-child relationships and sets the `parentAgent` property on each child.

**Single Parent Rule:** Each agent instance can only belong to one parent. This constraint ensures clear organizational boundaries and prevents circular dependencies or ambiguous ownership.

**Navigation Methods:** The hierarchy enables agent discovery using `agent.findAgent(name)` to locate any agent in the subtree, or `agent.parentAgent` to access the immediate parent. The `rootAgent` property provides access to the top-level agent.

**Transfer Scope:** The hierarchy defines which agents can transfer control to each other—agents can typically transfer to their parent, their sub-agents, and their siblings (peer agents under the same parent).

```typescript
// Establishing agent hierarchy
const billingAgent = new LlmAgent({
  name: "billing_agent",
  description: "Handles billing and payment issues",
});

const technicalAgent = new LlmAgent({
  name: "technical_agent",
  description: "Handles technical support and troubleshooting",
});

const coordinatorAgent = new LlmAgent({
  name: "coordinator_agent",
  model: "gemini-2.5-flash",
  description: "Routes customer inquiries to specialist agents",
  subAgents: [billingAgent, technicalAgent], // Creates parent-child relationship
});

// ADK-TS automatically sets: billingAgent.parentAgent === coordinatorAgent
// Get root agent: billingAgent.rootAgent === coordinatorAgent
// Navigate hierarchy: coordinatorAgent.findAgent("technical_agent") === technicalAgent
```

### Workflow Agents for Orchestration

ADK-TS provides specialized workflow agents that orchestrate the execution of other agents without performing tasks themselves. These agents control how and when their sub-agents execute, enabling complex coordination patterns.

#### Sequential Workflow Agents

`SequentialAgent` executes sub-agents one after another in the specified order.

* **Execution Flow:** Uses the same `InvocationContext` throughout, enabling seamless state sharing
* **State Persistence:** Each agent's output is preserved in session state for subsequent agents
* **Error Behavior:** Execution stops on the first error unless handled by callbacks
* **Use Cases:** Data processing pipelines, multi-step workflows, validation chains

```typescript
import { LlmAgent, SequentialAgent, FileOperationsTool } from "@iqai/adk";

const dataFetcherAgent = new LlmAgent({
  name: "data_fetcher_agent",
  model: "gemini-2.5-flash",
  description: "Fetches the latest market data",
  instruction: "Retrieve the latest market data for analysis",
  outputKey: "raw_data", // Saved to session state
});

const dataAnalyzerAgent = new LlmAgent({
  name: "data_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes the fetched market data",
  instruction: "Analyze the market data: {raw_data} and identify key trends", // State injection
  outputKey: "analysis_results",
});

const reportGeneratorAgent = new LlmAgent({
  name: "report_generator_agent",
  model: "gemini-2.5-flash",
  description: "Generates a comprehensive report from analysis results",
  instruction:
    "Generate a comprehensive report from analysis: {analysis_results}",
  outputKey: "final_report",
  tools: [new FileOperationsTool()], // Example tool usage
});

const marketPipelineAgent = new SequentialAgent({
  name: "market_pipeline_agent",
  description: "Complete market analysis workflow",
  subAgents: [dataFetcherAgent, dataAnalyzerAgent, reportGeneratorAgent],
});

// Execution: dataFetcherAgent → dataAnalyzerAgent → reportGeneratorAgent
// State flows: raw_data → analysis_results → final_report
```

#### Parallel Workflow Agents

`ParallelAgent` executes sub-agents simultaneously to improve performance and gather multiple perspectives.

* **Concurrent Execution:** All sub-agents run at the same time, reducing total execution time
* **Branch Isolation:** Each sub-agent gets a unique branch identifier (`ParentName.ChildName`) for isolated execution tracking
* **Shared State:** Despite branch isolation, all agents share the same session state for data exchange
* **Synchronization:** The `ParallelAgent` waits for all sub-agents to complete before continuing
* **Conflict Prevention:** Use distinct `outputKey` values to avoid state overwrites
* **Use Cases:** Multi-perspective analysis, independent task execution, data aggregation

```typescript
import { LlmAgent, ParallelAgent } from "@iqai/adk";

const technicalAnalyzerAgent = new LlmAgent({
  name: "technical_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyze data from a technical perspective",
  instruction: "Perform technical analysis on the provided data",
  outputKey: "technical_analysis", // Unique key to avoid conflicts
});

const fundamentalAnalyzerAgent = new LlmAgent({
  name: "fundamental_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyze data from a fundamental perspective",
  instruction: "Perform fundamental analysis on the provided data",
  outputKey: "fundamental_analysis", // Different key
});

const sentimentAnalyzerAgent = new LlmAgent({
  name: "sentiment_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyze market sentiment from the data",
  instruction: "Analyze market sentiment from the provided data",
  outputKey: "sentiment_analysis", // Another unique key
});

const multiPerspectiveAnalysisAgent = new ParallelAgent({
  name: "multi_perspective_analysis_agent",
  description: "Analyze data from multiple perspectives simultaneously",
  subAgents: [
    technicalAnalyzerAgent,
    fundamentalAnalyzerAgent,
    sentimentAnalyzerAgent,
  ],
});

// Execution: All three analyzers run concurrently
// Branch contexts: multi_perspective_analysis_agent.technical_analyzer_agent, multi_perspective_analysis_agent.fundamental_analyzer_agent, multi_perspective_analysis_agent.sentiment_analyzer_agent.
// State populated with: technical_analysis, fundamental_analysis, sentiment_analysis
// Subsequent agents can access all results: "Combine insights from {technical_analysis}, {fundamental_analysis}, and {sentiment_analysis}"
```

#### Loop Workflow Agents

`LoopAgent` executes sub-agents repeatedly until specific termination conditions are met.

* **Termination Control:** Stops when `maxIterations` is reached or any sub-agent escalates with `actions.escalate = true`
* **State Persistence:** Uses the same `InvocationContext` across iterations, allowing progressive refinement
* **Iteration Tracking:** State can be updated between iterations to control loop behavior
* **Use Cases:** Iterative improvement, quality assurance, retry logic, convergence-based workflows

```typescript
import { LoopAgent, LlmAgent, BaseAgent, Event, EventActions, InvocationContext } from "@iqai/adk";

// Custom agent to control loop termination
class QualityCheckerAgent extends BaseAgent {
  constructor() {
    super({
      name: "quality_checker_agent",
      description:
        "Evaluates quality and decides whether to continue iterating",
    });
  }

  protected async *runAsyncImpl(ctx: InvocationContext) {
    const qualityScore = ctx.session.state.get("quality_score", 0);
    const iteration = ctx.session.state.get("iteration_count", 0) + 1;

    // Update iteration counter
    ctx.session.state.set("iteration_count", iteration);

    // Stop if quality is sufficient (score >= 8) or too many attempts
    const shouldStop = qualityScore >= 8 || iteration >= 5;

    yield new Event({
      author: this.name,
      content: {
        parts: [
          {
            text: `Iteration ${iteration}: Quality score ${qualityScore}. ${
              shouldStop ? "Quality sufficient!" : "Needs improvement."
            }`,
          },
        ],
      },
      actions: new EventActions({ escalate: shouldStop }),
    });
  }
}

const contentImproverAgent = new LlmAgent({
  name: "content_improver_agent",
  model: "gemini-2.5-flash",
  description: "Improves content quality based on feedback",
  instruction:
    "Improve the content quality. Rate the current quality from 1-10 and provide an improved version.",
  outputKey: "quality_score", // Will be used by QualityChecker
});

const iterativeImprovementAgent = new LoopAgent({
  name: "iterative_improvement_agent",
  description: "Iteratively improve content until quality standards are met",
  maxIterations: 10, // Safety limit
  subAgents: [contentImproverAgent, new QualityCheckerAgent()],
});

// Execution: contentImprover → QualityChecker → repeat until escalation
// Loop continues until quality_score >= 8 or maxIterations reached
```

### Communication Patterns

ADK-TS provides several mechanisms for agents to exchange data and coordinate their actions. Understanding these patterns is crucial for building effective multi-agent systems.

#### Shared Session State

The primary communication mechanism in ADK-TS is through shared session state, enabling data flow between agents in the same execution context.

**State Storage:** Agents write data to session state using the `outputKey` property, which automatically saves the agent's response to the specified key.

**State Access:** Use `{keyName}` syntax in agent instructions to reference state values. ADK-TS automatically injects the actual values before sending instructions to the LLM.

**State Lifecycle:** State persists throughout the entire agent execution chain, allowing data to flow from one agent to the next.

**Best Practices:**

* Use descriptive, unique keys: `user_preferences`, `analysis_results`, `validation_status`
* Ensure keys don't conflict, especially in parallel execution
* Document state contracts between agents
* Validate state presence before consuming

```typescript
import { LlmAgent, SequentialAgent } from "@iqai/adk";

// Producer agent - writes to state
const dataCollectorAgent = new LlmAgent({
  name: "data_collector_agent",
  model: "gemini-2.5-flash",
  description: "Collects user preferences and demographic information",
  instruction:
    "Collect user preferences and demographic information from the input",
  outputKey: "user_profile", // Saves response to state["user_profile"]
});

// Consumer agent - reads from state
const recommendationEngineAgent = new LlmAgent({
  name: "recommendation_engine_agent",
  model: "gemini-2.5-flash",
  description: "Generates personalized recommendations based on user profile",
  instruction:
    "Based on the user profile: {user_profile}, generate personalized recommendations", // {user_profile} gets replaced with actual data
});

const personalizationAgent = new SequentialAgent({
  name: "personalization_agent",
  description: "Collect preferences and generate recommendations",
  subAgents: [dataCollectorAgent, recommendationEngineAgent],
});

// Flow: dataCollectorAgent saves to state → recommendationEngineAgent reads from state
```

#### Agent Transfer (Dynamic Routing)

ADK-TS enables intelligent, LLM-driven routing where agents can dynamically transfer control to other agents based on the context and user needs.

**How It Works:** When an agent has sub-agents, ADK-TS automatically enables `AutoFlow`, which provides a `transfer_to_agent()` function. The LLM can call this function to transfer control to an appropriate specialist agent.

**Transfer Scope:** Agents can transfer to:

* Their sub-agents (delegation down the hierarchy)
* Their parent agent (escalation up the hierarchy)
* Their sibling agents (peer-to-peer routing, if `disallowTransferToPeers` is false)

**AutoFlow Requirements:** The agent must have sub-agents to enable transfer capabilities. Clear agent descriptions help the LLM make better routing decisions.

**Configuration:** Use `disallowTransferToParent` and `disallowTransferToPeers` to restrict transfer directions if needed.

```typescript
import { LlmAgent } from "@iqai/adk";

/// Specialist agents with clear descriptions
const billingAgent = new LlmAgent({
  name: "billing_agent",
  description: "Handles billing and payment issues",
});

const technicalAgent = new LlmAgent({
  name: "technical_agent",
  description: "Handles technical support and troubleshooting",
});

// Coordinator with clear transfer instructions
const coordinatorAgent = new LlmAgent({
  name: "coordinator_agent",
  model: "gemini-2.5-flash",
  description: "Routes customer inquiries to specialist agents",
  instruction: `You coordinate customer support. Analyze the user's issue and transfer to the appropriate specialist:

- For billing, payment, subscription, or refund issues → transfer to 'billing_agent'
- For technical problems, bugs, or system issues → transfer to 'technical_agent'  
- For general questions, handle them yourself

Use the transfer_to_agent function when you identify a specialist who can better help.`,
  subAgents: [billingAgent, technicalAgent], // Enables AutoFlow
});

// Usage examples:
// "I was charged twice this month" → transfers to billing_agent
// "The app keeps crashing" → transfers to technical_agent
// "What are your business hours?" → handles directly (no transfer)
```

#### Agent Tools (Explicit Invocation)

`AgentTool` allows you to wrap any agent as a callable tool, enabling explicit, controlled invocation with clear contracts.

**How It Works:** Wrap an agent with `AgentTool` and add it to another agent's `tools` list. The LLM can then invoke the wrapped agent like any other tool, receiving its output as a tool result.

**Execution Model:** When invoked, `AgentTool` creates a child invocation context, runs the wrapped agent, captures the response, and returns it to the calling agent. State changes from the wrapped agent are preserved.

**Advantages:**

* Explicit control over agent invocation
* Clear, deterministic tool contracts
* Composable agent architectures
* Results flow directly back to the caller

**When to Use:** Choose `AgentTool` when you need predictable, explicit agent invocation rather than dynamic routing.

```typescript
import { AgentTool, LlmAgent } from "@iqai/adk";

// Specialized capability agents
const dataValidatorAgent = new LlmAgent({
  name: "data_validator_agent",
  model: "gemini-2.5-flash",
  description: "Validates data quality and format",
  instruction:
    "Analyze the provided data for completeness, accuracy, and format issues. Return validation results.",
});

const insightExtractorAgent = new LlmAgent({
  name: "insight_extractor_agent",
  model: "gemini-2.5-flash",
  description: "Extracts key insights and patterns from data",
  instruction:
    "Analyze the data and extract the most important insights, trends, and patterns.",
});

// Orchestrating agent that uses other agents as tools
const dataAnalystAgent = new LlmAgent({
  name: "data_analyst_agent",
  model: "gemini-2.5-flash",
  description:
    "Comprehensive data analysis using validation and insight extraction",
  instruction: `You are a data analyst. For any data analysis request:
    1. First use validate_data_tool to check data quality
    2. Then use the extract_insights_tool to find patterns
    3. Combine the results into a comprehensive analysis report`,
  tools: [
    new AgentTool({
      name: "validate_data_tool",
      agent: dataValidatorAgent,
      description: "Validate data quality and format",
    }),
    new AgentTool({
      name: "extract_insights_tool",
      agent: insightExtractorAgent,
      description: "Extract key insights from data",
    }),
  ],
});

// Usage: dataAnalystAgent can call validate_data_tool and extract_insights_tool as needed
// Each tool invocation runs the wrapped agent and returns results
```

## Common Multi-Agent Patterns

### Coordinator/Dispatcher Pattern

A central agent intelligently routes requests to specialized agents based on request analysis and agent capabilities.

**Structure:** Main coordinator agent with specialist sub-agents

**Communication:** LLM-driven agent transfer using `AutoFlow`

**Best for:** Customer service systems, help desks, domain-specific routing, request classification

**Key Characteristics:**

* Single entry point for all user requests
* Dynamic routing based on content analysis
* Specialists focus on their domain expertise
* Coordinator handles routing logic and fallback cases

```typescript
import { LlmAgent } from "@iqai/adk";

// Specialist agents with clear, distinct descriptions
const billingSpecialistAgent = new LlmAgent({
  name: "billing_specialist_agent",
  model: "gemini-2.5-flash",
  description:
    "Handles billing issues, payment problems, refunds, and subscription management",
  instruction:
    "You are a billing specialist. Help customers with payment issues, billing questions, refunds, and subscription management.",
});

const technicalSupportAgent = new LlmAgent({
  name: "technical_support_agent",
  model: "gemini-2.5-flash",
  description:
    "Resolves technical problems, system issues, bugs, and integration questions",
  instruction:
    "You are a technical support specialist. Help customers resolve technical issues, system problems, and integration questions.",
});

const generalSupportAgent = new LlmAgent({
  name: "general_support_agent",
  model: "gemini-2.5-flash",
  description:
    "Provides general information, account questions, and product assistance",
  instruction:
    "You provide general customer support for account questions, product information, and general assistance.",
});

// Coordinator with clear routing logic
const customerServiceAgent = new LlmAgent({
  name: "customer_service_agent",
  model: "gemini-2.5-flash",
  description: "Routes customer inquiries to appropriate specialists",
  instruction: `You are a customer service coordinator. Analyze customer requests and route them to the appropriate specialist:

- For billing, payments, refunds, or subscription issues → transfer_to_agent('billing_specialist_agent')  
- For technical problems, bugs, system issues, or integrations → transfer_to_agent('technical_support_agent')
- For general questions, account info, or product features → transfer_to_agent('general_support_agent')

If the request doesn't clearly fit a category, handle it yourself or ask for clarification.`,
  subAgents: [
    billingSpecialistAgent,
    technicalSupportAgent,
    generalSupportAgent,
  ],
});

// Usage examples:
// "I was double-charged this month" → routes to billing_specialist_agent
// "The app keeps crashing" → routes to technical_support_agent
// "How do I change my password?" → routes to general_support_agent
```

### Sequential Pipeline Pattern

Multi-step workflows where agents execute in a specific order, with each agent building on the previous agent's output.

**Structure:** `SequentialAgent` orchestrating specialized sub-agents

**Communication:** Shared session state using `outputKey` and `{key}` references

**Best for:** Data processing pipelines, content creation workflows, multi-stage analysis, validation chains

**Key Characteristics:**

* Deterministic execution order
* Each agent receives output from previous agents
* State accumulates throughout the pipeline
* Failure at any step can halt the entire process

```typescript
import { LlmAgent, SequentialAgent } from "@iqai/adk";

// Content creation pipeline example
const contentResearcherAgent = new LlmAgent({
  name: "content_researcher_agent",
  model: "gemini-2.5-flash",
  description: "Researches topics and gathers relevant information",
  instruction:
    "Research the given topic thoroughly. Gather key facts, statistics, and relevant information.",
  outputKey: "research_data", // Output saved to session state
});

const contentOutlinerAgent = new LlmAgent({
  name: "content_outliner_agent",
  model: "gemini-2.5-flash",
  description: "Creates structured outlines from research data",
  instruction:
    "Based on the research data: {research_data}, create a detailed content outline with main points and structure.", // References research_data from state
  outputKey: "content_outline",
});

const contentWriterAgent = new LlmAgent({
  name: "content_writer_agent",
  model: "gemini-2.5-flash",
  description: "Writes comprehensive articles based on research and outlines",
  instruction:
    "Using the research: {research_data} and outline: {content_outline}, write a comprehensive, well-structured article.", // References both previous outputs
  outputKey: "draft_content",
});

const contentEditorAgent = new LlmAgent({
  name: "content_editor_agent",
  model: "gemini-2.5-flash",
  description: "Reviews and edits content for quality and accuracy",
  instruction:
    "Review and edit the draft content: {draft_content}. Improve clarity, flow, and accuracy.",
  outputKey: "final_content",
});

// Sequential pipeline orchestration
const contentCreationPipelineAgent = new SequentialAgent({
  name: "content_creation_pipeline_agent",
  description: "Complete content creation from research to final edited piece",
  subAgents: [
    contentResearcherAgent,
    contentOutlinerAgent,
    contentWriterAgent,
    contentEditorAgent,
  ],
});

// Execution flow:
// 1. contentResearcherAgent → state["research_data"]
// 2. contentOutlinerAgent → reads research_data → state["content_outline"]
// 3. contentWriterAgent → reads research_data + content_outline → state["draft_content"]
// 4. contentEditorAgent → reads draft_content → state["final_content"]
```

### Parallel Processing Pattern

Execute independent tasks simultaneously to improve performance, then combine results into a comprehensive analysis.

**Structure:** `ParallelAgent` for concurrent execution, optionally followed by a synthesis agent

**Communication:** Each parallel agent writes to distinct state keys, synthesis agent reads all keys

**Best for:** Multi-perspective analysis, concurrent data gathering, independent processing tasks, performance optimization

**Key Characteristics:**

* Multiple agents execute simultaneously
* Significant performance improvement (time = longest task + synthesis)
* Each agent uses unique `outputKey` to avoid conflicts
* Results can be combined by subsequent agents

```typescript
import { LlmAgent, ParallelAgent, SequentialAgent } from "@iqai/adk";

// Multi-perspective analysis example
const sentimentAnalyzerAgent = new LlmAgent({
  name: "sentiment_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes sentiment and emotional tone of content",
  instruction:
    "Analyze the sentiment and emotional tone of the provided content. Classify sentiment and provide confidence scores.",
  outputKey: "sentiment_analysis", // Unique key for this perspective
});

const topicExtractorAgent = new LlmAgent({
  name: "topic_extractor_agent",
  model: "gemini-2.5-flash",
  description: "Extracts and categorizes main topics and themes",
  instruction:
    "Extract and categorize the main topics, themes, and subjects discussed in the content.",
  outputKey: "topic_extraction", // Different key to avoid conflicts
});

const styleAnalyzerAgent = new LlmAgent({
  name: "style_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes writing style, tone, and target audience",
  instruction:
    "Analyze the writing style, tone, complexity, and target audience of the content.",
  outputKey: "style_analysis", // Another unique key
});

// Parallel execution of all analysis types
const multiPerspectiveAnalysisAgent = new ParallelAgent({
  name: "multi_perspective_analysis_agent",
  description: "Analyze content from multiple perspectives simultaneously",
  subAgents: [sentimentAnalyzerAgent, topicExtractorAgent, styleAnalyzerAgent],
});

// Optional: Synthesis agent to combine results
const insightSynthesizerAgent = new LlmAgent({
  name: "insight_synthesizer_agent",
  model: "gemini-2.5-flash",
  description: "Synthesizes multiple analyses into comprehensive insights",
  instruction: `Synthesize insights from multiple analyses:
    - Sentiment: {sentiment_analysis}
    - Topics: {topic_extraction}  
    - Style: {style_analysis}
    
    Create a comprehensive analysis that identifies patterns, correlations, and key insights across all perspectives.`,
  outputKey: "comprehensive_analysis",
});

// Complete workflow: parallel analysis + synthesis
const comprehensiveContentAnalysisAgent = new SequentialAgent({
  name: "comprehensive_content_analysis_agent",
  description: "Multi-perspective analysis with synthesis",
  subAgents: [multiPerspectiveAnalysisAgent, insightSynthesizerAgent],
});

// Execution:
// Phase 1 (Parallel): All three analyzers run simultaneously
//   - sentiment_analyzer_agent → state["sentiment_analysis"]
//   - topic_extractor_agent → state["topic_extraction"]
//   - style_analyzer_agent → state["style_analysis"]
// Phase 2 (Sequential): insightSynthesizerAgent combines all results
```

### Hierarchical Composition Pattern

Build complex capabilities by composing specialized agents into reusable tools, creating multiple levels of abstraction.

**Structure:** Multi-level agent hierarchy using `AgentTool` for explicit composition

**Communication:** Tool-based invocation with clear input/output contracts

**Best for:** Complex workflows, reusable capabilities, modular system design, building agent libraries

**Key Characteristics:**

* Agents are composed into higher-level capabilities
* Lower-level agents can be reused across different contexts
* Clear, explicit invocation contracts at each level
* Results flow back through the hierarchy

```typescript
import { AgentTool, LlmAgent } from "@iqai/adk";

// Foundation layer: Basic capabilities
const textAnalyzerAgent = new LlmAgent({
  name: "text_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes text for sentiment, topics, and key information",
  instruction:
    "Analyze the provided text and extract key information, sentiment, and main topics.",
});

const dataSummarizerAgent = new LlmAgent({
  name: "data_summarizer_agent",
  model: "gemini-2.5-flash",
  description: "Summarizes complex information into concise insights",
  instruction:
    "Create a clear, concise summary of the provided information, highlighting the most important points.",
});

// Intermediate layer: Composed capabilities
const contentProcessorAgent = new LlmAgent({
  name: "content_processor_agent",
  model: "gemini-2.5-flash",
  description: "Processes content through analysis and summarization",
  instruction: `Process content through multiple stages:
    1. Use text_analysis_tool to understand the content structure
    2. Use summarization_tool to create key insights
    3. Combine results into a processed content report`,
  tools: [
    new AgentTool({
      name: "text_analysis_tool",
      agent: textAnalyzerAgent,
      description: "Analyze text for structure and content",
    }),
    new AgentTool({
      name: "summarization_tool",
      agent: dataSummarizerAgent,
      description: "Summarize information into key points",
    }),
  ],
});

const qualityAssessorAgent = new LlmAgent({
  name: "quality_assessor_agent",
  model: "gemini-2.5-flash",
  description: "Assesses content quality and provides improvement suggestions",
  instruction:
    "Evaluate content quality on clarity, accuracy, completeness, and provide specific improvement suggestions.",
});

// Top layer: High-level orchestration
const contentManagerAgent = new LlmAgent({
  name: "content_manager_agent",
  model: "gemini-2.5-flash",
  description: "Manages end-to-end content processing and quality assurance",
  instruction: `Manage complete content workflow:
    1. Use process_content_tool to analyze and summarize
    2. Use assess_quality_tool to evaluate results
    3. Provide final recommendations and processed content`,
  tools: [
    new AgentTool({
      name: "process_content_tool",
      agent: contentProcessorAgent,
      description: "Process content through analysis and summarization",
    }),
    new AgentTool({
      name: "assess_quality_tool",
      agent: qualityAssessorAgent,
      description: "Assess content quality and suggest improvements",
    }),
  ],
});

// Usage: contentManagerAgent orchestrates the entire hierarchy
// contentManagerAgent → contentProcessorAgent → textAnalyzerAgent + dataSummarizerAgent
// contentManagerAgent → qualityAssessorAgent
// Results flow back up through the tool calls
```

### Review/Critique Pattern

Improve output quality through structured generation and review cycles, ensuring high-quality results through peer review.

**Structure:** Sequential workflow with generator, critic, and optional refiner agents

**Communication:** Shared session state for draft content and feedback exchange

**Best for:** Content quality assurance, code review processes, creative writing improvement, fact-checking workflows

**Key Characteristics:**

* Generator creates initial output
* Critic evaluates against quality criteria
* Refiner incorporates feedback improvements
* Can be repeated in loops for iterative refinement

```typescript
import { LlmAgent, SequentialAgent, LoopAgent } from "@iqai/adk";

// Generator-Critic workflow for content creation
const contentGeneratorAgent = new LlmAgent({
  name: "content_generator_agent",
  model: "gemini-2.5-flash",
  description: "Generates initial content based on requirements",
  instruction:
    "Create comprehensive content based on the provided requirements. Focus on accuracy, clarity, and completeness.",
  outputKey: "initial_content", // Saves generated content
});

const contentCriticAgent = new LlmAgent({
  name: "content_critic_agent",
  model: "gemini-2.5-flash",
  description: "Evaluates content quality and provides feedback",
  instruction: `Review the content: {initial_content}
    
    Evaluate on these criteria:
    - Accuracy: Are facts and information correct?
    - Clarity: Is the content easy to understand?
    - Completeness: Does it cover all necessary points?
    - Structure: Is it well-organized and logical?
    
    Provide specific, actionable feedback with examples of what needs improvement.`,
  outputKey: "review_feedback", // Saves critic's feedback
});

const contentRefinerAgent = new LlmAgent({
  name: "content_refiner_agent",
  model: "gemini-2.5-flash",
  description: "Improves content based on critique feedback",
  instruction: `Improve the original content: {initial_content} based on this feedback: {review_feedback}
    
    Make specific improvements while maintaining the original intent and style. Address each point of feedback systematically.`,
  outputKey: "refined_content", // Saves improved version
});

// Sequential workflow: Generate → Critique → Refine
const qualityContentWorkflowAgent = new SequentialAgent({
  name: "quality_content_workflow_agent",
  description: "Generate high-quality content through review and refinement",
  subAgents: [contentGeneratorAgent, contentCriticAgent, contentRefinerAgent],
});

// Optional: Iterative version using LoopAgent
const iterativeQualityWorkflowAgent = new LoopAgent({
  name: "iterative_quality_workflow_agent",
  description: "Repeatedly refine content until quality standards are met",
  maxIterations: 3,
  subAgents: [contentGeneratorAgent, contentCriticAgent, contentRefinerAgent],
});

// Execution flow:
// 1. contentGeneratorAgent → state["initial_content"]
// 2. contentCriticAgent → reads initial_content → state["review_feedback"]
// 3. contentRefinerAgent → reads both → state["refined_content"]
```

### Iterative Refinement Pattern

Continuously improve results through repeated cycles until quality criteria are met or maximum iterations are reached.

**Structure:** `LoopAgent` orchestrating improvement and evaluation agents

**Communication:** Persistent state evolution with escalation-based termination

**Best for:** Quality improvement workflows, optimization tasks, progressive enhancement, problem-solving processes

**Key Characteristics:**

* State persists and improves across iterations
* Termination based on quality gates or iteration limits
* Progressive refinement with each cycle
* Built-in safety mechanisms to prevent infinite loops

```typescript
import {
  LoopAgent,
  LlmAgent,
  BaseAgent,
  Event,
  EventActions,
  InvocationContext,
  AgentBuilder,
} from "@iqai/adk";

// Agent that performs improvements
const solutionImproverAgent = new LlmAgent({
  name: "solution_improver_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes and improves solutions iteratively",
  instruction: `Analyze the current solution: {current_solution} and the original problem: {problem_statement}
    
    Identify specific areas for improvement:
    - Completeness: Does it fully address the problem?
    - Efficiency: Can it be optimized?
    - Clarity: Is it well-explained?
    - Accuracy: Are there any errors?
    
    Provide an improved version that addresses these issues.`,
  outputKey: "current_solution", // Updates solution each iteration
});

// Agent that evaluates quality
const qualityEvaluatorAgent = new LlmAgent({
  name: "quality_evaluator_agent",
  model: "gemini-2.5-flash",
  description: "Evaluates solution quality on multiple criteria",
  instruction: `Evaluate the solution: {current_solution} against the problem: {problem_statement}
    
    Rate on a scale of 1-10 considering:
    - Completeness (fully addresses problem)
    - Accuracy (correct and reliable)
    - Clarity (well-explained)
    - Efficiency (optimal approach)
    
    Provide only the numeric score (1-10).`,
  outputKey: "quality_score", // Saves evaluation score
});

// Custom termination agent
class QualityGateAgent extends BaseAgent {
  constructor() {
    super({
      name: "quality_gate_agent",
      description: "Determines when quality standards are met",
    });
  }

  protected async *runAsyncImpl(ctx: InvocationContext) {
    const score = parseInt(ctx.session.state.get("quality_score", "0"), 10);
    const iteration = ctx.session.state.get("iteration_count", 0) + 1;

    // Track iterations
    ctx.session.state.set("iteration_count", iteration);

    // Stop if quality is high enough (score >= 8)
    const qualityMet = score >= 8;

    yield new Event({
      author: this.name,
      content: {
        parts: [
          {
            text: `Iteration ${iteration}: Quality score ${score}/10. ${
              qualityMet
                ? "Quality target achieved!"
                : "Continuing refinement..."
            }`,
          },
        ],
      },
      actions: new EventActions({ escalate: qualityMet }),
    });
  }
}

// Iterative refinement workflow
const iterativeImprovementAgent = new LoopAgent({
  name: "iterative_improvement_agent",
  description: "Iteratively improve solution until quality standards are met",
  maxIterations: 5, // Prevent infinite loops
  subAgents: [
    solutionImproverAgent,
    qualityEvaluatorAgent,
    new QualityGateAgent(),
  ],
});

// Usage with AgentBuilder
const { runner } = await AgentBuilder.create("iterative_improvement")
  .withAgent(iterativeImprovementAgent)
  .build();

// Execution pattern:
// Iteration 1: solutionImproverAgent → qualityEvaluatorAgent → qualityGateAgent (continue if score < 8)
// Iteration 2: solutionImproverAgent → qualityEvaluatorAgent → qualityGateAgent (continue if score < 8)
// ... continues until quality_score >= 8 or maxIterations reached
```

### Human-in-the-Loop Pattern

Integrate human oversight and decision-making into automated workflows using custom tools for external system integration.

**Structure:** Agents with custom tools that interface with external approval systems

**Communication:** Tool-based integration with human interfaces (Slack, email, web UI)

**Best for:** Compliance workflows, quality gates, creative approval processes, high-stakes decision points

**Key Characteristics:**

* Workflow pauses at critical decision points
* Human input is captured and logged
* Integration with external systems (ticketing, messaging, custom UI)
* Audit trail for compliance and transparency

```typescript
import { createTool, LlmAgent, SequentialAgent } from "@iqai/adk";
import { z } from "zod";

// Custom tool for human approval integration
const humanApprovalTool = createTool({
  name: "request_human_approval_tool",
  description: "Request human approval for important decisions",
  schema: z.object({
    decision: z.string().describe("The decision requiring approval"),
    reasoning: z.string().describe("Why this decision is being made"),
    urgency: z.enum(["low", "medium", "high"]).describe("Priority level"),
  }),
  fn: async ({ decision, reasoning, urgency }) => {
    // This would integrate with your approval system
    // Examples: Slack bot, email notification, web dashboard

    console.log(`🔔 Human approval requested:`);
    console.log(`Decision: ${decision}`);
    console.log(`Reasoning: ${reasoning}`);
    console.log(`Urgency: ${urgency}`);

    // Simulate human approval (in production, this would wait for real input)
    const approved = Math.random() > 0.3; // 70% approval rate for demo

    return {
      approved,
      approver: "human.reviewer@company.com",
      feedback: approved ? "Looks good to proceed" : "Needs more analysis",
      timestamp: new Date().toISOString(),
    };
  },
});

// Workflow with human approval checkpoint
const proposalAnalyzerAgent = new LlmAgent({
  name: "proposal_analyzer_agent",
  model: "gemini-2.5-flash",
  description: "Analyzes proposals for risks, benefits, and feasibility",
  instruction:
    "Analyze the proposal for risks, benefits, and feasibility. Provide a comprehensive assessment.",
  outputKey: "analysis_report",
});

const approvalGateAgent = new LlmAgent({
  name: "approval_gate_agent",
  model: "gemini-2.5-flash",
  description: "Requests human approval for important decisions",
  instruction: `Based on the analysis: {analysis_report}, request human approval for proceeding.
    
    Use the request_human_approval_tool tool with:
    - Clear description of what needs approval
    - Summary of key findings and reasoning
    - Appropriate urgency level`,
  tools: [humanApprovalTool],
  outputKey: "approval_decision",
});

const actionExecutorAgent = new LlmAgent({
  name: "action_executor_agent",
  model: "gemini-2.5-flash",
  description: "Executes actions based on approval decisions",
  instruction: `Check the approval decision: {approval_decision}
    
    If approved: Proceed with implementation and log the action
    If rejected: Document the rejection and suggest next steps`,
  outputKey: "execution_result",
});

// Complete human-in-the-loop workflow
const approvalWorkflowAgent = new SequentialAgent({
  name: "approval_workflow_agent",
  description: "Automated workflow with human approval checkpoints",
  subAgents: [proposalAnalyzerAgent, approvalGateAgent, actionExecutorAgent],
});

// Execution flow:
// 1. proposalAnalyzerAgent → creates analysis_report
// 2. approvalGateAgent → requests human approval (workflow pauses)
// 3. Human reviews and responds via external system
// 4. actionExecutorAgent → proceeds based on approval decision
```

## Best Practices

### Design Principles

**Single Responsibility:** Design each agent with a focused, specific purpose. A billing agent should handle payment issues, while a technical agent resolves system problems. This focused approach makes agents easier to test, debug, and reuse across different workflows.

**Clear State Contracts:** Use descriptive, unique state keys (`user_preferences`, `analysis_results`, `validation_status`) and document what data flows between agents. This prevents conflicts and makes debugging much easier.

**Descriptive Agent Names:** Use clear, searchable names for agents (`billing_specialist_agent`, `technical_support_agent`) that make hierarchy navigation and transfer routing more reliable.

**Shallow Hierarchies:** Keep agent hierarchies relatively flat (2-3 levels) to reduce complexity and improve maintainability.

### Communication Patterns

**State Key Management:** In parallel workflows, use distinct `outputKey` values to prevent conflicts. Document state dependencies between agents to make data flow clear.

**Transfer Instructions:** For agent transfer patterns, write specific routing rules with clear examples. Use non-overlapping agent descriptions to help the LLM make accurate routing decisions.

**Tool vs Transfer:** Use `AgentTool` when you need explicit control and predictable results. Use agent transfer when you want dynamic, context-aware routing.

### Development Tips

**Start Simple:** Begin with sequential workflows before moving to parallel or loop patterns. Add complexity gradually as you understand the interactions.

**Test Isolation:** Test individual agents independently before testing the complete workflow. Mock external dependencies and sub-agents during unit testing.

**State Debugging:** Use clear state key names and log state transitions to make debugging easier when agents don't receive expected data.

**Agent Builder Usage:** Leverage `AgentBuilder` for rapid prototyping and testing. It provides a clean API for creating and experimenting with multi-agent patterns.

### Production Considerations

**Error Handling:** Design fallback strategies for failed agents. In sequential workflows, decide whether errors should halt execution or trigger alternative paths.

**Performance Optimization:** Use `ParallelAgent` to reduce latency when tasks are independent. Monitor resource usage and set reasonable concurrency limits.

**Monitoring:** Implement logging for state transitions, routing decisions, and performance metrics. This is crucial for debugging complex multi-agent interactions.

## Related Topics

<Cards>
  <Card title="🔄 Workflow Agents" description="Sequential, Parallel, and Loop agent orchestration patterns" href="/docs/framework/agents/workflow-agents" />

  <Card title="🤖 LLM Agents" description="The building blocks of multi-agent systems" href="/docs/framework/agents/llm-agents" />

  <Card title="🏗️ Agent Builder" description="Fluent API for creating multi-agent workflows" href="/docs/framework/agents/agent-builder" />

  <Card title="🛠️ Tools" description="Extend agent capabilities with custom tools" href="/docs/framework/tools" />

  <Card title="💾 Sessions" description="State management across agent interactions" href="/docs/framework/sessions/session" />

  <Card title="📊 Callbacks" description="Monitor and control agent execution" href="/docs/framework/callbacks" />
</Cards>

# Tools
URL: /docs/framework/tools

Extend agent capabilities with tools for external interactions and actions

***

title: Tools
description: Extend agent capabilities with tools for external interactions and actions
---------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Tools represent specific capabilities that extend AI agents beyond text generation and reasoning. They enable agents to interact with external systems, perform actions, and access real-time information.

## What Are Tools?

Tools are modular code components that execute distinct, predefined tasks. They bridge the gap between an agent's reasoning capabilities and the external world.

### Key Characteristics

* **Action-Oriented**: Perform specific tasks like API calls, database queries, or file operations
* **Extends Capabilities**: Access real-time information and affect external systems
* **Predefined Logic**: Execute developer-defined functions without independent reasoning
* **Dynamic Usage**: Agents decide which tools to use and when based on context

<Callout type="info" title="Agent vs Tool Responsibilities">
  The LLM reasons about which tool to use, when, and with what inputs. The tool itself executes its designated function without independent reasoning.
</Callout>

## How Agents Use Tools

Agents leverage tools through a dynamic process:

1. **Reasoning**: LLM analyzes instructions, context, and user requests
2. **Selection**: Chooses appropriate tools based on available options and descriptions
3. **Invocation**: Generates required arguments and executes the tool
4. **Observation**: Receives and processes the tool's output
5. **Integration**: Incorporates results into ongoing reasoning and response generation

## Tool Types

ADK TypeScript supports several types of tools for different use cases:

<Cards>
  <Card title="🔧 Function Tools" description="Custom tools created for your specific application needs" href="/docs/framework/tools/function-tools" />

  <Card title="✨ Create Tool" description="A convenient way to create a tool from a function" href="/docs/framework/tools/create-tool" />

  <Card title="⚡ Built-in Tools" description="Ready-to-use tools for search, file operations, and user interaction" href="/docs/framework/tools/built-in-tools" />

  <Card title="🔌 MCP Tools" description="Model Context Protocol tools for standardized integrations" href="/docs/framework/tools/mcp-tools" />

  <Card title="🌐 Third-Party Tools" description="Manual integration patterns for external libraries and frameworks" href="/docs/framework/tools/third-party-tools" />

  <Card title="📊 OpenAPI Tools" description="Manual tool creation for REST API integration using OpenAPI specs" href="/docs/framework/tools/openapi-tools" />

  <Card title="☁️ Google Cloud Tools" description="Authentication patterns and integration for Google Cloud services" href="/docs/framework/tools/google-cloud-tools" />
</Cards>

## Tool Context & Advanced Features

### Context Access

Tools can access additional contextual information through `ToolContext`:

* **Session State**: Read and modify persistent session data
* **Event Actions**: Control agent flow and behavior after tool execution
* **Authentication**: Handle API credentials and authentication flows
* **Artifacts**: Manage files and documents uploaded or generated
* **Memory**: Search and access long-term user memory

### State Management

Tools can interact with session state to:

* Share data between different tools and agents
* Maintain information across interactions
* Use state prefixes for different scopes (app, user, session, temporary)
* Track state changes automatically

### Flow Control

Tools can influence agent behavior through event actions:

* **Skip Summarization**: Bypass LLM processing when tool output is ready
* **Transfer Control**: Hand off execution to specialized agents
* **Escalate**: Pass control to parent agents in hierarchies
* **Loop Control**: Terminate loops in workflow agents

## Authentication & Security

<Cards>
  <Card title="🔐 Authentication" description="Secure access to external APIs and services" href="/docs/framework/tools/authentication" />
</Cards>

Tools support various authentication mechanisms:

* **OAuth flows** for secure API access
* **API key management** for service authentication
* **Credential storage** and retrieval
* **Multi-step auth** flows with user interaction

## Best Practices

<Callout type="warn" title="Tool Design Guidelines">
  * Use descriptive, action-oriented function names
  * Provide clear type hints and parameter descriptions
  * Return structured dictionaries with status indicators
  * Write comprehensive docstrings for LLM understanding
  * Handle errors gracefully with meaningful messages
</Callout>

### Function Design

* **Naming**: Use verb-noun patterns (e.g., `getWeather`, `searchDocuments`)
* **Parameters**: Clear names with proper TypeScript types
* **Returns**: Structured objects with status and error handling
* **Documentation**: Detailed descriptions for LLM decision making

### Error Handling

* **Status Indicators**: Include clear success/error status in responses
* **Error Messages**: Provide actionable error information
* **Graceful Degradation**: Handle failures without breaking agent flow
* **Retry Logic**: Implement appropriate retry mechanisms

### Performance Considerations

* **Async Operations**: Support for long-running operations
* **Caching**: Cache frequently accessed data
* **Rate Limiting**: Respect external service limits
* **Timeout Handling**: Implement appropriate timeouts

## Tool Integration Patterns

### Sequential Tool Usage

Tools can be chained together where one tool's output becomes another's input.

### Conditional Tool Selection

Agents can choose different tools based on context and previous results.

### Parallel Tool Execution

Multiple tools can run simultaneously for independent tasks.

### Tool Composition

Complex workflows can combine multiple tool types for sophisticated operations.

## Getting Started

New to tools? Start with these foundational concepts:

1. **[Function Tools](/docs/framework/tools/function-tools)** - Learn to create custom tools
2. **[Built-in Tools](/docs/framework/tools/built-in-tools)** - Explore ready-to-use capabilities
3. **[Authentication](/docs/framework/tools/authentication)** - Secure your tool integrations

## Advanced Topics

Once you're comfortable with the basics:

* **[OpenAPI Tools](/docs/framework/tools/openapi-tools)** - Generate tools from API specifications
* **[Google Cloud Tools](/docs/framework/tools/google-cloud-tools)** - Enterprise cloud integrations
* **[MCP Tools](/docs/framework/tools/mcp-tools)** - Standardized tool protocols

# Function Tools
URL: /docs/framework/tools/function-tools

Create custom tools for your specific application needs

***

title: Function Tools
description: Create custom tools for your specific application needs
--------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Function tools enable you to create custom functionality tailored to your specific requirements. When built-in tools don't meet your needs, function tools provide the flexibility to implement custom logic, connect to proprietary systems, or create specialized algorithms.

## What Are Function Tools?

Function tools transform regular TypeScript functions into tools that agents can use. They bridge the gap between your application's specific requirements and the agent's capabilities.

### Key Benefits

* **Custom Logic**: Implement specialized algorithms or business rules
* **System Integration**: Connect to proprietary databases or internal APIs
* **Flexibility**: Adapt to unique requirements that built-in tools can't address
* **Performance**: Optimize for your specific use case and data patterns

<Callout type="info" title="When to Use Function Tools">
  Create function tools when you need custom logic, specific integrations, or when built-in tools don't meet your requirements.
</Callout>

## Function Tool Types

ADK TypeScript offers three approaches to creating function tools:

<Cards>
  <Card title="⚡ Standard Function Tools" description="Transform regular functions into agent tools" />

  <Card title="⏱️ Long Running Function Tools" description="Handle time-intensive operations with progress updates" />

  <Card title="🤖 Agent-as-a-Tool" description="Use other agents as specialized tools" />
</Cards>

## Standard Function Tools

The most straightforward approach to creating custom tools.

### Function Design

* **Parameters**: Use JSON-serializable types (string, number, array, object)
* **Return Type**: Prefer objects for structured responses
* **Documentation**: Use JSDoc comments for LLM understanding
* **Naming**: Choose descriptive, action-oriented function names

### Best Practices

<Callout type="warn" title="Function Design Guidelines">
  * Avoid default parameter values (LLM doesn't interpret them)
  * Use simple data types over complex classes
  * Include status indicators in return objects
  * Write clear JSDoc documentation for LLM guidance
</Callout>

### Return Value Structure

* **Object Returns**: Provide structured key-value responses
* **Automatic Wrapping**: Non-object returns are wrapped in `{result: value}`
* **Status Keys**: Include clear success/error indicators
* **Descriptive Content**: Make responses LLM-readable, not just code-readable

## Long Running Function Tools

Designed for operations that require significant processing time without blocking agent execution.

### How They Work

1. **Initiation**: LLM calls the tool to start the operation
2. **Progress Updates**: Function yields intermediate results periodically
3. **Continuation**: Agent can work on other tasks while tool runs
4. **Completion**: Function returns final result when finished

### Use Cases

* **Human-in-the-Loop**: Operations requiring human approval
* **File Processing**: Large file analysis or transformation
* **External API Calls**: Time-intensive third-party integrations
* **Complex Calculations**: CPU-intensive computational tasks

### Implementation Pattern

* Use TypeScript async generator functions (`async function*`)
* **Yield** intermediate updates for progress reporting
* **Return** final results when operation completes
* Framework handles all communication with the LLM

### Progress Reporting

Include meaningful update information:

* **Status**: Current operation state
* **Progress**: Percentage or step completion
* **Messages**: User-friendly progress descriptions
* **Estimates**: Time remaining if calculable

## Agent-as-a-Tool

Leverage other agents as specialized tools within your system.

### Key Concept

Transform agents into callable tools for delegation and specialization:

* **Delegation**: Assign specific tasks to specialized agents
* **Control Flow**: Calling agent retains control and continues execution
* **Response Integration**: Tool agent's response is returned to calling agent

### Agent-as-Tool vs Sub-Agents

<Callout type="info" title="Important Distinction">
  **Agent-as-Tool**: Response is passed back to the calling agent, which retains control.
  **Sub-Agent**: Control is transferred completely to the called agent.
</Callout>

### Use Cases

* **Specialized Processing**: Dedicated agents for specific tasks (summarization, analysis)
* **Modular Architecture**: Break complex operations into specialized components
* **Reusable Logic**: Share agent capabilities across different workflows
* **Domain Expertise**: Leverage specialized knowledge in focused agents

### Configuration Options

* **Skip Summarization**: Bypass LLM processing when tool response is ready
* **Custom Instructions**: Tailor tool behavior for specific contexts
* **Error Handling**: Configure how tool failures are handled

## Tool Context Integration

Function tools can access rich contextual information:

### Available Context

* **Session State**: Read and modify persistent data
* **Event Actions**: Control agent flow after tool execution
* **Authentication**: Access credentials and auth responses
* **Artifacts**: Manage files and documents
* **Memory**: Search long-term user memory

### State Management

* **State Prefixes**: Different scopes (app, user, session, temp)
* **Data Persistence**: Changes tracked and saved automatically
* **Cross-Tool Communication**: Share data between different tools

### Flow Control

Tools can influence subsequent agent behavior:

* **Transfer Control**: Hand off to specialized agents
* **Skip Processing**: Bypass unnecessary LLM calls
* **Loop Termination**: End workflow loops conditionally
* **Error Escalation**: Bubble up critical failures

## Implementation Best Practices

### Function Design

* **Simplicity**: Minimize parameters and complexity
* **Clarity**: Use meaningful names and documentation
* **Reliability**: Handle errors gracefully with informative messages
* **Performance**: Optimize for your specific use case

### Error Handling

* **Status Indicators**: Clear success/error flags in responses
* **Error Messages**: Human-readable error descriptions
* **Graceful Degradation**: Continue operation when possible
* **Recovery Strategies**: Provide actionable error guidance

### Testing Strategy

* **Unit Testing**: Test functions independently
* **Integration Testing**: Verify tool behavior with agents
* **Error Scenarios**: Test failure modes and edge cases
* **Performance Testing**: Validate performance under load

## Advanced Patterns

### Tool Composition

Combine multiple function tools for complex workflows:

* **Sequential Processing**: Chain tools for multi-step operations
* **Conditional Logic**: Use tool results to determine next steps
* **Parallel Execution**: Run independent tools simultaneously
* **Error Recovery**: Implement fallback strategies

### Dynamic Tool Selection

Create tools that adapt behavior based on context:

* **Runtime Configuration**: Adjust tool behavior based on session state
* **Conditional Execution**: Different logic paths based on input
* **Environment Adaptation**: Behavior changes based on deployment context

## Related Topics

<Cards>
  <Card title="⚡ Built-in Tools" description="Explore ready-made tools for common tasks" href="/docs/framework/tools/built-in-tools" />

  <Card title="🔐 Authentication" description="Secure your custom tool integrations" href="/docs/framework/tools/authentication" />

  <Card title="🤖 Agents" description="Learn how agents use and coordinate tools" href="/docs/framework/agents" />

  <Card title="💾 Sessions" description="Understand state management and persistence" href="/docs/framework/sessions/session" />
</Cards>

# Create Tool
URL: /docs/framework/tools/create-tool

Create custom tools from functions with `createTool`.

***

title: Create Tool
description: Create custom tools from functions with `createTool`.
------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

The `createTool` function provides a convenient way to create a tool from a function. This method handles the boilerplate of creating a tool class and instance for you.

## Usage

To create a tool, you pass a configuration object to the `createTool` function. The function should be well-documented with JSDoc comments, as this information is used by the LLM to understand how to use the tool.

```typescript
import { AgentBuilder } from "@adk/agents";
import { createTool } from "@adk/tools";
import { z } from "zod";

/**
 * A simple tool that adds two numbers.
 * @param a The first number.
 * @param b The second number.
 * @returns The sum of the two numbers.
 */
const add = (a: number, b: number) => a + b;

const { runner } = await AgentBuilder.create("calculator-agent")
  .withModel("gemini-2.5-flash")
  .withTools(createTool({
    name: "add",
    description: "Adds two numbers.",
    schema: z.object({
        a: z.number(),
        b: z.number(),
    }),
    fn: add,
  }))
  .build();

const result = await runner.ask("What is 2 + 2?");
```

## Parameters

The `createTool` function accepts a configuration object with the following properties:

* `name`: The name of the tool.
* `description`: A description of what the tool does.
* `fn`: The function to be converted into a tool.
* `schema` (optional): A Zod schema that defines the input parameters for the tool.
* `isLongRunning` (optional): A boolean indicating if the tool performs a long-running operation. Defaults to `false`.
* `shouldRetryOnFailure` (optional): A boolean indicating if the tool should be retried on failure. Defaults to `false`.
* `maxRetryAttempts` (optional): The maximum number of retry attempts. Defaults to `3`.

### Advanced Usage

Here is an example that uses the optional parameters:

```typescript
import { AgentBuilder } from "@adk/agents";
import { createTool } from "@adk/tools";
import { z } from "zod";

/**
 * A tool that simulates a long-running task.
 * @returns A message indicating the task is complete.
 */
const longRunningTask = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return "Long running task complete!";
}

const { runner } = await AgentBuilder.create("long-running-agent")
  .withModel("gemini-2.5-flash")
  .withTools(createTool({
    name: "longRunningTask",
    description: "A tool that simulates a long-running task.",
    fn: longRunningTask,
    isLongRunning: true,
    shouldRetryOnFailure: true,
    maxRetryAttempts: 5,
  }))
  .build();

const result = await runner.ask("Run the long running task.");
```

# Built-in Tools
URL: /docs/framework/tools/built-in-tools

Ready-to-use tools for common tasks like search, file operations, and user interaction

***

title: Built-in Tools
description: Ready-to-use tools for common tasks like search, file operations, and user interaction
---------------------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Built-in tools provide ready-to-use functionality for common agent tasks. These tools are pre-built, tested, and optimized for integration with ADK TypeScript agents, allowing you to add powerful capabilities without custom development.

## How Built-in Tools Work

Built-in tools follow a simple integration pattern:

1. **Import** the desired tool from the ADK TypeScript library
2. **Configure** the tool with any required parameters
3. **Register** the tool in your agent's tools list
4. **Use** the tool automatically based on agent instructions and user prompts

<Callout type="info" title="Zero Setup">
  Most built-in tools require minimal or no configuration - just import and add to your agent's tools list.
</Callout>

## Available Built-in Tools

<Cards>
  <Card title="🔍 Google Search" description="Perform web searches using Google Search API" />

  <Card title="📁 File Operations" description="Read, write, and manipulate files and documents" />

  <Card title="🌐 HTTP Request" description="Make HTTP requests to external APIs and web services" />

  <Card title="👤 User Interaction" description="Prompt users for input during agent execution" />

  <Card title="💾 Load Memory" description="Search and load relevant memories from conversation history" />

  <Card title="📂 Load Artifacts" description="Load uploaded files and documents into agent context" />
</Cards>

## Google Search Tool

Enables agents to perform web searches and retrieve real-time information from the internet.

### Key Features

* **Real-time Results**: Access current web information
* **Gemini Integration**: Optimized for Gemini models
* **Automatic Parsing**: Results formatted for LLM consumption
* **Simple Integration**: Works with minimal configuration

### Use Cases

* **Current Events**: Get latest news and information
* **Fact Checking**: Verify information against web sources
* **Research Tasks**: Gather information on specific topics
* **Market Data**: Access current pricing and market information

### Configuration

```typescript
import { GoogleSearch } from '@iqai/adk';

const searchTool = new GoogleSearch();
```

<Callout type="info" title="Implementation Note">
  The current GoogleSearch implementation returns mock results. Integration with actual Google Search API requires additional configuration.
</Callout>

## File Operations Tool

Enables agents to interact with files and documents for reading, writing, and manipulation tasks.

### Key Features

* **File I/O**: Read and write various file formats
* **Format Support**: Text, JSON, CSV, and other common formats
* **Safe Operations**: Controlled file system access with security validation
* **Multiple Operations**: Read, write, append, delete, exists, list, mkdir

### Use Cases

* **Document Processing**: Read and analyze document contents
* **Data Import/Export**: Load data from files or save results
* **Configuration Management**: Read settings and configuration files
* **Report Generation**: Create output files and reports

### Configuration

```typescript
import { FileOperationsTool } from '@iqai/adk';

const fileTool = new FileOperationsTool({
  basePath: '/path/to/working/directory' // Optional, defaults to cwd
});
```

### Security Considerations

* **Sandboxed Access**: Limited to authorized directories
* **Path Validation**: Prevents access outside base directory
* **Permission Checks**: Proper file system permissions
* **Error Recovery**: Graceful handling of access failures

## HTTP Request Tool

Make HTTP requests to external APIs and web services for data integration and communication.

### Key Features

* **Multiple Methods**: Support for GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
* **Header Management**: Custom headers and authentication
* **Request Body**: JSON and form data support
* **Query Parameters**: URL parameter handling
* **Timeout Control**: Configurable request timeouts

### Use Cases

* **API Integration**: Connect to REST APIs and web services
* **Data Fetching**: Retrieve information from external sources
* **Webhook Communication**: Send data to external systems
* **Service Integration**: Connect with third-party platforms

### Configuration

```typescript
import { HttpRequestTool } from '@iqai/adk';

const httpTool = new HttpRequestTool();
```

## User Interaction Tool

Prompt users for input during agent execution for human-in-the-loop workflows.

### Key Features

* **Interactive Prompts**: Request user input with custom messages
* **Choice Options**: Present multiple choice selections
* **Default Values**: Pre-populate input fields
* **Long Running**: Supports asynchronous user response patterns

### Use Cases

* **Decision Making**: Get user approval for actions
* **Data Collection**: Gather additional information from users
* **Confirmation**: Verify critical operations before execution
* **Preference Setting**: Allow users to specify preferences

### Configuration

```typescript
import { UserInteractionTool } from '@iqai/adk';

const userTool = new UserInteractionTool();
```

<Callout type="warn" title="Environment Dependency">
  User interaction requires a compatible environment that supports user prompting. May not work in all deployment scenarios.
</Callout>

## Load Memory Tool

Search and load relevant memories from conversation history for context-aware interactions.

### Key Features

* **Memory Search**: Query past conversations and interactions
* **Contextual Retrieval**: Find relevant information based on current needs
* **Automatic Integration**: Seamlessly integrate memory results
* **Efficient Querying**: Optimized search across conversation history

### Use Cases

* **Context Continuity**: Maintain conversation context across sessions
* **Information Recall**: Reference past discussions and decisions
* **Personalization**: Access user preferences and history
* **Knowledge Building**: Build on previous interactions and learning

### Configuration

```typescript
import { LoadMemoryTool } from '@iqai/adk';

const memoryTool = new LoadMemoryTool();
```

## Load Artifacts Tool

Load uploaded files and documents into agent context for processing and analysis.

### Key Features

* **File Management**: Access uploaded documents and media
* **Context Integration**: Automatically add artifacts to LLM requests
* **Dynamic Loading**: Load artifacts based on agent needs
* **Content Processing**: Handle various file types and formats

### Use Cases

* **Document Analysis**: Process uploaded documents and files
* **Content Review**: Analyze images, PDFs, and text files
* **Data Processing**: Work with uploaded datasets and spreadsheets
* **Media Handling**: Process images and multimedia content

### Configuration

```typescript
import { LoadArtifactsTool } from '@iqai/adk';

const artifactsTool = new LoadArtifactsTool();
```

## Additional Built-in Tools

### Get User Choice Tool

Present options to users and collect their selection for decision-making workflows.

```typescript
import { GetUserChoiceTool } from '@iqai/adk';

const choiceTool = new GetUserChoiceTool();
```

### Transfer to Agent Tool

Transfer control to another agent for specialized processing or workflow delegation.

```typescript
import { TransferToAgentTool } from '@iqai/adk';

const transferTool = new TransferToAgentTool();
```

### Exit Loop Tool

Exit execution loops in workflow agents when completion conditions are met.

```typescript
import { ExitLoopTool } from '@iqai/adk';

const exitTool = new ExitLoopTool();
```

## Tool Integration Patterns

### Single Tool Usage

Use individual tools for specific capabilities:

* **Search Only**: Agents focused on information retrieval
* **Files Only**: Document processing specialists
* **Memory Only**: Context-aware conversation agents

### Multi-Tool Combinations

Combine tools for complex workflows:

* **Search + Files**: Research with document storage
* **Memory + User Interaction**: Personalized interactive agents
* **Files + HTTP**: Data processing with external API integration
* **All Tools**: Comprehensive capability agents

### Conditional Tool Selection

Agents choose tools based on task requirements:

* **Task Analysis**: LLM determines required capabilities
* **Dynamic Selection**: Different tools for different queries
* **Fallback Strategies**: Alternative approaches when tools fail

## Performance and Limitations

### Rate Limiting

<Callout type="warn" title="External Dependencies">
  Tools that interact with external services are subject to API rate limits and network constraints. Design your agents to handle these limitations gracefully.
</Callout>

* **Google Search**: Subject to API quotas and service availability
* **HTTP Requests**: Limited by target service rate limits
* **File Operations**: File system and storage limits
* **User Interaction**: Depends on user response time

### Error Handling

Built-in tools include robust error handling:

* **Network Failures**: Graceful handling of connectivity issues
* **Authentication Errors**: Clear messaging for credential problems
* **Rate Limit Responses**: Appropriate backoff and retry logic
* **Result Validation**: Verification of tool outputs

### Performance Optimization

* **Async Operations**: Non-blocking execution where possible
* **Resource Management**: Efficient use of system resources
* **Error Recovery**: Automatic retry logic for transient failures
* **Timeout Handling**: Configurable timeouts for external operations

## Best Practices

### Tool Selection

* **Match Capabilities**: Choose tools that match your use case requirements
* **Consider Environment**: Ensure tools work in your deployment environment
* **Plan Fallbacks**: Design alternative approaches for tool failures
* **Monitor Usage**: Track tool usage patterns and performance

### Agent Instructions

* **Clear Guidance**: Provide specific instructions for when to use each tool
* **Error Handling**: Define how agents should handle tool failures
* **Result Processing**: Guide agents on interpreting tool outputs
* **User Communication**: Instruct agents on communicating tool usage to users

### Security and Privacy

* **Data Sensitivity**: Consider data sensitivity when using external tools
* **Access Controls**: Implement appropriate access restrictions
* **Audit Trails**: Log tool usage for security and compliance
* **Error Information**: Avoid exposing sensitive data in error messages

## Related Topics

<Cards>
  <Card title="🔧 Function Tools" description="Create custom tools for specialized needs" href="/docs/framework/tools/function-tools" />

  <Card title="🔐 Authentication" description="Secure access to external services and APIs" href="/docs/framework/tools/authentication" />

  <Card title="🤖 Agents" description="Learn how agents coordinate and use tools" href="/docs/framework/agents" />

  <Card title="🌐 Third-Party Tools" description="Integrate tools from external frameworks" href="/docs/framework/tools/third-party-tools" />
</Cards>

# Google Cloud Tools
URL: /docs/framework/tools/google-cloud-tools

Google Cloud service integration and authentication patterns

***

title: Google Cloud Tools
description: Google Cloud service integration and authentication patterns
-------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Google Cloud tools provide authentication and integration patterns for Google Cloud Platform services. While comprehensive Google Cloud service integration is planned for future releases, ADK TypeScript currently focuses on authentication and foundational patterns for cloud connectivity.

## Current Implementation

ADK TypeScript provides foundational support for Google Cloud integration through authentication mechanisms and basic patterns for service connectivity.

### Available Features

* **Authentication**: Google Cloud credential management and authentication
* **Service Patterns**: Base patterns for creating Google Cloud service tools
* **Integration Guidelines**: Best practices for Google Cloud service integration
* **Future Foundation**: Architecture prepared for comprehensive service integration

<Callout type="info" title="Development Status">
  Comprehensive Google Cloud service tools are in development. Current implementation focuses on authentication and integration patterns.
</Callout>

## Authentication Support

<Cards>
  <Card title="🔐 Service Accounts" description="Service account credential management" />

  <Card title="🎯 OAuth 2.0" description="User-based authentication flows" />

  <Card title="🔑 Credential Discovery" description="Automatic credential discovery patterns" />
</Cards>

## Authentication Patterns

### Service Account Authentication

For server-to-server authentication with Google Cloud services:

```typescript
import { GoogleAuth } from 'google-auth-library';

// Service account authentication
async function createGoogleAuthClient() {
  const auth = new GoogleAuth({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  return await auth.getClient();
}

// Usage in custom tools
async function callGoogleCloudAPI(endpoint: string, data: any) {
  const authClient = await createGoogleAuthClient();

  const response = await authClient.request({
    url: endpoint,
    method: 'POST',
    data
  });

  return response.data;
}
```

### OAuth 2.0 User Authentication

For user-based authentication flows:

```typescript
import { OAuth2Client } from 'google-auth-library';

async function createOAuth2Client() {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  return oauth2Client;
}

// Generate authentication URL
async function getAuthUrl() {
  const oauth2Client = await createOAuth2Client();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/cloud-platform']
  });

  return authUrl;
}
```

### Application Default Credentials

For environments with automatic credential discovery:

```typescript
import { GoogleAuth } from 'google-auth-library';

async function getDefaultCredentials() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  // Automatically discovers credentials from:
  // 1. GOOGLE_APPLICATION_CREDENTIALS environment variable
  // 2. User credentials from gcloud SDK
  // 3. Service account from compute metadata (on GCP)
  const authClient = await auth.getClient();

  return authClient;
}
```

## Creating Google Cloud Tools

### Basic Google Cloud Tool Pattern

Create custom tools for specific Google Cloud services:

```typescript
import { BaseTool } from '@iqai/adk';
import { GoogleAuth } from 'google-auth-library';

interface GoogleCloudToolConfig {
  serviceName: string;
  apiVersion: string;
  scopes: string[];
}

class GoogleCloudServiceTool extends BaseTool {
  private auth: GoogleAuth;
  private config: GoogleCloudToolConfig;

  constructor(config: GoogleCloudToolConfig) {
    super({
      name: `google_${config.serviceName}`,
      description: `Tool for Google Cloud ${config.serviceName} service`
    });

    this.config = config;
    this.auth = new GoogleAuth({
      scopes: config.scopes
    });
  }

  async runAsync(args: {
    operation: string;
    parameters: Record<string, any>;
  }) {
    try {
      const authClient = await this.auth.getClient();

      // Build request URL
      const baseUrl = `https://${this.config.serviceName}.googleapis.com`;
      const url = `${baseUrl}/${this.config.apiVersion}/${args.operation}`;

      const response = await authClient.request({
        url,
        method: 'POST',
        data: args.parameters
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: `Google Cloud API error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Google Cloud service operation to perform'
          },
          parameters: {
            type: 'object',
            description: 'Parameters for the operation'
          }
        },
        required: ['operation']
      }
    };
  }
}
```

### Google Cloud Storage Example

Example implementation for Cloud Storage operations:

```typescript
import { BaseTool } from '@iqai/adk';
import { Storage } from '@google-cloud/storage';

class CloudStorageTool extends BaseTool {
  private storage: Storage;

  constructor() {
    super({
      name: 'cloud_storage',
      description: 'Tool for Google Cloud Storage operations'
    });

    this.storage = new Storage({
      // Uses Application Default Credentials
    });
  }

  async runAsync(args: {
    operation: 'upload' | 'download' | 'list' | 'delete';
    bucket: string;
    fileName?: string;
    localPath?: string;
    prefix?: string;
  }) {
    try {
      const bucket = this.storage.bucket(args.bucket);

      switch (args.operation) {
        case 'upload':
          if (!args.fileName || !args.localPath) {
            return { error: 'fileName and localPath required for upload' };
          }
          await bucket.upload(args.localPath, { destination: args.fileName });
          return { success: true, message: `Uploaded ${args.fileName}` };

        case 'download':
          if (!args.fileName || !args.localPath) {
            return { error: 'fileName and localPath required for download' };
          }
          await bucket.file(args.fileName).download({ destination: args.localPath });
          return { success: true, message: `Downloaded ${args.fileName}` };

        case 'list':
          const [files] = await bucket.getFiles({ prefix: args.prefix });
          return {
            success: true,
            files: files.map(file => ({ name: file.name, size: file.metadata.size }))
          };

        case 'delete':
          if (!args.fileName) {
            return { error: 'fileName required for delete' };
          }
          await bucket.file(args.fileName).delete();
          return { success: true, message: `Deleted ${args.fileName}` };

        default:
          return { error: `Unknown operation: ${args.operation}` };
      }
    } catch (error) {
      return {
        success: false,
        error: `Cloud Storage error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Storage operation to perform',
            enum: ['upload', 'download', 'list', 'delete']
          },
          bucket: {
            type: 'string',
            description: 'Cloud Storage bucket name'
          },
          fileName: {
            type: 'string',
            description: 'Name of the file in the bucket'
          },
          localPath: {
            type: 'string',
            description: 'Local file path for upload/download'
          },
          prefix: {
            type: 'string',
            description: 'Prefix filter for listing files'
          }
        },
        required: ['operation', 'bucket']
      }
    };
  }
}
```

## Environment Configuration

### Required Environment Variables

```typescript
// Service Account Authentication
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

// OAuth 2.0 Authentication
GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

// Project Configuration
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_REGION=us-central1
```

### Credential Setup

1. **Service Account**: Create and download service account key from Google Cloud Console
2. **OAuth 2.0**: Configure OAuth 2.0 credentials for user authentication
3. **Project Access**: Ensure proper IAM roles and permissions
4. **API Enablement**: Enable required Google Cloud APIs

## Security Best Practices

### Authentication Security

<Callout type="warn" title="Security Requirements">
  Always follow Google Cloud security best practices for credential management and access control.
</Callout>

* **Credential Protection**: Never commit credentials to source code
* **Least Privilege**: Grant minimum required permissions
* **Regular Rotation**: Rotate service account keys regularly
* **Monitoring**: Monitor credential usage and access patterns

### Access Control

```typescript
// Example: Scoped authentication for specific services
const scopedAuth = new GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/devstorage.read_write', // Cloud Storage
    'https://www.googleapis.com/auth/bigquery.readonly'     // BigQuery read-only
  ]
});
```

### Error Handling

```typescript
async function secureGoogleCloudCall(operation: () => Promise<any>) {
  try {
    return await operation();
  } catch (error: any) {
    // Log error details without exposing sensitive information
    console.error('Google Cloud operation failed:', {
      timestamp: new Date().toISOString(),
      operation: operation.name,
      error: error.message
    });

    // Return safe error message
    return {
      success: false,
      error: 'Google Cloud service temporarily unavailable'
    };
  }
}
```

## Future Roadmap

<Callout type="info" title="Planned Google Cloud Tools">
  Future releases will include comprehensive tools for:

  * Cloud Storage (file operations and management)
  * Cloud SQL (database connectivity and operations)
  * Vertex AI (machine learning and AI services)
  * BigQuery (data analytics and querying)
  * Document AI (intelligent document processing)
  * Cloud Functions (serverless computing)
</Callout>

### Expected Features

* **Pre-built Service Tools**: Ready-to-use tools for major Google Cloud services
* **Automatic Configuration**: Simplified setup and configuration
* **Advanced Authentication**: Enhanced security and credential management
* **Multi-Service Workflows**: Orchestrated workflows across multiple services
* **Performance Optimization**: Built-in caching and connection pooling

## Integration Examples

### Custom Vertex AI Tool

```typescript
import { BaseTool } from '@iqai/adk';
import { PredictionServiceClient } from '@google-cloud/aiplatform';

class VertexAIPredictionTool extends BaseTool {
  private client: PredictionServiceClient;

  constructor() {
    super({
      name: 'vertex_ai_prediction',
      description: 'Make predictions using Vertex AI models'
    });

    this.client = new PredictionServiceClient();
  }

  async runAsync(args: {
    endpoint: string;
    instances: any[];
  }) {
    try {
      const [response] = await this.client.predict({
        endpoint: args.endpoint,
        instances: args.instances
      });

      return {
        success: true,
        predictions: response.predictions
      };
    } catch (error) {
      return {
        success: false,
        error: `Vertex AI prediction failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'Vertex AI model endpoint'
          },
          instances: {
            type: 'array',
            description: 'Input instances for prediction'
          }
        },
        required: ['endpoint', 'instances']
      }
    };
  }
}
```

## Related Topics

<Cards>
  <Card title="🔐 Authentication" description="Secure authentication patterns and credential management" href="/docs/framework/tools/authentication" />

  <Card title="🔧 Function Tools" description="Create custom tools for Google Cloud services" href="/docs/framework/tools/function-tools" />

  <Card title="⚡ Built-in Tools" description="Explore other built-in tool capabilities" href="/docs/framework/tools/built-in-tools" />

  <Card title="🤖 Agents" description="Learn how agents coordinate cloud services" href="/docs/framework/agents" />
</Cards>

# MCP Tools
URL: /docs/framework/tools/mcp-tools

Model Context Protocol tools for standardized integrations

***

title: MCP Tools
description: Model Context Protocol tools for standardized integrations
-----------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Model Context Protocol (Mcp) tools provide standardized interfaces for connecting LLMs with external applications, data sources, and services. ADK TypeScript supports both consuming Mcp servers and exposing ADK tools as Mcp servers.

## What is Model Context Protocol?

Mcp is an open standard that standardizes how Large Language Models communicate with external systems. It acts as a universal connection mechanism that simplifies context sharing, action execution, and system interaction.

### Key Components

* **Data Sources**: Access to external resources and content
* **Interactive Templates**: Dynamic prompts and conversation patterns
* **Actionable Functions**: Tools and operations for system interaction
* **Client-Server Architecture**: Standardized communication patterns

<Callout type="info" title="Universal Standard">
  Mcp enables any LLM to work with any Mcp-compatible service, creating a universal ecosystem of AI-enabled tools and data sources.
</Callout>

## Integration Patterns

ADK TypeScript supports two primary Mcp integration patterns:

<Cards>
  <Card title="🔌 Mcp Client" description="Use existing Mcp servers within ADK agents" />

  <Card title="🖥️ Mcp Server" description="Expose ADK tools via Mcp server for other clients" />
</Cards>

## ADK as Mcp Client

Connect your ADK agents to existing Mcp servers to leverage external tools and data sources.

### Integration Options

ADK TypeScript provides two ways to integrate with MCP servers:

1. **Wrapper Functions** (Recommended) - Use dedicated functions like `McpAtp()`, `McpNearAgent()` for IQAI servers
2. **McpToolset Class** (For Unsupported Servers) - Direct `McpToolset` usage for any MCP server

### McpToolset Class

The `McpToolset` class serves as the bridge between ADK agents and Mcp servers:

* **Connection Management**: Establish connections to local or remote Mcp servers
* **Tool Discovery**: Query servers for available tools and capabilities
* **Schema Adaptation**: Convert Mcp schemas to ADK-compatible tools
* **Call Proxying**: Forward tool calls to Mcp servers and return results
* **Lifecycle Management**: Handle connection cleanup and resource management

### Using Wrapper Functions (Recommended)

For supported IQAI MCP servers, use the convenient wrapper functions:

```typescript
import { McpAtp, AgentBuilder } from "@iqai/adk";

// Create ATP toolset with wrapper function
const toolset = McpAtp({
  env: {
    ATP_WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
    ATP_API_KEY: process.env.ATP_API_KEY,
  },
  debug: process.env.NODE_ENV === "development",
  retryOptions: {
    maxRetries: 2,
    initialDelay: 200,
  },
});

// Get available tools
const mcpTools = await toolset.getTools();

// Create agent with MCP tools using AgentBuilder
const { runner } = await AgentBuilder.create("blockchain_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("Agent for blockchain and DeFi operations")
  .withTools(...mcpTools)
  .build();

// Use the agent
const response = await runner.ask("Get ATP statistics for token 0x123...");

// Clean up when done
await toolset.close();
```

### Using McpToolset (For Unsupported Servers)

When we don't have a wrapper function for a specific MCP server, use the `McpToolset` class:

```typescript
import { McpToolset, AgentBuilder, type McpConfig } from "@iqai/adk";

// Configure MCP connection for unsupported server
const mcpConfig: McpConfig = {
  name: "Filesystem MCP Client",
  description: "Client for filesystem operations",
  debug: process.env.NODE_ENV === "development",
  retryOptions: {
    maxRetries: 3,
    initialDelay: 200,
  },
  cacheConfig: {
    enabled: true,
  },
  transport: {
    mode: "stdio",
    command: "npx",
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/directory"],
    env: {
      PATH: process.env.PATH || "",
    },
  },
};

// Initialize MCP toolset
const mcpToolset = new McpToolset(mcpConfig);

// Discover available tools
const mcpTools = await mcpToolset.getTools();
console.log(`Found ${mcpTools.length} MCP tools`);

// Create agent with MCP tools using AgentBuilder
const { runner } = await AgentBuilder.create("filesystem_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("An agent that can perform filesystem operations")
  .withInstruction("You can read, write, and manage files using MCP tools.")
  .withTools(...mcpTools)
  .build();

// Use the agent
const response = await runner.ask("List all .ts files in the src directory");

// Clean up when done
await mcpToolset.close();
```

### IQAI MCP Servers Integration

IQAI provides specialized MCP servers for blockchain and AI operations:

```typescript
import { McpToolset, AgentBuilder } from "@iqai/adk";

// Connect to IQAI ATP server
const atpToolset = new McpToolset({
  name: "ATP MCP Client",
  description: "Client for AI Agent Tokenization Platform",
  transport: {
    mode: "stdio",
    command: "pnpm",
    args: ["dlx", "@iqai/mcp-atp"],
    env: {
      WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
      ATP_API_KEY: process.env.ATP_API_KEY,
      PATH: process.env.PATH || "",
    },
  },
});

// Get ATP tools
const atpTools = await atpToolset.getTools();

// Create specialized blockchain agent using AgentBuilder
const { runner } = await AgentBuilder.create("blockchain_agent")
  .withModel("gemini-2.5-flash")
  .withDescription("Agent for blockchain and DeFi operations")
  .withInstruction("You can interact with blockchain protocols, manage tokens, and access DeFi platforms.")
  .withTools(...atpTools)
  .build();

// Example usage
const stats = await runner.ask("Get statistics for agent token 0x123...");
```

### Multiple MCP Servers

You can connect to multiple IQAI MCP servers simultaneously:

```typescript
import { McpAtp, McpFraxlend, McpNearAgent, AgentBuilder } from "@iqai/adk";

// Connect to multiple servers with wrapper functions
const atpToolset = McpAtp({
  env: {
    ATP_WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
    ATP_API_KEY: process.env.ATP_API_KEY,
  },
});

const fraxlendToolset = McpFraxlend({
  env: {
    WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
  },
});

const nearToolset = McpNearAgent({
  env: {
    ACCOUNT_ID: process.env.NEAR_ACCOUNT_ID,
    ACCOUNT_KEY: process.env.NEAR_ACCOUNT_KEY,
    NEAR_NETWORK_ID: "testnet",
  },
});

// Combine tools from multiple servers
const atpTools = await atpToolset.getTools();
const fraxlendTools = await fraxlendToolset.getTools();
const nearTools = await nearToolset.getTools();
const allTools = [...atpTools, ...fraxlendTools, ...nearTools];

// Create agent with combined tools
const { runner } = await AgentBuilder.create("multi_mcp_assistant")
  .withModel("gemini-2.5-flash")
  .withDescription("An assistant with multiple MCP server capabilities")
  .withTools(...allTools)
  .build();
```

### Mixed Approach (Wrappers + McpToolset)

You can also combine wrapper functions with `McpToolset` for unsupported servers:

```typescript
import { McpAtp, McpToolset, AgentBuilder } from "@iqai/adk";

// Use wrapper for supported server
const atpToolset = McpAtp({
  env: {
    ATP_WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
    ATP_API_KEY: process.env.ATP_API_KEY,
  },
});

// Use McpToolset for unsupported server
const customToolset = new McpToolset({
  name: "Custom Client",
  transport: {
    mode: "stdio",
    command: "pnpm",
    args: ["dlx", "@custom/mcp-server"],
    env: {
      CUSTOM_API_KEY: process.env.CUSTOM_API_KEY,
    },
  },
});

// Combine tools from both approaches
const atpTools = await atpToolset.getTools();
const customTools = await customToolset.getTools();
const allTools = [...atpTools, ...customTools];

// Create agent with combined tools
const { runner } = await AgentBuilder.create("mixed_mcp_assistant")
  .withModel("gemini-2.5-flash")
  .withDescription("An assistant with mixed MCP server capabilities")
  .withTools(...allTools)
  .build();
```

### Resource Cleanup

Always clean up MCP resources when done:

```typescript
try {
  // Use your agent and tools
  const response = await runner.ask("Get ATP statistics for contract 0x123...");
} finally {
  // Clean up resources
  await toolset.close();
}
```

## Integration with ADK TypeScript

All IQAI MCP servers are designed to work seamlessly with:

* **Wrapper functions** like `McpAtp()`, `McpNearAgent()`, etc. for supported servers
* **`McpToolset` class** for connecting to any MCP server when no wrapper is available

Both approaches provide:

* **Automatic tool discovery** and registration
* **Type-safe** tool usage
* **Error handling** and retry logic
* **Resource management** and cleanup

## Connection Types

<Cards>
  <Card title="🔧 Stdio Connection" description="Connect to local MCP servers via standard input/output" />

  <Card title="🌐 SSE Connection" description="Connect to remote MCP servers via Server-Sent Events" />
</Cards>

### Stdio Connection Example

Most MCP servers use stdio transport for local connections:

```typescript
const mcpConfig: McpConfig = {
  name: "Local MCP Server",
  transport: {
    mode: "stdio",
    command: "node", // or "python", "pnpm", etc.
    args: ["path/to/server.js"],
    env: {
      // Server-specific environment variables
      API_KEY: process.env.API_KEY,
      PATH: process.env.PATH || "",
    },
  },
};
```

### SSE Connection Example

For remote MCP servers accessible via HTTP:

```typescript
const mcpConfig: McpConfig = {
  name: "Remote MCP Server",
  transport: {
    mode: "sse",
    url: "https://api.example.com/mcp",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  },
};
```

### Common MCP Servers

Popular MCP servers you can integrate with:

* **Filesystem Server**: File operations and management
* **Database Server**: SQL database queries and operations
* **Web Search Server**: Internet search capabilities
* **Git Server**: Version control operations
* **API Servers**: Various third-party service integrations

### Integration Process

1. **Server Setup**: Install and configure the MCP server
2. **Connection Configuration**: Define connection parameters (stdio or SSE)
3. **Toolset Creation**: Initialize toolset using wrapper functions or McpToolset
4. **Tool Registration**: Add MCP tools to your agent's tool list using AgentBuilder
5. **Agent Execution**: Use tools automatically based on agent logic via runner
6. **Cleanup Management**: Properly close connections and clean up resources

### Error Handling

```typescript
import { McpError } from "@iqai/adk";

try {
  const toolset = new McpToolset(mcpConfig);
  const tools = await toolset.getTools();
  // Use tools...
} catch (error) {
  if (error instanceof McpError) {
    console.error(`MCP Error (${error.type}): ${error.message}`);
    if (error.originalError) {
      console.error("Original error:", error.originalError);
    }
  } else {
    console.error("Unexpected error:", error);
  }
} finally {
  await toolset?.close();
}
```

## ADK as MCP Server

Expose your ADK tools and agents as MCP servers for consumption by other MCP clients.

### Server Architecture

Transform ADK components into MCP-compatible services:

* **Tool Exposure**: Make custom tools available via MCP protocol
* **Agent Services**: Expose agent capabilities as MCP functions
* **Resource Sharing**: Provide access to data and content through MCP
* **Standard Compliance**: Follow MCP specifications for compatibility

### Benefits

* **Universal Access**: Make tools available to any MCP client
* **Ecosystem Integration**: Join the broader MCP ecosystem
* **Reusability**: Share functionality across different applications
* **Standardization**: Use established protocols for tool sharing

### Implementation Considerations

* **Protocol Compliance**: Ensure full MCP specification compliance
* **Security**: Implement proper authentication and authorization
* **Performance**: Optimize for network communication overhead
* **Documentation**: Provide clear tool descriptions and usage patterns

## Connection Management

### Local Connections (Stdio)

For local MCP servers running as separate processes:

* **Process Management**: Handle server process lifecycle
* **Communication**: Use stdin/stdout for bidirectional communication
* **Error Handling**: Manage process failures and restarts
* **Resource Cleanup**: Properly terminate server processes

### Remote Connections (SSE)

For remote MCP servers accessed over network:

* **Network Communication**: Handle HTTP/SSE connections
* **Authentication**: Manage API keys and credentials
* **Retry Logic**: Implement connection recovery and retries
* **Load Balancing**: Distribute requests across multiple servers

## Tool Discovery and Adaptation

### Discovery Process

1. **Connection Establishment**: Connect to MCP server
2. **Capability Query**: Request available tools and resources
3. **Schema Retrieval**: Get tool definitions and parameters
4. **Validation**: Verify tool compatibility and requirements

### Schema Adaptation

MCP tool schemas are automatically converted to ADK-compatible formats:

* **Parameter Mapping**: Convert MCP parameters to TypeScript types
* **Return Type Handling**: Adapt MCP responses to ADK expectations
* **Error Translation**: Map MCP errors to ADK error patterns
* **Documentation Integration**: Include MCP descriptions in tool metadata

## Security and Authentication

### Client Security

When consuming MCP servers:

* **Server Validation**: Verify server identity and trustworthiness
* **Communication Security**: Use secure connection methods
* **Access Controls**: Implement proper permission checks
* **Data Privacy**: Protect sensitive data in transit

### Server Security

When exposing MCP servers:

* **Client Authentication**: Verify client identity and permissions
* **API Rate Limiting**: Prevent abuse and overuse
* **Data Sanitization**: Validate and sanitize all inputs
* **Audit Logging**: Track access and usage patterns

## Performance Considerations

### Optimization Strategies

* **Connection Pooling**: Reuse connections for multiple operations
* **Caching**: Cache tool definitions and frequent responses
* **Async Operations**: Use non-blocking communication patterns
* **Batch Processing**: Group multiple operations when possible

### Monitoring and Debugging

* **Connection Health**: Monitor server connectivity and responsiveness
* **Performance Metrics**: Track latency and throughput
* **Error Rates**: Monitor failure rates and error patterns
* **Debug Logging**: Detailed logging for troubleshooting

## Best Practices

### Development

<Callout type="warn" title="Connection Management">
  Always properly close MCP connections and clean up resources to prevent memory leaks and zombie processes.
</Callout>

* **Error Handling**: Implement robust error handling and recovery
* **Resource Management**: Properly manage connections and cleanup
* **Testing**: Test with various MCP servers and scenarios
* **Documentation**: Document tool usage and requirements clearly

### Production Deployment

* **Health Checks**: Monitor MCP server availability
* **Failover Strategies**: Implement backup servers and fallback options
* **Scalability**: Design for horizontal scaling and load distribution
* **Monitoring**: Comprehensive logging and metrics collection

### Tool Design

* **Clear Interfaces**: Design intuitive tool parameters and responses
* **Comprehensive Documentation**: Provide detailed usage instructions
* **Error Messages**: Return actionable error information
* **Version Management**: Handle API versioning and compatibility

## Common Use Cases

### Data Integration

* **Database Access**: Query databases through MCP database servers
* **File Operations**: Manage files using filesystem MCP servers
* **API Access**: Connect to web services via MCP API gateways
* **Content Management**: Access CMS systems through MCP interfaces

### Workflow Automation

* **Process Orchestration**: Chain MCP tools for complex workflows
* **Event Handling**: Respond to external events via MCP servers
* **Data Processing**: Transform data using specialized MCP tools
* **Integration Patterns**: Connect multiple systems through MCP

## Related Topics

<Cards>
  <Card title="🔧 Function Tools" description="Create custom tools for MCP integration" href="/docs/framework/tools/function-tools" />

  <Card title="🔐 Authentication" description="Secure MCP connections and tool access" href="/docs/framework/tools/authentication" />

  <Card title="🌐 Third-Party Tools" description="Integrate with external tool ecosystems" href="/docs/framework/tools/third-party-tools" />

  <Card title="🤖 Agents" description="Learn how agents coordinate MCP tools" href="/docs/framework/agents" />

  <Card title="🖥️ MCP Servers" description="Explore IQAI-built MCP servers" href="/docs/mcp-servers" />
</Cards>

# AgentKit MCP Extension
URL: /docs/framework/tools/agentkit

Use Coinbase AgentKit providers as MCP tools and adapt them into ADK tools.

***

title: AgentKit MCP Extension
description: Use Coinbase AgentKit providers as MCP tools and adapt them into ADK tools.
----------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

## Overview

This guide shows how to wire Coinbase AgentKit into ADK TypeScript (adk-ts) using the Model Context Protocol (MCP). AgentKit action providers are exposed as MCP SDK tools and then converted into ADK tools so your agent can perform on-chain actions through Coinbase.

<Callout type="info" title="Architecture">
  AgentKit → MCP Extension → ADK BaseTool
</Callout>

## Convert AgentKit MCP tools to ADK tools

Use `convertMcpToolToBaseTool` to adapt AgentKit’s MCP tools into ADK `BaseTool`s.

```ts
import { getMcpTools } from "@coinbase/agentkit-model-context-protocol";
import { type BaseTool, convertMcpToolToBaseTool } from "@iqai/adk";
import type { AgentKit } from "@coinbase/agentkit";

export async function getAgentKitTools(agentKit: AgentKit): Promise<BaseTool[]> {
  const { tools, toolHandler } = await getMcpTools(agentKit);
  const baseTools = await Promise.all(
    tools.map(async (mcpTool) =>
      convertMcpToolToBaseTool({ mcpTool, toolHandler }),
    ),
  );
  return baseTools;
}
```

If you prefer a helper that creates AgentKit internally, keep the same conversion step and just supply your `agentKit` instance from that helper.

## Attach to an ADK agent

```ts
import { AgentBuilder } from "@iqai/adk";

// Assume you already created `agentKit` and `getAgentKitTools(agentKit)` from above
const tools = await getAgentKitTools(agentKit);

const { runner } = await AgentBuilder.create("coinbase_agent")
  .withModel("gemini-2.5-flash") // or your configured model
  .withDescription("Crypto-focused agent using Coinbase AgentKit")
  .withTools(...tools)
  .build();
```

## Choosing AgentKit providers

Pick the providers you need (wallet, ERC-20, prices, portfolio, etc.) when constructing your `AgentKit` instance, then run the same conversion step above. See the AgentKit docs for the full provider list.

<Callout type="info" title="Environment outline">
  You will typically need CDP API keys and a wallet private key. Refer to AgentKit’s documentation or the demo agent for exact requirements.
</Callout>

## References

* [Coinbase AgentKit Docs](https://docs.cdp.coinbase.com/agent-kit)
* [List of all AgentKit providers](https://github.com/coinbase/agentkit/blob/main/typescript/agentkit/README.md#action-providers)
* [Demo coinbase agent](https://github.com/GPSxtreme/coinbase-agent)

# OpenAPI Tools
URL: /docs/framework/tools/openapi-tools

Create tools for REST API integration using OpenAPI specifications

***

title: OpenAPI Tools
description: Create tools for REST API integration using OpenAPI specifications
-------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

OpenAPI tools enable integration with REST APIs based on OpenAPI specifications. While ADK TypeScript doesn't currently include automatic tool generation from OpenAPI specs, you can manually create API tools using the existing HttpRequestTool and FunctionTool components.

## Current Implementation Approach

ADK TypeScript provides foundational tools for API integration that can be combined to work with OpenAPI-documented services.

### Available Components

<Cards>
  <Card title="🌐 HttpRequestTool" description="Make HTTP requests to REST API endpoints" />

  <Card title="🔧 FunctionTool" description="Create custom wrappers for specific API operations" />

  <Card title="🔐 Authentication" description="Handle API authentication and credentials" />
</Cards>

<Callout type="info" title="Future Enhancement">
  Automatic OpenAPI tool generation is planned for a future release. The current approach requires manual tool creation but provides full flexibility and control.
</Callout>

## Manual API Tool Creation

### Using HttpRequestTool

The HttpRequestTool provides a general-purpose solution for API integration:

```typescript
import { HttpRequestTool, LlmAgent } from '@iqai/adk';

const httpTool = new HttpRequestTool();

const apiAgent = new LlmAgent({
  name: 'api-agent',
  model: 'gemini-2.5-flash',
  description: 'Agent that can interact with REST APIs',
  instruction: `
    You can make HTTP requests to APIs using the http_request tool.
    When calling APIs:
    - Use the correct HTTP method (GET, POST, PUT, DELETE)
    - Include required headers and authentication
    - Format request bodies as JSON strings when needed
    - Parse and interpret the response data
  `,
  tools: [httpTool]
});
```

### Creating Specific API Tools

For better control and LLM understanding, create specific tools for individual API operations:

```typescript
import { FunctionTool } from '@iqai/adk';

// Create a specific tool for weather API
async function getWeather(location: string, apiKey: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  );

  if (!response.ok) {
    return {
      error: `Weather API error: ${response.status} ${response.statusText}`
    };
  }

  const data = await response.json();
  return {
    location: data.name,
    temperature: Math.round(data.main.temp - 273.15), // Convert from Kelvin
    description: data.weather[0].description,
    humidity: data.main.humidity
  };
}

const weatherTool = new FunctionTool(getWeather, {
  name: 'get_weather',
  description: 'Get current weather information for a specific location'
});
```

### API Wrapper Class Pattern

For complex APIs, create wrapper classes that encapsulate multiple operations:

```typescript
import { BaseTool } from '@iqai/adk';

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
}

class ApiTool extends BaseTool {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    super({
      name: 'api_tool',
      description: 'Custom API integration tool'
    });
    this.config = config;
  }

  async runAsync(args: {
    operation: string;
    path: string;
    method?: string;
    body?: string;
    headers?: Record<string, string>;
  }) {
    try {
      const url = `${this.config.baseUrl}${args.path}`;
      const headers = {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...args.headers
      };

      const response = await fetch(url, {
        method: args.method || 'GET',
        headers,
        body: args.body,
        signal: AbortSignal.timeout(this.config.timeout || 10000)
      });

      const responseData = await response.text();

      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData
      };
    } catch (error) {
      return {
        error: `API request failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'The API operation to perform'
          },
          path: {
            type: 'string',
            description: 'API endpoint path'
          },
          method: {
            type: 'string',
            description: 'HTTP method (GET, POST, PUT, DELETE)',
            enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
          },
          body: {
            type: 'string',
            description: 'Request body as JSON string'
          },
          headers: {
            type: 'object',
            description: 'Additional request headers'
          }
        },
        required: ['operation', 'path']
      }
    };
  }
}
```

## OpenAPI Specification Guidance

### Reading OpenAPI Specs

When working with OpenAPI specifications manually:

1. **Identify Endpoints**: Review the `paths` object for available operations
2. **Understand Parameters**: Check path, query, header, and body parameters
3. **Review Authentication**: Check `securitySchemes` for auth requirements
4. **Study Responses**: Understand expected response formats and status codes

### Implementation Strategy

1. **Start Simple**: Begin with basic GET operations using HttpRequestTool
2. **Add Authentication**: Implement required auth patterns
3. **Create Specific Tools**: Build dedicated tools for frequently used operations
4. **Error Handling**: Implement robust error handling and validation
5. **Testing**: Thoroughly test all API interactions

## Authentication Patterns

### API Key Authentication

```typescript
async function callApiWithKey(endpoint: string, apiKey: string, params?: Record<string, string>) {
  const url = new URL(endpoint);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
```

### Bearer Token Authentication

```typescript
async function callApiWithToken(endpoint: string, token: string, data?: any) {
  const response = await fetch(endpoint, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  });

  return response.json();
}
```

## Error Handling Best Practices

### Response Validation

```typescript
async function safeApiCall(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        error: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status
      };
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return { data, status: response.status };
    } else {
      const text = await response.text();
      return { data: text, status: response.status };
    }
  } catch (error) {
    return {
      error: `Network error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
```

### Retry Logic

```typescript
async function apiCallWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) {
        return response;
      }
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}
```

## Future Roadmap

<Callout type="info" title="Planned Features">
  Future versions of ADK TypeScript will include:

  * Automatic tool generation from OpenAPI specifications
  * Built-in OpenAPI parser and validator
  * Advanced authentication flow handling
  * Dynamic tool registration and discovery
</Callout>

### Expected Features

* **OpenAPIToolset Class**: Automatic tool generation from specifications
* **Schema Validation**: Built-in request/response validation
* **Operation Discovery**: Automatic endpoint discovery and mapping
* **Auth Integration**: Seamless authentication handling
* **Type Generation**: TypeScript type generation from schemas

## Best Practices

### Tool Design

* **Single Responsibility**: Create focused tools for specific operations
* **Clear Descriptions**: Provide detailed tool descriptions for LLM understanding
* **Error Handling**: Implement comprehensive error handling
* **Parameter Validation**: Validate inputs before making API calls

### Agent Instructions

* **API Documentation**: Provide clear instructions about API usage
* **Error Recovery**: Define how to handle API failures
* **Rate Limiting**: Inform agents about API rate limits
* **Data Formats**: Explain expected request and response formats

### Security Considerations

* **Credential Management**: Store API keys and tokens securely
* **Environment Variables**: Use environment variables for sensitive data
* **Access Controls**: Implement appropriate access restrictions
* **Audit Logging**: Log API usage for security and compliance

## Related Topics

<Cards>
  <Card title="🌐 Built-in Tools" description="Explore HttpRequestTool and other built-in capabilities" href="/docs/framework/tools/built-in-tools" />

  <Card title="🔧 Function Tools" description="Create custom tools for specific API operations" href="/docs/framework/tools/function-tools" />

  <Card title="🔐 Authentication" description="Secure API access and credential management" href="/docs/framework/tools/authentication" />

  <Card title="🤖 Agents" description="Learn how agents coordinate API tools" href="/docs/framework/agents" />
</Cards>

# Third-Party Tools
URL: /docs/framework/tools/third-party-tools

Integrate tools from popular external libraries and frameworks

***

title: Third-Party Tools
description: Integrate tools from popular external libraries and frameworks
---------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

ADK TypeScript is designed for extensibility, allowing integration with tools from other AI agent frameworks. While ADK doesn't currently include built-in wrappers for third-party frameworks, you can manually integrate external tools using the existing BaseTool and FunctionTool components.

## Integration Approach

Third-party tool integration provides several key benefits:

* **Faster Development**: Leverage existing tools instead of building from scratch
* **Ecosystem Access**: Tap into established tool libraries and communities
* **Best Practices**: Use proven tools with established patterns
* **Interoperability**: Connect different AI frameworks and platforms

<Callout type="info" title="Manual Integration">
  ADK TypeScript currently requires manual integration of third-party tools. Built-in wrapper classes for popular frameworks are planned for future releases.
</Callout>

## Integration Methods

<Cards>
  <Card title="🔧 Function Wrappers" description="Wrap external functions as ADK tools" />

  <Card title="🛠️ Custom Tool Classes" description="Create custom tool classes that extend BaseTool" />

  <Card title="📦 Library Integration" description="Integrate entire libraries with multiple tools" />
</Cards>

## Function Wrapper Pattern

The simplest approach for integrating external tools is to wrap their functions using FunctionTool.

### Basic Function Wrapping

```typescript
import { FunctionTool } from '@iqai/adk';

// Example: Integrating a hypothetical search library
import { searchWeb } from 'some-search-library';

async function wrappedSearch(query: string, maxResults: number = 10) {
  try {
    const results = await searchWeb({
      query,
      limit: maxResults
    });

    return {
      success: true,
      results: results.map(r => ({
        title: r.title,
        url: r.url,
        snippet: r.description
      }))
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Search failed'
    };
  }
}

const searchTool = new FunctionTool(wrappedSearch, {
  name: 'web_search',
  description: 'Search the web for information on any topic'
});
```

### Advanced Function Integration

For more complex external tools with multiple configuration options:

```typescript
import { FunctionTool } from '@iqai/adk';
import { DatabaseClient } from 'some-database-library';

// Configure the external library
const dbClient = new DatabaseClient({
  host: process.env.DB_HOST,
  apiKey: process.env.DB_API_KEY
});

async function queryDatabase(
  query: string,
  table: string,
  limit: number = 100
) {
  try {
    const result = await dbClient.query({
      sql: query,
      table,
      maxRows: limit
    });

    return {
      success: true,
      data: result.rows,
      count: result.count
    };
  } catch (error) {
    return {
      success: false,
      error: `Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

const dbTool = new FunctionTool(queryDatabase, {
  name: 'query_database',
  description: 'Execute SQL queries against the database'
});
```

## Custom Tool Class Pattern

For more sophisticated integrations, create custom tool classes that extend BaseTool.

### Basic Custom Tool

```typescript
import { BaseTool } from '@iqai/adk';
import { ExternalService } from 'external-library';

interface ExternalToolConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

class ExternalTool extends BaseTool {
  private client: ExternalService;

  constructor(config: ExternalToolConfig) {
    super({
      name: 'external_tool',
      description: 'Integration with external service'
    });

    this.client = new ExternalService({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl || 'https://api.example.com',
      timeout: config.timeout || 30000
    });
  }

  async runAsync(args: {
    operation: string;
    parameters: Record<string, any>;
  }) {
    try {
      switch (args.operation) {
        case 'search':
          return await this.client.search(args.parameters);
        case 'create':
          return await this.client.create(args.parameters);
        case 'update':
          return await this.client.update(args.parameters);
        default:
          return { error: `Unknown operation: ${args.operation}` };
      }
    } catch (error) {
      return {
        error: `External service error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Operation to perform',
            enum: ['search', 'create', 'update']
          },
          parameters: {
            type: 'object',
            description: 'Parameters for the operation'
          }
        },
        required: ['operation', 'parameters']
      }
    };
  }
}
```

### Multi-Operation Tool

For libraries with multiple related functions:

```typescript
import { BaseTool } from '@iqai/adk';

class MultiOperationTool extends BaseTool {
  constructor() {
    super({
      name: 'multi_tool',
      description: 'Tool that can perform multiple operations'
    });
  }

  async runAsync(args: {
    operation: 'analyze' | 'process' | 'transform';
    data: any;
    options?: Record<string, any>;
  }) {
    const { operation, data, options = {} } = args;

    try {
      switch (operation) {
        case 'analyze':
          return await this.analyzeData(data, options);
        case 'process':
          return await this.processData(data, options);
        case 'transform':
          return await this.transformData(data, options);
        default:
          return { error: `Unknown operation: ${operation}` };
      }
    } catch (error) {
      return {
        error: `Operation failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  private async analyzeData(data: any, options: Record<string, any>) {
    // Integration with external analysis library
    // Return analysis results
    return { analysis: 'result' };
  }

  private async processData(data: any, options: Record<string, any>) {
    // Integration with external processing library
    // Return processed data
    return { processed: data };
  }

  private async transformData(data: any, options: Record<string, any>) {
    // Integration with external transformation library
    // Return transformed data
    return { transformed: data };
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Operation to perform',
            enum: ['analyze', 'process', 'transform']
          },
          data: {
            type: 'any',
            description: 'Data to operate on'
          },
          options: {
            type: 'object',
            description: 'Optional parameters for the operation'
          }
        },
        required: ['operation', 'data']
      }
    };
  }
}
```

## Integration Examples

### LangChain-style Tools

If you want to integrate tools similar to LangChain's approach:

```typescript
import { FunctionTool } from '@iqai/adk';

// Example: Creating a search tool similar to LangChain patterns
async function tavilySearch(query: string) {
  // Integration with Tavily search API
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    return { error: 'Search failed' };
  }

  const data = await response.json();
  return {
    results: data.results.map((r: any) => ({
      title: r.title,
      url: r.url,
      content: r.content
    }))
  };
}

const tavilyTool = new FunctionTool(tavilySearch, {
  name: 'tavily_search',
  description: 'Search the internet using Tavily search engine'
});
```

### CrewAI-style Tools

For tools similar to CrewAI's approach:

```typescript
import { BaseTool } from '@iqai/adk';

class SerperSearchTool extends BaseTool {
  private apiKey: string;

  constructor(apiKey: string) {
    super({
      name: 'serper_search',
      description: 'Search Google using Serper API for real-time results'
    });
    this.apiKey = apiKey;
  }

  async runAsync(args: { query: string; type?: string; num?: number }) {
    try {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey
        },
        body: JSON.stringify({
          q: args.query,
          type: args.type || 'search',
          num: args.num || 10
        })
      });

      if (!response.ok) {
        return { error: `Search failed: ${response.statusText}` };
      }

      const data = await response.json();
      return {
        organic: data.organic || [],
        answerBox: data.answerBox,
        knowledgeGraph: data.knowledgeGraph
      };
    } catch (error) {
      return {
        error: `Serper search failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query'
          },
          type: {
            type: 'string',
            description: 'Type of search (search, images, news)',
            enum: ['search', 'images', 'news']
          },
          num: {
            type: 'number',
            description: 'Number of results to return (max 100)'
          }
        },
        required: ['query']
      }
    };
  }
}
```

## Authentication and Configuration

### Environment-based Configuration

```typescript
interface ToolConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

class ConfigurableTool extends BaseTool {
  private config: ToolConfig;

  constructor(config: ToolConfig = {}) {
    super({
      name: 'configurable_tool',
      description: 'Tool with flexible configuration'
    });

    this.config = {
      apiKey: config.apiKey || process.env.TOOL_API_KEY,
      baseUrl: config.baseUrl || process.env.TOOL_BASE_URL || 'https://api.example.com',
      timeout: config.timeout || 30000,
      retries: config.retries || 3
    };

    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }
  }

  async runAsync(args: any) {
    // Implementation using this.config
    return { success: true };
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          // Define parameters
        }
      }
    };
  }
}
```

## Error Handling and Reliability

### Robust Error Handling

```typescript
async function resilientToolWrapper(externalFunction: Function, ...args: any[]) {
  const maxRetries = 3;
  const backoffMs = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await externalFunction(...args);
      return { success: true, data: result };
    } catch (error) {
      if (attempt === maxRetries) {
        return {
          success: false,
          error: `Failed after ${maxRetries} attempts: ${error instanceof Error ? error.message : String(error)}`
        };
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, backoffMs * Math.pow(2, attempt - 1)));
    }
  }
}
```

### Circuit Breaker Pattern

```typescript
class CircuitBreakerTool extends BaseTool {
  private failures = 0;
  private lastFailureTime = 0;
  private isOpen = false;
  private readonly failureThreshold = 5;
  private readonly resetTimeoutMs = 60000; // 1 minute

  constructor() {
    super({
      name: 'circuit_breaker_tool',
      description: 'Tool with circuit breaker for reliability'
    });
  }

  async runAsync(args: any) {
    if (this.isCircuitOpen()) {
      return { error: 'Circuit breaker is open - service unavailable' };
    }

    try {
      const result = await this.callExternalService(args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private isCircuitOpen(): boolean {
    if (this.isOpen && Date.now() - this.lastFailureTime > this.resetTimeoutMs) {
      this.isOpen = false;
      this.failures = 0;
    }
    return this.isOpen;
  }

  private onSuccess() {
    this.failures = 0;
    this.isOpen = false;
  }

  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.failureThreshold) {
      this.isOpen = true;
    }
  }

  private async callExternalService(args: any) {
    // Call external service
    return { success: true };
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {}
      }
    };
  }
}
```

## Future Development

<Callout type="info" title="Planned Features">
  Future versions of ADK TypeScript will include:

  * Built-in wrapper classes for popular frameworks
  * Automatic tool discovery and registration
  * Enhanced type safety for third-party integrations
  * Plugin architecture for easier extensibility
</Callout>

### Expected Enhancements

* **LangChainTool Class**: Automatic wrapper for LangChain tools
* **CrewAITool Class**: Native integration with CrewAI tools
* **Plugin System**: Simplified plugin architecture
* **Type Generation**: Automatic TypeScript types from external schemas
* **Tool Discovery**: Automatic discovery of compatible tools

## Best Practices

### Integration Guidelines

* **Clear Abstractions**: Create clean interfaces between ADK and external tools
* **Error Handling**: Implement comprehensive error handling and recovery
* **Type Safety**: Maintain TypeScript type safety across integrations
* **Documentation**: Provide clear descriptions for LLM understanding

### Performance Considerations

* **Async Operations**: Use non-blocking operations where possible
* **Connection Pooling**: Reuse connections for external services
* **Caching**: Cache results from expensive operations
* **Timeout Management**: Set appropriate timeouts for external calls

### Security Practices

* **Credential Management**: Store credentials securely
* **Input Validation**: Validate all inputs before external calls
* **Access Controls**: Implement proper permission checks
* **Audit Logging**: Track usage and access patterns

## Related Topics

<Cards>
  <Card title="🔧 Function Tools" description="Create custom tools for specialized needs" href="/docs/framework/tools/function-tools" />

  <Card title="⚡ Built-in Tools" description="Explore ADK's native tool capabilities" href="/docs/framework/tools/built-in-tools" />

  <Card title="🔐 Authentication" description="Secure tool integrations and API access" href="/docs/framework/tools/authentication" />

  <Card title="🤖 Agents" description="Learn how agents coordinate tools from different frameworks" href="/docs/framework/agents" />
</Cards>

# Authentication
URL: /docs/framework/tools/authentication

Authentication patterns and secure API access for ADK TypeScript tools

***

title: Authentication
description: Authentication patterns and secure API access for ADK TypeScript tools
-----------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Tool authentication enables secure access to protected resources and APIs. While ADK TypeScript doesn't currently include built-in authentication classes, you can implement secure authentication patterns using existing tools and standard libraries.

## Authentication Approach

Authentication in ADK TypeScript focuses on practical patterns and integration with existing authentication libraries rather than custom authentication frameworks.

### Current Implementation Strategy

<Cards>
  <Card title="🔑 Environment Variables" description="Secure credential storage using environment variables" />

  <Card title="📦 Standard Libraries" description="Integration with established authentication libraries" />

  <Card title="🔧 Custom Integration" description="Manual authentication implementation in custom tools" />
</Cards>

<Callout type="info" title="Development Status">
  Comprehensive authentication classes (AuthScheme, AuthCredential) are planned for future releases. Current approach uses standard libraries and patterns.
</Callout>

## Authentication Patterns

### API Key Authentication

The most common pattern for API access using keys or tokens.

#### Environment Variable Pattern

```typescript
import { FunctionTool } from '@iqai/adk';

async function authenticatedApiCall(endpoint: string, data?: any) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return { error: 'API key not configured' };
  }

  const response = await fetch(endpoint, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  });

  if (!response.ok) {
    return { error: `API call failed: ${response.statusText}` };
  }

  return await response.json();
}

const apiTool = new FunctionTool(authenticatedApiCall, {
  name: 'api_call',
  description: 'Make authenticated API calls'
});
```

#### Header-based API Keys

```typescript
async function headerApiKeyCall(endpoint: string, params: Record<string, any>) {
  const headers: Record<string, string> = {
    'X-API-Key': process.env.SERVICE_API_KEY!,
    'Content-Type': 'application/json'
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(params)
  });

  return response.json();
}
```

#### Query Parameter API Keys

```typescript
async function queryApiKeyCall(endpoint: string, query: string) {
  const url = new URL(endpoint);
  url.searchParams.append('api_key', process.env.SERVICE_API_KEY!);
  url.searchParams.append('q', query);

  const response = await fetch(url.toString());
  return response.json();
}
```

### OAuth 2.0 Integration

Using standard OAuth libraries for secure authentication flows.

#### Google OAuth Example

```typescript
import { OAuth2Client } from 'google-auth-library';
import { BaseTool } from '@iqai/adk';

class GoogleOAuthTool extends BaseTool {
  private oauth2Client: OAuth2Client;

  constructor() {
    super({
      name: 'google_oauth_tool',
      description: 'Tool with Google OAuth authentication'
    });

    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async runAsync(args: { operation: string; accessToken?: string }) {
    try {
      if (!args.accessToken) {
        return { error: 'Access token required' };
      }

      this.oauth2Client.setCredentials({ access_token: args.accessToken });

      // Make authenticated request
      const response = await this.oauth2Client.request({
        url: `https://www.googleapis.com/oauth2/v2/userinfo`,
        method: 'GET'
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: `OAuth request failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  async generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.profile']
    });
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Operation to perform'
          },
          accessToken: {
            type: 'string',
            description: 'OAuth access token'
          }
        },
        required: ['operation']
      }
    };
  }
}
```

#### Generic OAuth 2.0 Pattern

```typescript
interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  scope?: string;
}

class OAuthAuthenticator {
  constructor(private config: OAuthConfig) {}

  async getAccessToken(authCode: string): Promise<string> {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code: authCode,
        scope: this.config.scope || ''
      })
    });

    const data = await response.json();
    return data.access_token;
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: refreshToken
      })
    });

    const data = await response.json();
    return data.access_token;
  }
}
```

### Service Account Authentication

For Google Cloud and other service account patterns.

#### Google Service Account

```typescript
import { GoogleAuth } from 'google-auth-library';
import { BaseTool } from '@iqai/adk';

class ServiceAccountTool extends BaseTool {
  private auth: GoogleAuth;

  constructor() {
    super({
      name: 'service_account_tool',
      description: 'Tool using Google service account authentication'
    });

    this.auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
  }

  async runAsync(args: { endpoint: string; data?: any }) {
    try {
      const authClient = await this.auth.getClient();

      const response = await authClient.request({
        url: args.endpoint,
        method: args.data ? 'POST' : 'GET',
        data: args.data
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: `Service account request failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  getDeclaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'object',
        properties: {
          endpoint: {
            type: 'string',
            description: 'API endpoint URL'
          },
          data: {
            type: 'object',
            description: 'Optional request data'
          }
        },
        required: ['endpoint']
      }
    };
  }
}
```

#### JWT-based Service Authentication

```typescript
import jwt from 'jsonwebtoken';

async function createJWTToken(payload: any, secret: string, expiresIn: string = '1h') {
  return jwt.sign(payload, secret, { expiresIn });
}

async function authenticatedServiceCall(endpoint: string, payload: any) {
  const token = await createJWTToken(
    { service: 'adk-agent', ...payload },
    process.env.JWT_SECRET!
  );

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return response.json();
}
```

## Secure Credential Management

### Environment Variables

Best practices for credential storage:

```typescript
// Required environment variables
const requiredEnvVars = [
  'API_KEY',
  'CLIENT_SECRET',
  'DATABASE_URL'
];

function validateEnvironment() {
  const missing = requiredEnvVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Call during application startup
validateEnvironment();
```

### Credential Rotation

```typescript
interface CredentialManager {
  getCredential(key: string): Promise<string>;
  refreshCredential(key: string): Promise<string>;
  isExpired(key: string): Promise<boolean>;
}

class SimpleCredentialManager implements CredentialManager {
  private credentials = new Map<string, { value: string; expires: Date }>();

  async getCredential(key: string): Promise<string> {
    const cred = this.credentials.get(key);

    if (!cred || await this.isExpired(key)) {
      return await this.refreshCredential(key);
    }

    return cred.value;
  }

  async refreshCredential(key: string): Promise<string> {
    // Implement credential refresh logic
    const newCredential = await this.fetchFreshCredential(key);

    this.credentials.set(key, {
      value: newCredential,
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    });

    return newCredential;
  }

  async isExpired(key: string): Promise<boolean> {
    const cred = this.credentials.get(key);
    return !cred || cred.expires < new Date();
  }

  private async fetchFreshCredential(key: string): Promise<string> {
    // Implement actual credential refresh
    return 'fresh-credential';
  }
}
```

## Error Handling and Security

### Secure Error Handling

```typescript
async function secureApiCall(endpoint: string, credentials: any) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${credentials.token}`
      }
    });

    if (!response.ok) {
      // Don't expose sensitive credential information
      return {
        error: `API request failed with status ${response.status}`,
        retryable: response.status >= 500
      };
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    // Log detailed error internally, return safe error externally
    console.error('API call failed:', error);

    return {
      error: 'Service temporarily unavailable',
      retryable: true
    };
  }
}
```

### Rate Limiting and Retry Logic

```typescript
async function authenticatedCallWithRetry(
  endpoint: string,
  credentials: any,
  maxRetries: number = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${credentials.token}`,
          'User-Agent': 'ADK-Agent/1.0'
        }
      });

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 401) {
        // Credential issue - don't retry
        throw new Error('Authentication failed');
      }

      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000 * attempt;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      if (response.status >= 500 && attempt < maxRetries) {
        // Server error - retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        continue;
      }

      throw new Error(`API call failed: ${response.statusText}`);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }
}
```

## Future Authentication Features

<Callout type="info" title="Planned Features">
  Future versions of ADK TypeScript will include:

  * Built-in AuthScheme and AuthCredential classes
  * Automatic token management and refresh
  * OAuth flow helpers and utilities
  * Integration with secret management services
  * Enhanced security and compliance features
</Callout>

### Expected Features

* **AuthScheme Class**: Define authentication requirements for tools
* **AuthCredential Class**: Secure credential storage and management
* **OAuth Helpers**: Built-in OAuth 2.0 and OpenID Connect support
* **Token Management**: Automatic token refresh and rotation
* **Secret Integration**: Integration with AWS Secrets Manager, Azure Key Vault, etc.

## Best Practices

### Security Guidelines

* **Environment Variables**: Store sensitive credentials as environment variables
* **Credential Validation**: Validate credentials during application startup
* **Secure Transmission**: Always use HTTPS for credential exchanges
* **Access Logging**: Log authentication attempts for security monitoring
* **Credential Rotation**: Implement regular credential rotation where possible

### Development Practices

* **Separate Environments**: Use different credentials for dev/staging/production
* **Testing**: Use mock credentials for testing, not production credentials
* **Documentation**: Document authentication requirements clearly
* **Error Handling**: Implement secure error handling that doesn't expose credentials

### Production Considerations

* **Monitoring**: Monitor authentication success/failure rates
* **Alerting**: Set up alerts for authentication failures
* **Backup Credentials**: Have backup authentication methods where possible
* **Compliance**: Ensure authentication meets regulatory requirements

## Related Topics

<Cards>
  <Card title="🔧 Function Tools" description="Implement authentication in custom tools" href="/docs/framework/tools/function-tools" />

  <Card title="🌐 Built-in Tools" description="Authentication patterns for built-in tools" href="/docs/framework/tools/built-in-tools" />

  <Card title="☁️ Google Cloud Tools" description="Google Cloud authentication and service accounts" href="/docs/framework/tools/google-cloud-tools" />

  <Card title="🌐 Third-Party Tools" description="Authentication for external tool integrations" href="/docs/framework/tools/third-party-tools" />
</Cards>

# Runtime & Execution
URL: /docs/framework/runtime

Understanding the agent execution engine and event-driven architecture

***

title: Runtime & Execution
description: Understanding the agent execution engine and event-driven architecture
-----------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

The ADK Runtime is the execution engine that powers agent applications during user interactions. It orchestrates agents, tools, and services through an event-driven architecture.

## Overview

The Runtime serves as the coordination layer that connects all components of your agent application and manages their interactions through a cooperative async generator pattern.

### Core Responsibilities

* **Execution Orchestration**: Coordinate agent, tool, and callback execution
* **Event Processing**: Handle event flow between components
* **State Management**: Manage session state changes and persistence
* **Service Integration**: Connect with LLMs, storage, and external services
* **Resource Management**: Handle lifecycle and resource allocation

<Callout type="info" title="Event-Driven Architecture">
  The Runtime operates on events - agents yield events to communicate with the Runner, which processes them and coordinates with services before allowing agents to continue.
</Callout>

## Quick Start

Here's a basic example of how the Runtime works:

```typescript
import { LlmAgent, Runner, InMemorySessionService } from '@iqai/adk';

// Create an agent
const agent = new LlmAgent({
  name: "assistant",
  model: "gemini-2.5-flash",
  description: "A helpful assistant",
  instruction: "You are a helpful assistant"
});

// Set up runtime components
const sessionService = new InMemorySessionService();
const session = await sessionService.createSession("example", "user_123");

const runner = new Runner({
  appName: "example",
  agent,
  sessionService
});

// Process user input through the runtime
for await (const event of runner.runAsync({
  userId: "user_123",
  sessionId: session.id,
  newMessage: { parts: [{ text: "Hello!" }] }
})) {
  console.log('Event:', event.author, event.content?.parts);
}
```

### Even simpler with AgentBuilder (ADK‑TS)

If you prefer an even simpler API, you can use the AgentBuilder to get up and running quickly without wiring sessions and the runner yourself. See the full guide: [Agent Builder](http://localhost:3000/docs/framework/agents/agent-builder).

```typescript
import { AgentBuilder } from '@iqai/adk';

// One-liner execution with automatic in-memory session and smart defaults
const response = await AgentBuilder
  .withModel('gemini-2.5-flash')
  .ask('Hello!');

console.log(response);
```

You can also keep a handle to the runner and session if you want streaming events and state control while still using the builder:

```typescript
import { AgentBuilder } from '@iqai/adk';

const { runner, session } = await AgentBuilder
  .create('example-assistant')
  .withModel('gemini-2.5-flash')
  .withInstruction('You are a helpful assistant')
  .build();

for await (const event of runner.runAsync({
  userId: 'user_123',
  sessionId: session.id,
  newMessage: { parts: [{ text: 'Hello!' }] }
})) {
  console.log('Event:', event.author, event.content?.parts);
}
```

<Callout type="info" title="Automatic session management">
  AgentBuilder auto-creates and manages an in-memory session by default — no
  setup required. Switch to a persistent SessionService (e.g., Redis/DB) only
  when you need durable sessions. You can always fall back to the lower-level
  Runtime pattern above for full control.
</Callout>

### What’s happening under the hood?

Both versions above follow the same Runtime model:

* A `Session` is created (in-memory by default) and identified by `appName` (here, "example") and `userId`.
* The `Runner` orchestrates execution. It appends the new user message, iterates the agent’s async generator, and persists non-partial events.
* The `Agent` yields events (model output, tool calls/results, state deltas), which the `Runner` processes and then continues execution.
* The AgentBuilder shortcut simply constructs the agent, session, and runner with smart defaults and, when using `ask()`, consumes the event stream to return the final response directly.

## Key components of the Runtime

Several components work together within the ADK Runtime to execute an agent invocation. Understanding their roles clarifies how the event loop functions:

1. ### `Runner`

* Role: The main entry point and orchestrator for a single user query (`runAsync`).
* Function: Manages the overall event loop, receives events yielded by the execution logic (agents/flows), coordinates with services to persist effects, and forwards processed events upstream (e.g., to the UI). It drives each turn by:
  * Loading the `Session` via `SessionService`
  * Creating an `InvocationContext` with an `invocationId`
  * Appending the new user message as an event
  * Iterating the agent’s `runAsync` generator, appending non-partial events and updating memory
  * Yielding events to callers as they occur

2. ### Execution Logic Components

* Role: Your custom reasoning code and core agent capabilities.
* Components:
  * `Agent` (`BaseAgent`, `LlmAgent`, etc.): Primary logic units that process information and decide on actions. They implement the `runAsyncImpl` method and yield `Event` objects to communicate progress, tool calls, state deltas, and final replies.
  * `Tools` (`BaseTool`, `FunctionTool`, `AgentTool`, etc.): External capabilities invoked by agents. They execute and return results which are wrapped in events; some tools can run other agents (`AgentTool`).
  * `Callbacks`: Hook points for customizing behavior. On `BaseAgent` you can set `beforeAgentCallback` and `afterAgentCallback`; on `LlmAgent` you can also use `beforeModelCallback`, `afterModelCallback`, `beforeToolCallback`, and `afterToolCallback` to shape requests/responses.
* Function: Perform the “thinking,” calculations, and external interactions. They communicate via yielded `Event`s and pause until the `Runner` processes/persists effects.

3. ### `Event`

* Role: The message passed between the `Runner` and execution logic.
* Function: Represents an atomic occurrence (user input, agent text, tool call/result, state change request, control signal). An `Event` contains content plus `actions` (`EventActions`) describing intended side effects, for example:
  * `stateDelta`: keys to merge into session state (keys prefixed with `temp_` are treated as ephemeral and not persisted into state)
  * `artifactDelta`: artifact file/version updates associated with the session
  * `transferToAgent`, `escalate`, and `skipSummarization` control signals

4. ### `Services`

* Role: Backend components for persistent/shared resources. Primarily used by the `Runner` during event processing.
* Components:
  * `SessionService` (`BaseSessionService`, `InMemorySessionService`, etc.): Manages `Session` objects, applies `stateDelta` to session state, and appends events to the history.
  * `ArtifactService` (`BaseArtifactService`, `InMemoryArtifactService`, etc.): Stores and retrieves binary data. The `Runner` can save uploaded blobs as artifacts and events can record `artifactDelta` to reflect updates.
  * `MemoryService` (`BaseMemoryService`, `InMemoryMemoryService`, etc.): Optional long-term semantic memory; the `Runner` can update memory after appending events.
* Function: Provide persistence and retrieval guarantees so that changes signaled by `event.actions` are reliably stored before execution continues.

5. ### `Session`

* Role: The data container for one specific conversation between a user and the app.
* Function: Holds the current `state` object, ordered `events` history, and metadata. Managed by `SessionService` and used by `Runner` and agents to maintain context across turns.

6. ### `Invocation`

* Role: Everything that happens in response to a single user query, from receipt to completion.
* Function: Represented at runtime by `InvocationContext` (with a stable `invocationId`). An invocation may include multiple agent runs (e.g., transfers, `AgentTool`), several LLM calls, tool executions, and callbacks. Temporary variables intended only for the current turn should be scoped under keys prefixed with `temp_` in `stateDelta`.

These components interact continuously through the event loop to process the user’s request.

## Related Topics

<Cards>
  <Card title="🔄 Event Loop" description="Understanding the cooperative async generator pattern and event flow" href="/docs/framework/runtime/event-loop" />

  <Card title="📋 Invocation Lifecycle" description="Complete lifecycle from user query to response completion" href="/docs/framework/runtime/invocation-lifecycle" />
</Cards>

# Event Loop
URL: /docs/framework/runtime/event-loop

Understanding the cooperative async generator pattern and event flow

***

title: Event Loop
description: Understanding the cooperative async generator pattern and event flow
---------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

At the heart of the ADK Runtime is an Event Loop that facilitates communication between the Runner component and your execution logic (agents, tools, callbacks).

## Event-Driven Architecture

The Runtime operates on a cooperative async generator pattern where components communicate through events:

1. **Runner receives** user query and initiates agent processing
2. **Agent executes** logic until it has something to report (response, tool call, state change)
3. **Event yielded** by agent as part of async generator
4. **Runner processes** event, commits changes via services, forwards event upstream
5. **Agent resumes** execution after Runner completes event processing
6. **Cycle repeats** until agent has no more events for the current query

<Callout type="warn" title="Event Processing Order">
  Agent execution pauses after yielding events until the Runner completes processing. This ensures state consistency and proper event ordering.
</Callout>

## Execution Flow

### Runner Role (Orchestrator)

The Runner acts as the central coordinator for a single user invocation. Its responsibilities in the loop are:

* **Initiation**: Receives the end user's query (new\_message) and typically appends it to the session history via the SessionService.
* **Kick-off**: Starts the event generation process by calling the main agent's execution method (e.g., agent\_to\_run.run\_async(...)).
* **Receive & Process**: Waits for the agent logic to yield or emit an Event. Upon receiving an event, the Runner promptly processes it. This involves:
  * Using configured Services (SessionService, ArtifactService, MemoryService) to commit changes indicated in event.actions (like state\_delta, artifact\_delta).
  * Performing other internal bookkeeping.
* **Yield Upstream**: Forwards the processed event onwards (e.g., to the calling application or UI for rendering).
* **Iterate**: Signals the agent logic that processing is complete for the yielded event, allowing it to resume and generate the next event.

```typescript
// Simplified view of Runner's main loop logic
async function* runAsync(userId: string, sessionId: string, newMessage: Content): AsyncGenerator<Event> {
  // 1. Get or create session
  const session = await sessionService.getSession(appName, userId, sessionId);

  // 2. Create invocation context
  const invocationContext = new InvocationContext({ /* ... */ });

  // 3. Append new message to session (if provided)
  if (newMessage) {
    await appendNewMessageToSession(session, newMessage, invocationContext);
  }

  // 4. Find the agent to run for this session
  const agentToRun = findAgentToRun(session, rootAgent);

  // 5. Get agent's async generator
  const agentGenerator = agentToRun.runAsync(invocationContext);

  // 6. Process events from agent
  for await (const event of agentGenerator) {
    // 7. For non-partial events, commit changes to session and memory
    if (!event.partial) {
      await sessionService.appendEvent(session, event);
      if (memoryService) {
        await memoryService.addSessionToMemory(session);
      }
    }

    // 8. Yield event for upstream processing (e.g., UI rendering)
    yield event;
  }
}
```

### Execution Logic Role (Agent, Tool, Callback)

Your code within agents, tools, and callbacks is responsible for the actual computation and decision-making. Its interaction with the loop involves:

* **Execute**: Runs its logic based on the current InvocationContext, including the session state as it was when execution resumed.
* **Yield**: When the logic needs to communicate (send a message, call a tool, report a state change), it constructs an Event containing the relevant content and actions, and then yields this event back to the Runner.
* **Pause**: Crucially, execution of the agent logic pauses immediately after the yield statement. It waits for the Runner to complete step 3 (processing and committing).
* **Resume**: Only after the Runner has processed the yielded event does the agent logic resume execution from the statement immediately following the yield.
* **See Updated State**: Upon resumption, the agent logic can now reliably access the session state (ctx.session.state) reflecting the changes that were committed by the Runner from the previously yielded event.

```typescript
// Simplified view of logic inside Agent.run_async, callbacks, or tools

// ... previous code runs based on current state ...

// 1. Determine a change or output is needed, construct the event
// Example: Updating state
const updateData = { 'field_1': 'value_2' };
const eventWithStateChange = new Event({
  author: this.name,
  actions: new EventActions({ stateDelta: updateData }),
  content: { parts: [{ text: "State updated." }] }
  // ... other event fields ...
});

// 2. Yield the event to the Runner for processing & commit
yield eventWithStateChange;
// <<<<<<<<<<<< EXECUTION PAUSES HERE >>>>>>>>>>>>

// <<<<<<<<<<<< RUNNER PROCESSES & COMMITS THE EVENT >>>>>>>>>>>>

// 3. Resume execution ONLY after Runner is done processing the above event.
// Now, the state committed by the Runner is reliably reflected.
// Subsequent code can safely assume the change from the yielded event happened.
const val = ctx.session.state['field_1'];
// here `val` is guaranteed to be "value_2" (assuming Runner committed successfully)
console.log(`Resumed execution. Value of field_1 is now: ${val}`);

// ... subsequent code continues ...
// Maybe yield another event later...
```

## Event Types and Processing

### Content Events

Events containing user messages or agent responses:

```typescript
// User message event (generated by Runner)
const userEvent = new Event({
  invocationId: "inv_123",
  author: "user",
  content: {
    parts: [{ text: "Hello, how are you?" }]
  }
});

// Agent response event (generated by Agent)
const agentEvent = new Event({
  invocationId: "inv_123",
  author: "my_agent",
  content: {
    parts: [{ text: "I'm doing well, thank you!" }]
  }
});
```

### Function Call Events

Events requesting tool execution:

```typescript
// Function call event
const functionCallEvent = new Event({
  invocationId: "inv_123",
  author: "my_agent",
  content: {
    parts: [{
      functionCall: {
        name: "search_web",
        args: { query: "latest AI news" }
      }
    }]
  }
});

// Function response event
const functionResponseEvent = new Event({
  invocationId: "inv_123",
  author: "my_agent",
  content: {
    parts: [{
      functionResponse: {
        name: "search_web",
        response: { results: [...] }
      }
    }]
  }
});
```

### State Change Events

Events that modify session state:

```typescript
import { EventActions, Event } from '@iqai/adk';

const stateChangeEvent = new Event({
  invocationId: "inv_123",
  author: "my_agent",
  actions: new EventActions({
    stateDelta: {
      "user_preference": "dark_mode",
      "session_count": 5
    }
  })
});
```

## Async Generator Pattern

### Agent Implementation

Agents implement the async generator pattern in their `runAsyncImpl` method:

```typescript
import { BaseAgent, InvocationContext, Event } from '@iqai/adk';

class CustomAgent extends BaseAgent {
  protected async *runAsyncImpl(
    ctx: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {

    // Step 1: Analyze user input
    yield new Event({
      invocationId: ctx.invocationId,
      author: this.name,
      content: { parts: [{ text: "Let me think about this..." }] }
    });

    // Step 2: Perform some computation
    const result = await this.processUserQuery(ctx.userContent);

    // Step 3: Yield final response
    yield new Event({
      invocationId: ctx.invocationId,
      author: this.name,
      content: { parts: [{ text: result }] }
    });
  }
}
```

### Runner Processing

The Runner processes each yielded event:

```typescript
// Simplified Runner event processing
for await (const event of agent.runAsync(invocationContext)) {
  // 1. Validate event
  if (!event.partial) {
    // 2. Persist to session
    await this.sessionService.appendEvent(session, event);

    // 3. Apply state changes
    if (event.actions?.stateDelta) {
      // Apply state changes through service
    }

    // 4. Handle artifacts
    if (event.actions?.artifactDelta) {
      // Process artifact changes
    }
  }

  // 5. Forward upstream
  yield event;
}
```

## Event Processing Guarantees

### Ordering Guarantees

* Events are processed in the order they are yielded
* State changes are applied atomically per event
* No race conditions between event processing

### State Consistency

* Agent execution pauses until Runner processes events
* State changes are committed before agent resumes
* Rollback support for failed operations

### Error Handling

* Exceptions in event processing are propagated to agents
* Partial state changes are rolled back on failure
* Graceful degradation for service failures

## Streaming and Partial Events

### Partial Events

For real-time user experience, agents can yield partial events:

```typescript
// Streaming response
yield new Event({
  invocationId: ctx.invocationId,
  author: this.name,
  content: { parts: [{ text: "Thinking" }] },
  partial: true  // Not persisted to session
});

yield new Event({
  invocationId: ctx.invocationId,
  author: this.name,
  content: { parts: [{ text: "Thinking..." }] },
  partial: true
});

// Final response
yield new Event({
  invocationId: ctx.invocationId,
  author: this.name,
  content: { parts: [{ text: "Here's my complete response" }] },
  partial: false  // Persisted to session
});
```

# Invocation Lifecycle
URL: /docs/framework/runtime/invocation-lifecycle

Complete lifecycle from user query to response completion

***

title: Invocation Lifecycle
description: Complete lifecycle from user query to response completion
----------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

An invocation represents everything that happens in response to a single user query, from initial receipt until the agent finishes processing.

<Mermaid
  chart="
sequenceDiagram
autonumber
participant U as User
participant R as Runner
participant S as SessionService
participant A as Agent
participant L as LLM
participant T as MyTool

U->>R: Send Query (What’s the capital of France?)
R->>S: Load Session (app, userId, sessionId)
S-->>R: Return Session
R->>S: Add User Query Event to History
S-->>R: Event Recorded OK
Note over R: Prepare InvocationContext (ctx)
R->>A: agent.run_async(ctx)
activate A

%% LLM suggests a tool; Agent decides and invokes it
Note over A: Determines need for tool
A->>L: Prepare request (potentially suggesting MyTool)
L-->>A: Respond with FunctionCall(MyTool)
Note over A: Wrap FunctionCall in Event
A-->>R: yield Event(FunctionCall)
Note over A: Execution Paused (after yield)
R->>S: Record FunctionCall Event
S-->>R: Event Recorded OK
R-->>U: Emit Event (FunctionCall)
R->>A: Signal Resume (implicit via next())
Note over A: Execution Resumed
A->>T: Execute Tool
T-->>A: Tool Result ({result: 'Paris'})
Note over A: Wrap Tool Result in Event (FunctionResponse)
A-->>R: yield Event(FunctionResponse)
Note over A: Execution Paused (after yield)
R->>S: Record FunctionResponse Event
S-->>R: Event Recorded, State Updated OK
R-->>U: Emit Event (FunctionResponse)
R->>A: Signal Resume (implicit via next())
Note over A: Execution Resumed

%% Continue with LLM using tool result, stream output
A->>L: Send tool result for final answer
L-->>A: Return final text response ('Capital of france is paris')
A-->>R: yield Event(partial text)
R-->>U: Stream partial (no persistence)
Note over A: Wrap Final Text in Event
A-->>R: yield Event(final text)
Note over A: Execution Paused (persisting final event)
R->>S: Record Final Text Event
S-->>R: Event Recorded OK
R->>A: Signal Resume (implicit via next())
Note over A: Execution Resumed
R-->>U: Final Response (The capital of France is Paris.)
deactivate A

Note over R: Invocation Completed
"
/>

### Step-by-Step Breakdown

1. User Input: The user sends a query (for example, "What's the capital of France?").
2. Runner Starts: `Runner.runAsync` begins. It loads the relevant `Session` via `SessionService`, appends the user query as the first `Event` in the history, and prepares an `InvocationContext` (`ctx`).
3. Agent Execution: The `Runner` calls `agent.runAsync(ctx)` on the designated agent (for example, a `LlmAgent`).
4. LLM Call (Example): The agent determines it needs external information and prepares a request for the LLM. Suppose the LLM decides to call `MyTool`.
5. Yield FunctionCall Event: The agent receives the `FunctionCall` from the LLM and wraps it in an `Event` (e.g., `author: agent.name`, `content.parts: [{ functionCall: { name: 'MyTool', args: { ... } } }]`), then yields it.
6. Agent Pauses: The agent's async generator pauses immediately after the `yield`.
7. Runner Processes: The `Runner` receives the `FunctionCall` event, records it in the session via `SessionService`, and emits it upstream to the user interface.
8. Agent Resumes: The `Runner` advances the generator (implicit via `next()`), and the agent resumes execution.
9. Tool Execution: The runtime executes the requested tool on behalf of the agent (implementation calls `tool.runAsync(...)`) and routes the result back into the agent's flow.
10. Tool Returns Result: `MyTool` completes and returns a result (for example, `{ result: 'Paris' }`).
11. Yield FunctionResponse Event: The agent wraps the tool result in an `Event` containing a `FunctionResponse` part (for example, `content.parts: [{ functionResponse: { name: 'MyTool', response: { ... } } }]`). If applicable, the event can also include `actions` such as `stateDelta` or `artifactDelta`.
12. Agent Pauses: The agent pauses again after yielding the `FunctionResponse`.
13. Runner Processes: The `Runner` receives the `FunctionResponse`, applies any `actions.stateDelta`/`actions.artifactDelta` through `SessionService`, persists the event, and emits it upstream.
14. Agent Resumes: The agent resumes, now with the tool result available and any state/artifact changes committed.
15. Final LLM Call (Example): The agent sends the tool result to the LLM to generate a natural language answer.
16. Yield Final Text Event: The agent wraps the final text into an `Event` (for example, `content.parts: [{ text: 'The capital of France is Paris.' }]`) and yields it.
17. Agent Pauses: The agent pauses again.
18. Runner Processes: The `Runner` persists the final text event via `SessionService` and emits it to the user. This event is typically marked as `isFinalResponse()`.
19. Agent Resumes & Finishes: The agent resumes and, having no more events to yield for this invocation, its `runAsync` generator completes.
20. Runner Completes: The `Runner` detects that the agent's generator is exhausted and finishes the loop for this invocation.

## Important Runtime Behaviors

Understanding a few key aspects of how the ADK TypeScript Runtime handles state, streaming, and asynchronous execution will help you build predictable and efficient agents.

### State Updates & Commitment Timing

* The rule: When your code (in an agent, tool, or callback) modifies session state, the change is locally visible within the current invocation immediately, but it is only guaranteed to be persisted after you yield a non-partial `Event` that includes the corresponding `stateDelta` in its `actions`. The `Runner` persists that event via `SessionService.appendEvent(...)`, which applies the `stateDelta` to the session.
* Implication: Code that runs after resuming from a `yield` can reliably assume that the state changes signaled in the yielded event have been committed.

TypeScript example (agent logic):

```ts
import { Event, EventActions } from "@iqai/adk";
import type { InvocationContext } from "@iqai/adk";

async function* runAsyncImpl(ctx: InvocationContext) {
  // 1) Stage a state change locally and construct an event that carries the delta
  ctx.session.state["status"] = "processing"; // local visibility (dirty until committed)
  const event1 = new Event({
    invocationId: ctx.invocationId,
    author: ctx.agent.name,
    actions: new EventActions({ stateDelta: { status: "processing" } }),
    content: { parts: [{ text: "Starting work..." }] },
    partial: false,
  });

  // 2) Yield event with the delta
  yield event1;
  // --- PAUSE --- Runner persists event1 and applies stateDelta

  // 3) Resume execution – state is now guaranteed committed
  const current = ctx.session.state["status"]; // "processing"
  // ... continue
}
```

TypeScript example (tool logic using ToolContext):

```ts
import type { ToolContext } from "@iqai/adk";

export async function runAsync(params: any, toolCtx: ToolContext) {
  toolCtx.state["progress"] = "started"; // local visibility during this invocation
  toolCtx.actions.stateDelta["progress"] = "started"; // ensure it’s committed with the functionResponse event
  return { ok: true };
}
```

Notes:

* Use `CallbackContext.state`/`ToolContext.state` for delta-aware state updates. The runtime will merge local changes and the provided `stateDelta` when a non-partial event is persisted.
* Persisted state updates occur only on non-partial events. Partial (streaming) events are forwarded but not committed.

### "Dirty Reads" of Session State

* Definition: While commitment happens after the yield of a non-partial event, code running later within the same invocation (before the commit) can often see local, uncommitted changes. This is a “dirty read.”
* Benefit: Lets multiple parts of your logic within a single invocation (e.g., callbacks and tools) coordinate via state without waiting for a full yield/commit cycle.
* Caveat: Don’t rely on dirty reads for critical transitions. If the invocation fails before the committing event is yielded and processed, the uncommitted change is lost. For critical updates, ensure you attach a `stateDelta` to a non-partial event that will be processed by the `Runner`.

TypeScript example (callback ➜ tool within the same invocation):

```ts
// beforeAgent callback
async function beforeAgentCallback(cbCtx: CallbackContext) {
  cbCtx.state["field_1"] = "value_1"; // staged locally
  cbCtx.eventActions.stateDelta["field_1"] = "value_1"; // will commit when the next non-partial event is persisted
}

// later, during the same invocation, inside a tool
async function runAsync(_params: any, toolCtx: ToolContext) {
  const val = toolCtx.state["field_1"]; // likely "value_1" (dirty read)
  // ... do work
  return { value: val };
}
```

### Streaming vs. Non-Streaming Output (partial)

This concerns how LLM responses are handled, especially when using streaming generation APIs.

* Streaming: The LLM generates its response in chunks. The framework yields multiple `Event` objects for one conceptual response. Most of these have `partial: true`.
* The Runner forwards partial events immediately to the UI but does not persist them or apply `actions` (e.g., `stateDelta`).
* Eventually, a final event for that response is yielded with `partial: false` (or implicitly as the turn’s completion). The Runner persists only this final event and applies any `actions.stateDelta`/`artifactDelta`.
* Non-Streaming: The LLM returns the whole response at once; the framework yields a single non-partial event, which the Runner processes fully.
* Why it matters: Ensures state changes are applied atomically and only once based on the complete response, while still allowing progressive UI updates.

Conceptual Runner loop:

```ts
for await (const event of agent.runAsync(invocationContext)) {
  if (!event.partial) {
    await sessionService.appendEvent(session, event); // applies stateDelta/artifactDelta
  }
  yield event; // always forward upstream
}
```

### Async is Primary (runAsync)

* Core design: The ADK TS Runtime is asynchronous and uses async generators to handle concurrent operations without blocking.
* Main entry point: `Runner.runAsync` returns an `AsyncGenerator<Event>` for each invocation.
* Synchronous convenience (`run`): A sync wrapper exists primarily for local testing. Internally it drives `runAsync` and buffers yielded events; prefer `runAsync` in production.
* Callbacks/tools: You can implement tools and callbacks as `async` functions. Synchronous code works but can block the Node.js event loop. For long-running or CPU-bound work, consider using Worker Threads, child processes, or external queues/services to avoid blocking.

Understanding these behaviors will help you write robust ADK TS applications and debug issues related to state consistency, streaming updates, and asynchronous execution.

# Runtime Configuration
URL: /docs/framework/runtime/run-config

Configure runtime behavior for ADK‑TS agents — streaming, speech, transcription, artifacts, and limits

***

title: Runtime Configuration
description: Configure runtime behavior for ADK‑TS agents — streaming, speech, transcription, artifacts, and limits
-------------------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Cards, Card } from 'fumadocs-ui/components/card';

The RunConfig controls runtime behavior for agents built with ADK‑TS. Use it to enable streaming, configure speech and transcription, save incoming blobs as artifacts, and set safety limits like max LLM calls.

* Default behavior: no streaming, no artifact auto‑save, and a max of 500 LLM calls
* Can be provided globally via `AgentBuilder.withRunConfig` or per invocation via `Runner.runAsync(..., { runConfig })`

## TypeScript API

```ts
import { RunConfig, StreamingMode } from '@iqai/adk';
import type {
  SpeechConfig,
  AudioTranscriptionConfig,
  RealtimeInputConfig,
  ProactivityConfig,
} from '@google/genai';

// Streaming mode options
enum StreamingMode {
  NONE = 'NONE',
  SSE = 'sse',
  BIDI = 'bidi',
}

class RunConfig {
  speechConfig?: SpeechConfig;
  responseModalities?: string[];        // e.g. ['AUDIO', 'TEXT']
  saveInputBlobsAsArtifacts: boolean;   // default: false
  supportCFC: boolean;                  // default: false (experimental; SSE only)
  streamingMode: StreamingMode;         // default: NONE
  outputAudioTranscription?: AudioTranscriptionConfig;
  inputAudioTranscription?: AudioTranscriptionConfig;
  realtimeInputConfig?: RealtimeInputConfig;
  enableAffectiveDialog?: boolean;
  proactivity?: ProactivityConfig;
  maxLlmCalls: number;                  // default: 500 (warn if <= 0)
}
```

Notes

* StreamingMode values are an enum; use the enum, not raw strings
* responseModalities defaults to AUDIO behavior if unset
* maxLlmCalls must be less than Number.MAX\_SAFE\_INTEGER; values less than or equal to 0 allow unbounded calls and log a warning

## Parameters

| Parameter                 | Type                                  | Default                     | Description                                                                                                   |
| ------------------------- | ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| speechConfig              | `SpeechConfig` (from `@google/genai`) | —                           | Configure speech generation (voice/language) for live agents.                                                 |
| responseModalities        | `string[]`                            | — (AUDIO behavior if unset) | Desired output channels, e.g., `['AUDIO', 'TEXT']`.                                                           |
| saveInputBlobsAsArtifacts | `boolean`                             | `false`                     | When `true`, user `inlineData` parts are saved as artifacts automatically. Requires `Runner.artifactService`. |
| streamingMode             | `StreamingMode`                       | `StreamingMode.NONE`        | Controls streaming: `NONE` \| `SSE` \| `BIDI`.                                                                |
| outputAudioTranscription  | `AudioTranscriptionConfig`            | —                           | Transcribe model‑generated audio.                                                                             |
| inputAudioTranscription   | `AudioTranscriptionConfig`            | —                           | Transcribe user audio input.                                                                                  |
| realtimeInputConfig       | `RealtimeInputConfig`                 | —                           | Configure realtime audio/video input handling.                                                                |
| enableAffectiveDialog     | `boolean`                             | —                           | Enable emotion‑aware responses in live modes.                                                                 |
| proactivity               | `ProactivityConfig`                   | —                           | Allow proactive responses and ignoring irrelevant input.                                                      |
| maxLlmCalls               | `number`                              | `500`                       | Limit total LLM calls per run. Values of 0 or negative mean no enforcement (a warning is logged).             |
| supportCFC                | `boolean`                             | `false`                     | Experimental Compositional Function Calling; only applicable with `StreamingMode.SSE`.                        |

<Callout type="warning" title="Experimental: supportCFC">
  The supportCFC flag is experimental and currently takes effect only with streamingMode = StreamingMode.SSE. Behavior may change.
</Callout>

## Speech settings quick reference

SpeechConfig (from @google/genai) typically includes:

```ts
type SpeechConfig = {
  voiceConfig?: {
    prebuiltVoiceConfig?: { voiceName?: string }
  };
  languageCode?: string; // e.g. 'en-US'
};
```

Configure these via `RunConfig.speechConfig` to control how your agent sounds when speaking.

## Validation rules

* maxLlmCalls \< Number.MAX\_SAFE\_INTEGER (throws otherwise)
* When maxLlmCalls is 0 or negative, no limit is enforced and a warning is logged

## Usage examples

### Basic (no streaming)

```ts
import { RunConfig, StreamingMode } from '@iqai/adk';

const runConfig = new RunConfig({
  streamingMode: StreamingMode.NONE,
  maxLlmCalls: 100,
});
```

### Enable SSE streaming

```ts
import { RunConfig, StreamingMode } from '@iqai/adk';

const runConfig = new RunConfig({
  streamingMode: StreamingMode.SSE,
  maxLlmCalls: 200,
});
```

### Enable speech and transcription

```ts
import { RunConfig, StreamingMode } from '@iqai/adk';
import type { SpeechConfig } from '@google/genai';

const runConfig = new RunConfig({
  streamingMode: StreamingMode.SSE,
  responseModalities: ['AUDIO', 'TEXT'],
  saveInputBlobsAsArtifacts: true,
  speechConfig: {
    languageCode: 'en-US',
    voiceConfig: {
      prebuiltVoiceConfig: { voiceName: 'Kore' },
    },
  } satisfies SpeechConfig,
  outputAudioTranscription: { enable: true },
  inputAudioTranscription: { enable: true },
  maxLlmCalls: 1000,
});
```

### Experimental CFC (SSE only)

```ts
import { RunConfig, StreamingMode } from '@iqai/adk';

const runConfig = new RunConfig({
  streamingMode: StreamingMode.SSE,
  supportCFC: true,
  maxLlmCalls: 150,
});
```

## Applying RunConfig

You can pass RunConfig via the Runner or set it once via AgentBuilder.

### Per run with Runner

```ts
const runner = /* create Runner */;
const runConfig = new RunConfig({ saveInputBlobsAsArtifacts: true });

for await (const event of runner.runAsync({
  userId: 'user_123',
  sessionId: 'session_abc',
  newMessage: { parts: [{ text: 'Hello!' }] },
  runConfig,
})) {
  // stream events
}
```

### Globally with AgentBuilder

```ts
import { AgentBuilder } from '@iqai/adk';

const { runner, session } = await AgentBuilder
  .create('voice-assistant')
  .withModel('gemini-2.5-flash')
  .withRunConfig({
    streamingMode: StreamingMode.SSE,
    responseModalities: ['AUDIO', 'TEXT'],
    saveInputBlobsAsArtifacts: true,
  })
  .build();
```

## See also

<Cards>
  <Card title="🧰 Runner Configuration" description="Configure artifact behavior at run‑time, including auto‑saving user input blobs" href="/docs/framework/artifacts/runner-configuration" />

  <Card title="🔄 Event Loop" description="Understanding the cooperative async generator pattern and event flow" href="/docs/framework/runtime/event-loop" />

  <Card title="📋 Invocation Lifecycle" description="Complete lifecycle from user query to response completion" href="/docs/framework/runtime/invocation-lifecycle" />
</Cards>

# Session Rewind
URL: /docs/framework/runtime/rewind

Travel back in time by restoring sessions to a previous state before a specific invocation

***

title: Session Rewind
description: Travel back in time by restoring sessions to a previous state before a specific invocation
-------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Session rewind allows you to "undo" a conversation by restoring the session to its state before a specific invocation. This is useful for debugging, A/B testing different agent responses, recovering from errors, or implementing user-facing "undo" functionality.

## What Gets Rewound?

When you rewind a session, the framework restores:

* **Session State**: All state keys (including `user:`, `app:`, and unprefixed scopes) are restored to their values before the target invocation
* **Artifacts**: All artifacts are reverted to their versions before the target invocation
* **Event History**: Events from the target invocation onwards are marked with a rewind marker, so they're excluded from future LLM context

<Callout type="info" title="History is preserved">
  Events are never actually deleted—they're kept in the history but filtered out when building LLM context. This maintains audit trails while effectively "undoing" the conversation.
</Callout>

## Basic Usage

The `Runner` class provides the `rewind` method:

```typescript
import { Runner } from '@iqai/adk';

const runner = new Runner({
  agent,
  sessionService,
  artifactService
});

await runner.rewind({
  userId: 'user-123',
  sessionId: 'session-456',
  rewindBeforeInvocationId: 'invocation-789'
});
```

This restores the session to the state it had **before** `invocation-789` started. All invocations from that point onwards are effectively undone.

## How It Works

The rewind process involves three steps:

### 1. State Delta Computation

The runner scans the event history to compute what state changes happened during and after the target invocation:

```typescript
const stateDelta = await runner._computeStateDeltaForRewind(
  session,
  rewindBeforeInvocationId
);
```

This produces a delta containing:

* Keys that were modified (with their "before" values)
* Keys that were created (marked as `null` to delete them)

### 2. Artifact Version Restoration

Similarly, the runner determines which artifact versions to restore:

```typescript
const artifactDelta = await runner._computeArtifactDeltaForRewind(
  session,
  rewindBeforeInvocationId
);
```

This finds the most recent version of each modified artifact that existed before the target invocation.

### 3. Persistence

Finally, the runner:

1. Creates a rewind event marking the cutoff point
2. Applies the state delta (reverting or deleting keys)
3. Applies the artifact delta (restoring previous versions)

```typescript
const rewindEvent = new Event({
  invocationId: newInvocationId,
  author: 'system',
  content: { parts: [{ text: 'Session rewound' }] },
  actions: new EventActions({
    rewindBeforeInvocationId,
    stateDelta,
    artifactDelta
  })
});

await sessionService.appendEvent(session, rewindEvent);
```

## Example: Implementing Undo

Here's how you might add an "undo" feature to a chat interface:

```typescript
import { Runner, InMemorySessionService, InMemoryArtifactService } from '@iqai/adk';

class ChatApp {
  private runner: Runner;
  private lastInvocationId?: string;

  constructor(agent) {
    this.runner = new Runner({
      agent,
      sessionService: new InMemorySessionService(),
      artifactService: new InMemoryArtifactService()
    });
  }

  async sendMessage(userId: string, sessionId: string, message: string) {
    const config = {
      userId,
      sessionId,
      appName: 'chat-app',
      userMessage: message
    };

    const events = [];
    for await (const event of this.runner.runAsync(config)) {
      events.push(event);
      if (event.invocationId) {
        this.lastInvocationId = event.invocationId;
      }
    }

    return events;
  }

  async undo(userId: string, sessionId: string) {
    if (!this.lastInvocationId) {
      throw new Error('No invocation to undo');
    }

    await this.runner.rewind({
      userId,
      sessionId,
      rewindBeforeInvocationId: this.lastInvocationId
    });

    this.lastInvocationId = undefined;
    console.log('Last message undone');
  }
}

const app = new ChatApp(myAgent);

await app.sendMessage('user-1', 'session-1', 'What is 2+2?');

await app.sendMessage('user-1', 'session-1', 'Actually, tell me about quantum physics');

await app.undo('user-1', 'session-1');
```

## Example: Error Recovery

Automatically rewind when an agent encounters an error:

```typescript
async function runWithErrorRecovery(runner, config) {
  let lastSuccessfulInvocation;

  try {
    for await (const event of runner.runAsync(config)) {
      yield event;

      if (!event.partial && event.invocationId) {
        lastSuccessfulInvocation = event.invocationId;
      }
    }
  } catch (error) {
    console.error('Agent failed:', error);

    if (lastSuccessfulInvocation) {
      console.log('Rewinding to last successful state...');
      await runner.rewind({
        userId: config.userId,
        sessionId: config.sessionId,
        rewindBeforeInvocationId: lastSuccessfulInvocation
      });
    }

    throw error;
  }
}
```

## Implementation Details

### Event Filtering

After a rewind, events from the target invocation onwards are automatically excluded from LLM context. The framework handles this in `llm-flows/contents.ts`:

```typescript
export function getContentsForLlmRequest(session: Session): Content[] {
  const rewindMarker = findLastRewindMarker(session.events);

  return session.events
    .filter(e => shouldIncludeInLlmContext(e, rewindMarker))
    .map(e => e.content);
}
```

### State Key Deletion

When rewinding creates a `stateDelta` with `null` values, the session service interprets these as deletions:

```typescript
if (value === null || value === undefined) {
  delete session.state[key];
} else {
  session.state[key] = value;
}
```

### Artifact References

Artifacts support references to other artifacts using special URIs:

```typescript
import { getArtifactUri, parseArtifactUri } from '@iqai/adk';

const uri = getArtifactUri('session', 'session-id', 'report.pdf', 2);

const { scope, scopeId, filename, version } = parseArtifactUri(uri);
```

When loading artifacts, the service recursively resolves references and returns the actual data.

## Testing Rewind

The framework includes comprehensive tests in `packages/adk/src/tests/runners-rewind.test.ts`:

```bash
cd packages/adk
pnpm test runners-rewind
```

Tests cover:

* State restoration across scopes (`user:`, `app:`, unprefixed)
* Artifact version rollback
* Event history filtering
* Multiple sequential rewinds

## Limitations and Considerations

<Callout type="warn" title="External side effects">
  Rewind only affects session state and artifacts managed by ADK. External side effects (API calls, database writes, sent emails) cannot be automatically undone.
</Callout>

* **No external rollback**: If your tool made external API calls or wrote to external databases, those changes persist
* **Memory persistence**: Rewind doesn't affect memory services (if you're using vector stores or RAG systems, those entries remain)
* **Invocation ID must exist**: The `rewindBeforeInvocationId` must reference a real invocation in the session history
* **Performance**: For sessions with many events/artifacts, computing deltas can be expensive

## When to Use Rewind

Good use cases:

* **Debugging**: Try different responses without starting over
* **User control**: Let users undo mistakes or unwanted agent actions
* **A/B testing**: Compare agent behavior by rewinding and trying alternatives
* **Error recovery**: Automatically revert to a known good state after failures

Not recommended for:

* **Real-time streaming undo**: Rewind is designed for completed invocations
* **Fine-grained version control**: Use git or dedicated versioning systems for code artifacts
* **Audit compliance**: While events are preserved, rewind complicates audit trails

## Related Topics

<Cards>
  <Card title="📊 Session Management" description="Understanding sessions and their lifecycle" href="/docs/framework/sessions/session" />

  <Card title="🗂️ State Management" description="Working with session state and scopes" href="/docs/framework/sessions/state" />

  <Card title="📦 Artifacts" description="Managing files and binary data" href="/docs/framework/artifacts" />

  <Card title="🔄 Invocation Lifecycle" description="How invocations work end-to-end" href="/docs/framework/runtime/invocation-lifecycle" />
</Cards>

# Session Management
URL: /docs/framework/sessions/session

Track and manage a single conversation thread with a simple, consistent lifecycle

***

title: Session Management
description: Track and manage a single conversation thread with a simple, consistent lifecycle
----------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Sessions represent one conversation thread. They keep the message history and scoped state needed to maintain context across turns—much like a chat thread in a messaging app.

## The Session Object

When a user starts interacting with your agent, the `SessionService` creates a `Session` object (`google.adk.sessions.Session`). This object acts as the container holding everything related to that *one specific chat thread*. Here are its key properties:

* **Identification (`id`, `appName`, `userId`):** Unique labels for the conversation.
  * `id`: A unique identifier for *this specific* conversation thread, essential for retrieving it later. A SessionService object can handle multiple `Session`(s). This field identifies which particular session object are we referring to. For example, "test\_id\_modification".
  * `app_name`: Identifies which agent application this conversation belongs to. For example, "id\_modifier\_workflow".
  * `userId`: Links the conversation to a particular user.
* **History (`events`):** A chronological sequence of all interactions (`Event` objects – user messages, agent responses, tool actions) that have occurred within this specific thread.
* **Session State (`state`):** A place to store temporary data relevant *only* to this specific, ongoing conversation. This acts as a scratchpad for the agent during the interaction. We will cover how to use and manage `state` in detail in the next section.
* **Activity Tracking (`lastUpdateTime`):** A timestamp indicating the last time an event occurred in this conversation thread.

## Managing Sessions with a `SessionService`

As seen above, you don't typically create or manage `Session` objects directly. Instead, you use a **`SessionService`**. This service acts as the central manager responsible for the entire lifecycle of your conversation sessions.

Its core responsibilities include:

* **Starting New Conversations:** Creating fresh `Session` objects when a user begins an interaction.
* **Resuming Existing Conversations:** Retrieving a specific `Session` (using its ID) so the agent can continue where it left off.
* **Saving Progress:** Appending new interactions (`Event` objects) to a session's history. This is also the mechanism through which session `state` gets updated (more in the `State` section).
* **Listing Conversations:** Finding the active session threads for a particular user and application.
* **Cleaning Up:** Deleting `Session` objects and their associated data when conversations are finished or no longer needed.

## Implementation Options

### In-memory (development)

Fast and simple for development/testing.

```typescript
import { InMemorySessionService } from '@iqai/adk';

const sessionService = new InMemorySessionService();

// Create session
const session = await sessionService.createSession(
  'my-app',
  'user123',
  {
    current_step: 'welcome',
    'user:theme': 'dark'
  }
);
```

Use when you don't need persistence between restarts.

### Database (production-ready persistence)

Persistent storage using PostgreSQL, MySQL, or SQLite. Choose a specific factory or use the generic auto-detect helper.

#### PostgreSQL

```typescript
import { createPostgresSessionService, createDatabaseSessionService } from '@iqai/adk';

// Direct (requires peer dep: pg)
const sessionService = createPostgresSessionService(
  'postgres://user:pass@host:5432/db'
);

// Or auto-detect
const sessionService = createDatabaseSessionService('postgres://user:pass@host:5432/db');
```

#### MySQL

```typescript
import { createMysqlSessionService, createDatabaseSessionService } from '@iqai/adk';

// Direct (requires peer dep: mysql2)
const sessionService = createMysqlSessionService(
  'mysql://user:pass@host:3306/db'
);

// Or auto-detect
const sessionService = createDatabaseSessionService('mysql://user:pass@host:3306/db');
```

#### SQLite

```typescript
import { createSqliteSessionService, createDatabaseSessionService } from '@iqai/adk';

// Direct (requires peer dep: better-sqlite3)
const sessionService = createSqliteSessionService('sessions.db');

// Or auto-detect (both forms are supported)
const sessionService = createDatabaseSessionService('sqlite://sessions.db');
const sessionService2 = createDatabaseSessionService('sessions.db');
```

Once you have a `sessionService`, use it the same way regardless of the database:

```typescript
// Create a session
const session = await sessionService.createSession(
  'my-app',
  'user123',
  {
    current_step: 'welcome',
    'user:preferred_language': 'es',
    'app:version': '2.0'
  }
);
```

Notes:

* Tables are created automatically by default
* Prefixes are handled for you: `app:` → app\_states, `user:` → user\_states, unprefixed → sessions

<Callout type="info" title="Database peer dependencies">
  Install one of: `better-sqlite3` (SQLite), `pg` (PostgreSQL), or `mysql2` (MySQL), depending on your database.
</Callout>

### Cloud (Vertex AI Agent Engine)

Scalable, managed storage on Google Cloud.

```typescript
import { VertexAiSessionService } from '@iqai/adk';

const sessionService = new VertexAiSessionService({
  project: 'your-gcp-project',
  location: 'us-central1',
  agentEngineId: 'your-agent-engine-id' // Optional: can use appName as reasoning engine ID
});

// Create session (sessionId is auto-generated)
const session = await sessionService.createSession(
  'projects/your-project/locations/us-central1/reasoningEngines/12345',
  'user123',
  {
    current_step: 'welcome',
    'user:language': 'en'
  }
);
```

Use when you want fully managed persistence and scale.

<Callout type="warn" title="Choosing an implementation">
  Pick in-memory for local dev, database for most production apps, and cloud for managed, enterprise scale.
</Callout>

## Session Lifecycle

Here’s a simplified flow of how `Session` and `SessionService` work together during a conversation turn:

1. **Start or Resume:** Your application needs to use the `SessionService` to either `createSession` (for a new chat) or use an existing session id.
2. **Context Provided:** The `Runner` gets the appropriate `Session` object from the appropriate service method, providing the agent with access to the corresponding Session's `state` and `events`.
3. **Agent Processing:** The user prompts the agent with a query. The agent analyzes the query and potentially the session `state` and `events` history to determine the response.
4. **Response & State Update:** The agent generates a response (and potentially flags data to be updated in the `state`). The `Runner` packages this as an `Event`.
5. **Save Interaction:** The `Runner` calls `sessionService.appendEvent(session, event)` with the `session` and the new `event` as the arguments. The service adds the `Event` to the history and updates the session's `state` in storage based on information within the event. The session's `lastUpdateTime` also get updated.
6. **Ready for Next:** The agent's response goes to the user. The updated `Session` is now stored by the `SessionService`, ready for the next turn (which restarts the cycle at step 1, usually with the continuation of the conversation in the current session).
7. **End Conversation:** When the conversation is over, your application calls `sessionService.deleteSession(...)` to clean up the stored session data if it is no longer required.

This cycle highlights how the `SessionService` ensures conversational continuity by managing the history and state associated with each `Session` object.

## Related Topics

<Cards>
  <Card title="🗂️ State Management" description="Working with session state and data persistence" href="/docs/framework/sessions/state" />

  <Card title="🧠 Memory Systems" description="Long-term memory and knowledge management" href="/docs/framework/sessions/memory" />

  <Card title="🤖 Agents" description="How agents use sessions for context management" href="/docs/framework/agents" />

  <Card title="📊 Evaluation" description="Evaluate agent performance across sessions" href="/docs/framework/evaluation" />
</Cards>

# State Management
URL: /docs/framework/sessions/state

A compact guide to session.state and scoped persistence

***

title: State Management
description: A compact guide to session.state and scoped persistence
--------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Within each `Session` (our conversation thread), the **`state`** attribute acts like the agent's dedicated scratchpad for that specific interaction. While `session.events` holds the full history, `session.state` is where the agent stores and updates dynamic details needed *during* the conversation.

## What is `session.state`?

Conceptually, `session.state` is a collection (dictionary or Map) holding key-value pairs. It's designed for information the agent needs to recall or track to make the current conversation effective:

* **Personalize Interaction:** Remember user preferences mentioned earlier (e.g., `'user_preference_theme': 'dark'`).
* **Track Task Progress:** Keep tabs on steps in a multi-turn process (e.g., `'booking_step': 'confirm_payment'`).
* **Accumulate Information:** Build lists or summaries (e.g., `'shopping_cart_items': ['book', 'pen']`).
* **Make Informed Decisions:** Store flags or values influencing the next response (e.g., `'user_is_authenticated': true`).

## Key Characteristics of State

* Structure: string keys → JSON-serializable values (no functions, sockets, class instances)
* Mutability: changes throughout the turn
* Persistence: depends on the SessionService (in-memory vs database vs cloud)

<Callout type="warn" title="Serialization Only">
  Store only JSON-serializable data. Save large blobs/files as artifacts and reference by name in state.
</Callout>

## Organizing State with Prefixes: Scope Matters

* No prefix: session-only (e.g., `current_step`)
* `user:` user-wide across sessions (e.g., `user:theme`)
* `app:` app-wide across users (e.g., `app:feature_flags`)
* `temp:` transient for the current invocation (not persisted)

## Accessing Session State in Agent Instructions

Use `{key}` placeholders inside `LlmAgent.instruction` (auto-injected). Add `?` to make a key optional.

```typescript
const agent = new LlmAgent({
  name: 'Guide',
  model: 'gemini-2.0-flash',
  instruction: 'Welcome back! Theme: {user:theme?}. Step: {current_step}.'
});
```

### Using `{key}` Templating

* `{key}` requires a value and throws if missing
* `{key?}` is optional and injects empty string if missing
* Supports `artifact.filename` via `injectSessionState` helper in InstructionProvider

### Important Considerations

* Keys must exist (or use `?`)
* Non-string values are converted to string
* To bypass auto-injection, pass a function to `instruction` and inject manually:

```typescript
import { injectSessionState } from '@iqai/adk';
async function provider(ctx: ReadonlyContext) {
  return injectSessionState('Hello {user:name?}', ctx);
}
```

## How State is Updated: Recommended Methods

* Agent outputKey: save final response directly to `session.state`

```typescript
const agent = new LlmAgent({ name: 'Greeter', model: 'gemini-2.0-flash', outputKey: 'last_greeting' });
```

* Event actions: use `EventActions.stateDelta` for explicit bulk updates

```typescript
const event = new Event({ actions: new EventActions({ stateDelta: { 'user:login_count': 1 } }) });
await sessionService.appendEvent(session, event);
```

* Callback/Tool contexts: mutate `context.state` (delta-aware helpers)

```typescript
// Callback
beforeModelCallback: ({ callbackContext }) => {
  const n = callbackContext.state.get('user:count', 0);
  callbackContext.state.set('user:count', n + 1);
  callbackContext.state['temp:flag'] = true; // bracket access works too
  return null;
}

// Tool
const addItem = createTool({
  name: 'add_item',
  schema: z.object({ item: z.string(), qty: z.number().default(1) }),
  fn: ({ item, qty }, context) => {
    const list = context.state.get('items', []);
    list.push({ item, qty });
    context.state.set('items', list);
    return { ok: true };
  }
});
```

## ⚠️ A Warning About Direct State Modification

Avoid mutating `session.state` on a retrieved Session outside of events/callbacks/tools. It bypasses event history, may not persist, and is not thread-safe. Prefer:

* `outputKey` for agent responses
* `EventActions.stateDelta` with `appendEvent`
* `callbackContext.state` or `toolContext.state`

## Best Practices for State Design Recap

* Use clear prefixes (`user:`, `app:`, `temp:`) and descriptive keys
* Keep values small and serializable; use artifacts for large blobs
* Batch updates via `stateDelta` where possible
* Read state directly; write via events, callbacks, or tools for persistence

# Memory
URL: /docs/framework/sessions/memory

Long-term knowledge your agents can search across conversations

***

title: Memory
description: Long-term knowledge your agents can search across conversations
----------------------------------------------------------------------------

Memory lets agents recall information from past conversations and external knowledge. Sessions track short‑term context; Memory is the long‑term, searchable store.

## The MemoryService Role

All implementations expose a simple contract:

```typescript
interface BaseMemoryService {
  addSessionToMemory(session: Session): Promise<void>;
  searchMemory(params: { appName: string; userId: string; query: string }): Promise<{ memories: MemoryEntry[] }>;
}

interface MemoryEntry {
  content: Content;      // Content from events with parts (text, data, etc.)
  author?: string;       // Event author (user, assistant, system)
  timestamp?: string;    // ISO 8601 formatted timestamp
}
```

## Choosing the Right Memory Service

* InMemoryMemoryService — No setup, keyword search. Best for prototyping.
* VertexAiRagMemoryService — Cloud-scale semantic search (Vertex AI RAG).

## In-Memory Memory

Fast to start, no persistence, keyword search:

```typescript
import { InMemoryMemoryService } from '@iqai/adk';

const memoryService = new InMemoryMemoryService();

await memoryService.addSessionToMemory(completedSession);

const results = await memoryService.searchMemory({
  appName: 'travel-app',
  userId: 'user123',
  query: 'hotel preferences paris',
});

console.log(results.memories.length);
```

## Vertex AI Memory Bank

Semantic search via Vertex AI RAG:

```typescript
import { VertexAiRagMemoryService } from '@iqai/adk';

const memoryService = new VertexAiRagMemoryService(
  'projects/your-project/locations/us-central1/ragCorpora/your-corpus-id',
  10,   // similarity_top_k
  0.5   // vector_distance_threshold
);

await memoryService.addSessionToMemory(completedSession);

const results = await memoryService.searchMemory({
  appName: 'travel-app',
  userId: 'user123',
  query: 'luxury accommodations in romantic European cities',
});

// Results are ranked by semantic similarity
results.memories.forEach((memory, index) => {
  console.log(`Result ${index + 1}:`, memory.content.parts[0]?.text);
  console.log(`  Author: ${memory.author}, Time: ${memory.timestamp}`);
});
```

## How It Works

* Configure a memoryService via AgentBuilder.withMemory() or on Runner.
* Runner automatically calls addSessionToMemory(session) after non‑partial events.
* Agents/tools query memory via ToolContext.searchMemory() or memoryService.searchMemory().

## Prerequisites

* InMemoryMemoryService: none.
* VertexAiRagMemoryService: a Google Cloud project with Vertex AI enabled and an existing RAG Corpus ID. Authenticate your environment (e.g., ADC) before running.

## Configuration

Attach a memory service at runtime:

```typescript
import { AgentBuilder, Runner, InMemoryMemoryService } from '@iqai/adk';

// Via AgentBuilder
const { runner } = await AgentBuilder
  .create('memory-agent')
  .withModel('your-model-id')
  .withMemory(new InMemoryMemoryService())
  .build();

// Or via Runner directly
const runner2 = new Runner({
  appName: 'my-app',
  agent: myAgent,
  sessionService: mySessionService,
  memoryService: new InMemoryMemoryService(),
});
```

## Using Memory in Your Agent

Built-in tool:

```typescript
import { LoadMemoryTool } from '@iqai/adk';
const memoryTool = new LoadMemoryTool();
// The tool uses ToolContext.searchMemory() under the hood.
```

Custom tool (minimal):

```typescript
import { BaseTool, type FunctionDeclaration, type ToolContext } from '@iqai/adk';

class CustomMemoryTool extends BaseTool {
  constructor() {
    super({ name: 'custom_memory_search', description: 'Search long‑term memory.' });
  }
  getDeclaration(): FunctionDeclaration {
    return {
      name: this.name,
      description: this.description,
      parameters: {
        type: 'OBJECT' as const,
        properties: { query: { type: 'STRING' as const, description: 'Search query' } },
        required: ['query'],
      },
    };
  }
  async runAsync(args: { query: string }, context: ToolContext) {
    const results = await context.searchMemory(args.query);
    return { memories: results.memories };
  }
}
```

## Advanced Concepts

### How Memory Works in Practice

1. Events are appended to the Session during a turn.
2. Runner ingests the session into memory (if configured).
3. Later turns search memory and use results for better answers.

### Can an agent access more than one memory service?

* Framework config supports one memoryService at a time.
* In code, you can instantiate additional services and query both:

```typescript
import { InMemoryMemoryService, VertexAiRagMemoryService } from '@iqai/adk';

const convMemory = new InMemoryMemoryService();
const docMemory = new VertexAiRagMemoryService('projects/x/locations/y/ragCorpora/z');

const conv = await convMemory.searchMemory({ appName, userId, query });
const docs = await docMemory.searchMemory({ appName, userId, query });
```

# Agent Evaluation
URL: /docs/framework/evaluation

Comprehensive framework for testing and validating agent performance across scenarios

***

title: Agent Evaluation
description: Comprehensive framework for testing and validating agent performance across scenarios
--------------------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Agent evaluation provides systematic approaches to testing and validating agent performance, moving beyond prototype to production-ready AI systems.

<Callout type="info" title="Status">
  Evaluation is available in `@iqai/adk` (public but still evolving). Surface may receive additive changes; core evaluator signatures are stable.
</Callout>

## Overview

Unlike traditional software testing, agent evaluation must account for the probabilistic nature of LLM responses and the complexity of multi-step reasoning processes. Effective evaluation encompasses multiple dimensions from tool usage patterns to response quality.

## Key Features

The ADK evaluation framework provides comprehensive agent testing capabilities:

* **Agent Evaluator**: Automated evaluation of agent performance across test cases
* **Multiple Metrics**: ROUGE scoring, LLM-as-judge, tool trajectory analysis, safety evaluation
* **Flexible Test Format**: JSON-based test cases with support for multi-turn conversations
* **Local & Cloud Evaluation**: Run evaluations locally or integrate with Vertex AI
* **Session State Support**: Test stateful agents with conversation history
* **Configurable Thresholds**: Set pass/fail criteria for different evaluation metrics

## Documentation Structure

<Cards>
  <Card title="📋 Evaluation Concepts" description="Core principles and challenges in agent evaluation" href="/docs/framework/evaluation/evaluation-concepts" />

  <Card title="🧪 Testing Agents" description="Current approaches and future automated testing methods" href="/docs/framework/evaluation/testing-agents" />

  <Card title="📊 Metrics and Scoring" description="Measurement approaches for trajectory and response quality" href="/docs/framework/evaluation/metrics-and-scoring" />

  <Card title="🎯 Evaluation Patterns" description="Domain-specific evaluation strategies and best practices" href="/docs/framework/evaluation/evaluation-patterns" />
</Cards>

## Core Components

The evaluation framework includes these key components:

* **AgentEvaluator**: Main entry point for agent performance assessment
* **TrajectoryEvaluator**: Analyzes tool usage patterns and decision paths
* **ResponseEvaluator**: ROUGE-1 scoring and LLM-based response quality assessment
* **SafetyEvaluator**: Evaluates response harmlessness and safety
* **EvalSet Management**: Organized test cases with metadata and version control
* **MetricEvaluatorRegistry**: Extensible system for custom evaluation metrics
* **LocalEvalService**: Complete local evaluation pipeline with parallel execution

## Getting Started

Workflow:

1. **Author Dataset**: Provide either:
   * Legacy array format: `[{ "query": "...", "reference": "..." }]` (auto-migrated at runtime – deprecated warning emitted), or
   * New EvalSet schema (preferred):

```json
{
  "evalSetId": "calc-v1",
  "name": "Simple arithmetic",
  "creationTimestamp": 0,
  "evalCases": [
    {
      "evalId": "case-1",
      "conversation": [
        {
          "creationTimestamp": 0,
          "userContent": { "role": "user", "parts": [{ "text": "What is 2 + 2?" }] },
          "finalResponse": { "role": "model", "parts": [{ "text": "4" }] }
        }
      ]
    }
  ]
}
```

2. **Configure Criteria** in `test_config.json` (sibling to each `*.test.json`):

```json
{ "criteria": { "response_match_score": 0.8 } }
```

3. **Run Evaluation** – signature: `await AgentEvaluator.evaluate(agent, pathOrFile, numRuns?)`.
   * Throws an Error if any metric fails threshold (no return value).
4. **Iterate** – tighten thresholds / expand cases as agent improves.

Minimal usage example:

```typescript
import { AgentBuilder, AgentEvaluator } from '@iqai/adk';

const { agent } = await AgentBuilder.create('eval_agent')
  .withModel('gemini-2.5-flash')
  .withInstruction('Answer briefly and accurately.')
  .build();

await AgentEvaluator.evaluate(agent, './evaluation/tests');
// If it does not throw, all criteria passed.
```

Programmatic (advanced) usage using an already loaded EvalSet:

```typescript
// If you parsed an EvalSet JSON yourself
// import type { Evaluation } from '@iqai/adk';
// await AgentEvaluator.evaluateEvalSet(agent, evalSet, { response_match_score: 0.8 });
```

Default criteria if `test_config.json` absent:

```json
{ "tool_trajectory_avg_score": 1.0, "response_match_score": 0.8 }
```

Each metric key must be one of: `tool_trajectory_avg_score`, `response_evaluation_score`, `response_match_score`, `safety_v1`.

## Related Topics

<Cards>
  <Card title="🤖 Agents" description="Learn about different agent types and their capabilities" href="/docs/framework/agents" />

  <Card title="🔧 Tools" description="Understand tool integration and usage patterns" href="/docs/framework/tools" />

  <Card title="💬 Sessions" description="Session management for conversation tracking" href="/docs/framework/sessions/session" />

  <Card title="📋 Callbacks" description="Event handling and agent lifecycle management" href="/docs/framework/callbacks" />
</Cards>

# Evaluation Concepts
URL: /docs/framework/evaluation/evaluation-concepts

Core principles and challenges in agent evaluation

***

title: Evaluation Concepts
description: Core principles and challenges in agent evaluation
---------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Agent evaluation differs fundamentally from traditional software testing due to the probabilistic and conversational nature of LLM-based systems.

## Why Evaluate Agents?

Traditional software testing relies on deterministic "pass/fail" assertions, but LLM agents introduce variability that requires different evaluation approaches.

### Challenges with Agent Testing

* **Probabilistic Responses**: LLMs generate different outputs for the same input
* **Multi-Step Reasoning**: Agents follow complex trajectories to reach solutions
* **Tool Interactions**: Evaluation must consider tool usage patterns and effectiveness
* **Context Sensitivity**: Performance varies based on conversation context and history
* **Emergent Behavior**: Complex interactions between components can produce unexpected results

### Benefits of Systematic Evaluation

* **Quality Assurance**: Ensure consistent performance across different scenarios
* **Regression Testing**: Detect performance degradation during development
* **Performance Optimization**: Identify areas for improvement in agent behavior
* **Production Readiness**: Validate agents before deployment to real users
* **Trust Building**: Demonstrate reliability to stakeholders and users

<Callout type="info" title="Investment in Evaluation">
  Setting up evaluation may seem like extra work, but automating evaluations pays off quickly and is essential for progressing beyond prototype stage.
</Callout>

## Evaluation Dimensions

Agent evaluation encompasses multiple aspects of performance, requiring comprehensive assessment beyond simple output quality.

### Trajectory Evaluation

Analyzing the sequence of steps agents take to reach solutions:

**Key Aspects:**

* **Tool Selection**: Choice of appropriate tools for each task
* **Step Ordering**: Logical sequence of actions and decisions
* **Efficiency**: Minimizing unnecessary steps and redundant actions
* **Strategy**: Overall approach to problem-solving
* **Error Recovery**: How agents handle and recover from mistakes

**Common Patterns:**

* **Exact Match**: Perfect alignment with expected trajectory
* **In-Order Match**: Correct actions in proper sequence, allowing extra steps
* **Any-Order Match**: Required actions completed regardless of order
* **Precision/Recall**: Statistical measures of trajectory accuracy

### Response Quality Evaluation

Assessing the final outputs provided to users:

**Quality Dimensions:**

* **Accuracy**: Correctness of information and answers
* **Relevance**: Appropriateness to user queries and context
* **Completeness**: Coverage of all necessary information
* **Clarity**: Clear communication and appropriate tone
* **Consistency**: Reliable behavior across similar scenarios

**Evaluation Methods:**

* **Reference Comparison**: Compare against expected responses
* **Semantic Similarity**: Measure meaning similarity using metrics like ROUGE
* **Human Assessment**: Manual evaluation for nuanced quality factors
* **Automated Scoring**: Rule-based evaluation for specific criteria

### Behavioral Consistency

Ensuring agents behave predictably and reliably:

**Consistency Types:**

* **Cross-Session**: Same behavior across different conversations
* **Multi-Turn**: Maintaining context and coherence within conversations
* **Cross-User**: Consistent responses to similar queries from different users
* **Temporal**: Stable behavior over time and system updates

## Evaluation Philosophy

### Probabilistic vs Deterministic

Unlike traditional software, agent behavior is inherently probabilistic. Evaluation frameworks must:

* **Accept Variability**: Allow for multiple valid responses to the same input
* **Focus on Patterns**: Look for consistent patterns rather than exact matches
* **Statistical Significance**: Use multiple runs to assess true performance
* **Threshold-Based**: Define acceptable ranges rather than exact values

### Holistic Assessment

Effective evaluation considers the complete agent experience:

* **End-to-End Performance**: From user input to final response
* **Multi-Modal Interactions**: Text, function calls, and state changes
* **Context Awareness**: How well agents use available context
* **User Experience**: Beyond correctness to usability and satisfaction

## Quality Assurance Principles

### Representativeness

Evaluation scenarios should reflect real-world usage:

* **User Journey Coverage**: Test complete workflows, not just isolated features
* **Edge Case Inclusion**: Include challenging and unusual scenarios
* **Domain Specificity**: Tailor evaluations to specific use cases
* **Scale Consideration**: Test behavior under various load conditions

### Measurability

Establish clear, quantifiable success criteria:

* **Objective Metrics**: Quantifiable measures of performance
* **Subjective Assessment**: Structured approaches to qualitative evaluation
* **Baseline Comparison**: Compare against previous versions or alternatives
* **Performance Thresholds**: Define minimum acceptable performance levels

### Reproducibility

Ensure evaluation results are consistent and reliable:

* **Version Control**: Track evaluation data and scenarios
* **Environment Consistency**: Standardize testing conditions
* **Randomness Control**: Manage randomness for reproducible results
* **Documentation**: Clear documentation of evaluation procedures

## Continuous Improvement

### Feedback Loops

Use evaluation results to drive improvements:

* **Performance Tracking**: Monitor metrics over time
* **Failure Analysis**: Systematic investigation of evaluation failures
* **Iterative Refinement**: Regular updates to evaluation criteria
* **Stakeholder Feedback**: Incorporate user and business feedback

### Adaptive Evaluation

Evolve evaluation approaches as agents improve:

* **Dynamic Thresholds**: Adjust expectations as capabilities grow
* **New Scenario Addition**: Continuously expand evaluation coverage
* **Metric Evolution**: Develop new metrics for emerging capabilities
* **Evaluation Validation**: Assess whether evaluations truly measure quality

## Implementation Considerations

### Resource Management

Balance comprehensive evaluation with practical constraints:

* **Execution Time**: Trade-off between coverage and speed
* **Computational Cost**: Manage LLM API costs during evaluation
* **Human Resources**: Balance automated and manual evaluation
* **Infrastructure**: Plan for evaluation infrastructure needs

### Integration

Embed evaluation into development workflows:

* **CI/CD Integration**: Automated evaluation in deployment pipelines
* **Development Feedback**: Fast feedback during active development
* **Production Monitoring**: Ongoing evaluation of deployed agents
* **Alert Systems**: Notifications when performance degrades

<Callout type="warning" title="Evaluation Limitations">
  Remember that evaluation is a proxy for real-world performance. No evaluation framework can capture every aspect of agent behavior or guarantee production success.
</Callout>

# Testing Agents
URL: /docs/framework/evaluation/testing-agents

Current approaches and future automated testing methods

***

title: Testing Agents
description: Current approaches and future automated testing methods
--------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Agent testing involves validating behavior across multiple dimensions from tool usage to response quality. The `@iqai/adk` now includes a comprehensive automated evaluation framework alongside manual testing approaches.

## Current Testing Approaches

### Manual Testing with Examples

The most immediate way to test agents is through the provided examples and custom test scripts:

```typescript
import { LlmAgent, Runner, InMemorySessionService } from '@iqai/adk';

async function testAgent() {
  const agent = new LlmAgent({
    name: "test_agent",
    model: "gemini-2.5-flash",
    description: "Agent for testing",
    instruction: "You are a helpful assistant",
  });

  const sessionService = new InMemorySessionService();
  const session = await sessionService.createSession("test_app", "test_user");

  const runner = new Runner({
    appName: "test_app",
    agent,
    sessionService,
  });

  // Test specific scenarios
  await testScenario(runner, session.id, "What is 2 + 2?");
  await testScenario(runner, session.id, "Help me plan a meeting");
}

async function testScenario(runner: Runner, sessionId: string, query: string) {
  console.log(`Testing: ${query}`);

  const events = [];
  for await (const event of runner.runAsync({
    userId: "test_user",
    sessionId,
    newMessage: { parts: [{ text: query }] },
  })) {
    events.push(event);
    if (event.content?.parts && !event.partial) {
      console.log(`Response: ${event.content.parts.map(p => p.text).join('')}`);
    }
  }

  // Manual validation
  validateResponse(events, query);
}

function validateResponse(events: Event[], query: string) {
  // Custom validation logic
  const finalEvents = events.filter(e => e.isFinalResponse());
  console.log(`Generated ${finalEvents.length} final responses`);

  // Check for specific criteria
  if (query.includes("plan")) {
    // Verify planning behavior
  }

  if (query.includes("calculate")) {
    // Verify calculation accuracy
  }
}
```

### Session-Based Testing

Use session services to test multi-turn conversations:

```typescript
async function testConversationFlow() {
  const sessionService = new InMemorySessionService();
  const session = await sessionService.createSession("test_app", "user_123");

  const testTurns = [
    "Hello, I need help with my project",
    "It's a web development project using React",
    "What are the best practices for state management?",
    "Can you provide specific examples?"
  ];

  for (const turn of testTurns) {
    console.log(`\n--- Turn: ${turn} ---`);
    await testScenario(runner, session.id, turn);

    // Analyze session state
    const updatedSession = await sessionService.getSession("test_app", "user_123", session.id);
    console.log(`Session has ${updatedSession?.events?.length || 0} events`);
  }
}
```

### Tool Usage Validation

Test agent tool interactions by monitoring function calls:

```typescript
function validateToolUsage(events: Event[]) {
  const functionCalls = events
    .flatMap(e => e.getFunctionCalls())
    .map(fc => ({ name: fc.name, args: fc.args }));

  console.log('Function calls made:', functionCalls);

  // Validate expected tool usage
  const expectedTools = ['search_tool', 'calculator_tool'];
  const usedTools = functionCalls.map(fc => fc.name);

  for (const tool of expectedTools) {
    if (usedTools.includes(tool)) {
      console.log(`✅ Expected tool '${tool}' was used`);
    } else {
      console.log(`❌ Expected tool '${tool}' was NOT used`);
    }
  }
}
```

## Testing Strategies

### Unit Testing Patterns

Test individual agent capabilities in isolation:

```typescript
describe('Agent Capabilities', () => {
  test('should handle basic calculations', async () => {
    const response = await runSingleQuery(agent, "What is 15 * 7?");
    expect(response).toContain('105');
  });

  test('should use search tool for information queries', async () => {
    const events = await runAndCollectEvents(agent, "What is the weather in Paris?");
    const toolCalls = events.flatMap(e => e.getFunctionCalls());
    expect(toolCalls.some(fc => fc.name === 'search_tool')).toBe(true);
  });

  test('should maintain context across turns', async () => {
    const session = await createTestSession();
    await runQuery(session, "My name is Alice");
    const response = await runQuery(session, "What is my name?");
    expect(response.toLowerCase()).toContain('alice');
  });
});
```

### Integration Testing

Test complete workflows and agent interactions:

```typescript
async function testWorkflowIntegration() {
  // Test end-to-end workflow
  const workflow = [
    { query: "I need to book a flight", expectedTools: ['search_flights'] },
    { query: "From New York to London on March 15", expectedTools: ['book_flight'] },
    { query: "Send confirmation to my email", expectedTools: ['send_email'] }
  ];

  for (const step of workflow) {
    const events = await runAndCollectEvents(agent, step.query);
    validateToolUsage(events, step.expectedTools);
  }
}
```

### Performance Testing

Monitor response times and resource usage:

```typescript
async function testPerformance() {
  const queries = [
    "Simple question",
    "Complex multi-step query with calculations",
    "Query requiring multiple tool calls"
  ];

  for (const query of queries) {
    const startTime = Date.now();
    await runSingleQuery(agent, query);
    const duration = Date.now() - startTime;

    console.log(`Query: "${query}" took ${duration}ms`);

    // Set performance expectations
    if (duration > 10000) {
      console.warn(`⚠️  Query took longer than expected: ${duration}ms`);
    }
  }
}
```

## Automated Evaluation Framework

<Callout type="info" title="Experimental Feature">
  The automated evaluation framework is now available as an experimental feature. APIs may evolve based on user feedback.
</Callout>

### AgentEvaluator: Core Testing Interface

The `AgentEvaluator` provides the main entry point for automated agent testing:

```typescript
import { AgentEvaluator } from '@iqai/adk/evaluation';
import { LlmAgent } from '@iqai/adk';

// Create your agent
const agent = new LlmAgent({
  name: 'test-agent',
  model: 'gpt-4',
  instruction: 'You are a helpful assistant'
});

// Run evaluation against test files
const results = await AgentEvaluator.evaluate({
  agent,
  testFilePaths: ['./tests/basic.test.json'],
  testConfigFilePath: './test_config.json',
  numRuns: 3 // Run multiple times for reliability
});

console.log(`Overall Score: ${results.overallScore}`);
console.log(`Passed: ${results.passedTests}/${results.totalTests}`);
```

### Test File Structure

Test files use a structured JSON format with expected behaviors:

```json
{
  "name": "basic_calculation_test",
  "agent_config": {
    "name": "calculator_agent",
    "tools": ["calculator_tool"]
  },
  "test_cases": [
    {
      "user_query": "What is 42 + 17?",
      "expected_tools": ["calculator_tool"],
      "expected_response_contains": ["59"],
      "max_response_time_ms": 5000
    }
  ]
}
```

### Integration Testing with EvalSets

Comprehensive evaluation of complex agent behaviors:

**Planned Features:**

* Multi-turn conversation scenarios
* Complex workflow validation
* Batch processing of evaluation scenarios
* Statistical analysis of results

**EvalSet Structure (Coming Soon):**

```json
{
  "evalset_name": "customer_support_scenarios",
  "sessions": [
    {
      "initial_state": { "user_type": "premium" },
      "conversation_turns": [
        {
          "user_message": "I have an issue with my account",
          "expected_agent_behavior": {
            "should_escalate": false,
            "should_use_tools": ["account_lookup"],
            "response_tone": "helpful"
          }
        }
      ]
    }
  ]
}
```

### Automated Evaluation Classes

**AgentEvaluator (Coming Soon):**

* Comprehensive agent performance assessment
* Configurable evaluation criteria
* Integration with CI/CD pipelines
* Performance trend analysis

**TrajectoryEvaluator (Coming Soon):**

* Tool usage pattern analysis
* Decision path optimization
* Efficiency measurement
* Strategy consistency validation

**ResponseEvaluator (Coming Soon):**

* Semantic similarity scoring
* Quality assessment metrics
* Reference comparison
* Automated scoring algorithms

## Best Practices

### Test Design

**Representative Scenarios:**

* Cover typical user journeys
* Include edge cases and error conditions
* Test various complexity levels
* Validate cross-functional scenarios

**Clear Success Criteria:**

* Define specific, measurable expectations
* Set appropriate performance thresholds
* Balance automation with human judgment
* Document evaluation rationale

### Test Maintenance

**Version Control:**

* Track test scenarios and expected outcomes
* Maintain test data consistency
* Document evaluation methodology
* Regular review and updates

**Continuous Improvement:**

* Analyze test failures systematically
* Update tests based on production feedback
* Expand coverage as agents evolve
* Balance comprehensive testing with execution speed

### Integration Guidelines

**Development Workflow:**

* Run quick tests during development
* Comprehensive tests before deployment
* Automated regression testing
* Performance monitoring in production

**Team Collaboration:**

* Share test scenarios across team members
* Document testing conventions
* Regular review of testing strategy
* Clear escalation procedures for test failures

<Callout type="info" title="Getting Started">
  Start with manual testing using the examples, then gradually build custom test scripts as your agent functionality grows. This provides immediate validation while preparing for the upcoming automated framework.
</Callout>

# Metrics and Scoring
URL: /docs/framework/evaluation/metrics-and-scoring

Measurement approaches for trajectory and response quality

***

title: Metrics and Scoring
description: Measurement approaches for trajectory and response quality
-----------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Effective agent evaluation requires quantifiable metrics that capture both the quality of agent decisions and the value of their outputs.

<Callout type="info" title="Implemented Metrics">
  Currently implemented prebuilt metrics: `tool_trajectory_avg_score`, `response_match_score` (ROUGE‑1), `response_evaluation_score` (LLM judge 1‑5), `safety_v1`, and experimental `final_response_match_v2` (LLM judge binary). Configure via `criteria` thresholds.
</Callout>

## Trajectory Metrics

Trajectory metrics measure the quality of the decision-making process and tool usage patterns.

### Tool Usage Analysis

**Tool Selection Accuracy:**

* **Metric**: Percentage of appropriate tool choices for given tasks
* **Calculation**: `(Correct tool selections / Total tool selections) * 100`
* **Threshold**: Typically 85%+ for production agents

**Tool Trajectory Average Score:**

* * **Purpose**: Compares actual vs expected tool usage sequences
* **Scoring**: Binary (1 for matches, 0 for mismatches)
* **Patterns**:
  * Exact match: Perfect sequence alignment
  * In-order match: Correct order, allowing extra steps
  * Any-order match: Required tools used regardless of order

**Current Implementation Example:**

```typescript
function calculateToolAccuracy(events: Event[], expectedTools: string[]) {
  const actualTools = events
    .flatMap(e => e.getFunctionCalls())
    .map(fc => fc.name);

  const correctSelections = expectedTools.filter(tool =>
    actualTools.includes(tool)
  ).length;

  const accuracy = (correctSelections / expectedTools.length) * 100;
  console.log(`Tool selection accuracy: ${accuracy}%`);

  return {
    accuracy,
    expected: expectedTools,
    actual: actualTools,
    correct: correctSelections
  };
}
```

### Decision Quality Metrics

**Step Efficiency:**

* **Definition**: Ratio of necessary steps to total steps taken
* **Formula**: `Necessary steps / Total steps`
* **Target**: Minimize unnecessary actions while maintaining effectiveness

**Error Recovery Rate:**

* **Measurement**: Percentage of errors successfully recovered from
* **Calculation**: `(Successful recoveries / Total errors) * 100`
* **Assessment**: Track how agents handle tool failures and incorrect responses

**Strategy Consistency:**

* **Evaluation**: Consistent approach across similar scenarios
* **Measurement**: Variance in tool usage patterns for equivalent tasks
* **Goal**: Minimize unnecessary strategy variation

### Performance Metrics

**Response Time Analysis:**

```typescript
async function measureResponseTime(agent: LlmAgent, query: string) {
  const startTime = Date.now();

  let responseComplete = false;
  const events = [];

  for await (const event of agent.runAsync(context)) {
    events.push(event);
    if (event.isFinalResponse()) {
      responseComplete = true;
      break;
    }
  }

  const totalTime = Date.now() - startTime;
  const toolCalls = events.flatMap(e => e.getFunctionCalls()).length;

  return {
    totalTime,
    toolCallCount: toolCalls,
    avgTimePerTool: toolCalls > 0 ? totalTime / toolCalls : 0,
    responseComplete
  };
}
```

## Response Quality Metrics

Response quality metrics assess the value and appropriateness of agent outputs.

### Semantic Similarity Scoring

**ROUGE‑1 (response\_match\_score):**

* Key: `response_match_score`
* Range: 0.0–1.0 (F1 overlap of unigrams)
* Typical threshold: 0.7–0.9
* Auto-applied when `response_match_score` present in `criteria`.

**LLM Judge (response\_evaluation\_score):**

* Key: `response_evaluation_score`
* Range: 1–5 (higher is better)
* Provide threshold (e.g. 3.5) and optional `judgeModelOptions` (model + numSamples) when extending internals.

**Tool Trajectory (tool\_trajectory\_avg\_score):**

* Binary per case; average across runs.
* Requires test samples with `expected_tool_use` (legacy path) or tool expectations embedded (future expansion).

**Safety (safety\_v1):**

* Integration for safety / harmlessness (returns pass/fail style score 0/1 internally mapped to threshold).

**Experimental Final Response Match V2 (final\_response\_match\_v2):**

* LLM judge binary validity vs reference; score in \[0,1].
* May change; not yet exposed by default criteria (add explicitly if needed).

**Current Manual Assessment:**

```typescript
function assessResponseQuality(response: string, query: string) {
  const quality = {
    relevance: 0,
    completeness: 0,
    clarity: 0,
    accuracy: 0
  };

  // Relevance assessment
  if (responseAddressesQuery(response, query)) {
    quality.relevance = 1;
  }

  // Completeness check
  if (responseIsComplete(response, query)) {
    quality.completeness = 1;
  }

  // Clarity evaluation
  if (responseIsClear(response)) {
    quality.clarity = 1;
  }

  // Accuracy validation
  if (responseIsAccurate(response, query)) {
    quality.accuracy = 1;
  }

  const overallScore = Object.values(quality).reduce((a, b) => a + b) / 4;
  return { ...quality, overall: overallScore };
}
```

### Content Analysis

**Accuracy Assessment:**

* **Factual Correctness**: Verification against known ground truth
* **Consistency**: Alignment with previous responses and established facts
* **Source Attribution**: Proper citation when using external information

**Relevance Measurement:**

* **Query Alignment**: How well response addresses the user question
* **Context Appropriateness**: Suitable for the conversation context
* **User Intent**: Fulfillment of underlying user needs

**Completeness Evaluation:**

* **Information Coverage**: All necessary information provided
* **Follow-up Handling**: Addressing natural follow-up questions
* **Detail Level**: Appropriate depth for the query complexity

### Tone and Style Analysis

**Communication Quality:**

```typescript
function analyzeCommunicationStyle(response: string) {
  return {
    tone: detectTone(response), // friendly, professional, helpful
    clarity: assessClarity(response), // clear, confusing, verbose
    appropriateness: checkAppropriatenessForContext(response),
    engagement: measureEngagementLevel(response)
  };
}

function detectTone(text: string): string {
  // Simple keyword-based analysis
  const friendlyWords = ['please', 'thank you', 'happy to help'];
  const professionalWords = ['regarding', 'furthermore', 'consequently'];

  if (friendlyWords.some(word => text.toLowerCase().includes(word))) {
    return 'friendly';
  }
  if (professionalWords.some(word => text.toLowerCase().includes(word))) {
    return 'professional';
  }
  return 'neutral';
}
```

## Composite Scoring

### Weighted Evaluation

Combine multiple metrics for holistic assessment:

```typescript
interface EvaluationWeights {
  trajectory: number;      // 0.4 - How agents reach solutions
  accuracy: number;        // 0.3 - Correctness of responses
  relevance: number;       // 0.2 - Appropriateness to query
  efficiency: number;      // 0.1 - Speed and resource usage
}

function calculateCompositeScore(
  trajectoryScore: number,
  accuracyScore: number,
  relevanceScore: number,
  efficiencyScore: number,
  weights: EvaluationWeights = {
    trajectory: 0.4,
    accuracy: 0.3,
    relevance: 0.2,
    efficiency: 0.1
  }
): number {
  return (
    trajectoryScore * weights.trajectory +
    accuracyScore * weights.accuracy +
    relevanceScore * weights.relevance +
    efficiencyScore * weights.efficiency
  );
}
```

### Pass/Fail Criteria

**Threshold-Based Evaluation:**

```typescript
interface QualityThresholds {
  trajectory: number;      // Minimum 0.85
  accuracy: number;        // Minimum 0.90
  relevance: number;       // Minimum 0.75
  overall: number;         // Minimum 0.80
}

function evaluateAgentPerformance(
  scores: Record<string, number>,
  thresholds: QualityThresholds
): { pass: boolean; details: Record<string, boolean> } {
  const details = {
    trajectory: scores.trajectory >= thresholds.trajectory,
    accuracy: scores.accuracy >= thresholds.accuracy,
    relevance: scores.relevance >= thresholds.relevance,
    overall: scores.overall >= thresholds.overall
  };

  const pass = Object.values(details).every(Boolean);

  return { pass, details };
}
```

## Statistical Analysis

### Confidence Intervals

Since agent responses vary, multiple runs provide statistical significance:

```typescript
async function runMultipleEvaluations(
  agent: LlmAgent,
  query: string,
  runs: number = 5
) {
  const scores = [];

  for (let i = 0; i < runs; i++) {
    const result = await evaluateSingleRun(agent, query);
    scores.push(result.overallScore);
  }

  const mean = scores.reduce((a, b) => a + b) / scores.length;
  const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  return {
    mean,
    stdDev,
    confidence95: [mean - 1.96 * stdDev, mean + 1.96 * stdDev],
    allScores: scores
  };
}
```

### Trend Analysis

Track performance over time:

```typescript
interface PerformanceRecord {
  timestamp: Date;
  version: string;
  scores: Record<string, number>;
  testScenario: string;
}

function analyzePerformanceTrend(records: PerformanceRecord[]) {
  const byVersion = records.reduce((acc, record) => {
    if (!acc[record.version]) acc[record.version] = [];
    acc[record.version].push(record.scores.overall);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(byVersion).map(([version, scores]) => ({
    version,
    avgScore: scores.reduce((a, b) => a + b) / scores.length,
    minScore: Math.min(...scores),
    maxScore: Math.max(...scores),
    sampleSize: scores.length
  }));
}
```

## Domain-Specific Metrics

### Customer Support Agents

**Resolution Rate:**

* **Metric**: Percentage of issues successfully resolved
* **Measurement**: Track escalation vs resolution outcomes
* **Target**: 80%+ first-contact resolution

**User Satisfaction Proxy:**

* **Indicators**: Response helpfulness, clarity, completeness
* **Measurement**: Structured evaluation of response quality
* **Benchmarking**: Compare against human agent performance

### Information Retrieval Agents

**Search Accuracy:**

* **Precision**: Relevant results / Total results returned
* **Recall**: Relevant results found / Total relevant results available
* **F1 Score**: Harmonic mean of precision and recall

**Source Attribution:**

* **Metric**: Percentage of claims with proper citations
* **Quality**: Accuracy and reliability of cited sources
* **Compliance**: Adherence to attribution requirements

### Task Automation Agents

**Completion Rate:**

* **Success**: Tasks completed successfully without intervention
* **Efficiency**: Time to completion vs baseline
* **Error Handling**: Graceful handling of unexpected conditions

**Integration Quality:**

* **API Usage**: Proper integration with external systems
* **Data Handling**: Correct processing and transformation
* **Error Recovery**: Resilience to system failures

## Available Evaluation Metrics

<Callout type="info" title="Current Implementation">
  The following metrics are available in the ADK evaluation framework. Additional advanced analytics are planned for future releases.
</Callout>

**Built-in Metric Keys (use in criteria):**

| Key                                       | Description                                           | Range | Typical Threshold |
| ----------------------------------------- | ----------------------------------------------------- | ----- | ----------------- |
| tool\_trajectory\_avg\_score              | Avg binary match of expected vs actual tool sequences | 0–1   | 1.0 (strict)      |
| response\_match\_score                    | ROUGE‑1 similarity F1                                 | 0–1   | 0.7–0.9           |
| response\_evaluation\_score               | LLM judge qualitative score                           | 1–5   | 3–4               |
| safety\_v1                                | Safety / harmlessness (pass/fail mapped)              | 0–1   | 1.0               |
| final\_response\_match\_v2 (experimental) | LLM judged exactness vs reference                     | 0–1   | 0.8–0.95          |

**Criteria Configuration Example (test\_config.json):**

```json
{
  "criteria": {
    "tool_trajectory_avg_score": 1.0,
    "response_match_score": 0.8,
    "safety_v1": 1.0
  }
}


**Future Capabilities:**
- **Real-time Analytics**: Live performance dashboards
- **Comparative Analysis**: Benchmark against other agents
- **Predictive Metrics**: Early warning systems for performance degradation

**Integration Capabilities:**
- **CI/CD Pipeline Integration**: Automated quality gates
- **Performance Monitoring**: Production quality tracking
- **Alert Systems**: Threshold-based notifications
- **Trend Analysis**: Long-term performance patterns

## Best Practices

### Metric Selection

**Relevance**: Choose metrics that align with business objectives
**Balance**: Combine objective measurements with subjective assessment
**Actionability**: Select metrics that guide improvement efforts
**Consistency**: Maintain consistent measurement approaches over time

### Threshold Setting

**Baseline Establishment**: Use initial performance as baseline
**Gradual Improvement**: Incrementally raise quality standards
**Context Sensitivity**: Adjust thresholds for different use cases
**Stakeholder Alignment**: Ensure thresholds match business requirements

### Performance Monitoring

**Regular Assessment**: Continuous evaluation of key metrics
**Trend Analysis**: Monitor performance patterns over time
**Root Cause Analysis**: Investigate performance degradations
**Improvement Tracking**: Measure impact of optimization efforts
```

# Evaluation Patterns
URL: /docs/framework/evaluation/evaluation-patterns

Domain-specific evaluation strategies and best practices

***

title: Evaluation Patterns
description: Domain-specific evaluation strategies and best practices
---------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Different types of agents require specialized evaluation approaches tailored to their specific use cases and performance requirements.

## Customer Support Agents

Customer support agents need evaluation that focuses on issue resolution, user satisfaction, and escalation handling.

### Key Evaluation Areas

**Issue Resolution Effectiveness:**

* **First Contact Resolution**: Percentage of issues resolved without escalation
* **Resolution Accuracy**: Correctness of solutions provided
* **Resolution Time**: Speed of problem solving
* **Follow-up Requirements**: Need for additional assistance

**Communication Quality:**

* **Tone Appropriateness**: Professional yet empathetic communication
* **Clarity**: Easy-to-understand explanations
* **Completeness**: Comprehensive response coverage
* **Personalization**: Appropriate use of user context

**Knowledge Base Usage:**

* **Search Accuracy**: Finding relevant information efficiently
* **Information Synthesis**: Combining multiple sources effectively
* **Source Attribution**: Proper citation of knowledge sources
* **Gap Identification**: Recognizing when information is unavailable

### Evaluation Implementation

```typescript
async function evaluateCustomerSupportAgent(
  agent: LlmAgent,
  supportScenarios: CustomerSupportScenario[]
) {
  const results = [];

  for (const scenario of supportScenarios) {
    const sessionService = new InMemorySessionService();
    const session = await sessionService.createSession("support", "customer");

    const runner = new Runner({
      appName: "support_app",
      agent,
      sessionService,
    });

    // Run the support scenario
    const events = [];
    for await (const event of runner.runAsync({
      userId: "customer",
      sessionId: session.id,
      newMessage: { parts: [{ text: scenario.userIssue }] },
    })) {
      events.push(event);
    }

    // Evaluate the interaction
    const evaluation = {
      scenario: scenario.type,
      resolved: checkIssueResolution(events, scenario),
      escalated: checkEscalation(events),
      tone: analyzeTone(events),
      accuracy: validateAccuracy(events, scenario.expectedSolution),
      toolsUsed: extractToolUsage(events)
    };

    results.push(evaluation);
  }

  return analyzeSupportResults(results);
}

interface CustomerSupportScenario {
  type: 'billing' | 'technical' | 'account' | 'general';
  userIssue: string;
  expectedSolution: string;
  shouldEscalate: boolean;
  requiredTools: string[];
}
```

### Success Metrics

**Resolution Metrics:**

* **Target**: 85%+ first-contact resolution for standard issues
* **Escalation Rate**: Less than 15% for routine inquiries
* **Accuracy Rate**: 95%+ for factual information

**User Experience Metrics:**

* **Response Clarity**: Subjective assessment of explanation quality
* **Tone Appropriateness**: Professional and empathetic communication
* **Completeness**: All aspects of inquiry addressed

## Task Automation Agents

Task automation agents require evaluation focused on workflow completion, integration quality, and error handling.

### Key Evaluation Areas

**Workflow Completion:**

* **End-to-End Success**: Complete task execution without intervention
* **Step Accuracy**: Correct execution of individual workflow steps
* **State Management**: Proper handling of workflow state
* **Dependency Handling**: Managing task dependencies and prerequisites

**Integration Quality:**

* **API Usage**: Proper integration with external systems
* **Data Transformation**: Accurate processing and formatting
* **Error Handling**: Graceful handling of system failures
* **Authentication**: Proper credential and access management

**Efficiency Metrics:**

* **Execution Time**: Speed of task completion
* **Resource Usage**: Optimal use of system resources
* **Retry Logic**: Intelligent handling of transient failures
* **Parallel Processing**: Effective use of concurrent operations

### Evaluation Implementation

```typescript
interface AutomationTask {
  name: string;
  steps: TaskStep[];
  expectedDuration: number;
  requiredTools: string[];
  successCriteria: SuccessCriteria;
}

interface TaskStep {
  action: string;
  expectedTool: string;
  expectedData: any;
  dependencies: string[];
}

async function evaluateAutomationAgent(
  agent: LlmAgent,
  automationTasks: AutomationTask[]
) {
  const results = [];

  for (const task of automationTasks) {
    const startTime = Date.now();

    try {
      const events = await executeAutomationTask(agent, task);
      const executionTime = Date.now() - startTime;

      const evaluation = {
        taskName: task.name,
        completed: checkTaskCompletion(events, task),
        accuracy: validateStepAccuracy(events, task.steps),
        efficiency: executionTime <= task.expectedDuration,
        toolUsage: analyzeToolUsage(events, task.requiredTools),
        errorHandling: evaluateErrorRecovery(events),
        executionTime
      };

      results.push(evaluation);
    } catch (error) {
      results.push({
        taskName: task.name,
        completed: false,
        error: error.message,
        executionTime: Date.now() - startTime
      });
    }
  }

  return analyzeAutomationResults(results);
}
```

### Success Metrics

**Completion Metrics:**

* **Target**: 95%+ successful task completion
* **Efficiency**: Within 120% of expected execution time
* **Error Recovery**: 90%+ recovery from transient failures

**Quality Metrics:**

* **Step Accuracy**: 98%+ correct step execution
* **Data Integrity**: 100% accurate data transformation
* **Integration**: Zero authentication or API errors

## Information Retrieval Agents

Information retrieval agents need evaluation focused on search accuracy, source quality, and information synthesis.

### Key Evaluation Areas

**Search Effectiveness:**

* **Query Understanding**: Interpretation of user information needs
* **Search Strategy**: Effective use of search tools and techniques
* **Result Relevance**: Quality of retrieved information
* **Coverage**: Comprehensive information gathering

**Source Quality:**

* **Reliability**: Use of trustworthy information sources
* **Currency**: Access to up-to-date information
* **Attribution**: Proper citation and source tracking
* **Diversity**: Multiple perspectives and sources

**Information Synthesis:**

* **Accuracy**: Correct interpretation of source material
* **Coherence**: Logical organization of information
* **Completeness**: Comprehensive coverage of the topic
* **Bias Awareness**: Recognition and mitigation of source bias

### Evaluation Implementation

```typescript
interface InformationQuery {
  query: string;
  domain: string;
  expectedSources: string[];
  requiredInformation: string[];
  qualityThreshold: number;
}

async function evaluateRetrievalAgent(
  agent: LlmAgent,
  queries: InformationQuery[]
) {
  const results = [];

  for (const query of queries) {
    const events = await executeInformationQuery(agent, query.query);

    const evaluation = {
      query: query.query,
      domain: query.domain,
      searchAccuracy: evaluateSearchAccuracy(events, query),
      sourceQuality: assessSourceQuality(events, query.expectedSources),
      informationCompleteness: checkInformationCoverage(events, query.requiredInformation),
      synthesisQuality: evaluateSynthesis(events),
      citations: validateCitations(events)
    };

    results.push(evaluation);
  }

  return analyzeRetrievalResults(results);
}

function evaluateSearchAccuracy(events: Event[], query: InformationQuery) {
  const searchEvents = events.filter(e =>
    e.getFunctionCalls().some(fc => fc.name.includes('search'))
  );

  const relevantResults = searchEvents.filter(e =>
    containsRelevantInformation(e, query.requiredInformation)
  );

  return {
    precision: relevantResults.length / searchEvents.length,
    recall: calculateRecall(relevantResults, query.requiredInformation),
    f1Score: calculateF1Score(relevantResults, query)
  };
}
```

### Success Metrics

**Accuracy Metrics:**

* **Search Precision**: 80%+ relevant results
* **Information Recall**: 90%+ required information found
* **Source Reliability**: 95%+ authoritative sources

**Quality Metrics:**

* **Citation Accuracy**: 100% proper attribution
* **Synthesis Coherence**: Subjective assessment of organization
* **Bias Mitigation**: Recognition of perspective limitations

## Multi-Agent System Evaluation

Multi-agent systems require evaluation of coordination, communication, and collective performance.

### Key Evaluation Areas

**Agent Coordination:**

* **Task Distribution**: Effective allocation of work across agents
* **Communication**: Clear inter-agent information exchange
* **Synchronization**: Proper timing of collaborative activities
* **Conflict Resolution**: Handling of contradictory agent outputs

**System Performance:**

* **Collective Accuracy**: Combined agent performance vs individual
* **Efficiency Gains**: Benefits of parallelization and specialization
* **Redundancy Management**: Optimal use of multiple agents
* **Fault Tolerance**: System resilience to individual agent failures

### Evaluation Implementation

```typescript
async function evaluateMultiAgentSystem(
  agents: BaseAgent[],
  collaborativeScenarios: CollaborativeScenario[]
) {
  const results = [];

  for (const scenario of collaborativeScenarios) {
    // Create coordinating agent that manages the sub-agents
    const coordinator = new SequentialAgent({
      name: "coordinator",
      description: "Coordinates multiple specialized agents",
      subAgents: agents
    });

    const events = await executeCollaborativeTask(coordinator, scenario);

    const evaluation = {
      scenario: scenario.name,
      overallSuccess: checkCollaborativeSuccess(events, scenario),
      agentContributions: analyzeAgentContributions(events, agents),
      coordination: evaluateCoordination(events),
      efficiency: compareToBaselinePerformance(events, scenario),
      conflictResolution: assessConflictHandling(events)
    };

    results.push(evaluation);
  }

  return analyzeMultiAgentResults(results);
}
```

## Production Evaluation Patterns

### Continuous Monitoring

**Real-time Quality Assessment:**

```typescript
class ProductionEvaluationMonitor {
  private qualityThresholds: QualityThresholds;
  private alertCallbacks: ((issue: QualityIssue) => void)[];

  async monitorAgentInteraction(
    agentResponse: Event,
    userFeedback?: UserFeedback
  ) {
    const quality = await this.assessResponseQuality(agentResponse);

    if (quality.overall < this.qualityThresholds.overall) {
      await this.triggerQualityAlert({
        type: 'quality_degradation',
        agent: agentResponse.author,
        score: quality.overall,
        threshold: this.qualityThresholds.overall,
        timestamp: new Date()
      });
    }

    if (userFeedback) {
      await this.incorporateUserFeedback(agentResponse, userFeedback);
    }
  }

  private async assessResponseQuality(response: Event) {
    return {
      relevance: await this.calculateRelevance(response),
      accuracy: await this.validateAccuracy(response),
      helpfulness: await this.assessHelpfulness(response),
      overall: 0 // computed composite score
    };
  }
}
```

### A/B Testing

**Comparative Agent Evaluation:**

```typescript
async function runAgentABTest(
  agentA: LlmAgent,
  agentB: LlmAgent,
  testScenarios: TestScenario[],
  trafficSplit: number = 0.5
) {
  const resultsA = [];
  const resultsB = [];

  for (const scenario of testScenarios) {
    const useAgentA = Math.random() < trafficSplit;
    const agent = useAgentA ? agentA : agentB;

    const result = await evaluateScenario(agent, scenario);

    if (useAgentA) {
      resultsA.push(result);
    } else {
      resultsB.push(result);
    }
  }

  return {
    agentA: calculateAggregateMetrics(resultsA),
    agentB: calculateAggregateMetrics(resultsB),
    significance: calculateStatisticalSignificance(resultsA, resultsB),
    recommendation: determineWinningAgent(resultsA, resultsB)
  };
}
```

## Best Practices

### Evaluation Design Principles

**Domain Alignment:**

* **Relevant Metrics**: Choose metrics that matter for your specific use case
* **Realistic Scenarios**: Test with scenarios that reflect real usage
* **Stakeholder Input**: Include business requirements in evaluation criteria
* **User Perspective**: Prioritize metrics that impact user experience

**Comprehensive Coverage:**

* **Happy Path**: Test normal, expected interactions
* **Edge Cases**: Include unusual and challenging scenarios
* **Error Conditions**: Test resilience to failures and invalid inputs
* **Scale Testing**: Evaluate performance under various load conditions

### Implementation Guidelines

**Automation Balance:**

* **Quick Feedback**: Automated tests for rapid development iteration
* **Human Judgment**: Manual evaluation for subjective quality aspects
* **Hybrid Approach**: Combine automated metrics with human validation
* **Progressive Enhancement**: Start simple, add complexity gradually

**Data Management:**

* **Test Data Quality**: Ensure test scenarios are accurate and representative
* **Version Control**: Track evaluation data and criteria changes
* **Reproducibility**: Maintain consistent testing environments
* **Privacy Compliance**: Handle sensitive data appropriately in testing

<Callout type="info" title="Iterative Improvement">
  Start with basic evaluation patterns for your domain, then gradually add sophistication as you learn what metrics best predict real-world performance.
</Callout>

### Integration Strategies

**Development Workflow:**

* **CI/CD Integration**: Automated evaluation in deployment pipelines
* **Feature Development**: Evaluation-driven feature development
* **Release Gates**: Quality thresholds for production deployment
* **Performance Tracking**: Continuous monitoring of key metrics

**Team Collaboration:**

* **Shared Understanding**: Clear communication of evaluation criteria
* **Regular Review**: Periodic assessment of evaluation effectiveness
* **Knowledge Sharing**: Document lessons learned and best practices
* **Stakeholder Engagement**: Regular updates on agent performance

The key to successful agent evaluation is choosing the right combination of metrics and approaches for your specific domain while maintaining focus on real-world performance and user satisfaction.

# Artifacts
URL: /docs/framework/artifacts

Manage named, versioned binary data for rich agent interactions with files and media

***

title: Artifacts
description: Manage named, versioned binary data for rich agent interactions with files and media
-------------------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Artifacts provide a mechanism for managing named, versioned binary data associated with user sessions. They enable agents to handle data beyond simple text strings, supporting rich interactions with files, images, audio, and other binary formats.

## Overview

Artifacts are pieces of binary data identified by unique filenames within specific scopes, with automatic versioning for data evolution. They bridge the gap between simple session state and complex file management needs.

### Core Characteristics

* **Binary Data Storage**: Handle any type of binary content (images, PDFs, audio, video)
* **Named Identification**: Use descriptive filenames for easy reference
* **Automatic Versioning**: Each save creates a new version automatically
* **Scoped Access**: Session-specific or user-wide accessibility
* **Standard Representation**: Consistent `Part` object format from `@google/genai`

<Callout type="info" title="Beyond Text Storage">
  While session state is perfect for configuration and conversational context, artifacts are designed for binary data, large files, and content that needs versioning.
</Callout>

## Quick Start

### Basic Artifact Operations

Here's how to work with artifacts in your agent callbacks:

```typescript
import { LlmAgent, CallbackContext, Runner } from '@iqai/adk';
import { InMemoryArtifactService } from '@iqai/adk';

// Set up artifact service
const artifactService = new InMemoryArtifactService();

// Use artifacts in callbacks
const beforeAgentCallback = async (callbackContext: CallbackContext) => {
  try {
    // Save a simple text artifact
    const textArtifact = {
      inlineData: {
        data: Buffer.from('Hello, World!').toString('base64'),
        mimeType: 'text/plain'
      }
    };

    const version = await callbackContext.saveArtifact('greeting.txt', textArtifact);
    console.log(`Saved greeting.txt version ${version}`);

    // Load an existing artifact
    const loadedArtifact = await callbackContext.loadArtifact('greeting.txt');
    if (loadedArtifact) {
      const text = Buffer.from(loadedArtifact.inlineData.data, 'base64').toString();
      console.log(`Loaded text: ${text}`);
    }
  } catch (error) {
    console.warn('Artifact operation failed:', error);
  }

  return undefined;
};

// Create agent with artifact service
const agent = new LlmAgent({
  name: "artifact_agent",
  model: "gemini-2.5-flash",
  description: "Agent that works with artifacts",
  instruction: "You are helpful",
  beforeAgentCallback
});

// Create runner with artifact service
const runner = new Runner({
  appName: "my_app",
  agent,
  sessionService: new InMemorySessionService(),
  artifactService // Configure artifact service
});
```

### Working with Different Data Types

```typescript
const mediaArtifactCallback = async (callbackContext: CallbackContext) => {
  // Save an image artifact
  const imageData = Buffer.from(/* your image data */);
  const imageArtifact = {
    inlineData: {
      data: imageData.toString('base64'),
      mimeType: 'image/png'
    }
  };

  await callbackContext.saveArtifact('generated_chart.png', imageArtifact);

  // Save a JSON data artifact
  const jsonData = { results: [1, 2, 3], timestamp: new Date().toISOString() };
  const jsonArtifact = {
    inlineData: {
      data: Buffer.from(JSON.stringify(jsonData)).toString('base64'),
      mimeType: 'application/json'
    }
  };

  await callbackContext.saveArtifact('analysis_results.json', jsonArtifact);

  return undefined;
};
```

### Auto-save input blobs from user messages

When enabled, the runner will automatically save any incoming `inlineData` parts from the user's message as artifacts before appending the event. Each saved file is named using the pattern `artifact_<invocationId>_<index>` and the corresponding message part is replaced with a short text placeholder.

* Requires an `artifactService` to be configured on the `Runner`
* Toggle via `runConfig.saveInputBlobsAsArtifacts`
* Can be set at agent build time using `withRunConfig` or per run

```typescript
import { agentBuilder, Runner, InMemorySessionService, InMemoryArtifactService } from '@iqai/adk';

// Configure at agent build time
const agent = agentBuilder()
  .name('artifact_agent')
  .model('gemini-2.5-flash')
  .withRunConfig({ saveInputBlobsAsArtifacts: true })
  .build();

const runner = new Runner({
  appName: 'my_app',
  agent,
  sessionService: new InMemorySessionService(),
  artifactService: new InMemoryArtifactService(),
});

// Or enable per run
// await runner.runAsync({ userId, sessionId, newMessage, runConfig: new RunConfig({ saveInputBlobsAsArtifacts: true }) });
```

## Artifact Scoping

Artifacts can be scoped to different access levels:

### Session-Specific Artifacts

Artifacts tied to individual conversation sessions:

```typescript
// Regular filename - session scoped
await callbackContext.saveArtifact('temp_processing.csv', csvArtifact);
```

**Characteristics:**

* Limited to current session context
* Automatically cleaned up when sessions end
* Ideal for temporary processing and conversation-specific files

### User-Specific Artifacts

Artifacts persisting across all user sessions:

```typescript
// "user:" prefix - user scoped
await callbackContext.saveArtifact('user:profile_picture.png', imageArtifact);
```

**Characteristics:**

* Available across all user sessions within the application
* Persist beyond individual conversations
* Enable long-term user data management

<Callout type="warning" title="Namespace Selection">
  Choose appropriate artifact scoping based on data lifecycle requirements - session for temporary content, user for persistent data.
</Callout>

## Versioning System

Artifacts automatically maintain version history:

```typescript
const versioningExample = async (callbackContext: CallbackContext) => {
  // First save - creates version 0
  const v0 = await callbackContext.saveArtifact('document.txt', textArtifact1);
  console.log(`Version: ${v0}`); // 0

  // Second save - creates version 1
  const v1 = await callbackContext.saveArtifact('document.txt', textArtifact2);
  console.log(`Version: ${v1}`); // 1

  // Load specific version
  const oldVersion = await callbackContext.loadArtifact('document.txt', 0);

  // Load latest version (default)
  const latestVersion = await callbackContext.loadArtifact('document.txt');

  return undefined;
};
```

**Version Characteristics:**

* Version numbers start at 0 and increment automatically
* Each save operation creates a new version
* Access latest version by default or specify version explicitly
* Complete version history maintained

## Where to start

<Cards>
  <Card title="Runner Configuration" description="Enable auto-save of uploads and wire services" href="/docs/framework/artifacts/runner-configuration" />

  <Card title="Using in Contexts" description="Save/load via CallbackContext and ToolContext" href="/docs/framework/artifacts/context-integration" />

  <Card title="Scoping & Versioning" description="Session vs user filenames and version behavior" href="/docs/framework/artifacts/scoping-and-versioning" />

  <Card title="Service Implementations" description="In-memory vs GCS and setup notes" href="/docs/framework/artifacts/service-implementations" />

  <Card title="Recipes" description="Upload → process → save, media, caching" href="/docs/framework/artifacts/recipes" />

  <Card title="Troubleshooting" description="Quick fixes for common issues" href="/docs/framework/artifacts/troubleshooting" />

  <Card title="Best Practices" description="Performance, security, and ops guidance" href="/docs/framework/artifacts/best-practices" />
</Cards>

### File Upload and Processing

Save an uploaded file as an artifact, then persist derived results (e.g., analysis output). This is a minimal end-to-end flow; see the full tool-based version in Recipes.

[Open recipes](/docs/framework/artifacts/recipes)

```typescript
const fileProcessingCallback = async (callbackContext: CallbackContext) => {
  // Simulate receiving an uploaded file
  const uploadedFileData = Buffer.from('CSV data here');
  const csvArtifact = {
    inlineData: {
      data: uploadedFileData.toString('base64'),
      mimeType: 'text/csv'
    }
  };

  // Save uploaded file
  await callbackContext.saveArtifact('uploaded_data.csv', csvArtifact);

  // Process and save results
  const processedData = { summary: 'Analysis complete', rows: 100 };
  const resultsArtifact = {
    inlineData: {
      data: Buffer.from(JSON.stringify(processedData)).toString('base64'),
      mimeType: 'application/json'
    }
  };

  await callbackContext.saveArtifact('processing_results.json', resultsArtifact);

  return undefined;
};
```

### Caching Expensive Operations

Avoid recomputing expensive results by saving a JSON artifact as a cache entry and reading it on subsequent runs. Use this for deterministic or memoizable outputs.

```typescript
const cachingCallback = async (callbackContext: CallbackContext) => {
  const cacheKey = 'expensive_computation_result.json';

  // Check for cached result
  const cachedResult = await callbackContext.loadArtifact(cacheKey);

  if (cachedResult) {
    console.log('Using cached result');
    const data = JSON.parse(
      Buffer.from(cachedResult.inlineData.data, 'base64').toString()
    );
    callbackContext.state.set('computation_result', data);
  } else {
    console.log('Computing new result');

    // Perform expensive computation
    const result = { value: Math.random(), timestamp: Date.now() };

    // Cache the result
    const artifact = {
      inlineData: {
        data: Buffer.from(JSON.stringify(result)).toString('base64'),
        mimeType: 'application/json'
      }
    };

    await callbackContext.saveArtifact(cacheKey, artifact);
    callbackContext.state.set('computation_result', result);
  }

  return undefined;
};
```

## Service Architecture

See interfaces and backends in:

* [Scoping & Versioning](/docs/framework/artifacts/scoping-and-versioning): behavior overview
* [Service Implementations](/docs/framework/artifacts/service-implementations): concrete setup and usage

## Documentation Structure

<Cards>
  <Card title="🏗️ Service Implementations" description="Different artifact service backends and their configurations" href="/docs/framework/artifacts/service-implementations" />

  <Card title="🔧 Context Integration" description="Using artifacts through CallbackContext and ToolContext" href="/docs/framework/artifacts/context-integration" />

  <Card title="📋 Best Practices" description="Performance, security, versioning, and production considerations" href="/docs/framework/artifacts/best-practices" />
</Cards>

## Error Handling

Always implement proper error handling for artifact operations:

```typescript
const robustArtifactCallback = async (callbackContext: CallbackContext) => {
  try {
    const artifact = await callbackContext.loadArtifact('user_config.json');

    if (artifact) {
      const config = JSON.parse(
        Buffer.from(artifact.inlineData.data, 'base64').toString()
      );
      callbackContext.state.set('user_config', config);
    } else {
      console.log('No existing config found, using defaults');
      callbackContext.state.set('user_config', getDefaultConfig());
    }
  } catch (error) {
    console.error('Failed to load user config:', error);

    // Fallback to defaults
    callbackContext.state.set('user_config', getDefaultConfig());

    // Optionally notify the user
    return {
      role: 'model',
      parts: [{ text: 'Configuration could not be loaded. Using default settings.' }]
    };
  }

  return undefined;
};

function getDefaultConfig() {
  return {
    theme: 'light',
    language: 'en',
    notifications: true
  };
}
```

## Integration Examples

### With Tools

```typescript
import { BaseTool, ToolContext } from '@iqai/adk';

class FileAnalysisTool extends BaseTool {
  async runAsync(args: { filename: string }, context: ToolContext) {
    try {
      // List available artifacts
      const availableFiles = await context.listArtifacts();

      if (!availableFiles.includes(args.filename)) {
        return { error: `File ${args.filename} not found` };
      }

      // Load and analyze the file
      const artifact = await context.loadArtifact(args.filename);
      if (!artifact) {
        return { error: `Could not load ${args.filename}` };
      }

      // Perform analysis based on MIME type
      const analysis = this.analyzeFile(artifact);

      // Save analysis results
      const resultArtifact = {
        inlineData: {
          data: Buffer.from(JSON.stringify(analysis)).toString('base64'),
          mimeType: 'application/json'
        }
      };

      await context.saveArtifact(`analysis_${args.filename}.json`, resultArtifact);

      return {
        analysis,
        result_saved: `analysis_${args.filename}.json`
      };
    } catch (error) {
      return { error: `Analysis failed: ${error.message}` };
    }
  }

  private analyzeFile(artifact: Part) {
    // Implementation based on MIME type
    return {
      size: artifact.inlineData.data.length,
      type: artifact.inlineData.mimeType,
      timestamp: new Date().toISOString()
    };
  }
}
```

## Related Topics

<Cards>
  <Card title="🔧 Tools" description="Using artifacts in tool implementations for file processing" href="/docs/framework/tools" />

  <Card title="💬 Sessions" description="Understanding artifact scoping within session management" href="/docs/framework/sessions/session" />

  <Card title="📋 Callbacks" description="Artifact access and management through callbacks" href="/docs/framework/callbacks" />

  <Card title="🏗️ Context" description="Context objects for artifact operations and access" href="/docs/framework/context" />
</Cards>

# Runner Configuration
URL: /docs/framework/artifacts/runner-configuration

Configure artifact behavior at run-time, including auto-saving user input blobs

***

title: Runner Configuration
description: Configure artifact behavior at run-time, including auto-saving user input blobs
--------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

## Enable auto-save for user input blobs

When enabled, the runner automatically saves any incoming `inlineData` parts from the user's message as artifacts before appending the event. Each saved artifact is named `artifact_<invocationId>_<index>` and the original message part is replaced with a short text placeholder.

Requirements:

* An `artifactService` must be configured on the `Runner`
* Enable via `withRunConfig({ saveInputBlobsAsArtifacts: true })` on the agent builder, or per-run via `RunConfig`

```typescript
import {
  agentBuilder,
  Runner,
  InMemorySessionService,
  InMemoryArtifactService,
  RunConfig
} from '@iqai/adk';

// Configure at agent build time
const agent = agentBuilder()
  .name('artifact_agent')
  .model('gemini-2.5-flash')
  .withRunConfig({ saveInputBlobsAsArtifacts: true })
  .build();

const runner = new Runner({
  appName: 'my_app',
  agent,
  sessionService: new InMemorySessionService(),
  artifactService: new InMemoryArtifactService(),
});

// Or enable per run
// await runner.runAsync({
//   userId,
//   sessionId,
//   newMessage,
//   runConfig: new RunConfig({ saveInputBlobsAsArtifacts: true })
// });
```

<Callout type="info">
  Artifacts saved by this mechanism use the incoming part's `inlineData` (base64 string + MIME type) as-is. Ensure your front-end encodes uploads as base64 and sets a correct `mimeType`.
</Callout>

## Minimal example: sending an image upload

```typescript
import type { Content } from '@google/genai';

const imageBytes = Buffer.from(/* raw PNG bytes */);
const message: Content = {
  role: 'user',
  parts: [
    {
      inlineData: {
        data: imageBytes.toString('base64'),
        mimeType: 'image/png'
      }
    }
  ]
};

for await (const event of runner.runAsync({ userId: 'u1', sessionId: 's1', newMessage: message })) {
  // Events stream
}

// The image will be saved as an artifact, e.g. "artifact_<invocationId>_0"
```

# Context Integration
URL: /docs/framework/artifacts/context-integration

Using artifacts through CallbackContext and ToolContext for file management and data processing

***

title: Context Integration
description: Using artifacts through CallbackContext and ToolContext for file management and data processing
------------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Artifacts are accessed through context objects that provide convenient methods for storing and retrieving binary data. Different context types offer varying levels of functionality depending on your use case.

<Callout type="info" title="Auto-save input blobs">
  When `saveInputBlobsAsArtifacts` is enabled in the run config, the runner saves any incoming user `inlineData` parts as artifacts automatically before appending the event. Enable it via `withRunConfig({ saveInputBlobsAsArtifacts: true })` on your agent builder, or per run. An `artifactService` on the `Runner` is required.
</Callout>

<Callout type="info" title="Prefer createTool">
  Use `createTool` for concise, schema-validated tools instead of subclassing. See Recipes for examples.
</Callout>

## CallbackContext Access

The `CallbackContext` provides basic artifact operations available in agent callbacks.

### Available Methods

```typescript
class CallbackContext {
  // Load an artifact by filename, optionally specifying version
  async loadArtifact(filename: string, version?: number): Promise<Part | undefined>

  // Save an artifact and record it as a delta for the session
  async saveArtifact(filename: string, artifact: Part): Promise<number>
}
```

<Callout type="info" title="Artifact Deletion">
  The `deleteArtifact` method is not exposed through `CallbackContext` or `ToolContext` for safety reasons. To delete artifacts, access the artifact service directly. See [Best Practices](/docs/framework/artifacts/best-practices#artifact-cleanup-and-deletion) for cleanup strategies.
</Callout>

### Basic Usage in Callbacks

```typescript
import { LlmAgent, CallbackContext } from '@iqai/adk';

const beforeAgentCallback = async (callbackContext: CallbackContext) => {
  try {
    // Load user preferences
    const prefsArtifact = await callbackContext.loadArtifact('user:preferences.json');

    if (prefsArtifact) {
      const preferences = JSON.parse(
        Buffer.from(prefsArtifact.inlineData.data, 'base64').toString()
      );

      // Apply user preferences to session state
      callbackContext.state.set('user_preferences', preferences);
      callbackContext.state.set('theme', preferences.theme || 'light');
    }

    // Load conversation history if available
    const historyArtifact = await callbackContext.loadArtifact('conversation_history.json');

    if (historyArtifact) {
      const history = JSON.parse(
        Buffer.from(historyArtifact.inlineData.data, 'base64').toString()
      );

      callbackContext.state.set('conversation_count', history.length);
    }

  } catch (error) {
    console.warn('Failed to load user data:', error);
  }

  return undefined;
};

const afterAgentCallback = async (callbackContext: CallbackContext) => {
  try {
    // Save updated conversation history
    const currentHistory = callbackContext.state.get('conversation_history') || [];
    const historyArtifact = {
      inlineData: {
        data: Buffer.from(JSON.stringify(currentHistory)).toString('base64'),
        mimeType: 'application/json'
      }
    };

    await callbackContext.saveArtifact('conversation_history.json', historyArtifact);

    // Save session summary
    const summary = callbackContext.state.get('session_summary');
    if (summary) {
      const summaryArtifact = {
        inlineData: {
          data: Buffer.from(JSON.stringify(summary)).toString('base64'),
          mimeType: 'application/json'
        }
      };

      await callbackContext.saveArtifact('session_summary.json', summaryArtifact);
    }

  } catch (error) {
    console.error('Failed to save session data:', error);
  }

  return undefined;
};
```

### Model Callback Integration

```typescript
const beforeModelCallback = async ({ callbackContext }: { callbackContext: CallbackContext }) => {
  try {
    // Load model configuration
    const configArtifact = await callbackContext.loadArtifact('model_config.json');

    if (configArtifact) {
      const config = JSON.parse(
        Buffer.from(configArtifact.inlineData.data, 'base64').toString()
      );

      // Apply model-specific settings
      callbackContext.state.set('temperature', config.temperature || 0.7);
      callbackContext.state.set('max_tokens', config.maxTokens || 1000);
    }

    // Load context files for the model
    const contextArtifact = await callbackContext.loadArtifact('context_data.txt');

    if (contextArtifact) {
      const contextText = Buffer.from(contextArtifact.inlineData.data, 'base64').toString();

      // Add context to the request (implementation depends on your setup)
      callbackContext.state.set('additional_context', contextText);
    }

  } catch (error) {
    console.warn('Failed to load model configuration:', error);
  }

  return undefined;
};

const afterModelCallback = async ({ callbackContext }: { callbackContext: CallbackContext }) => {
  try {
    // Save model response metadata
    const responseMetadata = {
      timestamp: new Date().toISOString(),
      model: callbackContext.state.get('current_model'),
      tokens_used: callbackContext.state.get('tokens_used')
    };

    const metadataArtifact = {
      inlineData: {
        data: Buffer.from(JSON.stringify(responseMetadata)).toString('base64'),
        mimeType: 'application/json'
      }
    };

    await callbackContext.saveArtifact('response_metadata.json', metadataArtifact);

  } catch (error) {
    console.error('Failed to save response metadata:', error);
  }

  return undefined;
};
```

## ToolContext Access

The `ToolContext` extends `CallbackContext` with additional artifact management capabilities.

### Enhanced Methods

```typescript
class ToolContext extends CallbackContext {
  // Inherited from CallbackContext
  async loadArtifact(filename: string, version?: number): Promise<Part | undefined>
  async saveArtifact(filename: string, artifact: Part): Promise<number>

  // Additional tool-specific methods
  async listArtifacts(): Promise<string[]>
}
```

<Callout type="info" title="Artifact Deletion">
  The `deleteArtifact` method is not exposed through `ToolContext` for safety reasons. To delete artifacts, access the artifact service directly. See [Best Practices](/docs/framework/artifacts/best-practices#artifact-cleanup-and-deletion) for cleanup strategies.
</Callout>

### File Processing Tools

See focused, production-ready examples in the Recipes page:

* Upload → process → save results
* Generate media → save + reuse
* Cache expensive outputs

[Open recipes](/docs/framework/artifacts/recipes)

### Document Processing Tool

For end-to-end document handling examples, see the recipe collection:

* Text extraction (plain text)
* Simple summarization
* Format conversion

[Open recipes](/docs/framework/artifacts/recipes)

## Report Generation

See Recipes for JSON and CSV report generation with concise code.

[Open recipes](/docs/framework/artifacts/recipes)

## File Processing

See the end-to-end file processing flow in the Recipes page.

[Open recipes](/docs/framework/artifacts/recipes)

## Media Creation

See Recipes for a minimal SVG/image generation and save workflow.

[Open recipes](/docs/framework/artifacts/recipes)

<Callout type="info">
  Context integration provides a convenient abstraction over the artifact service, handling session scoping and error management automatically.
</Callout>

# Scoping & Versioning
URL: /docs/framework/artifacts/scoping-and-versioning

Session vs user namespaces and how artifact versions work

***

title: Scoping & Versioning
description: Session vs user namespaces and how artifact versions work
----------------------------------------------------------------------

## Scoping

Artifacts can be scoped to the current session or to the user across sessions. Use the `user:` filename prefix to switch to user scope.

```typescript
import type { CallbackContext } from '@iqai/adk';

export async function saveScopedArtifacts(ctx: CallbackContext) {
  const text = (s: string) => ({
    inlineData: { data: Buffer.from(s).toString('base64'), mimeType: 'text/plain' }
  });

  // Session-scoped: available only in this session
  await ctx.saveArtifact('summary.txt', text('session summary'));

  // User-scoped: available across all sessions for this user
  await ctx.saveArtifact('user:settings.json', {
    inlineData: {
      data: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      mimeType: 'application/json'
    }
  });
}
```

Loading works the same way — the prefix determines where the service looks:

```typescript
const latest = await ctx.loadArtifact('summary.txt'); // session scope
const userConfig = await ctx.loadArtifact('user:settings.json'); // user scope
```

## Versioning

Each save creates a new version starting at 0. Loading without a `version` parameter returns the latest.

```typescript
// v0
await ctx.saveArtifact('document.txt', {
  inlineData: { data: Buffer.from('A').toString('base64'), mimeType: 'text/plain' }
});

// v1
await ctx.saveArtifact('document.txt', {
  inlineData: { data: Buffer.from('B').toString('base64'), mimeType: 'text/plain' }
});

// Load specific version
const v0 = await ctx.loadArtifact('document.txt', 0);

// Load latest (v1)
const latestDoc = await ctx.loadArtifact('document.txt');
```

### Listing Versions

The `listVersions` method (on the service, not context) can be used to find all existing version numbers for an artifact. Contexts do not expose version listing.

```typescript
import { InMemoryArtifactService } from '@iqai/adk';

const artifactService = new InMemoryArtifactService();
// ... after saving some versions
const versions = await artifactService.listVersions({
  appName: 'my_app',
  userId: 'u1',
  sessionId: 's1',
  filename: 'document.txt'
});
// e.g., [0, 1, 2]
```

## Deletion

Deletion removes all versions of a filename in the current scope. The `deleteArtifact` method permanently removes the artifact and all its versions.

<Callout type="warning" title="Direct Service Access Required">
  The `deleteArtifact` method is not available through `CallbackContext` or `ToolContext` for safety reasons. You must access it directly through the artifact service instance.
</Callout>

### Basic Deletion

```typescript
import { InMemoryArtifactService } from '@iqai/adk';

const artifactService = new InMemoryArtifactService();

// Delete an artifact (removes all versions)
await artifactService.deleteArtifact({
  appName: 'my_app',
  userId: 'u1',
  sessionId: 's1',
  filename: 'document.txt'
});
```

### Deletion Behavior

* **All Versions Removed**: Deletion removes all versions of the artifact, not just the latest
* **Scope-Aware**: Deletion respects the artifact's scope (session or user namespace)
* **Irreversible**: Once deleted, artifacts cannot be recovered (unless you have backups)
* **No Context Access**: Must be called directly on the artifact service, not through contexts

# Service Implementations
URL: /docs/framework/artifacts/service-implementations

Different artifact service backends and their configurations for various deployment scenarios

***

title: Service Implementations
description: Different artifact service backends and their configurations for various deployment scenarios
----------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

The artifact system is built around the `BaseArtifactService` interface, which allows you to choose different storage backends based on your requirements. Each implementation offers different trade-offs between performance, persistence, and scalability.

## BaseArtifactService Interface

All artifact services implement the same core interface:

```typescript
import type { Part } from '@google/genai';

interface BaseArtifactService {
  saveArtifact(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    artifact: Part;
  }): Promise<number>;

  loadArtifact(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    version?: number;
  }): Promise<Part | null>;

  listArtifactKeys(args: {
    appName: string;
    userId: string;
    sessionId: string;
  }): Promise<string[]>;

  deleteArtifact(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
  }): Promise<void>;

  listVersions(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
  }): Promise<number[]>;
}
```

This consistent interface allows you to switch between implementations without changing your agent code.

<Callout type="warning" title="Artifact Deletion">
  The `deleteArtifact` method is available on all artifact service implementations but is intentionally not exposed through context objects (`CallbackContext` or `ToolContext`) for safety reasons. Access it directly through the artifact service instance. See [Best Practices](/docs/framework/artifacts/best-practices#artifact-cleanup-and-deletion) for cleanup strategies.
</Callout>

## InMemoryArtifactService

Fast, temporary storage for development and testing scenarios.

### Characteristics

* **Storage**: Artifacts stored in memory only
* **Persistence**: Data lost when process terminates
* **Performance**: Fastest access, no network latency
* **Scalability**: Limited by available RAM
* **Use Cases**: Development, testing, prototyping

### Setup and Configuration

```typescript
import { InMemoryArtifactService, Runner } from '@iqai/adk';

// Create the service (no configuration needed)
const artifactService = new InMemoryArtifactService();

// Use with Runner
const runner = new Runner({
  appName: "my_app",
  agent: myAgent,
  sessionService: mySessionService,
  artifactService
});
```

### Example Usage

```typescript
import { InMemoryArtifactService } from '@iqai/adk';

const artifactService = new InMemoryArtifactService();

// Save an artifact
const textArtifact = {
  inlineData: {
    data: Buffer.from('Hello, World!').toString('base64'),
    mimeType: 'text/plain'
  }
};

const version = await artifactService.saveArtifact({
  appName: 'test_app',
  userId: 'user123',
  sessionId: 'session456',
  filename: 'greeting.txt',
  artifact: textArtifact
});

console.log(`Saved version: ${version}`); // 0

// Load the artifact
const loaded = await artifactService.loadArtifact({
  appName: 'test_app',
  userId: 'user123',
  sessionId: 'session456',
  filename: 'greeting.txt'
});

if (loaded) {
  const text = Buffer.from(loaded.inlineData.data, 'base64').toString();
  console.log(`Loaded: ${text}`); // "Hello, World!"
}

// Delete an artifact when no longer needed
await artifactService.deleteArtifact({
  appName: 'test_app',
  userId: 'user123',
  sessionId: 'session456',
  filename: 'greeting.txt'
});
```

<Callout type="info">
  In-memory storage is great for development and tests. Data is lost on restart.
</Callout>

<Callout type="warning">
  Data stored in `InMemoryArtifactService` is lost when the process restarts. Use only for development and testing.
</Callout>

## GcsArtifactService

Production-ready artifact storage using Google Cloud Storage.

### Characteristics

* **Storage**: Google Cloud Storage buckets
* **Persistence**: Durable, replicated storage
* **Performance**: Network-dependent, highly optimized
* **Scalability**: Virtually unlimited
* **Use Cases**: Production deployments, large-scale applications

### Setup and Configuration

```typescript
import { GcsArtifactService, Runner } from '@iqai/adk';

// Basic configuration
const artifactService = new GcsArtifactService('my-artifacts-bucket');

// Use with Runner
const runner = new Runner({
  appName: "production_app",
  agent: myAgent,
  sessionService: mySessionService,
  artifactService
});
```

### Google Cloud Setup (concise)

```bash
# Create bucket
gsutil mb gs://my-artifacts-bucket

# Auth (choose one)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
gcloud auth application-default login

# Grant bucket permissions
gsutil iam ch serviceAccount:svc@project.iam.gserviceaccount.com:roles/storage.objectAdmin gs://my-artifacts-bucket
```

### Storage Structure

The GCS implementation organizes artifacts using a hierarchical structure:

```
my-artifacts-bucket/
├── app1/
│   ├── user123/
│   │   ├── session456/
│   │   │   ├── temp_file.txt/
│   │   │   │   ├── 0  (version 0)
│   │   │   │   └── 1  (version 1)
│   │   │   └── analysis.json/
│   │   │       └── 0
│   │   └── user/
│   │       └── user:profile.png/
│   │           ├── 0
│   │           └── 1
│   └── user456/
│       └── ...
└── app2/
    └── ...
```

### Example Usage

```typescript
import { GcsArtifactService } from '@iqai/adk';

const artifactService = new GcsArtifactService('my-artifacts-bucket');

// Save a large binary file
const imageData = Buffer.from(/* your image data */);
const imageArtifact = {
  inlineData: {
    data: imageData.toString('base64'),
    mimeType: 'image/png'
  }
};

try {
  const version = await artifactService.saveArtifact({
    appName: 'photo_app',
    userId: 'user789',
    sessionId: 'session123',
    filename: 'user:profile_picture.png',
    artifact: imageArtifact
  });

  console.log(`Image saved as version ${version}`);

  // List all artifact filenames for this user/session
  const artifactKeys = await artifactService.listArtifactKeys({
    appName: 'photo_app',
    userId: 'user789',
    sessionId: 'session123'
  });

  console.log('Available artifacts:', artifactKeys);
  // ['user:profile_picture.png', ...]

  // Delete an artifact when no longer needed
  await artifactService.deleteArtifact({
    appName: 'photo_app',
    userId: 'user789',
    sessionId: 'session123',
    filename: 'temp_thumbnail.png'
  });

} catch (error) {
  console.error('GCS operation failed:', error);
}
```

### Performance tips

* Batch saves with `Promise.all([...])`
* Prefer JSON/text compression when feasible
* Consider chunking for very large payloads

See Troubleshooting for common GCS and service wiring issues.

### Using StorageOptions

```typescript
import { GcsArtifactService } from '@iqai/adk';

const artifactService = new GcsArtifactService('my-artifacts-bucket', {
  projectId: 'my-project',
  keyFilename: '/path/to/key.json' // optional; or rely on ADC
});
```

<Callout type="info">
  The GCS service automatically handles retries for transient errors and provides built-in redundancy and durability.
</Callout>

## Custom Service Implementation

You can implement your own artifact service by extending the `BaseArtifactService` interface for specific requirements like database storage or caching layers.

## Service Selection Guide

Choose the appropriate artifact service based on your requirements:

### Development and Testing

* **Use**: `InMemoryArtifactService`
* **Reasons**: Fast, simple setup, no external dependencies
* **Limitations**: Data lost on restart

### Production Applications

* **Use**: `GcsArtifactService` or custom database service
* **Reasons**: Durable storage, scalability, backup/recovery
* **Considerations**: Network latency, cost, compliance requirements

### Hybrid Scenarios

* **Use**: Combination approach with caching
* **Implementation**: Database/GCS for persistence + Redis for caching
* **Benefits**: Fast access with durability

### Performance Comparison

| Service Type | Read Speed | Write Speed | Durability | Scalability | Setup Complexity |
| ------------ | ---------- | ----------- | ---------- | ----------- | ---------------- |
| InMemory     | Fastest    | Fastest     | None       | RAM-limited | Minimal          |
| GCS          | Fast       | Fast        | High       | Unlimited   | Moderate         |
| Database     | Moderate   | Moderate    | High       | High        | High             |
| Redis        | Very Fast  | Very Fast   | Moderate   | High        | Moderate         |

Choose based on your specific requirements for performance, durability, and operational complexity.

# Best Practices
URL: /docs/framework/artifacts/best-practices

Performance, security, versioning, and production considerations for artifact management

***

title: Best Practices
description: Performance, security, versioning, and production considerations for artifact management
-----------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

This guide covers essential best practices for using artifacts in production environments, focusing on performance optimization, security considerations, and operational excellence.

## Performance Optimization

### Caching Strategies

Keep a small in-process cache for hot artifacts.

```typescript
const cache = new Map<string, { part: Part; ts: number }>();
const TTL_MS = 5 * 60 * 1000;

async function loadWithCache(svc: BaseArtifactService, key: {
  appName: string; userId: string; sessionId: string; filename: string; version?: number
}): Promise<Part | null> {
  const k = `${key.appName}:${key.userId}:${key.sessionId}:${key.filename}:${key.version ?? 'latest'}`;
  const hit = cache.get(k);
  if (hit && Date.now() - hit.ts < TTL_MS) return hit.part;
  const part = await svc.loadArtifact(key);
  if (part) cache.set(k, { part, ts: Date.now() });
  return part;
}
```

### Batch Operations

```typescript
await Promise.all([
  svc.saveArtifact({ /* args1 */ }),
  svc.saveArtifact({ /* args2 */ }),
  svc.saveArtifact({ /* args3 */ })
]);
```

### Size Optimization

```typescript
// Compress text/JSON before saving
const json = JSON.stringify(someData);
const compact = json.replace(/\s+/g, ' ');

// Validate size (default 10MB)
const ok = Buffer.from(part.inlineData.data, 'base64').length <= 10 * 1024 * 1024;
```

## Security and Access Control

### Data Validation

```typescript
const ALLOWED = new Set(['text/plain','text/csv','application/json','image/png','image/jpeg','application/pdf']);
const MAX = 50 * 1024 * 1024;

function validatePart(filename: string, part: Part) {
  const errors: string[] = [], warnings: string[] = [];
  const mime = part.inlineData.mimeType;
  const size = Buffer.from(part.inlineData.data, 'base64').length;
  if (!ALLOWED.has(mime)) errors.push(`Unsupported MIME: ${mime}`);
  if (size > MAX) errors.push(`File too large: ${size}`);
  if (!/^[a-zA-Z0-9._-]+$/.test(filename.replace('user:', ''))) errors.push('Invalid filename');
  if (mime === 'application/json') {
    try { JSON.parse(Buffer.from(part.inlineData.data, 'base64').toString()); } catch { errors.push('Invalid JSON'); }
  }
  if (size === 0) warnings.push('Empty file');
  return { isValid: errors.length === 0, errors, warnings, size };
}
```

### Access Control Patterns

Implement proper access controls:

```typescript
class SecureArtifactService {
  constructor(
    private baseService: BaseArtifactService,
    private authService: AuthService
  ) {}

  async saveArtifact(
    args: {
      appName: string;
      userId: string;
      sessionId: string;
      filename: string;
      artifact: Part;
    },
    requestingUserId: string,
    permissions: string[]
  ): Promise<number> {
    // Verify user can save artifacts
    if (!permissions.includes('artifact:write')) {
      throw new Error('Insufficient permissions to save artifacts');
    }

    // Verify user can save to this location
    if (args.userId !== requestingUserId && !permissions.includes('artifact:admin')) {
      throw new Error('Cannot save artifacts for other users');
    }

    // Validate user namespace access
    if (args.filename.startsWith('user:') && args.userId !== requestingUserId) {
      throw new Error('Cannot save to user namespace of other users');
    }

    // Apply rate limiting
    await this.checkRateLimit(requestingUserId, 'save');

    return this.baseService.saveArtifact(args);
  }

  async loadArtifact(
    args: {
      appName: string;
      userId: string;
      sessionId: string;
      filename: string;
      version?: number;
    },
    requestingUserId: string,
    permissions: string[]
  ): Promise<Part | null> {
    // Verify user can read artifacts
    if (!permissions.includes('artifact:read')) 
      throw new Error('Insufficient permissions to read artifacts');
    }

    // Check if user can access this data
    const canAccess =
      args.userId === requestingUserId ||
      permissions.includes('artifact:admin') ||
      this.isSharedArtifact(args.filename);

    if (!canAccess) {
      throw new Error('Access denied to artifact');
    }

    return this.baseService.loadArtifact(args);
  }

  private async checkRateLimit(userId: string, operation: string): Promise<void> {
    // Implement rate limiting logic
    const key = `ratelimit:${userId}:${operation}`;
    const current = await this.getRateLimitCount(key);

    if (current > this.getRateLimit(operation)) {
      throw new Error('Rate limit exceeded');
    }

    await this.incrementRateLimit(key);
  }

  private isSharedArtifact(filename: string): boolean {
    // Define shared artifact patterns
    return filename.startsWith('shared:') || filename.startsWith('public:');
  }

  private getRateLimit(operation: string): number {
    const limits = {
      save: 100,  // 100 saves per hour
      load: 1000  // 1000 loads per hour
    };
    return limits[operation] || 10;
  }

  private async getRateLimitCount(key: string): Promise<number> {
    // Implementation depends on your rate limiting store (Redis, etc.)
    return 0;
  }

  private async incrementRateLimit(key: string): Promise<void> {
    // Implementation depends on your rate limiting store
  }
```

## Artifact Cleanup and Deletion

### Understanding deleteArtifact

For persistent storage like `GcsArtifactService`, artifacts remain until explicitly deleted. The `deleteArtifact` method allows you to remove artifacts and all their versions. This is a powerful operation that should be used carefully.

<Callout type="warning" title="Safety Consideration">
  The `deleteArtifact` method is intentionally not exposed through context objects (`CallbackContext` or `ToolContext`) for safety reasons. It must be accessed directly through the artifact service instance.
</Callout>

### When to Delete Artifacts

Consider implementing cleanup strategies when:

* **Temporary Data**: Artifacts represent temporary processing results that have a limited lifespan
* **Storage Costs**: Large artifacts accumulate and impact storage costs
* **Privacy Requirements**: User data must be deleted per retention policies or user requests
* **Session Cleanup**: Session-scoped artifacts should be cleaned up when sessions end

### Basic Deletion

```typescript
import { GcsArtifactService } from '@iqai/adk';

const artifactService = new GcsArtifactService('my-bucket');

// Delete a specific artifact (removes all versions)
await artifactService.deleteArtifact({
  appName: 'my_app',
  userId: 'user123',
  sessionId: 'session456',
  filename: 'temp_processing.csv'
});
```

### Cleanup Strategies

For persistent storage, implement cleanup strategies using `deleteArtifact`:

#### 1. GCS Lifecycle Policies

For `GcsArtifactService`, configure bucket lifecycle policies to automatically delete old artifacts:

```bash
# Set lifecycle policy to delete artifacts older than 90 days
gsutil lifecycle set lifecycle.json gs://my-artifacts-bucket
```

```json
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "Delete"},
        "condition": {"age": 90}
      }
    ]
  }
}
```

#### 2. Administrative Cleanup Tools

Build specific tools or administrative functions that utilize `deleteArtifact`:

```typescript
import { BaseArtifactService } from '@iqai/adk';

// Simple cleanup function for temporary artifacts
async function cleanupTemporaryArtifacts(
  artifactService: BaseArtifactService,
  appName: string,
  userId: string,
  sessionId: string
): Promise<void> {
  const artifacts = await artifactService.listArtifactKeys({
    appName,
    userId,
    sessionId
  });

  // Delete artifacts that start with 'temp_'
  for (const filename of artifacts) {
    if (filename.startsWith('temp_')) {
      try {
        await artifactService.deleteArtifact({
          appName,
          userId,
          sessionId,
          filename
        });
      } catch (error) {
        console.warn(`Failed to delete ${filename}:`, error);
      }
    }
  }
}
```

#### 3. Pattern-Based Deletion

Carefully manage filenames to allow pattern-based deletion:

```typescript
// Use consistent naming conventions for easy cleanup
const TEMP_PREFIX = 'temp_';
const CACHE_PREFIX = 'cache_';
const USER_DATA_PREFIX = 'user:';

async function cleanupByPattern(
  artifactService: BaseArtifactService,
  appName: string,
  userId: string,
  sessionId: string
) {
  const artifacts = await artifactService.listArtifactKeys({
    appName,
    userId,
    sessionId
  });

  // Delete all temporary artifacts
  const tempArtifacts = artifacts.filter(name => name.startsWith(TEMP_PREFIX));
  
  for (const filename of tempArtifacts) {
    await artifactService.deleteArtifact({
      appName,
      userId,
      sessionId,
      filename
    });
  }
}
```

#### 4. Scheduled Cleanup Jobs

Implement scheduled cleanup for production environments:

```typescript
import { BaseArtifactService } from '@iqai/adk';

class ScheduledArtifactCleanup {
  constructor(
    private artifactService: BaseArtifactService,
    private appName: string
  ) {}

  async runDailyCleanup(): Promise<void> {
    // This would typically be called by a cron job or scheduler
    console.log('Starting daily artifact cleanup...');

    // Get all users (implementation depends on your user management)
    const users = await this.getAllUsers();

    for (const userId of users) {
      try {
        // Clean up temporary artifacts older than 7 days
        await this.cleanupOldArtifacts(userId, 7);
      } catch (error) {
        console.error(`Cleanup failed for user ${userId}:`, error);
      }
    }

    console.log('Daily cleanup completed');
  }

  private async cleanupOldArtifacts(
    userId: string,
    daysOld: number
  ): Promise<void> {
    // Implementation would check artifact metadata/timestamps
    // and delete artifacts older than specified days
    // This is a simplified example
  }

  private async getAllUsers(): Promise<string[]> {
    // Implementation depends on your user management system
    return [];
  }
}
```

### Important Considerations

* **Irreversible Operation**: Deletion removes all versions of an artifact permanently
* **No Context Access**: `deleteArtifact` is not available through `CallbackContext` or `ToolContext` for safety
* **Direct Service Access**: Always access through the artifact service instance
* **Error Handling**: Implement proper error handling and logging for cleanup operations
* **Testing**: Test cleanup strategies thoroughly in staging before production deployment

## Version Management

### Cleanup Strategies

Implement automatic cleanup for old versions:

```typescript
class ArtifactVersionManager {
  constructor(private artifactService: BaseArtifactService) {}

  async cleanupOldVersions(
    appName: string,
    userId: string,
    sessionId: string,
    retentionPolicy: RetentionPolicy
  ): Promise<CleanupResult> {
    const artifacts = await this.artifactService.listArtifactKeys({
      appName,
      userId,
      sessionId
    });

    let totalDeleted = 0;
    const errors: string[] = [];

    for (const filename of artifacts) {
      try {
        const versions = await this.artifactService.listVersions({
          appName,
          userId,
          sessionId,
          filename
        });

        const versionsToDelete = this.selectVersionsForDeletion(
          versions,
          retentionPolicy
        );

        for (const version of versionsToDelete) {
          // Note: Current interface doesn't support version-specific deletion
          // This would need to be added to BaseArtifactService
          console.log(`Would delete ${filename} version ${version}`);
          totalDeleted++;
        }

      } catch (error) {
        errors.push(`Failed to cleanup ${filename}: ${error.message}`);
      }
    }

    return {
      artifactsProcessed: artifacts.length,
      versionsDeleted: totalDeleted,
      errors
    };
  }

  private selectVersionsForDeletion(
    versions: number[],
    policy: RetentionPolicy
  ): number[] {
    const sortedVersions = [...versions].sort((a, b) => b - a); // newest first

    switch (policy.strategy) {
      case 'keep_latest':
        return sortedVersions.slice(policy.count);

      case 'keep_recent':
        // Keep versions from the last N days (simplified)
        const cutoffVersion = sortedVersions[policy.count - 1] || 0;
        return versions.filter(v => v < cutoffVersion);

      case 'custom':
        return policy.customSelector(versions);

      default:
        return [];
    }
  }
}

interface RetentionPolicy {
  strategy: 'keep_latest' | 'keep_recent' | 'custom';
  count: number;
  customSelector?: (versions: number[]) => number[];
}

interface CleanupResult {
  artifactsProcessed: number;
  versionsDeleted: number;
  errors: string[];
}
```

### Backup Strategies

Implement backup and recovery for critical artifacts:

```typescript
class ArtifactBackupService {
  constructor(
    private primaryService: BaseArtifactService,
    private backupService: BaseArtifactService
  ) {}

  async saveWithBackup(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    artifact: Part;
  }): Promise<number> {
    // Save to primary storage
    const version = await this.primaryService.saveArtifact(args);

    // Async backup (don't wait for completion)
    this.backupArtifact(args, version).catch(error => {
      console.error('Backup failed:', error);
    });

    return version;
  }

  private async backupArtifact(
    args: {
      appName: string;
      userId: string;
      sessionId: string;
      filename: string;
      artifact: Part;
    },
    version: number
  ): Promise<void> {
    try {
      // Add backup metadata
      const backupArtifact = {
        ...args.artifact,
        inlineData: {
          ...args.artifact.inlineData,
          // Add backup metadata to MIME type
          mimeType: `${args.artifact.inlineData.mimeType}; backup=true; original-version=${version}`
        }
      };

      await this.backupService.saveArtifact({
        ...args,
        artifact: backupArtifact
      });

    } catch (error) {
      console.error('Failed to create backup:', error);
      throw error;
    }
  }

  async restoreFromBackup(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    version?: number;
  }): Promise<Part | null> {
    console.log('Attempting restore from backup...');

    try {
      const backup = await this.backupService.loadArtifact(args);

      if (backup) {
        // Remove backup metadata from MIME type
        const cleanArtifact = {
          ...backup,
          inlineData: {
            ...backup.inlineData,
            mimeType: backup.inlineData.mimeType.split(';')[0]
          }
        };

        // Restore to primary storage
        await this.primaryService.saveArtifact({
          ...args,
          artifact: cleanArtifact
        });

        return cleanArtifact;
      }

      return null;

    } catch (error) {
      console.error('Backup restore failed:', error);
      throw error;
    }
  }
}
```

## Error Handling and Resilience

### Retry Logic (simple backoff)

```typescript
async function withRetry<T>(op: () => Promise<T>, attempts = 3, base = 1000) {
  let last: unknown;
  for (let i = 0; i <= attempts; i++) {
    try { return await op(); } catch (e) {
      last = e; if (i === attempts) break;
      await new Promise(r => setTimeout(r, base * Math.pow(2, i)));
    }
  }
  throw last;
}
```

## Monitoring and Observability

### Metrics Collection

Track artifact usage and performance:

```typescript
class ArtifactMetricsCollector {
  private metrics = {
    saves: 0,
    loads: 0,
    errors: 0,
    totalSize: 0,
    averageSize: 0,
    operationTimes: [] as number[]
  };

  constructor(private artifactService: BaseArtifactService) {}

  async saveArtifactWithMetrics(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    artifact: Part;
  }): Promise<number> {
    const startTime = Date.now();

    try {
      const version = await this.artifactService.saveArtifact(args);

      // Record success metrics
      this.metrics.saves++;
      const size = Buffer.from(args.artifact.inlineData.data, 'base64').length;
      this.updateSizeMetrics(size);
      this.recordOperationTime(Date.now() - startTime);

      return version;

    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }

  async loadArtifactWithMetrics(args: {
    appName: string;
    userId: string;
    sessionId: string;
    filename: string;
    version?: number;
  }): Promise<Part | null> {
    const startTime = Date.now();

    try {
      const artifact = await this.artifactService.loadArtifact(args);

      // Record success metrics
      this.metrics.loads++;

      if (artifact) {
        const size = Buffer.from(artifact.inlineData.data, 'base64').length;
        this.updateSizeMetrics(size);
      }

      this.recordOperationTime(Date.now() - startTime);

      return artifact;

    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }

  private updateSizeMetrics(size: number): void {
    this.metrics.totalSize += size;
    const totalOps = this.metrics.saves + this.metrics.loads;
    this.metrics.averageSize = this.metrics.totalSize / totalOps;
  }

  private recordOperationTime(time: number): void {
    this.metrics.operationTimes.push(time);

    // Keep only last 1000 operations for memory efficiency
    if (this.metrics.operationTimes.length > 1000) {
      this.metrics.operationTimes = this.metrics.operationTimes.slice(-1000);
    }
  }

  getMetrics() {
    const times = this.metrics.operationTimes;

    return {
      ...this.metrics,
      averageOperationTime: times.length > 0
        ? times.reduce((a, b) => a + b, 0) / times.length
        : 0,
      p95OperationTime: times.length > 0
        ? times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)]
        : 0,
      errorRate: (this.metrics.errors / (this.metrics.saves + this.metrics.loads + this.metrics.errors)) * 100
    };
  }

  resetMetrics(): void {
    this.metrics = {
      saves: 0,
      loads: 0,
      errors: 0,
      totalSize: 0,
      averageSize: 0,
      operationTimes: []
    };
  }
}
```

## Production Deployment Checklist

### Infrastructure Setup

* **Storage Backend**: Choose appropriate service (GCS, S3, database)
* **Backup Strategy**: Implement automated backups
* **Monitoring**: Set up metrics and alerting
* **Security**: Configure proper access controls and encryption
* **Rate Limiting**: Implement rate limiting to prevent abuse

### Configuration

* **Size Limits**: Set appropriate file size limits
* **MIME Types**: Whitelist allowed file types
* **Retention Policies**: Configure version cleanup
* **Caching**: Implement caching layer for performance
* **Error Handling**: Add comprehensive error handling

### Operational Procedures

* **Monitoring Dashboard**: Set up artifact usage monitoring
* **Backup Verification**: Test backup and restore procedures
* **Incident Response**: Document artifact-related incident procedures
* **Capacity Planning**: Monitor storage growth and plan scaling
* **Security Audits**: Regular security reviews of artifact access

<Callout type="warning">
  Always test artifact operations thoroughly in staging environments before deploying to production.
</Callout>

# Troubleshooting
URL: /docs/framework/artifacts/troubleshooting

Common issues and quick fixes for artifact usage

***

title: Troubleshooting
description: Common issues and quick fixes for artifact usage
-------------------------------------------------------------

## "Artifact service is not initialized"

Ensure your `Runner` is constructed with an `artifactService`.

```typescript
import { Runner, InMemoryArtifactService, InMemorySessionService } from '@iqai/adk';

const runner = new Runner({
  appName: 'my_app',
  agent,
  sessionService: new InMemorySessionService(),
  artifactService: new InMemoryArtifactService(),
});
```

## Auto-save not working

* Set `withRunConfig({ saveInputBlobsAsArtifacts: true })` on your agent builder, or pass `RunConfig` per run
* Confirm incoming message parts use `inlineData` with base64 `data` and correct `mimeType`

## GCS permission/auth failures

* Verify ADC or service account credentials are available
* Check IAM roles: reader/writer on the bucket for your principal

## MIME/base64 pitfalls

* `inlineData.data` must be a base64 string, not raw bytes
* Always set an accurate `mimeType` (e.g., `application/json`, `image/png`)

## Loading returns null/undefined

* If the artifact or version doesn’t exist, `loadArtifact` returns no value
* Handle the nullish result before decoding the data

```typescript
const art = await ctx.loadArtifact('maybe_exists.txt');
if (!art) return { error: 'not found' };
const text = Buffer.from(art.inlineData.data, 'base64').toString('utf-8');
```

# Recipes
URL: /docs/framework/artifacts/recipes

Practical patterns for saving, loading, and transforming artifacts

***

title: Recipes
description: Practical patterns for saving, loading, and transforming artifacts
-------------------------------------------------------------------------------

## Upload → Process → Save Results

```typescript
import { createTool } from '@iqai/adk';
import * as z from 'zod';

export const analyzeCsv = createTool({
  name: 'analyze_csv',
  description: 'Analyze uploaded CSV',
  schema: z.object({ filename: z.string() }),
  fn: async ({ filename }, ctx) => {
    const files = await ctx.listArtifacts();
    if (!files.includes(filename)) return { error: 'File not found', files };

    const artifact = await ctx.loadArtifact(filename);
    if (!artifact?.inlineData) return { error: 'Could not load file' };

    const text = Buffer.from(artifact.inlineData.data, 'base64').toString('utf-8');
    const [header, ...rows] = text.split('\n').filter(Boolean);
    const headers = header.split(',').map(h => h.trim());

    const result = {
      summary: 'CSV analysis complete',
      rowCount: rows.length,
      columnCount: headers.length,
      headers
    };

    const resultArtifact = {
      inlineData: {
        data: Buffer.from(JSON.stringify(result, null, 2)).toString('base64'),
        mimeType: 'application/json'
      }
    };
    const out = `analysis_${filename.replace(/\.[^/.]+$/, '')}.json`;
    await ctx.saveArtifact(out, resultArtifact);
    return { output: out, ...result };
  }
});
```

## Generate Media → Save + Reuse

```typescript
import type { CallbackContext } from '@iqai/adk';

export async function generateSvg(ctx: CallbackContext) {
  const svg = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="black"/></svg>`;
  await ctx.saveArtifact('banner.svg', {
    inlineData: { data: Buffer.from(svg).toString('base64'), mimeType: 'image/svg+xml' }
  });

  // Later
  const loaded = await ctx.loadArtifact('banner.svg');
  if (loaded) {
    const svgText = Buffer.from(loaded.inlineData.data, 'base64').toString('utf-8');
    // Use svgText (serve to UI, embed in response, etc.)
  }
}
```

## Cache Expensive Binary Output

```typescript
import type { CallbackContext } from '@iqai/adk';

export async function cachedChart(ctx: CallbackContext) {
  const cacheKey = 'chart.png';
  const cached = await ctx.loadArtifact(cacheKey);
  if (cached) return { info: 'hit', cacheKey };

  const png = Buffer.from(/* expensive render */);
  await ctx.saveArtifact(cacheKey, {
    inlineData: { data: png.toString('base64'), mimeType: 'image/png' }
  });
  return { info: 'miss', cacheKey };
}
```

# Callbacks
URL: /docs/framework/callbacks

Observe, customize, and control agent behavior with powerful callback mechanisms

***

title: Callbacks
description: Observe, customize, and control agent behavior with powerful callback mechanisms
---------------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Callbacks are a cornerstone feature of ADK, providing a powerful mechanism to hook into an agent's execution process. They allow you to observe, customize, and even control the agent's behavior at specific, predefined points without modifying the core ADK framework code.

**What are they?** In essence, callbacks are standard functions that you define. You then associate these functions with an agent when you create it. The ADK framework automatically calls your functions at key stages, letting you observe or intervene. Think of it like checkpoints during the agent's process:

* **Before the agent starts its main work on a request, and after it finishes:** When you ask an agent to do something (e.g., answer a question), it runs its internal logic to figure out the response.
* The `Before Agent` callback executes *right before* this main work begins for that specific request.
* The `After Agent` callback executes *right after* the agent has finished all its steps for that request and has prepared the final result, but just before the result is returned.
* This "main work" encompasses the agent's *entire* process for handling that single request. This might involve deciding to call an LLM, actually calling the LLM, deciding to use a tool, using the tool, processing the results, and finally putting together the answer. These callbacks essentially wrap the whole sequence from receiving the input to producing the final output for that one interaction.
* **Before sending a request to, or after receiving a response from, the Large Language Model (LLM):** These callbacks (`Before Model`, `After Model`) allow you to inspect or modify the data going to and coming from the LLM specifically.
* **Before executing a tool (a function or another agent) or after it finishes:** Similarly, `Before Tool` and `After Tool` callbacks give you control points specifically around the execution of tools invoked by the agent.

<Mermaid
  chart="
flowchart TB
%% Top lane: Tools
subgraph T[Tools]
direction LR
BT[before_tool_callback] --> TL[Tools] --> AT[after_tool_callback]
end

%% Middle lane: Agent
A[before_agent_callback] --> AG[Agent] --> AA[after_agent_callback]

%% Bottom lane: Model
subgraph M[Model]
direction LR
BM[before_model_callback] --> ML[Model] --> AM[after_model_callback]
end

%% Cross-links from Agent to Tools/Model
AG -.-> TL
AG -.-> ML
"
/>

**Why use them?** Callbacks unlock significant flexibility and enable advanced agent capabilities:

* **Observe & Debug:** Log detailed information at critical steps for monitoring and troubleshooting.
* **Customize & Control:** Modify data flowing through the agent (like LLM requests or tool results) or even bypass certain steps entirely based on your logic.
* **Implement Guardrails:** Enforce safety rules, validate inputs/outputs, or prevent disallowed operations.
* **Manage State:** Read or dynamically update the agent's session state during execution.
* **Integrate & Enhance:** Trigger external actions (API calls, notifications) or add features like caching.

## How Callbacks Work

### Callback Registration

Callbacks are registered during agent creation:

```typescript
import { LlmAgent, CallbackContext, LlmRequest, LlmResponse } from '@iqai/adk';

// Define callback function
const beforeModelCallback = ({ callbackContext, llmRequest }: {
  callbackContext: CallbackContext;
  llmRequest: LlmRequest;
}): LlmResponse | null => {
  console.log(`Processing request for agent: ${callbackContext.agentName}`);

  // Return null to proceed normally
  // Return LlmResponse to skip LLM call
  return null;
};

// Create agent with callback
const agent = new LlmAgent({
  name: "callback_agent",
  model: "gemini-2.5-flash",
  description: "Agent with callbacks",
  instruction: "You are helpful",
  beforeModelCallback,
});
```

## The Callback Mechanism: Interception and Control

When the ADK framework reaches a callback point (for example, just before calling the LLM), it checks whether the agent was configured with a corresponding callback and, if so, executes it.

**Context is key:** Your callback receives a context object to understand and affect the current run:

* `CallbackContext` for agent/model-level callbacks
* `ToolContext` (extends `CallbackContext`) for tool callbacks

These include invocation/session info, a delta-aware `state`, and helper methods like `saveArtifact`, `loadArtifact`, `listArtifacts`, and `searchMemory`.

**Controlling the flow:** In TypeScript, the value you return determines whether ADK proceeds or overrides behavior. The exact “continue vs override” sentinel differs by callback kind:

1. Continue with default behavior

* before\_agent / after\_agent: return `undefined`
* before\_model / after\_model: return `null`
* before\_tool / after\_tool: return `null`

You can still mutate mutable inputs in-place (for example, tweak `llmRequest` in a before\_model callback or adjust `args` in a before\_tool callback) and then return the sentinel to proceed.

2. Override default behavior by returning a specific object

* before\_agent → return `Content` (from `@google/genai`) to skip the agent’s run and immediately reply.
* after\_agent → return `Content` to replace the agent’s produced reply.
* before\_model → return `LlmResponse` to skip the external LLM call (great for guardrails or caching).
* after\_model → return `LlmResponse` to replace the received LLM response.
* before\_tool → return `Record<string, any>` to skip actual tool execution and use this as the tool result.
* after\_tool → return `Record<string, any>` to replace the tool’s result before it’s sent back to the LLM.

Notes

* Agent callbacks are typed to return `Content | undefined`.
* Model callbacks are typed to return `LlmResponse | null | undefined`.
* Tool callbacks are typed to return `Record<string, any> | null | undefined`.
* All callbacks may be `async` and you can configure a single callback or an array; when multiple are provided, they’re invoked in order until one returns a non-sentinel value.

# Callback Types
URL: /docs/framework/callbacks/types

Understanding different types of callbacks and when each type fires in the agent lifecycle

***

title: Callback Types
description: Understanding different types of callbacks and when each type fires in the agent lifecycle
-------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

The framework provides different types of callbacks that trigger at various stages of an agent's execution. Understanding when each callback fires and what context it receives is key to using them effectively.

## Agent Lifecycle Callbacks

These callbacks are available on any agent that inherits from `BaseAgent` (including `LlmAgent`, `SequentialAgent`, `ParallelAgent`, `LoopAgent`, etc.).

### Before Agent Callback

**When:** Called immediately before the agent's `runAsyncImpl` method is executed. It runs after the agent's `InvocationContext` is created but before its core logic begins.

**Purpose:** Ideal for setting up resources or state needed only for this specific agent's run, performing validation checks on the session state, logging the entry point of the agent's activity, or potentially skipping the agent execution entirely.

**Signature:**

```typescript
type BeforeAgentCallback = (callbackContext: CallbackContext) => Promise<Content | undefined> | Content | undefined;
```

**Example:**

```typescript
import { LlmAgent, CallbackContext, Content } from '@iqai/adk';

const beforeAgentCallback = (callbackContext: CallbackContext): Content | undefined => {
  // Check if agent should be skipped
  const skipAgent = callbackContext.state.get('skip_agent');

  if (skipAgent) {
    // Return content to skip agent execution
    return {
      role: 'model',
      parts: [{ text: 'Agent execution was skipped based on state.' }]
    };
  }

  // Log agent start
  console.log(`Starting agent: ${callbackContext.agentName}`);

  return undefined; // Proceed with normal execution
};
```

<Callout type="info">
  **Gatekeeping Pattern:** `beforeAgentCallback` acts as a gatekeeper, allowing you to intercept execution before a major step and potentially prevent it based on checks like state, input validation, or permissions.
</Callout>

### After Agent Callback

**When:** Called immediately after the agent's `runAsyncImpl` method successfully completes. It does not run if the agent was skipped due to `beforeAgentCallback` returning content or if `endInvocation` was set during the agent's run.

**Purpose:** Useful for cleanup tasks, post-execution validation, logging the completion of an agent's activity, modifying final state, or augmenting/replacing the agent's final output.

**Signature:**

```typescript
type AfterAgentCallback = (callbackContext: CallbackContext) => Promise<Content | undefined> | Content | undefined;
```

**Example:**

```typescript
const afterAgentCallback = (callbackContext: CallbackContext): Content | undefined => {
  // Update completion count
  const count = callbackContext.state.get('completion_count') || 0;
  callbackContext.state.set('completion_count', count + 1);

  // Log completion
  console.log(`Agent ${callbackContext.agentName} completed. Total completions: ${count + 1}`);

  // Optionally modify the output
  const shouldAddNote = callbackContext.state.get('add_completion_note');
  if (shouldAddNote) {
    return {
      role: 'model',
      parts: [{ text: 'Task completed successfully with additional processing.' }]
    };
  }

  return undefined; // Use original output
};
```

<Callout type="info">
  **Post-Processing Pattern:** `afterAgentCallback` allows post-processing or modification. You can inspect the result of a step and decide whether to let it pass through, change it, or completely replace it.
</Callout>

## LLM Interaction Callbacks

These callbacks are specific to `LlmAgent` and provide hooks around the interaction with the Large Language Model.

### Before Model Callback

**When:** Called just before the `generateContentAsync` request is sent to the LLM within an `LlmAgent`'s flow.

**Purpose:** Allows inspection and modification of the request going to the LLM. Use cases include adding dynamic instructions, injecting few-shot examples based on state, modifying model config, implementing guardrails, or implementing request-level caching.

**Signature:**

```typescript
type BeforeModelCallback = ({
  callbackContext,
  llmRequest
}: {
  callbackContext: CallbackContext;
  llmRequest: LlmRequest;
}) => Promise<LlmResponse | undefined> | LlmResponse | undefined;
```

**Example:**

```typescript
import { LlmAgent, CallbackContext, LlmRequest, LlmResponse } from '@iqai/adk';

const beforeModelCallback = ({ callbackContext, llmRequest }: {
  callbackContext: CallbackContext;
  llmRequest: LlmRequest;
}): LlmResponse | undefined => {
  // Add user preferences to system instruction
  const userLang = callbackContext.state.get('user_language');
  if (userLang && llmRequest.config.systemInstruction) {
    const existingInstruction = llmRequest.config.systemInstruction.parts?.[0]?.text || '';
    llmRequest.config.systemInstruction.parts = [{
      text: `${existingInstruction}\n\nUser language preference: ${userLang}`
    }];
  }

  // Check for blocked content
  const lastContent = llmRequest.contents?.[llmRequest.contents.length - 1];
  const userMessage = lastContent?.parts?.[0]?.text || '';

  if (userMessage.toLowerCase().includes('blocked_keyword')) {
    // Return response to skip LLM call
    return new LlmResponse({
      content: {
        role: 'model',
        parts: [{ text: 'I cannot process requests containing blocked content.' }]
      }
    });
  }

  return undefined; // Proceed with LLM call
};
```

**Return Value Effect:**

* If the callback returns `undefined`, the LLM continues its normal workflow
* If the callback returns an `LlmResponse` object, the call to the LLM is **skipped** and the returned response is used directly

### After Model Callback

**When:** Called just after a response (`LlmResponse`) is received from the LLM, before it's processed further by the invoking agent.

**Purpose:** Allows inspection or modification of the raw LLM response. Use cases include logging model outputs, reformatting responses, censoring sensitive information generated by the model, parsing structured data from the LLM response and storing it in state, or handling specific error codes.

**Signature:**

```typescript
type AfterModelCallback = ({
  callbackContext,
  llmResponse
}: {
  callbackContext: CallbackContext;
  llmResponse: LlmResponse;
}) => Promise<LlmResponse | undefined> | LlmResponse | undefined;
```

**Example:**

````typescript
const afterModelCallback = ({ callbackContext, llmResponse }: {
  callbackContext: CallbackContext;
  llmResponse: LlmResponse;
}): LlmResponse | undefined => {
  // Log model response
  console.log(`LLM responded for agent: ${callbackContext.agentName}`);

  // Extract and save structured data
  const responseText = llmResponse.content?.parts?.[0]?.text || '';
  const jsonMatch = responseText.match(/```json\n(.*?)\n```/s);
  if (jsonMatch) {
    try {
      const data = JSON.parse(jsonMatch[1]);
      callbackContext.state.set('extracted_data', data);
    } catch (error) {
      console.warn('Failed to parse JSON from response:', error);
    }
  }

  // Add disclaimer if needed
  const addDisclaimer = callbackContext.state.get('add_disclaimer');
  if (addDisclaimer && llmResponse.content) {
    const modifiedResponse = { ...llmResponse };
    const originalText = modifiedResponse.content.parts?.[0]?.text || '';
    modifiedResponse.content.parts = [{
      text: `${originalText}\n\n*This response was generated by AI and should be verified.*`
    }];
    return modifiedResponse;
  }

  return undefined; // Use original response
};
````

## Tool Execution Callbacks

These callbacks are also specific to `LlmAgent` and trigger around the execution of tools (including `FunctionTool`, agent tools, etc.) that the LLM might request.

<Callout type="info">
  Status: Tool execution callbacks are implemented in the current TypeScript ADK. You can use them today to validate/modify arguments, short-circuit execution, and post-process tool results.
</Callout>

### Before Tool Callback

**When:** Called just before a specific tool's `runAsync` method is invoked, after the LLM has generated a function call for it.

**Purpose:** Allows inspection and modification of tool arguments, performing authorization checks before execution, logging tool usage attempts, or implementing tool-level caching.

**Signature:**

```typescript
type BeforeToolCallback = (
  tool: BaseTool,
  toolArgs: Record<string, any>,
  toolContext: ToolContext
) => Promise<Record<string, any> | undefined> | Record<string, any> | undefined;
```

**Example:**

```typescript
const beforeToolCallback: BeforeToolCallback = (tool, toolArgs, toolContext) => {
  // Check authentication
  const hasAuth = toolContext.state.get('api_token');
  if (!hasAuth) {
    // Return error result to skip tool execution
    return {
      error: 'Authentication required for this tool'
    };
  }

  // Log tool usage
  console.log(`Executing tool with function call ID: ${toolContext.functionCallId}`);

  // Validate arguments
  if (!toolArgs.query || toolArgs.query.length < 3) {
    return {
      error: 'Query must be at least 3 characters long'
    };
  }

  return undefined; // Proceed with tool execution
};
```

**Return Value Effect:**

1. If the callback returns `undefined`, the tool's `runAsync` method is executed with the (potentially modified) `toolArgs`
2. If a dictionary is returned, the tool's `runAsync` method is **skipped** and the returned dictionary is used directly as the tool result

### After Tool Callback

**When:** Called just after the tool's `runAsync` method completes successfully.

**Purpose:** Allows inspection and modification of the tool's result before it's sent back to the LLM. Useful for logging tool results, post-processing or formatting results, or saving specific parts of the result to the session state.

**Signature:**

```typescript
type AfterToolCallback = (
  tool: BaseTool,
  toolArgs: Record<string, any>,
  toolContext: ToolContext,
  toolResult: Record<string, any>
) => Promise<Record<string, any> | undefined> | Record<string, any> | undefined;
```

**Example:**

```typescript
const afterToolCallback: AfterToolCallback = (
  tool,
  toolArgs,
  toolContext,
  toolResult
) => {
  // Log tool result
  console.log(`Tool completed with function call ID: ${toolContext.functionCallId}`);

  // Save important data to state
  if (toolResult.transaction_id) {
    toolContext.state.set('last_transaction_id', toolResult.transaction_id);
  }

  // Filter sensitive information
  if (toolResult.api_key) {
    const filteredResult = { ...toolResult };
    delete filteredResult.api_key;
    return filteredResult;
  }

  return undefined; // Use original result
};
```

**Return Value Effect:**

1. If the callback returns `undefined`, the original `toolResult` is used
2. If a new dictionary is returned, it **replaces** the original `toolResult`

## Context Objects

Callbacks receive different context objects depending on their type:

### CallbackContext

Used in agent lifecycle and LLM interaction callbacks:

```typescript
class CallbackContext {
  // Invocation metadata
  readonly invocationId: string;
  readonly agentName: string;
  readonly appName: string;
  readonly userId: string;
  readonly sessionId: string;

  // State management (delta-aware)
  readonly state: State;

  // Artifact operations
  async loadArtifact(filename: string, version?: number): Promise<Part | undefined>;
  async saveArtifact(filename: string, artifact: Part): Promise<number>;

  // Event actions (for tracking changes)
  readonly eventActions: EventActions;
}
```

### ToolContext

Used in tool execution callbacks, extends CallbackContext:

```typescript
class ToolContext extends CallbackContext {
  // Tool-specific properties
  readonly functionCallId?: string;

  // Additional tool operations
  async listArtifacts(): Promise<string[]>;
  async searchMemory(query: string): Promise<SearchMemoryResponse>;

  // Action controls
  readonly actions: EventActions; // alias for eventActions
}
```

<Callout type="info">
  Always use the specific context type provided (`CallbackContext` for agent/model, `ToolContext` for tools) to ensure access to the appropriate methods and properties.
</Callout>

## Callback Arrays

All callback types support both single callbacks and arrays of callbacks:

```typescript
const agent = new LlmAgent({
  name: "multi_callback_agent",
  model: "gemini-2.5-flash",
  description: "Agent with multiple callbacks",
  instruction: "You are helpful",

  // Single callback
  beforeAgentCallback: singleBeforeCallback,

  // Array of callbacks (executed in order until one returns a value)
  afterAgentCallback: [
    firstAfterCallback,
    secondAfterCallback,
    thirdAfterCallback
  ]
});
```

When using callback arrays:

* Callbacks are executed in the order they appear in the array
* Execution stops when a callback returns a non-undefined value
* If all callbacks return undefined, normal execution continues

# Callback Patterns
URL: /docs/framework/callbacks/callback-patterns

Design patterns and best practices for agent, model, and tool callbacks in the TypeScript ADK

***

title: Callback Patterns
description: Design patterns and best practices for agent, model, and tool callbacks in the TypeScript ADK
----------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Callbacks give you precise control over the agent lifecycle, LLM requests/responses, and tool execution. This guide presents callback-centric patterns using the TypeScript ADK, with examples built around `AgentBuilder` and references to `CallbackContext` and `ToolContext`.

## Callback & Context Overview

* `CallbackContext` is passed to agent and model callbacks.
  * Key fields commonly used: `state` (mutable session state), `invocationId`, `agent` (current agent), `logger` (if configured).
* `ToolContext` is passed to tool callbacks.
  * Key fields commonly used: `state`, `invocationId`, `tool` (current tool), `logger`.

State writes inside callbacks are tracked and persisted by the `SessionService`. This makes it simple to pass information across the agent run.

<Callout>
  These examples use the TypeScript ADK API. Configure callbacks via `AgentBuilder` chain methods and rely on canonicalization to support single callbacks or arrays.
</Callout>

## Builder Setup

```ts
import { AgentBuilder } from '@iqai/adk';
import { BaseTool } from '@iqai/adk';

// Example tool (shape depends on your tool implementation)
const searchApi: BaseTool = /* ... */;

// Create builder using static method and chain configuration
const { agent, runner } = await AgentBuilder
  .create('context-patterns-agent')
  .withModel('<your-model-id>')
  .withTools(searchApi)
  .withBeforeAgentCallback(async (ctx) => {
    // Warm up state; skip agent run by returning Content if desired
    ctx.state['start_time'] = Date.now();
  })
  .withAfterAgentCallback(async (ctx) => {
    // Post-run logging or final content override by returning Content
    ctx.logger?.info?.(`Invocation ${ctx.invocationId} completed`);
  })
  .withBeforeModelCallback(async (ctx, req) => {
    // Inspect/mutate LLM request; optionally return a response to short-circuit
    if (ctx.state['block_llm'] === true) {
      // Returning a response here skips the LLM call
      return { contents: [{ type: 'text', text: 'LLM call blocked by policy.' }] };
    }

    // Example mutation: add system instruction dynamically
    req.config = {
      ...req.config,
      systemInstruction: `${req.config?.systemInstruction ?? ''}\nUser tier: ${ctx.state['user_tier'] ?? 'free'}`,
    };
    return req;
  })
  .withAfterModelCallback(async (ctx, res) => {
    // Modify/shape LLM response (e.g., trim text or add metadata)
    const first = res.contents?.[0];
    if (first?.type === 'text') {
      first.text = first.text.trim();
    }
    return res;
  })
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    // Validate or enrich tool args; return a result to short-circuit execution
    if (tool.name === 'searchApi' && typeof args.query !== 'string') {
      return { error: 'query must be a string' };
    }

    // Enrich args from shared state
    args.locale = toolCtx.state['locale'] ?? 'en';
  })
  .withAfterToolCallback(async (tool, args, toolCtx, result) => {
    // Persist useful values into state for later steps
    if (result && typeof result === 'object' && 'top_hit' in result) {
      toolCtx.state['last_top_hit'] = (result as { top_hit: any }).top_hit;
    }
    return result;
  })
  .build();

// Now you can use the agent and runner
export { agent, runner };
```

## Design Patterns

### 1. Guardrails & Policy Enforcement

* Use `withBeforeModelCallback` to inspect `req.contents` and block unsafe prompts by returning a response.
* Use `withBeforeToolCallback` to validate `call.args` and return an error result when needed.

```ts
builder
  .withBeforeModelCallback(async (ctx, req) => {
    const forbidden = ['forbidden-topic', 'profanity'];
    const text = (req.contents ?? [])
      .filter((c) => c.type === 'text')
      .map((c: { text: string }) => c.text)
      .join('\n');
    if (forbidden.some((k) => text.includes(k))) {
      return { contents: [{ type: 'text', text: 'Sorry, I can’t help with that.' }] };
    }
    return req;
  })
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    if (tool.name === 'transferFunds' && toolCtx.state['user_tier'] !== 'pro') {
      return { error: 'This operation requires a pro account.' };
    }
  });
```

### 2. Dynamic State Management

* Read/write `ctx.state` and `toolCtx.state` to carry data between steps.
* Changes are tracked automatically and persisted.

```ts
builder
  .withAfterToolCallback(async (tool, args, toolCtx, result) => {
    // Save transaction id for later use
    if (result && typeof result === 'object' && 'transaction_id' in result) {
      toolCtx.state['last_transaction_id'] = (result as { transaction_id: any }).transaction_id;
    }
    return result;
  })
  .withBeforeAgentCallback(async (ctx) => {
    // Personalize behavior based on prior state
    const tier = ctx.state['user_tier'] ?? 'free';
    ctx.logger?.info?.(`Running agent for tier: ${tier}`);
  });
```

### 3. Logging and Monitoring

* Add structured logs in `before/after` callbacks for observability.

```ts
builder
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    toolCtx.logger?.info?.(
      `Before Tool: ${tool.name} (invocation: ${toolCtx.invocationId}) args=${JSON.stringify(args)}`
    );
  })
  .withAfterModelCallback(async (ctx, res) => {
    ctx.logger?.info?.(`After Model: ${ctx.agent.name} (invocation: ${ctx.invocationId})`);
    return res;
  });
```

### 4. Caching

* Avoid redundant calls by checking a cache key in `state`.
* If found, return directly from a `before_` callback; otherwise, persist in the corresponding `after_` callback.

```ts
builder
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    const key = `cache:search:${args.query}`;
    const hit = toolCtx.state[key];
    if (hit) return hit; // short-circuit tool
  })
  .withAfterToolCallback(async (tool, args, toolCtx, result) => {
    const key = `cache:search:${args.query}`;
    toolCtx.state[key] = result;
    return result;
  });
```

### 5. Request/Response Modification

* Mutate the outgoing LLM request or the returned response to fit your UX.

```ts
builder
  .withBeforeModelCallback(async (ctx, req) => {
    req.config = {
      ...req.config,
      systemInstruction: `${req.config?.systemInstruction ?? ''}\nSession: ${ctx.invocationId}`,
    };
    return req;
  })
  .withAfterModelCallback(async (ctx, res) => {
    const contents = res.contents ?? [];
    res.contents = contents.map((c: { type: string; text?: string }) => (c.type === 'text' ? { ...c, text: c.text?.replaceAll('\n\n', '\n') } : c));
    return res;
  });
```

### 6. Conditional Skipping of Steps

* Return a value from a `before_` callback to skip the normal operation.

```ts
builder
  .withBeforeAgentCallback(async (ctx) => {
    if (ctx.state['maintenance_mode'] === true) {
      // Returning Content here completes the run immediately
      return [{ type: 'text', text: 'Agent is under maintenance.' }];
    }
  })
  .withBeforeModelCallback(async (ctx, req) => {
    if (ctx.state['use_cached_response']) {
      return { contents: [{ type: 'text', text: 'Cached response' }] };
    }
    return req;
  })
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    if (toolCtx.state['api_quota_exceeded']) {
      return { error: 'API quota exceeded' };
    }
  });
```

### 7. Tool-Specific Actions (Auth & Summarization Control)

* Implement per-tool behaviors like auth injection, summarization toggles, or rate-limiting.

```ts
builder
  .withBeforeToolCallback(async (tool, args, toolCtx) => {
    if (tool.name === 'searchApi') {
      args.headers = {
        ...(args.headers ?? {}),
        Authorization: `Bearer ${toolCtx.state['api_token'] ?? ''}`,
      };
    }
  })
  .withAfterToolCallback(async (tool, args, toolCtx, result) => {
    if (tool.name === 'searchApi' && toolCtx.state['summarize'] === true) {
      // Example: mark for summarization in subsequent steps
      toolCtx.state['needs_summary'] = true;
    }
    return result;
  });
```

## Best Practices

* Keep callbacks focused: one responsibility per callback.
* Prefer state keys with clear, stable naming (e.g., `cache:*`, `flags:*`).
* Use arrays of callbacks when you need strictly ordered operations.
* Log invocation IDs to correlate events across callbacks.
* Return from `before_` callbacks sparingly and with clear UX messaging.

## Troubleshooting

* If a callback isn't firing, confirm you built an agent with callbacks configured (`await builder.build()`).
* Check that your callbacks use the TypeScript ADK signatures and return types.
* Validate that state mutations use plain serializable values; avoid non-serializable objects.

# Context Management
URL: /docs/framework/context

Access execution state, services, and session information throughout agent operations

***

title: Context Management
description: Access execution state, services, and session information throughout agent operations
--------------------------------------------------------------------------------------------------

import { Cards, Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';

Context management provides agents and tools with access to execution state, services, and session information needed for effective operation. Context objects serve as the bridge between your code and the ADK framework.

## What is Context?

Context refers to the bundle of information available to agents, tools, and callbacks during execution. It provides access to session state, services, and execution details needed for intelligent decision-making.

<Callout type="info" title="Context as Bridge">
  Think of context as the bridge connecting your agent logic to the ADK framework - providing access to everything needed for intelligent agent behavior.
</Callout>

## Context Types

ADK provides specialized context objects tailored for different execution scenarios and security requirements.

<Cards>
  <Card title="ReadonlyContext" description="Safe read-only access to basic invocation information" href="/docs/framework/context/readonly-context" />

  <Card title="CallbackContext" description="State management and artifact operations for callbacks" href="/docs/framework/context/callback-context" />

  <Card title="ToolContext" description="Enhanced context for tool execution with memory and authentication" href="/docs/framework/context/tool-context" />

  <Card title="InvocationContext" description="Complete framework access for agent implementation" href="/docs/framework/context/invocation-context" />
</Cards>

## Core Capabilities

### State Management

* **Session State**: Read and modify session state across conversation turns
* **State Scoping**: Proper handling of session, user, app, and temporary state
* **Change Tracking**: Automatic tracking of state modifications through events

### Service Integration

* **Session Services**: Access to session and history management
* **Artifact Services**: File and binary data storage operations
* **Memory Services**: Long-term knowledge storage and retrieval

### Execution Control

* **Identity Tracking**: Know which agent is running and track invocation details
* **Flow Control**: Manage execution flow and lifecycle
* **Resource Management**: Handle external resources and cleanup

## Context Hierarchy

```typescript
ReadonlyContext
├── CallbackContext (extends ReadonlyContext)
│   └── ToolContext (extends CallbackContext)
└── InvocationContext (standalone, comprehensive)
```

* **ReadonlyContext**: Base class providing safe read-only access
* **CallbackContext**: Adds state management and artifact operations
* **ToolContext**: Extends with memory search and enhanced capabilities
* **InvocationContext**: Complete framework access for core agent implementation

## Basic Usage

### In Instruction Providers

```typescript
import { ReadonlyContext } from "@iqai/adk";

const dynamicInstruction = (ctx: ReadonlyContext): string => {
  const userState = ctx.state;
  return `You are helping user in session ${ctx.invocationId}. User context: ${JSON.stringify(userState)}`;
};
```

### In Function Tools

```typescript
import { FunctionTool, ToolContext } from "@iqai/adk";

function searchAndSave(params: { query: string }, toolContext: ToolContext) {
  // Search memory
  const memories = await toolContext.searchMemory(params.query);

  // Save to state
  toolContext.state.searchResults = memories;

  return { found: memories.memories?.length || 0 };
}

const searchTool = new FunctionTool(searchAndSave, {
  name: "search_and_save",
  description: "Search memory and save results to state"
});
```

### In Agent Implementation

```typescript
import { LlmAgent, InvocationContext } from "@iqai/adk";

class CustomAgent extends LlmAgent {
  protected async *runAsyncImpl(context: InvocationContext) {
    // Access all services and manage full execution flow
    const session = context.session;
    const memoryService = context.memoryService;

    // Your custom agent logic here
    yield* super.runAsyncImpl(context);
  }
}
```

## Common Patterns

### State Management

* Use appropriate state prefixes for scoping (`session.`, `user.`, `app.`, `temp.`)
* Leverage automatic change tracking in callback contexts
* Access read-only state safely in instruction providers

### Service Usage

* Handle service availability gracefully (services may be undefined)
* Implement proper error handling for service operations
* Use context-appropriate service access patterns

### Performance Considerations

* Use minimal context type needed for each operation
* Avoid accessing unnecessary context properties
* Implement efficient resource management patterns

## Best Practices

<Cards>
  <Card title="Context Patterns" description="Learn common patterns and best practices for context usage" href="/docs/framework/context/context-patterns" />
</Cards>

### Security

* Use ReadonlyContext for safe operations that don't need state modification
* Validate context access patterns in production environments
* Handle sensitive information appropriately through context layers

### Error Handling

* Check service availability before using context services
* Implement graceful degradation when services are unavailable
* Use proper error boundaries for context operations

### Debugging

* Use invocation IDs for request tracing and correlation
* Log context state at key execution points for development
* Monitor context usage patterns in production

## Related Topics

<Cards>
  <Card title="Agents" description="How agents use context for execution and state management" href="/docs/framework/agents" />

  <Card title="Sessions" description="Session state management through context objects" href="/docs/framework/sessions/session" />

  <Card title="Tools" description="Tool context usage for external system integration" href="/docs/framework/tools" />

  <Card title="Callbacks" description="Callback context for behavior customization" href="/docs/framework/callbacks" />
</Cards>

# ReadonlyContext
URL: /docs/framework/context/readonly-context

Safe read-only access to basic invocation information for instruction providers and monitoring

***

title: ReadonlyContext
description: Safe read-only access to basic invocation information for instruction providers and monitoring
-----------------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

ReadonlyContext provides safe, read-only access to invocation information without modification capabilities. It's designed for security-first scenarios where you need to observe execution state but shouldn't alter it.

## Overview

ReadonlyContext is the base context class that provides essential invocation information in a read-only format. It's primarily used for instruction providers, template rendering, and monitoring scenarios where safety is paramount.

```typescript
import { ReadonlyContext } from "@iqai/adk";
```

## Properties

### userContent

The original user message that started the current invocation.

```typescript
get userContent(): Content | undefined
```

<Callout type="info">
  Returns `undefined` if the invocation wasn't triggered by user content (e.g., system-initiated operations).
</Callout>

### invocationId

Unique identifier for the current invocation, useful for tracking and logging.

```typescript
get invocationId(): string
```

### agentName

Name of the agent currently executing within this context.

```typescript
get agentName(): string
```

### state

Read-only view of the current session state.

```typescript
get state(): Readonly<Record<string, any>>
```

The state object is frozen to prevent accidental modifications and returns a snapshot of the current session state.

## Common Use Cases

### Instruction Providers

ReadonlyContext is perfect for generating dynamic instructions based on current execution state:

```typescript
import { LlmAgent, ReadonlyContext } from "@iqai/adk";

const dynamicInstruction = (ctx: ReadonlyContext): string => {
  const userName = ctx.state.user?.name || "User";
  const sessionCount = ctx.state.sessionCount || 0;

  return `You are helping ${userName}. This is session #${sessionCount + 1}.
          Invocation ID: ${ctx.invocationId}`;
};

const agent = new LlmAgent({
  name: "adaptive-agent",
  description: "An agent with dynamic instructions",
  model: "gemini-2.5-flash",
  instruction: dynamicInstruction,
});
```

### Template Rendering

Use ReadonlyContext to render templates based on current state:

```typescript
function renderTemplate(ctx: ReadonlyContext): string {
  const template = `
Hello! I'm ${ctx.agentName}.
Current session state: ${JSON.stringify(ctx.state, null, 2)}
Processing invocation: ${ctx.invocationId}
  `;

  return template.trim();
}
```

### Monitoring and Logging

ReadonlyContext provides safe access for monitoring operations:

```typescript
function logInvocationInfo(ctx: ReadonlyContext): void {
  console.log(`[${ctx.invocationId}] Agent: ${ctx.agentName}`);
  console.log(`[${ctx.invocationId}] State keys:`, Object.keys(ctx.state));

  if (ctx.userContent) {
    const textParts = ctx.userContent.parts
      ?.filter(part => part.text)
      .map(part => part.text);
    console.log(`[${ctx.invocationId}] User message:`, textParts?.join(' '));
  }
}
```

## Security Benefits

### Immutable State Access

ReadonlyContext ensures that state cannot be accidentally modified:

```typescript
function safeStateAccess(ctx: ReadonlyContext) {
  // This works - reading state
  const userPreferences = ctx.state.preferences;

  // This would throw an error - state is frozen
  // ctx.state.newProperty = "value"; // TypeError: Cannot add property
}
```

### Prevention of Side Effects

By providing only read access, ReadonlyContext prevents unintended side effects in observation code:

```typescript
// Safe - no risk of modifying execution state
const analyzeState = (ctx: ReadonlyContext) => {
  return {
    agentName: ctx.agentName,
    stateSize: Object.keys(ctx.state).length,
    hasUserContent: !!ctx.userContent,
    invocationId: ctx.invocationId
  };
};
```

## Advanced Patterns

### Conditional Instruction Generation

Generate instructions based on state conditions:

```typescript
const conditionalInstruction = (ctx: ReadonlyContext): string => {
  const isFirstTime = !ctx.state.previousInteractions;
  const userLevel = ctx.state.userLevel || "beginner";

  if (isFirstTime) {
    return "Welcome! I'll provide detailed explanations as this is your first interaction.";
  }

  if (userLevel === "expert") {
    return "I'll provide concise, technical responses suitable for your expertise level.";
  }

  return "I'll adapt my responses based on our previous interactions.";
};
```

### State Validation for Instructions

Validate state before generating instructions:

```typescript
const validatedInstruction = (ctx: ReadonlyContext): string => {
  // Validate required state properties
  if (!ctx.state.userProfile) {
    return "Please set up your user profile first by sharing your preferences.";
  }

  if (!ctx.state.currentTask) {
    return "I'm ready to help! What would you like to work on?";
  }

  const task = ctx.state.currentTask;
  return `Continuing with your ${task.type} task: "${task.name}". How can I assist?`;
};
```

### Multi-Language Support

Use state information for localization:

```typescript
const localizedInstruction = (ctx: ReadonlyContext): string => {
  const language = ctx.state.userLanguage || "en";
  const userName = ctx.state.user?.name || "User";

  const greetings = {
    en: `Hello ${userName}! How can I help you today?`,
    es: `¡Hola ${userName}! ¿Cómo puedo ayudarte hoy?`,
    fr: `Bonjour ${userName}! Comment puis-je vous aider aujourd'hui?`,
  };

  return greetings[language] || greetings.en;
};
```

## Best Practices

### State Access Patterns

```typescript
// Good - Safe state access with fallbacks
const safeAccess = (ctx: ReadonlyContext) => {
  const userPrefs = ctx.state.preferences || {};
  const theme = userPrefs.theme || "default";
  return theme;
};

// Good - Check for property existence
const conditionalAccess = (ctx: ReadonlyContext) => {
  if ("activeTask" in ctx.state) {
    return `Working on: ${ctx.state.activeTask.name}`;
  }
  return "No active task";
};
```

### Error Handling

```typescript
const robustInstruction = (ctx: ReadonlyContext): string => {
  try {
    const config = ctx.state.agentConfig;
    if (!config) {
      return "I'm ready to help! Please let me know what you'd like to do.";
    }

    return `I'm configured for ${config.mode} mode. ${config.description}`;
  } catch (error) {
    console.warn("Error accessing state in instruction provider:", error);
    return "I'm here to help! What can I do for you?";
  }
};
```

### Performance Considerations

```typescript
// Good - Minimal state access
const efficientInstruction = (ctx: ReadonlyContext): string => {
  const { userLevel, currentMode } = ctx.state;
  return `Mode: ${currentMode || "standard"}, Level: ${userLevel || "intermediate"}`;
};

// Avoid - Expensive operations in instruction providers
const inefficientInstruction = (ctx: ReadonlyContext): string => {
  // Don't do complex processing in instruction providers
  const allStateKeys = Object.keys(ctx.state);
  const sortedKeys = allStateKeys.sort();
  const summary = sortedKeys.map(key => `${key}: ${ctx.state[key]}`).join(", ");
  return `Full state: ${summary}`;
};
```

## Limitations

ReadonlyContext intentionally provides limited functionality:

* **No State Modification**: Cannot change session state
* **No Service Access**: No access to artifact, memory, or session services
* **No Event Actions**: Cannot trigger actions or modify execution flow

For scenarios requiring these capabilities, use CallbackContext, ToolContext, or InvocationContext as appropriate.

## Related Contexts

* **CallbackContext**: When you need to modify state or manage artifacts
* **ToolContext**: For tool implementations requiring memory search and enhanced features
* **InvocationContext**: For complete framework access in agent implementations

# CallbackContext
URL: /docs/framework/context/callback-context

State management and artifact operations for agent lifecycle callbacks

***

title: CallbackContext
description: State management and artifact operations for agent lifecycle callbacks
-----------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

CallbackContext extends ReadonlyContext with state modification capabilities and artifact operations. It's designed for agent lifecycle callbacks where you need to manage state and handle file operations.

## Overview

CallbackContext provides mutable access to session state and artifact management capabilities. It automatically tracks state changes and integrates with the event system for proper state synchronization.

```typescript
import { CallbackContext } from "@iqai/adk";
```

## Key Features

* **Mutable State**: Read and write session state with automatic change tracking
* **Artifact Management**: Load and save artifacts with session integration
* **Event Integration**: Automatic state delta tracking through the event system
* **Inherited Properties**: All ReadonlyContext properties (userContent, invocationId, agentName)

## Properties

### state (Mutable)

Unlike ReadonlyContext, CallbackContext provides a mutable state object:

```typescript
get state(): State
```

The state object supports direct modification and automatically tracks changes:

```typescript
function updateUserPreferences(ctx: CallbackContext) {
  // Direct state modification - changes are tracked automatically
  ctx.state.userPreferences = {
    theme: "dark",
    language: "en",
    notifications: true
  };

  // Nested modifications also work
  ctx.state.user = ctx.state.user || {};
  ctx.state.user.lastActive = new Date().toISOString();
}
```

### eventActions

Access to the event actions for advanced state and flow control:

```typescript
get eventActions(): EventActions
```

This provides access to underlying event tracking and action management.

## Artifact Operations

### loadArtifact()

Loads an artifact attached to the current session:

```typescript
async loadArtifact(filename: string, version?: number): Promise<Part | undefined>
```

```typescript
async function processUserDocument(ctx: CallbackContext) {
  // Load the latest version of a document
  const document = await ctx.loadArtifact("user-document.pdf");

  if (document) {
    console.log("Document loaded successfully");
    // Process the document content
  }

  // Load a specific version
  const previousVersion = await ctx.loadArtifact("user-document.pdf", 2);
}
```

<Callout type="info">
  Requires an artifact service to be configured in the runner or agent setup.
</Callout>

### saveArtifact()

Saves an artifact and records it in the session:

```typescript
async saveArtifact(filename: string, artifact: Part): Promise<number>
```

```typescript
async function saveProcessedData(ctx: CallbackContext, data: any) {
  // Create an artifact part
  const artifactPart = {
    text: JSON.stringify(data, null, 2)
  };

  // Save the artifact
  const version = await ctx.saveArtifact("processed-data.json", artifactPart);

  // Update state with artifact reference
  ctx.state.lastProcessedData = {
    filename: "processed-data.json",
    version: version,
    timestamp: new Date().toISOString()
  };

  return version;
}
```

## Common Use Cases

### Pre-Processing Callbacks

Modify state before agent or model execution:

```typescript
async function preprocessCallback(ctx: CallbackContext) {
  // Add session metadata
  ctx.state.sessionStart = ctx.state.sessionStart || new Date().toISOString();
  ctx.state.requestCount = (ctx.state.requestCount || 0) + 1;

  // Load user context if available
  const userProfile = await ctx.loadArtifact("user-profile.json");
  if (userProfile && userProfile.text) {
    ctx.state.userContext = JSON.parse(userProfile.text);
  }

  // Set processing flags
  ctx.state.preprocessing = {
    completed: true,
    timestamp: new Date().toISOString()
  };
}
```

### Post-Processing Callbacks

Update state based on execution results:

```typescript
async function postprocessCallback(ctx: CallbackContext) {
  // Update interaction history
  const history = ctx.state.interactionHistory || [];
  history.push({
    invocationId: ctx.invocationId,
    agentName: ctx.agentName,
    timestamp: new Date().toISOString(),
    userContent: ctx.userContent
  });

  // Keep only last 10 interactions
  ctx.state.interactionHistory = history.slice(-10);

  // Save session summary
  const summary = {
    totalInteractions: history.length,
    lastAgent: ctx.agentName,
    lastUpdate: new Date().toISOString()
  };

  await ctx.saveArtifact("session-summary.json", {
    text: JSON.stringify(summary, null, 2)
  });
}
```

### Artifact Processing

Handle file uploads and processing:

```typescript
async function processUploadedFile(ctx: CallbackContext, filename: string) {
  // Load the uploaded file
  const file = await ctx.loadArtifact(filename);

  if (!file) {
    ctx.state.error = `File ${filename} not found`;
    return;
  }

  // Process based on file type
  let processedContent;
  if (filename.endsWith('.json')) {
    processedContent = JSON.parse(file.text || '{}');
  } else if (filename.endsWith('.txt')) {
    processedContent = {
      content: file.text,
      wordCount: file.text?.split(' ').length || 0
    };
  }

  // Save processed result
  const processedFilename = `processed-${filename}`;
  await ctx.saveArtifact(processedFilename, {
    text: JSON.stringify(processedContent, null, 2)
  });

  // Update state
  ctx.state.processedFiles = ctx.state.processedFiles || [];
  ctx.state.processedFiles.push({
    original: filename,
    processed: processedFilename,
    timestamp: new Date().toISOString()
  });
}
```

## State Management Patterns

### State Scoping

Use proper state prefixes for different scopes:

```typescript
function manageStateScopes(ctx: CallbackContext) {
  // Session-specific state (persists across agent calls)
  ctx.state.sessionData = { sessionId: "abc123" };

  // User-specific state (persists across sessions)
  ctx.state["user.preferences"] = { theme: "dark" };

  // App-specific state (shared across all users)
  ctx.state["app.config"] = { version: "1.0.0" };

  // Temporary state (cleared at session end)
  ctx.state["temp.processing"] = { status: "active" };
}
```

### Conditional State Updates

Update state based on conditions:

```typescript
async function conditionalStateUpdate(ctx: CallbackContext) {
  // Check if this is a new user
  if (!ctx.state.userInitialized) {
    ctx.state.userInitialized = true;
    ctx.state.userJoinDate = new Date().toISOString();

    // Save welcome artifact
    await ctx.saveArtifact("welcome-message.txt", {
      text: "Welcome to the system! This is your first interaction."
    });
  }

  // Update last seen
  ctx.state.lastSeen = new Date().toISOString();

  // Track user level progression
  const interactionCount = (ctx.state.interactionCount || 0) + 1;
  ctx.state.interactionCount = interactionCount;

  if (interactionCount === 5) {
    ctx.state.userLevel = "intermediate";
  } else if (interactionCount === 20) {
    ctx.state.userLevel = "advanced";
  }
}
```

### Error Handling and Recovery

Implement robust error handling for state operations:

```typescript
async function robustStateUpdate(ctx: CallbackContext) {
  try {
    // Attempt to load previous state
    const backup = await ctx.loadArtifact("state-backup.json");

    if (backup) {
      const backupState = JSON.parse(backup.text || '{}');
      // Merge with current state
      Object.assign(ctx.state, backupState);
    }

    // Perform operations
    ctx.state.operationStarted = new Date().toISOString();

    // Save new backup
    await ctx.saveArtifact("state-backup.json", {
      text: JSON.stringify(ctx.state, null, 2)
    });

  } catch (error) {
    console.error("Error in state update:", error);

    // Set error state
    ctx.state.lastError = {
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      invocationId: ctx.invocationId
    };
  }
}
```

## Advanced Patterns

### State Migration

Handle state schema changes:

```typescript
async function migrateState(ctx: CallbackContext) {
  const currentVersion = ctx.state.stateVersion || 1;

  if (currentVersion < 2) {
    // Migrate from v1 to v2
    if (ctx.state.oldUserData) {
      ctx.state.userData = {
        profile: ctx.state.oldUserData,
        migrated: true
      };
      delete ctx.state.oldUserData;
    }
    ctx.state.stateVersion = 2;
  }

  if (currentVersion < 3) {
    // Migrate from v2 to v3
    if (ctx.state.preferences) {
      ctx.state["user.preferences"] = ctx.state.preferences;
      delete ctx.state.preferences;
    }
    ctx.state.stateVersion = 3;
  }
}
```

### Batch Artifact Operations

Process multiple artifacts efficiently:

```typescript
async function processBatchArtifacts(ctx: CallbackContext, filenames: string[]) {
  const results = [];

  for (const filename of filenames) {
    try {
      const artifact = await ctx.loadArtifact(filename);
      if (artifact) {
        // Process artifact
        const processed = processArtifact(artifact);

        // Save processed version
        const processedName = `batch-${Date.now()}-${filename}`;
        await ctx.saveArtifact(processedName, processed);

        results.push({
          original: filename,
          processed: processedName,
          success: true
        });
      }
    } catch (error) {
      results.push({
        original: filename,
        error: error instanceof Error ? error.message : String(error),
        success: false
      });
    }
  }

  // Update state with batch results
  ctx.state.batchProcessing = {
    timestamp: new Date().toISOString(),
    results: results,
    totalProcessed: results.filter(r => r.success).length
  };
}

function processArtifact(artifact: any) {
  // Implementation depends on artifact type
  return {
    text: `Processed: ${artifact.text || 'No text content'}`
  };
}
```

## Best Practices

### State Consistency

```typescript
// Good - Atomic state updates
function atomicUpdate(ctx: CallbackContext) {
  const userData = ctx.state.userData || {};
  userData.lastUpdate = new Date().toISOString();
  userData.version = (userData.version || 0) + 1;
  ctx.state.userData = userData;
}

// Avoid - Partial state modifications that could leave inconsistent state
function inconsistentUpdate(ctx: CallbackContext) {
  ctx.state.userData.lastUpdate = new Date().toISOString();
  // If this fails, state is partially updated
  ctx.state.userData.version = (ctx.state.userData.version || 0) + 1;
}
```

### Error Recovery

```typescript
async function safeArtifactOperation(ctx: CallbackContext) {
  const originalState = JSON.stringify(ctx.state);

  try {
    // Perform operation
    const result = await ctx.loadArtifact("important-data.json");
    ctx.state.importantData = JSON.parse(result?.text || '{}');

  } catch (error) {
    // Restore original state on error
    Object.assign(ctx.state, JSON.parse(originalState));

    // Log error state
    ctx.state.lastError = {
      operation: "loadImportantData",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
  }
}
```

### Resource Management

```typescript
async function efficientArtifactManagement(ctx: CallbackContext) {
  // Check if artifact exists before loading
  const artifactList = ctx.state.availableArtifacts || [];

  if (artifactList.includes("user-data.json")) {
    const userData = await ctx.loadArtifact("user-data.json");
    // Process userData
  }

  // Clean up old artifacts
  const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  ctx.state.artifactCleanup = {
    lastRun: new Date().toISOString(),
    cutoffDate: cutoffDate.toISOString()
  };
}
```

## Related Contexts

* **ReadonlyContext**: For read-only access without state modification
* **ToolContext**: When you need memory search and enhanced tool capabilities
* **InvocationContext**: For complete framework access in agent implementations

# ToolContext
URL: /docs/framework/context/tool-context

Enhanced context for tool execution with memory search and artifact management

***

title: ToolContext
description: Enhanced context for tool execution with memory search and artifact management
-------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

ToolContext extends CallbackContext with additional capabilities specifically designed for tool implementations. It provides memory search, artifact listing, and enhanced event action management.

## Overview

ToolContext is the most capable context available for tool implementations, providing access to memory services, enhanced artifact operations, and function call tracking.

```typescript
import { ToolContext } from "@iqai/adk";
```

## Key Features

* **All CallbackContext Features**: Mutable state, artifact load/save operations
* **Memory Search**: Query long-term memory stores and knowledge bases
* **Artifact Listing**: Enumerate available artifacts in the session
* **Function Call Tracking**: Link tool executions to originating LLM function calls
* **Enhanced Event Actions**: Direct access to action management via `actions` property

## Properties

### functionCallId

Unique identifier linking this tool execution to the LLM function call:

```typescript
functionCallId?: string
```

This ID helps correlate tool responses with their originating function calls for debugging and event tracking.

### actions

Direct access to event actions for flow control:

```typescript
get actions(): EventActions
```

Provides convenient access to `eventActions` with a shorter property name.

## Enhanced Methods

### listArtifacts()

Lists all artifact filenames attached to the current session:

```typescript
async listArtifacts(): Promise<string[]>
```

```typescript
async function examineSessionArtifacts(toolContext: ToolContext) {
  const artifacts = await toolContext.listArtifacts();

  console.log(`Found ${artifacts.length} artifacts:`);
  artifacts.forEach(filename => {
    console.log(`- ${filename}`);
  });

  // Save artifact inventory to state
  toolContext.state.artifactInventory = {
    count: artifacts.length,
    files: artifacts,
    lastChecked: new Date().toISOString()
  };

  return artifacts;
}
```

### searchMemory()

Search the memory service for relevant information:

```typescript
async searchMemory(query: string): Promise<SearchMemoryResponse>
```

```typescript
async function findRelevantContext(toolContext: ToolContext, userQuery: string) {
  try {
    const memoryResults = await toolContext.searchMemory(userQuery);

    // Process search results
    const relevantMemories = memoryResults.memories || [];

    // Update state with findings
    toolContext.state.lastMemorySearch = {
      query: userQuery,
      resultCount: relevantMemories.length,
      timestamp: new Date().toISOString()
    };

    return relevantMemories;
  } catch (error) {
    console.error("Memory search failed:", error);
    toolContext.state.memorySearchError = {
      query: userQuery,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
    return [];
  }
}
```

<Callout type="info">
  Memory search requires a memory service to be configured in the runner or agent setup.
</Callout>

## Tool Implementation Patterns

### Basic Tool Structure

Most tools using ToolContext follow this pattern:

```typescript
import { BaseTool, ToolContext } from "@iqai/adk";

export class MyTool extends BaseTool {
  constructor() {
    super({
      name: "my_tool",
      description: "Example tool using ToolContext"
    });
  }

  async runAsync(args: any, context: ToolContext): Promise<any> {
    // Your tool implementation here
    return await this.processWithContext(args, context);
  }

  private async processWithContext(args: any, context: ToolContext) {
    // Use context features
    const artifacts = await context.listArtifacts();
    const memories = await context.searchMemory(args.query);

    // Update state
    context.state.toolExecution = {
      toolName: this.name,
      functionCallId: context.functionCallId,
      timestamp: new Date().toISOString()
    };

    return { success: true };
  }
}
```

### Memory-Enhanced Tool

Create tools that leverage memory for enhanced responses:

```typescript
import { FunctionTool, ToolContext } from "@iqai/adk";

async function researchTopic(
  params: { topic: string; depth: "basic" | "detailed" },
  toolContext: ToolContext
) {
  // Search memory for existing knowledge
  const existingKnowledge = await toolContext.searchMemory(params.topic);

  // Check for cached research
  const cacheKey = `research_${params.topic}_${params.depth}`;
  const cachedResearch = await toolContext.loadArtifact(`${cacheKey}.json`);

  if (cachedResearch) {
    toolContext.state.cacheHit = true;
    return JSON.parse(cachedResearch.text || '{}');
  }

  // Perform new research combining memory and external sources
  const research = {
    topic: params.topic,
    depth: params.depth,
    existingKnowledge: existingKnowledge.memories || [],
    newFindings: [], // Your research logic here
    timestamp: new Date().toISOString()
  };

  // Cache the results
  await toolContext.saveArtifact(`${cacheKey}.json`, {
    text: JSON.stringify(research, null, 2)
  });

  // Update search context in state
  toolContext.state.lastResearch = {
    topic: params.topic,
    knowledgeFound: existingKnowledge.memories?.length || 0,
    cached: false
  };

  return research;
}

const researchTool = new FunctionTool(researchTopic, {
  name: "research_topic",
  description: "Research a topic using memory and external sources"
});
```

### Artifact Processing Tool

Tools that work with multiple artifacts:

```typescript
async function processDocuments(
  params: { operation: "summarize" | "analyze" | "compare" },
  toolContext: ToolContext
) {
  // Get all available documents
  const allArtifacts = await toolContext.listArtifacts();
  const documents = allArtifacts.filter(name =>
    name.endsWith('.txt') || name.endsWith('.md') || name.endsWith('.json')
  );

  if (documents.length === 0) {
    return { error: "No documents found to process" };
  }

  const results = [];

  for (const docName of documents) {
    const document = await toolContext.loadArtifact(docName);
    if (!document?.text) continue;

    let result;
    switch (params.operation) {
      case "summarize":
        result = { summary: document.text.substring(0, 200) + "..." };
        break;
      case "analyze":
        result = {
          wordCount: document.text.split(' ').length,
          paragraphs: document.text.split('\n\n').length
        };
        break;
      case "compare":
        // Compare with memory knowledge
        const related = await toolContext.searchMemory(document.text.substring(0, 100));
        result = { relatedMemories: related.memories?.length || 0 };
        break;
    }

    results.push({
      document: docName,
      result: result
    });
  }

  // Save processing results
  const reportName = `processing_report_${Date.now()}.json`;
  await toolContext.saveArtifact(reportName, {
    text: JSON.stringify({
      operation: params.operation,
      processedDocuments: results,
      timestamp: new Date().toISOString()
    }, null, 2)
  });

  // Update state
  toolContext.state.lastProcessing = {
    operation: params.operation,
    documentsProcessed: results.length,
    reportFile: reportName
  };

  return {
    operation: params.operation,
    processedCount: results.length,
    results: results,
    reportFile: reportName
  };
}
```

## Event Action Management

### Flow Control Actions

ToolContext provides direct access to flow control through the `actions` property:

```typescript
async function smartExitTool(
  params: { condition: string },
  toolContext: ToolContext
) {
  // Check condition against memory and state
  const memoryCheck = await toolContext.searchMemory(params.condition);
  const stateCheck = toolContext.state.exitConditions?.[params.condition];

  if (memoryCheck.memories?.length > 0 || stateCheck) {
    // Exit the current loop/flow
    toolContext.actions.escalate = true;

    return {
      action: "exit",
      reason: "Condition met",
      condition: params.condition
    };
  }

  return {
    action: "continue",
    condition: params.condition,
    status: "not_met"
  };
}
```

### Agent Transfer

Tools can transfer control to other agents:

```typescript
async function intelligentTransfer(
  params: { userQuery: string },
  toolContext: ToolContext
) {
  // Search memory for best agent for this query
  const agentSuggestions = await toolContext.searchMemory(`agent for ${params.userQuery}`);

  // Analyze current state
  const currentAgent = toolContext.agentName;
  const userHistory = toolContext.state.userHistory || [];

  // Determine best agent based on memory and context
  let targetAgent = "general_assistant"; // default

  if (params.userQuery.includes("code")) {
    targetAgent = "code_assistant";
  } else if (params.userQuery.includes("research")) {
    targetAgent = "research_assistant";
  }

  // Transfer to the determined agent
  toolContext.actions.transferToAgent = targetAgent;

  // Update state with transfer info
  toolContext.state.lastTransfer = {
    from: currentAgent,
    to: targetAgent,
    reason: params.userQuery,
    timestamp: new Date().toISOString()
  };

  return {
    action: "transfer",
    fromAgent: currentAgent,
    toAgent: targetAgent,
    reason: "Specialized agent better suited for this query"
  };
}
```

## Advanced Use Cases

### Multi-Source Information Synthesis

Combine memory, artifacts, and state for comprehensive responses:

```typescript
async function synthesizeInformation(
  params: { topic: string },
  toolContext: ToolContext
) {
  // Gather information from all sources
  const [memories, artifacts, state] = await Promise.all([
    toolContext.searchMemory(params.topic),
    toolContext.listArtifacts(),
    Promise.resolve(toolContext.state)
  ]);

  // Load relevant artifacts
  const relevantArtifacts = artifacts.filter(name =>
    name.toLowerCase().includes(params.topic.toLowerCase())
  );

  const artifactContents = await Promise.all(
    relevantArtifacts.map(async name => ({
      name,
      content: await toolContext.loadArtifact(name)
    }))
  );

  // Synthesize information
  const synthesis = {
    topic: params.topic,
    sources: {
      memories: memories.memories?.length || 0,
      artifacts: artifactContents.length,
      stateReferences: Object.keys(state).filter(key =>
        key.toLowerCase().includes(params.topic.toLowerCase())
      ).length
    },
    summary: `Found information about ${params.topic} from multiple sources`,
    details: {
      memoryInsights: memories.memories?.slice(0, 3) || [],
      relevantFiles: relevantArtifacts,
      stateData: state[params.topic] || null
    }
  };

  // Save comprehensive report
  await toolContext.saveArtifact(`synthesis_${params.topic}_${Date.now()}.json`, {
    text: JSON.stringify(synthesis, null, 2)
  });

  return synthesis;
}
```

### Context-Aware Decision Making

Use all available context for intelligent decisions:

```typescript
async function makeContextualDecision(
  params: { decision: string; options: string[] },
  toolContext: ToolContext
) {
  // Gather contextual information
  const userHistory = toolContext.state.userHistory || [];
  const recentChoices = toolContext.state.recentChoices || [];
  const memoryGuidance = await toolContext.searchMemory(
    `decision ${params.decision} options ${params.options.join(' ')}`
  );

  // Analyze patterns
  const patterns = {
    userPreference: analyzeUserPreferences(userHistory, params.options),
    pastChoices: recentChoices.slice(-5),
    memoryInsights: memoryGuidance.memories || []
  };

  // Make intelligent choice
  const recommendedOption = patterns.userPreference || params.options[0];

  // Update decision history
  toolContext.state.recentChoices = [
    ...recentChoices.slice(-9), // Keep last 9
    {
      decision: params.decision,
      recommended: recommendedOption,
      timestamp: new Date().toISOString(),
      functionCallId: toolContext.functionCallId
    }
  ];

  return {
    decision: params.decision,
    recommended: recommendedOption,
    reasoning: patterns,
    confidence: calculateConfidence(patterns)
  };
}

function analyzeUserPreferences(history: any[], options: string[]): string | null {
  // Analyze user history to determine preferences
  // Implementation depends on your specific needs
  return null;
}

function calculateConfidence(patterns: any): number {
  // Calculate confidence score based on available patterns
  return 0.7; // Placeholder
}
```

## Best Practices

### Error Handling

```typescript
async function robustToolExecution(
  params: any,
  toolContext: ToolContext
) {
  try {
    // Attempt operations with fallbacks
    let result;

    try {
      const memories = await toolContext.searchMemory(params.query);
      result = processWithMemory(memories);
    } catch (memoryError) {
      console.warn("Memory search failed, using local processing:", memoryError);
      result = processLocally(params);
    }

    // Save successful result
    await toolContext.saveArtifact("operation_result.json", {
      text: JSON.stringify(result, null, 2)
    });

    return result;

  } catch (error) {
    // Log error and update state
    toolContext.state.lastError = {
      tool: "robustToolExecution",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      functionCallId: toolContext.functionCallId
    };

    return { error: "Operation failed", details: String(error) };
  }
}

function processWithMemory(memories: any) {
  // Implementation with memory results
  return { source: "memory", data: memories };
}

function processLocally(params: any) {
  // Fallback local processing
  return { source: "local", data: params };
}
```

### Resource Optimization

```typescript
async function optimizedToolExecution(
  params: any,
  toolContext: ToolContext
) {
  // Check cache first
  const cacheKey = `tool_cache_${JSON.stringify(params)}`;
  const cached = await toolContext.loadArtifact(cacheKey);

  if (cached) {
    toolContext.state.cacheHits = (toolContext.state.cacheHits || 0) + 1;
    return JSON.parse(cached.text || '{}');
  }

  // Batch operations when possible
  const [artifacts, memories] = await Promise.all([
    toolContext.listArtifacts(),
    toolContext.searchMemory(params.query || "")
  ]);

  // Process efficiently
  const result = {
    artifacts: artifacts.length,
    memories: memories.memories?.length || 0,
    processed: true
  };

  // Cache result
  await toolContext.saveArtifact(cacheKey, {
    text: JSON.stringify(result, null, 2)
  });

  return result;
}
```

## Related Contexts

* **CallbackContext**: Base class providing state management and artifact operations
* **ReadonlyContext**: For read-only access without modification capabilities
* **InvocationContext**: For complete framework access in agent implementations

# ToolContext
URL: /docs/framework/context/tool-context

Enhanced context for tool execution with memory search and artifact management

***

title: ToolContext
description: Enhanced context for tool execution with memory search and artifact management
-------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

ToolContext extends CallbackContext with additional capabilities specifically designed for tool implementations. It provides memory search, artifact listing, and enhanced event action management.

## Overview

ToolContext is the most capable context available for tool implementations, providing access to memory services, enhanced artifact operations, and function call tracking.

```typescript
import { ToolContext } from "@iqai/adk";
```

## Key Features

* **All CallbackContext Features**: Mutable state, artifact load/save operations
* **Memory Search**: Query long-term memory stores and knowledge bases
* **Artifact Listing**: Enumerate available artifacts in the session
* **Function Call Tracking**: Link tool executions to originating LLM function calls
* **Enhanced Event Actions**: Direct access to action management via `actions` property

## Properties

### functionCallId

Unique identifier linking this tool execution to the LLM function call:

```typescript
functionCallId?: string
```

This ID helps correlate tool responses with their originating function calls for debugging and event tracking.

### actions

Direct access to event actions for flow control:

```typescript
get actions(): EventActions
```

Provides convenient access to `eventActions` with a shorter property name.

## Enhanced Methods

### listArtifacts()

Lists all artifact filenames attached to the current session:

```typescript
async listArtifacts(): Promise<string[]>
```

```typescript
async function examineSessionArtifacts(toolContext: ToolContext) {
  const artifacts = await toolContext.listArtifacts();

  console.log(`Found ${artifacts.length} artifacts:`);
  artifacts.forEach(filename => {
    console.log(`- ${filename}`);
  });

  // Save artifact inventory to state
  toolContext.state.artifactInventory = {
    count: artifacts.length,
    files: artifacts,
    lastChecked: new Date().toISOString()
  };

  return artifacts;
}
```

### searchMemory()

Search the memory service for relevant information:

```typescript
async searchMemory(query: string): Promise<SearchMemoryResponse>
```

```typescript
async function findRelevantContext(toolContext: ToolContext, userQuery: string) {
  try {
    const memoryResults = await toolContext.searchMemory(userQuery);

    // Process search results
    const relevantMemories = memoryResults.memories || [];

    // Update state with findings
    toolContext.state.lastMemorySearch = {
      query: userQuery,
      resultCount: relevantMemories.length,
      timestamp: new Date().toISOString()
    };

    return relevantMemories;
  } catch (error) {
    console.error("Memory search failed:", error);
    toolContext.state.memorySearchError = {
      query: userQuery,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
    return [];
  }
}
```

<Callout type="info">
  Memory search requires a memory service to be configured in the runner or agent setup.
</Callout>

## Tool Implementation Patterns

### Basic Tool Structure

Most tools using ToolContext follow this pattern:

```typescript
import { BaseTool, ToolContext } from "@iqai/adk";

export class MyTool extends BaseTool {
  constructor() {
    super({
      name: "my_tool",
      description: "Example tool using ToolContext"
    });
  }

  async runAsync(args: any, context: ToolContext): Promise<any> {
    // Your tool implementation here
    return await this.processWithContext(args, context);
  }

  private async processWithContext(args: any, context: ToolContext) {
    // Use context features
    const artifacts = await context.listArtifacts();
    const memories = await context.searchMemory(args.query);

    // Update state
    context.state.toolExecution = {
      toolName: this.name,
      functionCallId: context.functionCallId,
      timestamp: new Date().toISOString()
    };

    return { success: true };
  }
}
```

### Memory-Enhanced Tool

Create tools that leverage memory for enhanced responses:

```typescript
import { FunctionTool, ToolContext } from "@iqai/adk";

async function researchTopic(
  params: { topic: string; depth: "basic" | "detailed" },
  toolContext: ToolContext
) {
  // Search memory for existing knowledge
  const existingKnowledge = await toolContext.searchMemory(params.topic);

  // Check for cached research
  const cacheKey = `research_${params.topic}_${params.depth}`;
  const cachedResearch = await toolContext.loadArtifact(`${cacheKey}.json`);

  if (cachedResearch) {
    toolContext.state.cacheHit = true;
    return JSON.parse(cachedResearch.text || '{}');
  }

  // Perform new research combining memory and external sources
  const research = {
    topic: params.topic,
    depth: params.depth,
    existingKnowledge: existingKnowledge.memories || [],
    newFindings: [], // Your research logic here
    timestamp: new Date().toISOString()
  };

  // Cache the results
  await toolContext.saveArtifact(`${cacheKey}.json`, {
    text: JSON.stringify(research, null, 2)
  });

  // Update search context in state
  toolContext.state.lastResearch = {
    topic: params.topic,
    knowledgeFound: existingKnowledge.memories?.length || 0,
    cached: false
  };

  return research;
}

const researchTool = new FunctionTool(researchTopic, {
  name: "research_topic",
  description: "Research a topic using memory and external sources"
});
```

### Artifact Processing Tool

Tools that work with multiple artifacts:

```typescript
async function processDocuments(
  params: { operation: "summarize" | "analyze" | "compare" },
  toolContext: ToolContext
) {
  // Get all available documents
  const allArtifacts = await toolContext.listArtifacts();
  const documents = allArtifacts.filter(name =>
    name.endsWith('.txt') || name.endsWith('.md') || name.endsWith('.json')
  );

  if (documents.length === 0) {
    return { error: "No documents found to process" };
  }

  const results = [];

  for (const docName of documents) {
    const document = await toolContext.loadArtifact(docName);
    if (!document?.text) continue;

    let result;
    switch (params.operation) {
      case "summarize":
        result = { summary: document.text.substring(0, 200) + "..." };
        break;
      case "analyze":
        result = {
          wordCount: document.text.split(' ').length,
          paragraphs: document.text.split('\n\n').length
        };
        break;
      case "compare":
        // Compare with memory knowledge
        const related = await toolContext.searchMemory(document.text.substring(0, 100));
        result = { relatedMemories: related.memories?.length || 0 };
        break;
    }

    results.push({
      document: docName,
      result: result
    });
  }

  // Save processing results
  const reportName = `processing_report_${Date.now()}.json`;
  await toolContext.saveArtifact(reportName, {
    text: JSON.stringify({
      operation: params.operation,
      processedDocuments: results,
      timestamp: new Date().toISOString()
    }, null, 2)
  });

  // Update state
  toolContext.state.lastProcessing = {
    operation: params.operation,
    documentsProcessed: results.length,
    reportFile: reportName
  };

  return {
    operation: params.operation,
    processedCount: results.length,
    results: results,
    reportFile: reportName
  };
}
```

## Event Action Management

### Flow Control Actions

ToolContext provides direct access to flow control through the `actions` property:

```typescript
async function smartExitTool(
  params: { condition: string },
  toolContext: ToolContext
) {
  // Check condition against memory and state
  const memoryCheck = await toolContext.searchMemory(params.condition);
  const stateCheck = toolContext.state.exitConditions?.[params.condition];

  if (memoryCheck.memories?.length > 0 || stateCheck) {
    // Exit the current loop/flow
    toolContext.actions.escalate = true;

    return {
      action: "exit",
      reason: "Condition met",
      condition: params.condition
    };
  }

  return {
    action: "continue",
    condition: params.condition,
    status: "not_met"
  };
}
```

### Agent Transfer

Tools can transfer control to other agents:

```typescript
async function intelligentTransfer(
  params: { userQuery: string },
  toolContext: ToolContext
) {
  // Search memory for best agent for this query
  const agentSuggestions = await toolContext.searchMemory(`agent for ${params.userQuery}`);

  // Analyze current state
  const currentAgent = toolContext.agentName;
  const userHistory = toolContext.state.userHistory || [];

  // Determine best agent based on memory and context
  let targetAgent = "general_assistant"; // default

  if (params.userQuery.includes("code")) {
    targetAgent = "code_assistant";
  } else if (params.userQuery.includes("research")) {
    targetAgent = "research_assistant";
  }

  // Transfer to the determined agent
  toolContext.actions.transferToAgent = targetAgent;

  // Update state with transfer info
  toolContext.state.lastTransfer = {
    from: currentAgent,
    to: targetAgent,
    reason: params.userQuery,
    timestamp: new Date().toISOString()
  };

  return {
    action: "transfer",
    fromAgent: currentAgent,
    toAgent: targetAgent,
    reason: "Specialized agent better suited for this query"
  };
}
```

## Advanced Use Cases

### Multi-Source Information Synthesis

Combine memory, artifacts, and state for comprehensive responses:

```typescript
async function synthesizeInformation(
  params: { topic: string },
  toolContext: ToolContext
) {
  // Gather information from all sources
  const [memories, artifacts, state] = await Promise.all([
    toolContext.searchMemory(params.topic),
    toolContext.listArtifacts(),
    Promise.resolve(toolContext.state)
  ]);

  // Load relevant artifacts
  const relevantArtifacts = artifacts.filter(name =>
    name.toLowerCase().includes(params.topic.toLowerCase())
  );

  const artifactContents = await Promise.all(
    relevantArtifacts.map(async name => ({
      name,
      content: await toolContext.loadArtifact(name)
    }))
  );

  // Synthesize information
  const synthesis = {
    topic: params.topic,
    sources: {
      memories: memories.memories?.length || 0,
      artifacts: artifactContents.length,
      stateReferences: Object.keys(state).filter(key =>
        key.toLowerCase().includes(params.topic.toLowerCase())
      ).length
    },
    summary: `Found information about ${params.topic} from multiple sources`,
    details: {
      memoryInsights: memories.memories?.slice(0, 3) || [],
      relevantFiles: relevantArtifacts,
      stateData: state[params.topic] || null
    }
  };

  // Save comprehensive report
  await toolContext.saveArtifact(`synthesis_${params.topic}_${Date.now()}.json`, {
    text: JSON.stringify(synthesis, null, 2)
  });

  return synthesis;
}
```

### Context-Aware Decision Making

Use all available context for intelligent decisions:

```typescript
async function makeContextualDecision(
  params: { decision: string; options: string[] },
  toolContext: ToolContext
) {
  // Gather contextual information
  const userHistory = toolContext.state.userHistory || [];
  const recentChoices = toolContext.state.recentChoices || [];
  const memoryGuidance = await toolContext.searchMemory(
    `decision ${params.decision} options ${params.options.join(' ')}`
  );

  // Analyze patterns
  const patterns = {
    userPreference: analyzeUserPreferences(userHistory, params.options),
    pastChoices: recentChoices.slice(-5),
    memoryInsights: memoryGuidance.memories || []
  };

  // Make intelligent choice
  const recommendedOption = patterns.userPreference || params.options[0];

  // Update decision history
  toolContext.state.recentChoices = [
    ...recentChoices.slice(-9), // Keep last 9
    {
      decision: params.decision,
      recommended: recommendedOption,
      timestamp: new Date().toISOString(),
      functionCallId: toolContext.functionCallId
    }
  ];

  return {
    decision: params.decision,
    recommended: recommendedOption,
    reasoning: patterns,
    confidence: calculateConfidence(patterns)
  };
}

function analyzeUserPreferences(history: any[], options: string[]): string | null {
  // Analyze user history to determine preferences
  // Implementation depends on your specific needs
  return null;
}

function calculateConfidence(patterns: any): number {
  // Calculate confidence score based on available patterns
  return 0.7; // Placeholder
}
```

## Best Practices

### Error Handling

```typescript
async function robustToolExecution(
  params: any,
  toolContext: ToolContext
) {
  try {
    // Attempt operations with fallbacks
    let result;

    try {
      const memories = await toolContext.searchMemory(params.query);
      result = processWithMemory(memories);
    } catch (memoryError) {
      console.warn("Memory search failed, using local processing:", memoryError);
      result = processLocally(params);
    }

    // Save successful result
    await toolContext.saveArtifact("operation_result.json", {
      text: JSON.stringify(result, null, 2)
    });

    return result;

  } catch (error) {
    // Log error and update state
    toolContext.state.lastError = {
      tool: "robustToolExecution",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      functionCallId: toolContext.functionCallId
    };

    return { error: "Operation failed", details: String(error) };
  }
}

function processWithMemory(memories: any) {
  // Implementation with memory results
  return { source: "memory", data: memories };
}

function processLocally(params: any) {
  // Fallback local processing
  return { source: "local", data: params };
}
```

### Resource Optimization

```typescript
async function optimizedToolExecution(
  params: any,
  toolContext: ToolContext
) {
  // Check cache first
  const cacheKey = `tool_cache_${JSON.stringify(params)}`;
  const cached = await toolContext.loadArtifact(cacheKey);

  if (cached) {
    toolContext.state.cacheHits = (toolContext.state.cacheHits || 0) + 1;
    return JSON.parse(cached.text || '{}');
  }

  // Batch operations when possible
  const [artifacts, memories] = await Promise.all([
    toolContext.listArtifacts(),
    toolContext.searchMemory(params.query || "")
  ]);

  // Process efficiently
  const result = {
    artifacts: artifacts.length,
    memories: memories.memories?.length || 0,
    processed: true
  };

  // Cache result
  await toolContext.saveArtifact(cacheKey, {
    text: JSON.stringify(result, null, 2)
  });

  return result;
}
```

## Related Contexts

* **CallbackContext**: Base class providing state management and artifact operations
* **ReadonlyContext**: For read-only access without modification capabilities
* **InvocationContext**: For complete framework access in agent implementations

# Context Patterns
URL: /docs/framework/context/context-patterns

Best practices and common patterns for using context objects effectively

***

title: Context Patterns
description: Best practices and common patterns for using context objects effectively
-------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';

Learn common patterns and best practices for effective context usage across different scenarios in ADK applications.

## Security Patterns

### Context Selection by Use Case

Choose the right context type based on your security and functionality requirements:

```typescript
// Read-only instruction generation - use ReadonlyContext
const safeInstruction = (ctx: ReadonlyContext): string => {
  return `Hello ${ctx.state.user?.name || "User"}! Session: ${ctx.invocationId}`;
};

// State modification in callbacks - use CallbackContext
async function updateUserState(ctx: CallbackContext) {
  ctx.state.lastActive = new Date().toISOString();
  await ctx.saveArtifact("activity.json", { text: "User active" });
}

// Tool with memory access - use ToolContext
async function smartTool(params: any, ctx: ToolContext) {
  const memories = await ctx.searchMemory(params.query);
  ctx.state.lastSearch = memories;
  return { found: memories.memories?.length || 0 };
}

// Full agent implementation - use InvocationContext
export class SecureAgent extends BaseAgent {
  protected async *runAsyncImpl(ctx: InvocationContext) {
    // Full framework access with all services
    yield* this.processSecurely(ctx);
  }
}
```

### Principle of Least Privilege

Use the minimal context type that provides the required functionality:

```typescript
// Good - ReadonlyContext for safe read operations
function analyzeState(ctx: ReadonlyContext) {
  return {
    userCount: Object.keys(ctx.state).filter(k => k.startsWith('user.')).length,
    sessionAge: Date.now() - (ctx.state.sessionStart || Date.now())
  };
}

// Avoid - ToolContext when you only need to read state
function badAnalyzeState(ctx: ToolContext) {
  // Unnecessarily powerful context for read-only operation
  return { userCount: 1 };
}
```

## State Management Patterns

### State Scoping Strategy

Organize state using consistent scoping patterns:

```typescript
function manageStateScopes(ctx: CallbackContext) {
  // Session-specific (cleared when session ends)
  ctx.state.currentTask = "processing";
  ctx.state.sessionProgress = 0.5;

  // User-specific (persists across sessions)
  ctx.state["user.preferences"] = { theme: "dark", language: "en" };
  ctx.state["user.profile"] = { name: "John", level: "expert" };

  // App-specific (shared across all users)
  ctx.state["app.version"] = "1.2.0";
  ctx.state["app.features"] = ["feature1", "feature2"];

  // Temporary (explicitly cleaned up)
  ctx.state["temp.processing"] = { status: "active", startTime: Date.now() };
  ctx.state["temp.uploads"] = ["file1.txt", "file2.pdf"];
}
```

### State Validation Pattern

Implement robust state validation:

```typescript
function validateAndUpdateState(ctx: CallbackContext, updates: any) {
  // Validate state schema
  const schema = {
    userPreferences: { theme: "string", language: "string" },
    currentTask: "string",
    progress: "number"
  };

  // Backup current state
  const backup = JSON.stringify(ctx.state);

  try {
    // Validate updates
    for (const [key, value] of Object.entries(updates)) {
      if (schema[key]) {
        const expectedType = schema[key];
        if (typeof value !== expectedType) {
          throw new Error(`Invalid type for ${key}: expected ${expectedType}, got ${typeof value}`);
        }
      }
    }

    // Apply validated updates
    Object.assign(ctx.state, updates, {
      lastUpdate: new Date().toISOString(),
      version: (ctx.state.version || 0) + 1
    });

    return { success: true, version: ctx.state.version };

  } catch (error) {
    // Restore on validation failure
    Object.assign(ctx.state, JSON.parse(backup));
    throw error;
  }
}
```

### Atomic State Operations

Ensure state consistency with atomic operations:

```typescript
async function atomicStateUpdate(ctx: CallbackContext, operation: () => Promise<void>) {
  const stateSnapshot = JSON.stringify(ctx.state);
  const transactionId = `tx_${Date.now()}`;

  try {
    // Mark transaction start
    ctx.state._transaction = {
      id: transactionId,
      started: new Date().toISOString()
    };

    // Execute operation
    await operation();

    // Mark transaction complete
    ctx.state._transaction.completed = new Date().toISOString();
    delete ctx.state._transaction;

  } catch (error) {
    // Rollback on failure
    Object.assign(ctx.state, JSON.parse(stateSnapshot));

    // Log failed transaction
    ctx.state.lastFailedTransaction = {
      id: transactionId,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };

    throw error;
  }
}
```

## Service Integration Patterns

### Graceful Service Degradation

Handle optional services gracefully:

```typescript
async function resilientServiceOperation(ctx: ToolContext, query: string) {
  const results = {
    query,
    timestamp: new Date().toISOString(),
    sources: {
      memory: null as any,
      artifacts: null as any,
      state: ctx.state
    },
    fallbacksUsed: [] as string[]
  };

  // Try memory service first
  try {
    if (ctx.searchMemory) {
      results.sources.memory = await ctx.searchMemory(query);
    } else {
      results.fallbacksUsed.push("memory-unavailable");
    }
  } catch (error) {
    console.warn("Memory service failed:", error);
    results.fallbacksUsed.push("memory-failed");

    // Fallback to state-based search
    const stateKeys = Object.keys(ctx.state);
    const relevantKeys = stateKeys.filter(key =>
      key.toLowerCase().includes(query.toLowerCase())
    );
    results.sources.memory = {
      memories: relevantKeys.map(key => ({ content: `${key}: ${ctx.state[key]}` }))
    };
  }

  // Try artifact listing
  try {
    if (ctx.listArtifacts) {
      const artifacts = await ctx.listArtifacts();
      results.sources.artifacts = artifacts.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      results.fallbacksUsed.push("artifacts-unavailable");
    }
  } catch (error) {
    console.warn("Artifact service failed:", error);
    results.fallbacksUsed.push("artifacts-failed");
    results.sources.artifacts = [];
  }

  return results;
}
```

### Service Coordination Pattern

Coordinate operations across multiple services:

```typescript
async function coordinatedOperation(ctx: InvocationContext, operation: string) {
  const coordinationId = `coord_${Date.now()}`;
  const results = [];

  // Track coordination in session state
  ctx.session.state.activeCoordinations =
    ctx.session.state.activeCoordinations || {};
  ctx.session.state.activeCoordinations[coordinationId] = {
    operation,
    started: new Date().toISOString(),
    services: []
  };

  try {
    // Memory service operation
    if (ctx.memoryService) {
      const memoryResult = await ctx.memoryService.searchMemory({
        query: operation,
        appName: ctx.appName,
        userId: ctx.userId
      });

      results.push({ service: "memory", success: true, data: memoryResult });
      ctx.session.state.activeCoordinations[coordinationId].services.push("memory");
    }

    // Artifact service operation
    if (ctx.artifactService) {
      const artifacts = await ctx.artifactService.listArtifactKeys({
        appName: ctx.appName,
        userId: ctx.userId,
        sessionId: ctx.session.id
      });

      results.push({ service: "artifact", success: true, data: artifacts });
      ctx.session.state.activeCoordinations[coordinationId].services.push("artifact");
    }

    // Session service operation
    await ctx.sessionService.updateSession(ctx.session);
    results.push({ service: "session", success: true, data: "updated" });
    ctx.session.state.activeCoordinations[coordinationId].services.push("session");

    // Mark as completed
    ctx.session.state.activeCoordinations[coordinationId].completed = new Date().toISOString();

    return results;

  } catch (error) {
    // Handle coordination failure
    ctx.session.state.activeCoordinations[coordinationId].error = {
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
    throw error;
  }
}
```

## Error Handling Patterns

### Context-Aware Error Recovery

Implement error recovery based on context capabilities:

```typescript
async function recoverableOperation(ctx: CallbackContext | ToolContext) {
  const operationId = `op_${Date.now()}`;

  try {
    // Attempt primary operation
    const result = await performPrimaryOperation(ctx);

    // Save successful result
    await ctx.saveArtifact(`result_${operationId}.json`, {
      text: JSON.stringify(result, null, 2)
    });

    return result;

  } catch (primaryError) {
    console.warn("Primary operation failed:", primaryError);

    // Try recovery based on context capabilities
    if ('searchMemory' in ctx && ctx.searchMemory) {
      // ToolContext - try memory-based recovery
      try {
        const memoryResults = await ctx.searchMemory("similar operations");
        const recoveryData = memoryResults.memories?.[0];

        if (recoveryData) {
          ctx.state.recoveryUsed = {
            method: "memory",
            operationId,
            timestamp: new Date().toISOString()
          };

          return { recovered: true, data: recoveryData };
        }
      } catch (memoryError) {
        console.warn("Memory recovery failed:", memoryError);
      }
    }

    // Fallback to state-based recovery
    const fallbackData = ctx.state.lastSuccessfulOperation || null;
    if (fallbackData) {
      ctx.state.recoveryUsed = {
        method: "state-fallback",
        operationId,
        timestamp: new Date().toISOString()
      };

      return { recovered: true, data: fallbackData };
    }

    // No recovery possible - save error and rethrow
    ctx.state.lastOperationError = {
      operationId,
      error: primaryError instanceof Error ? primaryError.message : String(primaryError),
      timestamp: new Date().toISOString()
    };

    throw primaryError;
  }
}

async function performPrimaryOperation(ctx: CallbackContext | ToolContext) {
  // Placeholder for actual operation
  throw new Error("Simulated primary operation failure");
}
```

### Cascading Error Handling

Handle errors that affect multiple context layers:

```typescript
class ErrorHandlingAgent extends BaseAgent {
  protected async *runAsyncImpl(
    context: InvocationContext
  ): AsyncGenerator<Event, void, unknown> {
    const errorContext = {
      invocationId: context.invocationId,
      agentName: this.name,
      errors: [] as any[]
    };

    try {
      yield* this.processWithErrorHandling(context, errorContext);

    } catch (criticalError) {
      // Handle critical errors that affect the entire invocation
      yield this.createCriticalErrorEvent(context, criticalError, errorContext);

      // Attempt graceful degradation
      yield* this.attemptGracefulDegradation(context, errorContext);
    }
  }

  private async *processWithErrorHandling(
    context: InvocationContext,
    errorContext: any
  ): AsyncGenerator<Event, void, unknown> {
    // Try normal processing with error tracking
    try {
      // Update session state
      context.session.state.processingStatus = "active";

      // Process with services
      if (context.memoryService) {
        try {
          const memories = await context.memoryService.searchMemory({
            query: "user context",
            appName: context.appName,
            userId: context.userId
          });

          context.session.state.contextMemories = memories.memories?.length || 0;

        } catch (memoryError) {
          errorContext.errors.push({
            service: "memory",
            error: memoryError instanceof Error ? memoryError.message : String(memoryError),
            timestamp: new Date().toISOString()
          });

          // Continue without memory - non-critical error
        }
      }

      // Generate success event
      yield new Event({
        invocationId: context.invocationId,
        author: this.name,
        content: {
          parts: [{ text: "Processing completed with error handling" }]
        }
      });

    } catch (error) {
      errorContext.errors.push({
        stage: "processing",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  private createCriticalErrorEvent(
    context: InvocationContext,
    error: unknown,
    errorContext: any
  ): Event {
    return new Event({
      invocationId: context.invocationId,
      author: this.name,
      content: {
        parts: [{
          text: `Critical error occurred. Error details saved to session state.`
        }]
      },
      errorCode: "CRITICAL_ERROR",
      errorMessage: error instanceof Error ? error.message : String(error)
    });
  }
}
```

## Performance Patterns

### Context Caching Strategy

Cache expensive context operations:

```typescript
class CachingToolContext {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  constructor(private baseContext: ToolContext) {}

  async cachedSearchMemory(query: string, ttlMs = 60000): Promise<any> {
    const cacheKey = `memory_${query}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      // Update base context state to reflect cache hit
      this.baseContext.state.cacheHits = (this.baseContext.state.cacheHits || 0) + 1;
      return cached.data;
    }

    // Cache miss - perform actual search
    const result = await this.baseContext.searchMemory(query);

    // Cache the result
    this.cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
      ttl: ttlMs
    });

    // Update context state
    this.baseContext.state.cacheMisses = (this.baseContext.state.cacheMisses || 0) + 1;

    return result;
  }

  async cachedListArtifacts(ttlMs = 30000): Promise<string[]> {
    const cacheKey = "artifacts_list";
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    const result = await this.baseContext.listArtifacts();

    this.cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
      ttl: ttlMs
    });

    return result;
  }

  clearCache(): void {
    this.cache.clear();
    this.baseContext.state.cacheCleared = new Date().toISOString();
  }
}
```

### Batch Operation Pattern

Optimize multiple operations using batching:

```typescript
async function batchContextOperations(ctx: ToolContext, operations: any[]) {
  const batchId = `batch_${Date.now()}`;
  const results = [];

  // Group operations by type
  const memoryQueries = operations.filter(op => op.type === "memory");
  const artifactOps = operations.filter(op => op.type === "artifact");
  const stateOps = operations.filter(op => op.type === "state");

  // Track batch in state
  ctx.state.activeBatches = ctx.state.activeBatches || {};
  ctx.state.activeBatches[batchId] = {
    started: new Date().toISOString(),
    totalOps: operations.length,
    completed: 0
  };

  try {
    // Batch memory queries
    if (memoryQueries.length > 0) {
      const memoryPromises = memoryQueries.map(async (op) => {
        try {
          const result = await ctx.searchMemory(op.query);
          ctx.state.activeBatches[batchId].completed++;
          return { operation: op, result, success: true };
        } catch (error) {
          return { operation: op, error: String(error), success: false };
        }
      });

      const memoryResults = await Promise.all(memoryPromises);
      results.push(...memoryResults);
    }

    // Batch artifact operations
    if (artifactOps.length > 0) {
      // Batch artifact loading
      const artifactPromises = artifactOps.map(async (op) => {
        try {
          let result;
          if (op.action === "list") {
            result = await ctx.listArtifacts();
          } else if (op.action === "load") {
            result = await ctx.loadArtifact(op.filename);
          }

          ctx.state.activeBatches[batchId].completed++;
          return { operation: op, result, success: true };
        } catch (error) {
          return { operation: op, error: String(error), success: false };
        }
      });

      const artifactResults = await Promise.all(artifactPromises);
      results.push(...artifactResults);
    }

    // Batch state operations (synchronous)
    stateOps.forEach(op => {
      try {
        if (op.action === "set") {
          ctx.state[op.key] = op.value;
        } else if (op.action === "get") {
          results.push({
            operation: op,
            result: ctx.state[op.key],
            success: true
          });
        }
        ctx.state.activeBatches[batchId].completed++;
      } catch (error) {
        results.push({
          operation: op,
          error: String(error),
          success: false
        });
      }
    });

    // Mark batch complete
    ctx.state.activeBatches[batchId].completedAt = new Date().toISOString();

    return {
      batchId,
      total: operations.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };

  } catch (error) {
    ctx.state.activeBatches[batchId].error = {
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
    throw error;
  }
}
```

## Common Anti-Patterns

### What to Avoid

```typescript
// ❌ DON'T: Use powerful context for simple operations
function badReadOnlyOperation(ctx: ToolContext) {
  // Only reading state but using ToolContext unnecessarily
  return ctx.state.userName;
}

// ✅ DO: Use appropriate context level
function goodReadOnlyOperation(ctx: ReadonlyContext) {
  return ctx.state.userName;
}

// ❌ DON'T: Hold references to context beyond operation scope
class BadService {
  private storedContext: ToolContext; // Don't do this!

  setContext(ctx: ToolContext) {
    this.storedContext = ctx; // Context may become stale
  }
}

// ✅ DO: Pass context to each operation
class GoodService {
  async performOperation(ctx: ToolContext, params: any) {
    // Use context immediately, don't store it
    return await ctx.searchMemory(params.query);
  }
}

// ❌ DON'T: Ignore service availability
async function badServiceUsage(ctx: ToolContext) {
  // Will throw if memory service not configured
  return await ctx.searchMemory("query");
}

// ✅ DO: Check service availability
async function goodServiceUsage(ctx: ToolContext) {
  try {
    return await ctx.searchMemory("query");
  } catch (error) {
    if (error.message.includes("Memory service is not available")) {
      // Handle gracefully
      return { memories: [] };
    }
    throw error;
  }
}
```

## Testing Patterns

### Context Mocking for Tests

```typescript
// Create mock contexts for testing
function createMockReadonlyContext(state: any = {}): ReadonlyContext {
  return {
    userContent: { parts: [{ text: "test input" }] },
    invocationId: "test-invocation-123",
    agentName: "test-agent",
    state: Object.freeze(state)
  } as ReadonlyContext;
}

function createMockToolContext(state: any = {}): ToolContext {
  return {
    ...createMockReadonlyContext(state),
    state: state, // Mutable for ToolContext
    functionCallId: "test-function-call-456",
    actions: {
      escalate: false,
      transferToAgent: null,
      skipSummarization: false,
      stateDelta: {},
      artifactDelta: {}
    },
    loadArtifact: jest.fn(),
    saveArtifact: jest.fn(),
    listArtifacts: jest.fn().mockResolvedValue([]),
    searchMemory: jest.fn().mockResolvedValue({ memories: [] })
  } as any;
}

// Test context usage
describe("Context Usage", () => {
  test("should handle readonly context safely", () => {
    const mockState = { user: { name: "Test User" } };
    const ctx = createMockReadonlyContext(mockState);

    const result = analyzeState(ctx);

    expect(result.userCount).toBeGreaterThan(0);
    expect(ctx.state).toEqual(mockState); // State unchanged
  });

  test("should use tool context features", async () => {
    const ctx = createMockToolContext({ preferences: { theme: "dark" } });

    const result = await smartTool({ query: "test" }, ctx);

    expect(ctx.searchMemory).toHaveBeenCalledWith("test");
    expect(ctx.state.lastSearch).toBeDefined();
  });
});
```

These patterns provide a foundation for robust, secure, and performant context usage across your ADK applications. Choose the appropriate patterns based on your specific requirements and always consider the security and performance implications of your context usage decisions.

# Overview
URL: /docs/framework/events

Understanding ADK's event system for communication and control flow between components

***

title: Overview
description: Understanding ADK's event system for communication and control flow between components
---------------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';

Events are the fundamental units of information flow within the Agent Development Kit (ADK). They represent every significant occurrence during an agent's interaction lifecycle, from initial user input to the final response and all the steps in between.

## What Events Are

An `Event` in ADK is an immutable record representing a specific point in the agent's execution. It captures:

* **User messages** - Direct input from end users
* **Agent replies** - Responses and actions from agents
* **Tool interactions** - Function calls and their results
* **State changes** - Updates to session state and artifacts
* **Control signals** - Flow control and error conditions

<Callout type="info">
  Events serve as the standard message format between the user interface, the `Runner`, agents, the LLM, and tools. Everything flows as an `Event`.
</Callout>

## Event Structure

Events build upon the basic `LlmResponse` structure by adding essential ADK-specific metadata:

```typescript
import { Event, EventActions } from '@iqai/adk';

class Event extends LlmResponse {
  // Core identification
  id: string;                    // Unique event identifier
  invocationId: string;          // ID for the whole interaction run
  author: string;                // 'user' or agent name
  timestamp: number;             // Creation time (seconds since epoch)

  // Content and flow control
  content?: any;                 // Event payload (text, function calls, etc.)
  partial?: boolean;             // True for streaming chunks
  turnComplete?: boolean;        // True when agent's turn is finished

  // ADK-specific features
  actions: EventActions;         // Side-effects & control signals
  longRunningToolIds?: Set<string>; // Background tool execution
  branch?: string;               // Hierarchy path for multi-agent scenarios

  // Helper methods
  isFinalResponse(): boolean;
  getFunctionCalls(): any[];
  getFunctionResponses(): any[];
}
```

## Event Types

### User Events

Events with `author: 'user'` represent direct input from the end-user.

### Agent Events

Events with `author: 'AgentName'` represent output or actions from a specific agent.

### Tool Events

Events containing function calls or responses for tool execution.

### Control Events

Events carrying state changes, control flow signals, or configuration updates.

## Core Concepts

<Cards>
  <Card title="Event Actions" description="Understanding state management, artifact tracking, and control flow signals" href="/docs/framework/events/event-actions" />

  <Card title="Working with Events" description="Practical patterns for processing and handling events in your applications" href="/docs/framework/events/working-with-events" />

  <Card title="Event Compaction" description="Automatically manage long session histories with LLM-generated summaries" href="/docs/framework/events/compaction" />

  <Card title="Event Streaming" description="Real-time event processing and streaming patterns for responsive UIs" href="/docs/framework/events/streaming" />

  <Card title="Event Patterns" description="Architectural patterns and best practices for event-driven applications" href="/docs/framework/events/patterns" />
</Cards>

## Quick Example

Here's a basic example of processing events from an agent:

```typescript
import { LlmAgent, Event } from '@iqai/adk';

// Process events from an agent interaction
for await (const event of runner.runAsync(query, session)) {
  console.log(`Event from: ${event.author}`);

  // Handle different event types
  if (event.content?.parts?.[0]?.text) {
    console.log('Text:', event.content.parts[0].text);
  }

  if (event.getFunctionCalls().length > 0) {
    console.log('Tool calls:', event.getFunctionCalls());
  }

  if (event.actions?.stateDelta) {
    console.log('State changes:', event.actions.stateDelta);
  }

  if (event.isFinalResponse()) {
    console.log('Final response detected');
  }
}
```

## Event Flow in ADK

Events enable communication throughout the ADK system:

1. **User Input** → Creates user event
2. **Agent Processing** → Generates agent events with text or tool calls
3. **Tool Execution** → Creates tool response events
4. **State Updates** → Tracked via event actions
5. **Final Response** → Delivered as final event ready for display

<Callout type="info">
  The sequence of events recorded in `session.events` provides a complete, chronological history of an interaction, invaluable for debugging, auditing, and understanding agent behavior.
</Callout>

## Key Features

### State Management

Events carry state changes through `actions.stateDelta`, allowing components to update session state reactively.

### Artifact Tracking

File operations and artifact versions are tracked through `actions.artifactDelta`.

### Control Flow

Events can signal agent transfers (`transferToAgent`), loop termination (`escalate`), and other control flow changes.

### Streaming Support

Events support real-time streaming with `partial` flags for progressive content delivery.

### Error Handling

Events inherit error properties (`errorCode`, `errorMessage`) for comprehensive error tracking.

Events are the backbone of ADK's communication system, enabling powerful features like state management, tool orchestration, and complex agent workflows. Explore the detailed guides above to learn how to leverage events effectively in your applications.

# Event Actions
URL: /docs/framework/events/event-actions

Understanding the EventActions system for state management and control flow

***

title: Event Actions
description: Understanding the EventActions system for state management and control flow
----------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

Event Actions are the mechanism by which ADK components signal side effects, state changes, and control flow instructions. They enable powerful features like state management, agent transfers, and artifact tracking.

## What Event Actions Are

The `EventActions` class represents the actions attached to an event. It contains instructions for:

* **State Changes**: Updates to session state via `stateDelta`
* **Artifact Management**: Tracking file versions via `artifactDelta`
* **Control Flow**: Agent transfers and escalation signals
* **Tool Behavior**: Skipping summarization and authentication requests

## EventActions Structure

```typescript
import { EventActions } from '@iqai/adk';

class EventActions {
  // Control tool response processing
  skipSummarization?: boolean;

  // State management
  stateDelta: Record<string, any> = {};

  // Artifact versioning
  artifactDelta: Record<string, number> = {};

  // Flow control
  transferToAgent?: string;
  escalate?: boolean;

  // Authentication
  requestedAuthConfigs?: Record<string, any>;
}
```

## Action Types

### State Management

State deltas track changes to session state:

<Tabs items={['Usage', 'Example']}>
  <Tab value="Usage">
    ```typescript
    const actions = new EventActions({
      stateDelta: {
        'user_preference': 'dark_mode',
        'last_activity': Date.now(),
        'temp_calculation': 42  // Will be filtered out (temp_ prefix)
      }
    });

    const event = new Event({
      author: 'MyAgent',
      actions: actions,
      content: { parts: [{ text: 'Updated preferences' }] }
    });
    ```
  </Tab>

  <Tab value="Example">
    ```typescript
    // In a tool or agent callback
    context.state['user_preference'] = 'dark_mode';
    context.state['app:global_setting'] = 'enabled';
    context.state['temp_intermediate_result'] = calculation;

    // These changes automatically populate the next event's stateDelta
    ```
  </Tab>
</Tabs>

<Callout type="info">
  State keys with `temp_` prefix are excluded from persistence to avoid cluttering permanent session state.
</Callout>

### Artifact Management

Artifact deltas track file saves and versions:

```typescript
const actions = new EventActions({
  artifactDelta: {
    'report.pdf': 1,
    'analysis.json': 3,
    'diagram.png': 1
  }
});
```

### Control Flow Actions

#### Agent Transfer

Transfer control to another agent:

```typescript
const actions = new EventActions({
  transferToAgent: 'BillingAgent'
});

// The framework will route the next turn to BillingAgent
```

#### Escalation

Signal that a loop or process should terminate:

```typescript
const actions = new EventActions({
  escalate: true
});

// Useful in loop agents or error handling
```

### Tool Behavior Control

#### Skip Summarization

Prevent the LLM from summarizing tool results:

```typescript
const actions = new EventActions({
  skipSummarization: true
});

// Tool result will be displayed directly without LLM processing
```

#### Authentication Requests

Signal that tools need authentication:

```typescript
const actions = new EventActions({
  requestedAuthConfigs: {
    'gmail-tool': {
      type: 'oauth',
      provider: 'gmail'
    }
  }
});
```

## Working with Actions in Events

### Detecting Actions

Check for actions in received events:

```typescript
for await (const event of runner.runAsync(query, session)) {
  if (event.actions) {
    // Check for state changes
    if (Object.keys(event.actions.stateDelta).length > 0) {
      console.log('State updated:', event.actions.stateDelta);
    }

    // Check for artifact updates
    if (Object.keys(event.actions.artifactDelta).length > 0) {
      console.log('Artifacts saved:', event.actions.artifactDelta);
    }

    // Check for control signals
    if (event.actions.transferToAgent) {
      console.log(`Transferring to: ${event.actions.transferToAgent}`);
    }

    if (event.actions.escalate) {
      console.log('Escalation signal received');
    }
  }
}
```

### Creating Events with Actions

When building custom agents:

```typescript
import { Event, EventActions } from '@iqai/adk';

export class CustomAgent extends BaseAgent {
  async *runAsyncImpl(context: InvocationContext): AsyncGenerator<Event> {
    // Perform some logic...

    const actions = new EventActions({
      stateDelta: {
        'task_status': 'completed',
        'result_count': 5
      },
      transferToAgent: 'ReviewAgent'
    });

    yield new Event({
      author: this.name,
      invocationId: context.invocationId,
      content: {
        parts: [{ text: 'Task completed, transferring for review' }]
      },
      actions: actions
    });
  }
}
```

## State Scope Patterns

Use prefixes to indicate state scope:

* **`app:`** - Application-wide settings
* **`user:`** - User-specific preferences across sessions
* **`temp_`** - Temporary values (filtered from persistence)
* **No prefix** - Session-specific state

```typescript
context.state['app:theme'] = 'dark';           // App setting
context.state['user:language'] = 'en';         // User preference
context.state['temp_calculation'] = result;    // Temporary (not persisted)
context.state['current_task'] = 'processing';  // Session state
```

## Best Practices

### Action Design

* **Use specific actions**: Be explicit about what each action signals
* **Combine logically**: Group related state changes in one event
* **Document side effects**: Clear comments for complex action combinations

### State Management

* **Minimize state**: Only store what's needed across turns
* **Use appropriate prefixes**: Indicate scope and persistence intent
* **Avoid large objects**: Keep state values reasonably sized

### Control Flow

* **Single responsibility**: One control action per event when possible
* **Clear transfers**: Use descriptive agent names for transfers
* **Document escalation**: Explain why escalation occurs

Event Actions provide the foundation for sophisticated agent behaviors and seamless component communication in ADK applications.

# Working with Events
URL: /docs/framework/events/working-with-events

Practical patterns and examples for handling events in ADK applications

***

title: Working with Events
description: Practical patterns and examples for handling events in ADK applications
------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

This guide provides practical patterns for handling events in your ADK applications, from basic event processing to advanced patterns for complex workflows.

## Event Processing Basics

### Event Identification

First, understand what type of event you're dealing with:

```typescript
import { Event } from '@iqai/adk';

function processEvent(event: Event) {
  console.log(`Event from: ${event.author}`);
  console.log(`Event ID: ${event.id}`);
  console.log(`Invocation ID: ${event.invocationId}`);

  // Check event type
  if (event.content?.parts) {
    const functionCalls = event.getFunctionCalls();
    const functionResponses = event.getFunctionResponses();

    if (functionCalls.length > 0) {
      console.log("Type: Tool Call Request");
      functionCalls.forEach(call => {
        console.log(`  Tool: ${call.name}`, call.args);
      });
    } else if (functionResponses.length > 0) {
      console.log("Type: Tool Result");
      functionResponses.forEach(response => {
        console.log(`  Result from: ${response.name}`, response.response);
      });
    } else if (event.content.parts[0]?.text) {
      console.log(event.partial ? "Type: Streaming Text" : "Type: Complete Text");
    }
  }
}
```

### Extracting Content

Access different types of content from events:

<Tabs items={['Text Content', 'Function Calls', 'Function Responses']}>
  <Tab value="Text Content">
    ```typescript
    function extractText(event: Event): string | null {
      if (event.content?.parts?.[0]?.text) {
        return event.content.parts[0].text;
      }
      return null;
    }

    // Usage
    const text = extractText(event);
    if (text) {
      console.log("Message:", text);
    }
    ```
  </Tab>

  <Tab value="Function Calls">
    ```typescript
    function processFunctionCalls(event: Event) {
      const calls = event.getFunctionCalls();

      for (const call of calls) {
        console.log(`Tool requested: ${call.name}`);
        console.log(`Arguments:`, call.args);

        // Dispatch based on tool name
        switch (call.name) {
          case 'search':
            handleSearchRequest(call.args);
            break;
          case 'sendEmail':
            handleEmailRequest(call.args);
            break;
          default:
            console.log(`Unknown tool: ${call.name}`);
        }
      }
    }
    ```
  </Tab>

  <Tab value="Function Responses">
    ```typescript
    function processFunctionResponses(event: Event) {
      const responses = event.getFunctionResponses();

      for (const response of responses) {
        console.log(`Tool ${response.name} returned:`, response.response);

        // Handle specific tool responses
        if (response.name === 'search') {
          displaySearchResults(response.response);
        } else if (response.name === 'sendEmail') {
          showEmailConfirmation(response.response);
        }
      }
    }
    ```
  </Tab>
</Tabs>

## Event Filtering Patterns

### Final Response Detection

Use the built-in helper to identify display-ready events:

```typescript
async function processAgentConversation(runner, query, session) {
  let streamingText = '';

  for await (const event of runner.runAsync(query, session)) {
    // Handle streaming content
    if (event.partial && event.content?.parts?.[0]?.text) {
      streamingText += event.content.parts[0].text;
      updateUI(streamingText); // Real-time updates
    }

    // Handle final responses
    if (event.isFinalResponse()) {
      if (event.content?.parts?.[0]?.text) {
        // Complete text response
        const finalText = streamingText + (event.content.parts[0].text || '');
        displayFinalMessage(finalText.trim());
        streamingText = ''; // Reset
      } else if (event.actions?.skipSummarization) {
        // Raw tool result
        const toolResponse = event.getFunctionResponses()[0];
        displayToolResult(toolResponse.response);
      } else if (event.longRunningToolIds) {
        // Background process
        showProcessingIndicator();
      }
    }

    // Handle actions
    processEventActions(event);
  }
}
```

### Custom Event Filters

Create filters for specific event types:

```typescript
// Filter by author
const agentEvents = events.filter(event => event.author !== 'user');
const userEvents = events.filter(event => event.author === 'user');

// Filter by content type
const textEvents = events.filter(event =>
  event.content?.parts?.[0]?.text && !event.partial
);

const toolEvents = events.filter(event =>
  event.getFunctionCalls().length > 0 ||
  event.getFunctionResponses().length > 0
);

// Filter by time range
const recentEvents = events.filter(event =>
  event.timestamp > (Date.now() / 1000) - 3600 // Last hour
);
```

## State and Action Handling

### Processing State Changes

Monitor and react to state updates:

```typescript
function handleStateChanges(event: Event) {
  if (!event.actions?.stateDelta) return;

  const changes = event.actions.stateDelta;

  for (const [key, value] of Object.entries(changes)) {
    console.log(`State changed: ${key} = ${value}`);

    // React to specific state changes
    switch (key) {
      case 'user_preference':
        updateUserInterface(value);
        break;
      case 'task_status':
        updateTaskProgress(value);
        break;
      case 'app:theme':
        applyTheme(value);
        break;
    }
  }
}
```

### Artifact Tracking

Track file operations:

```typescript
function handleArtifactChanges(event: Event) {
  if (!event.actions?.artifactDelta) return;

  const artifacts = event.actions.artifactDelta;

  for (const [filename, version] of Object.entries(artifacts)) {
    console.log(`File updated: ${filename} (version ${version})`);

    // Refresh file displays
    if (filename.endsWith('.pdf')) {
      refreshPdfViewer(filename);
    } else if (filename.endsWith('.json')) {
      refreshDataView(filename);
    }
  }
}
```

## Advanced Event Patterns

### Event Aggregation

Combine related events for analysis:

```typescript
class EventAggregator {
  private events: Event[] = [];

  addEvent(event: Event) {
    this.events.push(event);
  }

  getConversationSummary(invocationId: string) {
    const conversationEvents = this.events.filter(
      event => event.invocationId === invocationId
    );

    return {
      totalEvents: conversationEvents.length,
      userMessages: conversationEvents.filter(e => e.author === 'user').length,
      agentResponses: conversationEvents.filter(e => e.author !== 'user').length,
      toolCalls: conversationEvents.reduce(
        (sum, e) => sum + e.getFunctionCalls().length, 0
      ),
      duration: this.getConversationDuration(conversationEvents)
    };
  }

  private getConversationDuration(events: Event[]): number {
    if (events.length < 2) return 0;
    const sorted = events.sort((a, b) => a.timestamp - b.timestamp);
    return sorted[sorted.length - 1].timestamp - sorted[0].timestamp;
  }
}
```

### Event Replay

Recreate conversation state from event history:

```typescript
function replayEvents(events: Event[]): Record<string, any> {
  const state: Record<string, any> = {};

  for (const event of events.sort((a, b) => a.timestamp - b.timestamp)) {
    if (event.actions?.stateDelta) {
      for (const [key, value] of Object.entries(event.actions.stateDelta)) {
        if (!key.startsWith('temp_')) {
          state[key] = value;
        }
      }
    }
  }

  return state;
}
```

### Error Event Handling

Handle errors gracefully:

```typescript
function processEventSafely(event: Event) {
  try {
    // Check for error conditions
    if (event.errorCode) {
      handleEventError(event);
      return;
    }

    // Normal processing
    processEvent(event);

  } catch (error) {
    console.error('Error processing event:', error);
    logEventError(event, error);
  }
}

function handleEventError(event: Event) {
  console.error(`Event error: ${event.errorCode}`);
  console.error(`Message: ${event.errorMessage}`);

  // Show user-friendly error message
  switch (event.errorCode) {
    case 'SAFETY_FILTER_TRIGGERED':
      showSafetyWarning();
      break;
    case 'RATE_LIMIT_EXCEEDED':
      showRateLimitMessage();
      break;
    default:
      showGenericError(event.errorMessage);
  }
}
```

## Building Event-Driven UIs

### React Integration

```typescript
import { useState, useEffect } from 'react';

function ConversationComponent({ runner, query, session }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function runConversation() {
      setIsLoading(true);
      const newEvents: Event[] = [];

      try {
        for await (const event of runner.runAsync(query, session)) {
          newEvents.push(event);
          setEvents([...newEvents]); // Update UI with each event
        }
      } finally {
        setIsLoading(false);
      }
    }

    runConversation();
  }, [query]);

  return (
    <div>
      {events.map(event => (
        <EventDisplay key={event.id} event={event} />
      ))}
      {isLoading && <LoadingIndicator />}
    </div>
  );
}
```

## Best Practices

### Performance

* **Filter early**: Apply filters before processing heavy operations
* **Batch updates**: Group related state changes when possible
* **Cleanup**: Remove event listeners and clear large event arrays

### Error Handling

* **Graceful degradation**: Continue processing other events if one fails
* **User feedback**: Provide clear error messages for failed operations
* **Logging**: Record detailed error information for debugging

### Memory Management

* **Event retention**: Only keep necessary events in memory
* **Pagination**: Use pagination for large event histories
* **Cleanup**: Clear temporary state and cached data

Events provide the foundation for building responsive, interactive agent applications with ADK.

# Event Compaction
URL: /docs/framework/events/compaction

Manage long session histories with automatic event summarization and compaction

***

title: Event Compaction
description: Manage long session histories with automatic event summarization and compaction
--------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';

Event Compaction automatically manages long conversation histories by periodically replacing ranges of events with LLM-generated summaries. This keeps context windows manageable while preserving important information.

## Overview

As conversations grow longer, sending the full history to the LLM becomes inefficient and costly. Event Compaction solves this by:

* **Reducing token usage** through concise summaries
* **Improving performance** with smaller context windows
* **Maintaining context** by preserving key information
* **Operating transparently** without code changes

<Callout type="info">
  Event Compaction uses a sliding window algorithm that triggers after a configured number of new invocations, ensuring consistent behavior and predictable costs.
</Callout>

## How It Works

### The Compaction Process

<Steps>
  <Step>
    ### Trigger Condition

    After each agent turn completes, ADK checks if enough new invocations have occurred since the last compaction.
  </Step>

  <Step>
    ### Window Selection

    When triggered, ADK selects a window of invocations to compact, including some overlap from the previous compaction for continuity.
  </Step>

  <Step>
    ### Summarization

    The selected events are sent to an LLM (by default, the agent's own model) to generate a concise summary.
  </Step>

  <Step>
    ### Storage

    The summary is stored as a special compaction event with `actions.compaction` containing the timestamp range and summarized content.
  </Step>

  <Step>
    ### Consumption

    When building LLM requests, compaction events are converted to normal model events and original covered events are filtered out.
  </Step>
</Steps>

### Sliding Window Algorithm

```mermaid
timeline
    title Event Compaction Timeline
    Invocations 1-5 : Original events
    After Inv 5 : First compaction (Inv 1-5)
    Invocations 6-10 : New original events
    After Inv 10 : Second compaction (Inv 4-10)
                 : Overlap = Inv 4-5
    Invocations 11-15 : New original events
```

The algorithm maintains continuity by including overlap from the previous range, ensuring no context is lost between compactions.

## Configuration

### Basic Setup

<Tabs items={['AgentBuilder', 'Runner Config', 'Custom Summarizer']}>
  <Tab value="AgentBuilder">
    ```typescript
    import { AgentBuilder } from '@iqai/adk';

    // Simple usage with AgentBuilder
    const { runner } = await AgentBuilder
      .create('assistant')
      .withModel('gemini-2.5-flash')
      .withEventsCompaction({
        compactionInterval: 10,  // Compact every 10 invocations
        overlapSize: 2,          // Include 2 prior invocations
      })
      .build();

    // Now compaction happens automatically
    const response = await runner.ask('Hello!');
    ```
  </Tab>

  <Tab value="Runner Config">
    ```typescript
    import { Runner, EventsCompactionConfig } from '@iqai/adk';

    const compactionConfig: EventsCompactionConfig = {
      // Trigger compaction every 10 new invocations
      compactionInterval: 10,
      
      // Include 2 prior invocations for continuity
      overlapSize: 2,
    };

    const runner = new Runner({
      appName: 'MyApp',
      agent: myAgent,
      sessionService: mySessionService,
      eventsCompactionConfig: compactionConfig,
    });
    ```
  </Tab>

  <Tab value="Custom Summarizer">
    ```typescript
    import { 
      EventsSummarizer, 
      Event, 
      EventActions,
      LlmEventSummarizer 
    } from '@iqai/adk';

    // Option 1: Use default with custom model
    const customModel = LLMRegistry.newLLM('gpt-4o-mini');
    const summarizer = new LlmEventSummarizer(customModel);

    // Option 2: Implement custom logic
    class CustomSummarizer implements EventsSummarizer {
      async maybeSummarizeEvents(events: Event[]): Promise<Event | undefined> {
        // Your custom summarization logic
        const summary = await this.generateSummary(events);
        
        if (!summary) return undefined;
        
        return new Event({
          invocationId: Event.newId(),
          author: 'user',
          actions: new EventActions({
            compaction: {
              startTimestamp: events[0].timestamp,
              endTimestamp: events[events.length - 1].timestamp,
              compactedContent: {
                role: 'model',
                parts: [{ text: summary }],
              },
            },
          }),
        });
      }
    }

    const compactionConfig: EventsCompactionConfig = {
      summarizer: new CustomSummarizer(),
      compactionInterval: 10,
      overlapSize: 2,
    };
    ```
  </Tab>
</Tabs>

### Configuration Options

| Option               | Type               | Default      | Description                                            |
| -------------------- | ------------------ | ------------ | ------------------------------------------------------ |
| `compactionInterval` | `number`           | Required     | Number of new invocations needed to trigger compaction |
| `overlapSize`        | `number`           | Required     | Number of prior invocations to include for continuity  |
| `summarizer`         | `EventsSummarizer` | Auto-created | Custom summarizer (defaults to LLM-based)              |

<Callout type="warn">
  Choose your `compactionInterval` based on your use case:

  * **Higher values (20+)**: Less frequent compaction, more detailed history retained
  * **Lower values (5-10)**: More aggressive compaction, better for very long sessions
</Callout>

## Understanding the Components

### EventCompaction Interface

The compaction data structure that's stored in event actions:

```typescript
interface EventCompaction {
  startTimestamp: number;     // Start of compacted range
  endTimestamp: number;       // End of compacted range
  compactedContent: Content;  // The summarized content
}
```

### EventsSummarizer Interface

The interface for custom summarizers:

```typescript
interface EventsSummarizer {
  maybeSummarizeEvents(events: Event[]): Promise<Event | undefined>;
}
```

### LlmEventSummarizer

The default implementation that uses an LLM to generate summaries:

```typescript
import { LlmEventSummarizer } from '@iqai/adk';

// Use with custom prompt
const summarizer = new LlmEventSummarizer(
  myModel,
  `Summarize these conversation events focusing on:
  - Key decisions made
  - Important information exchanged
  - Action items identified
  
  Events: {events}`
);
```

## Examples

### Basic Usage with AgentBuilder

```typescript
import { AgentBuilder } from '@iqai/adk';

// Create agent with compaction using AgentBuilder
const { runner } = await AgentBuilder
  .create('assistant')
  .withModel('gemini-2.5-flash')
  .withInstruction('You are a helpful assistant.')
  .withEventsCompaction({
    compactionInterval: 5,
    overlapSize: 1,
  })
  .build();

// Use normally - compaction happens automatically
const response = await runner.ask('Hello!');
console.log(response);
```

### Basic Usage with Runner

```typescript
import { InMemoryRunner, LlmAgent } from '@iqai/adk';

const agent = new LlmAgent({
  name: 'Assistant',
  model: 'gemini-2.5-flash',
  instruction: 'You are a helpful assistant.',
});

const runner = new InMemoryRunner(agent, {
  appName: 'ChatApp',
});

// Enable compaction
runner.eventsCompactionConfig = {
  compactionInterval: 5,
  overlapSize: 1,
};

// Use normally - compaction happens automatically
for await (const event of runner.runAsync({
  userId: 'user123',
  sessionId: 'session456',
  newMessage: { role: 'user', parts: [{ text: 'Hello!' }] },
})) {
  console.log(event);
}
```

### Checking Compaction Status

```typescript
// Check if a session has compacted events
function hasCompactions(session: Session): boolean {
  return session.events.some(event => event.actions?.compaction);
}

// Get compaction statistics
function getCompactionStats(session: Session) {
  const compactions = session.events.filter(e => e.actions?.compaction);
  
  return {
    totalCompactions: compactions.length,
    totalEventsCompacted: compactions.reduce((sum, e) => {
      const compact = e.actions.compaction!;
      const covered = session.events.filter(
        ev => ev.timestamp >= compact.startTimestamp 
           && ev.timestamp <= compact.endTimestamp
      );
      return sum + covered.length;
    }, 0),
  };
}
```

### Custom Summarization Strategy

```typescript
class BulletPointSummarizer implements EventsSummarizer {
  constructor(private model: BaseLlm) {}
  
  async maybeSummarizeEvents(events: Event[]): Promise<Event | undefined> {
    if (events.length < 3) return undefined; // Skip small batches
    
    const eventTexts = events
      .filter(e => e.content?.parts?.[0]?.text)
      .map(e => `${e.author}: ${e.content.parts[0].text}`);
    
    const prompt = `Create a bullet-point summary of this conversation:

${eventTexts.join('\n')}

Format as:
• Key point 1
• Key point 2
• Key point 3`;

    let summary = '';
    for await (const response of this.model.generateContentAsync({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    } as any)) {
      summary += response.content?.parts
        ?.map(p => p.text || '')
        .join('');
    }
    
    return new Event({
      invocationId: Event.newId(),
      author: 'user',
      actions: new EventActions({
        compaction: {
          startTimestamp: events[0].timestamp,
          endTimestamp: events[events.length - 1].timestamp,
          compactedContent: {
            role: 'model',
            parts: [{ text: summary.trim() }],
          },
        },
      }),
    });
  }
}
```

## Best Practices

### Choosing Compaction Interval

```typescript
// For customer support (high detail retention)
const supportConfig: EventsCompactionConfig = {
  compactionInterval: 20,  // Compact less frequently
  overlapSize: 5,          // More overlap
};

// For general chat (aggressive compaction)
const chatConfig: EventsCompactionConfig = {
  compactionInterval: 5,   // Compact frequently
  overlapSize: 1,          // Minimal overlap
};

// For long research sessions (balanced)
const researchConfig: EventsCompactionConfig = {
  compactionInterval: 10,  // Moderate compaction
  overlapSize: 2,          // Standard overlap
};
```

### Monitoring Compaction

```typescript
class CompactionMonitor {
  private compactionCount = 0;
  private eventsCompacted = 0;
  
  async runWithMonitoring(runner: Runner, query: string) {
    const sessionBefore = await runner.sessionService.getSession(...);
    
    // Run agent
    for await (const event of runner.runAsync(...)) {
      if (event.actions?.compaction) {
        this.compactionCount++;
        console.log('Compaction occurred:', {
          range: [
            event.actions.compaction.startTimestamp,
            event.actions.compaction.endTimestamp,
          ],
          summary: event.actions.compaction.compactedContent,
        });
      }
    }
    
    const sessionAfter = await runner.sessionService.getSession(...);
    console.log('Session stats:', {
      totalEvents: sessionAfter.events.length,
      compactions: this.compactionCount,
    });
  }
}
```

### Testing with Compaction

```typescript
import { describe, it, expect } from 'vitest';

describe('Agent with Compaction', () => {
  it('should compact after threshold', async () => {
    const runner = new InMemoryRunner(agent, {
      appName: 'TestApp',
    });
    
    runner.eventsCompactionConfig = {
      compactionInterval: 3,
      overlapSize: 1,
    };
    
    // Generate 3 invocations
    for (let i = 0; i < 3; i++) {
      for await (const event of runner.runAsync({
        userId: 'test',
        sessionId: 'test',
        newMessage: { role: 'user', parts: [{ text: `Message ${i}` }] },
      })) {
        // Process events
      }
    }
    
    const session = await runner.sessionService.getSession('TestApp', 'test', 'test');
    const hasCompaction = session?.events.some(e => e.actions?.compaction);
    
    expect(hasCompaction).toBe(true);
  });
});
```

## Performance Considerations

### Token Savings

Event compaction can significantly reduce token usage:

```typescript
// Example: 10 invocations with 200 tokens each = 2000 tokens
// After compaction: 1 summary (300 tokens) + 5 recent (1000 tokens) = 1300 tokens
// Savings: 35%
```

### Latency Impact

* **First compaction**: Adds summarization latency (\~1-2s)
* **Subsequent requests**: Faster due to smaller context
* **Net effect**: Improved performance for long sessions

### Cost Optimization

```typescript
// Use cheaper model for summarization
import { LlmEventSummarizer, LLMRegistry } from '@iqai/adk';

const cheapModel = LLMRegistry.newLLM('gemini-2.0-flash-lite');
const costEffectiveSummarizer = new LlmEventSummarizer(cheapModel);

const config: EventsCompactionConfig = {
  summarizer: costEffectiveSummarizer,
  compactionInterval: 8,
  overlapSize: 2,
};
```

## Troubleshooting

### Compaction Not Triggering

<Callout type="error">
  If compaction isn't occurring, check:

  1. `eventsCompactionConfig` is set on the Runner
  2. `compactionInterval` threshold has been reached
  3. Summarizer is properly configured
  4. Session has enough invocations
</Callout>

```typescript
// Debug compaction
runner.eventsCompactionConfig = {
  compactionInterval: 2, // Lower threshold for testing
  overlapSize: 1,
};

// Check after each invocation
const session = await runner.sessionService.getSession(...);
console.log('Invocation count:', new Set(
  session.events.map(e => e.invocationId)
).size);
console.log('Has compaction:', session.events.some(
  e => e.actions?.compaction
));
```

### Summary Quality Issues

```typescript
// Improve summary quality with custom prompt
const detailedSummarizer = new LlmEventSummarizer(
  model,
  `You are summarizing a conversation for context retention.

Include:
- All important facts, decisions, and conclusions
- Named entities and specific details
- User preferences and requirements
- Open questions or unresolved issues

Exclude:
- Greetings and pleasantries
- Redundant information
- Off-topic tangents

Events to summarize:
{events}

Provide a detailed yet concise summary:`
);
```

## Advanced Topics

### Compaction in Multi-Agent Systems

```typescript
// Compaction works with agent hierarchies
const rootAgent = new LlmAgent({
  name: 'Coordinator',
  model: 'gemini-2.5-pro',
  subAgents: [assistantAgent, researchAgent],
});

const runner = new Runner({
  agent: rootAgent,
  sessionService: mySessionService,
  eventsCompactionConfig: {
    compactionInterval: 10,
    overlapSize: 2,
  },
});

// All agent events are compacted together
```

### Selective Compaction

```typescript
// Only compact certain event types
class SelectiveSummarizer implements EventsSummarizer {
  async maybeSummarizeEvents(events: Event[]): Promise<Event | undefined> {
    // Filter events to compact
    const textEvents = events.filter(e => 
      e.content?.parts?.some(p => p.text) &&
      !e.actions?.stateDelta // Preserve state changes
    );
    
    if (textEvents.length < 5) return undefined;
    
    // Summarize only text events
    // ... implementation
  }
}
```

## Related Topics

* [Event Actions](/docs/framework/events/event-actions) - Understanding event metadata and control flow
* [Sessions](/docs/framework/sessions/session) - Managing conversation state
* [Memory](/docs/framework/sessions/memory) - Long-term storage patterns
* [Run Config](/docs/framework/runtime/run-config) - Runner configuration options

Event Compaction is a powerful feature for managing long-running conversations efficiently. Start with the defaults and tune based on your specific use case and performance requirements.

# Event Streaming
URL: /docs/framework/events/streaming

Real-time event processing and streaming patterns in ADK

***

title: Event Streaming
description: Real-time event processing and streaming patterns in ADK
---------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

ADK's event streaming enables real-time interaction with agents, allowing your applications to process and display responses as they're generated rather than waiting for complete responses.

## Understanding Streaming Events

Streaming events allow for progressive content delivery, improving user experience by showing partial results immediately.

### Event Properties for Streaming

Key properties that control streaming behavior:

```typescript
interface Event {
  partial?: boolean;      // True for incomplete streaming chunks
  turnComplete?: boolean; // True when the agent's turn is finished
  content?: any;          // Contains the partial or complete content
  // ... other properties
}
```

## Basic Streaming Patterns

### Simple Text Streaming

Handle streaming text responses:

```typescript
async function handleStreamingResponse(runner, query, session) {
  let accumulatedText = '';

  for await (const event of runner.runAsync(query, session)) {
    if (event.content?.parts?.[0]?.text) {
      if (event.partial) {
        // Partial chunk - accumulate and display
        accumulatedText += event.content.parts[0].text;
        displayPartialText(accumulatedText);
      } else {
        // Complete chunk
        accumulatedText += event.content.parts[0].text;
        if (event.isFinalResponse()) {
          displayFinalText(accumulatedText);
          accumulatedText = ''; // Reset for next response
        }
      }
    }
  }
}
```

### Progressive UI Updates

<Tabs items={['React Hook', 'Vanilla JS', 'Vue Composition']}>
  <Tab value="React Hook">
    ```typescript
    import { useState, useEffect } from 'react';

    function useEventStream(runner, query, session) {
      const [streamingText, setStreamingText] = useState('');
      const [events, setEvents] = useState<Event[]>([]);
      const [isStreaming, setIsStreaming] = useState(false);

      useEffect(() => {
        let currentText = '';

        async function processStream() {
          setIsStreaming(true);

          try {
            for await (const event of runner.runAsync(query, session)) {
              setEvents(prev => [...prev, event]);

              if (event.content?.parts?.[0]?.text) {
                if (event.partial) {
                  currentText += event.content.parts[0].text;
                  setStreamingText(currentText);
                } else if (event.isFinalResponse()) {
                  currentText += event.content.parts[0].text;
                  setStreamingText(currentText);
                  currentText = ''; // Reset for next response
                }
              }
            }
          } finally {
            setIsStreaming(false);
          }
        }

        processStream();
      }, [query]);

      return { streamingText, events, isStreaming };
    }
    ```
  </Tab>

  <Tab value="Vanilla JS">
    ```typescript
    class StreamingRenderer {
      private container: HTMLElement;
      private currentElement: HTMLElement | null = null;

      constructor(containerId: string) {
        this.container = document.getElementById(containerId)!;
      }

      async processStream(runner, query, session) {
        let currentText = '';

        for await (const event of runner.runAsync(query, session)) {
          if (event.content?.parts?.[0]?.text) {
            if (event.partial) {
              currentText += event.content.parts[0].text;
              this.updateCurrentElement(currentText);
            } else if (event.isFinalResponse()) {
              currentText += event.content.parts[0].text;
              this.finalizeCurrentElement(currentText);
              this.createNewElement();
              currentText = '';
            }
          }
        }
      }

      private updateCurrentElement(text: string) {
        if (!this.currentElement) {
          this.createNewElement();
        }
        this.currentElement!.textContent = text;
      }

      private createNewElement() {
        this.currentElement = document.createElement('div');
        this.currentElement.className = 'streaming-text';
        this.container.appendChild(this.currentElement);
      }

      private finalizeCurrentElement(text: string) {
        if (this.currentElement) {
          this.currentElement.textContent = text;
          this.currentElement.className = 'final-text';
        }
      }
    }
    ```
  </Tab>

  <Tab value="Vue Composition">
    ```typescript
    import { ref, onMounted } from 'vue';

    export function useEventStream(runner, query, session) {
      const streamingText = ref('');
      const events = ref<Event[]>([]);
      const isStreaming = ref(false);

      const processStream = async () => {
        let currentText = '';
        isStreaming.value = true;

        try {
          for await (const event of runner.runAsync(query, session)) {
            events.value.push(event);

            if (event.content?.parts?.[0]?.text) {
              if (event.partial) {
                currentText += event.content.parts[0].text;
                streamingText.value = currentText;
              } else if (event.isFinalResponse()) {
                currentText += event.content.parts[0].text;
                streamingText.value = currentText;
                currentText = '';
              }
            }
          }
        } finally {
          isStreaming.value = false;
        }
      };

      onMounted(processStream);

      return { streamingText, events, isStreaming };
    }
    ```
  </Tab>
</Tabs>

## Advanced Streaming Patterns

### Multi-Stream Handling

Handle multiple concurrent streams:

```typescript
class MultiStreamManager {
  private streams = new Map<string, StreamState>();

  interface StreamState {
    text: string;
    isActive: boolean;
    lastUpdate: number;
  }

  async processEvent(event: Event) {
    const streamId = event.invocationId;

    if (!this.streams.has(streamId)) {
      this.streams.set(streamId, {
        text: '',
        isActive: true,
        lastUpdate: Date.now()
      });
    }

    const stream = this.streams.get(streamId)!;

    if (event.content?.parts?.[0]?.text) {
      if (event.partial) {
        stream.text += event.content.parts[0].text;
        stream.lastUpdate = Date.now();
        this.onStreamUpdate(streamId, stream.text);
      } else if (event.isFinalResponse()) {
        stream.text += event.content.parts[0].text;
        stream.isActive = false;
        this.onStreamComplete(streamId, stream.text);
      }
    }
  }

  private onStreamUpdate(streamId: string, text: string) {
    // Update UI for specific stream
    console.log(`Stream ${streamId} updated:`, text);
  }

  private onStreamComplete(streamId: string, text: string) {
    // Finalize stream display
    console.log(`Stream ${streamId} completed:`, text);
    this.streams.delete(streamId);
  }
}
```

### Buffered Streaming

Implement buffering for smoother display:

```typescript
class BufferedStreamRenderer {
  private buffer: string[] = [];
  private isDisplaying = false;
  private displayInterval = 50; // ms

  addChunk(text: string) {
    this.buffer.push(text);
    this.startDisplayLoop();
  }

  private startDisplayLoop() {
    if (this.isDisplaying) return;
    this.isDisplaying = true;

    const displayNext = () => {
      if (this.buffer.length > 0) {
        const chunk = this.buffer.shift()!;
        this.displayChunk(chunk);
        setTimeout(displayNext, this.displayInterval);
      } else {
        this.isDisplaying = false;
      }
    };

    displayNext();
  }

  private displayChunk(chunk: string) {
    // Implement smooth character-by-character display
    const element = document.getElementById('output');
    if (element) {
      element.textContent += chunk;
    }
  }
}
```

## Event Queue Management

### Priority Queue

Handle events with different priorities:

```typescript
class PriorityEventQueue {
  private queues = {
    high: [] as Event[],
    normal: [] as Event[],
    low: [] as Event[]
  };

  enqueue(event: Event, priority: 'high' | 'normal' | 'low' = 'normal') {
    this.queues[priority].push(event);
    this.processNext();
  }

  private processNext() {
    const event = this.dequeue();
    if (event) {
      this.handleEvent(event);
      // Schedule next processing
      setImmediate(() => this.processNext());
    }
  }

  private dequeue(): Event | null {
    if (this.queues.high.length > 0) {
      return this.queues.high.shift()!;
    }
    if (this.queues.normal.length > 0) {
      return this.queues.normal.shift()!;
    }
    if (this.queues.low.length > 0) {
      return this.queues.low.shift()!;
    }
    return null;
  }

  private handleEvent(event: Event) {
    // Process the event based on its type
    if (event.partial) {
      this.handleStreamingEvent(event);
    } else if (event.isFinalResponse()) {
      this.handleFinalEvent(event);
    }
  }
}
```

## Real-Time Features

### Live Status Updates

Show real-time processing status:

```typescript
class LiveStatusManager {
  private statusElement: HTMLElement;
  private currentStatus = 'idle';

  constructor(elementId: string) {
    this.statusElement = document.getElementById(elementId)!;
  }

  updateFromEvent(event: Event) {
    if (event.partial) {
      this.setStatus('streaming', 'Receiving response...');
    } else if (event.getFunctionCalls().length > 0) {
      this.setStatus('processing', 'Using tools...');
    } else if (event.getFunctionResponses().length > 0) {
      this.setStatus('processing', 'Processing results...');
    } else if (event.isFinalResponse()) {
      this.setStatus('complete', 'Response complete');
      setTimeout(() => this.setStatus('idle', 'Ready'), 2000);
    }
  }

  private setStatus(status: string, message: string) {
    this.currentStatus = status;
    this.statusElement.textContent = message;
    this.statusElement.className = `status ${status}`;
  }
}
```

### Typing Indicators

Show when agents are "thinking":

```typescript
class TypingIndicator {
  private element: HTMLElement;
  private timer: NodeJS.Timeout | null = null;

  constructor(elementId: string) {
    this.element = document.getElementById(elementId)!;
  }

  show(agentName: string) {
    this.element.textContent = `${agentName} is thinking...`;
    this.element.style.display = 'block';
    this.startAnimation();
  }

  hide() {
    this.element.style.display = 'none';
    this.stopAnimation();
  }

  private startAnimation() {
    let dots = '';
    this.timer = setInterval(() => {
      dots = dots.length >= 3 ? '' : dots + '.';
      this.element.textContent = this.element.textContent?.replace(/\.+$/, '') + dots;
    }, 500);
  }

  private stopAnimation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
```

## Performance Optimization

### Debounced Updates

Reduce UI update frequency:

```typescript
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

class OptimizedStreamRenderer {
  private debouncedUpdate = debounce((text: string) => {
    this.updateUI(text);
  }, 16); // ~60fps

  handleStreamingEvent(event: Event) {
    if (event.partial && event.content?.parts?.[0]?.text) {
      this.debouncedUpdate(event.content.parts[0].text);
    }
  }

  private updateUI(text: string) {
    // Expensive UI update operation
    document.getElementById('output')!.textContent = text;
  }
}
```

### Memory Management

Handle large streams efficiently:

```typescript
class MemoryEfficientStream {
  private maxEvents = 1000;
  private events: Event[] = [];

  addEvent(event: Event) {
    this.events.push(event);

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }
  }

  getRecentEvents(count: number = 100): Event[] {
    return this.events.slice(-count);
  }

  cleanup() {
    this.events = [];
  }
}
```

## Error Handling in Streams

### Stream Recovery

Handle stream interruptions gracefully:

```typescript
async function robustStreamProcessing(runner, query, session) {
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      for await (const event of runner.runAsync(query, session)) {
        await processEvent(event);
      }
      break; // Success, exit retry loop
    } catch (error) {
      retries++;
      console.warn(`Stream interrupted (attempt ${retries}):`, error);

      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      } else {
        console.error('Max retries exceeded, stream failed');
        throw error;
      }
    }
  }
}
```

<Callout type="warn">
  When implementing streaming, always handle network interruptions and provide fallback mechanisms for critical functionality.
</Callout>

Event streaming enables responsive, real-time agent interactions that significantly improve user experience in ADK applications.

# Event Patterns
URL: /docs/framework/events/patterns

Common architectural patterns and best practices for event-driven ADK applications

***

title: Event Patterns
description: Common architectural patterns and best practices for event-driven ADK applications
-----------------------------------------------------------------------------------------------

import { Callout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';

This guide covers common architectural patterns for building robust, scalable event-driven applications with ADK.

## Architectural Patterns

### Event Sourcing

Store all application state changes as a sequence of events:

```typescript
class EventStore {
  private events: Event[] = [];
  private snapshots = new Map<string, any>();

  append(event: Event) {
    this.events.push(event);
    this.updateSnapshot(event);
  }

  getEventHistory(sessionId: string): Event[] {
    return this.events.filter(e =>
      e.invocationId === sessionId ||
      e.content?.sessionId === sessionId
    );
  }

  rebuildState(sessionId: string): Record<string, any> {
    const state: Record<string, any> = {};
    const events = this.getEventHistory(sessionId);

    for (const event of events) {
      if (event.actions?.stateDelta) {
        Object.assign(state, event.actions.stateDelta);
      }
    }

    return state;
  }

  private updateSnapshot(event: Event) {
    if (event.actions?.stateDelta) {
      const sessionId = event.invocationId;
      const currentSnapshot = this.snapshots.get(sessionId) || {};
      this.snapshots.set(sessionId, {
        ...currentSnapshot,
        ...event.actions.stateDelta
      });
    }
  }
}
```

### Command Query Responsibility Segregation (CQRS)

Separate event writing from reading:

<Tabs items={['Command Handler', 'Query Handler', 'Event Bus']}>
  <Tab value="Command Handler">
    ```typescript
    interface Command {
      type: string;
      payload: any;
      sessionId: string;
    }

    class CommandHandler {
      constructor(private eventStore: EventStore) {}

      async execute(command: Command): Promise<Event[]> {
        const events: Event[] = [];

        switch (command.type) {
          case 'USER_MESSAGE':
            events.push(this.createUserMessageEvent(command));
            break;
          case 'AGENT_RESPONSE':
            events.push(this.createAgentResponseEvent(command));
            break;
          case 'STATE_UPDATE':
            events.push(this.createStateUpdateEvent(command));
            break;
        }

        for (const event of events) {
          this.eventStore.append(event);
        }

        return events;
      }

      private createUserMessageEvent(command: Command): Event {
        return new Event({
          author: 'user',
          invocationId: command.sessionId,
          content: { parts: [{ text: command.payload.message }] }
        });
      }
    }
    ```
  </Tab>

  <Tab value="Query Handler">
    ```typescript
    class QueryHandler {
      constructor(private eventStore: EventStore) {}

      getConversationHistory(sessionId: string): Event[] {
        return this.eventStore.getEventHistory(sessionId)
          .filter(event => event.isFinalResponse());
      }

      getSessionState(sessionId: string): Record<string, any> {
        return this.eventStore.rebuildState(sessionId);
      }

      getEventsByTimeRange(start: Date, end: Date): Event[] {
        const startTimestamp = start.getTime() / 1000;
        const endTimestamp = end.getTime() / 1000;

        return this.eventStore.getEventHistory('')
          .filter(event =>
            event.timestamp >= startTimestamp &&
            event.timestamp <= endTimestamp
          );
      }

      getEventStatistics(sessionId: string) {
        const events = this.eventStore.getEventHistory(sessionId);

        return {
          totalEvents: events.length,
          messageCount: events.filter(e => e.content?.parts?.[0]?.text).length,
          toolCalls: events.reduce((sum, e) => sum + e.getFunctionCalls().length, 0),
          averageResponseTime: this.calculateAverageResponseTime(events)
        };
      }
    }
    ```
  </Tab>

  <Tab value="Event Bus">
    ```typescript
    class EventBus {
      private subscribers = new Map<string, Array<(event: Event) => void>>();

      subscribe(eventType: string, handler: (event: Event) => void) {
        if (!this.subscribers.has(eventType)) {
          this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType)!.push(handler);
      }

      publish(event: Event) {
        const eventType = this.getEventType(event);
        const handlers = this.subscribers.get(eventType) || [];

        handlers.forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error('Event handler error:', error);
          }
        });
      }

      private getEventType(event: Event): string {
        if (event.author === 'user') return 'USER_EVENT';
        if (event.getFunctionCalls().length > 0) return 'TOOL_REQUEST';
        if (event.getFunctionResponses().length > 0) return 'TOOL_RESPONSE';
        if (event.isFinalResponse()) return 'FINAL_RESPONSE';
        return 'GENERAL_EVENT';
      }
    }
    ```
  </Tab>
</Tabs>

## State Management Patterns

### State Machine

Manage complex state transitions:

```typescript
interface StateTransition {
  from: string;
  to: string;
  event: string;
  condition?: (event: Event) => boolean;
}

class StateMachine {
  private currentState: string;
  private transitions: StateTransition[] = [];

  constructor(initialState: string) {
    this.currentState = initialState;
    this.defineTransitions();
  }

  private defineTransitions() {
    this.transitions = [
      { from: 'idle', to: 'processing', event: 'USER_MESSAGE' },
      { from: 'processing', to: 'waiting_tool', event: 'TOOL_REQUEST' },
      { from: 'waiting_tool', to: 'processing', event: 'TOOL_RESPONSE' },
      { from: 'processing', to: 'complete', event: 'FINAL_RESPONSE' },
      { from: 'complete', to: 'idle', event: 'USER_MESSAGE' },
      {
        from: 'processing',
        to: 'error',
        event: 'ERROR',
        condition: (event) => !!event.errorCode
      }
    ];
  }

  processEvent(event: Event): string {
    const eventType = this.getEventType(event);
    const transition = this.transitions.find(t =>
      t.from === this.currentState &&
      t.event === eventType &&
      (!t.condition || t.condition(event))
    );

    if (transition) {
      console.log(`State transition: ${this.currentState} → ${transition.to}`);
      this.currentState = transition.to;
      this.onStateChange(transition.to, event);
    }

    return this.currentState;
  }

  private onStateChange(newState: string, event: Event) {
    // Handle state-specific logic
    switch (newState) {
      case 'processing':
        this.startProcessingIndicator();
        break;
      case 'waiting_tool':
        this.showToolExecutionStatus();
        break;
      case 'complete':
        this.hideLoadingIndicators();
        break;
      case 'error':
        this.showErrorMessage(event.errorMessage || 'Unknown error');
        break;
    }
  }
}
```

### Saga Pattern

Manage complex, long-running workflows:

```typescript
class ConversationSaga {
  private steps: SagaStep[] = [];
  private currentStep = 0;
  private compensations: Array<() => Promise<void>> = [];

  async execute(events: AsyncGenerator<Event>): Promise<void> {
    try {
      for await (const event of events) {
        await this.processStep(event);
      }
    } catch (error) {
      await this.compensate();
      throw error;
    }
  }

  private async processStep(event: Event) {
    const step = this.steps[this.currentStep];
    if (!step) return;

    try {
      const result = await step.execute(event);
      if (result.shouldProceed) {
        this.currentStep++;
      }

      // Add compensation for this step
      if (step.compensate) {
        this.compensations.push(() => step.compensate!(result));
      }
    } catch (error) {
      throw new SagaError(`Step ${this.currentStep} failed`, error);
    }
  }

  private async compensate() {
    console.log('Executing saga compensation');

    // Execute compensations in reverse order
    for (const compensation of this.compensations.reverse()) {
      try {
        await compensation();
      } catch (error) {
        console.error('Compensation failed:', error);
      }
    }
  }
}
```

## Observer Patterns

### Event Listeners

Implement reactive behaviors:

```typescript
class EventObserver {
  private listeners = new Map<string, Set<EventListener>>();

  interface EventListener {
    predicate: (event: Event) => boolean;
    handler: (event: Event) => void | Promise<void>;
    once?: boolean;
  }

  addListener(
    name: string,
    predicate: (event: Event) => boolean,
    handler: (event: Event) => void | Promise<void>,
    once = false
  ) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Set());
    }

    this.listeners.get(name)!.add({
      predicate,
      handler,
      once
    });
  }

  async notify(event: Event) {
    for (const [name, listenerSet] of this.listeners) {
      const listenersToRemove: EventListener[] = [];

      for (const listener of listenerSet) {
        if (listener.predicate(event)) {
          try {
            await listener.handler(event);
          } catch (error) {
            console.error(`Listener ${name} error:`, error);
          }

          if (listener.once) {
            listenersToRemove.push(listener);
          }
        }
      }

      // Remove one-time listeners
      listenersToRemove.forEach(listener => listenerSet.delete(listener));
    }
  }
}

// Usage example
const observer = new EventObserver();

observer.addListener(
  'userMessages',
  (event) => event.author === 'user',
  (event) => console.log('User said:', event.content?.parts?.[0]?.text)
);

observer.addListener(
  'toolCalls',
  (event) => event.getFunctionCalls().length > 0,
  (event) => logToolUsage(event.getFunctionCalls())
);
```

### Reactive Streams

Create reactive event processing pipelines:

```typescript
class EventStream {
  private transforms: Array<(event: Event) => Event | null> = [];
  private filters: Array<(event: Event) => boolean> = [];
  private subscribers: Array<(event: Event) => void> = [];

  filter(predicate: (event: Event) => boolean): EventStream {
    this.filters.push(predicate);
    return this;
  }

  map(transform: (event: Event) => Event): EventStream {
    this.transforms.push(transform);
    return this;
  }

  subscribe(handler: (event: Event) => void): () => void {
    this.subscribers.push(handler);

    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(handler);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  push(event: Event) {
    // Apply filters
    for (const filter of this.filters) {
      if (!filter(event)) {
        return; // Event filtered out
      }
    }

    // Apply transforms
    let transformedEvent = event;
    for (const transform of this.transforms) {
      const result = transform(transformedEvent);
      if (result === null) return; // Transform filtered out event
      transformedEvent = result;
    }

    // Notify subscribers
    this.subscribers.forEach(subscriber => {
      try {
        subscriber(transformedEvent);
      } catch (error) {
        console.error('Stream subscriber error:', error);
      }
    });
  }
}

// Usage example
const userMessageStream = new EventStream()
  .filter(event => event.author === 'user')
  .map(event => ({
    ...event,
    content: {
      ...event.content,
      timestamp: Date.now()
    }
  }))
  .subscribe(event => processUserMessage(event));
```

## Error Handling Patterns

### Circuit Breaker

Prevent cascade failures:

```typescript
class EventCircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private maxFailures = 5,
    private timeout = 60000 // 1 minute
  ) {}

  async execute(event: Event, handler: (event: Event) => Promise<any>) {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await handler(event);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = Date.now();

    if (this.failures >= this.maxFailures) {
      this.state = 'open';
    }
  }
}
```

### Retry with Backoff

Handle transient failures:

```typescript
class RetryHandler {
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          break; // Don't delay on last attempt
        }

        const delay = this.calculateDelay(attempt, baseDelay);
        console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, error);
        await this.delay(delay);
      }
    }

    throw new Error(`Operation failed after ${maxRetries + 1} attempts: ${lastError!.message}`);
  }

  private calculateDelay(attempt: number, baseDelay: number): number {
    // Exponential backoff with jitter
    const exponentialDelay = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return exponentialDelay + jitter;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Performance Patterns

### Event Batching

Process events in batches for efficiency:

```typescript
class EventBatcher {
  private batch: Event[] = [];
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private batchSize = 10,
    private flushInterval = 100, // ms
    private processor: (events: Event[]) => Promise<void>
  ) {}

  add(event: Event) {
    this.batch.push(event);

    if (this.batch.length >= this.batchSize) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  private async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.batch.length === 0) return;

    const eventsToProcess = [...this.batch];
    this.batch = [];

    try {
      await this.processor(eventsToProcess);
    } catch (error) {
      console.error('Batch processing error:', error);
      // Optionally re-queue failed events
    }
  }
}
```

### Event Deduplication

Prevent duplicate event processing:

```typescript
class EventDeduplicator {
  private processedEvents = new Set<string>();
  private cleanupInterval: NodeJS.Timeout;

  constructor(private ttl = 300000) { // 5 minutes
    // Periodic cleanup of old event IDs
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, ttl);
  }

  isDuplicate(event: Event): boolean {
    const key = this.getEventKey(event);
    return this.processedEvents.has(key);
  }

  markProcessed(event: Event) {
    const key = this.getEventKey(event);
    this.processedEvents.add(key);
  }

  private getEventKey(event: Event): string {
    // Create unique key based on content and context
    return `${event.id}-${event.timestamp}-${event.author}`;
  }

  private cleanup() {
    // Simple cleanup - in production, use time-based expiry
    if (this.processedEvents.size > 10000) {
      this.processedEvents.clear();
    }
  }

  destroy() {
    clearInterval(this.cleanupInterval);
  }
}
```

## Best Practices

### Event Design

* **Use past tense**: Events represent things that happened
* **Include context**: Provide enough information for processing
* **Keep events immutable**: Never modify events after creation
* **Version events**: Plan for schema evolution

### Error Handling

* **Graceful degradation**: Continue processing other events when one fails
* **Idempotent handlers**: Design handlers to be safely retried
* **Dead letter queues**: Store failed events for analysis

### Performance

* **Filter early**: Apply filters before expensive operations
* **Batch when possible**: Group related operations
* **Use appropriate data structures**: Choose efficient storage for your access patterns

<Callout type="info">
  These patterns provide building blocks for sophisticated event-driven architectures. Choose patterns that fit your specific use case and complexity requirements.
</Callout>

Event patterns enable you to build maintainable, scalable agent applications that can handle complex workflows and provide excellent user experiences.

# Writing Effective Agent Instructions
URL: /docs/framework/guides/agent-instructions

Comprehensive guide to crafting instructions that make your AI agents specialized, coordinated, and effective

***

title: Writing Effective Agent Instructions
description: Comprehensive guide to crafting instructions that make your AI agents specialized, coordinated, and effective
--------------------------------------------------------------------------------------------------------------------------

import { Cards, Card } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";

Agent instructions are the most critical factor in determining how effective, specialized, and coordinated your AI agents will be. This comprehensive guide covers everything you need to know about writing instructions that create powerful, reliable agents.

## Why Instructions Matter

Instructions serve as your agent's "personality," decision-making framework, and behavioral guide. They are especially crucial when:

* **Coordinating multiple agents** - Clear role definitions prevent overlap and ensure proper delegation
* **Using tools effectively** - Specific guidance on when and how to use each tool
* **Maintaining consistency** - Behavioral guidelines ensure predictable responses
* **Handling edge cases** - Instructions define how to handle unexpected situations
* **Specialization** - Focused instructions create expert agents for specific domains

## Instruction Best Practices

<Callout type="info" title="Effective Instruction Patterns">
  **Be Specific and Actionable**

  * ❌ "You are a helpful assistant"
  * ✅ "You are a customer support specialist. Always ask for order numbers when handling complaints, escalate refund requests over $500 to the billing\_agent, and provide tracking links for shipping inquiries."

  **Define Clear Boundaries**

  * ❌ "Help users with various tasks"
  * ✅ "You handle only technical support queries. For billing questions, transfer to billing\_agent. For product recommendations, transfer to sales\_agent."

  **Include Tool Usage Guidelines**

  * ❌ "You can search the web"
  * ✅ "Use web search for current events, stock prices, and recent news. Always verify information with at least 2 sources before presenting facts."
</Callout>

## Instruction Types & Examples

### 1. Role-Based Instructions (Most Common)

Define the agent's role, expertise, and behavioral patterns:

```ts
const customerSupportAgent = new LlmAgent({
  name: "customer_support",
  instruction: `
    You are a senior customer support representative for TechCorp.

    **Your expertise:**
    - Product troubleshooting and technical issues
    - Order status and shipping inquiries
    - Account management and billing questions

    **Your approach:**
    - Always greet customers warmly and professionally
    - Ask clarifying questions to understand the issue completely
    - Provide step-by-step solutions with clear explanations
    - Follow up to ensure the issue is resolved

    **Escalation rules:**
    - Refund requests over $500 → transfer to billing_specialist
    - Technical issues requiring code changes → transfer to engineering_support
    - Angry customers after 3 exchanges → transfer to senior_support

    **Tools available:**
    - Use order_lookup for checking order status
    - Use knowledge_search for technical documentation
    - Use ticket_system for creating support tickets
  `,
});
```

### 2. Multi-Agent Coordination Instructions

Instructions that define how agents work together in a system:

```ts
const coordinatorAgent = new LlmAgent({
  name: "task_coordinator",
  instruction: `
    You are a task coordinator managing a team of specialized agents.

    **Your team:**
    - research_agent: Gathers information, analyzes data, creates reports
    - creative_agent: Writes content, designs materials, brainstorms ideas
    - technical_agent: Handles code, APIs, technical implementations
    - review_agent: Quality checks, proofreading, final validation

    **Coordination principles:**
    1. **Analyze the request** - Break complex tasks into subtasks
    2. **Route appropriately** - Match subtasks to agent expertise
    3. **Sequence correctly** - Research before creation, creation before review
    4. **Quality control** - Always have review_agent check final outputs
    5. **Provide context** - Give each agent relevant background and requirements

    **Workflow patterns:**
    - Content creation: research_agent → creative_agent → review_agent
    - Technical projects: research_agent → technical_agent → review_agent
    - Analysis tasks: research_agent → technical_agent (for data processing)
    - Complex projects: All agents in sequence with multiple review cycles

    Always explain your coordination decisions to the user.
  `,
  subAgents: [researchAgent, creativeAgent, technicalAgent, reviewAgent],
});
```

### 3. Context-Aware Dynamic Instructions

Instructions that adapt based on session state and user context:

```ts
const personalAssistant = new LlmAgent({
  name: "personal_assistant",
  instruction: (ctx) => {
    const user = ctx.session.state.userProfile;
    const timeOfDay = new Date().getHours();
    const greeting =
      timeOfDay < 12
        ? "Good morning"
        : timeOfDay < 18
        ? "Good afternoon"
        : "Good evening";

    return `
      ${greeting}, ${user?.name || "there"}! I'm your personal AI assistant.

      **Your preferences:**
      - Communication style: ${user?.communicationStyle || "Professional"}
      - Priority areas: ${user?.priorities?.join(", ") || "General assistance"}
      - Current time zone: ${user?.timezone || "UTC"}

      **Today's context:**
      - Calendar events: ${ctx.session.state.todayEvents?.length || 0} scheduled
      - Pending tasks: ${ctx.session.state.pendingTasks?.length || 0} remaining
      - Weather: ${ctx.session.state.weather || "Not available"}

      **My capabilities:**
      - Schedule management and calendar optimization
      - Email composition and response drafting
      - Task organization and priority management
      - Information research and summarization
      - Travel planning and logistics coordination

      **Working style:**
      - Be ${
        user?.communicationStyle === "casual"
          ? "friendly and conversational"
          : "professional and concise"
      }
      - Prioritize ${user?.priorities?.[0] || "efficiency and accuracy"}
      - Always confirm before making changes to calendar or sending emails
      - Proactively suggest optimizations and improvements
    `;
  },
});
```

### 4. Tool-Specific Instructions

Instructions that focus on effective tool usage patterns:

```ts
const researchAgent = new LlmAgent({
  name: "research_specialist",
  instruction: `
    You are a research specialist focused on gathering accurate, comprehensive information.

    **Research methodology:**
    1. **Start broad** - Use web_search with general terms to understand the topic scope
    2. **Go specific** - Search for detailed information on key aspects found
    3. **Verify sources** - Cross-reference information across multiple reliable sources
    4. **Document everything** - Save important findings using save_research_note
    5. **Synthesize findings** - Create coherent summary connecting all research points

    **Tool usage guidelines:**

    **web_search:**
    - Use specific, targeted queries rather than broad terms
    - Search recent sources for current information (add "2024" or "latest")
    - Include scientific terms for technical topics
    - Example: "renewable energy efficiency improvements 2024" not "renewable energy"

    **academic_search:**
    - Use for peer-reviewed scientific information
    - Include author names or institution names for credible sources
    - Focus on recent publications (last 5 years) unless historical context needed

    **save_research_note:**
    - Save key statistics, quotes, and source URLs immediately after finding them
    - Tag notes by topic for easy retrieval
    - Include source credibility assessment in notes

    **Quality standards:**
    - Minimum 3 sources for any factual claim
    - Prefer .edu, .gov, and established news sources
    - Flag conflicting information and explain discrepancies
    - Always include publication dates and source URLs in final reports
  `,
  tools: [new WebSearchTool(), new AcademicSearchTool(), new SaveNotesTool()],
});
```

### 5. Constraint-Based Instructions

Instructions that define clear boundaries and limitations:

```ts
const safetyAgent = new LlmAgent({
  name: "content_moderator",
  instruction: `
    You are a content safety specialist ensuring all generated content meets company guidelines.

    **Strict requirements - NEVER compromise on these:**

    🚫 **Prohibited content:**
    - Personal information (names, addresses, phone numbers, SSNs)
    - Financial data (credit cards, bank accounts, investment advice)
    - Medical diagnoses or treatment recommendations
    - Legal advice or interpretation of laws
    - Harmful, offensive, or discriminatory content
    - Copyrighted material without proper attribution

    ✅ **Required practices:**
    - Always verify facts using the fact_check tool before presenting information
    - Include disclaimers for any advice or recommendations
    - Cite sources for all factual claims
    - Use inclusive, respectful language in all communications
    - Flag any uncertain or potentially problematic content for human review

    **Decision framework:**
    1. **Safety first** - If uncertain, err on the side of caution
    2. **Transparency** - Clearly explain why content was flagged or modified
    3. **Alternatives** - Offer safer alternatives when blocking problematic requests
    4. **Escalation** - Transfer to human_moderator for complex safety decisions

    **Tools usage:**
    - Use fact_check for all factual claims before approval
    - Use content_scan for automated safety screening
    - Use flag_content to mark items needing human review

    Remember: Your role is protection and guidance, not restriction. Help users achieve their goals safely.
  `,
});
```

## Advanced Instruction Techniques

### Template Variables and State Integration

The framework automatically injects session state values into your instructions using template variables. Simply use `{variable_name}` syntax and the framework will replace it with the corresponding value from `context.state`.

<Callout type="info" title="Automatic State Interpolation">
  **How it works:**

  * Use `{variable_name}` in your instruction strings
  * The framework automatically replaces these with values from session state
  * State is updated by tools using `context.state.set(key, value)`
  * Instructions are re-evaluated with fresh state on each interaction

  **Example:** If your state contains `{user_name: "Alice", cart_count: 3}`, then `"Hello {user_name}, you have {cart_count} items"` becomes `"Hello Alice, you have 3 items"`
</Callout>

#### Shopping Cart Example with State Interpolation

```ts
// Tools update state which gets injected into instructions
const addItemTool = createTool({
  name: "add_item",
  schema: z.object({
    item: z.string(),
    quantity: z.number(),
    price: z.number(),
  }),
  fn: ({ item, quantity, price }, context) => {
    const cart = context.state.get("cart", []);
    cart.push({ item, quantity, price });

    // Update state - these values will be injected into instructions
    context.state.set("cart", cart);
    context.state.set("cartCount", cart.length);
    context.state.set("cartTotal", cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

    return { success: true, item, quantity };
  },
});

const shoppingAgent = new LlmAgent({
  name: "shopping_assistant",
  instruction: `
    You are a shopping cart assistant helping users manage their purchases.

    **Current cart status:**
    - Items in cart: {cartCount}
    - Cart total: ${cartTotal}
    - Cart contents: {cart}

    **Your capabilities:**
    - Add items to cart with add_item tool
    - View cart contents with view_cart tool
    - Calculate totals and provide shopping advice

    **Behavior:**
    - When users ask about their cart, reference the current state above
    - Suggest related items based on cart contents
    - Alert users when cart total exceeds $100 for potential discounts
    - Always confirm item additions and provide updated totals
  `,
  tools: [addItemTool, viewCartTool],
});
```

#### User Profile Example with Dynamic Context

```ts
const personalAssistant = new LlmAgent({
  name: "personal_assistant",
  instruction: `
    Hello {user_name}! I'm your personal AI assistant.

    **Your profile:**
    - Name: {user_name}
    - Preferred communication: {communication_style}
    - Time zone: {user_timezone}
    - Current location: {user_location}

    **Today's context:**
    - Weather: {current_weather}
    - Calendar events: {todays_events_count} scheduled
    - Pending tasks: {pending_tasks_count} remaining
    - Unread messages: {unread_messages_count}

    **Personalized approach:**
    - Address you as {user_name} in responses
    - Use {communication_style} tone (formal/casual/friendly)
    - Consider your {user_timezone} for scheduling
    - Reference your location for weather and local recommendations

    I'll help you stay organized and productive throughout your day!
  `,
});

// State would be populated by tools or session initialization:
// {
//   user_name: "Alice",
//   communication_style: "friendly",
//   user_timezone: "PST",
//   current_weather: "Sunny, 72°F",
//   todays_events_count: 3,
//   pending_tasks_count: 5
// }
```

#### Business Context Example

```ts
const salesAgent = new LlmAgent({
  name: "sales_specialist",
  instruction: `
    You are a sales specialist for {company_name}.

    **Customer context:**
    - Customer type: {customer_type}
    - Previous purchases: {purchase_history}
    - Budget range: {budget_range}
    - Industry: {customer_industry}

    **Current promotions:** {active_promotions}
    **Inventory status:** {inventory_levels}

    **Approach:**
    - For enterprise customers: Focus on ROI, scalability, and support options
    - For small business: Emphasize cost-effectiveness and ease of use
    - For individual customers: Highlight features and personal benefits

    **Pricing strategy:**
    - Always start with value proposition before discussing price
    - Offer appropriate tier based on customer type and budget
    - Mention relevant promotions only if they apply to customer needs

    Use customer_lookup tool to verify information before making recommendations.
  `,
});

// Session state would populate these variables:
// {
//   company_name: "TechCorp",
//   customer_type: "enterprise",
//   purchase_history: "Previous: CRM Software ($50k)",
//   budget_range: "$100k-500k",
//   active_promotions: "20% off enterprise plans this month"
// }
```

<Callout type="info" title="See State Interpolation in Action">
  **Working Example:** Check out the complete working example of state interpolation in the [Tools and State Management example](https://github.com/IQ-AI/adk-ts/tree/main/apps/examples/src/02-tools-and-state) which demonstrates:

  * Using `{cartCount}` and `{cart}` in instructions
  * Tools updating state with `context.state.set()`
  * Instructions automatically reflecting current state
  * Agents referencing state without calling tools

  This example shows exactly how the `{variable_name}` syntax works in practice with a shopping cart scenario.
</Callout>

### Conditional Logic Instructions

Instructions that include decision trees and conditional behavior:

```ts
const diagnosticAgent = new LlmAgent({
  name: "technical_diagnostics",
  instruction: `
    You are a technical diagnostic specialist for troubleshooting system issues.

    **Diagnostic workflow:**

    IF issue_category == "performance":
      1. Check system_metrics for CPU, memory, disk usage
      2. Review recent_logs for error patterns
      3. If metrics > 80% → Recommend resource upgrade
      4. If metrics normal → Check application-specific logs

    IF issue_category == "connectivity":
      1. Run network_test to check connection status
      2. If internal network fails → Check local configuration
      3. If external network fails → Check firewall and DNS
      4. If partial connectivity → Run traceroute analysis

    IF issue_category == "security":
      1. Immediately run security_scan
      2. If threats detected → Transfer to security_specialist IMMEDIATELY
      3. If no threats → Check access_logs for unusual patterns
      4. Document all findings in security_report

    **Escalation rules:**
    - Security threats → security_specialist (immediate)
    - Hardware failures → hardware_support
    - Complex network issues → network_specialist
    - Database problems → database_admin

    **Communication:**
    - Explain each diagnostic step to the user
    - Provide ETA for resolution when possible
    - Always confirm before making system changes

    Use run_diagnostic tool for automated checks, log_analysis for reviewing system logs.
  `,
});
```

## Instructions for Multi-Agent Systems

In multi-agent systems, instructions become even more critical for coordination:

```ts
// Parent agent with coordination instructions
const projectManagerAgent = new LlmAgent({
  name: "project_manager",
  globalInstruction:
    "All agents must provide progress updates and ask for clarification when requirements are unclear.",
  instruction: `
    You are a senior project manager coordinating a development team.

    **Team coordination principles:**

    **Planning phase:**
    1. Break down requests into clear, actionable tasks
    2. Assign tasks based on agent expertise and current workload
    3. Set realistic timelines with buffer for quality review
    4. Ensure all agents understand the overall project context

    **Execution phase:**
    1. Monitor progress and provide support when agents get stuck
    2. Facilitate communication between agents when coordination is needed
    3. Make decisions quickly when agents request clarification
    4. Adjust timelines and resources as issues arise

    **Quality assurance:**
    1. Always have code_reviewer check technical implementations
    2. Have content_editor review all user-facing text
    3. Run final integration tests before marking tasks complete
    4. Document lessons learned for future projects

    **Agent delegation patterns:**
    - requirements_analyst: For clarifying project scope and requirements
    - backend_developer: For API development and database work
    - frontend_developer: For UI/UX implementation
    - code_reviewer: For code quality and security review
    - content_editor: For documentation and user-facing text

    Keep the user informed of progress and any decisions made on their behalf.
  `,
  subAgents: [
    requirementsAnalyst,
    backendDev,
    frontendDev,
    codeReviewer,
    contentEditor,
  ],
});

// Specialized sub-agent with focused instructions
const backendDeveloper = new LlmAgent({
  name: "backend_developer",
  instruction: `
    You are a senior backend developer specializing in scalable API development.

    **Technical standards:**
    - Use TypeScript for all new code
    - Follow RESTful API design principles
    - Implement proper error handling and validation
    - Write comprehensive tests (minimum 80% coverage)
    - Document all API endpoints with OpenAPI specs

    **Architecture patterns:**
    - Use dependency injection for better testability
    - Implement repository pattern for data access
    - Use middleware for cross-cutting concerns (auth, logging, etc.)
    - Follow SOLID principles and clean architecture

    **Communication with team:**
    - Update project_manager on progress every 2 hours
    - Ask code_reviewer for feedback before finalizing implementations
    - Coordinate with frontend_developer on API contract changes
    - Flag any blocking issues immediately

    **Tools and workflow:**
    - Use code_generator for boilerplate API endpoints
    - Use test_runner to validate implementations
    - Use database_migrator for schema changes
    - Use api_docs_generator for documentation

    Always provide working, tested code with clear documentation.
  `,
});
```

## Common Pitfalls to Avoid

<Callout type="warn" title="Instruction Pitfalls">
  **Too Vague:** "Be helpful and answer questions"

  * Problem: No guidance on approach, tools, or boundaries
  * Solution: Define specific behaviors and decision criteria

  **Conflicting Directives:** "Be concise but provide comprehensive details"

  * Problem: Contradictory requirements cause inconsistent behavior
  * Solution: Clarify priority and context for when to be brief vs detailed

  **Missing Context:** "Transfer complex requests to the specialist"

  * Problem: Agent can't determine what constitutes "complex"
  * Solution: Define specific criteria for complexity and transfers

  **Overwhelming Length:** 2000+ word instructions with every possible scenario

  * Problem: Important guidelines get lost in noise
  * Solution: Focus on core behaviors, use examples over exhaustive rules
</Callout>

## Quick Reference Checklist

Use this checklist when writing agent instructions:

### ✅ Essential Elements

* [ ] **Role definition** - What is the agent's primary function?
* [ ] **Scope and boundaries** - What should/shouldn't the agent handle?
* [ ] **Tool usage guidelines** - When and how to use each tool?
* [ ] **Communication style** - How should the agent interact with users?
* [ ] **Decision criteria** - How should the agent make choices?

### ✅ Multi-Agent Systems

* [ ] **Delegation rules** - When to transfer to other agents?
* [ ] **Coordination patterns** - How to work with other agents?
* [ ] **Escalation procedures** - When to escalate or get help?
* [ ] **Context sharing** - What information to pass between agents?
* [ ] **Quality standards** - What constitutes good work?

### ✅ Advanced Features

* [ ] **Dynamic adaptation** - How to adjust based on context?
* [ ] **Error handling** - What to do when things go wrong?
* [ ] **Performance optimization** - How to work efficiently?
* [ ] **Feedback loops** - How to improve over time?
* [ ] **Monitoring hooks** - What to log or report?

## Related Topics

<Cards>
  <Card title="🤖 LLM Agents" description="Learn about LLM agent configuration and capabilities" href="/docs/framework/agents/llm-agents" />

  <Card title="👥 Multi-Agent Systems" description="Coordinate multiple agents with effective instructions" href="/docs/framework/agents/multi-agents" />

  <Card title="🛠️ Tools" description="Available tools and how to guide agents in using them" href="/docs/framework/tools" />

  <Card title="🧠 Sessions & Memory" description="Use session state in dynamic instructions" href="/docs/framework/sessions/session" />
</Cards>

# Deploying an Agent
URL: /docs/framework/guides/deploying-agents

This guide explains how to deploy an ADK agent on Railway using a Docker image hosted on DockerHub or via GitHub CI.

***

title: Deploying an Agent
description: This guide explains how to deploy an ADK agent on Railway using a Docker image hosted on DockerHub or via GitHub CI.
---------------------------------------------------------------------------------------------------------------------------------

## Prerequisites

Before you begin, ensure you have:

* **Docker**: Installed and configured on your local machine.
* **DockerHub Account**: To push your Docker image (optional if using GitHub CI).
* **Railway Account**: Sign up at railway.app.
* **ADK-TS Project**: Set up with a `.env` file containing required variables (e.g., `DISCORD_TOKEN`, `GOOGLE_API_KEY`).
* **GitHub Repository**: Your project pushed to GitHub (e.g., your-username/your-repo).

## Steps

### 1. Configure, Build and Push Docker Image

1. **Configure a Dockerfile**\
   Create a `Dockerfile` in your project root directory. This file defines how to build your Docker image:

   ```dockerfile
   # Use Node.js 20 Alpine as the base image (lightweight Linux distribution)
   FROM node:20-alpine

   # Enable pnpm package manager and set a specific version for consistency
   RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

   # Set the working directory inside the container
   WORKDIR /app

   # Copy package files first for better Docker layer caching
   COPY package.json pnpm-lock.yaml ./
   # Install dependencies using frozen lockfile for reproducible builds
   RUN pnpm install --frozen-lockfile

   # Copy TypeScript configuration
   COPY tsconfig.json ./
   # Copy source code
   COPY src ./src
   # Build the TypeScript project
   RUN pnpm build

   # Set production environment
   ENV NODE_ENV=production

   # Define the command to run when the container starts
   CMD ["node", "dist/index.js"]
   ```

   **Key Points:**

   * **Alpine Linux**: Lightweight base image for smaller container size
   * **pnpm**: Fast, disk space efficient package manager
   * **Layer Caching**: Copying package files before source code optimizes build time
   * **Frozen Lockfile**: Ensures exact dependency versions for reproducible builds
   * **Production Build**: Compiles TypeScript to JavaScript for runtime

2. **Build the Docker Image**\
   In your project root directory, run one of the following commands to build your Docker image:

   Syntax:

   ```bash
   docker build -t your_docker_username/your_agent_name:tag .
   ```

   For cross-platform compatibility:

   ```bash
   docker buildx build --platform linux/amd64 -t your_docker_username/your_agent_name:tag .
   ```

3. **Push to DockerHub**\
   Log in to DockerHub and push the image:

   ```bash
   docker login
   docker push your_docker_username/your_agent_name:tag
   ```

   **Alternative: GitHub CI with Railway**\
   Push your `Dockerfile` to your GitHub repository. Configure a GitHub Actions workflow to build and push the Docker image to DockerHub. Link your Railway project to the GitHub repo, enabling Railway to automatically deploy updates from the CI pipeline.

### 2. Set Up Railway

1. **Create a New Project**

   * Log in to Railway.
   * Click "New Project" and select "Deploy from Docker Image" or connect your GitHub repository.

2. **Configure the Docker Image**

   * For DockerHub: Enter the image name `your_docker_username/your_agent_name:tag`.
   * For GitHub CI: Select your repo and branch; Railway will use the `Dockerfile` from the repository.

3. **Add Environment Variables**

   * In the Railway dashboard, go to "Variables" and add required variables from your `.env` file, e.g.:

     ```
     DISCORD_TOKEN=your_discord_bot_token_here
     LLM_MODEL=gemini-2.5-flash
     GOOGLE_API_KEY=your_google_api_key_here
     ADK_DEBUG=false
     ```

4. **Deploy the Service**

   * Click "Deploy" to launch the container with your Docker image or GitHub CI build.

### 3. Verify Deployment

* You can test your bot on Telegram/Discord to confirm functionality.

## Common Issues

* **Docker Push Fails**: Ensure DockerHub login and correct image name.
* **Missing Variables**: Verify all environment variables are set in Railway.
* **CI Failure**: Check GitHub Actions logs for build errors.

## Next Steps

* Monitor deployment via Railway logs.
* Update your `Dockerfile` or code, push to GitHub, and redeploy via CI or manually.


# Overview
URL: /docs/cli

ADK-TS CLI toolkit for AI agent development, testing, and deployment

***

title: Overview
description: ADK-TS CLI toolkit for AI agent development, testing, and deployment
icon: House
-----------

import { Callout } from "fumadocs-ui/components/callout";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";

<Callout type="warn" title="Experimental Feature">
  The ADK-TS CLI is currently experimental and under active development. Features
  and APIs may change in future releases.
</Callout>

The ADK-TS CLI (`@iqai/adk-cli`) is a comprehensive command-line toolkit designed for professional AI agent development. Built with TypeScript and NestJS, it provides a complete development environment from project scaffolding to production deployment.

## Installation

Install globally with:

<Tabs items={["npm", "yarn", "pnpm", "bun"]}>
  <Tab value="npm">
    ```bash
    npm install -g @iqai/adk-cli
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn global add @iqai/adk-cli
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add -g @iqai/adk-cli
    ```
  </Tab>

  <Tab value="bun">
    ```bash
    bun add -g @iqai/adk-cli
    ```
  </Tab>
</Tabs>

## Key Features

### Development & Testing

* **Project Scaffolding** – Generate projects from professional templates (Discord bots, web servers, MCP servers, etc.)
* **Interactive Chat Interface** – Terminal-based chat with markdown rendering for rapid agent testing
* **Web UI** – React-based visual interface for agent management and testing
* **Hot Reload** – Live code reloading during development with customizable watch paths
* **Smart Agent Discovery** – Automatic scanning with .gitignore awareness and path filtering

### Production & Deployment

* **RESTful API Server** – Full-featured HTTP server for agent management and messaging
* **OpenAPI Documentation** – Auto-generated Swagger docs for ADK server API endpoints
* **Health Monitoring** – Built-in health checks and status endpoints
* **Session Management** – Persistent conversation sessions with state management
* **Event Streaming** – Real-time events via Server-Sent Events (SSE)

### Developer Experience

* **Multi-Package Manager Support** – Auto-detection and support for npm, pnpm, yarn, and bun
* **Intelligent CLI UX** – Interactive prompts, spinners, and progress indicators
* **Debug Mode** – Comprehensive logging and diagnostics
* **Cross-Platform** – Full support for Windows, macOS, and Linux

## Requirements

* **Node.js** v22.0 or higher
* **Package Manager**: npm, yarn, pnpm, or bun
* **TypeScript** support (handled automatically)

## Commands Overview

* **`adk new`** – Create new ADK projects from maintained templates
* **`adk run`** – Run agents with interactive chat, server mode, or hot reload
* **`adk web`** – Launch web interface for visual agent development and testing
* **`adk serve`** – Start standalone API server for production deployment

***

## Quick Start Example

```bash
# Create a new agent project
adk new my-ai-assistant --template simple-agent
cd my-ai-assistant

adk run
```

## Next Steps

<Cards>
  <Card title="💻 Command Reference" description="Detailed documentation for all CLI commands and options" href="/docs/cli/commands" />

  <Card title="⚙️ Configuration Guide" description="Agent discovery rules, export requirements, and project structure" href="/docs/cli/configuration" />
</Cards>

# Commands
URL: /docs/cli/commands

Reference for adk new, adk run, adk web, and adk serve commands

***

title: Commands
description: Reference for adk new, adk run, adk web, and adk serve commands
icon: Terminal
--------------

## `adk new`

Create a new ADK project from professional templates with interactive setup.

```bash
adk new
# or with a specific template
adk new my-agent --template simple-agent
```

**Available Templates:**

* `simple-agent` – Basic agent with chat capabilities and examples
* `discord-bot` – Agent integrated with Discord bot framework
* `telegram-bot` – Agent integrated with Telegram bot API
* `hono-server` – Web server with RESTful agent endpoints
* `shade-agent` – Agent with Near Shade Agents integration
* `mcp-starter` – Model Context Protocol server integration
* `next-js-starter` - Next.js starter template

**Features:**

* Interactive project creation with guided setup
* Automatic dependency installation with package manager detection
* Support for npm, pnpm, yarn, and bun
* Template validation and error handling
* Professional project structure with TypeScript support

**Package Managers:**
The CLI automatically detects available package managers and offers a choice:

* 📦 npm
* ⚡ pnpm
* 🧶 yarn
* 🍞 bun

## `adk run`

Run agents with intelligent discovery and interactive chat interface.

```bash
adk run
# Run a specific agent file
adk run path/to/agent.ts
# Server-only mode (no chat)
# Default server URL: http://localhost:8042/
adk run --server
# Make API server accessible from other devices/networks
adk run --server --host 0.0.0.0
# Enable hot reload during development
adk run --hot
# Watch additional paths for changes
adk run --watch src,lib,tools
# Enable verbose logging
adk run --verbose
```

**Options:**

* `--server` – Start API server only (no interactive chat)
* `--host <host>` – Custom host for server mode (default: localhost)
* `--hot` – Enable hot reload for live code changes
* `--watch <paths>` – Comma-separated list of additional paths to watch
* `--verbose` – Enable detailed logging and diagnostics

**Features:**

* Auto-discovers agents in the current directory with .gitignore awareness
* Interactive selector if multiple agents are found
* Terminal chat with markdown rendering
* Hot reload support for development workflows

## `adk web`

Launch a React-based web interface for visual agent testing and management. Opens the hosted production interface at [adk-web.iqai.com](https://adk-web.iqai.com).

```bash
adk web
# Use a specific API server port
adk web --port 8080
# Make API server accessible from other devices/networks
adk web --host 0.0.0.0
# Scan a custom directory
adk web --dir ./my-agents
# Use custom deployed web application
adk web --web-url https://my-custom-adk-web.com
```

**Options:**

* `--port <port>` – Port for API server (default: 8042)
* `--host <host>` – Host for API server (default: localhost). Use 0.0.0.0 to make accessible from other devices on your network
* `--dir <directory>` – Directory to scan for agents (default: current directory)
* `--web-url <url>` – URL of any web interface (local or remote) that will connect to your API server

**Features:**

* Visual agent browser and chat interface
* Real-time agent status monitoring
* Session management and message history
* Responsive design for desktop and mobile
* Automatically starts API server and opens the web interface

**Web Interface Options:**

* **Default (Production)**: Opens the hosted web interface at [adk-web.iqai.com](https://adk-web.iqai.com) which connects to your local API server
* **Custom Web Interface (`--web-url`)**: Use any web interface (local or remote) by specifying its URL. The web interface will connect to your local API server to display your agents
* **Local Development**: Use `adk serve` to start only the API server, then access any web interface manually. The web interface will connect to the default API server address ([http://localhost:8042](http://localhost:8042))

**Note:** All web interfaces connect to your local API server (default: [http://localhost:8042](http://localhost:8042)) to display and interact with your agents, regardless of where the web interface itself is hosted. When using a non-default `--port`, the CLI automatically passes the port as a URL query parameter (e.g., `?port=8080`) so the web interface can discover and connect to your API server. This is particularly useful when developing custom web interfaces that need to connect to your local agents.

## `adk serve`

Start a standalone API server for agent management (no chat UI).

```bash
adk serve
# Default server URL: http://localhost:8042/
# Custom port
adk serve --port 9000
# Custom host (make accessible from other devices/networks)
adk serve --host 0.0.0.0
# Scan a specific directory
adk serve --dir ./production-agents
# Enable OpenAPI docs (enabled by default)
adk serve --swagger
# Disable OpenAPI docs
adk serve --no-swagger
# Quiet mode (minimal logging)
adk serve --quiet
```

**Options:**

* `--port <port>` – Port for the server (default: 8042)
* `--host <host>` – Host for the server (default: localhost)
* `--dir <directory>` – Directory to scan for agents (default: current directory)
* `--swagger` – Force enable OpenAPI docs
* `--no-swagger` – Disable OpenAPI docs
* `--quiet` – Reduce logging output

**API Endpoints:**

* `GET /api/agents` – List all discovered agents
* `POST /api/agents/refresh` – Refresh agent discovery scan
* `GET /api/agents/{id}/sessions` – List sessions for an agent
* `POST /api/agents/{id}/sessions` – Create a new session
* `DELETE /api/agents/{id}/sessions/{sessionId}` – Delete a session
* `POST /api/agents/{id}/sessions/{sessionId}/switch` – Switch active session
* `GET /api/agents/{id}/sessions/{sessionId}/events` – Get session events
* `GET /api/agents/{id}/sessions/{sessionId}/state` – Get session state
* `PUT /api/agents/{id}/sessions/{sessionId}/state` – Update session state
* `GET /api/agents/{id}/messages` – Get message history for the active session
* `POST /api/agents/{id}/message` – Send message to the agent's active session
* `GET /health` – Health check
* `GET /reload/stream` – Hot reload event stream
* `GET /docs` – OpenAPI documentation (when enabled)

## Global Options

* `--help` – Show help for a command
* `--version` – Show CLI version

**Environment Variables:**

* `ADK_DEBUG=1` – Enable detailed NestJS framework logging
* `ADK_VERBOSE=1` – Enable verbose output (same as `--verbose`)

# Configuration
URL: /docs/cli/configuration

Agent discovery rules, export requirements, and project layout conventions

***

title: Configuration
description: Agent discovery rules, export requirements, and project layout conventions
icon: Settings
--------------

import { Callout } from "fumadocs-ui/components/callout";

## Agent Discovery

The ADK CLI automatically discovers agents in your project through intelligent file scanning.

### Discovery Rules

* **File Patterns:** Recursively scans for `agent.ts` and `agent.js` files
* **Excluded Directories:** `node_modules`, `.git`, `dist`, `build`, `.next`, `.turbo`, `coverage`, `.vscode`, `.idea`
* **Gitignore Support:** Respects `.gitignore` patterns for additional exclusions
* **Interactive Selection:** Shows agent selector when multiple agents are found

<Callout type="warn">
  Ensure your agents are named `agent.ts` or `agent.js` and placed outside
  excluded directories for successful discovery.
</Callout>

### Required Exports

The ADK CLI expects specific export patterns to recognize your agents. Each agent file must match one of the following patterns:

**Option 1: Default Export (Most Common)**
Best for simple agents. Export an `LlmAgent` instance directly as the default export:

```typescript
import { LlmAgent } from "@iqai/adk";

export default new LlmAgent({
  name: "my_agent",
  model: "gemini-2.5-flash",
  instruction: "You are a helpful assistant.",
});
```

**Option 2: Named Function Export**
Recommended for complex agents that need initialization or configuration. Export an async function named `agent`:

```typescript
import { AgentBuilder } from "@iqai/adk";

export async function agent() {
  return await AgentBuilder.create("my_agent")
    .withModel("gemini-2.5-flash")
    .withInstruction("You are a helpful assistant.")
    .build();
}
```

**Option 3: Named Export**
Export a function or instance with the name `agent`:

```typescript
export const agent = () =>
  new LlmAgent({
    name: "my_agent",
    model: "gemini-2.5-flash",
    instruction: "You are a helpful assistant.",
  });
```

<Callout type="warn">
  The CLI will not detect agents that don't follow these export patterns. For
  named exports, the export must be called `agent`.
</Callout>

## Development Workflow

### Package Manager Detection

When creating projects with `adk new`, the CLI auto-detects available package managers:

* 📦 npm
* ⚡ pnpm
* 🧶 yarn
* 🍞 bun

<Callout type="info">
  Only package managers installed on your system will appear as options.
</Callout>

## Troubleshooting

### Common Issues

**Agent not detected?**

* Verify file naming: `agent.ts` or `agent.js`
* Check export format matches supported types
* Ensure agent isn't in excluded directories
* Review `.gitignore` patterns

**Discovery issues?**

* Use `adk serve` and check `GET /api/agents` endpoint
* Enable verbose logging with `--verbose` flag
* Verify TypeScript compilation if using `.ts` files

**Module resolution errors?**

* Ensure proper imports in your agent files
* Check that dependencies are installed
* Verify TypeScript configuration if using `.ts` files

**Build or runtime errors?**

* Check agent export patterns match required formats
* Verify environment variables are properly loaded
* Use debug logging for detailed error information

**Hot reload not working?**

* Check file watching permissions
* Review `.gitignore` patterns that might exclude files
* Ensure watched paths are correctly configured

**Session or state issues?**

* Verify session management in your agent implementation
* Check that state persistence is working correctly
* Use the API endpoints to debug session data

### Debug Configuration

Enable detailed logging to diagnose issues:

```bash
# Enable debug logging
export ADK_DEBUG=true
export ADK_VERBOSE=true

# Run with verbose output
adk run --verbose
adk serve --verbose
```

### Useful Debugging Commands

```bash
# Check discovered agents
adk serve
# Then visit http://localhost:8042/api/agents

# Test agent loading
adk run --verbose

# Check API endpoints
curl http://localhost:8042/health
curl http://localhost:8042/api/agents
```


