const gasChains = [
  {
    name: "Holesky",
    address: "0xBBE5A39eD493150Be69D31Aa8780218247794152",
    chainId: 17000,
    icon: "/chains/ethereum.png",
  },
  {
    name: "Sepolia",
    address: "0x09545c0Cd0ddfd3B5EfBA5F093B3cA20b6ba4bB9",
    chainId: 11155111,
    icon: "/chains/ethereum.png",
  },
];

function getChainById(chainId: number) {
  return gasChains.find((chain) => chain.chainId === chainId);
}

export { gasChains, getChainById };
