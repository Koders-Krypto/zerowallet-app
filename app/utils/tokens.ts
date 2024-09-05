const gasChainsTokens = [
  {
    name: "Holesky",
    address: "0xBBE5A39eD493150Be69D31Aa8780218247794152",
    chainId: 17000,
    icon: "/chains/ethereum.webp",
    tokens: [
      {
        name: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        icon: "/chains/ethereum.webp",
        decimals: 18,
      },
      {
        name: "WETH",
        address: "0x0000000000000000000000000000000000000001",
        icon: "/tokens/weth.png",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x0000000000000000000000000000000000000002",
        icon: "/tokens/usdt.png",
        decimals: 6,
      },
    ],
  },
  {
    name: "Sepolia",
    address: "0x09545c0Cd0ddfd3B5EfBA5F093B3cA20b6ba4bB9",
    chainId: 11155111,
    icon: "/chains/ethereum.webp",
    tokens: [
      {
        name: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        icon: "/chains/ethereum.webp",
        decimals: 18,
      },
      {
        name: "WETH",
        address: "0x0000000000000000000000000000000000000001",
        icon: "/tokens/weth.png",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x0000000000000000000000000000000000000002",
        icon: "/tokens/usdt.png",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0x0000000000000000000000000000000000000003",
        icon: "/tokens/dai.svg",
        decimals: 18,
      },
      {
        name: "WBTC",
        address: "0x0000000000000000000000000000000000000004",
        icon: "/tokens/wbtc.svg",
        decimals: 8,
      },
      {
        name: "UNI",
        address: "0x0000000000000000000000000000000000000005",
        icon: "/tokens/uni.png",
        decimals: 6,
      },
    ],
  },
  {
    name: "Base Sepolia",
    address: "0xBBE5A39eD493150Be69D31Aa8780218247794152",
    chainId: 84532,
    icon: "/chains/ethereum.webp",
    tokens: [
      {
        name: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        icon: "/chains/ethereum.webp",
        decimals: 18,
      },
      {
        name: "WETH",
        address: "0x0000000000000000000000000000000000000001",
        icon: "/tokens/weth.png",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x0000000000000000000000000000000000000002",
        icon: "/tokens/usdt.png",
        decimals: 6,
      },
    ],
  },
  {
    name: "Polygon",
    address: "0xBBE5A39eD493150Be69D31Aa8780218247794152",
    chainId: 137,
    icon: "/chains/polygon.png",
    tokens: [
      {
        name: "Matic",
        address: "0x0000000000000000000000000000000000000000",
        icon: "/tokens/polygon.png",
        decimals: 18,
      },
      {
        name: "WMATIC",
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        vault: "0x28F53bA70E5c8ce8D03b1FaD41E9dF11Bb646c36",
        icon: "/tokens/wmatic.png",
        decimals: 18,
      },
      {
        name: "WETH",
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        icon: "/tokens/weth.png",
        vault: "0x305F25377d0a39091e99B975558b1bdfC3975654",
        decimals: 6,
      },
      {
        name: "USDC",
        address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        icon: "/tokens/usdc.svg",
        decimals: 6,
      },
    ],
  },
];

function getChainById(chainId: number) {
  return gasChainsTokens.find((chain) => chain.chainId === chainId);
}

const getTokenInfo = (chainId: number, token: string) => {
  const chain = getChainById(chainId);
  try {
    return chain?.tokens.find(
      (item: any) => item.address.toLowerCase() == token?.toLowerCase()
    );
  } catch (e) {
    console.log("Error getting token info");
    //  return {};
  }
};

const findChainIndexByChainId = (chainId: number) => {
  return gasChainsTokens.findIndex((chain) => chain.chainId === chainId);
};
export { gasChainsTokens, getChainById, findChainIndexByChainId, getTokenInfo };
