export type ZapperNFTDataTypes = {
  balance: string;
  token: NFTToken;
};
interface Media {
  type: string;
  originalUrl: string;
  fileSize: string;
  mimeType: string;
  blurhash: string | null;
  width: number | null;
  height: number | null;
}

interface Collection {
  address: string;
  network: string;
  name: string;
  nftStandard: string;
  type: string;
  floorPriceEth: string;
  logoImageUrl: string;
  openseaId: string;
}

interface NFTToken {
  id: string;
  name: string;
  tokenId: string;
  lastSaleEth: string | null;
  rarityRank: number | null;
  estimatedValueEth: string | null;
  medias: Media[];
  collection: Collection;
}
export type ZapperTokenDataTypes = {
  key: string;
  address: string;
  network: string;
  updatedAt: string;
  token: Token;
};

export interface Token {
  address: string;
  network: string;
  label: string;
  name: string;
  symbol: string;
  decimals: string;
  verified: boolean;
  price: string;
  balance: number;
  balanceUSD: number;
  balanceRaw: string;
}

export interface NetworkType {
  chainId: number;
  name: string;
  symbol: string;
  logo: string;
}

export interface ZapperDEFIDataTypes {
  key: string;
  address: string;
  appId: string;
  appName: string;
  appImage: string;
  network: string;
  updatedAt: string;
  balanceUSD: number;
  products: any[];
}

export interface Product {
  label: string;
  assets: Asset[];
  meta: any[];
}

export interface Asset {
  key: string;
  type: string;
  appId: string;
  groupId: string;
  network: string;
  address: string;
  tokens: TokenDefi[];
  dataProps: DataProps;
  displayProps: DisplayProps;
  balanceUSD: number;
}

export interface TokenDefi {
  metaType: string;
  type: string;
  network: string;
  address: string;
  symbol: string;
  decimals: number;
  price: number;
  balance: number;
  balanceRaw: string;
  balanceUSD: number;
}

export interface DataProps {}

export interface DisplayProps {
  label: string;
  images: string[];
  statsItems: any[];
}

const TokensIcons = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "/tokens/ethereum.webp",
  },
  {
    name: "Wrapped ETH",
    symbol: "WETH",
    icon: "/tokens/weth.png",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    icon: "/tokens/polygon.png",
  },
  {
    name: "Optimism",
    symbol: "OP",
    icon: "/tokens/optimism.svg",
  },
  {
    name: "Gnosis",
    symbol: "GNO",
    icon: "/tokens/gno.webp",
  },
  {
    name: "USDT",
    symbol: "USDT",
    icon: "/tokens/usdt.png",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    icon: "/tokens/avax.svg",
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: "/tokens/usdc.svg",
  },
  {
    name: "DAI",
    symbol: "DAI",
    icon: "/tokens/dai.svg",
  },
  {
    name: "1inch",
    symbol: "1inch",
    icon: "/tokens/1inch.svg",
  },
  {
    name: "Aave",
    symbol: "AAVE",
    icon: "/tokens/aave.svg",
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    icon: "/tokens/arb.svg",
  },
  {
    name: "BAT",
    symbol: "BAT",
    icon: "/tokens/bat.svg",
  },
  {
    name: "BNB",
    symbol: "BNB",
    icon: "/tokens/bnb.svg",
  },
  {
    name: "BUSD",
    symbol: "BUSD",
    icon: "/tokens/busd.svg",
  },
  {
    name: "Cake",
    symbol: "CAKE",
    icon: "/tokens/cake.svg",
  },
  {
    name: "Celo",
    symbol: "CELO",
    icon: "/tokens/celo.svg",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    icon: "/tokens/chainlink.svg",
  },
  {
    name: "Dogwifhat",
    symbol: "WIF",
    icon: "/tokens/dogwifhat.svg",
  },
  {
    name: "DyDx",
    symbol: "DyDx",
    icon: "/tokens/dydx.svg",
  },
  {
    name: "ENS",
    symbol: "ENS",
    icon: "/tokens/ens.svg",
  },
  {
    name: "Fantom",
    symbol: "FTM",
    icon: "/tokens/fantom.svg",
  },
  {
    name: "Filecoin",
    symbol: "FIL",
    icon: "/tokens/filecoin.svg",
  },
  {
    name: "Lido",
    symbol: "LIDO",
    icon: "/tokens/lido.svg",
  },
  {
    name: "Decentraland",
    symbol: "MANA",
    icon: "/tokens/mana.svg",
  },
  {
    name: "Paypal USD",
    symbol: "PYUSD",
    icon: "/tokens/paypal-usd.svg",
  },
  {
    name: "Pendle",
    symbol: "PENDLE",
    icon: "/tokens/pendle.png",
  },
  {
    name: "PEPE",
    symbol: "PEPE",
    icon: "/tokens/pepe.svg",
  },
  {
    name: "Rocket Pool",
    symbol: "RPL",
    icon: "/tokens/rocket-pool.svg",
  },
  {
    name: "Space ID",
    symbol: "ID",
    icon: "/tokens/spaceid.svg",
  },
  {
    name: "Stacks",
    symbol: "STX",
    icon: "/tokens/stacks.svg",
  },
  {
    name: "The Graph",
    symbol: "GRT",
    icon: "/tokens/the-graph.svg",
  },

  {
    name: "Uniswap",
    symbol: "UNI",
    icon: "/tokens/uni.png",
  },
  {
    name: "Wrapped BTC",
    symbol: "wbtc",
    icon: "/tokens/wbtc.svg",
  },
  {
    name: "Yearn Finance",
    symbol: "YFI",
    icon: "/tokens/yearn.svg",
  },
  {
    name: "ZKsync",
    symbol: "ZK",
    icon: "/tokens/zksync.svg",
  },
  {
    name: "EtherFi",
    symbol: "ETHFI",
    icon: "/tokens/etherfi.webp",
  },
  {
    name: "BLAST",
    symbol: "BLAST",
    icon: "/tokens/blast.png",
  },
  {
    name: "Worldcoin",
    symbol: "WLD",
    icon: "/tokens/worldcoin.png",
  },
  {
    name: "Gitcoin",
    symbol: "GTC",
    icon: "/tokens/gitcoin.svg",
  },
  {
    name: "rsETH Wrapper",
    symbol: "rsETHWrapper",
    icon: "/tokens/wrsETH.webp",
  },
  {
    name: "rsETH",
    symbol: "rsETHWrapper",
    icon: "/tokens/rsETH.png",
  },
];

const getIconbySymbol = (symbol: string) => {
  const token = TokensIcons.find(
    (token) => token.symbol.toLocaleLowerCase() === symbol.toLocaleLowerCase()
  );
  if (token) {
    return token.icon;
  }
  return "";
};

const Networks = [
  {
    chainId: 1,
    name: "ethereum",
    symbol: "ETH",
    logo: "/chains/ethereum.webp",
  },
  {
    chainId: 137,
    name: "polygon",
    symbol: "MATIC",
    logo: "/chains/polygon.png",
  },
  {
    chainId: 10,
    name: "optimism",
    symbol: "OP",
    logo: "/chains/optimism.svg",
  },
  {
    chainId: 100,
    name: "gnosis",
    symbol: "xDAI",
    logo: "/chains/gnosis.svg",
  },
  {
    chainId: 56,
    name: "binance-smart-chain",
    symbol: "BNB",
    logo: "/chains/bsc.svg",
  },
  {
    chainId: 250,
    name: "fantom",
    symbol: "FTM",
    logo: "/chains/ftm.svg",
  },
  {
    chainId: 43114,
    name: "avalanche",
    symbol: "AVAX",
    logo: "/chains/avalanche.svg",
  },
  {
    chainId: 42161,
    name: "arbitrum",
    symbol: "ETH",
    logo: "/chains/arbitrum.svg",
  },
  {
    chainId: 42220,
    name: "celo",
    symbol: "CELO",
    logo: "/chains/celo.svg",
  },
  {
    chainId: 1666600000,
    name: "harmony",
    symbol: "ONE",
    logo: "/chains/harmony.png",
  },
  {
    chainId: 1285,
    name: "moonriver",
    symbol: "MOVR",
    logo: "/chains/moonriver.png",
  },
  {
    chainId: 25,
    name: "cronos",
    symbol: "CRO",
    logo: "/chains/cronos.png",
  },
  {
    chainId: 1313161554,
    name: "aurora", // Corrected chain name
    symbol: "AURORA",
    logo: "/chains/aurora.jpg",
  },
  {
    chainId: 9001,
    name: "evmos",
    symbol: "EVMOS",
    logo: "/chains/evmos.webp",
  },
  {
    chainId: 1284,
    name: "moonbeam",
    symbol: "GLMR",
    logo: "/chains/moonbeam.svg",
  },
  {
    chainId: 8453,
    name: "base",
    symbol: "ETH",
    logo: "/chains/base.svg",
  },
  {
    chainId: 81457,
    name: "blast",
    symbol: "BLAST",
    logo: "/chains/blast.png",
  },
  {
    chainId: 666666666,
    name: "degen",
    symbol: "DEGEN",
    logo: "/chains/degen.webp",
  },
  {
    chainId: 34443,
    name: "mode",
    symbol: "MODE",
    logo: "/chains/mode.jpeg",
  },
  {
    chainId: 324,
    name: "zksync",
    symbol: "ETH",
    logo: "/chains/zksync.svg",
  },
  {
    chainId: 5000,
    name: "mantle",
    symbol: "ETH",
    logo: "/chains/mantle.svg",
  },
  {
    chainId: 534,
    name: "scroll",
    symbol: "ETH",
    logo: "/chains/scroll.svg",
  },
  {
    chainId: 59144,
    name: "linea",
    symbol: "ETH",
    logo: "/chains/linea.png",
  },
  {
    chainId: 7777777,
    name: "zora",
    symbol: "ETH",
    logo: "/chains/zora.png",
  },
];

function getNetworkLogobyName(name: string) {
  return Networks.filter((item) => item.name === name)[0].logo;
}

// Sort Token Data by Network Name
function sortByNetwork(data: ZapperTokenDataTypes[]) {
  return data.sort((a: any, b: any) => {
    if (a.network < b.network) return -1;
    if (a.network > b.network) return 1;
    return 0;
  });
}

function getTotalBalanceToken(data: ZapperTokenDataTypes[]) {
  return data.reduce((total, item) => {
    return total + item.token.balanceUSD;
  }, 0);
}

function getTotalBalanceDefi(data: ZapperDEFIDataTypes[]) {
  return data.reduce((total, item) => {
    return total + item.balanceUSD;
  }, 0);
}

function getTokensByNetwork(data: ZapperTokenDataTypes[], network: string[]) {
  return data.filter((item) => network.includes(item.network));
}

function getNetworksbyNames(data: string[]) {
  return data.map((name) => {
    return Networks.find((network) => network.name === name);
  });
}

export {
  Networks,
  sortByNetwork,
  getTotalBalanceToken,
  getTotalBalanceDefi,
  getTokensByNetwork,
  getIconbySymbol,
  getNetworkLogobyName,
};
