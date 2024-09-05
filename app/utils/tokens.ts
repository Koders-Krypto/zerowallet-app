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
        address: "0x94373a4919B3240D86eA41593D5eBa789FEF3848",
        icon: "/tokens/weth.png",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x712e3A792c974B3E3dbE41229Ad4290791C75A82",
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
];

function getChainById(chainId: number) {
  return gasChainsTokens.find((chain) => chain.chainId === chainId);
}

const findChainIndexByChainId = (chainId: number) => {
  return gasChainsTokens.findIndex((chain) => chain.chainId === chainId);
};
export { gasChainsTokens, getChainById, findChainIndexByChainId };
