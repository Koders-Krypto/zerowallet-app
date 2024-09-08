# ZeroWallet: Unlock the Omni-Chain Future 🚀

## Hey there! 👋

Welcome to **ZeroWallet**, the ultimate crypto wallet that's going to revolutionize how you manage your assets across multiple chains. 

ZeroWallet is your all-in-one crypto wallet that takes the hassle out of multi-chain management! With account, gas, and chain abstraction, powered by ERC-4337 enabled Safe Smart Accounts & LayerZero, enjoy seamless account setup, auto-investment strategies, and more—all without worrying about gas or chains!

- **Track Your Stuff:** Easily keep an eye on your tokens, positions, and NFTs. No more struggling to find where your stuff is.
- **Invest Like a Pro:** Set up automated investment strategies using yield-generating vaults and dollar-cost averaging (DCA). Let your money work for you!
- **Bridge the Gaps:** Move your vaults and investments across chains with a breeze, thanks to LayerZero's omni-chain magic.
- **Onboard Effortlessly:** Get started in the world of web3 with our frictionless passkey-based smart account setup. No more complicated wallet shenanigans.
- **Transfer Freely:** Move your Omni-Chain Fungible Tokens (OFTs) across supported chains without worrying about gas fees or network quirks.

## Try the Demo 🚀

Want to see ZeroWallet in action? Check out the [demo](https://wallet.usezero.xyz/) and take it for a spin!

## Get Involved 🤝

Ready to join the ZeroWallet revolution? Follow these steps:

### Clone the Repo

Grab the code from GitHub:

```bash
git clone https://github.com/zerowallet/zerowallet-app.git
```
Install the dependencies:
```
npm install
# or
yarn install
```

Run the development server:

```
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser and see the magic happen!


## The Techie Stuff 👨‍🏭

Under the hood, ZeroWallet is built on a Safe smart account, fully compatible with ERC-4337. This ensures smooth gas and account abstraction, making your life easier.

The onboarding process is a breeze, thanks to our passkey module that follows the ERC-7579 standard. No more hassle with complicated wallet setups!

Users can create automated investment strategies using our Session Key and DCA investment modules, which seamlessly integrate with Uniswap and ERC-4626 Vault contracts.

To keep everything running smoothly, we've got a scheduler service that uses a REST API to trigger jobs for each user's investment plan. No more manual intervention required!

And the real magic happens with LayerZero's omni-chain protocol. By integrating with ERC-4626 vaults and OFT contracts, users can withdraw their funds across any supported network, making cross-chain management a piece of cake.

All the contracts and Scheduler bot APIs are hosted in the zerowallet-contracts repository. Go check it out!

Made with 🤍 at ETHOnline 2024