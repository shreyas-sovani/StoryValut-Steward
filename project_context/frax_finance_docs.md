# English 🇰🇾


### Frax Ecosystem Overview

Overview of the Frax Finance Ecosystem

Frax currently issues 3 stablecoins: FRAX, FPI, and frxETH, along with numerous other
non-stablecoin tokens. There are also multiple contract groups or "subprotocols" within it
that integrate these tokens to provide utility and stability. Core concepts to understand
the unified Frax Finance ecosystem include:

- Three Stablecoins – The Frax Protocol currently issues 3 stablecoins:

#### ◦ FRAX – a USD pegged asset.

#### ◦ FPI – The Frax Price Index (FPI) stablecoin, the first stablecoin pegged to a

```
basket of consumer goods creating its own unit of account separate from any
nation state denominated money.
```
#### ◦ FraxEther (frxETH) – a Liquid Staking Derivative (LSD) token pegged to ETH,

```
and intended for use as a replacement for WETH in smart contracts. frxETH is
also used as the gas token in the Fraxtal chain, explained below. sfrxETH is the
complementary ERC4626 token that accrues value from ETH staking rewards,
MEV, etc.
```
#### ▪ frxETH V2 is expected to allow anonymous validator pools that can use

```
escrowed exit messages as collateral to borrow additional ETH.
```
- Fraxswap – Native AMM (based on Uniswap V2) with added time weighted average
    market maker (TWAMM) orders used by the Frax Protocol for rebalancing collateral,
    mints/redemptions, expanding/contracting stablecoin supply, and deploying protocol
    owned liquidity onchain.

#### ◦ Borrow AMM (BAMM) – Borrowing/lending module built on top of Fraxswap.

```
Does not need an outside oracle or external liquidity to function safely. Borrowers
rent liquidity provided by lenders to automatically leverage up and down, such
that they can stay solvent even in the case of high volatility.
```
- Fraxlend – Permissionless lending market that is the lending facility for Frax-based
    stablecoins. Allows debt origination, customized non-custodial loans, and onboarding
    collateral assets to the Frax Finance economy.
- AMOs / Protocol-owned Liquidity (POL) – The protocol operates numerous
    Algorithmic Market Operation (AMO) smart contracts to manage its collateral and
    use it to generate revenue. Examples include the Fraxlend AMO, Curve AMO, and
    Uniswap V3 AMO.


- Fraxtal – A modular L2 chain, based on Optimism technology, that uses frxETH
    as the gas token.

#### ◦ Fraxtal Points FXTL – Users earn FXTL for useful activities on Fraxtal, such as

```
spending gas, creating heavily-used contracts, and farming in specific pools.
```
- Frax Bonds (FXB) – Zero coupon bond-like tokens auctioned at below 1 FRAX, but
    exchangeable for 1 FRAX upon maturity. Used to help lock FRAX liquidity and
    stabilize the FRAX peg.
- Staked Frax (sFRAX) – ERC4626 staking vault that distributes part of the Frax
    Protocol yield weekly to stakers. Denominated in FRAX stablecoins.
- Fraxferry – Optimistic transfer protocol for Frax-based tokens. Fraxferry transfers
    natively issued Frax Protocol tokens across many blockchains.
- Frax Share (FXS) – The base-layer governance token for the entire Frax ecosystem
    of smart contracts. It accrues fees, revenue, and excess collateral value.
- veFXS – Users lock FXS for a variable amount of time and receive voting power and
    farming weight boosts. Inspired by Curve's veCRV.
- Gauge Rewards System – The community can propose new gauge rewards for
    strategies that integrate Frax-based stablecoins. FXS emissions are fixed, halve each
    year, and entirely flow to different gauges based on the votes of veFXS stakers.
    Modified from Curve.

Website: https://app.frax.finance
Telegram: https://t.me/fraxfinance
Telegram (announcements / news): https://t.me/fraxfinancenews
Discord: https://discord.com/invite/fraxfinance
Twitter: https://twitter.com/fraxfinance
Medium / Blog: https://fraxfinancecommunity.medium.com/
Governance (discussion): https://gov.frax.finance/
Governance (voting): https://snapshot.org/#/frax.eth


## FXS & veFXS


### Frax Shares (FXS)

FXS is the staking and governance token of the entire Frax ecosystem. All utility is
concentrated into FXS and its locked variant, veFXS.

The Frax Share token (FXS) is the non-stable, utility token in the protocol, as opposed to
FRAX the stablecoin. It is meant to be volatile and hold rights to governance and all utility
of the system. Parameters that are up for governance through FXS include adjusting
various fees, allocating protocol assets, and enabling new lending pairs for Fraxlend.
Surplus protocol income is also distributed to locked FXS (veFXS) holders, and these
veFXS holders can also earn farm weight boosts and other benefits. FXS supply is initially
set to 100 million tokens at genesis (distribution here). As of 10/2/2024, the hard FXS
supply cap is still 100 million tokens.

The FXS token has the potential of upside utility and downside utility of the system,
where the delta changes in value are always stabilized away from the FRAX token itself
and not affecting the peg.

In the original (V1) model of FRAX, FRAX minting required both FXS and another
stablecoin, such as USDC. The percentage of each (e.g. 15% FXS, 85% USDC) varied
according to market conditions. See Frax V1 Background for details.

```
FXS
```
##### Summary

###### Original Model (V1)


The FXS token’s market capitalization would be calculated as the future expected net
value creation from seigniorage of FRAX tokens in perpetuity, the cash flow from fees,
and utilization of unused collateral. Additionally, as the market cap of FXS increases, so
does the system’s ability to keep FRAX stable. Thus, the priority in the design is to accrue
maximal value to the FXS token while maintaining FRAX as a stable currency. As Robert
Sam’s described in the original Seigniorage Shares whitepaper : “Share tokens are like
the asset side of a central bank’s balance sheet. The market capitalization of shares at
any point in time fixes the upper limit on how much the coin supply can be reduced.”
Likewise, the Frax protocol takes inspiration from Sams’ proposal as Frax is a hybrid
(fractional) seigniorage shares model. FXS would be largely deflationary in supply as long
as FRAX demand grows.


Schematic of current utility of FXS (V1)


In the current model, FXS is still used for governance, receives excess protocol income,
and confers other miscellaneous benefits to holders (via veFXS). However, FXS is no
longer needed to mint FRAX. That functionality is delegated to AMOs.

###### Current Model (V2 onwards)


### veFXS

Locked FXS that provides voting power and other benefits

veFXS is a vesting and yield system based off of Curve’s veCRV mechanism. Users may
lock up their FXS for up to 4 years for four times the amount of veFXS (e.g. 100 FXS
locked for 4 years returns 400 veFXS). veFXS is not a transferable token nor does it trade
on liquid markets. It is more akin to an account based point system that signifies the
vesting duration of the wallet's locked FXS tokens within the protocol.

The veFXS balance linearly decreases as tokens approach their lock expiry, approaching
1 veFXS per 1 FXS at zero lock time remaining. This encourages long-term staking and an
active community.

Smart contracts & DAOs require whitelisting by governance to stake for veFXS. Only
externally owned accounts and normal user wallets can directly call the veFXS stake
locking function. In order to build veFXS functionality into your protocol, begin the
governance process with the FRAX community at gov.frax.finance by submitting a
whitelisting proposal.

Each veFXS has 1 vote in governance proposals. Staking 1 FXS for the maximum time, 4
years, would generate 4 veFXS. This veFXS balance itself will slowly decay down to 1
veFXS after 4 years, at which time the user can redeem the veFXS back for FXS. In the
meantime, the user can also increase their veFXS balance by locking up FXS, extending
the lock end date, or both. It should be noted that veFXS is non-transferable and each
account can only have a single lock duration meaning that a single address cannot lock
certain FXS tokens for 2 years then another set of FXS tokens for 3 years etc. All FXS per
account must have a uniform lock time.

##### Background

###### veFXS Governance Whitelisting

##### Voting Power


Holding veFXS will give the user more weight when collecting certain farming rewards. All
farming rewards that are distributed directly through the protocol are eligible for veFXS
boosts. External farming that are promoted by other protocols (such as Sushi Onsen) are
typically not available for veFXS boosts since they are independent of the Frax protocol
itself. Other protocols can choose to distribute their rewards through Frax's gauge
farming contracts to acquire the veFXS boost functionality. FXS gauge farming contracts
support up to 4 different token rewards per gauge.

A user's veFXS boost does not increase the overall emission of rewards. The boost is an
additive boost that will be added to each farmer's yield proportional to their veFXS
balance. The veFXS boost can be different for each LP pair by the discretion of the
community based on partnership agreements and governance votes. Each gauge will
display the exact terms of the boosts available.

Farming boosts are given in ratios of veFXS per 1 FRAX in the LP deposit token. For
example, a FRAX-IQ gauge with a 2x boost ratio of 10 veFXS per 1 FRAX means that a
user that has 50,000 veFXS gets a 2x boost for an LP position that contains 5,000 FRAX
(total value of $10,000).

Most gauges currently offer a 2x boost in yield with a requirements of 4 veFXS to 1 FRAX.

The primary cash flow distribution mechanism of the Frax Protocol is to veFXS holders.
Cash flow earned from AMOs, Fraxlend loans, Fraxswap fees, etc are typically used to buy
back FXS from the market then distributed to veFXS stakers as yield. The emission rate
varies depending on protocol profitability, sources of cash flow, market price of FXS, and
governance actions.

Historical view of veFXS yield can be viewed here: https://app.frax.finance/vefxs

##### Gauge Farming Boosts

##### veFXS Yield

##### Future Functionality


The veFXS system is modular and all-purpose. In the future, it can be expanded to vote on
AMO weights, earn additional yield in new places/features, and help create long term
alignment for the Frax Finance economy.

This **benefits Frax** as a whole by:

- Allocate voting power to long-term holders of FXS through veFXS
- Incentivizing gauge farmers to stake FXS
- Allowing DAOs and other projects to build a large and long term veFXS position and
    participate in Frax governance.
- Creating a bond-like utility for FXS and create a benchmark APR rate for staked FXS

```
Type Chain Link
```
```
UI Ethereum https://app.frax.finance/vefxs
```
```
Contract Ethereum 0xc8418aF6358FFddA74e09Ca9CC3Fe03Ca6aDC5b
```
```
UI Fraxtal https://app.frax.finance/fxtl-vefxs
```
```
Contract Fraxtal 0x007FD070a7E1B0fA1364044a373Ac1339bAD89CF
```
###### Links


### Gauges

Gauge weighted system for controlling FXS emissions

A "gauge" is a farming smart contract that takes deposits in one asset (typically an LP
token, a vault token, NFT position etc) and rewards the depositor yield in FXS (and
potentially other) tokens. Gauge contracts can take many forms of deposits such as
FRAX lending deposits (aFRAX in Aave, cFRAX in Compound, fFRAX in Fraxlend), LP
tokens (Curve LP tokens or Fraxswap LP tokens), or even NFTs (such as Uniswap v3 NFT
positions). Gauges are used to incentivize particular "strategies" and behaviors that are
advantageous to the protocol such as increasing FRAX lending, deepening liquidity of
certain pairs, or growing a partnership/integration between another project. The full list of
current gauges can be found here: https://app.frax.finance/gauge

The FXS allocated to each gauge strategy is referred to to as its "gauge weight." They can
distribute their voting power across multiple gauges or a single gauge. This allows veFXS
holders who are the most long term users of the protocol to have control over the future
FXS emission rate. Each veFXS is equal to 1 vote.

Additionally, the gauge system lowers the influence of FRAX pairs where the majority of
rewards are sold off since those LPs will not have veFXS to continue voting for their pair.
This system strongly favors LP providers who continually stake their rewards for veFXS to
increase their pool's gauge weight. Essentially, FRAX gauges align incentives of veFXS
holders so that the most long term oriented FXS holders control where FXS emissions go.
**Gauge weights are updated once every week every Wednesday at 5pm PST. This means
that the FXS emission rate for each pair is constant for 1 week then updates to the new
rate each Wednesday. Any user can change their weight allocation every 10 days.**

Since FXS gauge emissions are fixed and halve every year, governance can decide
whether to allocate part of protocol cash flows or newly minted FRAX to gauge rewards
after a few years. Thus, veFXS stakers can feel confident staking the maximum duration
of 4 years knowing that the gauge program is not temporary and won't be deprecated.
Gauge strategies are currently a vital part of incentivizing the right behavior for the
growth of the Frax ecosystem.


```
The gauge voting list on app.frax.finance/gauge used for allocating all FXS emissions. The aggregate weights of all
votes decide which gauge strategy contract FXS tokens are sent to.
```
###### Current Types of Gauges


**LP Gauge** : an LP gauge is the most common type of gauge contract taking an ERC20 LP
token as a deposit. Most gauges incentivize LP positions from Fraxswap, Curve, Uniswap
v2, etc. Typically, these gauges offer a 2x veFXS boost of 4 veFXS per 1 FRAX in the LP
position and an additional 1 year 2x timelock boost (unless otherwise specified).
**Lending Gauge** : a lending gauge is typically deployed to incentivize FRAX lending activity
in a money market such as Aave, Fraxlend, Compound etc. The deposit token is aFRAX,
fFRAX, cFRAX, etc. Lending gauges typically do not offer timelock boosts but offer up to
2x veFXS boost for 1 FRAX lent out per 4 veFXS.
**Uniswap V3 Gauge** : Uniswap v3 gauges take an NFT LP position as a deposit. These
gauges are pre-configured at launch to accept NFT LPs at a specific tick range to
incentivize only the exact concentrated liquidity position that governance approved for
the pair. These gauges offer a 2x veFXS boost of 4 veFXS per 1 FRAX in the LP position
and an additional timelock boost of 2x-3x for 1-3 year locks (specified for each gauge on
its corresponding staking page).
**Vault Gauge** : a vault gauge takes a vault strategy token as a deposit such as a Stake DAO
or Yearn Finance vault token. Vault gauges typically offer a 2x veFXS boost of 4 veFXS
per 1 FRAX in the vault position and a timelock boost of 2-3x for 1-3 year (specified for
each gauge).


```
Pie chart displaying the total weights for a particular weekly gauge period. Periods change on Wednesdays at 11:59:
UTC. Votes can be changed by veFXS stakers once every 10 days.
```
###### veFXS Boosts & Timelock Boosts


Users who stake tokens in a gauge contract earn boosts to their APR based on the
amount of veFXS they have. Additionally, users that lock their deposited tokens within the
gauge contract for a specific period of time will earn a further additive boost thus
enabling stacking of both boosts for maximal APR. Since gauge weights change weekly,
locked LPs in gauges do not get their deposits unlocked if the gauge weight changes.
See the veFXS spec page for an explanation of how boosts are calculated. Each gauge
strategy can have different boost terms depending on the end behavior it is incentivizing.
For example, a lending gauge might have a very low timelock boost since lending FRAX
does not provide peg stability and thus not need extra rewards. However, a Curve,
Uniswap, or Fraxswap liquidity gauge might provide a high timelock boost because
locking liquidity helps FRAX peg strength during volatility.

FRAX gauges allow veFXS stakers to directly control the FXS emission rate to any pool
that integrates FRAX. There is no restriction on which protocols or pairs can have a gauge
weight other than they use FRAX stablecoins and pass the gauge governance vote. Any
FRAX pool (including cross-chain pools) can be added as a gauge in the future. The
veFXS gauge system is completely agnostic to the deposit token within a gauge as long
as the FRAX stablecoin is being used within the strategy. Essentially, veFXS gauges are
the money layer gauge weights of DeFi while other gauges (such as Curve gauge
weights) are the DEX layer weights. Since veFXS stakers can control emissions into any
protocol that integrates FRAX, many protocols and communities might compete for
controlling the future cash flow of an algorithmic stablecoin protocol.

It's important to note for any smart contract (non-EOA wallet) to stake veFXS, they must
be whitelisted by a governance vote. For a full list of benefits of holding veFXS such as
AMO profits and farming boosts, see the veFXS full specs.

###### Gauge Agnostic Pairs


### FXS Distribution

The distribution of FXS across the system

DeFi Protocols have made use of liquidity programs to jumpstart growth and distribute
protocol tokens to community members. To that end, 60% of all FXS tokens are to be
distributed through various yield farming, liquidity incentives, and exclusive governance
proposals across a number of years. 5% Is allocated to more team-discretionary activities
such as 3rd-party grants, audits, bug bounties, and partnerships (not for personal team
member benefits).

**60% – Liquidity Programs / Farming / Community – Via gauges & governance halving
naturally every 12 months**

Per the original design specs for FXS distribution, the FXS supply will halve every 12
months on December 20th each year. Initially, per FIP-16 veFXS gauges , the emission
was 25,000 FXS per day to the FXS gauges. As of 10/2/2024, due to 3 halvenings (see
below), the current daily emission is 3,125 FXS. These changes do not unlock locked
LPs as they are the normal emission schedule of the FXS supply.

As DeFi is an evolving landscape, these emissions can be changed by a full Frax
Improvement Proposal (FIP) governance vote where LP locks and boost weights can be
redone if the FIP is passed. Full votes require 2 weeks of discussion followed by a token
holder vote per the official governance process.

##### Community (65% – 65,000,000 FXS)


Community governance can decide which pools, programs, and initiatives to support with
the emission schedule, but it cannot be increased past the 100,000,000 FXS supply
max. Thus, a maximum of 60,000,000 FXS will be distributed to the community for
liquidity programs and other DeFi initiatives as they appear in the space as voted by
governance. New programs can be added by governance to the remaining allocation, but
no more than 60,000,000 FXS can be allocated due to the hard cap of 100,000,
FXS distributed. This is to put a hard cap on the amount of FXS as well as to put a hard
duration on the number of years required to distribute the FXS. This emission rate was
chosen to balance the need for a large amount of rewards for early adopters while not
distributing all FXS too early which is needed for long term community sustainability. The
FXS emission should be thought of and modeled more after Bitcoin mining than anything
else. FXS distribution needs to be multi-year, extended, and sustainable until the protocol
reaches ubiquity.

Community Treasury: 0x63278bF9AcdFC9fA65CFa2940b89A34ADfbCb4A

**5% – Project Team Treasury / Grants / Partnerships / Audits / Security-Bug-Bounties –
via Team and Community discretion**
The Project Treasury should be used for making grants for development of the Frax
technology, open source upkeep of the code, future audits of smart contracts, bug
bounties through responsible disclosure, possible cross-chain implementations, team
compensation, creation of new protocol level features and updates, Frax Improvement
Proposals (FIPs), partnerships with exchanges and DeFi projects, providing liquidity on
AMMs at launch. The usage of this fund is dependent on the discretion of the team.

Team (Discretionary) Treasury: 0x9AA7Db8E488eE3ffCC9CdFD4f2EaECC8ABeDCB

**20% – Team / Founders / Early Project Members – 12 months, 6 month cliff**
Team tokens are retained for founders and original early contributors to Frax. The Frax
Protocol was conceived in late 2018 and work began in early 2019. The Frax concept has
been over 6 years old since conception. The contributions of founders and early
members that worked on Frax was crucial to releasing the protocol. The team will
continue to work on Frax for its lifetime along with the greater community. This
distribution was completed on 12/20/2021.

##### Team, Advisors, Investors (35% – 35,000,000 FXS)


Team Distribution Treasury: 0x8D4392F55bC76A046E443eb3bab99887F4366BB

**3% – Strategic Advisors / Outside Early Contributors – 36 months**
Advisory tokens were allotted for strategic work done in legal, technical, and business
efforts to advance the adoption of the Frax protocol. The tokens were vested evenly over
3 years and completed on 12/20/2023.

Advisor Distribution Treasury: 0x874a873e4891fB760EdFDae0D26cA2c00922C

**12% – Accredited Private Investors – 2% unlocked at launch, 5% vested over the first 6
months, 5% vested over 1 year with a 6 month cliff**
The first round in Frax was done in August of 2020 with a small allocation that was sold
out in under 2 hours. The remainder of the round was done individually through private
placements. This vesting had a small amount of their tokens (~2% of the total 100M
supply) distributed at Day 0 / launch. The remaining 10% was vested evenly over 1 year,
half of which had a 6 month cliff. This distribution was completed on 12/20/2021.

Investor Distribution Treasury: 0xa95f86fE0409030136D6b82491822B3D70F890b


### FXS Smart Contract & Addresses

Modified ERC-20 Contract representing the FXS token, which is used for staking and
governance actions surrounding the FRAX stablecoin.

##### Deployments


```
Chain Address
```
Arbitrum 0x9d2F299715D94d8A7E6F5eaa8E654E8c74a988A7

Aurora 0xBb8831701E68B99616bF940b7DafBeb4CDb23e0b

Avalanche 0x214DB107654fF987AD859F34125307783fC8e387

Base (LayerZero) 0x23432452B720C80553458496D4D9d7C5003280d0

Blast (LayerZero) 0x23432452B720C80553458496D4D9d7C5003280d0

Boba 0xae8871A949F255B12704A98c00C2293354a36013

BSC 0xe48A3d7d0Bc88d552f730B62c006bC925eadB9eE

Ethereum (native) 0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0

Ethereum (LayerZero) 0x23432452B720C80553458496D4D9d7C5003280d0

Evmos 0xd8176865DD0D672c6Ab4A427572f80A72b4B4A9C

Fantom 0x7d016eec9c25232b01F23EF992D98ca97fc2AF5a

Fraxtal (native) 0xFc000000000000000000000000000000000 00002

Fraxtal (LayerZero) 0x64445f0aecc51e94ad52d8ac56b7190e764e561a

Harmony 0x0767D8E1b05eFA8d6A301a65b324B6b66A1CC14c

Metis (LayerZero) 0x23432452B720C80553458496D4D9d7C5003280d0


https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20

https://docs.openzeppelin.com/contracts/3.x/api/access#AccessControl

Address of the FRAX contract.

```
Mode (LayerZero) 0x64445f0aecc51e94ad52d8ac56b7190e764e561a
```
```
Moonbeam 0x2CC0A9D8047A5011dEfe85328a6f26968C8aaA1C
```
```
Moonriver 0x6f1D1Ee50846Fcbc3de91723E61cb68CFa6D0E98
```
```
Optimism 0x67CCEA5bb16181E7b4109c9c2143c24a1c2205Be
```
```
Polygon 0x1a3acf6D19267E2d3e7f898f42803e90C921 9062
```
```
Sei (LayerZero) 0x64445f0aecc51e94ad52d8ac56b7190e764e561a
```
```
Solana 6LX8BhMQ4Sy2otmAWj7Y5sKd9YTVVUgfMsBzT6B9W7ct
```
```
X-Layer 0x64445f0aecc51e94ad52d8ac56b7190e764e561a
```
```
address public FRAXStablecoinAdd
```
##### State Variables

**ERC-20 (Inherited)**

**AccessControl (Inherited)**

**FXS-Specific**


Genesis supply of FXS.

Maximum supply of FXS.

Minimum FXS required to join DAO groups.

Address of the contract owner.

Address of the oracle.

Address of the timelock.

The FRAX contract instance.

```
uint256 genesis_supply
```
```
uint256 public maximum_supply
```
```
uint256 public FXS_DAO_min
```
```
address public owner_address
```
```
address public oracle_address
```
```
address public timelock_address
```
```
FRAXStablecoin private FRAX
```
```
struct Checkpoint {
uint32 fromBlock;
uint96 votes;
}
```

From Compound Finance. Used for governance voting.

List of voting power for a given address, at a given block.

Checkpoint count for an address.

**setOracle**

Change the address of the price oracle.

**setFRAXAddress**

Set the address of the FRAX contract.

**setFXSMinDAO**

Set minimum FXS required to join DAO groups.

**mint**

```
mapping (address => mapping (uint32 => Checkpoint)) public checkpoints
```
```
mapping (address => uint32) public numCheckpoints
```
```
setOracle(address new_oracle) external onlyByOracle
```
```
setFRAXAddress(address frax_contract_address) external onlyByOracle
```
```
setFXSMinDAO(uint256 min_FXS) external onlyByOracle
```
```
mint(address to, uint256 amount) public onlyPools
```
##### Restricted Functions


Mint new FXS tokens.

**pool_mint**

This function is what other FRAX pools will call to mint new FXS (similar to the FRAX
mint).

**pool_burn_from**

This function is what other FRAX pools will call to burn FXS.

**transfer**

Transfer FXS tokens.

**transferFrom**

Transfer FXS tokens from another account. Must have an allowance set beforehand.

**getCurrentVotes**

```
pool_mint(address m_address, uint256 m_amount) external onlyPools
```
```
pool_burn_from(address b_address, uint256 b_amount) external onlyPools
```
```
transfer(address recipient, uint256 amount) public virtual override
returns (bool)
```
```
transferFrom(address sender, address recipient, uint256 amount) public
virtual override returns (bool)
```
##### Overridden Public Functions

##### Public Functions


Gets the current votes balance for account.

**getPriorVotes**

Determine the prior number of votes for an account as of a block number. Block number
must be a finalized block or else this function will revert to prevent misinformation.

**_moveDelegates**

Misnomer, from Compound Finance's _moveDelegates. Helps keep track of available
voting power for FXS holders.

**_writeCheckpoint**

From Compound Finance's governance scheme. Helps keep track of available voting
power for FXS holders at a specific block. Called when a FXS token transfer, mint, or burn
occurs.

**safe32**

```
getCurrentVotes(address account) external view returns (uint96)
```
```
getPriorVotes(address account, uint blockNumber) public view returns
(uint96)
```
```
_moveDelegates(address srcRep, address dstRep, uint96 amount) internal
```
```
_writeCheckpoint(address voter, uint32 nCheckpoints, uint96 oldVotes,
uint96 newVotes) internal
```
```
safe32(uint n, string memory errorMessage) internal pure returns
(uint32)
```
##### Internal Functions


Make sure the provided int is 32 bits or less, and convert it to a uint32.

**safe96**

Make sure the provided int is 96 bits or less, and convert it to a uint96.

**add96**

Add two uint96 integers safely.

**sub96**

Subtract two uint96 integers safely.

**getChainId**

Return the Ethereum chain ID the contract is deployed on

**VoterVotesChanged**

```
safe96(uint n, string memory errorMessage) internal pure returns
(uint96)
```
```
add96(uint96 a, uint96 b, string memory errorMessage) internal pure
returns (uint96)
```
```
sub96(uint96 a, uint96 b, string memory errorMessage) internal pure
returns (uint96)
```
```
getChainId() internal pure returns (uint)
```
```
VoterVotesChanged(address indexed voter, uint previousBalance, uint
newBalance)
```
##### Events


Emitted when a voters account's vote balance changes

**FXSBurned**

Emitted when FXS is burned, usually from a redemption by the pool

**onlyPools**

Restrict actions to pool contracts, e.g. minting new FXS.

**onlyByOracle**

Restrict actions to the oracle, such as setting the FRAX and oracle addresses

```
FXSBurned(address indexed from, address indexed to, uint256 amount)
```
```
onlyPools()
```
```
onlyByOracle()
```
##### Modifiers


## GOVERNANCE


### Frax Governance Overview

Fully onchain, trustless, and decentralized governance based on
Compound/OpenZeppelin Governor that controls Gnosis Safes

Prior to Frax Governance, Frax Protocol operations were not fully decentralized. Most
actions were taken by key Frax stakeholders through Gnosis Safes. The implied trust
assumption was that the Frax stakeholders won’t act maliciously and external actors
won’t force the stakeholders to execute malicious actions. With the introduction of Frax
Governance, this trust assumption is removed and Frax Protocol is controlled by veFXS
holders through onchain governance.

⚠ (As of 10/2/2024) While the migration is ongoing, voting will be conducted through
Snapshot on Frax's own Fraxtal chain. ⚠

##### Motivation

##### Major Components



The final state of Frax Governance will have full control of all major safes, giving veFXS
holders the final say over everything in the protocol. veFXS holders can vote for or against
all proposals and can replace Frax team members as owners on the underlying Safes and
execute any action, if it reaches quorum and passes.

Frax team members have the ability to create optimistic proposals through
FraxGovernorOmega which succeed by default. Typically proposals fail by default, but
with Frax Governance, veFXS holders can vote for or against optimistic proposals as well.
If an optimistic proposal reaches quorum and there are more against than for votes, the
proposal will fail.

```
Frax Governance
```
##### End State and Key Takeaways


### How It Works

Frax Governance is based largely on Compound/OpenZeppelin Governor contracts. The
lifecycle of a Governor proposal is covered here:
https://docs.openzeppelin.com/contracts/4.x/governance#proposal_lifecycle.

Frax Governance is a dual Governor system consisting of FraxGovernorAlpha and
FraxGovernorOmega. Alpha and Omega have different uses and configurations.

FraxGovernorOmega has limited control over the underlying Safes. Only the Frax Team /
Safe owners can create Omega proposals. Each proposal is mapped 1 to 1 to a Safe
transaction. Omega is configured as an additional Safe owner and must approve of a
Safe transaction before Safe owners can execute it. This is enforced using a custom
Gnosis Safe Guard (https://docs.safe.global/safe-core-protocol/hooks ).

Omega has a very short voting delay, a short voting period, and a low quorum value. Safe
owners can only add proposals to Omega after getting the Safe’s threshold number of
signatures for that Safe transaction. For example, if a Safe is a 3/6 (5 owners + Omega) 3
owners must sign before the proposal can be put into Omega.

After adding a proposal to Omega, it follows the same lifecycle as a Governor proposal. If
it passes, Omega calls approveHash on the Safe and the proposal can be executed by
any owner through the Gnosis Safe UI as usual. If the proposal fails, rejectTransaction
can be called on Omega to approve a 0 ether transfer. Other owners can sign and execute
the same 0 ether transfer, which just increments the nonce on the Safe, allowing creation
of new Gnosis transactions.

##### Prior Work

##### Frax Governance

##### FraxGovernorOmega


Omega has a feature called the short circuit threshold. **If 51% of the total veFXS supply
votes for an Omega proposal, it will immediately succeed and be executable**. This helps
in extraordinary circumstances, when the Frax team needs to take quick action to protect
the protocol.

Omega cannot change its own governance parameters or change any configuration on
the underlying Safes. FraxGovernorAlpha must be used to change these values.

FraxGovernorAlpha has full control over underlying Safes. Any veFXS holder with a veFXS
balance meeting or exceeding the proposal threshold can create a proposal.
FraxGovernorAlpha is nearly identical to OpenZeppelin Governor. It has full control over
each Gnosis Safe because its TimelockController is configured as a module
(https://docs.safe.global/safe-core-protocol/plugins ) on the Safe and can execute any
action. Modules are not constrained by Gnosis Safe Guards.

Alpha has a long voting delay, long voting period, and much higher quorum than Omega.
Once an Alpha proposal passes, it must be queued and after the configured timelock
period, it can be executed.

veFXS holders are the most important part of the system. Proposals succeeding or
failing is ultimately up to veFXS holders because they directly vote on them. Your veFXS
balance is equal to your voting power.

veFXS holders can delegate their voting power to others. If a veFXS holder has sufficient
veFXS voting power between their own stake and delegated stake, they can propose
anything with FraxGovernorAlpha.

Through Alpha, veFXS holders can replace owners on the Safes, change governance
parameters on Alpha or Omega, change parameters on any Frax smart contract,
remove/add protocol owned liquidity to/from liquidity pools, etc. veFXS holders have
ultimate control over the entire Frax protocol.

##### FraxGovernorAlpha

##### veFXS Holders


##### Frax Governance Proposal Lifecycle


### Advanced Concepts

Due to how the veFXS contract works, if you lock more FXS or increase the duration of
your lock, you have to delegate your voting weight again using the
VeFxsVotingDelegation contract.

To delegate back to yourself, call the delegate() function with your address as the
delegatee.

Delegations can also be done by signature. See delegateBySig().

When your veFXS lock expires, your balance is equal to the amount of FXS you locked. In
Frax Governance, as soon as your lock expires your voting weight goes to 0. You need to
have an active lock to have voting weight in Frax Governance.

##### Delegations

##### veFXS Voting Weight Decay

##### Smart Contract Design


```
1. Go to https://app.frax.finance/gov/frax
2. Click Propose
3. Make sure your voting weight is above the proposal threshold
a. Check proposal threshold here:
https://etherscan.io/address/0xe8ab863e629a05c73d6a23b99d37027e3763156
e#readContract#F25
b. Check your weight here:
https://etherscan.io/address/0x6b83c4f3a6729fb7d5e19b720092162df439f567
#readContract#F18
4. Fill out your transaction data
5. Submit
```
##### Create an Alpha proposal

##### Fractional Voting


Frax Governance makes use of ScopeLift’s fractional voting:
https://github.com/ScopeLift/flexible-
voting/blob/master/src/GovernorCountingFractional.sol

This allows for users to split their voting power between for/against/abstain. It also
allows smart contracts/custodians to pass through the voting power to liquidity providers
based on their relative LP stake.

For a Safe to be properly configured for frxGov, it must have the FraxGuard installed, have
FraxGovernorOmega as a signer, have FraxGovernorAlpha’s TimelockController installed
as a module, and have FraxCompatibilityFallbackHandler set as the fallbackHandler.
Safes can be sunset similarly through Alpha proposals by removing the configuration and
removing them from the allowlist.

FraxGovernorOmega and FraxGovernorAlpha uses OpenZeppelin Governor and the
following extensions:

- GovernorSettings
- GovernorVotesQuorumFraction
- GovernorCountingFractional

In addition, Alpha uses these Governor extensions:

- GovernorTimelockControl
- GovernorPreventLateQuorum

See their configuration here:

https://docs.openzeppelin.com/contracts/4.x/api/governance#GovernorVotesQuorumFr
action

https://docs.openzeppelin.com/contracts/4.x/api/governance#GovernorTimelockControl

##### Governance Configuration


https://docs.openzeppelin.com/contracts/4.x/api/governance#GovernorSettings

https://docs.openzeppelin.com/contracts/4.x/api/governance#GovernorPreventLateQuo
rum

All of the following functions must be called from an Alpha proposal.

Alpha and Omega:

- setVotingDelayBlocks()
- setVeFxsVotingDelegation()
- updateShortCircuitNumerator()

Omega only:

- addToSafeAllowlist()
- removeFromSafeAllowlist()
- addToDelegateCallAllowlist()
- removeFromDelegateCallAllowlist()
- setSafeVotingPeriod()

See the frxGov codebase for explanation of each of these functions.

See the Gnosis Safe codebase for Safe configuration that Alpha controls.

Identical to OpenZeppelin Governor with GovernorTimelockControl.

- Create proposal - propose()

###### Additional Frax Governance Specific Configuration:

##### Full Proposal Flow

###### Alpha


- Vote - castVote()
- If fails do nothing
- If succeeds

#### ◦ queue()

#### ◦ Wait Timelock's minDelay

#### ◦ execute()

```
1. An owner uses the Gnosis Safe to initiate a DeFi transaction. This produces a
transaction hash that identifies the action to be approved or rejected by the other
Safe owners.
2. ⅗ EOA sign the transaction through the UI
3. After 3 signatures are collected, anyone can call
fraxGovernorOmega.addTransaction(address teamSafe, TxHashArgs calldata
args, bytes calldata signatures) to begin onchain governance. The team is
incentivized to do so because they cannot execute any Gnosis transaction without
FraxGovernorOmega’s approval.
4. veFXS voters have a 2-day window of time to vote on the proposal.
5. If no quorum is met during the voting window, or there are more for than against
votes on the proposal, anyone can call execute(). This calls safe.approveHash()
from Omega under the hood. It provides the needed approval from
FraxGovernorOmega, which will allow the gnosis transaction to be executed through
the Gnosis UI.
a. If quorum is met and there are more against than for votes. The proposal gets
vetoed by anyone calling fraxGovernorOmega.rejectTransaction (address
teamSafe, uint256 nonce). This will cause FraxGovernorOmega to sign a zero
ETH transfer Safe transaction with the same nonce. Safe owners can then sign
the same transaction in the UI using the “replace transaction” functionality. Safe
owners can then execute the zero ETH transfer, incrementing the nonce. The
original transaction can never be executed, because there is no approval from
FraxGovernorOmega and the nonce has moved on, invalidating the original
transaction.
```
###### Omega

###### Smart Contract Signature Support (EIP1271 / EIP712)


Background: https://help.safe.global/en/articles/40783-what-are-signed-messages

Gnosis Safes can provide smart contract signatures. The typical mechanism is contained
in Safe’s CompatibilityFallbackHandler, which checks if the threshold number of
signatures is met from the owners, and then the Safe provides its approval. This
mechanism was not sufficient for frxGov because we want Omega + owners to provide
approval OR Alpha alone to provide approval.

To solve this we wrote FraxCompatibilityFallbackHandler, which only checks if
safe.signedMessages(messageHash) is set. Alpha and Omega can both call the setter
of this state using SignMessageLib.signMessage().

FraxGovernorAlpha could be used to create a proposal that essentially shuts down the
entire Frax protocol and returns all protocol owned liquidity to FXS holders. We have the
Timelock delay on Alpha for situations like this. It will take a day from when this proposal
passes to when it can be executed, giving Frax users time to exit the protocol via various
liquidity pools.

We also added in the OpenZeppelin Governor extension GovernorPreventLateQuorum. If a
proposal reaches quorum late in the voting period, the voting period will get extended by
2 days. This stops malicious user(s) from voting for a malicious proposal at the last
second. It gives time for the community to react in such a scenario.

We also created the frxEth redemption queue to allow users to exit frxEth if a malicious
actor gets 51% of veFXS voting power and passes a proposal to infinite mint frxEth in an
attempt to steal the treasury.

##### Attacks and Mitigations

##### Technical Discussions


To conform to the ERC5805 standard, an implementing contract must implement several
functions including function getPastTotalSupply(uint256 timepoint) external
view returns (uint256). We use timestamps throughout our Governor contracts,
however this function is the one exception and it must accept a block.number.
Unfortunately, veFXS.totalSupply(timestamp)doesn't work for historical values, so we
must use veFXS.totalSupplyAt(block.number).

This also impacts quorum values. Typically quorum is calculated from voting start
timestamp (snapshot). We allow similar functionality by making the
$votingDelayBlocks value configurable by governance, so it mirrors the timestamp
functionality.

https://github.com/FraxFinance/frax-governance

**VeFxsVotingDelegation** :
https://etherscan.io/address/0x6b83c4f3a6729fb7d5e19b720092162df439f567

**FraxGovernorAlpha** :
https://etherscan.io/address/0xe8Ab863E629a05c73D6a23b99d37027E3763156e

**FraxGovernorAlphaTimelock** :
https://etherscan.io/address/0x821794E69d2831975a11f80E8092c682D5Ec8F83

**FraxGovernorOmega** :
https://etherscan.io/address/0x953791D7C5ac8Ce5fb23BBBF88963DA37a95FE7a

**FraxGuard** :
https://etherscan.io/address/0xed53eb15b2011395A7353e076024CBC9F19481D0

##### Codebase and Contract Addresses

###### Codebase

###### Contract Addresses


**FraxCompatibilityFallbackHandler** :
https://etherscan.io/address/0x3FeFB779d737aCEa272686eA6E174ebF4273F973


### Fraxtal Snapshot Voting

Delegating your combined veFXS for Snapshot

After a proposal is discussed in the Governance Forum , it can be voted on using
Snapshot. Voting power is the sum of held FXS as well as veFXS from miscellaneous
sources. Historically, voting was done on Ethereum, but it since moved to Fraxtal (see
vote ). Snapshot should pick up all of your voting power sources (Mainnet veFXS,
Fraxtal FXS, Fraxtal veFXS, and Fraxtal FPISLocker) **EXCEPT** Mainnet FXS. You would
need to bridge your FXS over to Fraxtal to receive the 1:1 votes for it, or lock it in Mainnet
veFXS (which has an existing balance proof system on Fraxtal).

Due to Snapshot limitations for the Fraxtal chain, many-to-one delegations will no longer
be possible. If you are either 1) Delegating or 2) Unable to access your Mainnet
(delegator) address on Fraxtal, we deployed a simple 1:1 delegation contract to help.

First obtain an address on Fraxtal that you can make arbitrary calls from. It can be a new
or existing address. This will be known as the delegatee address. You will need to send a
cross-chain message to Fraxtal via the L1CrossDomainMessenger (on Ethereum), with
the destination contract as DoubleOptInVeFXSDelegation (on Fraxtal). Below are useful
addresses and function signatures:

Your delegatee address on Fraxtal will be able to vote with its own combined voting
power as well as the combined voting power of the delegator.

```
// Ethereum
L1CrossDomainMessenger: 0x126bcc31Bc076B3d515f60FBC81FddE0B0d542Ed
```
```
// Fraxtal
DoubleOptInVeFXSDelegation: 0x9D269188b741277fF316862B537bd4fce14637b3
```
- 0x6417e439: nominateDelegateeCrossChain
- 0x617075fe: rescindDelegationAsDelegatorCrossChain

##### Delegation

###### Nominate a delegatee


1) Prepare a hex message

2) Call the following on Ethereum with your delegator address:

This calls DoubleOptInVeFXSDelegation.nominateDelegateeCrossChain on Fraxtal

3) Wait a few minutes

4) With your delegatee address on Fraxtal, call:

1) With the delegator, call:

2) With the delegatee, call:

Either the delegator or delegatee can unilaterally revoke a delegation at any time.

```
cast calldata "nominateDelegateeCrossChain(address)" "<delegatee
address on Fraxtal>"
```
```
L1CrossDomainMessenger.sendMessage(0x9D269188b741277fF316862B537bd4fce1
4637b3, <hex message>, 500000)
```
```
DoubleOptInVeFXSDelegation.acceptDelegation(<delegator address>)
```
```
DoubleOptInVeFXSDelegation.nominateDelegatee(<delegatee address>)
```
```
DoubleOptInVeFXSDelegation.acceptDelegation(<delegator address>)
```
**If delegator is on Ethereum only**

**If delegator is on Fraxtal**

###### Rescind a delegatee


1) Call the following on Ethereum with your delegator address:

This calls DoubleOptInVeFXSDelegation.rescindDelegationAsDelegatorCrossChain
on Fraxtal

2) Wait a few minutes, then your delegation on Fraxtal should be rescinded

1) With the delegator, call:

1) With the delegatee, call:

```
L1CrossDomainMessenger.sendMessage(0x9D269188b741277fF316862B537bd4fce1
4637b3, 0x617075fe, 500000)
```
```
DoubleOptInVeFXSDelegation.rescindDelegationAsDelegator()
```
```
DoubleOptInVeFXSDelegation.rescindDelegationAsDelegatee()
```
**If delegator is on Ethereum only**

**As the delegator on Fraxtal**

**As the delegatee on Fraxtal**


## FRAX V1 - ORIGINAL


### Original Design

The original Frax framework

⚠ The original mint/redeem model explained here has been retired in favor of later (V2
onwards) mechanisms and is for historic / information purposes only ⚠

Frax originally launched on December 20th, 2020. In Frax V1, there was only a single
mint/redeem AMO, the fractional-algorithmic stability mechanism. We refer to this as the
**base stability mechanism**. You can read about it in the Core Whitepaper.

In Frax v1, the collateral ratio of the protocol is dynamically rebalanced based on the
market price of the FRAX stablecoin. If the price of FRAX is above $1, then the collateral
ratio (CR) decreases ("decollateralization"). If the price of FRAX is below $1 then the CR
increases ("recollateralization"). The protocol always honors redemptions of FRAX at the
$1 peg , but since the CR is dynamic, it must fund redemptions of FRAX by minting Frax
Share tokens (FXS) for the remainder of the value. For example, at a 85% CR, every
redeemed FRAX gives the user $0.85 USDC and $0.15 of minted FXS. It is a trivial
implementation detail whether the protocol returns to the redeemer $0.15 worth of FXS
directly or atomically sells the FXS for collateral onchain to return the full $1 of value in
collateral – the economic implementation is the same.

```
1. Decollateralize - Lower the CR by some increment every time if FRAX > $1
2. Equilibrium - Don't change the CR if FRAX = $1
3. Recollateralize - Increase the CR by some increment every time if FRAX < $1
```
```
FRAX
```
##### x t

##### x t

**This base mechanism can be abstracted down to the following:**


At its fundamental core, the Frax Protocol is a banking algorithm that adjusts its balance
sheet ratio based on the market's pricing of FRAX. The collateral ratio is simply the ratio
of the protocol's capital (collateral) over its liabilities (FRAX stablecoins). The market
'votes' on what this ratio should be by selling/exiting the stablecoin if it's too low (thereby
slightly pushing the price below $1) or by continuing to demand FRAX (thereby slightly
pushing the price above $1). This decollateralization and recollateralization helps find an
equilibrium reserve requirement for the protocol to keep a very tight peg and maximize
capital efficiency of money creation. **By definition, the protocol mints the exact amount
of FRAX stablecoins the market demands at the exact collateral ratio the market
demands for $1 FRAX.**


### Staking Contracts

Allows staking Uniswap trading pair liquidity pool tokens in exchange for FXS rewards.

⚠ This page only applies to very early farms, though many newer farms share features
and function names ⚠

Based on Synthetix's staking contract:

https://docs.synthetix.io/incentives/

Frax users are able to stake in select Uniswap liquidity pool tokens in exchange for FXS
rewards. Future pools and incentives can be added by governance.

Liquidity Pool Tokens (LP)

Uniswap FRAX/WETH LP: 0xFD0A40Bc83C5faE4203DEc7e5929B446b07d1C76

Uniswap FRAX/USDC LP: 0x97C4adc5d28A86f9470C70DD91Dc6CC2f20d2d4D

Uniswap FRAX/FXS LP: 0xE1573B9D29e2183B1AF0e743Dc2754979A40D237

Uniswap FXS/WETH LP: 0xecBa967D84fCF0405F6b32Bc45F4d36BfDBB2E81

Staking Contracts

Uniswap FRAX/WETH staking: 0xD875628B942f8970De3CcEaf6417005F68540d4f

Uniswap FRAX/USDC staking: 0xa29367a3f057F3191b62bd4055845a33411892b6

Uniswap FRAX/FXS staking: 0xda2c338350a0E59Ce71CDCED9679A3A590Dd9BEC

##### Description

##### Deployment


Uniswap FXS/WETH staking (deprecated):
0xDc65f3514725206Dd83A8843AAE2aC3D99771C88

Instance of the FRAX contract.

Instance for the reward token.

Instance for the staking token.

Block when the staking period will finish.

Maximum reward per second.

Reward period, in seconds.

Last timestamp where the contract was updated / state change.

```
FRAXStablecoin private FRAX
```
```
ERC20 public rewardsToken
```
```
ERC20 public stakingToken
```
```
uint256 public periodFinish
```
```
uint256 public rewardRate
```
```
uint256 public rewardsDuration
```
```
uint256 public lastUpdateTime
```
##### State Variables


Actual reward per token in the current period.

Maximum boost / weight multiplier for locked stakes.

The time, in seconds, to reach locked_stake_max_multiplier.

Minimum staking time for a locked staked, in seconds.

String version is locked_stake_min_time_str.

Maximum boost / weight multiplier from the collateral ratio (CR). This is applied to both
locked and unlocked stakes.

Keeps track of when an address last collected a reward. If they collect it some time later,
they will get the correct amount because rewardPerTokenStored is constantly varying.

```
uint256 public rewardPerTokenStored
```
```
uint256 public locked_stake_max_multiplier
```
```
uint256 public locked_stake_time_for_max_multiplier
```
```
uint256 public locked_stake_min_time
```
```
string public locked_stake_min_time_str
```
```
uint256 public cr_boost_max_multiplier
```
```
mapping(address => uint256) public userRewardPerTokenPaid
```
```
mapping(address => uint256) public rewards
```

Current rewards balance for a given address.

Total amount of pool tokens staked.

_staking_token_supply with the time and CR boosts accounted for. This is not an
actual amount of pool tokens, but rather a 'weighed denominator'.

Balance of pool tokens staked for a given address.

```
_balances , but with the time and CR boosts accounted for, like
_staking_token_boosted_supply.
```
Gives a list of locked stake lots for a given address.

A locked stake 'lot'.

```
uint256 private _staking_token_supply
```
```
uint256 private _staking_token_boosted_supply
```
```
mapping(address => uint256) private _balances
```
```
mapping(address => uint256) private _boosted_balances
```
```
mapping(address => LockedStake[]) private lockedStakes
```
```
struct LockedStake {
bytes32 kek_id;
uint256 start_timestamp;
uint256 amount;
uint256 ending_timestamp;
uint256 multiplier; // 6 decimals of precision. 1x = 1000000
}
```

**totalSupply**

Get the total number of staked liquidity pool tokens.

**stakingMultiplier**

Get the time-based staking multiplier, given the secs length of the stake.

**crBoostMultiplier**

Get the collateral ratio (CR) - based staking multiplier.

**stakingTokenSupply**

same as totalSupply().

**balanceOf**

Get the amount of staked liquidity pool tokens for a given account.

**boostedBalanceOf**

```
totalSupply() external override view returns (uint256)
```
```
stakingMultiplier(uint256 secs) public view returns (uint256)
```
```
crBoostMultiplier() public view returns (uint256)
```
```
stakingTokenSupply() external view returns (uint256)
```
```
balanceOf(address account) external override view returns (uint256)
```
##### View Functions


Get the boosted amount of staked liquidity pool tokens for a given account. Boosted
accounts for the CR and time-based multipliers.

**lockedBalanceOf**

Get the amount of locked staked liquidity pool tokens for a given account.

**unlockedBalanceOf**

Get the amount of unlocked / free staked liquidity pool tokens for a given account.

**lockedStakesOf**

Return an array of all the locked stake 'lots' for

**stakingDecimals**

Returns the decimals() for stakingToken.

**rewardsFor**

```
boostedBalanceOf(address account) external view returns (uint256)
```
```
lockedBalanceOf(address account) public view returns (uint256)
```
```
unlockedBalanceOf(address account) external view returns (uint256)
```
```
lockedStakesOf(address account) external view returns (LockedStake[]
memory)
```
```
stakingDecimals() external view returns (uint256)
```
```
rewardsFor(address account) external view returns (uint256)
```

Get the amount of FXS rewards for a given account.

**lastTimeRewardApplicable**

Used internally to keep track of rewardPerTokenStored.

**rewardPerToken**

The current amount of FXS rewards for staking a liquidity pool token.

**earned**

Returns the amount of unclaimed FXS rewards for a given account.

**getRewardForDuration**

Calculates the FXS reward for a given rewardsDuration period.

**stake**

```
lastTimeRewardApplicable() public override view returns (uint256)
```
```
rewardPerToken() public override view returns (uint256)
```
```
earned(address account) public override view returns (uint256)
```
```
getRewardForDuration() external override view returns (uint256)
```
```
stake(uint256 amount) external override nonReentrant notPaused
updateReward(msg.sender)
```
##### Mutative Functions


Stakes some Uniswap liquidity pool tokens. These tokens are freely withdrawable and are
only boosted by the crBoostMultiplier()**.**

**stakeLocked**

Stakes some Uniswap liquidity pool tokens and also locks them for the specified secs.
In return for having their tokens locked, the staker's base amount will be multiplied by a
linear time-based multiplier, which ranges from 1 at secs = 0 to
locked_stake_max_multiplier at locked_stake_time_for_max_multiplier**.** The
staked value is also multiplied by the crBoostMultiplier(). This multiplied value is
added to _boosted_balances and acts as a weighted amount when calculating the
staker's share of a given period reward.

**withdraw**

Withdraw unlocked Uniswap liquidity pool tokens.

**withdrawLocked**

Withdraw locked Uniswap liquidity pool tokens. Will fail if the staking time for the specific
kek_id staking lot has not elapsed yet.

**getReward**

Claim FXS rewards.

```
stakeLocked(uint256 amount, uint256 secs) external nonReentrant
notPaused updateReward(msg.sender)
```
```
withdraw(uint256 amount) public override nonReentrant
updateReward(msg.sender)
```
```
withdrawLocked(bytes32 kek_id) public nonReentrant
updateReward(msg.sender)
```
```
getReward() public override nonReentrant updateReward(msg.sender)
```

**exit**

Withdraw all unlocked pool tokens and also collect rewards.

**renewIfApplicable**

Renew a reward period if the period's finish time has completed. Calls retroCatchUp().

**retroCatchUp**

Renews the period and updates periodFinish , rewardPerTokenStored , and
lastUpdateTime.

**notifyRewardAmount**

This notifies people (via the event RewardAdded ) that the reward is being changed.

**recoverERC20**

Added to support recovering LP Rewards from other systems to be distributed to holders.

```
exit() external override
```
```
renewIfApplicable() external
```
```
retroCatchUp() internal
```
```
notifyRewardAmount(uint256 reward) external override
onlyRewardsDistribution updateReward(address(0))
```
```
recoverERC20(address tokenAddress, uint256 tokenAmount) external
onlyOwner
```
##### Restricted Functions


**setRewardsDuration**

Set the duration of the rewards period.

**setLockedStakeMaxMultiplierUpdated**

Set the maximum multiplier for locked stakes.

**setLockedStakeTimeForMaxMultiplier**

Set the time, in seconds, when the locked stake multiplier reaches
locked_stake_max_multiplier.

**setLockedStakeMinTime**

Set the minimum time, in seconds, of a locked stake.

**setMaxCRBoostMultiplier**

aaa

```
setRewardsDuration(uint256 _rewardsDuration) external onlyOwner
```
```
setLockedStakeMaxMultiplierUpdated(uint256
_locked_stake_max_multiplier) external onlyOwner
```
```
setLockedStakeTimeForMaxMultiplier(uint256
_locked_stake_time_for_max_multiplier) external onlyOwner
```
```
setLockedStakeMinTime(uint256 _locked_stake_min_time) external
onlyOwner
```
```
setMaxCRBoostMultiplier(uint256 _max_boost_multiplier) external
onlyOwner
```

**initializeDefault**

Intended to only be called once in the lifetime of the contract. Initializes
lastUpdateTime and periodFinish.

**updateReward**

Calls retroCatchUp() , if applicable, and otherwise syncs rewardPerTokenStored and
lastUpdateTime. Also, syncs the rewards and userRewardPerTokenPaid for the
provided account.

```
initializeDefault() external onlyOwner
```
```
updateReward(address account)
```
##### Modifiers


### FRAX ABI & Token Addresses

Modified ERC-20 Contract representing the FRAX stablecoin.

##### Deployments


```
Chain Address
```
Arbitrum 0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F

Aurora 0xE4B9e004389d91e4134a28F19BD833cBA1d994B6

Avalanche 0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64

Base (LayerZero) 0x909DBdE1eBE906Af95660033e478D59EFe831fED

Blast (LayerZero) 0x909DBdE1eBE906Af95660033e478D59EFe831fED

Boba 0x7562F525106F5d54E891e005867Bf489B5988CD9

BSC 0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40

Ethereum (native) 0x853d955aCEf822Db058eb8505911ED77F175b99e

Ethereum (LayerZero) 0x909DBdE1eBE906Af95660033e478D59EFe831fED

Evmos 0xE03494D0033687543a80c9B1ca7D6237F2EA8BD8

Fantom 0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355

Fraxtal (Native) 0xFc000000000000000000000000000000000 00001

Fraxtal (LayerZero) 0x80eede496655fb9047dd39d9f418d5483ed600df

Harmony 0xFa7191D292d5633f702B0bd7E3E3BcCC0e6 33200

Linea (Axelar) 0x406cde76a3fd20e48bc1e0f60651e60ae204b040


https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20

```
Mantle (Axelar) 0x406Cde76a3fD20e48bc1E0F60651e60Ae204B040
```
```
Metis (LayerZero) 0x909DBdE1eBE906Af95660033e478D59EFe831fED
```
```
Mode (LayerZero) 0x80eede496655fb9047dd39d9f418d5483ed600df
```
```
Moonbeam 0x322E86852e492a7Ee17f28a78c663da38FB33bfb
```
```
Moonriver 0x1A93B23281CC1CDE4C4741353F3064709A16197d
```
```
Optimism 0x2E3D870790dC77A83DD1d18184Acc7439A53f475
```
```
Polygon 0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89
```
```
Sei (LayerZero) 0x80eede496655fb9047dd39d9f418d5483ed600df
```
```
Scroll (Axelar) 0x406cde76a3fd20e48bc1e0f60651e60ae204b040
```
```
Solana FR87nWEUxVgerFGhZM8Y4AggKGLnaXswr1Pd8wZ4kZcp
```
```
TRON TBD
```
```
X-Layer (LayerZero) 0x80eede496655fb9047dd39d9f418d5483ed600df
```
##### State Variables

**ERC-20 (Inherited)**

**AccessControl (Inherited)**


https://docs.openzeppelin.com/contracts/3.x/api/access#AccessControl

**NOTE: FRAX & FXS contracts have no pause or blacklist controls in any way (including
system contracts).**

An enum declaring FRAX and FXS. Used with oracles.

Instance for the Chainlink ETH / USD trading. Combined with FRAX / WETH, FXS /
WETH, collateral / FRAX, and collateral / FXS trading pairs, can be used to calculate
FRAX/FXS/Collateral prices in USD.

Decimals for the Chainlink ETH / USD trading pair price.

Instance for the FRAX / WETH Uniswap pair price oracle.

Instance for the FXS / WETH Uniswap pair price oracle.

Array of owner address, who have privileged actions.

```
enum PriceChoice { FRAX, FXS }
```
```
ChainlinkETHUSDPriceConsumer eth_usd_pricer
```
```
uint8 eth_usd_pricer_decimals
```
```
UniswapPairOracle fraxEthOracle
```
```
UniswapPairOracle fxsEthOracle
```
```
address[] public owners
```
**FRAX-Specific**


Address of the governance contract.

Address of the contract creator.

Address of the timelock contract.

Address of the FXS contract

Address for the fraxEthOracle.

Address for the fxsEthOracle.

Address for the canonical wrapped-Ethereum (WETH) contract. Should be
0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2 for the mainnet.

Address for the ChainlinkETHUSDPriceConsumer.

```
address governance_address
```
```
address public creator_address
```
```
address public timelock_address
```
```
address public fxs_address
```
```
address public frax_eth_oracle_address
```
```
address public fxs_eth_oracle_address
```
```
address public weth_address
```
```
address public eth_usd_consumer_address
```

Genesis supply of FRAX. Should be a small nonzero amount. Most of the FRAX supply
will come from minting, but a small amount is needed initially to prevent divide-by-zero
errors in various functions.

Array of all the FraxPool contract addresses.

Essentially the same as frax_pools_array , but in mapping form. Useful for gas
savings in various functions like globalCollateralValue().

The current ratio of FRAX to collateral, over all FraxPool s.

The fee for redeeming FRAX for FXS and/or collateral. Also the fee for buying back
excess collateral with FXS. See the FraxPool contract for usage.

The fee for minting FRAX from FXS and/or collateral. See the FraxPool contract for
usage.

Set in the constructor. Used in AccessControl.

```
uint256 public genesis_supply
```
```
address[] frax_pools_array
```
```
mapping(address => bool) public frax_pools
```
```
uint256 public global_collateral_ratio
```
```
uint256 public redemption_fee
```
```
uint256 public minting_fee
```
```
address public DEFAULT_ADMIN_ADDRESS
```

A constant used in the pausing of the collateral ratio.

Whether or not the collateral ratio is paused.

**oracle_price**

Get the FRAX or FXS price, in USD.

**frax_price**

Returns the price for FRAX from the FRAX-ETH Chainlink price oracle.

**fxs_price**

Returns the price for FXS from the FXS-ETH Chainlink price oracle.

**frax_info**

```
bytes32 public constant COLLATERAL_RATIO_PAUSER
```
```
bool public collateral_ratio_paused
```
```
oracle_price(PriceChoice choice) internal view returns (uint256)
```
```
frax_price() public view returns (uint256)
```
```
fxs_price() public view returns (uint256)
```
```
frax_info() public view returns (uint256, uint256, uint256, uint256,
uint256, uint256, uint256)
```
##### View Functions


Returns some commonly-used state variables and computed values. This is needed to
avoid costly repeat calls to different getter functions. It is cheaper gas-wise to just dump
everything and only use some of the info.

**globalCollateralValue**

Iterate through all FRAX pools and calculate all value of collateral in all pools globally.
This uses the oracle price of each collateral.

**refreshCollateralRatio**

This function checks the price of FRAX and refreshes the collateral ratio if the price is not
$1. If the price is above $1, then the ratio is lowered by .5%. If the price is below $1, then
the ratio is increased by .5%. Anyone can poke this function to change the ratio. This
function can only be called once every hour.

**mint**

Public implementation of internal _mint().

**pool_burn_from**

```
globalCollateralValue() public view returns (uint256)
```
```
refreshCollateralRatio() public
```
```
mint(uint256 amount) public virtual onlyByOwnerOrGovernance
```
```
pool_burn_from(address b_address, uint256 b_amount) public onlyPools
```
##### Public Functions

##### Restricted Functions


Used by pools when user redeems.

**pool_mint**

This function is what other frax pools will call to mint new FRAX.

**addPool**

Adds collateral addresses supported, such as tether and busd, must be ERC20.

**removePool**

Remove a pool.

**setOwner**

Sets the admin of the contract

**setFraxStep**

Sets the amount that the collateral ratio will change by upon an execution of
refreshCollateralRatio(),

**setPriceTarget**

```
pool_mint(address m_address, uint256 m_amount) public onlyPools
```
```
addPool(address pool_address) public onlyByOwnerOrGovernance
```
```
removePool(address pool_address) public onlyByOwnerOrGovernance
```
```
setOwner(address owner_address) public onlyByOwnerOrGovernance
```
```
setFraxStep(uint256 _new_step) public onlyByOwnerOrGovernance
```

Set the price target to be used for refreshCollateralRatio() (does not affect
minting/redeeming).

**setRefreshCooldown**

Set refresh cooldown for refreshCollateralRatio().

**setRedemptionFee**

Set the redemption fee.

**setMintingFee**

Set the minting fee.

**setFXSAddress**

Set the FXS address.

**setETHUSDOracle**

```
setPriceTarget(uint256 _new_price_target) public
onlyByOwnerOrGovernance
```
```
setRefreshCooldown(uint256 _new_cooldown) public
onlyByOwnerOrGovernance
```
```
setRedemptionFee(uint256 red_fee) public onlyByOwnerOrGovernance
```
```
setMintingFee(uint256 min_fee) public onlyByOwnerOrGovernance
```
```
setFXSAddress(address _fxs_address) public onlyByOwnerOrGovernance
```

Set the ETH / USD oracle address.

**setFRAXEthOracle**

Sets the FRAX / ETH Uniswap oracle address

**setFXSEthOracle**

Sets the FXS / ETH Uniswap oracle address

**toggleCollateralRatio**

Toggle pausing / unpausing the collateral ratio.

**FRAXBurned**

Emitted when FRAX is burned, usually from a redemption by the pool.

```
setETHUSDOracle(address _eth_usd_consumer_address) public
onlyByOwnerOrGovernance
```
```
setFRAXEthOracle(address _frax_addr, address _weth_address) public
onlyByOwnerOrGovernance
```
```
setFXSEthOracle(address _fxs_addr, address _weth_address) public
onlyByOwnerOrGovernance
```
```
toggleCollateralRatio() public onlyCollateralRatioPauser
```
```
FRAXBurned(address indexed from, address indexed to, uint256 amount)
```
##### Events

##### Modifiers


**onlyCollateralRatioPauser**

Restrict actions to the designated collateral ratio pauser.

**onlyPools**

Restrict actions to pool contracts, e.g. minting new FRAX.

**onlyByGovernance**

Restrict actions to the governance contract, e.g. setting the minting and redemption fees,
as well as the oracle and pool addresses.

**onlyByOwnerOrGovernance**

Restrict actions to the governance contract or owner account(s), e.g. setting the minting
and redemption fees, as well as the oracle and pool addresses.

```
onlyCollateralRatioPauser()
```
```
onlyPools()
```
```
onlyByGovernance()
```
```
onlyByOwnerOrGovernance()
```

### Frax V1 Pool ABI & Addresses

Contract used for minting and redeeming FRAX, as well as buying back excess collateral.

⚠ This pool has been deprecated in favor of FRAX V2 and later mechanisms ⚠

Frax Pool contracts are deployed and permissioned from the governance system,
meaning that a new type of collateral may be added at any time after a governance
proposal succeeds and is executed. The current pool is USDC, with further collateral
types open for future pools.

USDC: 0x3C2982CA260e870eee70c423818010DfeF212659

A Frax Pool is the smart contract that mints FRAX tokens to users for placing collateral or
returns collateral by redeeming FRAX sent into the contract. Each Frax Pool has a
different type of accepted collateral. Frax Pools can be in any kind of cryptocurrency, but
stablecoins are easiest to implement due to their small fluctuations in price. Frax is
designed to accept any type of cryptocurrency as collateral, but low volatility pools are
preferred at inception since they do not change the collateral ratio erratically. There are
promising new projects, such as Reflex Bonds, which dampen the volatility of their
underlying crypto assets. Reflex Bonds could make for ideal FRAX collateral in the future.
New Frax Pools can be added through FXS governance votes.

Each pool contract has a pool ceiling (the maximum allowable collateral that can be
stored to mint FRAX) and a price feed for the asset. The initial Frax Pool at genesis will be
USDC (USD Coin) and USDT (Tether) due to their large market capitalization, stability, and
availability on Ethereum.

The pools operate through permissioned calls to the FRAXStablecoin (FRAX) and
FRAXShare (FXS) contracts to mint and redeem the protocol tokens.

##### Deployment

##### Description


The contract has 3 minting functions: mint1t1FRAX(), mintFractionalFRAX(), and
mintAlgorithmicFRAX(). The contract also has 3 redemption functions that mirror the
minting functions: redeem1t1FRAX(), redeemFractionalFRAX(),
redeemAlgorithmicFRAX().

The functions are separated into 1 to 1, fractional, and algorithmic phases to optimize
gas usage. The 1 to 1 minting and redemption functions are only available when the
collateral ratio is 100%. The fractional minting and redemption functions are only
available between a collateral ratio of 99.99% and 0.01%. The algorithmic minting and
redemption functions are only available at a ratio of 0%.

Each of the minting and redeeming functions also has an AMOUNT_out_min parameter
that specifies the minimum units of tokens expected from the transaction. This acts as a
limit for slippage tolerance when submitting transactions, as the prices may update from
the time a transaction is created to the time it is included in a block.

https://docs.openzeppelin.com/contracts/3.x/api/access#AccessControl

Instance for the collateral token in the pool.

```
ERC20 private collateral_token
```
```
address private collateral_address
```
###### Minting and Redeeming FRAX

###### Slippage

##### State Variables

**AccessControl (Inherited)**

**FraxPool-Specific**


Address of the collateral token.

List of the pool owners.

Address of the oracle contract.

Address of the FRAX contract.

Address of the FXS contract.

Address of the timelock contract.

Instance of the FXS contract.

Instance of the FRAX contract.

```
address[] private owners
```
```
address private oracle_address
```
```
address private frax_contract_address
```
```
address private fxs_contract_address
```
```
address private timelock_address
```
```
FRAXShares private FXS
```
```
FRAXStablecoin private FRAX
```
```
UniswapPairOracle private oracle
```

Instance of the oracle contract.

Keeps track of redemption balances for a given address. A redeemer cannot both request
redemption and actually redeem their FRAX in the same block. This is to prevent flash
loan exploits that could crash FRAX and/or FXS prices. They have to wait until the next
block. This particular variable is for the FXS portion of the redemption.

Keeps track of redemption balances for a given address. A redeemer cannot both request
redemption and actually redeem their FRAX in the same block. This is to prevent flash
loan exploits that could crash FRAX and/or FXS prices. They have to wait until the next
block. This particular variable is for the collateral portion of the redemption.

Sum of the redeemCollateralBalances.

Sum of the redeemFXSBalances.

Keeps track of the last block a given address redeemed.

Maximum amount of collateral the pool can take.

```
mapping (address => uint256) private redeemFXSBalances
```
```
mapping (address => uint256) private redeemCollateralBalances
```
```
uint256 public unclaimedPoolCollateral
```
```
uint256 public unclaimedPoolFXS
```
```
mapping (address => uint256) lastRedeemed
```
```
uint256 private pool_ceiling
```
```
bytes32 private constant MINT_PAUSER
```

```
AccessControl role for the mint pauser.
```
```
AccessControl role for the redeem pauser.
```
```
AccessControl role for the buyback pauser.
```
Whether or not minting is paused.

Whether or not redeem is paused.

Whether or not buyback is paused.

**unclaimedFXS**

Return the total amount of unclaimed FXS.

**unclaimedCollateral**

```
bytes32 private constant REDEEM_PAUSER
```
```
bytes32 private constant BUYBACK_PAUSER
```
```
bool mintPaused = false
```
```
bool redeemPaused = false
```
```
bool buyBackPaused = false
```
```
unclaimedFXS(address _account) public view returns (uint256)
```
##### View Functions


Return the total amount of unclaimed collateral.

**collatDollarBalance**

Return the pool's total balance of the collateral token, in USD.

**availableExcessCollatDV**

Return the pool's excess balance of the collateral token (over that required by the
collateral ratio), in USD.

**getCollateralPrice**

Return the price of the pool's collateral in USD.

**mint1t1FRAX**

Mint FRAX from collateral. Valid only when the collateral ratio is 1.

**mintFractionalFRAX**

```
unclaimedCollateral(address _account) public view returns (uint256)
```
```
collatDollarBalance() public view returns (uint256)
```
```
availableExcessCollatDV() public view returns (uint256)
```
```
getCollateralPrice() public view returns (uint256)
```
```
mint1t1FRAX(uint256 collateral_amount_d18) external notMintPaused
```
##### Public Functions


Mint FRAX from collateral and FXS. Valid only when the collateral ratio is between 0 and
1.

**mintAlgorithmicFRAX**

Mint FRAX from FXS. Valid only when the collateral ratio is 0.

**redeem1t1FRAX**

Redeem collateral from FRAX. Valid only when the collateral ratio is 1. Must call
collectionRedemption() later to collect.

**redeemFractionalFRAX**

Redeem collateral and FXS from FRAX. Valid only when the collateral ratio is between 0
and 1. Must call collectionRedemption() later to collect.

**redeemAlgorithmicFRAX**

Redeem FXS from FRAX. Valid only when the collateral ratio is 0. Must call
collectionRedemption() later to collect.

**collectRedemption**

```
mintFractionalFRAX(uint256 collateral_amount, uint256 fxs_amount)
external notMintPaused
```
```
mintAlgorithmicFRAX(uint256 fxs_amount_d18) external notMintPaused
```
```
redeem1t1FRAX(uint256 FRAX_amount) external notRedeemPaused
```
```
redeemFractionalFRAX(uint256 FRAX_amount) external notRedeemPaused
```
```
redeemAlgorithmicFRAX(uint256 FRAX_amount) external notRedeemPaused
```

After a redemption happens, transfer the newly minted FXS and owed collateral from this
pool contract to the user. Redemption is split into two functions to prevent flash loans
from being able to take out FRAX / collateral from the system, use an AMM to trade the
new price, and then mint back into the system.

**buyBackFXS**

Function can be called by an FXS holder to have the protocol buy back FXS with excess
collateral value from a desired collateral pool. This can also happen if the collateral ratio
> 1

**recollateralizeAmount**

When the protocol is recollateralizing, we need to give a discount of FXS to hit the new CR
target. Returns value of collateral that must increase to reach recollateralization target (if
0 means no recollateralization)

**recollateralizeFrax**

Thus, if the target collateral ratio is higher than the actual value of collateral, minters get
FXS for adding collateral. This function simply rewards anyone that sends collateral to a
pool with the same amount of FXS + .75%. Anyone can call this function to recollateralize
the protocol and take the hardcoded .75% arb opportunity

```
collectRedemption() public
```
```
buyBackFXS(uint256 FXS_amount) external
```
```
recollateralizeAmount() public view returns (uint256
recollateralization_left)
```
```
recollateralizeFrax(uint256 collateral_amount_d18) public
```
##### Restricted Functions


**toggleMinting**

Toggle the ability to mint.

**toggleRedeeming**

Toggle the ability to redeem.

**toggleBuyBack**

Toggle the ability to buyback.

**setPoolCeiling**

Set the pool_ceiling, which is the total units of collateral that the pool contract can
hold.

**setOracle**

Set the oracle_address.

**setCollateralAdd**

```
toggleMinting() external onlyMintPauser
```
```
toggleRedeeming() external onlyRedeemPauser
```
```
toggleBuyBack() external onlyBuyBackPauser
```
```
setPoolCeiling(uint256 new_ceiling) external onlyByOwnerOrGovernance
```
```
setOracle(address new_oracle) external onlyByOwnerOrGovernance
```

Set the collateral_address.

**addOwner**

Add an address to the array of owners.

**removeOwner**

Remove an owner from the owners array.

**onlyByOwnerOrGovernance**

Restrict actions to the governance contract or the owner(s).

**notRedeemPaused**

Ensure redemption is not paused.

**notMintPaused**

```
setCollateralAdd(address _collateral_address) external
onlyByOwnerOrGovernance
```
```
addOwner(address owner_address) external onlyByOwnerOrGovernance
```
```
removeOwner(address owner_address) external onlyByOwnerOrGovernance
```
```
onlyByOwnerOrGovernance()
```
```
notRedeemPaused()
```
##### Modifiers


Ensure minting is not paused.

```
notMintPaused()
```

### Core Frax Multisigs

##### Ethereum Mainnet

**Frax Comptrollers**


```
Chain Address
```
Arbitrum 0xe61D9ed1e5Dc261D1e90a99304fADCef2c76FD10

Aurora 0x85F61CC39dB983948671b03B8EcB36877d9A337d

Avalanche 0xc036Caff65c1A31eAa53e60F6E17f1E6689937AA

Base 0xCBfd4Ef00a8cf91Fd1e1Fe97dC05910772c15E53

Boba 0x3849Ff242Ff385F5124e6420BE681963d397 7685

Boba BNB 0x1b0772073Fc00de6dD760F734e94DB526F9B1307

Blast 0x33A133020b2C2CD41a24F74033B11EC2fC0bF97a

BSC 0x8811Da0385cCf1848B21475A42eA4D07Fc5d964a

Ethereum 0xB1748C79709f4Ba2Dd82834B8c82D4a505003f27

Evmos 0x18B34258F0972b19C3B757B2169b42b4D5b0856A

Fantom 0xE838c61635dd1D41952c68E47159329443283d90

Fraxtal 0xC4EB45d80DC1F079045E75D5d55de8eD1c1090E6

Harmony 0x5D91bA85cfbC0A3673F312f3FD0BA75a85AD73e6

Linea 0x6b603B58d7781a5967172e2FEa75f7E34c25F96d

Mantle 0xC51585F9C1938fcE489da89d24d7A623d4BEDf35


```
Metis 0xF4A4F32732F9B2fB84Ee28c58616946F3bF80F7d
```
```
Mode 0x6336CFA6eDBeC2A459d869031DB77fC2770Eaa66
```
```
Moonbeam 0x343e4f06BF240d22FbdFd4a2Fe5858BC66e79F12
```
```
Moonriver 0x2bBbE751E8C36CD6c92767776067f8Dd3A21941f
```
```
Optimism 0x0dF840dCbf1229262A4125C1fc559bd338eC9491
```
```
Polygon 0xDCB5A4b6Ee39447D700F4FA3303B1d1c25Ea9cA7
```
```
Polygon zkEVM 0x030BD43af99cb72B51dA233A73F7697Cd2461C0b
```
```
Scroll 0x7efB8A3b929D1e12640Caf8E4889A3d08e4b9039
```
```
Sei 0x0357D02fc95320b990322d3ff69204c3D251171b
```
```
Solana FSRTW4KPGifKL8yKcZ8mfoR9mKtAjwZiTHbHwgix8AQo
```
```
TRON TNpqBqghn37FLcpWWQVcRAxuBvhUYu2FEB
```
```
zkSync 0xd492dF0ce7905D7d91aE48F5e893AcAa382 21486
```
**Other Multisigs**


```
Name Address
```
```
Advisors 0x874a873e4891fB760EdFDae0D26cA2c00922C404
```
```
Business Development 0x11cC283d06FA762061df2B0D2f0787651ceef659
```
```
Community 0x63278bF9AcdFC9fA65CFa2940b89A34ADfbCb4A1
```
```
Fraxtal L1 0xe0d7755252873c4eF5788f7f45764E0e1761 0508
```
```
Investors 0xa95f86fE0409030136D6b82491822B3D70F890b3
```
```
Team 0x8D4392F55bC76A046E443eb3bab99887F4366BB0
```
```
Treasury 0x9AA7Db8E488eE3ffCC9CdFD4f2EaECC8ABeDCB48
```
##### Layer Zero

**Comptrollers**


```
Chain Address
```
Base 0xCBfd4Ef00a8cf91Fd1e1Fe97dC05910772c15E53

Blast 0x33A133020b2C2CD41a24F74033B11EC2fC0bF97a

Fraxtal 0x5f25218ed9474b721d6a38c115107428E832fA2E

Metis 0xF4A4F32732F9B2fB84Ee28c58616946F3bF80F7d

Mode 0x6336CFA6eDBeC2A459d869031DB77fC2770Eaa66

Sei 0x0357D02fc95320b990322d3ff69204c3D251171b

Solana FSRTW4KPGifKL8yKcZ8mfoR9mKtAjwZiTHbHwgix8AQo

X-Layer 0xe7Cc52f0C86f4FAB6630f1E26167B487fbF66a61


## FRAX V2 - Algorithmic

## Market Operations (AMO)


### AMO Overview

A framework for composable, autonomous central banking puzzle pieces

The second (V2) expansion of FRAX focused on the idea of fractional-algorithmic
stability by introducing the idea of the “Algorithmic Market Operations Controller” (AMO).
An AMO module is an autonomous contract(s) that enacts arbitrary monetary policy so
long as it does not change the FRAX price off its peg. This means that AMO controllers
can perform open market operations algorithmically (as in the name), but they cannot
arbitrarily mint FRAX out of thin air and break the peg. This keeps FRAX’s base layer
stability mechanism pure and untouched, which has been the core of what makes our
protocol special and inspired other smaller projects.

We can generalize the V1 mechanism to any arbitrarily complex market operation to
create a Turing-complete design space of stability mechanisms. Thus, each AMO can be
thought of as a central bank money puzzle piece. Every AMO has 3 properties:

```
1. Decollateralize - the portion of the strategy which lowers the CR
2. Market operations - the portion of the strategy that is run in equilibrium and doesn't
change the CR
3. Recollateralize - the portion of the strategy which increases the CR
```
##### AMOs


With the above framework clearly defined, it's now easy to see how Frax V1 is the
simplest form of an AMO. It is essentially the base case of any possible AMO. In V1,
decollateralization allows for expansion of the money supply and excess collateral to
flow to burning FXS. Recollateralization mints FXS to increase the collateral ratio and
lower liabilities (redemptions of FRAX).

The base layer fractional-algorithmic mechanism is always running just like before. If
FRAX price is above the peg, the CR is lowered, FRAX supply expands like usual, and AMO
controllers keep running. If the CR is lowered to the point that the peg slips, the AMOs
have predefined recollateralize operations which increases the CR. The system
recollateralizes just like before as protocol liabilities (stablecoins) are redeemed and the
CR goes up to return to the peg. This allows all AMOs to operate with input from market
forces and preserve the full design specs of the V1 base case.

AMOs enable FRAX to become one of the most powerful stablecoin protocols by creating
maximum flexibility and opportunity without altering the base stability mechanism that
made FRAX the leader of the algorithmic stablecoin space. AMO modules open a
modular design space that will allow for constant upgrades and improvements without
jeopardizing design elegance, composability, or increasing technical complexity. Lastly,
because AMOs are a complete "mechanism-in-a-box," anyone can propose, build, and
create AMOs which can then be deployed with governance as long as they adhere to the
above specifications.

```
1. Original Announcement Post
2. Quick Twitter explainer thread
```
**References and Resources/Links**


### AMO Minter

Frax's updated structure for minting FRAX and processing mints & redeems

⚠ This contract is deprecated in favor of FRAX V3 mechanisms ⚠

In October 2021, the system moved to an updated model using a FraxPoolV3 system
contract (0x2fE065e6FFEf9ac95ab39E5042744d695F560729) that handles responsive
mints & redeems for the protocol with a lower attack surface. Through this new pool, the
Frax AMO Minter contract was designed to do algorithmic minting according to the
specifications of new AMOs attached to the FraxPoolV3.

A consequence of this was that the old AMOs that were built on the FraxPoolV2
(0x1864Ca3d47AaB98Ee78D11fc9DCC5E7bADdA1c0d) were upgraded to new versions
using the FraxPoolV3 collateral and minting system, all controlled through the
comptroller msig & timelock system.

The new system allows for automated collection of yields & return of collateral to the
FraxPoolV3, of which the profit may be distributed to FXS holders by the FXS1559 AMO.

The AMO Minter is deployed at the following address on the Ethereum mainnet:
0xcf37B62109b537fa0Cb9A90Af4CA72f6fb85E241.

###### Contract Addresses


### Collateral Investor

Invests idle collateral into various DeFi vaults/protocols

⚠ This AMO has been deprecated. Many of its functions have been moved to V3 AMOs
⚠

The Collateral Investor AMO moves idle USDC collateral to select DeFi protocols that
provide reliable yield. Currently, the integrated protocols include: Aave, Compound, and
Yearn. More can be added by governance. The main requirement for this AMO is to be
able to pull out invested collateral immediately with no waiting period in case of large
FRAX redemptions. Collateral that is invested with an instant withdrawal ability does not
count as lowering the CR of the protocol since it is spontaneously available to the
protocol at all times. Nevertheless, the decollateralize function in the specs pulls out
invested collateral starting with any time-delayed withdrawals (which there are none
currently and not planned to be as of now).

Any investment revenue generated that places the protocol above the CR is burned with
FXS1559.

FraxPoolInvestorForV2 (deprecated): 0xEE5825d5185a1D512706f9068E69146A54B6e076

```
1. Decollateralize - Places idle collateral in various yield generating protocols.
Investments that cannot be immediately withdrawn lower the CR calculation.
Investments that can always be withdrawn at a 1 to 1 rate at all times such as Yearn
USDC v2 and Compound do not count as lowering the CR.
2. Market operations - Compounds the investments at the CR.
3. Recollateralize - Withdraws investments from vaults to free up collateral for
redemptions.
4. FXS1559 - Daily revenue that accrues from investments over the CR.
```
###### AMO Specs


### Curve

A stableswap pool with liquidity controlled and owned predominantly by the protocol

⚠ This specific AMO has been deprecated, but the underlying rationale (Curve/Convex
protocol-owned liquidity to achieve peg stability and protocol income) and math is still
used by newer AMOs. See V3 AMOs ⚠

The Curve AMO puts FRAX and USDC collateral to work providing liquidity for the protocol
and tightening the peg. Frax has deployed its own FRAX3CRV metapool. This means
that the Frax deployer address owns admin privileges to its own Curve pool. This allows
the Curve AMO controller to set and collect admin fees for FXS holders and various future
functions. The protocol can move idle USDC collateral or new FRAX to its own Curve pool
to create even more liquidity and tighten the peg while earning trading revenue.

CurveAMO (deprecated): 0xbd061885260F176e05699fED9C5a4604fc7F2BDC

```
1. Decollateralize - Places idle collateral and newly minted FRAX into the FRAX3CRV
pool.
2. Market operations - Accrues transaction fees, CRV rewards, and periodically
rebalances the pool. The FRAX3CRV LP tokens are deposited into Yearn crvFRAX
vault, Stake DAO, and Convex Finance for extra yield.
3. Recollateralize - Withdraws excess FRAX from pool first, then withdraws USDC to
increase CR.
4. FXS1559 - Daily transaction fees and LP value accrued over the CR. (currently in
development)
```
###### AMO Specs


Curve's Stableswap invariant allows for dampened price volatility between stablecoin
swaps when reserves are not extremely imbalanced, approximating a linear swap curve
when doing so.

In cases of extreme imbalance, the invariant approaches the Uniswap constant-product
curve.

```
A comparison of the Uniswap and Stableswap curves, taken from the Curve whitepaper
```
```
Linear swap curve generalized to N coins
```

The combination of two such curves allows for the expression of one or another,
depending on what the ratio of the balances in the pool are, according to a coefficient.
Using a dimensionless parameter as the coefficient, one may generalize the
combination of the two curves to N coins.

The protocol calculates the amount of underlying collateral the AMO has access to by
finding the balance of USDC it can withdraw if the price of FRAX were to drop to the CR.
Since FRAX is always backed by collateral at the value of the CR, it should never go below
the value of the collateral itself. For example, FRAX should never go below $.85 at an 85%
CR. This calculation is the safest and most conservative way to calculate the amount of
collateral the Curve AMO has access to. This allows the Curve AMO to mint FRAX to
place inside the pool in addition to USDC collateral to tighten the peg while knowing
exactly how much collateral it has access to if FRAX were to break its peg.

```
Constant-product swap curve generalized to N coins
```
##### XDn −^1

```
Absolute magic
```
##### Curve AMO


Additionally, the AMO’s overall strategy allows for optimizing the minimum FRAX supply Y
such that selling all of Y at once into a Curve pool with Z TVL and A amplification factor
will impact the price of FRAX by less than X%, where X is the CR’s band sensitivity. Said in
another way, the Curve AMO can put FRAX+USDC into its own Curve pool and control
TVL. Since the CR recollateralizes when FRAX price drops by more than 1 cent under $1,
that means that there is some value of FRAX that can be sold directly into the Curve pool
before the FRAX price slips by 1%. The protocol can have at least that amount of
algorithmic FRAX circulating on the open market since a sale of that entire amount at
once into the Curve pool’s TVL would not impact the price enough to cause the CR to
move. These amounts are quite large and impressive when considering Curve’s
stablecoin optimized curve. For example, a 330m TVL FRAX3Pool (assuming balanced
underlying 3Pool) can support at minimum a $39.2m FRAX sell order without moving the
price by more than 1 cent. If the CR band is 1% then the protocol should have at least
39.2m algorithmic FRAX in the open market at minimum.

The above strategy is an extremely powerful market operation which would
mathematically create a floor of algorithmic FRAX that can circulate without any danger
of breaking the peg.

Additionally, Curve allocates CRV tokens as rewards for liquidity providers to select pools
(called gauge rewards). Since the Frax protocol will likely be the largest liquidity provider
of the FRAX3CRV pool, it can allocate all its FRAX3CRV LP tokens into Curve gauges to
earn a significant return. The CRV tokens held within the Curve AMO can be used to vote
in future Curve DAO governance controlled by FXS holders. This essentially means that
the more the protocol employs liquidity to its own Curve pool, the more of the Curve
protocol it will own and control through its earned CRV rewards. The long term effect of
the Curve AMO is that Frax could become a large governance participant in Curve itself.

###### Smart Contract


iterate() The iterate function calculates the balances of FRAX and 3CRV in the
metapool in the hypothetical worst-case assumption of FRAX price falling to the CR. To
start, the function takes the current live balances of the metapool and simulates an
external arbitrageur swapping 10% of the current FRAX in the metapool until the price
given is equal (or close to) the CR, swapping out the corresponding amount of 3CRV. This
simulates the situation wherein the open-market price of FRAX falls to the CR, and the
resulting 1-to-1 swap normally offered by the metapool is picked off by arbitrageurs until
there is no more profit to be had by buying FRAX elsewhere for the CR price and selling it
into the metapool. Line 282 is the specific location where the price of FRAX is checked.

Then, the metapool checks how much its LP tokens would withdraw in that worst-case
scenarios in terms of the underlying FRAX and 3CRV. The ratio between the two is
normally tilted roughly 10-to-1 in terms of FRAX withdrawable to 3CRV withdrawable. For
the protocol's accounting of how much collateral it has, it values each 3CRV
withdrawable at the underlying collateral value (i.e. how much USDC it can redeem for it)
and each FRAX at the collateral ratio. Since the protocol never actually sends this much
FRAX into circulation under normal circumstances, this is a highly conservative estimate
on the amount of collateral it is actually entitled to in terms of USDC.

To check scenarios of how much reserves would be indebted to the Curve AMO at other
prices, one may simply adjust the fraxFloor() value in local testing through setting a
custom_floor.


### Uniswap v3

Deploying idle collateral to stable-stable pairs on Uni v3 with FRAX

The key innovation of Uniswap v3's AMM algorithm allowing for LPs to deploy liquidity
between specific price ranges allows for stablecoin-to-stablecoin pairs (e.g. FRAX-USDC)
to accrue extremely deep liquidity within a tight peg. Compared to Uniswap v2, range
orders in Uniswap v3 concentrate the liquidity instead of spreading out over an infinite
price range.

The Uniswap v3 Liquidity AMO puts FRAX and collateral to work by providing liquidity to
other stablecoins against FRAX. Since the AMO is able enter any position on Uni v3 and
mint FRAX against it, it allows for expansion to any other stablecoin and later volatile
collateral on Uni v3. Additionally, the function collectFees() can be periodically called
to allocate AMO profits to market operations of excess collateral.

UniV3LiquidityAMO (deprecated): 0x3814307b86b54b1d8e7B2Ac34662De9125F8f4E6

UniV3LiquidityAMO_V2: 0xc91Bb4b0696e3b48c0C501B4ce8E7244Fc363A79

```
1. Decollateralize - Deposits idle collateral and newly minted FRAX into the a Uni v3 pair.
2. Market operations - Accrues Uni v3 transaction fees and swaps between collateral
types.
```
```
Taken from the Uniswap v3 whitepaper
```
###### AMO Specs


```
3. Recollateralize - Withdraws from the Uni v3 pairs, burns FRAX and returns USDC to
increase CR.
4. FXS1559 - Daily transaction fees accrued over the CR.
```
All prices exist as ratios between one entity and another. Conventially, we select a
currency as the shared unit-of-account in the denominator (e.g. USD) to compare prices
for everyday goods and services. In Uniswap, prices are defined by the ratio of the
amounts of reserves of to reserves of in the pool.

```
A diagram showing range-order virtualized reserves using the constant-product invariant
```
##### x y

###### Derivation


Uniswap v3's range-order mechanic fits into the existing constant-product
market-making invariant (CPMM) by "virtualizing" the reserves at a specific price point, or
tick. Through specifying which ticks a liquidity position is bounded by, range-orders are
created that follow the constant-product invariant without having to spread the liquidity
across the entire range for a specific asset.

A price in Uniswap v3 is defined by the value 1.0001 to the power of the tick value. The
boundaries for the prices of ticks can be represented by the algebraic group

. This mechanism allows for easy conversion of integers to price
boundaries, and has the convenience of discretiating each tick-price-boundary as one
basis point (0.01%) in price from another.

Virtual reserves are tracked by tracking the liquidity and tick bounds of each
position. Crossing a tick boundary, the liquidity available for that tick may change to
reflect positions entering and leaving their respective price ranges. Within the tick
boundaries, swaps change the price according to the virtual reserves, i.e. it acts like
the constant-product ( ) invariant. The virtual reserves x and y can be
calculated from the liquidity and price:

##### x ∗ y = k

##### ( 0 ,∞)

##### i

##### G ={ gi ∣

##### i ∈Z, g =1.0001}

```
Defining price in terms of ticks
```
##### L

##### P

##### x ∗ y = k

```
L: Liquidity; P: Price; x, y: reserves of X and Y
```

Note that the actual implementation uses a square root of the price, since it saves a
square-root operation from calculating intra-tick swaps, and thus helps prevent rounding
errors.

Liquidity can be thought of as a virtual in the CPMM, while corresponds
to amount of asset and represents the intra-tick price slippage.

Since is fixed for intra-tick swaps, and can be calculated from the liquidity
and square root of the price. When crossing over a tick, the swap must only slip until the
boundary, and then re-adjust the liquidity available for the next tick.

```
Converting price to square root of ticks
```
##### k x ∗ y = k Δ Y

##### Y Δ P

```
Describing the relationship between liquidity, price, and the amount of one asset swapped
```
##### L Δ X Δ Y

##### P


### FRAX Lending

Earns APY from lending out FRAX to DeFi platforms

⚠ This AMO is deprecated. Most lending activities are now conducted via the Fraxlend
AMO. ⚠

This AMO mints FRAX into money markets such as Compound or CREAM to allow
anyone to borrow FRAX by paying interest instead of the base minting mechanism. FRAX
minted into money markets don’t enter circulation unless they are overcollateralized by a
borrower through the money market so this AMO does not lower the direct collateral ratio
(CR). This controller allows the protocol to directly lend FRAX and earn interest from
borrowers through existing money markets. Effectively, this AMO is MakerDAO’s entire
protocol in a single market operations contract. The cash flow from lending can be used
to buy back and burn FXS (similar to how MakerDAO burns MKR from stability fees).
Essentially the Lending AMO creates a new avenue to get FRAX into circulation by paying
an interest rate set by the money market.

FraxLendingAMO (deprecated): 0x9507189f5B6D820cd93d970d67893006968825ef

```
1. Decollateralize - Mints FRAX into money markets. The CR does not lower by the
amount of minted FRAX directly since all borrowed FRAX are overcollateralized.
2. Market operations - Accrues interest revenue from borrowers.
3. Recollateralize - Withdraws minted FRAX from money markets.
4. FXS1559 - Daily interest payments accrued over the CR. (currently in development)
```
The AMO can increase or decrease the interest rate on borrowing FRAX by minting more
FRAX (lower rates) or removing FRAX and burning it (increase rates). This is a powerful
economic lever since it changes the cost of borrowing FRAX on all lenders. This
permeates all markets since the AMO can mint and remove FRAX to target a specific
rate. This also effectively makes the cost of shorting FRAX more or less expensive
depending on which direction the protocol wishes to target.

###### AMO Specs

###### Adjusting Interest Rates and Capital Efficiency


Additionally, the fractional-algorithmic design of the protocol allows for unmatched
borrowing rates compared to other stablecoins. Because the Frax Protocol can mint
FRAX stablecoins at will until the market responds with pricing FRAX at $.99 and
recollateralizing the protocol, this means that money creation costs are minimal
compared to other protocols. This creates unmatched, best-in-class rates for lending if
the protocol decides to outcompete all other stablecoin rates. Thus, the AMO strategy
can optimize for conditions for when to lower the rates (and also bring them under other
stablecoin rates) and also increase rates in opposing conditions. Ironically, the lending
rate on their own token is something other stablecoin projects have difficulty controlling.
Frax has total control over this property through this AMO.


### Decentralization Ratio (DR)

Reducing reliance on centralized assets

The Frax Decentralization Ratio (DR) is the ratio of decentralized collateral value over the
total stablecoin supply backed/redeemable for those assets. Collateral with excessive
off-chain risk (i.e. fiatcoins, securities, & custodial assets such as gold/oil etc) are
counted as 0% decentralized. The DR goes through underlying constituent pieces of
collateral that a protocol has claims on, not just what is inside its system contracts. The
DR is a recursive function to find the base value of every asset.

For example, FRAX3CRV LP is 50% FRAX so remove that, as you cannot back yourself
with your own coin. The other half is 3CRV which is 33% USDC, 33% USDT, and 33% DAI.
DAI itself is about 60% fiatcoins. So each $1 of FRAX3CRV LP only has about $.066 ($1 x
0.5 * 0.33 * 0.4) of value coming from decentralized sources.

In contrast, Ethereum, as well as reward tokens like CVX and CRV, are counted as 100%
decentralized. FRAX minted through Lending AMOs also counts as decentralized since
borrowers overcollateralize their loan w/ crypto sOHM, RGT, etc. This is the same reason
DAI's vaults give it high DR.

The DR is a generalized algorithm that can be used to compute any stablecoin's
excessive off-chain risk. Other stablecoins like LUSD are much easier to calculate: their
DR is 100%. FEI is around 90% DR.

For a list of assets backing FRAX, see Frax Facts.


## FRAX V3 - 100%

## CR AND MORE


### Overview

FRAX v3: The Final Stablecoin


FRAX is a dollar-pegged stablecoin that uses “Algorithmic Market Operation” (AMO)
smart contracts and permissionless, non-custodial subprotocols as stability
mechanisms. The three main internal subprotocols used as stability mechanisms are
Fraxlend , a decentralized lending market, Frax Bonds for peg stability, and Fraxswap ,
an automated market maker (AMM) with special features. The primary external locations
for stability include Curve and Uniswap V3 pools. Additional subprotocols and AMOs can
be added with governance allowing FRAX to incorporate future stability mechanisms
seamlessly as they are discovered.

The V3 expansion of FRAX introduces the following concepts and benchmarks:

**1) Full exogenous collateralization of FRAX:** The protocol will attempt to keep >=100%
CR at all times. Starting in V3 and after FIP188 , the Frax Protocol attempts to keep all
FRAX stablecoins at a minimum of 100% collateralization ratio (CR) through AMO smart
contracts and certain real world assets held by partner entities approved by the Frax
Governance module (frxGov). The FRAX CR is calculated as the value of exogenous
collateral held on the FRAX balance sheet. The segregated balance sheet of the
stablecoin is collateral that is used to stabilize the open market price of FRAX
stablecoins.
**2) Sovereign USD peg:** Once the FRAX stablecoin reaches 100% CR, its peg will track to
USD using a combination of Chainlink oracles & governance approved reference rates. If
FRAX CR drops, AMOs and governance should attempt to restore CR to 100% and keep
FRAX price at $1.000 regardless of prices of other assets such as USDC, USDT, or DAI.
**3) IORB oracle:** FRAX V3 smart contracts intake the Federal Reserve Interest on
Reserve Balances (IORB) rate for certain protocol functions such as sFRAX staking yield.
As the IORB oracle rate increases, the Frax Protocol’s AMO strategies will react to heavily
collateralize FRAX with treasury bills, reverse repurchase contracts, and/or USD
deposited at Federal Reserve Banks that pay the IORB rate. As the IORB oracle reports
low/decreasing rates, the AMO strategies will begin to rebalance FRAX collateral with on-
chain, decentralized assets and overcollateralized loans in Fraxlend.
**4) Removal of multi-signature trust assumptions:** FRAX V3 smart contracts will
eventually operate entirely on-chain using the frxGov module in addition to Snapshot
votes by the community.
**5) Frax Bonds (FXBs):** Bonds will be issued under face value with various maturity dates
in order to intake/lock FRAX and help stabilize its peg.
**6) Non-redeemability:** FRAX stablecoins are non-redeemable, similar to fiat currencies
that do not give the holder a right to assets. Holding a FRAX stablecoin does not


guarantee you the right to redeem it for any specific financial instrument or token at any
particular time. The Frax Protocol’s only function is to use AMO contracts, real-world
assets (RWAs), and governance actions through frxGov to stabilize the FRAX price to
$1.000 by using USD oracles as reference.
**7) Fraxtal:** A modular rollup blockchain (L2) based off Optimism technology. frxETH will
be used as the gas token. Includes blockspace incentives (called Flox / FXTL points) that
reward users and developers for spending gas and interacting with smart contracts on
the network.

*FRAX v3 deployment is a gradual and iterative process. As smart contracts are
deployed, their address will be added to their appropriate documentation sections. Not all
features discussed in this document is deployed at this time.*


### Fraxtal

A modular rollup blockchain (L2) based on Optimism, with frxETH as the gas token

Fraxtal is an EVM equivalent rollup utilizing the OP stack as its smart contract platform
and execution environment. The native gas token is Frax Ether (frxETH) issued by Frax
Finance. Fraxtal also has blockspace incentives (called Flox ) that reward users and
developers for spending gas and interacting with any smart contract on the network.

You can read the whole rationale on the Fraxtal Docs , but the main reasons are:

```
1. Trivial transaction costs
2. Increased speed
3. Usage of frxETH as the gas token
4. Income via Sequencer fees
5. Flox / FXTL blockspace incentives
```
Documentation:

```
About Fraxtal | Fraxtal Docs
Frax
```
###### Overview

###### What is the point of Fraxtal? Aren't there so many L2 chains already?


### AMOs

The Interface Contracts Between FRAX Stablecoins and Subprotocols

The Frax V3 expansion introduced several new AMOs. “Algorithmic Market Operations”
(AMO) contracts are autonomous contracts that enact pre-programmed monetary policy
into a specific subprotocol (either internally built and owned by Frax Protocol such as
Fraxlend and Fraxswap, or external, such as Curve ). This means that AMO controllers
can perform open market operations such as minting FRAX stablecoins into an AMM or
lending newly minted FRAX into a money market protocol if certain preprogrammed
conditions are met or actions approved by governance. AMOs can interact with any
separate protocol allowing FRAX V3 to add, remove, and combine any stability
mechanism desired without changing the protocol.

Many of these AMOs also earn income for the protocol.

Read about older & obsolete (V2 & V1) AMOs here.

The Aave AMO takes minted FRAX and supplies it into various Aave V3 pools, such as
Ethereum and EtherFi, earning protocol interest by allowing users to borrow it. As of
10/2/2024, it is soon expected, per Aave governance , that FRAX will be removed from
isolation mode, allowing Aave borrowers to use it as collateral for a wider range of
borrowing opportunities. As a side benefit, the Aave AMO itself can temporarily borrow
other stablecoins such as USDC use them to balance the FRAX peg by swapping out
FRAX from Curve pools (such as FRAX/USDC) in times of extreme market stress.

Aave AMO (V3): 0x0F2a32f4f54Ec9D52a193E9E3493fb5FeA86Cbbe

##### Summary

##### AMOs (new for V3)

###### Aave AMO


The Curve AMO mints FRAX stablecoins in select Curve pools approved by governance.
The AMO also withdraws FRAX and burns supply to keep the exchange rate of each
Curve pool in a tight range based on the USD price of FRAX by the reference oracles.
Further depositing the Curve LP into Convex can give additional yield via Convex's CRV
gauge boost, as well as CVX tokens.

Curve AMO (deprecated, many operations are now conducted via the main comptroller
multisig but the goals are the same):
0x49ee75278820f409ecd67063D8D717B38d66bd71

Fraxlend is a permissionless, isolated lending market subprotocol of the Frax Finance
ecosystem. Anyone can lend FRAX stablecoins into isolated Fraxlend markets where
users deposit collateral to borrow FRAX and pay a dynamic interest rate to lenders. The
Fraxlend AMO lends newly created FRAX into Fraxlend pairs that are approved by the
frxGov process and earns interest from borrowers.

The Fraxlend AMO live stats are displayed on Frax Facts.

```
Complete transaction flow of Curve AMO
```
###### Curve AMO

###### Fraxlend AMO


The Fraxlend AMO contract addresses:

Ethereum Mainnet - Fraxlend AMO V1:
0x0Ed8fA7FC63A8eb5487E7F87CAF1aB3914eA4eCa Ethereum Mainnet - Fraxlend AMO
V3: 0xf6E697e95D4008f81044337A749ECF4d15C30Ea6 Arbitrum One - Fraxlend AMO
V3: 0xCDeE1B853AD2E96921250775b7A60D6ff78fD8B4
Fraxtal - Fraxlend AMO V3: 0x58C433482d74ABd15f4f8E7201DC4004c06CB611

The Fraxswap TWAMM AMO loads time-weighted average market maker orders into
the Fraxswap AMM to buy or sell collateral over a long period of time. This allows for
expanding of the FRAX balance sheet by buying collateral with FRAX stablecoins or
contracting the supply of FRAX by selling balance sheet assets through TWAMM orders.
The AMO can also be used to repurchase FXS tokens with protocol revenue/fees.

The Fraxswap TWAMM AMO contract address is
0x629C473e0E698FD101496E5fbDA4bcB58DA78dC4

```
Complete transaction flow of Fraxlend AMO
```
###### Fraxswap TWAMM AMO

###### FXB AMO


The FRAX Bonds AMO provides the FRAX ecosystem an ability to sell FRAX "bonds" at a
discounted rate to the market through FRAX governance. Each unit of FRAX bond (also
called FXB) is equal to one unit of locked FRAX, and at a pre-determined date the owner
of the FXB is able to burn their FXB and receive their equal unit of FRAX. Through the FXB
AMO, the Frax team auctions off FXBs to the public. The FRAX received by the AMO is
then sent to FinresPBC.

Technical specifications such as interface and access control can be found on Github
(TODO: make repo public).

Ethereum Mainnet FXB AMO: 0x452420df4AC1e3db5429b5FD629f3047482C543C
Fraxtal FXB AMO: 0xE6ed07952dC9993DD52c6d991Fa809C00eBE58a3

Various protocol-owned multisig addresses hold and manage revenue-earning positions
in accordance with governance decisions. Examples include Curve/Convex farms and
directly held tokens like sDAI and sfrxETH. The largest multisig
(0xB1748C79709f4Ba2Dd82834B8c82D4a505003f27 ) is on Ethereum. You can see a
full list of positions here.

###### Miscellaneous


### RWAs

Real-World Assets that Yield the IORB Rate with Minimal Maturity Risk

FRAX V3 utilizes a real-world asset (RWA) strategy when the IORB oracle reports high
rates. FRAX V3 only utilizes RWAs that yield very close to the IORB rate with as little
duration risk as possible. Thus, only the following assets are considered at this time
unless changed by the frxGov process:

1.) Short-dated United States treasury bills
2.) Federal Reserve Overnight Repurchase Agreements
3.) USD deposited at Federal Reserve Bank master accounts
4.) Select shares of money market mutual funds

FRAX V3 partner custodians primarily concentrate on only the above assets. RWA
partners must report the custody, broker, banking, and trust arrangements employed in
the course of holding the assets for FRAX V3 no later than monthly.

FIP-277 enshrined FinresPBC as the first RWA partner for FRAX V3. FinresPBC will
concentrate on securing “cash equivalent” low risk RWAs and optimize for yielding close
to the IORB rate for the sFRAX staking vault.

Additional RWA partners can be onboarded per governance voting through frxGov.


### sFRAX

Staking vault targeting the IORB rate

Staked FRAX (sFRAX) is an ERC4626 staking vault that distributes part of the Frax
Protocol yield weekly to stakers denominated in FRAX stablecoins. The sFRAX token
represents pro rata deposits within the vault and is always withdrawable for FRAX
stablecoins at the pro rata rate at all times. sFRAX APY attempts to roughly track the
interest on reserve balances (IORB) rate of the United States Federal Reserve using the
IORB oracle. This benchmark rate is generally accepted as the “risk free rate” of the US
Dollar. The FRAX staking vault attempts, but does not guarantee in any way, to target this
rate.

```
sFRAX
```
##### Summary

##### Details


The sFRAX vault APY is based on a utilization function that can be set by the frxGov
governance module. The utilization curve started at a top end of 50% APY and
theoretically has no bottom, but as of 10/2/2024, has settled in the 5-10% range. As more
FRAX is staked in the vault, the protocol will attempt to deploy FRAX to DeFi governance
approved AMOs/strategies as well as RWA sources that yield as close to the IORB rate as
possible to keep the floor APY near the IORB target. Every Wednesday at 11:59:59 UTC
the Frax Protocol adds newly minted FRAX stablecoins into the sFRAX vault. This newly
minted FRAX is one-to-one proportional to the earnings of the Frax Protocol over the prior
week and thus fully backed at 100% CR. Each sFRAX epoch is 1 week and identical in
length and start time as the FXS gauge and sfrxETH epoch. There is no protocol
guarantee that the deployed capital will be from a particular type of asset at any time.
The frxGov governance module will control the deployment path and asset type for
sFRAX yield. The Staked FRAX vault’s yield predominantly originates from real-world
asset (RWA) strategies employed by Frax Protocol partner custodians including, but not
limited to, FinresPBC.

sFRAX: 0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32

```
Complete transaction flow through the sFRAX staking vault system.
```

### FXBs

Zero-coupon bonds that help stabilize the FRAX peg

FXB tokens are simple, trustless tokens that resemble a zero-coupon bond that
converts to the FRAX stablecoin upon maturity. FXB AMOs auction off FXBs at a discount
to face value. This discount provides the equivalent of RWA yield to buyers without the
assumption of RWA risk. They also help remove circulating FRAX and stabilize the peg, as
users cannot sell FRAX that is locked (until maturity) in a FXB.

```
FXB
```
##### Summary

##### Details


FXBs are debt tokens denominated in FRAX stablecoins, not a claim on any other asset or
collateral. FXB tokens are only convertible to FRAX stablecoins, they do not guarantee
FRAX peg, FRAX value, or yield/interest denominated in any other asset except FRAX.
FXBs do not entitle the holder to any asset offchain or onchain (other than FRAX
stablecoins). Thus, FXBs are not redeemable for US Treasury Bills nor any real-world
asset, are not directly backed/collateralized by them (or any specific asset), and do not
have any utility except trustlessly converting to FRAX stablecoins at the pre-programmed
maturity timestamp generated at their minting. This is important and not merely a
semantic distinction because it directly defines the normative and economic property of
FXBs. Frax Bond tokens only guarantee that they convert to FRAX on a one-to-one basis
through smart contracts that issue them.

FXBs allow the formation of a yield curve to price the time value of lending FRAX back to
the protocol itself. Each FXB token is a fungible ERC20 token deployed from an onchain
factory contract. **At FXB minting time, FRAX stablecoins are transferred into the FXB
contract for conversion on maturity.** This prevents any external actions being necessary
for the full FXB cycle to occur and entirely remains trustless. There can be multiple FXB
series circulating at all times and no limit for the minimum or maximum maturity
timestamp for FXBs deployed from the factory.

FXBs mature at the end of the day of their maturity date in UTC and have no expiration.
For example, the 20261231 FXB is able to be burned back for its' corresponding FRAX as
soon as 1893456000.


FXB series price discovery happens through a continuous gradual Dutch auction (GDA)
auction system that has quantity and price limit set by the Frax team. This guarantees
that FXB tokens are not sold for prices lower than the floor limit. Auctions happen
through the FXB AMO contract and are trustless, permissionless, and non-custodial. New
auctions can happen at any time by the Fraxtal Comptroller and Fraxtal AMO Operator
, initiated through the FXB AMO.

```
FXB system economical flow
```
###### Series Auctions


As mentioned, **at FXB minting time, FRAX stablecoins are transferred into the FXB
contract for conversion on maturity.** An FXB can be broken down into two types, Origin
and Bridged, referring to the chain the FXB is originally minted on. This differentiation is
needed as the Origin chain, the chain the FXB was originally minted from, is where the
FXB owner is able to burn their FXB for the equivalent FRAX after maturity. An FXB which,
for example, originates on Fraxtal and is then bridged to Fraxtal, is considered Bridged,
**whereby the underlying FRAX remains on Fraxtal and the FXB must be bridged back to
redeem the FRAX**. **Similarly, the FXB must be minted on the origin chain to contain the
underlying FRAX.**

Why does this happen? When an FXB is originally created, it is done through the
FXBFactory. This origin FXB contains the code to mint and burn. Once the FXB is
bridged, the destination chain creates the FXB from the bridge ERC20Factory. This
bridged version can only be minted and burned (redeemed) by the bridge.

```
Complete transaction flow of FXB system
```
###### Minting & Redemptions: Origin chain vs. Bridged chain

##### Contracts


To trustfully import contracts to your local repository, refer to the frax-template.

```
Contract Ethereum Fraxtal
```
```
FXB Factory C79e7127c4597116E40xa8478781D9605E17c3b4c9 664f4B8A58271f6De40xaFa1705021f65418e746D8
```
```
Auction Factory (permission-
less)
```
```
0xc9268c7F59850B26567b0f
5d3Dcc317cEDC43490
```
```
0x2606C2BbE377EDa9e38FFf
300D422Ca7cCAB1e5d
```
```
FXB AMO FD629f3047482C543C0x452420df4AC1e3db5429b5 991Fa809C00eBE58a30xE6ed07952dC9993DD52c6d
```
```
AMO Operator (msig) 5C2acef662a6277D400x831822660572bd54ebaa06 c115107428E832fA20x5f25218ed9474b721d6a38
```
```
AMO Timelock (msig) 5C2acef662a6277D400x831822660572bd54ebaa06 D5d55de8eD1c1090E60xC4EB45d80DC1F079045E75
```
###### Operations Contracts

###### Core Contracts


```
Ethereum
```
```
December 31, 2024
```
2024

```
Fraxtal Ethereum Arbitrum One
```
```
FXB
```
```
0xa71bB8c79dc8Ff
A90A6Dd711aA9Fb
e5114c19cba
```
```
0xF8FDe8A259A36
98902C88bdB1E13
Ff28Cd7f6F09
```
```
Auction
```
```
0x36b3b471c7486E
b9583759681404c4
8d3c8CC813
```
```
Oracle
```
```
0x08a0748cF885F4
6e20fA30A50a0358
08eab293D3
```
```
Curve Pool
```
```
https://curve.fi/#/fr
axtal/pools/factory-
stable-ng-
19/deposit
```
```
https://curve.fi/#/et
hereum/pools/facto
ry-stable-ng-
44/swap
```
```
https://curve.fi/#/ar
bitrum/pools/factor
y-stable-ng-3/swap
```
```
Origin Chain
```
```
Maturity Date
```

```
Fraxtal
```
```
December 31, 2025
```
2025

```
Fraxtal Ethereum Arbitrum One
```
```
FXB
```
```
0xacA9A33698cF9
6413A40A4eB9E87
906ff40fC6CA
```
```
Auction
```
```
0x6e6B61369A4f54
9FF3A7c9E0CFA5F
7E8Ada5CD22
```
```
Oracle
```
```
Curve Pool
```
```
https://curve.fi/#/fr
axtal/pools/factory-
stable-ng-
22/deposit
```
```
Origin Chain
```
```
Maturity Date
```

```
Ethereum
```
```
December 31, 2026
```
2026

```
Fraxtal Ethereum Arbitrum One
```
```
FXB
```
```
0x8e9C334afc7610
6F08E0383907F4Fc
a9bB10BA3e
```
```
0x76237BCfDbe8e0
6FB774663add962
16961df4ff3
```
```
Auction
```
```
0x334f19B2B6ab1B
16eC65A7138dCEe
22B60E1A60c
```
```
Oracle
```
```
0x2ec5D1C13fEF1C
7029eE329a1D31B
2180c9b3707
```
```
Curve Pool
```
```
https://curve.fi/#/fr
axtal/pools/factory-
stable-ng-
17/deposit
```
```
https://curve.fi/#/et
hereum/pools/facto
ry-stable-ng-
45/swap
```
```
https://curve.fi/#/ar
bitrum/pools/factor
y-stable-ng-4/swap
```
```
Origin Chain
```
```
Maturity Date
```

```
Fraxtal
```
```
December 31, 2029
```
2029

```
Fraxtal Ethereum Arbitrum One
```
```
FXB
```
```
0xF1e2b576aF4C6a
7eE966b14C810b7
72391e92153
```
```
Auction
```
```
0xb29002BF77606
6BF8d73B3F0597c
A8B894E30050
```
```
Oracle
```
```
Curve Pool
```
```
https://curve.fi/#/fr
axtal/pools/factory-
stable-ng-
23/deposit
```
```
Origin Chain
```
```
Maturity Date
```

```
Fraxtal
```
```
December 31, 2055
```
2055

```
Fraxtal Ethereum Arbitrum One
```
```
FXB
```
```
0xc38173D34afaEA
88Bc482813B3CD2
67bc8A1EA83
```
```
Auction
```
```
0xfC9f079e9D7Fa6
080f61F854187058
0Ee7af7CF2
```
```
Oracle
```
```
Curve Pool
```
```
https://curve.fi/#/fr
axtal/pools/factory-
stable-ng-
24/deposit
```
```
Origin Chain
```
```
Maturity Date
```

### sFRAX Token Addresses

##### sFRAX


```
Chain Address
```
Arbitrum 0xe3b3FE7bcA19cA77Ad877A5Bebab186bEcfAD906

Avalanche 0x3405E88af759992937b84E58F2Fe691EF0EeA320

Base (LayerZero) 0xe4796cCB6bB5DE2290C417Ac337F2b66CA2E770E

Blast (LayerZero) 0xe4796cCB6bB5DE2290C417Ac337F2b66CA2E770E

BSC 0xa63f56985F9C7F3bc9fFc5685535649e0C1a55f3

Ethereum (native) 0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32

Ethereum (LayerZero) 0xe4796cCB6bB5DE2290C417Ac337F2b66CA2E770E

Fraxtal (native) 0xfc000000000000000000000000000000000 00008

Fraxtal (LayerZero) 0x5bff88ca1442c2496f7e475e9e7786383bc070c0

Metis (LayerZero) 0xe4796cCB6bB5DE2290C417Ac337F2b66CA2E770E

Mode (LayerZero) 0x5bff88ca1442c2496f7e475e9e7786383bc070c0

Optimism 0x2Dd1B4D4548aCCeA497050619965f91f78b3b532

Polygon zkEVM 0x2C37fb628b35dfdFD515d41B0cAAe11B542773C3

Sei (LayerZero) 0x5bff88ca1442c2496f7e475e9e7786383bc070c0

X-Layer (LayerZero) 0x5bff88ca1442c2496f7e475e9e7786383bc070c0


### sFRAX & FXB Multisigs

```
Chain Name Address
```
```
Ethereum sFRAX & FXB Comptroller 0x831822660572bd54ebaa065C2acef662a6277D40
```

## Bridging


### Fraxferry

A slower, simpler, more secure method of bridging tokens.

A 24-48hr token bridging solution designed and implemented by the Frax team.

- Too many bridge hacks from bugs, team rugs, anon devs, etc.
- Risks of infinite mints.
- Some chains have slow bridges, especially on return trip back to Ethereum (e.g.
    Arbitrum, Optimism, etc).

```
Fraxferry
```
##### Summary

##### Motivation


- Risk is capped by token amounts in bridge contracts. No risk of infinite mints.
- Slower transactions give more time for bad batches to be caught and stopped,
    assuming they are not cancelled automatically by bots.
- Crewmembers can pause contracts so any issues can be investigated.
- Captain is tricked into proposing a batch with a false hash AND all crewmember bots
    are offline/censured/compromised AND no one disputes the proposal.
- Reorgs on the source chain. Avoided, by only returning the transactions on the source
    chain that are at least one hour old.
- Rollbacks of optimistic rollups. Avoided by running a node.
- Operators do not have enough time to pause the chain after a fake proposal. Avoided
    by requiring a minimal amount of time between sending and executing the proposal.
- Centralization

```
1. User sends tokens to the contract. This transaction is stored in the contract.
embark(), embarkWithRecipient(), or embarkWithSignature().
2. Captain queries the source chain for transactions to ship.
3. Captain sends batch (start, end, hash) to start the trip. depart()
4. Wait at least 24 hrs.
5. Crewmembers check the batch and can dispute it if it is invalid. disputeBatch() or
do nothing.
6. Non disputed batches can be executed by the first officer by providing the
transactions as calldata. User receives their tokens on the other chain. disembark()
7. Hash of the transactions must be equal to the hash in the batch.
8. In case there was a fraudulent transaction (a hacker for example), the owner can
cancel a single transaction, such that it will not be executed. jettison(),
jettisonGroup(), removeBatches().
```
##### Benefits

##### Risks

##### Process


9. The owner can manually manage the tokens in the contract and must make sure it
has enough funds.


### LayerZero x Stargate

Bridge tokens in minutes through the LayerZero x Stargate partnership.

- Alternative and scalable multichain bridging solution.
- Bridging complete within minutes.
- Flexible choice in source or destination chain.
- Trust delegated to LayerZero / Stargate.

#### ◦ LayerZero Endpoint

#### ◦ LayerZero, Horizen DVN

#### ◦ Stargate UI

Frax assets are represented as OFTs (as defined by LayerZero ) on chains other than
Fraxtal, Ethereum, and Arbitrum. An OFT operates the exact same as an ERC20 with the
additional function of bridge-ability through the LayerZero protocol.

- FRAX
- sFRAX
- frxETH
- sfrxETH
- FXS

##### Motivation

##### Benefits

##### Risks

##### OFTs

###### Available Frax OFTs


- FPI

In the initial deployment with LayerZero, the LayerZero team deployed Frax assets across
several chains as fixed contracts. After the initial deployment, the Frax team has
assumed additional deployment responsibilities and currently deploys OFTs as
upgradeable, transparent proxies (contracts audited, repo link ).

Legacy and Upgradeable OFTs maintain the same address per asset across chains,
respectively.

All OFTs with bridging permissions are managed by a 3/6 msig on each respective chain.

- Bridge through the Stargate UI (link )
- Bridge directly with LayerZero

```
npm install @fraxfinance/layerzero-v2-upgradeable
```
###### Legacy vs. Upgradeable OFTs

##### Process


- ProxyAdmin: 0x223a681fc5c5522c85c96157c0efa18cd6c5405c
- Msigs (links to gnosis safe)

#### ◦ Ethereum

#### ◦ Blast

#### ◦ Metis

#### ◦ Base

```
import { OptionsBuilder } from "@fraxfinance/layerzero-v2-
upgradeable/oapp/contracts/oapp/libs/OptionsBuilder.sol";
import { SendParam, MessagingFee, IOFT } from "@fraxfinance/layerzero-
v2-upgradeable/oapp/contracts/oft/interfaces/IOFT.sol";
```
```
uint256 amount = 1e18;
// Upgradeable FRAX - Bridging FROM Mode
address oft = 0x80eede496655fb9047dd39d9f418d5483ed600df;
// Ethereum - choose destination EID from
https://github.com/FraxFinance/frax-oft-
upgradeable/blob/master/scripts/L0Config.json
uint32 dstEid = 30101;
```
```
bytes memory options = OptionsBuilder.newOptions();
SendParam memory sendParam = SendParam({
dstEid: dstEid,
to: bytes32(uint256(uint160(msg.sender))),
amountLD: amount,
minAmountLD: amount,
extraOptions: options,
composeMsg: '',
oftCmd: ''
});
MessagingFee memory fee = IOFT(_oft).quoteSend(sendParam, false);
IOFT(_oft).send{value: fee.nativeFee}(
sendParam,
fee,
payable(msg.sender)
);
```
##### Contracts & Addresses

###### Admin


#### ◦ Mode

#### ◦ Sei

#### ◦ Fraxtal

#### ◦ X-Layer

- **Chain** : Ethereum, Metis, Blast, Base
- **Admin** : Chain-respective msig
- OFTs

#### ◦ FRAX: 0x909DBdE1eBE906Af95660033e478D59EFe831fED

#### ◦ sFRAX: 0xe4796cCB6bB5DE2290C417Ac337F2b66CA2E770E

#### ◦ sfrxETH: 0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A

#### ◦ FXS: 0x23432452B720C80553458496D4D9d7C5003280d0

#### ◦ frxETH : 0xF010a7c8877043681D59AD125EbF575633505942

#### ◦ FPI: 0xE41228a455700cAF09E551805A8aB37caa39D08c

- **Chain** : Mode, Sei, Fraxtal, X-Layer
- **Admin** : ProxyAdmin (owned by chain-respective msig)
- OFTs

#### ◦ FRAX: 0x80eede496655fb9047dd39d9f418d5483ed600df

#### ◦ sFRAX: 0x5bff88ca1442c2496f7e475e9e7786383bc070c0

#### ◦ sfrxETH: 0x3ec3849c33291a9ef4c5db86de593eb4a37fde45

#### ◦ FXS: 0x64445f0aecc51e94ad52d8ac56b7190e764e561a

#### ◦ frxETH: 0x43eDD7f3831b08FE70B7555ddD373C8bF65a9050

#### ◦ FPI : 0xEed9DE5E41b53D1C8fAB8AAB4b0e446F828c1483

- https://github.com/fraxfinance/frax-oft-upgradeable

###### Legacy OFTs

###### Upgradeable OFTs

###### Source Code


- https://github.com/fraxfinance/layerzero-v2-upgradeable
- https://github.com/fraxfinance/frax-oft-legacy

Layer Zero OFT Frax Assets are not a liability of the Frax Protocol. They do not appear on
the balance sheet on facts.frax.finance. **They are not redeemable for protocol owned
assets.** They are only redeemable for the Frax Asset in the Layer Zero “lockbox” contract
that is part of the Layer Zero Protocol.

Layer Zero OFT Frax Assets are settled by Layer Zero Decentralized Verification Networks
(DVNs) that are not operated by the Frax Protocol, Frax Core Developers, or any
associated entity of Frax. Therefore, the risk of OFT Frax Assets are borne by their
holders. This is similar to holding “USDC tokens” on a network that its issuer, Circle, does
not support minting/redeeming on. Such “USDC tokens” do not appear on Circle’s
balance sheet as a liability nor are they redeemable from its issuer. They are only
redeemable for the underlying USDC token in the bridge (ie ‘lockbox’) contract.

In the future, the Frax Protocol can work with Layer Zero to upgrade certain OFT Frax
Assets on select networks to allow the Frax Protocol to have direct oversight in the
settlement process similar to the Frax Ferry system. After this, the OFT Frax Assets for
those select networks will be reported on the associated balance sheet of those Frax
Assets. When this occurs, the Frax Protocol will consider such tokens at that time as its
liability that are backed directly by the assets it holds on its respective balance sheets. At
this time, no Frax OFT tokens are native liabilities of the protocol.

##### Security Considerations


### Fraxtal Bridge

Bridging and messaging between Ethereum and Fraxtal

The bridging process for Fraxtal is derived from that of Optimism. Assets going from
Ethereum Mainnet to Fraxtal (L1StandardBridge & L1ERC721Bridge) usually only take a
few minutes, but coming back from Fraxtal to Ethereum (L2StandardBridge &
L2ERC721Bridge) can take 7 days. The same applies for messages
(L1CrossDomainMessenger & L2CrossDomainMessenger). To mitigate this, Frax Ferry is
also available for Fraxtal, and most users will opt to use the Ferry to come back to
Ethereum, taking only 24-48 hrs instead of 7 days.

Fraxtal Bridge UI: https://mainnet.frax.com/tools/bridge/deposit
Fraxtal Bridge Docs: https://docs.frax.com/fraxtal/tools/bridges

```
Type Contract Address (on Ethereum)
```
```
ETH/frxETH/ERC20s L1StandardBridge 0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2
```
```
ERC721s L1ERC721Bridge 0xa9B5Fb84B7aeAF0D51C95DB04a76B1D4738D0eC5
```
```
Messages L1CrossDomainMessenger 0x126bcc31Bc076B3d515f60FBC81FddE0B0d542Ed
```
###### Ethereum -> Fraxtal (~ a few minutes)

###### Fraxtal -> Ethereum (7 days)


```
Type Contract Address (on Fraxtal)
```
ETH/frxETH/ERC20s L2StandardBridge 0x420000000000000000000 0000000000000000010

ERC721s L2ERC721Bridge 0x420000000000000000000 0000000000000000014

Messages L2CrossDomainMessenger 0x420000000000000000000 0000000000000000007


## Frax Price Index


### Overview (CPI Peg & Mechanics)

A novel stablecoin pegged to a basket of consumer goods

The Frax Price Index (FPI) is the second stablecoin of the Frax Finance ecosystem. FPI is
the first stablecoin pegged to a basket of real-world consumer items as defined by the US
CPI-U average. The FPI stablecoin is intended to keep its price constant to the price of
all items within the CPI basket and thus hold its purchasing power with on-chain stability
mechanisms. Like the FRAX stablecoin, all FPI assets and market operations are on-chain
and use AMO contracts.

⚠ FPIS is set to be phased out by March 22, 2028 and convertible thereafter to FXS ⚠

The Frax Price Index Share (FPIS) token is the governance token of the system, which is
also entitled to seigniorage from the protocol. Excess yield will be directed from the
treasury to FPIS holders, similar to the FXS structure. During times in which the FPI
treasury does not create enough yield to maintain the increased backing per FPI due to
inflation, new FPIS may be minted and sold to increase the treasury. Since the protocol is
launched from within the Frax ecosystem, the FPIS token will also direct a variable part of
its revenue to FXS holders.

```
FPI
```
###### FPI

###### FPIS


FPI uses the CPI-U unadjusted 12 month inflation rate reported by the US Federal
Government: https://www.bls.gov/news.release/cpi.nr0.htm. The $1 start date was
based on the December 2021 CPI-U result. Thus, the FPI market price after that date
should track the same purchasing power of Dec 2021. For example, on October 4 2024,
FPI's market price was approximately $1.11. That means that it takes about $1.11 of
October 4 2024 US Dollars to purchase something that used to cost $1 in December of
2021 (~3.5-4% inflation per year).

A specialized Chainlink oracle commits this data on-chain immediately after it is publicly
released. The oracle's reported inflation rate is then applied to the redemption price of FPI
stablecoins in the system contract. This redemption price grows per second on-chain (or
declines in rare cases of deflation). The peg calculation rate is updated once every 30
days when bls.gov releases their monthly CPI price data. The contract handling the FPI
peg price targeting is the CPI Tracker Oracle.

Thus, the FPI peg tracks the above 12 month inflation rate and pegs to it at all times from
the FPI redemption contract. When buying FPI stablecoins for another asset (such as
ETH) the trader is taking the position that CPI purchasing power is growing faster over
time than the sold ETH. If selling FPI for ETH, then the trader is taking the position that
ETH growth is outpacing the CPI inflation rate of the US Dollar.

```
FPIS
```
###### Inflation & Peg Calculation


FPI aims to be the first on-chain stablecoin to have its own unit of account derived from a
basket of goods, both crypto and non-crypto. While FPI can be considered an inflation
resistant yield asset, its primary motivation is to create a new stablecoin to denominate
transactions, value, and debt. Denominating DAO treasuries and measuring revenue in
FPI as well as benchmarking performance against an FPI trading pair helps better gauge
if value accrual is actively growing against inflation in real terms. It also helps ground on-
chain economics to baskets of real world assets.

At first, the treasury will be comprised solely of $FRAX, but will expand to include other
crypto-native assets such as bridged BTC, ETH, and non-crypto consumer goods and
services.

```
The 12 month inflation rate is used as the peg target of FPI. At an inflation rate of 9.1% in June 2022, the FPI peg would
grow at a rate of 9.1% against USD for the next 30 days. Note that during deflationary periods (June 2009) where the
rate of inflation is negative, the FPI peg would decrease against USD.
```
**FPI as a Unit of Account**

**FPI Stability Mechanism**


FPI uses the same type of AMOs as the FRAX stablecoin however it is modeled to keep a
100% collateral ratio (CR) at all times. This means that for the collateral ratio to stay at
100% the protocol balance sheet must be growing at least at the rate of CPI inflation.
Thus, AMO strategy contracts must earn a yield proportional to CPI otherwise the CR will
decrease to below 100%. During times that AMO yield is under the CPI rate, a TWAMM
AMO will sell FPIS tokens for FRAX stablecoins to keep the CR at 100% at all times. The
FPIS TWAMMs will be removed when the CR returns to 100%.

Minting of FPI (using FRAX) and redeeming FPI (to receive FRAX) can be done at any
time for a small fee using the FPI Controller Pool. Users can also buy/sell FPI in various
markets such as Curve or Fraxswap.

FPI Controller Pool: 0x2397321b301B80A1C0911d6f9ED4b6033d43cF51

The FPI Comptroller multisig collects/deposits surplus/deficit FRAX from the FPI
Controller Pool and is the owner of FPI-related contracts. It also invests in various income
streams like Curve/Convex farms and uses the proceeds to help add backing to the FPI
peg.

FPI Comptroller Multisig: 0x6A7efa964Cf6D9Ab3BC3c47eBdDB853A8853C502

**FPI Comptroller Multisig**


### Frax Price Index Share (FPIS)

⚠ FPIS is set to be phased out by March 22, 2028 and convertible thereafter to FXS ⚠

The Frax Price Index Share (FPIS) is the governance token of the Frax Price Index (FPI)
stablecoin. FPIS is interconnected to the Frax Share (FXS) token thus it is referred to as a
"linked governance token." The FXS & FPIS are economically linked programmatically in a
similar way that a layer 1 token is connected to a dapp token on its network.

FXS is the base token of the Frax Ecosystem thus FXS will always accrue value as both
FRAX & FPI stablecoins grow no matter what. FXS accrues value proportional to the
aggregate growth of the entire Frax economy as a whole similar to how ETH captures
value from the sum total of all dapp economic activity that pays gas for access to
Ethereum blockspace. FPIS tracks FPI growth specifically similar to a specific ERC20
token tracks growth of its own protocol rather than the entire L1 economy. If you think the
Frax economy is undervalued as a whole, you should want to own more FXS. If you think
people are undervaluing FPI growth specifically, you should increase more exposure to
FPIS. It's the exact same dynamic of whether you would invest in a specific project or you
invest in ETH instead. If you think the ETH economy as a whole is undervalued, you'd buy
more ETH. But if you think a specific project will grow faster than the sum total of the
economy, you'll want to own that specific token rather than the L1 token.*

The Frax Collateral Ratio (FCR) is the ratio of FRAX stablecoins directly backing FPI
tokens. The FCR is directly calculated before value distribution to FPIS & veFPIS token
holders. The FCR specifically is used for FXS value capture of the system.

Whenever excess FPI balance sheet value is distributed back to FPIS token holders it will
pass through an "FCR contract" or function call that calculates how much "FRAX
collateral FPI uses."

Essentially, any economic productivity above the inflation rate goes to FPIS holders. Since
the FPI is pegged to a basket of consumer items, it represents a claim on the value of the
basket. The value the protocol generates in excess beyond that basket is captured by
FPIS holders.


FPIS supply is initially set to 100 million tokens at genesis (distribution here) but is
expected to decrease to around ~41M that are actually eligible for 2.5 : 1 conversion to
FXS in March 22, 2028.

***No discussion of value capture in this documentation is investment advice.
Governance token mechanics are merely meant to describe how the Frax/FPI system
functions.**


### FPIS Distribution

Initial distribution plan for FPIS tokens

⚠ Remaining tokens in the Frax and FPI Treasuries will be burned per the phase out and
not be eligible for 2.5 : 1 conversion to FXS. The total supply is thus expected to decrease
to around ~41M eligible FPIS. ⚠

**30% Frax Finance Treasury 30,000,000**
FXS voters have total control in voting how to distribute these tokens through
governance.

Frax Finance Treasury (multisig): 0x9AA7Db8E488eE3ffCC9CdFD4f2EaECC8ABeDCB48

**25% FPI Protocol Treasury 25,000,000**
FPIS voters themselves have total control in how to distribute these tokens.

FPI Protocol Treasury (multisig): 0x5181C3c36bD52F783e6E1771d80b1e3AdCB36019

**10% veFPIS Emissions 10,000,000**

⚠ veFPIS emissions were stopped in early July 2024 per the phase out. The leftover
tokens are stored in the FPI Protocol Treasury multisig and are planned to be burned. ⚠

FPIS allotted to veFPIS stakers on a yearly halvening emissions schedule starting
February 20th, 2023 at 4pm PST. First year emissions of 5M FPIS, second year emissions
of 2.25M FPIS, third year 1.125M FPIS, etc. This emission will be augmented with
additional FPI Protocol profits distributed to veFPIS holders when the FPI stablecoin is
above a certain collateral ratio set by governance.

**25% Core Developers & Contributors Treasury 25,000,000**
4 year back-vested to start from February 20th 2022 at the same time as airdrop genesis
with a 6 month cliff. Distribution occurs on/around 20th of each month.

###### FPIS Token Distribution (100,000,000 FPIS total supply)


FPI Core Contributors (Ethereum): 0x708695db8dF61e646571E78b9b3e2BAd7D6c42E3
FPI Core Contributors (Fraxtal): 0xe0EefF64eAB79C78221f9571BBDA70eEe65620ce

**10% February 2022 Airdrop to FXS Holders 10,000,000**
Snapshot on February 20th 11:59:59 UTC 2022 and were claimable until August 20th
11:59:59 UTC 2022. Approximately 459,074.53 FPIS went unclaimed and was recovered
to the FPI Comptroller Multisig at 0x6A7efa964Cf6D9Ab3BC3c47eBdDB853A8853C502

FPISAirgrabber: 0x3266724e4e58E5891Eb30E6d329bA119A192483c


### CPI Tracker Oracle

The oracle uses Chainlink's December 2021 CPI-U data point (provided by Fiews) as the
'base' index for determining the peg price. Each month, the change / delta percent of the
index is applied to the previous month's data point to determine the peg price. December
2021 was chosen because the oracle contract requires two initial 'historical' data points.

December 2021 CPI-U: 280.126

January 2022 CPI-U: 281.933

Delta is (281.933 / 280.126) - 1 = 0.64506686%

Assuming December 2021 is $1, applying the delta percentage gives

$1 x (1.0064506686) = $1.0064506686 as the peg price.

If February 2022 CPI-U data was 284.182, the delta would be (284.182 / 281.933) - 1 =
0.79770726%.

Applying this to the previous peg price would give $1.0064506686 * (1 + 0.0079770726)
= $1.0144791987 as the new peg price. In other words, you would need this many Feb
2022 dollars to buy one Dec 2021 dollar.

**CPITrackerOracle (V2):** 0x66B7DFF2Ac66dc4d6FBB3Db1CB627BBb01fF3146

**Raw data source:** https://data.bls.gov/timeseries/CUSR0000SA0

**Chainlink / Fiews Oracle:**
https://etherscan.io/address/0x049Bd8C3adC3fE7d3Fc2a44541d955A537c2A484

```
https://market.link/jobs/44964ac4-d302-4141-8f94-67e58e34b88d
```
##### Description

**Example:**


```
frax-solidity/src/hardhat/contracts/Oracle/CPITrackerOracle.sol at master
· FraxFinance/frax-solidity
GitHub
```
##### Code


### FPI Controller Pool

The FPI Controller Pool has various helper functions related to FPI and its peg, such as
minting and redeeming FPI.

FPI Controller Pool: 0x2397321b301B80A1C0911d6f9ED4b6033d43cF51

Users can mint FPI with FRAX or redeem FPI for FRAX. There is a small fee associated
with this, initially 0.30%.

The twammToPeg function is used by the protocol to introduce market pressure to bring
the market price of FPI up (or down) to the target peg price.

The contract can lend FRAX collateral to various AMOs that earn yield (among other
things).

```
frax-solidity/src/hardhat/contracts/FPI/FPIControllerPool.sol at master ·
FraxFinance/frax-solidity
GitHub
```
##### Description

###### Mint / Redeeming

###### twammToPeg

###### giveFRAXToAMO / receiveFRAXFromAMO

##### Code


### veFPIS

An updated and modular veFPIS

⚠ veFPIS is now unlocked, and yield for it stopped, per the Frax Singularity Roadmap
Part 1. Users are encouraged to migrate to the FPIS Locker on Fraxtal for eventual FPIS
conversion into FXS ⚠

veFPIS is an updated and vesting + yield system for the FPIS governance token. Similar to
veFXS, users may lock their FPIS for up to 4 years for four times the amount of veFPIS
(e.g. 100 FPIS locked for 4 years returns 400 veFPIS). veFPIS is not a transferable token
nor does it trade on liquid markets. It's akin to an account based point system that
signifies the vesting duration of the wallet's locked FXS tokens within the protocol.

The veFPIS balance linearly decreases as tokens approach their lock expiry, approaching
1 veFPIS per 1 FPIS at zero lock time remaining.

veFPIS has an additional "DeFi whitelist" for smart contracts that add modular
functionality to the staking system. Governance can approve each new whitelisted DeFi
feature. For example, a liquidation contract can be whitelisted by governance which
allows a staker's underlying FPIS tokens to be liquidated if they borrow against their
veFPIS balance. Users will have to approve each DeFi whitelisted contract to spend their
FPIS tokens before the new functionality can be unlocked for each user. This allows the
staking system to remain fully trustless so that no extra logic can access a staker's
veFPIS balance without a staker's approval thus keeping modules opt-in per wallet
address. This system allows governance to add new iterative functionality to veFPIS
staking such as "slashing conditions" and new ways to earn higher yield (and potentially
be slashed if users opt-in) by adding smart contracts which allow veFPIS holders to vote
on CPI gauge weights, borrow FPI, or control liquidity deployment.

###### Double Whitelist & Modular Functionality


### FPIS Conversion / FPIS Locker

Retiring FPIS and converting it to FXS

Per the Frax Singularity Roadmap Part 1 vote, the community decided to eventually
retire the FPIS token in the interest of focusing on FXS. On March 22, 2028, FPIS will be
eligible for conversion to FXS at the ratio of 2.5 FPIS to 1 FXS. Until then, users may
choose to lock their FPIS on Fraxtal using the FPIS Locker. This will give the user
1.333x - 0.333x veFXS voting power based on the length of their lock. After the March 22,
2028 conversion date, positions that are still locked on the FPIS Locker can be converted
to their FXS equivalent and rolled over into veFXS until the remaining lock time is
completed, after which FXS can be withdrawn. FPIS that was never locked in the FPIS
Locker or became unlocked before the conversion date may also be converted to FXS
after the conversion date without having to go via the FPIS Locker. Users that have locked
veFPIS positions may now freely withdraw their FPIS.


### FPI and FPIS Token Addresses

##### FPI


```
Chain Address
```
Arbitrum 0x1B01514A2B3CdEf16fD3c680a818A0Ab97Da8a09

Base (LayerZero) 0xE41228a455700cAF09E551805A8aB37caa39D08c

Blast (LayerZero) 0xE41228a455700cAF09E551805A8aB37caa39D08c

BSC 0x2Dd1B4D4548aCCeA497050619965f91f78b3b532

Ethereum 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Ethereum (LayerZero) 0xE41228a455700cAF09E551805A8aB37caa39D08c

Fantom N/A

Fraxtal (native) 0xFc000000000000000000000000000000000 00003

Fraxtal (LayerZero) 0xEed9DE5E41b53D1C8fAB8AAB4b0e446F828c1483

Metis (LayerZero) 0xE41228a455700cAF09E551805A8aB37caa39D08c

Mode (LayerZero) 0xEed9DE5E41b53D1C8fAB8AAB4b0e446F828c1483

Moonbeam N/A

Optimism 0xC5d43A94e26fCa47A9b21CF547ae4AA0268670E1

Polygon N/A

Sei (LayerZero) 0xEed9DE5E41b53D1C8fAB8AAB4b0e446F828c1483

X-Layer (LayerZero) 0xEed9DE5E41b53D1C8fAB8AAB4b0e446F828c1483


```
Chain Address
```
```
Arbitrum 0x3405E88af759992937b84E58F2Fe691EF0EeA320
```
```
BSC 0xD1738eB733A636d1b8665f48bC8a24dA889c2562
```
```
Ethereum (native) 0xc2544A32872A91F4A553b404C6950e89De901fdb
```
```
Fraxtal (native) 0xfc000000000000000000000000000000000 00004
```
```
Fantom N/A
Moonbeam N/A
```
```
Optimism 0x8368Dca5CE2a4Db530c0F6e535d90B6826428Dee
```
```
Polygon N/A
```
##### FPIS


### FPI Multisigs

```
Name Address
```
```
Comptroller 0x6A7efa964Cf6D9Ab3BC3c47eBdDB853A8853C502
```
```
Treasury 0x5181C3c36bD52F783e6E1771d80b1e3AdCB36019
```
```
Team Incentives 0x708695db8dF61e646571E78b9b3e2BAd7D6c42E3
```
##### Ethereum

##### Other Chains


```
Chain Name Address
```
Arbitrum Comptroller 0xF0D5007dB0393c9D5F6A88A5F82Df520EA483fDb

Avalanche Comptroller 0xB3e03c9C1820C6216953FB1BBC6fFd232ac12a19

BSC Comptroller 0x49f9cbf5333d8e50c9BE76c775777DB2ACb1d456

Fantom Comptroller 0xe722B0fA594e290a8E53bFB5654cE4Ad8a4BE811

Fraxtal Comptroller 0x7fC64FFDdf99Cd64dc2CFf86A82F3b749962cF33

Fraxtal Team Incentives 0xe0EefF64eAB79C78221f9571BBDA70eEe65620ce

Moonbeam Comptroller 0xc4d89dcE72cde17DC3BEF317E62530b6A0733971

Optimism Comptroller 0x8Acc8819cBB632dE4a8E732f08b9E578D2A8F635

Polygon Comptroller 0x4EBd698a5dB2580587EE0000929128190524006c

Polygon zkEVM Comptroller 0xDD2a221c0A9B88052af736D5CcCb27362b8EF57B


## Fraxswap


### Overview

A Unique Time Weighted Average Market Maker for Trustless Monetary Policy

Fraxswap is the first constant product automated market maker with an embedded time-
weighted average market maker (TWAMM) for conducting large trades over long periods
of time trustlessly. It is fully permissionless and the core AMM is based on Uniswap V2.
This new AMM helps traders execute large orders efficiently. Fraxswap is a fully
permissionless AMM which means others can create their own LP pairs in for any two
tokens, like Uniswap.

The motivation for building Fraxswap was to create a unique AMM with specialized
features for algorithmic stablecoin monetary policy, forward guidance, and large
sustained market orders to stabilize the price of one asset by contracting its supply or
acquiring a specific collateral over a prolonged period. Specifically, Frax Protocol will use
Fraxswap for:

```
1. Buying back and burning FXS with AMO profits,
2. Increase the stability of the pegs for the FRAX & FPI stablecoins
3. Selling FRAX to purchase hard assets
4. Deploying protocol-owned liquidity for income and utility, such as FRAX/FXS and
FRAX/<gas token> on various chains.
```
```
Fraxswap
```
##### Summary

###### Ideal use cases by other protocols, stablecoin issuers, & DAOs include:


1) Accumulation of a treasury asset (such as stablecoins) over time by slowly selling
governance tokens.
2) Buying back governance tokens slowly over time with DAO revenues & reserves.
3) Acquiring another protocol's governance tokens slowly over time with the DAO's own
governance tokens (similar to a corporate acquisition/merger but in a permissionless
manner).
4) Defending "risk free value" (RFV) for treasury based DAOs such as Olympus, Temple,
and various projects where the backing of the governance token is socially or
programmatically guaranteed.

To use Fraxswap for monetary policy, the best method is to create a token pair and add
protocol controlled liquidity. Then TWAMM orders can be placed in any size in either
direction as desired for forward guidance and rebalancing of the DAO's net assets. See
the technical specifications section to understand slippage calculations and liquidity
optimizations for TWAMMs.

Fraxswap UI: https://app.frax.finance/swap/main


### Technical Specifications

Fraxswap technical details

The Core AMM for Fraxswap is Uniswap V2 and based on the full range xy=k constant
product design. Fraxswap has adhered to many of the design decisions of Uniswap V2 as
it extended the codebase to support TWAMMs. Fraxswap v2 plans to support
concentrated liquidity & correlated asset liquidity in a unique & novel way to allow
TWAMM functionality across such pairs as well.

Extensive documentation on Uniswap core functionality can be found here:
https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works

```
Diagram of order flow on a Fraxswap pair with a TWAMM order active.
```
##### Diagram

###### Core AMM

###### Time-weighted Average Market Maker (TWAMM)


Fraxswap is the first live TWAMM implementation. The embedded TWAMM adheres to
Paradigm’s original whitepaper specifications. Features mentioned in the whitepaper
are used to optimize the execution of long-term orders which include: order pooling and
aligning order expiries (hourly). Long-term orders are executed prior to any interaction
with Fraxswap, this means the long-term orders are executed first before the AMM
interaction and once per block (see above schematic). Fraxswap implements an
approximation formula of Paradigm’s original formula and allows for a simplified, more
gas-efficient TWAMM.

The TWAMM whitepaper describes the fundamental mechanics:
"Each TWAMM instance facilitates trading between a particular pair of assets, such as
ETH and [FRAX].

The TWAMM contains an embedded AMM, a standard constant-product market maker
for [...] two assets. Anyone may trade with this embedded AMM at any time, just as if it
were a normal AMM.
Traders can submit long-term orders to the TWAMM, which are orders to sell a fixed
amount of one of the assets over a fixed number of blocks — say, an order to sell 100
ETH over the next 2,000 blocks.
The TWAMM breaks these long-term orders into infinitely many infinitely small virtual
sub-orders, which trade against the embedded AMM at an even rate over time.
Processing transactions for each of these virtual sub-orders individually would cost
infinite gas, but a closed-form mathematical formula allows us to calculate their
cumulative effect only when needed.
The execution of long-term orders will push the embedded AMM's price away from prices
on other markets over time. When this happens, arbitrageurs will trade against the
embedded AMM's price to bring it back in line, ensuring good execution for long-term
orders.
For example, if long-term sells have made ETH cheaper on the embedded AMM than it is
on a particular centralized exchange, arbitrageurs will buy ETH from the embedded AMM,
bringing its price back up, and sell it on the centralized exchange for a profit."

Interactive comparison of Paradigm’s TWAMM formula and Fraxswap’s TWAMM formula
can be found at: https://www.desmos.com/calculator/wp4zrkh6uj

###### Code


GitHub - FraxFinance/dev-fraxswap: Fraxswap for Fraxtal
GitHub


### Fraxswap Contract Addresses

Smart contract addresses for Fraxswap V1 & V2

V2 includes a new feature, allowing for different LP Fees per pool

##### Fraxswap V2


```
Chain Factory Router
```
```
Arbitrum 0x8374A74A728f06bEa6B7259C68AA7BBB732bfeaD 0xCAAaB0A72f781B92bA63Af27477aA46aB8F653E7
```
```
Avalanche 0xf77ca9B635898980fb219b4F4605C50e4ba58afF 0x5977b16AA9aBC4D1281058C73B789C65Bf9ab3d3
```
```
Binance Smart Chain 0xf89e6CA06121B6d4370f4B196Ae458e8b969A011 0x67F755137E0AE2a2aa0323c047715Bf6523116E5
```
```
Ethereum 0x43eC799eAdd63848443E2347C49f5f52e8Fe0F6f
```
```
Regular:
0xC14d550632db8592D1243
Edc8B95b0Ad06703867
Multihop:
0x25e9acA59512622412908
41b6f863d59D37DC4f0
```
```
Fantom 0xDc745E09fC459aDC295E2e7baACe881354dB7F64 0x7D21C651Dd333306B35F2FeAC2a19FA1e1241545
```
```
Fraxtal 0xE30521fe7f3bEB6Ad556887b50739d6C7CA667E6
```
```
Regular:
0x2Dd1B4D4548aCCeA49705
0619965f91f78b3b532
```
```
Multihop:
0x67E04873691258950299B
d8610403D69bA0A1e10
```
```
Moonbeam 0x51f9DBEd76f5Dcf209817f641b549aa82F35D23F 0xD356d5b92a2329777310ECa03E7e708D1D21D182
```
```
Moonriver 0x7FB05Ca29DAc7F5690E9b5AE0aF0415D579D7CD3 0xD8FC27ec222E8d5172CD63aC453C6Dfb7467a3C7
```
```
Optimism 0x67a1412d2D6CbF211bb71F8e851b4393b491B10f 0xB9A55F455e46e8D717eEA5E47D2c449416A0437F
```
```
Polygon 0x54F454D747e037Da288dB568D4121117EAb34e79 0xE52D0337904D4D0519EF7487e707268E1DB6495F
```
##### -------------------------------------


**DEPRECATED**

Fraxswap Factory: 0xB076b06F669e682609fb4a8C6646D2619717Be4b

Fraxswap Router: 0x1C6cA5DEe97C8C368Ca559892CCce2454c8C35C7

Fraxswap Factory: 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Fraxswap Router: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Factory: 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Fraxswap Router: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Factory: 0xa007a9716dba05289df85A90d0Fd9D39BEE808dE

Fraxswap Router: 0x0AE84c1A6E142Ed90f8A35a7E7B216CB25469E37

Fraxswap Factory: 0xF55C563148cA0c0F1626834ec1B8651844D76792

Fraxswap Router: 0xa007a9716dba05289df85A90d0Fd9D39BEE808dE

##### Fraxswap V1

###### Ethereum

###### Arbitrum

###### Avalanche

###### Binance Smart Chain

###### Fantom


Fraxswap Factory: 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Fraxswap Router: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Factory: 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Fraxswap Router: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Factory: 0x5Ca135cB8527d76e932f34B5145575F9d8cbE08E

Fraxswap Router: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Factory: 0xBe90FD3CDdaf0D3B8576ffb5E51aDbfD304d0437

Fraxswap Router: 0xffE66A866B249f5d7C97b4a4c84742A393bC9354

Fraxswap Factory: 0xc2544A32872A91F4A553b404C6950e89De901fdb

Fraxswap Router: 0x9bc2152fD37b196C0Ff3C16f5533767c9A983971

###### Harmony

###### Moonbeam

###### Moonriver

###### Optimism

###### Polygon


## Fraxlend


### Fraxlend Overview

An isolated pair lending protocol

Fraxlend is a lending platform that provides lending markets between a pair of ERC-20
assets. Each pair is an isolated market which allows anyone to participate in lending and
borrowing activities. Lenders are able to deposit ERC-20 assets into the pair and receive
yield-bearing fTokens. As interest is earned, fTokens can be redeemed for ever-increasing
amounts of the underlying asset.

The main purpose for the creation of Fraxlend was for usage by the Fraxlend AMO. The
AMO contract supplies protocol-owned FRAX (and other Frax ecosystem tokens like
frxETH and sfrxETH) for other users to borrow, in exchange for those borrowers
depositing various collateral tokens and paying interest. This both generates income for
the protocol and diversifies the collateral backing FRAX.

The max loan-to-value (LTV) for each pair can voted on by the community, but generally
is around 75% for pairs with volatile tokens and 90% for stablecoin/stablecoin pairs (the
latter is generally less risky). The protocol also maintains a liquidation bot, but
liquidations can be performed by any user against any unhealthly/underwater position.

**Fraxlend UI:** Link

**Public Repo** : https://github.com/FraxFinance/fraxlend

```
Fraxlend
```
##### Summary & Motivation

##### Ecosystem Participants


The primary participants in Fraxlend are **Lenders** and **Borrowers** , these participants
interact with individual **Pairs**.

- Lenders provide Asset Tokens to the pair in exchange for fTokens
- Borrowers provide Collateral Tokens to the pair and in exchange receive Asset
    Tokens. Borrowing incurs an interest rate which is capitalized and paid to lenders
    upon redemption of fTokens.

Beyond **Pairs** , the rest of the ecosystem includes: **Oracles** , **Rate Calculators** , and the
**Fraxlend Pair Deployer**

- Each pair relies on an **Oracle** to determine the market rate for both the Asset Token
    and the Collateral Token. Oracles combine price feeds from multiple places to
    achieve a robust and manipulation resistant price feed.
- Each pair is deployed with a **Rate Calculator**. These contracts calculate the interest
    rate based on the amount of available capital to borrow. Typically less borrowing will
    lead to lower rates, with more borrowing leading to higher rates.
- Each pair is deployed by a **Deployer** contract
- The pair **Registry** keeps track of all Fraxlend Pairs deployed


### Key Concepts

Each pair is an isolated market to borrow a single ERC-20 token (known as the Asset
Token) by depositing a different ERC-20 token (known as the Collateral Token).

When Lenders deposit Asset Tokens into the Pair, they receive fTokens. fTokens are ERC-
20 tokens and are redeemable for Asset Tokens (sometimes referred to as the underlying
asset). As interest is accrued, fTokens are redeemable for increasing amounts of the
underlying asset.

Borrowers deposit Collateral Tokens into the Pair and in exchange receive the right to
borrow Asset Tokens

Each borrower's position has a Loan-To-Value (LTV). This represents the ratio between
the value of the assets borrowed and the value of the collateral deposited. The LTV
changes when the exchange rate between Asset and Collateral Tokens move or when
interest is capitalized.

If a borrower's LTV rises above the Maximum LTV, their position is considered unhealthy.
In order to remediate this, a borrower can add collateral or repay debt in order to move
the LTV back into a healthy range.

The Maximum LTV value is immutable and configured at deployment. Typically the value
is set to 75%. Custom Term Sheet deployments can set this value manually, even
creating under-collateralized loans by setting the value above 100%. Maximum LTV
configured above 100% must be accompanied by a borrower whitelist to protect against
malicious actors. The configured value can be found by calling the maxLTV() function
on the pair.

##### Pairs

##### Loan-To-Value

##### Rate Calculator


Each pair is configured to use a specific Rate Calculator contract to determine interest
rates. At launch, Fraxlend supports two types of Rate Calculators.

- **Time-Weighted Variable Rate Calculator** - allows the interest rate to change based on
    the amount of assets borrowed, known as the utilization. When utilization is below
    the target, interest rates will adjust downward, when utilization is above the target,
    interest rates will adjust upward. For more information see Advanced Concepts:
    Time-Weighted Variable Interest Rate
- **Linear Rate Calculator** - calculates the interest rate purely as a function of utilization.
    Lower utilization results in lower borrowing rate, while higher utilization results in
    higher borrowing rates. For more information see Advanced Concepts: Linear Rate
- **Variable Rate V2** - calculates the interest rate as a function of utilization. The interest
    rate responds immediately to changes in utilization along a rate function f(Utilization)
    = rate. However, the slope of the function increases when utilization is above the
    target and decreases when utilization is below the target. This means that rates will
    respond instantly to changes in utilization. Extended periods of low or high utilization
    will change the shape of the rate curve. For more information see Advanced
    Concepts: Variable Rate V2

When a borrowers LTV rises above the Maximum LTV, any user can repay all or a portion
of the debt on the borrower's behalf and receive an equal value of collateral plus a
liquidation fee. The liquidation fee is immutable and defined at deployment. By default
the value is set to 10% and can be accessed by calling the liquidationFee() view
function on the pair.

When lenders deposit Asset Tokens they receive fTokens at the current fToken Share
Price. fTokens represent a lender's share of the total amount of underlying assets
deposited in the pair, plus the capitalized interest from borrowers. As interest accrues,
the Share Price increases. Upon redemption, the fTokens are redeemable for an ever-
increasing amount of Asset Tokens which includes capitalized interest. To check the
current fToken Share Price, call the totalAsset() view function and compare the value
of amount/shares.

##### Liquidations

##### fToken Share Price


The Vault Account is core concept to all accounting in the Pair. A Vault Account is a
struct which contains two values:

1. The total **Amount** of tokens in the Vault Account.
2. the total number of **Shares** in the Vault Account.

The Shares represent the total number of claims to the amount. Shares can be redeemed
for Asset Tokens. The rate of redemption, known as the **Share Price** is determined by
dividing the Amount value by the Shares value. It is essentially the exchange rate
between Shares and the underlying Asset Token.

To convert between a value represented as an Amount into the corresponding Shares,
divide the Amount by the Share Price. To convert from Shares to Amount, multiply by
Share Price.

Shares = Amount / Share Price
Amount = Shares x Share Price

```
struct VaultAccount {
// Represents the total amount of tokens in the vault
uint128 amount; // Analogous to market capitalization
```
```
// Represents the total number of shares or claims to the vault
uint128 shares; // Analogous to shares outstanding
}
```
##### Vault Account


### Lending

**Lenders** deposit Asset Tokens into the Pair and in return receive the corresponding
number of Asset Shares (fTokens) depending on the current Share Price.

At any time a Lender can exchange their fTokens for the underlying Asset Tokens at the
rate given by the current price. The fToken Share Price increases as more interest is
accrued.

Accruing interest is the only operation which can change the Share Price. Because
interest accrual is always positive, the number of Asset Tokens that each fToken is
redeemable for cannot decrease.

Alice has deposited 100 FRAX tokens to be lent out to borrowers, the initial fToken Share
Price was 1.00 and she received 100 fTokens. Since her initial deposit, the pair has
earned 10 FRAX of interest. So the Amount shows 110 (100 deposited FRAX + 10 FRAX
earned as interest). The current fToken Share Price is 1.10 (110 FRAX / 100 fTokens)

###### A Lending Example


If Bob now deposits 100 FRAX for lending we would see the following changes. First the
Amount in the pair will increase by 100. The current Share Price for fTokens is 1.10.
Therefore Bob will receive 90.91 (100 / 1.10) fTokens for his deposit. The Asset Vault
Account now looks like this:

As interest accrues, the Amount increases. If an additional 20 FRAX are accrued as
interest the Asset Vault Account looks like this:

The Share Price has now increased to 1.2048 (230 FRAX / 190.91 fToken). This means
that Bob can redeem his 90.91 fTokens for 109.52 FRAX. Likewise, Alice can redeem her
100 fTokens for 120.48 FRAX.

```
Asset Vault Account Total
```
```
Amount 110
Shares 100
```
```
Alice Share Balance (fToken) 100
Bob Share Balance (fToken) 0
```
```
Asset Vault Account Total
```
```
Amount 210
Shares 190.91
```
```
Alice Share Balance (fToken) 100
Bob Share Balance (fToken) 90.91
```
```
Asset Vault Account Total
```
```
Amount 230
```
```
Shares 190.91
Alice Share Balance (fToken) 100
```
```
Bob Share Balance (fToken) 90.91
```

Over time, as more interest accrues, Alice and Bob can redeem their fTokens for an ever-
increasing amount of the underlying asset.


### Borrowing

Each pair gives the opportunity for users to borrow Asset Tokens, in return borrowers
must supply the Pair with the appropriate amount of Collateral Tokens

As long as borrowers have an open position, interest accrues and is capitalized. This
means that over time the amount a borrower owes increases by an amount equal to the
interest they owe. In order for a borrower to receive their collateral back, they must return
the original loan amount plus all accrued interest.

Just like we used the Asset Vault Account to keep track of the total asset amounts and
the corresponding number of shares, we use the Borrow Vault Account to keep track of
the total amount borrowed, the capitalized interest, and the number of outstanding
borrow shares.

Suppose that Alice has borrowed 100 FRAX ($100 of value) using $150 worth of ETH.
Since her initial borrow she has accumulated 10 FRAX of interest. The Borrow Vault
Account would appear as follows:

###### A Borrowing Example


Remember that borrower's positions must remain below the Maximum Loan-To-Value
(LTV). Because Alice's LTV is 73.33% she is below the max value of 75% and her position
is considered healthy.

We calculate Alice's LTV in the following way. First we calculate the value of her loan to
be $110 by multiplying her Borrow Share Balance (100 shares) by the Borrow Share Price
(1.10), then multiply by the FRAX price given in USD (1.00). The value of her loan is $100
(100x1.10x1.00). The value of her collateral is $150. This gives $110 / $150 = 73.33%

Bob now borrows 100 FRAX, using $175 worth of ETH. Given the current Borrow Share
Price of 1.10, his Borrows Shares Balance would be approximately 90.91. Unlike lenders,
borrowers do not receive an ERC20 token representing their debt, instead the Share
Balances are simply stored in the Pair. Now the Borrow Vault Account looks like this:

Suppose that the Pair accrues another 20 FRAX of interest. The Borrow Vault Account
now looks like this:

```
Borrow Vault Account Total
```
```
Amount 110 FRAX
Shares 100
```
```
Alice Collateral Amount $150 ETH
Alice Borrow Shares Balance 100
```
```
Borrow Vault Account Total
```
```
Amount 210 FRAX
```
```
Shares 190.91
Alice Collateral Amount $150 ETH
```
```
Alice Borrow Shares Balance 100
Bob Collateral Amount $175 ETH
```
```
Bob Borrow Shares Balance 90.91
```

The new Borrow Share Price is 1.2048 (230 / 190.91). This means that in order for Alice
to repay her debt she will need to repay 120.48 FRAX (Alice Shares (100) x Share Price
(1.2048)). Likewise, Bob would need to repay 109.52 FRAX (Bob Shares (90.91) x Share
Price (1.2048)).

As interest accrues the amount required to repay the loan increases and the LTV of each
position changes.

Alice's LTV: 80.32% (120.48 / 150)

Bob's LTV: 62.58% (109.52 / 175)

As the interest accrued and was capitalized, Alice's position has entered an unhealthy
state as her LTV is above the Maximum LTV of 75%. This puts her at high risk of having
her position liquidated.

```
Borrow Vault Account Total
```
```
Amount 230 FRAX
Shares 190.91
```
```
Alice Collateral Amount $150 ETH
Alice Borrow Shares Balance 100
```
```
Bob Collateral Amount $175 ETH
Bob Borrow Shares Balance 90.91
```

### Advanced Concepts

Position Health & Liquidations

Interest Rates


### Position Health & Liquidations

Each pair has a configured Maximum Loan-To-Value (LTV). Over time, as interest is
capitalized, borrowers must add more collateral or repay a portion of their debt.
Otherwise they risk having their position become unhealthy. To determine a borrower’s
LTV we use the value of the collateral and the value of the fTokens.

Share Price is the price of 1 fToken in Asset Token Units (i.e. AssetToken:fToken ratio)
Exchange Rate is the price of 1 Asset Token in Collateral Units (i.e. Collateral:Asset ratio)

When a borrowers LTV rises above the Maximum LTV, any user can repay the debt on the
borrower's behalf and receive an equal value of collateral plus a liquidation fee. The
liquidation fee is immutable and defined at deployment. By default the value is set to
10% and can be accessed by calling the liquidationFee() view function on the pair.
The configured Maximum LTV can be found by calling the maxLTV() function on the
pair.

##### LTV =

##### CollateralBalance / ExchangeRate

##### BorrowShares × SharePrice

###### Position Health

###### Liquidations

###### Dynamic Debt Restructuring


Liquidators can close a borrower's position as soon as LTV exceeds the Maximum LTV
(typically 75%). However, in cases of extreme volatility, it is possible that liquidators
cannot close the unhealthy position before the LTV exceeds 100%. In this unlikely
scenario bad debt is accumulated. In this case, the liquidator repays the maximum
amount of the borrower's position covered by the borrower's collateral and the remaining
debt is reduced from the total claims that all lenders have on underlying capital. This
prevents the situation wherein lenders rush to withdraw liquidity, leaving the last lender
holding worthless fTokens (commonly known as "bad debt" in other lending markets) and
ensures the pair is able to resume operating normally immediately after adverse events.


### Interest Rates

Each pair is configured to change interest rates as a function of Utilization. Utilization is
the total amount of deposited assets which have been lent to borrowers. Fraxlend
currently has two interest rate models available for use:

```
1. The Linear Rate
2. Time-Weighted Variable Rate
3. Variable Rate V2
```
The Linear rate is a configurable function that allows for two linear functions of the form
y = mx +b. The function takes parameters which are defined at the time the Pair is
created.

**Minimum Rate** : Rate when Utilization is 0%
**Vertex Rate** : Rate when utilization is equal to vertex utilization (i.e when the two slopes
meet)
**Vertex Utilization** : The Utilization % where the two slopes meet
**Maximum Rate** : Rate when Utilization is 100%

###### Linear Rate


These configuration values are immutable and fixed at time of Pair creation.

The Interest Rate is calculated using the following formulae:

If **Utilization Rate is equal to Vertex Utilization** then:

If **Utilization Rate is less than Vertex Utilization** then:

If **Utilization Rate is greater than Vertex Utilization** then:

The Time-Weighted Variable Interest Rate adjusts the current rate over time. The variable
interest rate is configured with a half-life value, given in seconds, which determines how
quickly the interest rate adjusts.

**Minimum Rate** : Minimum Rate to which interest can fall
**Target Utilization Range** : The Utilization Range where the interest rate does not adjust, it
is considered in equilibrium with the market expectations.
**Maximum Rate** : Maximum Rate to which interest can rise
**Interest Rate Half-Life** : The time it takes for the interest to halve when Utilization is 0%.
This is the speed at which the interest rate adjusts. **In the currently available Rate
Calculator, the Interest Rate Half-Life is 12 hours.**

The Time-Weighted Variable Interest Rate allows the market to signal the appropriate
interest rate.

##### InterestRate ( U = Uvertex )= Ratevertex

##### InterestRate ( U < Uvertex )= Ratemin +( U ×

##### Uvertex^

##### ( Ratevertex − Ratemin )

##### )

##### InterestRate ( U > Uvertex )= Ratevertex +(( U − Uvertex )×(

##### 1 − Uverte

##### Ratemax^ − Rat

###### Time-Weighted Variable Interest Rate


When **Utilization is below the target range** , the interest rate lowers, this encourages more
borrowing and lenders to pull their capital, both of which push the Utilization Rate back
into the target range.

When **Utilization is above the target range** , the interest rate increases which encourages
more lending and less borrowing, bringing the Utilization back towards the target range.
Encouraging participants to borrow or lend as a function of both time and utilization.

The following graph shows how the interest rate changes when the Interest Rate Half-Life
is 4 hours, with a Target Utilization Range of 75% - 85%:

This allows the market, not the pair creator, to decide the appropriate interest rate of a
given asset-collateral pair, the pair creator only needs to provide a target utilization.

The Variable Rate V2 Interest Rate combines the concepts from the Linear Interest Rate
and the Time-Weighted Variable Interest Rate. Specifically, it utilizes the linear function
from the Linear Interest Rate to determine the current rate, but adjusts the vertex and
max rate utilizing the formula from the Time-Weighted Variable Interest Rate.

###### Variable Rate V2 Interest Rate


Just like the Time-Weighted Variable Interest Rate, the Variable Rate V2 takes a half-life
and target utilization parameters. When utilization is low, the Vertex and Max Rate will
decrease. If utilization is high, the Vertex and Max Rate will increase. The rate of the
decrease/increase is determined by both the utilization and half-life. If utilization is 0%
the Vertex and Max Rates will decrease by 50% each half-life. If the utilization is 100%,
the increase will be 100% per half-life.

This means that interest rates will immediately respond to changes in utilization along
the linear rate curve while at the same time adjusting to market conditions over the long
term by scaling the slope of the linear rate curve.


### Vault Account

The **Vault Account** is a struct used for accounting in the Fraxlend Pair:

The **Vault Account** contains two elements:

```
1. amount - represents a total amount
2. shares - represents claims against the amount
```
In lending, **amount** represents the total amount of assets deposited and the interest
accrued.

When lenders deposit assets, the amount of assets deposited increases **amount,** the
**shares** value is also increased by an amount such that the ratio between
**amount** / **shares** remains unchanged.

When interest is accrued, **amount** is increased and **shares** remains the same. Each
lender's share of the underlying assets are measured in shares.

When lenders remove liquidity, they redeem shares for the underlying asset. The
**shares** amount will be decreased by the number of shares redeemed, the **amount** will
be decreased such that the ratio between **amount** / **shares** remains unchanged.

**Borrow Accounting**

In borrowing, **amount** represents the total amount of assets borrowed and the interest
accrued.

```
struct VaultAccount {
uint128 amount;
uint128 shares;
}
```
**Lending Accounting**


When borrowers receive assets, the number of tokens received increases **amount,** the
**shares** value is also increased by an amount such that the ratio between
**amount** / **shares** remains unchanged.

When interest is accrued, **amount** is increased and **shares** remains the same. Each
borrower's debt is measured in shares.

When borrower's repay debt, **amount** is decremented by the amount of assets returned,
**shares** is decreased by an amount such that the ratio of **amount** / **shares** remain
unchanged. An individual borrowers shares balance is decremented by this number of
shares.


### ABI & Code

An abstract contract which contains the core logic and storage for the FraxlendPair

The constructor function is called on deployment

```
GitHub - FraxFinance/fraxlend
GitHub
```
```
constructor(bytes _configData, bytes _immutables, uint256 _maxLTV,
uint256 _liquidationFee, uint256 _maturityDate, uint256 _penaltyRate,
bool _isBorrowerWhitelistActive, bool _isLenderWhitelistActive)
internal
```
###### Public Repo

##### ABI

###### FraxlendPairCore

###### constructor


The initialize function is called immediately after deployment

This function can only be called by the deployer

```
Param Type Description
```
```
_configData bytes
```
```
abi.encode(address _asset,
address _collateral, address
_oracleMultiply, address
_oracleDivide, uint256
_oracleNormalization,
address _rateContract, bytes
memory _rateInitData)
```
```
_immutables bytes
```
```
_maxLTV uint256
```
```
The Maximum Loan-To-Value
for a borrower to be
considered solvent (1e5
precision)
```
```
_liquidationFee uint256
```
```
The fee paid to liquidators
given as a % of the repayment
(1e5 precision)
```
```
_maturityDate uint256 The maturityDate date of thePair
```
```
_penaltyRate uint256 The interest rate aftermaturity date
```
```
_isBorrowerWhitelistActive bool Enables borrower whitelist
_isLenderWhitelistActive bool Enables lender whitelist
```
```
function initialize(string _name, address[] _approvedBorrowers,
address[] _approvedLenders, bytes _rateInitCallData) external
```
###### initialize


The _totalAssetAvailable function returns the total balance of Asset Tokens in the
contract

```
Param Type Description
```
```
_name string The name of the contract
```
```
_approvedBorrowers address[] An array of approvedborrower addresses
```
```
_approvedLenders address[] An array of approved lenderaddresses
```
```
_rateInitCallData bytes The configuration data for theRate Calculator contract
```
```
function _totalAssetAvailable(struct VaultAccount _totalAsset, struct
VaultAccount _totalBorrow) internal pure returns (uint256)
```
```
Param Type Description
```
```
_totalAsset struct VaultAccount
```
```
VaultAccount struct which
stores total amount and
shares for assets
```
```
_totalBorrow struct VaultAccount
```
```
VaultAccount struct which
stores total amount and
shares for borrows
```
```
Return Type Description
```
```
[0] uint256 The balance of Asset Tokensheld by contract
```
###### _totalAssetAvailable

###### _isSolvent


The _isSolvent function determines if a given borrower is solvent given an exchange
rate

The _isPastMaturity function determines if the current block timestamp is past the
maturityDate date

Checks for solvency AFTER executing contract code

```
function _isSolvent(address _borrower, uint256 _exchangeRate) internal
view returns (bool)
```
```
Param Type Description
```
```
_borrower address The borrower address tocheck
```
```
_exchangeRate uint256
```
```
The exchange rate, i.e. the
amount of collateral to buy
1e18 asset
```
```
Return Type Description
```
```
[0] bool Whether borrower is solvent
```
```
function _isPastMaturity() internal view returns (bool)
```
```
Return Type Description
```
```
[0] bool Whether or not the debt ispast maturity
```
```
modifier isSolvent(address _borrower)
```
###### _isPastMaturity

###### isSolvent


Checks if msg.sender is an approved Borrower

Checks if msg.sender and _receiver are both an approved Lender

Ensure function is not called when passed maturity

The AddInterest event is emitted when interest is accrued by borrowers

```
Param Type Description
```
```
_borrower address The borrower whose solvencywe will check
```
```
modifier approvedBorrower()
```
```
modifier approvedLender(address _receiver)
```
```
Param Type Description
```
```
_receiver address An additional receiveraddress to check
```
```
modifier isNotPastMaturity()
```
```
event AddInterest(uint256 _interestEarned, uint256 _rate, uint256
_deltaTime, uint256 _feesAmount, uint256 _feesShare)
```
###### approvedBorrower

###### approvedLender

###### isNotPastMaturity

###### AddInterest


The UpdateRate event is emitted when the interest rate is updated

```
Param Type Description
```
```
_interestEarned uint256 The total interest accrued byall borrowers
```
```
_rate uint256 The interest rate used tocalculate accrued interest
```
```
_deltaTime uint256 The time elapsed since lastinterest accrual
```
```
_feesAmount uint256 The amount of fees paid toprotocol
```
```
_feesShare uint256 The amount of sharesdistributed to protocol
```
```
event UpdateRate(uint256 _ratePerSec, uint256 _deltaTime, uint256
_utilizationRate, uint256 _newRatePerSec)
```
```
Param Type Description
```
```
_ratePerSec uint256 The old interest rate (persecond)
```
```
_deltaTime uint256 The time elapsed since lastupdate
```
```
_utilizationRate uint256 The utilization of assets in thePair
```
```
_newRatePerSec uint256 The new interest rate (persecond)
```
###### UpdateRate

###### addInterest


The addInterest function is a public implementation of _addInterest and allows 3rd
parties to trigger interest accrual

The _addInterest function is invoked prior to every external function and is used to
accrue interest and update interest rate

Can only called once per block

```
function addInterest() external returns (uint256 _interestEarned,
uint256 _feesAmount, uint256 _feesShare, uint64 _newRate)
```
```
Return Type Description
```
```
_interestEarned uint256 The amount of interestaccrued by all borrowers
```
```
_feesAmount uint256
_feesShare uint256
```
```
_newRate uint64
```
```
function _addInterest() internal returns (uint256 _interestEarned,
uint256 _feesAmount, uint256 _feesShare, uint64 _newRate)
```
```
Return Type Description
```
```
_interestEarned uint256 The amount of interestaccrued by all borrowers
```
```
_feesAmount uint256
_feesShare uint256
```
```
_newRate uint64
```
###### _addInterest

###### UpdateExchangeRate


The UpdateExchangeRate event is emitted when the Collateral:Asset exchange rate is
updated

The updateExchangeRate function is the external implementation of
_updateExchangeRate.

This function is invoked at most once per block as these queries can be expensive

The _updateExchangeRate function retrieves the latest exchange rate. i.e how much
collateral to buy 1e18 asset.

This function is invoked at most once per block as these queries can be expensive

```
event UpdateExchangeRate(uint256 _rate)
```
```
Param Type Description
```
```
_rate uint256
```
```
The new rate given as the
amount of Collateral Token to
buy 1e18 Asset Token
```
```
function updateExchangeRate() external returns (uint256 _exchangeRate)
```
```
Return Type Description
```
```
_exchangeRate uint256 The new exchange rate
```
```
function _updateExchangeRate() internal returns (uint256 _exchangeRate)
```
###### updateExchangeRate

###### _updateExchangeRate


The _deposit function is the internal implementation for lending assets

Caller must invoke ERC20.approve on the Asset Token contract prior to calling function

The deposit function allows a user to Lend Assets by specifying the amount of Asset
Tokens to lend

Caller must invoke ERC20.approve on the Asset Token contract prior to calling function

```
Return Type Description
```
```
_exchangeRate uint256 The new exchange rate
```
```
function _deposit(struct VaultAccount _totalAsset, uint128 _amount,
uint128 _shares, address _receiver) internal
```
```
Param Type Description
```
```
_totalAsset struct VaultAccount
```
```
An in memory VaultAccount
struct representing the total
amounts and shares for the
Asset Token
```
```
_amount uint128 The amount of Asset Token tobe transferred
```
```
_shares uint128 The amount of Asset Shares(fTokens) to be minted
```
```
_receiver address The address to receive theAsset Shares (fTokens)
```
```
function deposit(uint256 _amount, address _receiver) external returns
(uint256 _sharesReceived)
```
###### _deposit

###### deposit


The mint function allows a user to Lend assets by specifying the number of Assets
Shares (fTokens) to mint

Caller must invoke ERC20.approve on the Asset Token contract prior to calling function

```
Param Type Description
```
```
_amount uint256 The amount of Asset Token totransfer to Pair
```
```
_receiver address The address to receive theAsset Shares (fTokens)
```
```
Return Type Description
```
```
_sharesReceived uint256 The number of fTokensreceived for the deposit
```
```
function mint(uint256 _shares, address _receiver) external returns
(uint256 _amountReceived)
```
```
Param Type Description
```
```
_shares uint256
```
```
The number of Asset Shares
(fTokens) that a user wants to
mint
```
```
_receiver address The address to receive theAsset Shares (fTokens)
```
```
Return Type Description
```
```
_amountReceived uint256 The amount of Asset Tokenstransferred to the Pair
```
###### mint

###### _redeem


The _redeem function is an internal implementation which allows a Lender to pull their
Asset Tokens out of the Pair

Caller must invoke ERC20.approve on the Asset Token contract prior to calling function

The redeem function allows the caller to redeem their Asset Shares for Asset Tokens

```
function _redeem(struct VaultAccount _totalAsset, uint128
_amountToReturn, uint128 _shares, address _receiver, address _owner)
internal
```
```
Param Type Description
```
```
_totalAsset struct VaultAccount
```
```
An in-memory VaultAccount
struct which holds the total
amount of Asset Tokens and
the total number of Asset
Shares (fTokens)
```
```
_amountToReturn uint128 The number of Asset Tokensto return
```
```
_shares uint128 The number of Asset Shares(fTokens) to burn
```
```
_receiver address
```
```
The address to which the
Asset Tokens will be
transferred
```
```
_owner address The owner of the AssetShares (fTokens)
```
```
function redeem(uint256 _shares, address _receiver, address _owner)
external returns (uint256 _amountToReturn)
```
###### redeem


The withdraw function allows a user to redeem their Asset Shares for a specified
amount of Asset Tokens

```
Param Type Description
```
```
_shares uint256
```
```
The number of Asset Shares
(fTokens) to burn for Asset
Tokens
```
```
_receiver address
```
```
The address to which the
Asset Tokens will be
transferred
```
```
_owner address The owner of the AssetShares (fTokens)
```
```
Return Type Description
```
```
_amountToReturn uint256 The amount of Asset Tokensto be transferred
```
```
function withdraw(uint256 _amount, address _receiver, address _owner)
external returns (uint256 _shares)
```
```
Param Type Description
```
```
_amount uint256
```
```
The amount of Asset Tokens
to be transferred in exchange
for burning Asset Shares
```
```
_receiver address
```
```
The address to which the
Asset Tokens will be
transferred
```
```
_owner address The owner of the AssetShares (fTokens)
```
###### withdraw


The BorrowAsset event is emitted when a borrower increases their position

The _borrowAsset function is the internal implementation for borrowing assets

```
Return Type Description
```
```
_shares uint256 The number of Asset Shares(fTokens) burned
```
```
event BorrowAsset(address _borrower, address _receiver, uint256
_borrowAmount, uint256 _sharesAdded)
```
```
Param Type Description
```
```
_borrower address The borrower whose accountwas debited
```
```
_receiver address
```
```
The address to which the
Asset Tokens were
transferred
```
```
_borrowAmount uint256 The amount of Asset Tokenstransferred
```
```
_sharesAdded uint256 The number of Borrow Sharesthe borrower was debited
```
```
function _borrowAsset(uint128 _borrowAmount, address _receiver)
internal returns (uint256 _sharesAdded)
```
###### BorrowAsset

###### _borrowAsset


The borrowAsset function allows a user to open/increase a borrow position

Borrower must call ERC20.approve on the Collateral Token contract if applicable

```
Param Type Description
```
```
_borrowAmount uint128 The amount of the AssetToken to borrow
```
```
_receiver address The address to receive theAsset Tokens
```
```
Return Type Description
```
```
_sharesAdded uint256
```
```
The amount of borrow shares
the msg.sender will be
debited
```
```
function borrowAsset(uint256 _borrowAmount, uint256 _collateralAmount,
address _receiver) external returns (uint256 _shares)
```
```
Param Type Description
```
```
_borrowAmount uint256 The amount of Asset Token toborrow
```
```
_collateralAmount uint256 The amount of CollateralToken to transfer to Pair
```
```
_receiver address The address which willreceive the Asset Tokens
```
```
Return Type Description
```
```
_shares uint256
```
```
The number of borrow Shares
the msg.sender will be
debited
```
###### borrowAsset


The _addCollateral function is an internal implementation for adding collateral to a
borrowers position

The addCollateral function allows the caller to add Collateral Token to a borrowers
position

msg.sender must call ERC20.approve() on the Collateral Token contract prior to
invocation

```
function _addCollateral(address _sender, uint256 _collateralAmount,
address _borrower) internal
```
```
Param Type Description
```
```
_sender address The source of funds for thenew collateral
```
```
_collateralAmount uint256 The amount of CollateralToken to be transferred
```
```
_borrower address
```
```
The borrower account for
which the collateral should be
credited
```
```
function addCollateral(uint256 _collateralAmount, address _borrower)
external
```
```
Param Type Description
```
```
_collateralAmount uint256
```
```
The amount of Collateral
Token to be added to
borrower's position
```
```
_borrower address The account to be credited
```
###### _addCollateral

###### addCollateral


The RemoveCollateral event is emitted when collateral is removed from a borrower's
position

The _removeCollateral function is the internal implementation for removing collateral
from a borrower's position

```
event RemoveCollateral(address _sender, uint256 _collateralAmount,
address _receiver, address _borrower)
```
```
Param Type Description
```
```
_sender address The account from whichfunds are transferred
```
```
_collateralAmount uint256 The amount of CollateralToken to be transferred
```
```
_receiver address
```
```
The address to which
Collateral Tokens will be
transferred
_borrower address
```
```
function _removeCollateral(uint256 _collateralAmount, address
_receiver, address _borrower) internal
```
###### RemoveCollateral

###### _removeCollateral


The removeCollateral function is used to remove collateral from msg.sender's borrow
position

msg.sender must be solvent after invocation or transaction will revert

The RepayAsset event is emitted whenever a debt position is repaid

```
Param Type Description
```
```
_collateralAmount uint256
```
```
The amount of Collateral
Token to remove from the
borrower's position
```
```
_receiver address The address to receive theCollateral Token transferred
```
```
_borrower address
```
```
The borrower whose account
will be debited the Collateral
amount
```
```
function removeCollateral(uint256 _collateralAmount, address _receiver)
external
```
```
Param Type Description
```
```
_collateralAmount uint256 The amount of CollateralToken to transfer
```
```
_receiver address The address to receive thetransferred funds
```
```
event RepayAsset(address _sender, address _borrower, uint256
_amountToRepay, uint256 _shares)
```
###### removeCollateral

###### RepayAsset


The _repayAsset function is the internal implementation for repaying a borrow position

The payer must have called ERC20.approve() on the Asset Token contract prior to
invocation

```
Param Type Description
```
```
_sender address The msg.sender of thetransaction
```
```
_borrower address The borrower whose accountwill be credited
```
```
_amountToRepay uint256 The amount of Asset token tobe transferred
```
```
_shares uint256
```
```
The amount of Borrow Shares
which will be debited from the
borrower after repayment
```
```
function _repayAsset(struct VaultAccount _totalBorrow, uint128
_amountToRepay, uint128 _shares, address _payer, address _borrower)
internal
```
###### _repayAsset


The repayAsset function allows the caller to pay down the debt for a given borrower.

Caller must first invoke ERC20.approve() for the Asset Token contract

```
Param Type Description
```
```
_totalBorrow struct VaultAccount
```
```
An in memory copy of the
totalBorrow VaultAccount
struct
```
```
_amountToRepay uint128 The amount of Asset Token totransfer
```
```
_shares uint128 The number of Borrow Sharesthe sender is repaying
```
```
_payer address The address from whichfunds will be transferred
```
```
_borrower address The borrower account whichwill be credited
```
```
function repayAsset(uint256 _shares, address _borrower) external
returns (uint256 _amountToRepay)
```
```
Param Type Description
```
```
_shares uint256
```
```
The number of Borrow Shares
which will be repaid by the
call
```
```
_borrower address The account for which thedebt will be reduced
```
###### repayAsset


The Liquidate event is emitted when a liquidation occurs

The liquidate function allows a third party to repay a borrower's debt if they have
become insolvent

Caller must invoke ERC20.approve on the Asset Token contract prior to calling
Liquidate()

```
Return Type Description
```
```
_amountToRepay uint256
```
```
The amount of Asset Tokens
which were transferred in
order to repay the Borrow
Shares
```
```
event Liquidate(address _borrower, uint256 _collateralForLiquidator,
uint256 _shares)
```
```
Param Type Description
```
```
_borrower address The borrower account forwhich the liquidation occured
```
```
_collateralForLiquidator uint256
```
```
The amount of Collateral
Token transferred to the
liquidator
```
```
_shares uint256
```
```
The number of Borrow Shares
the liquidator repaid on behalf
of the borrower
```
```
function liquidate(uint256 _shares, address _borrower) external returns
(uint256 _collateralForLiquidator)
```
###### Liquidate

###### liquidate


The LeveragedPosition event is emitted when a borrower takes out a new leveraged
position

```
Param Type Description
```
```
_shares uint256 The number of Borrow Sharesrepaid by the liquidator
```
```
_borrower address
```
```
The account for which the
repayment is credited and
from whom collateral will be
taken
```
```
Return Type Description
```
```
_collateralForLiquidator uint256
```
```
The amount of Collateral
Token transferred to the
liquidator
```
```
event LeveragedPosition(address _borrower, address _swapperAddress,
uint256 _borrowAmount, uint256 _borrowShares, uint256
_initialCollateralAmount, uint256 _amountCollateralOut)
```
###### LeveragedPosition


The leveragedPosition function allows a user to enter a leveraged borrow position
with minimal upfront Collateral

Caller must invoke ERC20.approve() on the Collateral Token contract prior to calling
function

```
Param Type Description
```
```
_borrower address The account for which thedebt is debited
```
```
_swapperAddress address
```
```
The address of the swapper
which conforms the
FraxSwap interface
```
```
_borrowAmount uint256 The amount of Asset Token tobe borrowed to be borrowed
```
```
_borrowShares uint256 The number of Borrow Sharesthe borrower is credited
```
```
_initialCollateralAmount uint256
```
```
The amount of initial
Collateral Tokens supplied by
the borrower
```
```
_amountCollateralOut uint256
```
```
The amount of Collateral
Token which was received for
the Asset Tokens
```
```
function leveragedPosition(address _swapperAddress, uint256
_borrowAmount, uint256 _initialCollateralAmount, uint256
_amountCollateralOutMin, address[] _path) external returns (uint256
_totalCollateralBalance)
```
###### leveragedPosition


The RepayAssetWithCollateral event is emitted whenever
repayAssetWithCollateral() is invoked

```
Param Type Description
```
```
_swapperAddress address
```
```
The address of the
whitelisted swapper to use to
swap borrowed Asset Tokens
for Collateral Tokens
```
```
_borrowAmount uint256 The amount of Asset Tokensborrowed
```
```
_initialCollateralAmount uint256
```
```
The initial amount of
Collateral Tokens supplied by
the borrower
```
```
_amountCollateralOutMin uint256
```
```
The minimum amount of
Collateral Tokens to be
received in exchange for the
borrowed Asset Tokens
```
```
_path address[]
```
```
An array containing the
addresses of ERC20 tokens to
swap. Adheres to UniV2 style
path params.
```
```
Return Type Description
```
```
_totalCollateralBalance uint256
```
```
The total amount of Collateral
Tokens added to a users
account (initial + swap)
```
```
event RepayAssetWithCollateral(address _borrower, address
_swapperAddress, uint256 _collateralToSwap, uint256 _amountAssetOut,
uint256 _sharesRepaid)
```
###### RepayAssetWithCollateral


The repayAssetWithCollateral function allows a borrower to repay their debt using
existing collateral in contract

```
Param Type Description
```
```
_borrower address
```
```
The borrower account for
which the repayment is taking
place
```
```
_swapperAddress address
```
```
The address of the
whitelisted swapper to use for
token swaps
```
```
_collateralToSwap uint256
```
```
The amount of Collateral
Token to swap and use for
repayment
```
```
_amountAssetOut uint256 The amount of Asset Tokenwhich was repaid
```
```
_sharesRepaid uint256 The number of Borrow Shareswhich were repaid
```
```
function repayAssetWithCollateral(address _swapperAddress, uint256
_collateralToSwap, uint256 _amountAssetOutMin, address[] _path)
external returns (uint256 _amountAssetOut)
```
###### repayAssetWithCollateral


```
Param Type Description
```
_swapperAddress address

```
The address of the
whitelisted swapper to use for
token swaps
```
_collateralToSwap uint256

```
The amount of Collateral
Tokens to swap for Asset
Tokens
```
_amountAssetOutMin uint256

```
The minimum amount of
Asset Tokens to receive
during the swap
```
_path address[]

```
An array containing the
addresses of ERC20 tokens to
swap. Adheres to UniV2 style
path params.
```
```
Return Type Description
```
_amountAssetOut uint256

```
The amount of Asset Tokens
received for the Collateral
Tokens, the amount the
borrowers account was
credited
```

### Fraxlend Multisigs

```
Chain Name Address
```
```
Ethereum Comptroller 0x168200cF227D4543302686124ac28aE0eaf2cA0B
```
```
Ethereum Circuit Breaker 0xfd3065C629ee890Fd74F43b802c2fea4B7279B8c
```
```
Ethereum Operator 0xa4EC124e09D6D1A092c6BD16aFac9CD83f73E3c3
```

## Frax Ether


### Overview

Frax's liquid ETH staking derivative

Frax Ether is a liquid ETH staking derivative and stablecoin system designed to uniquely
leverage the Frax Finance ecosystem to maximize staking yield and smoothen the
Ethereum staking process for a simplified, secure, and DeFi-native way to earn interest on
ETH. In addition, frxETH is used as the gas token on the Fraxtal L2 chain. Lastly, 10% of
the income is retained, with 8% as a protocol fee for the benefit of the Frax Ecosystem
and FXS holders, and 2% for an insurance fund. The balance sheet & peg of frxETH to
ETH is independent of FRAX's $1 balance sheet & peg.

The Frax Ether system comprises three primary components, Frax Ether (frxETH), Staked
Frax Ether (sfrxETH), and the Frax ETH Minter:

```
1. frxETH acts as a stablecoin loosely pegged to ETH, leveraging Frax's winning
playbook on stablecoins and onboarding ETH into the Frax ecosystem. The frxETH
peg is defined as 1% of the exchange rate on each side 1.01 to .9900.
2. sfrxETH is the version of frxETH which accrues staking yield. All profit generated
from Frax Ether validators is distributed to sfrxETH holders. By exchanging frxETH for
sfrxETH, one becomes eligible for staking yield, which is redeemed upon converting
sfrxETH back to frxETH.
3. Frax ETH Minter ( frxETHMinter ) allows the exchange of ETH for frxETH, bringing
ETH into the Frax ecosystem, spinning up new validator nodes when able, and
minting new frxETH equal to the amount of ETH sent.
```
Solo ETH staking requires the technical knowledge and initial setup associated with
running a validator node, and also that deposits be made 32 ETH at a time. By opting to
use a liquid ETH staking derivative instead of staking ETH in another form, staking yield
can be accrued much more simply, abstracting the need to run validators, allowing yield
to be earned on any amount of ETH, allowing withdrawals at any time and of any size,
and allowing far greater composability throughout DeFi.

##### Summary

###### Liquid Staking


Per FIP-122 , the ETH staking income is distributed as follows:

```
1. sfrxETH Rewards [90%] : Rewarded to sfrxETH vault stakers in the form of frxETH.
This generates sfrxETH APY.
2. Protocol fee [8%]: Sent to Frax ecosystem contracts (like AMOs) for the eventual
benefit of FXS holders and FRAX peg backing.
3. Insurance fund [2%]: Covers potential slashing events/unforeseen penalties. Backs
frxETH deposits to effectively keep frxETH overcollateralized at over 100% CR to
cover any possible issues/losses.
```
###### Income Distribution

###### Flowchart

###### frxETH flywheel interview with Jack Corddry


###### Everything you need to know about FrxETH with Core Dev Jack CordEverything you need to know about FrxETH with Core Dev Jack Cord......


### frxETH and sfrxETH

ETH in the Frax ecosystem comes in two forms, frxETH (Frax Ether), and sfrxETH (Staked
Frax Ether).

frxETH acts as a stablecoin loosely pegged to ETH, so that 1 frxETH always represents 1
ETH and the amount of frxETH in circulation matches the amount of ETH in the Frax ETH
system. When ETH is sent to the frxETHMinter, an equivalent amount of frxETH is
minted. Holding frxETH on its own is not eligible for staking yield and should be thought
of as analogous as holding ETH. frxETH peg is defined as 1% on each side of 1.00
exchange rate meaning the frxETH peg is defended to keep the exchange rate between
1.01-.9900 ETH per 1 frxETH.

sfrxETH is a ERC-4626 vault designed to accrue the staking yield of the Frax ETH
validators. At any time, frxETH can be exchanged for sfrxETH by depositing it into the
sfrxETH vault, which allows users to earn staking yield on their frxETH. Over time, as
validators accrue staking yield, an equivalent amount of frxETH is minted and added to
the vault, allowing users to redeem their sfrxETH for a greater amount of frxETH than
they deposited.

```
frxETH
```
###### frxETH

###### sfrxETH


The exhange rate of frxETH per sfrxETH increases over time as staking rewards are
added to the vault. By holding sfrxETH you hold a % claim on an increasing amount of the
vault's frxETH, splitting staking rewards up among sfrxETH holders proportional to their
share of the total sfrxETH. This is similar to other autocompounding tokens like Aave's
aUSDC and Compound's cUSDC.

```
sfrxETH
```

### Technical Specifications

frxETH shares much of its code with both the Frax and FPI stablecoins, and implements
the ERC-2612 standard, allowing spender approvals to be made via ERC-712 signatures
passed to the permit() function.

sfrxETH is a ERC-4626 compliant vault. sfrxETH is obtained by first approving the
sfrxETH contract as a frxETH spender, and then calling mint() (mints a specific number of
sfrxETH) or deposit() (deposits a specific amount of frxETH). The approval step and the
minting step can be combined with depositWithSignature() or mintWithSignature(),
removing the need for two seperate transactions.

As validators generate staking yield, an equivalent amount of frxETH is minted and sent
to the sfrxETH contract. This means that once rewards are synced, one's sfrxETH may be
redeemed for a greater amount of frxETH than it took to mint.

To prevent malicious users from stealing a validator yield distribution to the vault, reward
distributions are smoothed over time cycles. Whenever syncRewards() is called on the
sfrxETH contract, any additional frxETH added to the contract over the contract's internal
balance is queued to be distributed linearly over the remainder of a cycle window.

sfrxETH is also ERC-2612 compliant, allowing the use of signature permits.

For real time information and monitoring of validators, see Frax Facts.

###### frxETH

###### sfrxETH

###### frxETHMinter


The frxETHMinter mints frxETH when it receives ETH either through the submit() or
receive() function. Whenever a submission pushes the minter balance over 32 ETH, the
contract pops a validator's deposit credentials off of a stack and passes the 32 eth
deposit along with the credentials to the ETH 2.0 deposit contract, automatically spinning
up a new validator.

As needed, new credentials are added to the stack to ensure that there are always
validators ready to take deposits. If at any time the contract runs out of validators, frxETH
will continue to be minted as normal (unless paused) but no new validators will be spun
up until more are added to the stack.

The withdrawal credential is shared by all the validators on the stack, meaning all
validators share the same withdrawal address. This address is set to the Frax treasury
contract at launch, so that withdrawals may be safely handled once live.

In addition, when adding validators it is necessary to pass the DepositDataRoot as
provided when generating the deposit data, this is to provide redundancy in ensuring a
validator with misinputted parameters will not be accepted when ETH is deposited.

The protocol may set a ratio of funds to withold when ETH is submitted. These funds are
not counted when gathering 32 ETH deposits to spin up validators and are instead used
to market make across DeFi, ensuring liquid markets for frxETH.

Each validator's public address and real time stats can be monitored at:
https://facts.frax.finance/frxeth/validators

Third party & community tracking of all of frxETH's validators can be found at:
https://www.rated.network/o/Frax?network=mainnet&timeWindow=1d

###### Frax in-House Validators


### Redemption

Mechanism for converting frxETH to ETH 1-to-1 without fees or slippage

The Frax Ether Protocol allows for frxETH holders to redeem their tokens for ETH using
the frxETH Redemption Queue Contract. Since frxETH is collateralized by ETH that are
staked in validator nodes, these validators are then ejected to service 1-to-1 redemptions
of frxETH for ETH through the redemption contract. Users who opt to redeem their
frxETH rather than swap on secondary markets (such as AMMs like Curve) can at any
time send their frxETH to the redemption contract for a redemption NFT. This NFT
reserves their place in the queue and shows their redemption duration through a
timestamp. Once the timestamp is reached, the NFT holder can call a function to swap
their NFT for the exact amount of ETH as their redeemed frxETH (without fees or
slippage). The redemption process is meant to safeguard against frontrunning, MEV, and
other arbtriage externalities by guaranteeing users who have redeemed (ie: who hold the
redemption NFT) their fair spot in the queue line.

##### Summary

###### frxETH Redemption Queue


The frxETH redemption queue is a specific waiting time system that redeemers must wait
through to receive ETH for their frxETH. The frxETH redemption queue waiting time is
calculated as: posEntryQueue+posExitQueue+deltaFactor. This means that the time
required to wait to receive ETH is the total time of both entry and exit queue at the time of
initiation and an additional amount set by governance so that node operators have a
small amount of time to make preparations to eject.

The queue is the sum duration of the Ethereum proof of stake entry and exit queues due
to the fact that users staking sfrxETH do not bear any cost of waiting (unlike ETH stakers
who must wait the entry queue). Therefore, if the Frax Ether system has no entry queue
on receiving staking income, then the entry queue must be accounted for on exit by
redeemers. Redeemers must wait the sum total of both entry and exit queues in order to
redeem their frxETH for ETH. Otherwise, the system could be vulnerable to griefing
attacks where users enter into sfrxETH during periods of long entry queue times, then
specifically redeem for ETH during times when the proof of stake exit queue is long. In
order to avoid this attack vector, the frxETH redemption system forces redeemers to wait
the summation of both queues and a delta factor.

**FraxEtherRedemptionQueue:** 0x82bA8da44Cd5261762e629dd5c605b17715727bd

```
Complete transaction flow through the frxETH redemption system.
```

### frxETH V2

V2 of Frax Ether (frxETH)

frxETH V2 allows the possibility for anonymous / external validators to enter the frxETH
system. All of their ETH staking rewards will flow directly to a ValidatorPool smart
contract under their control and thus no frxETH will be minted for them. They will
however receive credit which can be used to borrow ETH that entered through the V1
mint mechanism. The collateral for this borrowing is an escrowed exit message, which
can be executed by the frxETH protocol if their borrow position becomes unhealthy. The
exited funds only go to the ValidatorPool and become "trapped" their until all loans are
paid off.

The amount of credit per 32 ETH deposited will depend on the validator operator pool.
Anonymous pools will only receive 24 ETH borrow credit per 32 ETH. Known / community
whitelisted pools can receive up to 31 ETH per 32 ETH deposited. Borrowed ETH can be
used to spin up additional validators, or alternatively, withdrawn out of the system for
other use by the borrower. An offchain bot, the Beacon Oracle, will constantly monitor the
health of all validators / validator pools and execute exit message(s) if a liquidation
scenario occurs. Additionally, the interest rate will increase if ETH becomes scarce from
redemptions, heavy borrowing, or both.

The frxETH protocol will earn income both from investing idle ETH (Curve AMOs) as well
as receiving interest from validator pool borrow activity. Existing V1 Frax-operated
validators will also earn yield from ETH staking.

##### Summary

###### Example borrow


In this example, if you only put in 320E and nothing else, you can "control" 1248E which is
3.9x. Your LTV is (borrowed ETH) / (total ETH in validators). The LTV is denominated in
ETH, so the market price of ETH does not matter. Larger initial amounts will converge to
4x. Max leverage (for 24E per 32E credit) is 32E / (32E - 24E) = 32E / 8E = 4x. Doing 12
rounds as in the example above however would put you dangerously close to the LTV
limit and you risk some of your validators being force exited back to the validator pool
contract and having the Beacon Oracle bot force repay part of the loan from there. You
will also have to pay interest on 928E worth of borrow.

If you became whitelisted to say, 28E per 32E, the max effective leverage would be 8x and
the max LTV would be 28/32 = 87.5%. This can only be done on a case-by-case basis via
a governance vote.

```
Example borrow chart for a 320E initial supply by the user. Assuming 24E credit per validator.
```

### frxETH V2 Technical Details

Smart contract and other details

Validators are monitored, and their exit messages stored, offchain. The Beacon Oracle
service/bot will trigger validator exits if borrow positions become unhealthy and/or
validators get slashed. It also monitors ValidatorPool deposits, repays, withdrawals, etc
and calculates how much borrow credit said pools should have.

##### Overview Flowchart

##### Beacon Oracle


Unused ETH can wind up here and be invested into various Convex farms to earn yield
passively. When the ETH is needed again, either for borrowing or for frxETH -> ETH
redemptions, the farming LP can be unwound back into ETH and sent away. Operated by
the Protocol.

Serves as a "middleman" contract for ETH flows. ETH from frxETH minting goes here.
When ETH is needed for borrowing, it is sent to a ValidatorPool via the LendingPool.
When ETH is needed for redemptions, it is sent to the RedemptionQueue. Unused ETH
can temporarily be invested in the Curve AMO to earn yield, then be unwound when it is
needed again. Profits from ValidatorPool interest payments also collect here.

getConsolidatedEthFrxEthBalance: Looks in various places for ETH and
frxETH/sfrxETH in various forms, either free or in LPs. This information is primarily used
for utilization calculations.

requestEther: LendingPool calls this when someone borrows, and RedemptionQueue
when someone is redeeming. The function first looks for idle ETH in the EtherRouter, then
idle ETH in Curve AMOs, then LP'd ETH in the CurveAMOs.

sweepEther: Operator can periodically sweep idle accumulated ETH into the Curve AMO
and subsequent LPs so it can passively earn yield. These LP operations are gassy and
hence, this operation is bot-called vs called whenever a normal user interacts
(borrow/repay/mint frxETH/etc).

##### Curve AMO

##### Ether Router

###### Key Functions

##### FraxEtherMinter


Takes ETH and mints frxETH. The collected ETH flows to the Ether Router to be used for
lending, passive income, or frxETH redemption requests.

mintFrxEth / mintFrxEthAndGive: Takes in ETH and gives frxETH to the sender or the
specified recipient.

submitAndDeposit: Takes in ETH, converts it to frxETH, then deposits that to generate
sfrxETH. Generated sfrxETH sent to the specified recipient.

ValidatorPool partial deposits, borrows, liquidations, and repays go through here.
BeaconOracle sets credit/allowances, validator count, etc.

addInterest / addInterestPrivileged: Manually accrue interest. Called inline in
many other functions.

currentRateInfo: Gets the interest ratePerSec and fullUtilizationRate, which
can be used to calculate the borrow APR as follows:

```
getUtilization: Gets the current utilization of the ETH in the system.
```
setValidatorApprovals: Beacon Oracle bot approves validators for given validator
pools.

setVPoolCreditsPerValidator: Beacon Oracle bot sets the number of credits a
validator pool would get per validator deposited.

##### BorrowAPR = ratePerSec ∗ oneYearInSecs ∗ 100

###### Key Functions

##### Lending Pool

###### Key Functions


setVPoolValidatorCountsAndBorrowAllowances: Beacon Oracle bot adjusts validator
count and borrow allowances for given validator pools

wouldBeSolvent: Used to test if adding validators and/or a borrow amount to a given
validator pool would make it insolvent.

Users deposit their frxETH and, after a waiting period (varies depending on average
Beacon Chain exit queue length), can collect ETH 1:1. After they deposit, they receive a
redemption "ticket" NFT that is freely transferable. Their time of entry is marked in the
NFT so earlier redeemers have preference over later redeemers if there is an ETH
shortage (first come, first served). Due to this change, users will NOT have the option to
exit the NFT early for a penalty as they could do in frxETH V1. After the wait, they can
burn the redemption ticket NFT and receive back ETH 1:1 to frxETH.

canRedeem: Whether a FrxETHRedemptionTicket NFT and a specified amount of ETH
can be redeemed. Depends if the NFT reached maturity and if ETH is available, partially
or fully. If there is an ETH shortage, earlier NFTs will have redemption preference over
later NFTs, even if both are time-eligible for redemption.

ethShortageOrSurplus: Information as to whether the Redemption Queue has enough
ETH to service all outstanding redemption tickets.

enterRedemptionQueue / enterRedemptionQueueWithPermit /
enterRedemptionQueueWithSfrxEthPermit / enterRedemptionQueueViaSfrxEth:
Enter the Redemption Queue with either frxETH or sfrxETH, with/without permit. Will
receive a FrxETHRedemptionTicket NFT after completion.

fullRedeemNft / partialRedeemNft: Fully / Partially redeem a
FrxETHRedemptionTicket NFT for ETH. NFT must have reached maturity. Will revert if
there is not enough ETH, or there is, but it is earmarked for earlier NFTs.

##### RedemptionQueue

###### Key Functions


Users will need to be able to manage their ValidatorPool (VP). VP contracts are factory
generated by the LendingPool contract and deployed by the user. Users deposit their own
ETH in the VP, along with the public keys, signatures, and deposit data roots for their
validators. All ETH2 staking rewards and exited ETH get sent back to the VP address.
MEV can technically go elsewhere (we can't control that). Escrowed exit messages serve
as the "collateral" for the system; the exited ETH returns to the VP and is trapped there
until all outstanding loans are paid.

deposit: Payable function that takes the validator public key, signature, deposit data
roots, and msg.value ETH, and deposits it into the ETH2 deposit contract. Integer
multiples of 1 ETH between 1 ETH and 32 ETH. If they deposit less than 32 ETH and have
the allowance for it, they can borrow the remainder to complete the 32 ETH validator
deposit. Users will also have to independently submit the secret exit message to an API
endpoint for safe storage before they can receive borrow credit. After reciept,
BeaconOracle bot will grant the VP borrowing credit.

requestFinalDeposit: Completes a 32 ETH deposit to spin up a validator, borrowing
any remainder from the protocol in order to do so. For anonymous validators, 24 ETH of
borrowing credit is given per 32 ETH deposited. There is an ability in the future for
qualified and vetted projects to have more credit, perhaps as high as 31 ETH per 32 ETH
deposited. This credit/allowance tracked off-chain to make sure the validator is
legitimate, the exit message is escrowed, and the user is otherwise healthy. A bot
(BeaconOracle) then periodically updates the allowance amounts on-chain.

A special case for the 1st deposit for a given validator pool requires only 8 ETH by the
user, with the rest being supplied by the protocol. This is safe for the protocol because
the escrowed exit message is still required and if the validator is slashed, there is 8 ETH
of buffer before the protocol itself takes a loss.

borrow: If the validator pool has the allowance, borrows ETH from the LendingPool,
which can then be used for spinning up more validators if desired.

##### Validator Pool

###### Key Functions


repayWithValue: Payable function that repays the msg.value amount of ETH for the
validator pool's loan. Use's sender's ETH. Callable only by the VP owner or the
LendingPool (in the case of a liquidation)

repayAmount: Repays the specified amount of ETH for the validator pool's loan. Uses
the validator pool's own ETH. Callable only by the VP owner or the LendingPool (in the
case of a liquidation).

```
repayShares: Same as repayAmount but uses lending shares instead.
```
withdraw: Withdraw specified amount of ETH from the ValidatorPool to the intended
recipient. Must pay ALL outstanding loans first. Will be unable to reuse the ValidatorPool
contract until the BeaconOracle bot catches up and registers the withdrawal.

Interest rate math for the ETH borrowing in the LendingPool. Uses same rationale / logic
as Fraxlend's Variable Interest Rate.

##### VariableInterestRate


### frxETH Code & V2 Addresses

Same as V1.

```
GitHub - FraxFinance/frxETH-v2-public: The 2nd iteration of Frax Ether
GitHub
```
```
Name Address (ETH Mainnet)
```
```
BeaconOracle 0xA2901F3EE8f4E9F5baC5379BC0CD1F8341280AB5
```
```
CurveLsdAmo 0xEcb9bBb97BD3C23e8f176075EDB3c68B9a1869Ae
```
```
CurveLsdAmoHelper 0x823F92b5fF0062EDc20F0545ec88f2f3c273cCbd
```
```
EtherRouter 0x5acAf61d339dd123e60ba450Ea38fbC49445007C
```
```
FraxEtherMinter (V2) 0x7Bc6bad540453360F744666D625fec0ee1320cA3
```
```
FraxEtherRedemptionQueueV2 0xfDC69e6BE352BD5644C438302DE4E311AAD5565b
```
```
LendingPool 0x24A1d1671a3Bd1C3cABb9B10724a4127d84e1Da0
```
```
VariableInterestRate 0x2fA48925696EbBF1F4Fc08228dA06021f18 06544
```
##### Code

##### frxETH / sfrxETH ERC20s

##### Contracts


### frxETH and sfrxETH Token Addresses

##### frxETH


```
Chain Address
```
Arbitrum 0x178412e79c25968a32e89b11f63B33F733770c2A

Base (LayerZero) 0xF010a7c8877043681D59AD125EbF575633 505942

Blast (LayerZero) 0xF010a7c8877043681D59AD125EbF575633 505942

BSC 0x64048A7eEcF3a2F1BA9e144aAc3D7dB6e58F555e

Ethereum (native) 0x5e8422345238f34275888049021821e8e08caa1f

Ethereum (LayerZero) 0xF010a7c8877043681D59AD125EbF575633 505942

Fantom 0x9E73F99EE061C8807F69f9c6CCc44ea3d8c373ee

Fraxtal (as wfrxETH)

```
As frxETH is the gas token, wfrxETH is the
WETH equivalent
wfrxETH:
0xfc000000000000000000000000000000000
00006
```
Fraxtal (LayerZero) 0x43eDD7f3831b08FE70B7555ddD373C8bF65a9050

Metis (LayerZero) 0xF010a7c8877043681D59AD125EbF575633 505942

Mode (LayerZero) 0x43eDD7f3831b08FE70B7555ddD373C8bF65a9050

Moonbeam 0x82bbd1b6f6De2B7bb63D3e1546e6b1553508BE99

Optimism 0x6806411765Af15Bddd26f8f544A34cC40cb9838B

Polygon 0xEe327F889d5947c1dc1934Bb208a1E792F953E96


```
Sei (LayerZero) 0x43eDD7f3831b08FE70B7555ddD373C8bF65a9050
```
```
X-Layer (Layer-Zero) 0x43eDD7f3831b08FE70B7555ddD373C8bF65a9050
```
##### sfrxETH


```
Chain Address
```
Arbitrum 0x95aB45875cFFdba1E5f451B950bC2E42c0053f39

Base (LayerZero) 0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A

Blast (LayerZero) 0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A

BSC 0x3Cd55356433C89E50DC51aB07EE0fa0A95623D53

Ethereum (native) 0xac3E018457B222d93114458476f3E3416Abbe38F

Ethereum (LayerZero) 0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A

Fantom 0xb90CCD563918fF900928dc529aA01046795ccb4A

Fraxtal (native) 0xFC000000000000000000000000000000000 00005

Fraxtal (LayerZero) 0x3ec3849c33291a9ef4c5db86de593eb4a37fde45

Metis (LayerZero) 0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A

Mode (LayerZero) 0x3ec3849c33291a9ef4c5db86de593eb4a37fde45

Moonbeam 0xecf91116348aF1cfFe335e9807f0051332BE128D

Optimism 0x484c2D6e3cDd945a8B2DF735e079178C1036578c

Polygon 0x6d1FdBB266fCc09A16a22016369210A15bb 95761

Sei (LayerZero) 0x3ec3849c33291a9ef4c5db86de593eb4a37fde45


X-Layer (LayerZero) 0x3ec3849c33291a9ef4c5db86de593eb4a37fde45


### frxETH Multisigs

```
Chain Name Address
```
```
Ethereum Comptroller 0x8306300ffd616049FD7e4b0354a64Da835c1A81C
```

## BAMM


### Overview

(Borrow-AMM)

The BAMM is a borrowing/lending module built on top of Fraxswap. Unlike other
borrowing lending modules, the BAMM does not need an outside oracle or external
liquidity to function safely. This is because the needed liquidity is provided by the lenders.
With the BAMM we can create borrowing lending services for pairs that were previously
impossible, because they did not have a solid oracles or sufficient liquidity. Borrowers
rent liquidity provided by lenders to automatically leverage up and down, such that they
can stay solvent even in the case of high volatility. This means borrowers can not
experience sudden liquidations, so there is also no need to pay high liquidation fees to
liquidators, creating a better deal for both borrowers and lenders. Each BAMM pool is
build on top of a single Fraxswap pool that holds two tokens. Borrowers can safely long
and short each token without fear of sudden liquidation.

##### Summary


**Lenders**

Lenders lend their full range liquidity LP tokens from Fraxswap to the BAMM lending pool.
The amount lent is calculated used the following formula: sqrt(X×Y) / LP total supply.
Where X and Y are the number of the two tokens in the pool. Lenders earn trading fees
from Fraxswap and interest rate from borrowers that rent their liquidity.

```
Chart - 1 : BAMM Protocol Action Flow
```

**Borrowers**

Each borrower has its own vault where they put in their collateral, rent liquidity from the
liquidity pool and withdraw tokens. Rented liquidity LP tokens are burned when rented
and the underlying tokens are put in the users vault to act as collateral. The user can also
withdraw tokens from their vault, but they must remain solvent. A user is solvent when
the rented liquidity amount is less than 98% of the sqrt(X×Y) of their vault. Note that for
both the amount of the rented LP and the assets in the vault, the sqrt(X×Y) is used to
calculate solvency. These values are unchanged when there are price movements, so the
borrower can not get insolvent when prices change. The borrowers debt, denominated in
sqrt(XxY), slowly increases over time due to interest rate payments, so borrowers should
periodically check their position to avoid liquidation. The interest rate for the rented
liquidity is calculated using a dynamic interest rate model that is used in Fraxlend as well.

```
Chart - 2 : BAMM Protocol Lender's Action Flow
```

Chart - 3 : BAMM Protocol Borrower's Action Flow


## Frax Oracle


### Frax Oracle Overview

Oracles for Frax assets that use onchain prices and provide the same interface as
Chainlink oracles

To increase the velocity of adoption of our assets in lending protocols, AMMs, and vault
products. We believe that oracles using onchain prices sources are the most reliable and
verifiable.

```
Frax Oracles on L1
```
##### Motivation

##### Major Components


The Dual Oracle / Price Source contract gets two prices (high and low) from two different
onchain sources and returns them both. This contract then writes the prices to the Frax
Oracle contract. These contracts are largely inspired by Fraxlend Dual Oracles.

Anyone can call the addRoundData() function on the Dual Oracle to add a fresh price to a
Frax Oracle. They just need to pay gas. The Frax Protocol calls this function once per day
per supported asset.

Only the Dual Oracle contract for the proper asset can write prices to a corresponding
Frax Oracle. The Frax Oracle stores prices that can be retrieved in the Chainlink style with
AggregatorV3Interface or in the Fraxlend getPrices() style.

When interacting with a Frax Oracle through the Chainlink style, the price data will be the
average of the low price and high price. When using the Fraxlend getPrices() style, the
low and high price will both be given.

Prices will be considered bad / stale if an underlying Chainlink oracle signals a price is
bad, or if a price is too old.

Frax Oracle prices can be consumed identically to Chainlink oracles.

All onchain price sources have deep Frax protocol owned liquidity that we will not
remove, which provides a high degree of safety.

###### Dual Oracle / Price Source

###### Frax Oracle

##### Key Takeaways


### How It Works

See https://docs.chain.link/data-feeds/api-reference#aggregatorv3interface for
documentation on the Chainlink Oracle interface.

Currently frxEth/ETH and sfrxEth/ETH are supported.

The frxEth price is determined from two onchain price sources. The first price source is
the frxEth / ETH Curve pool EMA Oracle -
0xa1f8a6807c402e4a15ef4eba36528a3fed24e577. This price is bounded to be 0.7 at
the lowest (0.7 frxEth = 1 ETH) and 1 at the highest (1 frxEth = 1 ETH).

The second price source comes from the Uniswap frxEth / FRAX pool TWAP oracle -
0x36C060Cc4b088c830a561E959A679A58205D3F56. We then retrieve the price of
ETH in USD from this chainlink oracle
(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419 ) and the price of FRAX in USD
from this chainlink oracle (0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD ). These
chainlink prices are used to convert the frxEth / FRAX pool price into a frxEth / ETH price
using the following equation:

```
ethPerFrxEth = (fraxPerFrxEthUniswapTwap * usdPerFraxChainlink) /
usdPerEthChainlink;
```
##### Prior Work

##### Supported Frax Assets

##### Frax Dual Oracle Price Logic

###### frxEth


This price from Uniswap is similarly bounded between 0.7 and 1, mirroring the Curve
price.

The lower of these prices is returned as priceLow and the higher is returned as priceHigh.
These prices are then written to the frxEth / ETH Frax Oracle.

Simply retrieves the pricePerShare() from the sfrxEth contract, retrieves the priceHigh and
priceLow in the same manner as the frxEth Dual Oracle outlined above, and returns the
following equation:

This works because pricePerShare() returns how many frxEth a single sfrxEth is worth.
pricePerShare() goes up over time.

These prices are then written to the sfrxEth / ETH Frax Oracle.

Simply call https://docs.chain.link/data-feeds/api-reference#getrounddata or
https://docs.chain.link/data-feeds/api-reference#latestrounddata on the Frax Oracle
contract for the asset you want the price of.

Coming soon

```
priceLow = (SFRXETH_ERC4626.pricePerShare() * frxEthEthPriceLow) /
1e18;
priceHigh = (SFRXETH_ERC4626.pricePerShare() * frxEthEthPriceHigh) /
1e18;
```
###### sfrxEth

##### How to use with Chainlink Interface - AggregatorV3Interface

##### Frax Oracle on L2


### Advanced Concepts

Since the Frax protocol only updates Frax Oracle prices once per day, the price may be up
to 23 hours and 59 minutes old. If you need a fresher price, you can call addRoundData()
on the Dual Oracle to write a fresh price, and then call latestRoundData() /
getRoundData() / getPrice() on the Frax Oracle to retrieve the fresh price.

Controls all configurations for all Frax Oracles on L1:
0x8412ebf45bAC1B340BbE8F318b928C466c4E39CA

Controls all configurations for all Frax Oracles on Arbitrum:
0xB426B13372B7c967C4a2371B5e95FC7dc37545Db

```
L1 -> L2
```
##### Getting a Fresh Price

##### Smart Contract Design

##### Timelock Configuration

##### Attacks and Mitigations


Oracle manipulation attacks are handled economically. There is too much protocol owned
liquidity for manipulating the Curve / Uniswap pools to be profitable.

Bounding prices ensures that frxEth/sfrxEth will never be overvalued and will never be
undervalued by more than 30%. frxEth is fully backed with ETH in validators, so the only
risk that exists with it is time duration risk.

FrxEthEthDualOracle: 0x350a9841956D8B0212EAdF5E14a449CA85FAE1C0

SfrxEthEthDualOracle: 0x584902BCe4282003E420Cf5b7ae5063D6C1c182a

SfrxEthFraxOracle: 0x3d3D868522b5a4035ADcb67BF0846D61597A6a6F

ArbitrumBlockHashRelay: 0x784906554d44d33c2764c86e8848a2bd71c2e3a7

ArbitrumBlockHashProvider: 0x240ff0894c584d39f992de5fdb603e03fc7e8a98

StateRootOracle: 0x11afa1d35f246fdc00d789e4a06f682b206f88c9

MerkleProofPriceSource: 0xb032b46f835fa9e3d95d1e3f46fd307429505f9a

##### Contract Addresses

###### L1

**Dual Oracles / Price Sources**

**Frax Oracles**

**Crosschain**

###### L2 (Arbitrum)

**Price Source**


**Dual Oracles / Price Sources**

FrxEthEthDualOracle: TBD

SfrxEthEthDualOracle: TBD

SfrxEthFraxOracle: TBD

**Frax Oracles**


### Fraxtal Merkle Proof Oracles

Fraxtal Merkle Oracles (Fraxtal-MOs) are a class of oracles that utilize the
eth_getProof rpc method to proof L1 State on Ethereum L2s such as Fraxtal.

Fraxtal-MOs utilize 4 Key contracts in order to verify and transport state.

**FraxchainL1Block**

Predeploy contract which serves as a registry of L1 block hashes on the L2.

**StateRootOracle**

Contract which verifies a given blockheader against the L1 Blockhash relayed via the
FraxchainL1Block contract. This contract is responsible for storing the stateroot hash
as well as the L1 timestamp.

**MerkleProofPriceSource**

Contract which performs the state root verification. Given a merkle proof, constructed off
chain via the eth_getProof rpc method. This contract will verify the and extract the
storage slot values "proofed" onto the L2 blockchain. These "proofed" values are then
relayed to the oracle itself.

The process of relaying these "proofed" values is trustless in the sense that anyone may
submit a valid merkle proof corresponding to the pre-approved slots for a given Ethereum
L1 address.

**FraxtalERC4626TransportOracle**

Contract which accepts "proofed" L1 data from the MerkleProofPriceSoure contract.

In the case of sFrax and other ERC4626 vaults. These "proofed" values define the
current slope of the value accrual function of the vault token on the L1.

**Overview**


These oracles expose the following funtions in order to allow the user to query the price
of the asset in question:

The Process of transporting/proving the L1 data onto the L2:

Step 1: Prove the L1 blockHeader on the L2

```
/// @dev Adheres to chainlink's AggregatorV3Interface
`latestRoundData()`
/// @return _roundId The l1Block corresponding to the last time the
oracle was proofed
/// @return _answer The price of Sfrax in frax
/// @return _startedAt The L1 timestamp corresponding to most
recent proof
/// @return _updatedAt Equivalent to `_startedAt`
/// @return _answeredInRound Equivalent to `_roundId`
function latestRoundData()
external
view
returns (
uint80 _roundId,
int256 _answer,
uint256 _startedAt,
uint256 _updatedAt,
uint80 _answeredInRound
)
```
```
/// @return _pricePerShare The current exchange rate of the vault token
/// denominated in the underlying vault asset
function pricePerShare() public view returns (uint256 _pricePerShare);
```
**Architecture**


Step 2: Submit the Storage proof for a predefined L1 address and Slots

The following code should serve as an example of how to generate the function
arguments that are accepted by the fraxtal smart contracts detailed above.

```
Screenshot 2024-09-23 at 11.04.48 AM
```
```
Screenshot 2024-09-23 at 11.05.00 AM
```
**Demo Client**


Documentation surrounding the RPC methods: eth_getBlockByNumber &&
eth_getProof

**To generate the L1 Block Header**

**To generate a storage proof**

```
async function getHeaderFromBlock(provider, blockL1) {
let block = await provider.send("eth_getBlockByNumber", [blockL1,
false])
let headerFields = [];
headerFields.push(block.parentHash);
headerFields.push(block.sha3Uncles);
headerFields.push(block.miner);
headerFields.push(block.stateRoot);
headerFields.push(block.transactionsRoot);
headerFields.push(block.receiptsRoot);
headerFields.push(block.logsBloom);
headerFields.push(block.difficulty);
headerFields.push(block.number);
headerFields.push(block.gasLimit);
headerFields.push(block.gasUsed);
headerFields.push(block.timestamp);
headerFields.push(block.extraData);
headerFields.push(block.mixHash);
headerFields.push(block.nonce);
headerFields.push(block.baseFeePerGas);
if (block.withdrawalsRoot) {
headerFields.push(block.withdrawalsRoot);
}
if (block.blobGasUsed) {
headerFields.push(block.blobGasUsed);
}
if (block.excessBlobGas) {
headerFields.push(block.excessBlobGas);
}
if (block.parentBeaconBlockRoot) {
headerFields.push(block.parentBeaconBlockRoot);
}
convertHeaderFields(headerFields);
let header = ethers.utils.RLP.encode(headerFields);
return header
}
```

```
let blockToProof =
"0x"+blockL1.toHexString().substring(2).replace(/^0+/, "");
```
```
let sfrax_proof = await mainnetProvider.send("eth_getProof",
[
// L1 address to generate proofs for
SFRAX_MAINNET,
// Slots to proof
[
```
```
"0x0000000000000000000000000000000000000000000000000000000000000002",
```
```
"0x0000000000000000000000000000000000000000000000000000000000000009",
```
```
"0x0000000000000000000000000000000000000000000000000000000000000008",
```
```
"0x0000000000000000000000000000000000000000000000000000000000000006",
```
```
"0x0000000000000000000000000000000000000000000000000000000000000007"
],
blockToProof
]);
```
```
// Format the proof info returned from `eth_getProof`
let proof: Proof = {} as Proof;
proof._accountProofSfrax = sfrax_proof.accountProof;
proof._storageProofTotalSupply =
sfrax_proof.storageProof[0].proof;
proof._storageProofTotalAssets =
sfrax_proof.storageProof[1].proof;
proof._storageProofLastDist =
sfrax_proof.storageProof[2].proof;
proof._storageProofRewardsPacked =
sfrax_proof.storageProof[3].proof;
proof._storageProofRewardsCycleAmount =
sfrax_proof.storageProof[4].proof;
```
```
let txn = await proover.addRoundDataSfrax(
SFRAX_L2_ORACLE,
blockL1.toString(),
proof
)
```
**Deployed Contracts**


```
Description Oracle MerkleProofPriceSource
```
sFrax/Frax 8cab7c58365ed3f1ff0x1b680f4385f24420d264d7 39ccee0df6673b9bdb0xe25d8aaa6df41b94a415ee

sfrxEth/frxEth 4a1179BB403a027c3A0xEE095b7d9191603126Da58 0ee84A63001d1b44Db0xabca0b314d15B3e28F24AC

FPI/USD 30F3867e30763CbB020x0f50beeE2d2506634b1e62 98099e4539238e9c370x8fc7425Cd36D7e46056501


## Guides & FAQ


### FAQ

**TLDR** : capital efficiency, as well as decentralization.

FRAX the stablecoin is on over 20 different chains. Ethereum, Fraxtal, and Arbitrum are
the largest. FXS, FPI, frxETH, sfrxETH, and sFRAX are also on many of these chains.

The FRAX token was launched December 20th, 2020 by Sam Kazemian , Travis Moore ,
and Jason Huan.

Frax founders Sam Kazemian and Travis Moore (along with Theodor "Ted" Forselius
and Mahbod Moghadam ) created Everipedia (now IQ.wiki) in December 2014. Sam
and Travis remain as advisors, but the company is now primarily led by Ted Forselius,
Navin Vethanayagam , and Cesar Rodriguez.

###### Why use a fractional stablecoin?

###### How many chains is FRAX on?

###### When was FRAX launched?

###### What is the relationship between FRAX and Everipedia / IQ.wiki?


As of 11/8/2024, 13 team members.

The purpose of sub-projects like Fraxlend and Fraxswap is to ultimately generate utility
for FRAX ecosystem tokens (like FXS, sFRAX, frxETH/sfrxETH) and stabilize /
collateralize the FRAX peg. The goal was never to compete with larger competitors (e.g.
Aave for Fraxlend, Uniswap for Fraxswap).

###### How big is the Frax Team?

###### Why does the Frax ecosystem have so many tokens and sub-projects?


### Staking

Guides for how to stake in various opportunities in the Frax ecosystem


### Uniswap Migration / Uniswap V3

Migrating from Uniswap V2 to Uniswap V3

```
Guide: How to add liquidity to FRAX-USDC pool on UNISWAP V3.
Medium
```
###### How to add liquidity to the FRAX-USDC pool on UNISWAP V3


### Fraxswap / FPI

```
Guide : How to use AMM/TWAMM on FraxSwap.
Medium
```
```
https://fraxfinancecommunity.medium.com/guide-how-to-mint-redeem-fpi-
stablecoin-on-fraxswap-d85676e6d6bd
fraxfinancecommunity.medium.com
```
##### Fraxswap

##### FPI


## Miscellany


### All Contract Addresses

1) https://github.com/FraxFinance/frax-solidity/blob/master/src/types/constants.ts
2) Search for "CONTRACT_ADDRESSES"


### Bug Bounty

Frax Finance provides one of the largest bounties in the industry for exploits where user
funds are at risk or protocol controlled funds/collateral are at risk.

The bounty is simply calculated as the lower value of 10% of the total possible exploit or
$10m worth paid in FRAX+FXS (breakdown at team's discretion). Both tokens are
immediately liquid. The bounty will be delivered immediately or a maximum turnaround
time of 5 days due to timelock+mitigation. This bounty is a "no questions asked" policy
for disclosures and/or immediate return of funds after any incident.

Slow arbitrage opportunities or value exchange over a prolonged period is not applicable
to this bounty and will receive a base compensation bounty of 50,000 FRAX (prev FXS) or
frxUSD (at team discretion).

Note: This bounty does not cover any front-end bugs/visual bugs or any type of server-
side code of any web application that interacts with the Frax Protocol. The above bug
bounty is **only** for smart contract code. Smart contract code on any chain that manages
Frax Protocol value and/or user deposited value is included in this bounty.

This bounty applies to all smart contracts deployed by the Frax Deployer addresses
including Fraxswap AMM, Fraxlend, and frxETH.

Contacts: you can reach out anonymously through any communication channel including
Twitter, Telegram, Discord, or Signal.


### Miscellaneous & Bot Addresses

Investor Custodian (team hot wallet): 0x5180db0237291A6449DdA9ed33aD90a38787621c

Oracle updater bot (misc on-chain tasks):
0xBB437059584e30598b3AF0154472E47E6e2a45B9

Utility / helper contract deployer (another team hot wallet):
0x36a87d1e3200225f881488e4aeedf25303febcae


### API

Subgraphs:
https://thegraph.com/explorer/profile/0x6e74053a3798e0fc9a9775f7995316b27f21c4d
2?view=Subgraphs

Swagger Documentation (V1): https://api.frax.finance/v1/docs

Swagger Documentation (V2): https://api.frax.finance/v2/docs

Combined Data: https://api.frax.finance/combineddata/

Pool APRs and Farm Info: https://api.frax.finance/pools


## Other


### Audits

Nov 2020 - Certik

June 2021 - Trail of Bits
Dec 2021 - Trail of Bits

April 2022 - Shipyard / Macro
August 2022 - Fraxswap & FPI Trail of Bits
September 2022 - frxETH - Code4rena
November 2022 - Fraxlend & Fraxferry - Trail of Bits

Jan 2023 - Fraxlend & veFPIS - Trail of Bits
July 2023 - FrxGov - Trail of Bits
Oct 2023 - FXB, sFRAX, frxETH Redemption Queue, Frax Oracles - Trail of Bits

Jan 2024 - Fraxchain (Fraxtal) - Trail of Bits
March 2024 - frxETH V2 - Frax Security Cartel
April 2024 - Fraxtal, VestedFXS, and Flox - Frax Security Cartel
May 2024 - FPISLocker & FraxtalERC4626MintRedeemer - Frax Security Cartel
May 2024 - Curve AMO for frxETH V2 - Frax Security Cartel
October 2024 - BAMM - Certora

##### 2020

##### 2021

##### 2022

##### 2023

##### 2024


March 2025 - Fraxtal North Star - Frax Security Cartel

###### 2025


### Media Kit / Logos

```
3MB
```
```
All Logos.zip Download Open
archive
```

