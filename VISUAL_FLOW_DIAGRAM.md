# 🎨 Real Yield Optimization - Visual Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STORYVAULT STEWARD AGENT                         │
│                  Real Yield Optimization System                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 0: INITIALIZATION                                            │
└─────────────────────────────────────────────────────────────────────┘

    📝 Load AGENT_PRIVATE_KEY from .env
         │
         ▼
    🔐 Initialize Viem Wallet Client
         │
         ▼
    🌐 Connect to Fraxtal RPC (https://rpc.frax.com)
         │
         ▼
    ✅ Agent Wallet Ready: 0x1234...abcd


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 1: SAFETY CHECKS                                             │
└─────────────────────────────────────────────────────────────────────┘

    💰 Check Agent's frxETH Balance
         │
         ├─── ❌ Balance < 0.002 frxETH
         │         │
         │         ▼
         │    🚨 Return "INSUFFICIENT_BALANCE"
         │    📊 Show: current, required, shortfall
         │
         └─── ✅ Balance ≥ 0.002 frxETH
                  │
                  ▼
             🎯 Proceed with Investment


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 2: STEP 1 - WRAP NATIVE → ERC20                             │
└─────────────────────────────────────────────────────────────────────┘

    📦 Wrapping 0.0001 frxETH → wfrxETH
         │
         │  Contract: 0xfc...06 (wfrxETH)
         │  Value:    0.0001 frxETH
         │  Function: deposit() [0xd0e30db0]
         │
         ▼
    ⏳ Transaction Sent
         │
         │  TX Hash: 0xabcd1234...
         │  Explorer: https://fraxscan.com/tx/0xabcd...
         │
         ▼
    ⏱️  Wait for Receipt...
         │
         ├─── ❌ Status: "reverted"
         │         │
         │         ▼
         │    🚨 Throw Error: "Wrap transaction reverted"
         │
         └─── ✅ Status: "success"
                  │
                  │  Block: 12345678
                  │  Gas:   45,000
                  │
                  ▼
             ✅ Step 1 Complete
             💳 Agent now has 0.0001 wfrxETH (ERC20)


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 3: STEP 2 - APPROVE VAULT                                    │
└─────────────────────────────────────────────────────────────────────┘

    🔐 Approving sfrxETH Vault
         │
         │  Contract:  0xfc...06 (wfrxETH)
         │  Function:  approve(spender, amount)
         │  Spender:   0xfc...05 (sfrxETH Vault)
         │  Amount:    0.0001 wfrxETH
         │
         ▼
    ⏳ Transaction Sent
         │
         │  TX Hash: 0xef567890...
         │  Explorer: https://fraxscan.com/tx/0xef56...
         │
         ▼
    ⏱️  Wait for Receipt...
         │
         ├─── ❌ Status: "reverted"
         │         │
         │         ▼
         │    🚨 Throw Error: "Approval transaction reverted"
         │
         └─── ✅ Status: "success"
                  │
                  │  Block: 12345679
                  │  Gas:   46,000
                  │
                  ▼
             ✅ Step 2 Complete
             🔓 Vault can now spend agent's wfrxETH


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 4: STEP 3 - DEPOSIT INTO VAULT                               │
└─────────────────────────────────────────────────────────────────────┘

    💎 Depositing into sfrxETH Vault
         │
         │  Contract:  0xfc...05 (sfrxETH Vault)
         │  Function:  deposit(assets, receiver)
         │  Assets:    0.0001 wfrxETH
         │  Receiver:  0x1234...abcd (Agent)
         │
         ▼
    ⏳ Transaction Sent
         │
         │  TX Hash: 0xgh123456...
         │  Explorer: https://fraxscan.com/tx/0xgh12...
         │
         ▼
    ⏱️  Wait for Receipt...
         │
         ├─── ❌ Status: "reverted"
         │         │
         │         ▼
         │    🚨 Throw Error: "Deposit transaction reverted"
         │
         └─── ✅ Status: "success"
                  │
                  │  Block: 12345680
                  │  Gas:   85,000
                  │
                  ▼
             ✅ Step 3 Complete
             🏦 Agent receives sfrxETH vault shares
             📈 Now earning 5-10% APY!


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 5: FINAL VERIFICATION                                        │
└─────────────────────────────────────────────────────────────────────┘

    📊 Query Updated Balances
         │
         ├─── frxETH Balance (Native)
         │     │
         │     ▼
         │    Before: 0.0025
         │    After:  0.0019  (0.0001 invested + gas)
         │
         └─── sfrxETH Balance (Vault Shares)
               │
               ▼
              Before: 0.0000
              After:  0.0001

    ⛽ Calculate Total Gas Used
         │
         ▼
         Wrap:    45,000 gas
         Approve: 46,000 gas
         Deposit: 85,000 gas
         ───────────────────
         TOTAL:  176,000 gas (~$0.10)


┌─────────────────────────────────────────────────────────────────────┐
│  PHASE 6: SUCCESS RESPONSE                                          │
└─────────────────────────────────────────────────────────────────────┘

    🎉 Return JSON Response
         │
         ▼
    ┌─────────────────────────────────────────┐
    │ {                                       │
    │   "status": "SUCCESS",                  │
    │   "invested_amount": "0.0001",          │
    │   "transactions": {                     │
    │     "wrap":    { hash, block, gas },    │
    │     "approve": { hash, block, gas },    │
    │     "deposit": { hash, block, gas }     │
    │   },                                    │
    │   "balances": {                         │
    │     "sfrxeth": "0.0001",                │
    │     "frxeth_remaining": "0.0019"        │
    │   },                                    │
    │   "gas": { total: "176000" },           │
    │   "yield": {                            │
    │     "expected_apy": "5-10%",            │
    │     "protocol": "sfrxETH",              │
    │     "risk_level": "Low"                 │
    │   }                                     │
    │ }                                       │
    └─────────────────────────────────────────┘
         │
         ▼
    📡 Broadcast SSE Events to Frontend
         │
         └─── funding_update: WRAP_START
         └─── funding_update: WRAP_COMPLETE
         └─── funding_update: APPROVE_START
         └─── funding_update: APPROVE_COMPLETE
         └─── funding_update: STAKE_START
         └─── funding_update: STAKE_COMPLETE


┌─────────────────────────────────────────────────────────────────────┐
│  UI UPDATES (Real-Time via SSE)                                     │
└─────────────────────────────────────────────────────────────────────┘

    Frontend receives events:
    
    [12:34:56] 📦 Step 1/3: Wrapping 0.0001 frxETH → wfrxETH...
    [12:34:58] ✅ Step 1 Complete - Block 12345678
    [12:35:00] 🔐 Step 2/3: Approving sfrxETH vault...
    [12:35:02] ✅ Step 2 Complete - Block 12345679
    [12:35:04] 💎 Step 3/3: Depositing into sfrxETH vault...
    [12:35:07] ✅ Step 3 Complete - Staked in sfrxETH vault!
    
    [12:35:10] 🎉 Investment Complete!
               💰 Invested: 0.0001 frxETH
               🏦 Vault Shares: 0.0001 sfrxETH
               📈 APY: 5-10%
               ⛽ Gas: $0.10


┌─────────────────────────────────────────────────────────────────────┐
│  DATA STRUCTURES                                                    │
└─────────────────────────────────────────────────────────────────────┘

Contract Addresses (Verified):
┌─────────────┬────────────────────────────────────────────────┐
│ Token       │ Address                                        │
├─────────────┼────────────────────────────────────────────────┤
│ wfrxETH     │ 0xfc00000000000000000000000000000000000006   │
│ sfrxETH     │ 0xfc00000000000000000000000000000000000005   │
└─────────────┴────────────────────────────────────────────────┘

Investment Parameters:
┌─────────────────┬───────────────────────────────────────────┐
│ Parameter       │ Value                                     │
├─────────────────┼───────────────────────────────────────────┤
│ MIN_BALANCE     │ 0.002 frxETH (gas safety buffer)         │
│ INVEST_AMOUNT   │ 0.0001 frxETH (~$0.35)                    │
│ Network         │ Fraxtal Mainnet (Chain ID: 252)          │
│ RPC             │ https://rpc.frax.com                      │
│ Expected APY    │ 5-10% on sfrxETH vault shares             │
└─────────────────┴───────────────────────────────────────────┘

Function Signatures:
┌─────────────┬──────────────────────────────────────────────┐
│ Function    │ Signature                                    │
├─────────────┼──────────────────────────────────────────────┤
│ deposit()   │ 0xd0e30db0 (wfrxETH wrapping)                │
│ approve()   │ approve(address spender, uint256 amount)     │
│ deposit()   │ deposit(uint256 assets, address receiver)    │
└─────────────┴──────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│  ERROR HANDLING PATHS                                               │
└─────────────────────────────────────────────────────────────────────┘

                    executeRealMicroInvestmentFn()
                              │
                              ▼
                    Wallet Initialized?
                              │
                    ┌─────────┴─────────┐
                    │                   │
                   NO                  YES
                    │                   │
                    ▼                   ▼
            "DEMO_MODE"         Check Balance
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                         < 0.002              ≥ 0.002
                              │                   │
                              ▼                   ▼
                  "INSUFFICIENT_BALANCE"    Execute Wrap TX
                                                  │
                                        ┌─────────┴─────────┐
                                        │                   │
                                   Reverted            Success
                                        │                   │
                                        ▼                   ▼
                                  Throw Error        Execute Approve TX
                                                            │
                                                  ┌─────────┴─────────┐
                                                  │                   │
                                             Reverted            Success
                                                  │                   │
                                                  ▼                   ▼
                                            Throw Error        Execute Deposit TX
                                                                      │
                                                            ┌─────────┴─────────┐
                                                            │                   │
                                                       Reverted            Success
                                                            │                   │
                                                            ▼                   ▼
                                                      Throw Error       Return SUCCESS JSON


┌─────────────────────────────────────────────────────────────────────┐
│  SECURITY & SAFETY GUARANTEES                                       │
└─────────────────────────────────────────────────────────────────────┘

✅ Hardcoded Investment Amount
   - No user input accepted for amount
   - Prevents accidentally draining wallet
   - Safe for production demos

✅ Pre-Flight Balance Check
   - Requires 0.002 frxETH minimum
   - Preserves 0.0019 frxETH for gas
   - Prevents agent from getting stuck

✅ Transaction Receipt Verification
   - Wait for each TX to be mined
   - Check status for "reverted"
   - Fail fast on errors

✅ SSE Real-Time Broadcasting
   - Frontend stays synchronized
   - User sees progress immediately
   - Transparent operation

✅ Error Handling
   - Detailed error messages
   - Troubleshooting suggestions
   - Full stack traces in logs


┌─────────────────────────────────────────────────────────────────────┐
│  TESTING CHECKLIST                                                  │
└─────────────────────────────────────────────────────────────────────┘

Pre-Test:
  [ ] AGENT_PRIVATE_KEY set in .env
  [ ] Agent wallet funded with ≥0.002 frxETH
  [ ] RPC endpoint accessible (https://rpc.frax.com)
  [ ] Network confirmed as Fraxtal (Chain ID: 252)

Execution:
  [ ] Wrap TX appears on Fraxscan
  [ ] Approve TX appears on Fraxscan
  [ ] Deposit TX appears on Fraxscan
  [ ] All 3 TXs show "Success" status

Post-Test:
  [ ] sfrxETH balance = 0.0001
  [ ] frxETH balance decreased appropriately
  [ ] No error messages in console
  [ ] UI shows completed investment

Long-Term:
  [ ] sfrxETH balance grows over time (yield accrual)
  [ ] Can execute multiple rounds
  [ ] Gas costs remain reasonable


┌─────────────────────────────────────────────────────────────────────┐
│  🎊 DEPLOYMENT STATUS                                               │
└─────────────────────────────────────────────────────────────────────┘

    ✅ Implementation Complete
    ✅ Type-Safe with TypeScript
    ✅ Viem Integration Verified
    ✅ Error Handling Robust
    ✅ Safety Features Active
    ✅ SSE Broadcasting Ready
    ✅ Production-Safe Amounts
    ✅ Comprehensive Logging
    
    🚀 READY FOR FRAXTAL HACKATHON DEMO!


Legend:
  📦 = Wrapping Step
  🔐 = Approval Step
  💎 = Deposit Step
  ✅ = Success
  ❌ = Error
  ⏳ = Transaction Pending
  📊 = Data Query
  📡 = SSE Broadcast
  🎉 = Complete
```
