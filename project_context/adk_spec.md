# ADK-TS Specification (Ground Truth)

## 1. Installation
- Required Node.js version: v22.0 or higher.
- Package: `@iqai/adk`

## 2. AgentBuilder Pattern
We MUST use the fluent `AgentBuilder` API. Do not use legacy class instantiation.
Syntax:
```typescript
import { AgentBuilder } from "@iqai/adk";

const { runner } = await AgentBuilder.create("agent_name")
  .withModel("gemini-2.5-flash") // Default model
  .withInstruction("Your instruction here")
  .withTools(myTool) // Array of tools
  .build();

  import { createTool } from "@iqai/adk";
import { z } from "zod";

export const myTool = createTool({
  name: "tool_name",
  description: "Description for the LLM",
  schema: z.object({
    param1: z.string(),
  }),
  fn: async ({ param1 }) => {
    // Logic
    return { success: true };
  },
});