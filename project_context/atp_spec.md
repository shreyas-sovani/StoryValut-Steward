# IQAI Agent Tokenization Platform (ATP) Spec

## Overview
ATP allows AI Agents to be minted as on-chain assets (NFTs) on the **Fraxtal** network.
Users can stake **FRAX** or **sfrxETH** into these Agent NFTs to fund their strategies.

## Deployment Simulation Requirements
For the purpose of the StoryVault demo, we will simulate the interaction with the ATP Factory.
- **Target Network:** Fraxtal (Chain ID 252)
- **Gas Token:** FRAX
- **Action:** `deploy_vault`
- **Output:** A transaction hash and a deep link to the ATP Dashboard.

## URL Structure
- Dashboard: `https://app.iqai.com/agent/{agent_id}`
- Explorer: `https://fraxscan.com/tx/{tx_hash}`