## Get Started 🤝

Ready to join the Brewit revolution? Follow these steps:

### Clone the Repo

Grab the code from GitHub:

```bash
git clone https://github.com/brewitmoney/wallet-app-alpha.git
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

Under the hood, Brewit Wallet is built on a Safe smart account, fully compatible with ERC-4337. This ensures smooth gas and account abstraction, making your life easier.

The onboarding process is a breeze, thanks to our passkey module that follows the ERC-7579 standard. No more hassle with complicated wallet setups!

Users can create automated investment strategies using our Session Key and DCA investment modules, which seamlessly integrate with Uniswap and ERC-4626 Vault contracts.

To keep everything running smoothly, we've got a scheduler service that uses a REST API to trigger jobs for each user's investment plan. No more manual intervention required!


All the contracts and Scheduler bot APIs are hosted in the zerowallet-contracts repository. Go check it out!

