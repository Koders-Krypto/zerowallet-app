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
    icon: "/tokens/uni.svg",
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
    logo: "/chains/cronos.svg",
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

const ZapperDEFIData = [
  {
    key: "2360382195",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "pendle-v2",
    appName: "Pendle V2",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/pendle-v2.png",
    network: "ethereum",
    updatedAt: "2024-08-30T10:54:26.622Z",
    balanceUSD: 2510.0295136977993,
    products: [
      {
        label: "Pools",
        assets: [
          {
            type: "app-token",
            uuid: "35151064-2473-4eea-95ed-53e2fb5d2255",
            createdAt: "2024-07-04T09:32:23.640Z",
            key: "90021964",
            appId: "pendle-v2",
            groupLabel: "Pools",
            groupId: "pool",
            address: "0xa54fc268101c8b97de19ef3141d34751a11996b2",
            network: "ethereum",
            price: 4940.062570140802,
            symbol: "PENDLE-LPT",
            decimals: 18,
            supply: 11549.078475910756,
            pricePerShare: [2.0047818506466446, 1.9531094307145103],
            tokens: [
              {
                key: "1903426189",
                type: "app-token",
                uuid: "c47b06da-fa10-491c-ae39-57d6dc6f396f",
                appId: "pendle",
                price: 2464.195271864534,
                supply: 51510.34506897011,
                symbol: "PT-pufETH-26SEP2024",
                tokens: [
                  {
                    key: "729632701",
                    type: "app-token",
                    uuid: "17d066ed-7518-4b40-aea8-21dd4ed52ef0",
                    appId: "pendle-v2",
                    price: 2529.3321984183794,
                    supply: 71136.61584858652,
                    symbol: "SY pufETH",
                    tokens: [],
                    address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                    groupId: "standardized-yield",
                    network: "ethereum",
                    decimals: 18,
                    metaType: "supplied",
                    createdAt: "2024-02-27T13:48:12.923Z",
                    dataProps: {
                      apy: 2.9215708659487305,
                      name: "pufETH",
                      price: 2529.3321984183794,
                      isDebt: false,
                      tokens: [],
                      address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                      reserves: [71136.61584858652],
                      liquidity: 179928132.95234907,
                      underlyingApy: 0.029215708659487305,
                      tokenDefinitions: [],
                    },
                    groupLabel: "Standardized Yield Tokens",
                    displayProps: {
                      label: "pufETH",
                      images: [],
                      statsItems: [
                        {
                          label: "Liquidity",
                          value: {
                            type: "dollar",
                            value: 179928132.95234907,
                          },
                        },
                        {
                          label: "APY",
                          value: {
                            type: "pct",
                            value: 2.9215708659487305,
                          },
                        },
                        {
                          label: "Share",
                          value: {
                            type: "pct",
                            value: 0.0006970446218134314,
                          },
                        },
                      ],
                      tertiaryLabel: "2.922% APY",
                      secondaryLabel: {
                        type: "dollar",
                        value: 2529.3321984183794,
                      },
                    },
                    pricePerShare: [1],
                    balance: 0.4958539549126534,
                    balanceRaw: "495853954912653358",
                    balanceUSD: 1254.1793738736696,
                  },
                ],
                address: "0xd4e75971eaf78a8d93d96df530f1fff5f9f53288",
                groupId: "yt-tokens",
                network: "ethereum",
                decimals: 18,
                metaType: "supplied",
                createdAt: "2024-06-21T16:44:03.691Z",
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [50183.81881606478],
                  liquidity: 126931548.77106676,
                },
                groupLabel: "Principal Tokens",
                displayProps: {
                  label: "PT-pufETH-26SEP2024",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/apps/pendle-v2.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 126931548.77106676,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.000988075372920646,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2464.195271864534,
                  },
                },
                pricePerShare: [0.9742473817418777],
                balance: 0.508961034132938,
                balanceRaw: "508961034132938066",
                balanceUSD: 1254.1793738736696,
              },
              {
                key: "729632701",
                type: "app-token",
                uuid: "17d066ed-7518-4b40-aea8-21dd4ed52ef0",
                appId: "pendle-v2",
                price: 2529.3321984183794,
                supply: 71136.61584858652,
                symbol: "SY pufETH",
                tokens: [],
                address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                groupId: "standardized-yield",
                network: "ethereum",
                decimals: 18,
                metaType: "supplied",
                createdAt: "2024-02-27T13:48:12.923Z",
                dataProps: {
                  apy: 2.9215708659487305,
                  name: "pufETH",
                  price: 2529.3321984183794,
                  isDebt: false,
                  tokens: [],
                  address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                  reserves: [71136.61584858652],
                  liquidity: 179928132.95234907,
                  underlyingApy: 0.029215708659487305,
                  tokenDefinitions: [],
                },
                groupLabel: "Standardized Yield Tokens",
                displayProps: {
                  label: "pufETH",
                  images: [],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 179928132.95234907,
                      },
                    },
                    {
                      label: "APY",
                      value: {
                        type: "pct",
                        value: 2.9215708659487305,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.0006970289053733447,
                      },
                    },
                  ],
                  tertiaryLabel: "2.922% APY",
                  secondaryLabel: {
                    type: "dollar",
                    value: 2529.3321984183794,
                  },
                },
                pricePerShare: [1],
                balance: 0.4958427747690438,
                balanceRaw: "495842774769043853",
                balanceUSD: 1254.151095576455,
              },
            ],
            dataProps: {
              pt: {
                id: "1-0xd4e75971eaf78a8d93d96df530f1fff5f9f53288",
                name: "PT-pufETH-26SEP2024",
                price: {
                  acc: 0.9896603542781252,
                  usd: 2464.139711035083,
                },
                types: ["PT"],
                expiry: "2024-09-26T00:00:00.000Z",
                symbol: "PT-pufETH-26SEP2024",
                address: "0xd4e75971eaf78a8d93d96df530f1fff5f9f53288",
                chainId: 1,
                proIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/ad53c3bf-7a0c-481e-80cd-0eea4e0e9554.svg",
                proName: "PT pufETH",
                baseType: "PT",
                decimals: 18,
                protocol: "Puffer",
                zappable: false,
                proSymbol: "PT pufETH",
                simpleIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/ad53c3bf-7a0c-481e-80cd-0eea4e0e9554.svg",
                simpleName: "PT pufETH",
                accentColor: "",
                simpleSymbol: "PT pufETH",
                priceUpdatedAt: "2024-08-30T10:29:45.000Z",
                underlyingPool: "",
              },
              sy: {
                id: "1-0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                name: "SY pufETH",
                price: {
                  acc: 1.0178941716696646,
                  usd: 2529.3321984183794,
                },
                types: ["SY"],
                expiry: null,
                symbol: "SY pufETH",
                address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                chainId: 1,
                proIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/94b8d616-2dba-449b-8651-5e2283478464.svg",
                proName: "pufETH",
                baseType: "SY",
                decimals: 18,
                protocol: "Puffer",
                zappable: false,
                proSymbol: "pufETH",
                simpleIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/94b8d616-2dba-449b-8651-5e2283478464.svg",
                simpleName: "pufETH",
                accentColor: "#42CBB8",
                simpleSymbol: "pufETH",
                priceUpdatedAt: "2024-08-30T10:29:45.000Z",
                underlyingPool: "",
              },
              yt: {
                id: "1-0x1a65eb80a2ac3ea6e41d456ddd6e9cc5728bef7c",
                name: "YT-pufETH-26SEP2024",
                price: {
                  acc: 0.010339645721874846,
                  usd: 18.647704753771585,
                },
                types: ["YT"],
                expiry: "2024-09-26T00:00:00.000Z",
                symbol: "YT-pufETH-26SEP2024",
                address: "0x1a65eb80a2ac3ea6e41d456ddd6e9cc5728bef7c",
                chainId: 1,
                proIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/ed48f303-256e-4edc-8585-6d653db07845.svg",
                proName: "YT pufETH",
                baseType: "YT",
                decimals: 18,
                protocol: "Puffer",
                zappable: false,
                proSymbol: "YT pufETH",
                simpleIcon:
                  "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/ed48f303-256e-4edc-8585-6d653db07845.svg",
                simpleName: "YT pufETH",
                accentColor: "",
                simpleSymbol: "YT pufETH",
                priceUpdatedAt: "2024-08-30T10:29:45.000Z",
                underlyingPool: "",
              },
              apy: 5.455157330724192,
              name: "pufETH",
              price: 4940.062570140802,
              expiry: "2024-09-26T00:00:00.000Z",
              isDebt: false,
              tokens: [
                {
                  key: "1903426189",
                  type: "app-token",
                  uuid: "c47b06da-fa10-491c-ae39-57d6dc6f396f",
                  appId: "pendle",
                  price: 2464.195271864534,
                  supply: 51510.34506897011,
                  symbol: "PT-pufETH-26SEP2024",
                  tokens: [
                    {
                      key: "729632701",
                      type: "app-token",
                      uuid: "17d066ed-7518-4b40-aea8-21dd4ed52ef0",
                      appId: "pendle-v2",
                      price: 2529.3321984183794,
                      supply: 71136.61584858652,
                      symbol: "SY pufETH",
                      tokens: [],
                      address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                      groupId: "standardized-yield",
                      network: "ethereum",
                      decimals: 18,
                      metaType: "supplied",
                      createdAt: "2024-02-27T13:48:12.923Z",
                      dataProps: {
                        apy: 2.9215708659487305,
                        name: "pufETH",
                        price: 2529.3321984183794,
                        isDebt: false,
                        tokens: [],
                        address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                        reserves: [71136.61584858652],
                        liquidity: 179928132.95234907,
                        underlyingApy: 0.029215708659487305,
                        tokenDefinitions: [],
                      },
                      groupLabel: "Standardized Yield Tokens",
                      displayProps: {
                        label: "pufETH",
                        images: [],
                        statsItems: [
                          {
                            label: "Liquidity",
                            value: {
                              type: "dollar",
                              value: 179928132.95234907,
                            },
                          },
                          {
                            label: "APY",
                            value: {
                              type: "pct",
                              value: 2.9215708659487305,
                            },
                          },
                        ],
                        tertiaryLabel: "2.922% APY",
                        secondaryLabel: {
                          type: "dollar",
                          value: 2529.3321984183794,
                        },
                      },
                      pricePerShare: [1],
                    },
                  ],
                  address: "0xd4e75971eaf78a8d93d96df530f1fff5f9f53288",
                  groupId: "yt-tokens",
                  network: "ethereum",
                  decimals: 18,
                  metaType: "supplied",
                  createdAt: "2024-06-21T16:44:03.691Z",
                  dataProps: {
                    apy: 0,
                    isDebt: false,
                    reserves: [50183.81881606478],
                    liquidity: 126931548.77106676,
                  },
                  groupLabel: "Principal Tokens",
                  displayProps: {
                    label: "PT-pufETH-26SEP2024",
                    images: [
                      "https://storage.googleapis.com/zapper-fi-assets/apps/pendle-v2.png",
                    ],
                    statsItems: [
                      {
                        label: "Liquidity",
                        value: {
                          type: "dollar",
                          value: 126931548.77106676,
                        },
                      },
                    ],
                    secondaryLabel: {
                      type: "dollar",
                      value: 2464.195271864534,
                    },
                  },
                  pricePerShare: [0.9742473817418777],
                },
                {
                  key: "729632701",
                  type: "app-token",
                  uuid: "17d066ed-7518-4b40-aea8-21dd4ed52ef0",
                  appId: "pendle-v2",
                  price: 2529.3321984183794,
                  supply: 71136.61584858652,
                  symbol: "SY pufETH",
                  tokens: [],
                  address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                  groupId: "standardized-yield",
                  network: "ethereum",
                  decimals: 18,
                  metaType: "supplied",
                  createdAt: "2024-02-27T13:48:12.923Z",
                  dataProps: {
                    apy: 2.9215708659487305,
                    name: "pufETH",
                    price: 2529.3321984183794,
                    isDebt: false,
                    tokens: [],
                    address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                    reserves: [71136.61584858652],
                    liquidity: 179928132.95234907,
                    underlyingApy: 0.029215708659487305,
                    tokenDefinitions: [],
                  },
                  groupLabel: "Standardized Yield Tokens",
                  displayProps: {
                    label: "pufETH",
                    images: [],
                    statsItems: [
                      {
                        label: "Liquidity",
                        value: {
                          type: "dollar",
                          value: 179928132.95234907,
                        },
                      },
                      {
                        label: "APY",
                        value: {
                          type: "pct",
                          value: 2.9215708659487305,
                        },
                      },
                    ],
                    tertiaryLabel: "2.922% APY",
                    secondaryLabel: {
                      type: "dollar",
                      value: 2529.3321984183794,
                    },
                  },
                  pricePerShare: [1],
                },
              ],
              address: "0xa54fc268101c8b97de19ef3141d34751a11996b2",
              reserves: [23153.382920199696, 22556.61408736326],
              liquidity: 57053170.2984655,
              impliedApy: 0.10915242129097913,
              ptDiscount: 0.007511302580864965,
              aggregatedApy: 0.05455157330724192,
              underlyingApy: 0.029215708659487305,
              ytFloatingApy: -0.9999999838960075,
              tokenDefinitions: [
                {
                  address: "0xd4e75971eaf78a8d93d96df530f1fff5f9f53288",
                  network: "ethereum",
                },
                {
                  address: "0x253008ba4ae2f3e6488dc998a5321d4eb1a0c905",
                  network: "ethereum",
                },
              ],
            },
            displayProps: {
              label: "pufETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/apps/pendle-v2.png",
                "https://storage.googleapis.com/zapper-fi-assets/apps/pendle-v2.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 57053170.2984655,
                  },
                },
                {
                  label: "APY",
                  value: {
                    type: "pct",
                    value: 5.455157330724192,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0021982145584821017,
                  },
                },
              ],
              tertiaryLabel: "5.455% APY",
              secondaryLabel: "Sep 26, 2024",
            },
            balance: 0.25387352442799305,
            balanceRaw: "253873524427993062",
            balanceUSD: 2508.330469450125,
          },
        ],
        meta: [],
      },
      {
        label: "Yield Tokens",
        assets: [
          {
            type: "app-token",
            uuid: "68b967a2-98af-4542-b3db-a9de1c7ffda2",
            createdAt: "2024-06-28T01:18:26.720Z",
            key: "3608506729",
            appId: "pendle-v2",
            groupLabel: "Yield Tokens",
            groupId: "yield",
            address: "0x1a65eb80a2ac3ea6e41d456ddd6e9cc5728bef7c",
            network: "ethereum",
            price: 18.647704753771585,
            symbol: "YT-pufETH-26SEP2024",
            decimals: 18,
            supply: 51510.34506897011,
            pricePerShare: [1],
            tokens: [],
            dataProps: {
              apy: -99.99999838960075,
              name: "YT pufETH",
              price: 18.647704753771585,
              expiry: "2024-09-26T00:00:00.000Z",
              isDebt: false,
              tokens: [],
              address: "0x1a65eb80a2ac3ea6e41d456ddd6e9cc5728bef7c",
              reserves: [51510.34506897011],
              liquidity: 960549.7066110487,
              ytFloatingApy: -0.9999999838960075,
              tokenDefinitions: [],
            },
            displayProps: {
              label: "YT pufETH",
              images: [],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 960549.7066110487,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0001768824909299978,
                  },
                },
              ],
              secondaryLabel: "Sep 26, 2024",
            },
            balance: 0.09111278144463163,
            balanceRaw: "91112781444631629",
            balanceUSD: 1.6990442476744085,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "1283971188",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "curve",
    appName: "Curve",
    appImage: "https://storage.googleapis.com/zapper-fi-assets/apps/curve.png",
    network: "ethereum",
    updatedAt: "2024-08-30T10:54:27.547Z",
    balanceUSD: 1311.7833944128386,
    products: [
      {
        label: "Pools",
        assets: [
          {
            type: "app-token",
            uuid: "46658de4-2b23-4e8a-bd23-15851f231af7",
            createdAt: "2024-06-20T19:26:28.257Z",
            key: "4203489157",
            appId: "curve",
            groupLabel: "Pools",
            groupId: "stable-swap-ng-pool",
            address: "0x278cfb6f06b1efc09d34fc7127d6060c61d629db",
            network: "ethereum",
            price: 2572.979546068027,
            symbol: "weeTH/rswE",
            decimals: 18,
            supply: 172.18192367712092,
            pricePerShare: [0.3810069821885687, 0.6117527298022363],
            tokens: [
              {
                key: "1625198570",
                type: "app-token",
                uuid: "864c983e-1b2b-452c-8e51-cf82c0b545d8",
                appId: "ether-fi",
                price: 2637.3586876279455,
                supply: 1551141.351125473,
                symbol: "weETH",
                tokens: [
                  {
                    key: "2317757716",
                    type: "app-token",
                    uuid: "b1ecaa17-15ab-42a3-bb38-e5ad2ff0b93f",
                    appId: "ether-fi",
                    price: 2519.52,
                    supply: 1985795.0627333536,
                    symbol: "eETH",
                    tokens: [
                      {
                        type: "base-token",
                        price: 2519.52,
                        symbol: "ETH",
                        address: "0x0000000000000000000000000000000000000000",
                        network: "ethereum",
                        decimals: "18",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0.20333405349880967,
                        balanceRaw: "203334053498809663",
                        balanceUSD: 512.304214471321,
                      },
                    ],
                    address: "0x35fa164735182de50811e8e2e824cfb9b6118ac2",
                    groupId: "mint",
                    network: "ethereum",
                    decimals: 18,
                    metaType: "supplied",
                    createdAt: "2024-06-08T11:30:15.126Z",
                    dataProps: {
                      apy: 0,
                      isDebt: false,
                      reserves: [1985795.0627333536],
                      liquidity: 5003250376.457939,
                    },
                    groupLabel: "Mint",
                    displayProps: {
                      label: "eETH",
                      images: [
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
                      ],
                      statsItems: [
                        {
                          label: "Liquidity",
                          value: {
                            type: "dollar",
                            value: 5003250376.457939,
                          },
                        },
                        {
                          label: "Share",
                          value: {
                            type: "pct",
                            value: 0.000010239427890354904,
                          },
                        },
                      ],
                      secondaryLabel: {
                        type: "dollar",
                        value: 2519.52,
                      },
                    },
                    pricePerShare: [1],
                    balance: 0.20333405349880967,
                    balanceRaw: "203334053498809663",
                    balanceUSD: 512.304214471321,
                  },
                ],
                address: "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee",
                groupId: "wrapped-eeth",
                network: "ethereum",
                decimals: 18,
                metaType: "supplied",
                createdAt: "2024-06-07T01:34:36.730Z",
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [1623688.6859916633],
                  liquidity: 4090916118.1297154,
                },
                groupLabel: "Wrapped eETH",
                displayProps: {
                  label: "weETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 4090916118.1297154,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00001252297039777819,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2637.3586876279455,
                  },
                },
                pricePerShare: [1.0467702926065066],
                balance: 0.19424897222913962,
                balanceRaw: "194248972229139628",
                balanceUSD: 512.304214471321,
              },
              {
                key: "1153481006",
                type: "app-token",
                uuid: "81264ea6-8fc2-4fb3-9e6e-05654c5503a9",
                appId: "swell",
                price: 2563.3354706125047,
                supply: 104047.26826642368,
                symbol: "rswETH",
                tokens: [
                  {
                    type: "base-token",
                    price: 2519.52,
                    symbol: "ETH",
                    address: "0x0000000000000000000000000000000000000000",
                    network: "ethereum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.3173140836117664,
                    balanceRaw: "317314083611766381",
                    balanceUSD: 799.4791799415176,
                  },
                ],
                address: "0xfae103dc9cf190ed75350761e95403b7b8afa6c0",
                groupId: "rsweth",
                network: "ethereum",
                decimals: 18,
                metaType: "supplied",
                createdAt: "2024-06-20T19:26:06.842Z",
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [105856.69229363477],
                  liquidity: 266708053.36765867,
                },
                groupLabel: "Restaked swETH",
                displayProps: {
                  label: "rswETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 266708053.36765867,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00029975816997150466,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2563.3354706125047,
                  },
                },
                pricePerShare: [1.017390403970798],
                balance: 0.3118901872607737,
                balanceRaw: "311890187260773690",
                balanceUSD: 799.4791799415176,
              },
            ],
            dataProps: {
              apy: 0,
              fee: 0.0002,
              isDebt: false,
              reserves: [65.6025151276423, 105.33276183207903],
              liquidity: 443020.56782387826,
            },
            displayProps: {
              label: "weETH / rswETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 443020.56782387826,
                  },
                },
                {
                  label: "Volume",
                  value: {
                    type: "dollar",
                  },
                },
                {
                  label: "APY",
                  value: {
                    type: "pct",
                    value: 0,
                  },
                },
                {
                  label: "Fee",
                  value: {
                    type: "pct",
                    value: 0.0002,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.2960998855778485,
                  },
                },
              ],
              secondaryLabel: "39% / 60%",
            },
            balance: 0.5098304789936935,
            balanceRaw: "509830478993693500",
            balanceUSD: 1311.7833944128386,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "1733231820",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "eigen-layer",
    appName: "Eigen Layer",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/eigen-layer.png",
    network: "ethereum",
    updatedAt: "2024-08-30T10:54:26.801Z",
    balanceUSD: 2796.5525213946325,
    products: [
      {
        label: "Restaking",
        assets: [
          {
            type: "contract-position",
            address: "0x858646372cc42e1a627fce94aa7a7033e7cf075a",
            key: "0x858646372cc42e1a627fce94aa7a7033e7cf075a:0x0fe4f44bee93503346a3ac9ee5a26b130a5796d6",
            appId: "eigen-layer",
            groupId: "restaking",
            network: "ethereum",
            tokens: [
              {
                metaType: "supplied",
                type: "app-token",
                uuid: "0da19b31-4eee-4578-8e9c-89424f3b4be6",
                createdAt: "2024-05-08T16:08:14.545Z",
                key: "1150208695",
                appId: "swell",
                groupLabel: "swETH",
                groupId: "sw-eth",
                address: "0xf951e335afb289353dc249e82926178eac7ded78",
                network: "ethereum",
                price: 2693.8092751370864,
                symbol: "swETH",
                decimals: 18,
                supply: 138511.0762856778,
                pricePerShare: [1.06915012626592],
                tokens: [
                  {
                    type: "base-token",
                    price: 2519.58,
                    symbol: "ETH",
                    address: "0x0000000000000000000000000000000000000000",
                    network: "ethereum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 1.1099280520541648,
                    balanceRaw: "1109928052054164787",
                    balanceUSD: 2796.5525213946325,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [148089.13470006088],
                  liquidity: 373122422.0075794,
                },
                displayProps: {
                  label: "swETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 373122422.0075794,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.0007494999915437473,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2693.8092751370864,
                  },
                },
                balance: 1.0381405050483083,
                balanceRaw: "1038140505048308308",
                balanceUSD: 2796.5525213946325,
              },
            ],
            dataProps: {},
            displayProps: {
              label: "Deposited swETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
              ],
            },
            balanceUSD: 2796.5525213946325,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "3544329871",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "radiant-v2",
    appName: "Radiant V2",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/radiant-v2.png",
    network: "arbitrum",
    updatedAt: "2024-08-30T10:54:26.841Z",
    balanceUSD: 33.78644138179108,
    products: [
      {
        label: "Lending",
        assets: [
          {
            type: "app-token",
            uuid: "d77e8f25-5a2d-4ce8-bbfa-bf74578fc618",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "4137742168",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x0d914606f3424804fa1bbbe56ccc3416733acec6",
            network: "arbitrum",
            price: 1.001,
            symbol: "rDAI",
            decimals: 18,
            supply: 158450.2052399871,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 1.001,
                symbol: "DAI",
                address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.3771370755802552,
                balanceRaw: "377137075580255230",
                balanceUSD: 0.37751421265583546,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [158450.2052399871],
              liquidity: 158608.65544522705,
            },
            displayProps: {
              label: "DAI",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 158608.65544522705,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.000238016148359699,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 1.001,
              },
            },
            balance: 0.3771370755802552,
            balanceRaw: "377137075580255230",
            balanceUSD: 0.37751421265583546,
          },
          {
            type: "app-token",
            uuid: "13b120de-96f6-471b-b4f4-c27d3d2694c5",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "3211506020",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x0df5dfd95966753f01cb80e76dc20ea958238c46",
            network: "arbitrum",
            price: 2518.97,
            symbol: "rWETH",
            decimals: 18,
            supply: 6428.4666356312055,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 2518.97,
                symbol: "WETH",
                address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.001494395451409799,
                balanceRaw: "1494395451409799",
                balanceUSD: 3.764337310237741,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [6428.4666356312055],
              liquidity: 16193114.601155937,
            },
            displayProps: {
              label: "WETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 16193114.601155937,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.000023246530410950256,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 2518.97,
              },
            },
            balance: 0.001494395451409799,
            balanceRaw: "1494395451409799",
            balanceUSD: 3.764337310237741,
          },
          {
            type: "app-token",
            uuid: "e76e8631-89ad-49f9-b16c-92a8e2992763",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "2144566843",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x42c248d137512907048021b30d9da17f48b5b7b2",
            network: "arbitrum",
            price: 2963.22,
            symbol: "rWSTETH",
            decimals: 18,
            supply: 2968.7252533486426,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 2963.22,
                symbol: "wstETH",
                address: "0x5979d7b546e38e414f7e9822514be443a4800529",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.000203816385156245,
                balanceRaw: "203816385156245",
                balanceUSD: 0.6039527888226883,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [2968.7252533486426],
              liquidity: 8796986.045227764,
            },
            displayProps: {
              label: "wstETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x5979d7b546e38e414f7e9822514be443a4800529.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 8796986.045227764,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.000006865451254754733,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 2963.22,
              },
            },
            balance: 0.000203816385156245,
            balanceRaw: "203816385156245",
            balanceUSD: 0.6039527888226883,
          },
          {
            type: "app-token",
            uuid: "6f3b93da-b833-449c-aa52-3c13bdd49a2d",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "2807663930",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x48a29e756cc1c097388f3b2f3b570ed270423b3d",
            network: "arbitrum",
            price: 1,
            symbol: "rUSDC",
            decimals: 6,
            supply: 1297211.458354,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 1,
                symbol: "USDC",
                address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
                network: "arbitrum",
                decimals: "6",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 3.126698,
                balanceRaw: "3126698",
                balanceUSD: 3.126698,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [1297211.458354],
              liquidity: 1297211.458354,
            },
            displayProps: {
              label: "USDC",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 1297211.458354,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0002410322526727748,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 1,
              },
            },
            balance: 3.126698,
            balanceRaw: "3126698",
            balanceUSD: 3.126698,
          },
          {
            type: "app-token",
            uuid: "165888b1-6edd-4ac9-9b6d-7a8c054909cd",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "438679436",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x727354712bdfcd8596a3852fd2065b3c34f4f770",
            network: "arbitrum",
            price: 59463,
            symbol: "rWBTC",
            decimals: 8,
            supply: 270.99281646,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 59463,
                symbol: "WBTC",
                address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
                network: "arbitrum",
                decimals: "8",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.00001911,
                balanceRaw: "1911",
                balanceUSD: 1.13633793,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [270.99281646],
              liquidity: 16114045.845160978,
            },
            displayProps: {
              label: "WBTC",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 16114045.845160978,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.000007051847443646441,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 59463,
              },
            },
            balance: 0.00001911,
            balanceRaw: "1911",
            balanceUSD: 1.13633793,
          },
          {
            type: "app-token",
            uuid: "dc6859f9-d6de-4fe1-858f-8e4770cdf27f",
            createdAt: "2024-06-07T01:34:41.584Z",
            key: "1163378020",
            appId: "radiant-v2",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0xd69d402d1bdb9a2b8c3d88d98b9ceaf9e4cd72d9",
            network: "arbitrum",
            price: 1,
            symbol: "rUSDT",
            decimals: 6,
            supply: 1780574.497264,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 1,
                symbol: "USDT",
                address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
                network: "arbitrum",
                decimals: "6",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.834656,
                balanceRaw: "834656",
                balanceUSD: 0.834656,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [1780574.497264],
              liquidity: 1780574.497264,
            },
            displayProps: {
              label: "USDT",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 1780574.497264,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0000468756573388262,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 1,
              },
            },
            balance: 0.834656,
            balanceRaw: "834656",
            balanceUSD: 0.834656,
          },
        ],
        meta: [],
      },
      {
        label: "Locked",
        assets: [
          {
            type: "contract-position",
            address: "0x76ba3ec5f5adbf1c58c91e86502232317eea72de",
            key: "0x76ba3ec5f5adbf1c58c91e86502232317eea72de:lp",
            appId: "radiant-v2",
            groupId: "locked",
            network: "arbitrum",
            tokens: [
              {
                metaType: "locked",
                type: "app-token",
                uuid: "83b1280d-6469-431c-8052-d9468c0ae468",
                createdAt: "2024-06-04T17:38:13.026Z",
                key: "1454401905",
                appId: "balancer-v2",
                groupLabel: "Weighted Pools",
                groupId: "weighted-pool-v4",
                address: "0x32df62dc3aed2cd6224193052ce665dc18165841",
                network: "arbitrum",
                price: 0.5225380284960871,
                symbol: "RDNT-WETH",
                decimals: 18,
                supply: 29074999.69657024,
                pricePerShare: [5.461293680300923, 0.00004138679072325558],
                tokens: [
                  {
                    type: "base-token",
                    price: 0.076591,
                    symbol: "RDNT",
                    address: "0x3082cc23568ea640225c2467653db90e9250aaa0",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 134.56188098188997,
                    balanceRaw: "134561880981889971107",
                    balanceUSD: 10.306229026283935,
                  },
                  {
                    type: "base-token",
                    price: 2518.97,
                    symbol: "WETH",
                    address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.001019737214941029,
                    balanceRaw: "1019737214941029",
                    balanceUSD: 2.5686874523200034,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [158787112.0976303, 1203.320927720672],
                  liquidity: 15192793.019970143,
                },
                displayProps: {
                  label: "RDNT-WETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x3082cc23568ea640225c2467653db90e9250aaa0.png",
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 15192793.019970143,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00008474357849593899,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 0.5225380284960871,
                  },
                },
                balance: 24.639195190557025,
                balanceRaw: "24639195190557023949",
                balanceUSD: 12.87491647860394,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "arbitrum",
                address: "0x3082cc23568ea640225c2467653db90e9250aaa0",
                symbol: "RDNT",
                decimals: "18",
                price: 0.076532,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0,
                balanceRaw: "0",
                balanceUSD: 0,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "165888b1-6edd-4ac9-9b6d-7a8c054909cd",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "438679436",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x727354712bdfcd8596a3852fd2065b3c34f4f770",
                network: "arbitrum",
                price: 59463,
                symbol: "rWBTC",
                decimals: 8,
                supply: 270.99281646,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 59463,
                    symbol: "WBTC",
                    address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
                    network: "arbitrum",
                    decimals: "8",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.00001827,
                    balanceRaw: "1827",
                    balanceUSD: 1.08638901,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [270.99281646],
                  liquidity: 16114045.845160978,
                },
                displayProps: {
                  label: "WBTC",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 16114045.845160978,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.000006741876127442202,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 59463,
                  },
                },
                balance: 0.00001827,
                balanceRaw: "1827",
                balanceUSD: 1.08638901,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "dc6859f9-d6de-4fe1-858f-8e4770cdf27f",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "1163378020",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0xd69d402d1bdb9a2b8c3d88d98b9ceaf9e4cd72d9",
                network: "arbitrum",
                price: 1,
                symbol: "rUSDT",
                decimals: 6,
                supply: 1780574.497264,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 1,
                    symbol: "USDT",
                    address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
                    network: "arbitrum",
                    decimals: "6",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 1.143366,
                    balanceRaw: "1143366",
                    balanceUSD: 1.143366,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [1780574.497264],
                  liquidity: 1780574.497264,
                },
                displayProps: {
                  label: "USDT",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 1780574.497264,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00006421332001311243,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1,
                  },
                },
                balance: 1.143366,
                balanceRaw: "1143366",
                balanceUSD: 1.143366,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "6f3b93da-b833-449c-aa52-3c13bdd49a2d",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "2807663930",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x48a29e756cc1c097388f3b2f3b570ed270423b3d",
                network: "arbitrum",
                price: 1,
                symbol: "rUSDC",
                decimals: 6,
                supply: 1297211.458354,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 1,
                    symbol: "USDC",
                    address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
                    network: "arbitrum",
                    decimals: "6",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 2.331852,
                    balanceRaw: "2331852",
                    balanceUSD: 2.331852,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [1297211.458354],
                  liquidity: 1297211.458354,
                },
                displayProps: {
                  label: "USDC",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 1297211.458354,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00017975881919504705,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1,
                  },
                },
                balance: 2.331852,
                balanceRaw: "2331852",
                balanceUSD: 2.331852,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "d77e8f25-5a2d-4ce8-bbfa-bf74578fc618",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "4137742168",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x0d914606f3424804fa1bbbe56ccc3416733acec6",
                network: "arbitrum",
                price: 1.001,
                symbol: "rDAI",
                decimals: 18,
                supply: 158450.2052399871,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 1.001,
                    symbol: "DAI",
                    address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.38149423047955183,
                    balanceRaw: "381494230479551795",
                    balanceUSD: 0.38187572471003134,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [158450.2052399871],
                  liquidity: 158608.65544522705,
                },
                displayProps: {
                  label: "DAI",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 158608.65544522705,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00024076600588919685,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1.001,
                  },
                },
                balance: 0.38149423047955183,
                balanceRaw: "381494230479551795",
                balanceUSD: 0.38187572471003134,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "13b120de-96f6-471b-b4f4-c27d3d2694c5",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "3211506020",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x0df5dfd95966753f01cb80e76dc20ea958238c46",
                network: "arbitrum",
                price: 2518.97,
                symbol: "rWETH",
                decimals: 18,
                supply: 6428.4666356312055,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 2518.97,
                    symbol: "WETH",
                    address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.001336347652289565,
                    balanceRaw: "1336347652289565",
                    balanceUSD: 3.366219645687845,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [6428.4666356312055],
                  liquidity: 16193114.601155937,
                },
                displayProps: {
                  label: "WETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 16193114.601155937,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.000020787969013987892,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2518.97,
                  },
                },
                balance: 0.001336347652289565,
                balanceRaw: "1336347652289565",
                balanceUSD: 3.366219645687845,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "e76e8631-89ad-49f9-b16c-92a8e2992763",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "2144566843",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x42c248d137512907048021b30d9da17f48b5b7b2",
                network: "arbitrum",
                price: 2963.22,
                symbol: "rWSTETH",
                decimals: 18,
                supply: 2968.7252533486426,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 2963.22,
                    symbol: "wstETH",
                    address: "0x5979d7b546e38e414f7e9822514be443a4800529",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.000253480586654726,
                    balanceRaw: "253480586654726",
                    balanceUSD: 0.7511187439870171,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [2968.7252533486426],
                  liquidity: 8796986.045227764,
                },
                displayProps: {
                  label: "wstETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x5979d7b546e38e414f7e9822514be443a4800529.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 8796986.045227764,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.000008538364618578518,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2963.22,
                  },
                },
                balance: 0.000253480586654726,
                balanceRaw: "253480586654726",
                balanceUSD: 0.7511187439870171,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "afb5fac6-d4fc-4718-87a2-2dc3b7745015",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "539632629",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x2dade5b7df9da3a7e1c9748d169cd6dff77e3d01",
                network: "arbitrum",
                price: 0.511837,
                symbol: "rARB",
                decimals: 18,
                supply: 5443702.205929699,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 0.511837,
                    symbol: "ARB",
                    address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
                    network: "arbitrum",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 1.405585594083586,
                    balanceRaw: "1405585594083586010",
                    balanceUSD: 0.7194307137189604,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [5443702.205929699],
                  liquidity: 2786288.2059764396,
                },
                displayProps: {
                  label: "ARB",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x912ce59144191c1204e64559fe8253a0e49e6548.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 2786288.2059764396,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.00002582039834127065,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 0.511837,
                  },
                },
                balance: 1.405585594083586,
                balanceRaw: "1405585594083586010",
                balanceUSD: 0.7194307137189604,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "arbitrum",
                address: "0x040d1edc9569d4bab2d15287dc5a4f10f56a56b8",
                symbol: "BAL",
                decimals: "18",
                price: 1.88,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.04338299282859076,
                balanceRaw: "43382992828590761",
                balanceUSD: 0.08156002651775063,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "14562836-4e0b-4da0-8967-5150462b9198",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "1706408627",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x3a2d44e354f2d88ef6da7a5a4646fd70182a7f55",
                network: "arbitrum",
                price: 1,
                symbol: "rUSDCn",
                decimals: 6,
                supply: 10834742.594169,
                pricePerShare: [1],
                tokens: [
                  {
                    type: "base-token",
                    price: 1,
                    symbol: "USDC",
                    address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                    network: "arbitrum",
                    decimals: "6",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 1.18913,
                    balanceRaw: "1189130",
                    balanceUSD: 1.18913,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [10834742.594169],
                  liquidity: 10834742.594169,
                },
                displayProps: {
                  label: "USDC",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 10834742.594169,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.000010975156905342278,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1,
                  },
                },
                balance: 1.18913,
                balanceRaw: "1189130",
                balanceUSD: 1.18913,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "e49387c9-e7b2-4776-9bbb-9bc4336bf765",
                createdAt: "2024-06-07T01:34:41.584Z",
                key: "2246618464",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0xb11a56da177c5532d5e29cc8363d145bd0822c81",
                network: "arbitrum",
                price: 2635.1000103293554,
                symbol: "rweETH",
                decimals: 18,
                supply: 5088.749618518695,
                pricePerShare: [1],
                tokens: [
                  {
                    key: "2165277446",
                    type: "app-token",
                    uuid: "92283360-6cc1-4b24-b42c-547cae4aac97",
                    appId: "ether-fi",
                    price: 2635.1000103293554,
                    supply: 120773.40989616053,
                    symbol: "weETH",
                    tokens: [
                      {
                        type: "base-token",
                        price: 2519.58,
                        symbol: "ETH",
                        address: "0x0000000000000000000000000000000000000000",
                        network: "arbitrum",
                        decimals: "18",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0.000006781605207722,
                        balanceRaw: "6781605207722",
                        balanceUSD: 0.017086796849272196,
                      },
                    ],
                    address: "0x35751007a407ca6feffe80b3cb397736d2cf4dbe",
                    groupId: "wrapped-eeth",
                    network: "arbitrum",
                    decimals: 18,
                    metaType: "supplied",
                    createdAt: "2024-07-25T01:32:18.739Z",
                    dataProps: {
                      apy: 0,
                      isDebt: false,
                      reserves: [126310.7397522143],
                      liquidity: 318250013.6648841,
                    },
                    groupLabel: "Wrapped eETH",
                    displayProps: {
                      label: "weETH",
                      images: [
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x0000000000000000000000000000000000000000.png",
                      ],
                      statsItems: [
                        {
                          label: "Liquidity",
                          value: {
                            type: "dollar",
                            value: 318250013.6648841,
                          },
                        },
                        {
                          label: "Share",
                          value: {
                            type: "pct",
                            value: 5.3689854251710914e-9,
                          },
                        },
                      ],
                      secondaryLabel: {
                        type: "dollar",
                        value: 2635.1000103293554,
                      },
                    },
                    pricePerShare: [1.0458489154261248],
                    balance: 0.000006484306774807,
                    balanceRaw: "6484306774807",
                    balanceUSD: 0.017086796849272196,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [5088.749618518695],
                  liquidity: 13409364.172322115,
                },
                displayProps: {
                  label: "weETH",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x0000000000000000000000000000000000000000.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 13409364.172322115,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 1.2742436277881843e-7,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 2635.1000103293554,
                  },
                },
                balance: 0.000006484306774807,
                balanceRaw: "6484306774807",
                balanceUSD: 0.017086796849272196,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "e52bae3d-e8f2-432f-8044-4c1118f74ec9",
                createdAt: "2024-06-20T17:48:24.898Z",
                key: "2359343583",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0x876f38f474e48a104c4af4f06ca488099c436c93",
                network: "arbitrum",
                price: 1.6918403980801253,
                symbol: "rgmBTC",
                decimals: 18,
                supply: 2331141.959910352,
                pricePerShare: [1],
                tokens: [
                  {
                    key: "2055160072",
                    type: "app-token",
                    uuid: "b4f61444-656d-402a-9453-5e36371e3dad",
                    appId: "gmx-v2",
                    price: 1.6918403980801253,
                    supply: 71500240.98269059,
                    symbol: "GM",
                    tokens: [
                      {
                        type: "base-token",
                        price: 1,
                        symbol: "USDC",
                        address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                        network: "arbitrum",
                        decimals: "6",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0,
                        balanceRaw: "0",
                        balanceUSD: 0,
                      },
                      {
                        type: "base-token",
                        price: 59463,
                        symbol: "WBTC",
                        address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
                        network: "arbitrum",
                        decimals: "8",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0,
                        balanceRaw: "0",
                        balanceUSD: 0,
                      },
                    ],
                    address: "0x47c031236e19d024b42f8ae6780e44a573170703",
                    groupId: "gm-pool",
                    network: "arbitrum",
                    decimals: 18,
                    metaType: "supplied",
                    createdAt: "2024-04-17T17:58:08.798Z",
                    dataProps: {
                      apy: 0,
                      isDebt: false,
                      reserves: [59851303.559372, 1027.79362978],
                      liquidity: 120966996.16698013,
                    },
                    groupLabel: "GM Pools",
                    displayProps: {
                      label: "BTC/USD",
                      images: [
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                      ],
                      statsItems: [
                        {
                          label: "Liquidity",
                          value: {
                            type: "dollar",
                            value: 120966996.16698013,
                          },
                        },
                        {
                          label: "Share",
                          value: {
                            type: "pct",
                            value: 0,
                          },
                        },
                      ],
                      secondaryLabel: {
                        type: "dollar",
                        value: 1.6918403980801253,
                      },
                    },
                    pricePerShare: [
                      0.8370783473843303, 0.000014374687632574796,
                    ],
                    balance: 0,
                    balanceRaw: "0",
                    balanceUSD: 0,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [2331141.959910352],
                  liquidity: 3943920.141436013,
                },
                displayProps: {
                  label: "GM",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 3943920.141436013,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1.6918403980801253,
                  },
                },
                balance: 0,
                balanceRaw: "0",
                balanceUSD: 0,
              },
              {
                metaType: "claimable",
                type: "app-token",
                uuid: "34785526-c67e-4922-8bea-99c2b649c44b",
                createdAt: "2024-06-24T18:00:23.185Z",
                key: "4006033311",
                appId: "radiant-v2",
                groupLabel: "Lending",
                groupId: "supply",
                address: "0xd15a6568dc891fd04aa2f64af56c66c2bede59d6",
                network: "arbitrum",
                price: 1.4400453937164988,
                symbol: "rgmETH",
                decimals: 18,
                supply: 3017695.2898904067,
                pricePerShare: [1],
                tokens: [
                  {
                    key: "1630052377",
                    type: "app-token",
                    uuid: "5fd7b420-1d22-4b04-9fc3-52e397fd99b6",
                    appId: "gmx-v2",
                    price: 1.4400453937164988,
                    supply: 65059850.738257185,
                    symbol: "GM",
                    tokens: [
                      {
                        type: "base-token",
                        price: 1,
                        symbol: "USDC",
                        address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                        network: "arbitrum",
                        decimals: "6",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0,
                        balanceRaw: "0",
                        balanceUSD: 0,
                      },
                      {
                        type: "base-token",
                        price: 2518.97,
                        symbol: "WETH",
                        address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                        network: "arbitrum",
                        decimals: "18",
                        metaType: "supplied",
                        priceSource: "coingecko",
                        liquidityUsd: null,
                        balance: 0,
                        balanceRaw: "0",
                        balanceUSD: 0,
                      },
                    ],
                    address: "0x70d95587d40a2caf56bd97485ab3eec10bee6336",
                    groupId: "gm-pool",
                    network: "arbitrum",
                    decimals: 18,
                    metaType: "supplied",
                    createdAt: "2024-04-17T17:58:08.798Z",
                    dataProps: {
                      apy: 0,
                      isDebt: false,
                      reserves: [47057051.764433, 18512.362833649157],
                      liquidity: 93689138.37151021,
                    },
                    groupLabel: "GM Pools",
                    displayProps: {
                      label: "WETH/USD",
                      images: [
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                        "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                      ],
                      statsItems: [
                        {
                          label: "Liquidity",
                          value: {
                            type: "dollar",
                            value: 93689138.37151021,
                          },
                        },
                        {
                          label: "Share",
                          value: {
                            type: "pct",
                            value: 0,
                          },
                        },
                      ],
                      secondaryLabel: {
                        type: "dollar",
                        value: 1.4400453937164988,
                      },
                    },
                    pricePerShare: [0.7232886523786937, 0.00028454357985121105],
                    balance: 0,
                    balanceRaw: "0",
                    balanceUSD: 0,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [3017695.2898904067],
                  liquidity: 4345618.2018466545,
                },
                displayProps: {
                  label: "GM",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 4345618.2018466545,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 1.4400453937164988,
                  },
                },
                balance: 0,
                balanceRaw: "0",
                balanceUSD: 0,
              },
            ],
            dataProps: {},
            displayProps: {
              label: "Locked RDNT / WETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x3082cc23568ea640225c2467653db90e9250aaa0.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x3082cc23568ea640225c2467653db90e9250aaa0.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x5979d7b546e38e414f7e9822514be443a4800529.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x912ce59144191c1204e64559fe8253a0e49e6548.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x040d1edc9569d4bab2d15287dc5a4f10f56a56b8.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x0000000000000000000000000000000000000000.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xaf88d065e77c8cc2239327c5edb3a432268e5831.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
              ],
            },
            balanceUSD: 23.942945140074816,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "2250528561",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "gmx",
    appName: "GMX",
    appImage: "https://storage.googleapis.com/zapper-fi-assets/apps/gmx.png",
    network: "arbitrum",
    updatedAt: "2024-08-30T10:54:26.922Z",
    balanceUSD: 0.5535362742825682,
    products: [
      {
        label: "esGMX",
        assets: [
          {
            type: "app-token",
            uuid: "542b9a9f-6512-4b2d-a0d2-b69a46dfb589",
            createdAt: "2024-05-27T00:12:38.715Z",
            key: "212181180",
            appId: "gmx",
            groupLabel: "esGMX",
            groupId: "es-gmx-2",
            address: "0xf42ae1d54fd613c9bb14810b0588faaa09a426ca",
            network: "arbitrum",
            price: 25.71,
            symbol: "esGMX",
            decimals: 18,
            supply: 2083178.7319929535,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 25.71,
                symbol: "GMX",
                address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.021529998999710937,
                balanceRaw: "21529998999710938",
                balanceUSD: 0.5535362742825682,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [2083178.7319929535],
              liquidity: 53558525.199538834,
            },
            displayProps: {
              label: "esGMX",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 53558525.199538834,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0000010335166478544753,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 25.71,
              },
            },
            balance: 0.021529998999710937,
            balanceRaw: "21529998999710938",
            balanceUSD: 0.5535362742825682,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "535528983",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "kelp",
    appName: "Kelp",
    appImage: "https://storage.googleapis.com/zapper-fi-assets/apps/kelp.png",
    network: "blast",
    updatedAt: "2024-08-30T10:54:26.646Z",
    balanceUSD: 0.2008860078037949,
    products: [
      {
        label: "rsETH",
        assets: [
          {
            type: "app-token",
            uuid: "3eac02c0-b8cc-45e3-a1ca-c5b45a2e7181",
            createdAt: "2024-06-06T08:08:07.471Z",
            key: "981427871",
            appId: "kelp",
            groupLabel: "rsETH",
            groupId: "rs-eth",
            address: "0x4186bfc76e2e237523cbc30fd220fe055156b41f",
            network: "blast",
            price: 2575.4616385101945,
            symbol: "rsETH",
            decimals: 18,
            supply: 3129.616051,
            pricePerShare: [1.0221708360494501],
            tokens: [
              {
                type: "base-token",
                price: 2519.6,
                symbol: "ETH",
                address: "0x0000000000000000000000000000000000000000",
                network: "blast",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.000079729325211857,
                balanceRaw: "79729325211857",
                balanceUSD: 0.2008860078037949,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [3199.0022553644485],
              liquidity: 8060206.082616264,
            },
            displayProps: {
              label: "rsETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/blast/0x0000000000000000000000000000000000000000.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 8060206.082616264,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.000002492318505814054,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 2575.4616385101945,
              },
            },
            balance: 0.000078,
            balanceRaw: "78000000000000",
            balanceUSD: 0.2008860078037949,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "3657173920",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "districtone",
    appName: "DistrictOne",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/districtone.png",
    network: "blast",
    updatedAt: "2024-08-30T10:54:26.449Z",
    balanceUSD: 43.594175900683794,
    products: [
      {
        label: "Locked",
        assets: [
          {
            type: "contract-position",
            address: "0xde600c085ce67f756bdab2ad2e6ef3e797688834",
            key: "0xde600c085ce67f756bdab2ad2e6ef3e797688834:default",
            appId: "districtone",
            groupId: "locked",
            network: "blast",
            tokens: [
              {
                metaType: "locked",
                type: "app-token",
                uuid: "fa9d7998-8f95-437d-8dff-c27489fc7b45",
                createdAt: "2024-08-15T12:25:29.528Z",
                key: "281997666",
                appId: "thruster-v2",
                groupLabel: "Pools",
                groupId: "pool",
                address: "0x254b286ae84432f4cdcf41851627a2dd4d8a9894",
                network: "blast",
                price: 11.057158822398874,
                symbol: "T-LP",
                decimals: 18,
                supply: 77079.21012153535,
                pricePerShare: [0.002197029908753148, 749.0415415618285],
                tokens: [
                  {
                    type: "base-token",
                    price: 2521.98,
                    symbol: "WETH",
                    address: "0x4300000000000000000000000000000000000004",
                    network: "blast",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "coingecko",
                    liquidityUsd: null,
                    balance: 0.008662054135211277,
                    balanceRaw: "8662054135211276",
                    balanceUSD: 21.845527287920135,
                  },
                  {
                    type: "base-token",
                    price: 0.0073644691609754676,
                    symbol: "OLE",
                    address: "0x73c369f61c90f03eb0dd172e95c90208a28dc5bc",
                    network: "blast",
                    decimals: "18",
                    metaType: "supplied",
                    priceSource: "ocp-v2",
                    liquidityUsd: 426448.402304757,
                    balance: 2953.186188627196,
                    balanceRaw: "2953186188627196031844",
                    balanceUSD: 21.748648612763663,
                  },
                ],
                dataProps: {
                  apy: 0,
                  isDebt: false,
                  reserves: [169.34532998008152, 57735530.371802926],
                  liquidity: 852277.0682188711,
                },
                displayProps: {
                  label: "WETH / OLE",
                  images: [
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/blast/0x4300000000000000000000000000000000000004.png",
                    "https://storage.googleapis.com/zapper-fi-assets/tokens/blast/0x73c369f61c90f03eb0dd172e95c90208a28dc5bc.png",
                  ],
                  statsItems: [
                    {
                      label: "Liquidity",
                      value: {
                        type: "dollar",
                        value: 852277.0682188711,
                      },
                    },
                    {
                      label: "Share",
                      value: {
                        type: "pct",
                        value: 0.005115023919602691,
                      },
                    },
                  ],
                  secondaryLabel: {
                    type: "dollar",
                    value: 11.057158822398874,
                  },
                },
                balance: 3.942620034757351,
                balanceRaw: "3942620034757350970",
                balanceUSD: 43.594175900683794,
              },
            ],
            dataProps: {},
            displayProps: {
              label: "T-LP Farm",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/blast/0x4300000000000000000000000000000000000004.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/blast/0x73c369f61c90f03eb0dd172e95c90208a28dc5bc.png",
              ],
            },
            balanceUSD: 43.594175900683794,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "2470692583",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "sonne",
    appName: "Sonne",
    appImage: "https://storage.googleapis.com/zapper-fi-assets/apps/sonne.png",
    network: "optimism",
    updatedAt: "2024-08-30T10:54:26.559Z",
    balanceUSD: 2.067694565250881,
    products: [
      {
        label: "Staking",
        assets: [
          {
            type: "contract-position",
            address: "0xdc05d85069dc4aba65954008ff99f2d73ff12618",
            key: "0xdc05d85069dc4aba65954008ff99f2d73ff12618:default",
            appId: "sonne",
            groupId: "staking",
            network: "optimism",
            tokens: [
              {
                metaType: "supplied",
                type: "base-token",
                network: "optimism",
                address: "0x1db2466d9f5e10d7090e7152b68d62703a2245f0",
                symbol: "SONNE",
                decimals: "18",
                price: 0.00630396,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 125.24605964442706,
                balanceRaw: "125246059644427063069",
                balanceUSD: 0.7895461501560824,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "optimism",
                address: "0x1db2466d9f5e10d7090e7152b68d62703a2245f0",
                symbol: "SONNE",
                decimals: "18",
                price: 0.00630396,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 28.74477847278134,
                balanceRaw: "28744778472781342652",
                balanceUSD: 0.18120593370127466,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "optimism",
                address: "0x3c8b650257cfb5f272f799f5e2b4e65093a11a05",
                symbol: "VELO",
                decimals: "18",
                price: 0.083087,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 1.6620134914577172,
                balanceRaw: "1662013491457717337",
                balanceUSD: 0.13809171496474734,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "optimism",
                address: "0x4200000000000000000000000000000000000042",
                symbol: "OP",
                decimals: "18",
                price: 1.43,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.16586492037264466,
                balanceRaw: "165864920372644670",
                balanceUSD: 0.23718683613288186,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "optimism",
                address: "0x9560e827af36c94d2ac33a39bce1fe78631088db",
                symbol: "VELO",
                decimals: "18",
                price: 0.083087,
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 8.68564192106942,
                balanceRaw: "8685641921069420357",
                balanceUSD: 0.7216639302958948,
              },
            ],
            dataProps: {},
            displayProps: {
              label: "Staking",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x1db2466d9f5e10d7090e7152b68d62703a2245f0.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x1db2466d9f5e10d7090e7152b68d62703a2245f0.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x3c8b650257cfb5f272f799f5e2b4e65093a11a05.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x4200000000000000000000000000000000000042.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x9560e827af36c94d2ac33a39bce1fe78631088db.png",
              ],
            },
            balanceUSD: 2.067694565250881,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "3974788538",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "sync-swap",
    appName: "SyncSwap",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/sync-swap.png",
    network: "zksync",
    updatedAt: "2024-08-30T10:54:26.497Z",
    balanceUSD: 357.89254285158347,
    products: [
      {
        label: "Classic Pools",
        assets: [
          {
            type: "app-token",
            uuid: "7ab224ad-8b4c-457c-ae16-49950380f71e",
            createdAt: "2024-07-09T15:28:26.159Z",
            key: "967739736",
            appId: "sync-swap",
            groupLabel: "Classic Pools",
            groupId: "classic-pools",
            address: "0x45856bd6bb9f076f4c558a4d5932c6c8d832b0d0",
            network: "zksync",
            price: 38.75816683336002,
            symbol: "ZK/WETH cSLP",
            decimals: 18,
            supply: 104554.41202111806,
            pricePerShare: [179.1850172892663, 0.007680052865582601],
            tokens: [
              {
                type: "base-token",
                price: 0.108186,
                symbol: "ZK",
                address: "0x5a7d6b2f92c77fad6ccabd7ee0624e64907eaf3e",
                network: "zksync",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 1654.5927405256748,
                balanceRaw: "1654592740525674889845",
                balanceUSD: 179.00377022651065,
              },
              {
                type: "base-token",
                price: 2522.49,
                symbol: "WETH",
                address: "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91",
                network: "zksync",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.07091753490601463,
                balanceRaw: "70917534906014633",
                balanceUSD: 178.88877262507282,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [18734584.12567311, 802.9834116520917],
              liquidity: 4052337.344278356,
            },
            displayProps: {
              label: "ZK/WETH cSLP",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/zksync/0x5a7d6b2f92c77fad6ccabd7ee0624e64907eaf3e.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/zksync/0x5aea5775959fbc2557cc8789bc1bf90a239d9a91.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 4052337.344278356,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.008831755908893053,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 38.75816683336002,
              },
            },
            balance: 9.233990461683483,
            balanceRaw: "9233990461683482357",
            balanceUSD: 357.89254285158347,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "2435506928",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "layer-bank",
    appName: "LayerBank",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/layer-bank.png",
    network: "mode",
    updatedAt: "2024-08-30T10:54:26.469Z",
    balanceUSD: 127.50290109537342,
    products: [
      {
        label: "Lending",
        assets: [
          {
            type: "app-token",
            uuid: "b10f3543-8d7c-42fc-9752-10fbc11461af",
            createdAt: "2024-08-15T03:02:20.776Z",
            key: "1838028677",
            appId: "layer-bank",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0xe855b8018c22a05f84724e93693caf166912add5",
            network: "mode",
            price: 2551.558290120816,
            symbol: "lETH",
            decimals: 18,
            supply: 2.45e-16,
            pricePerShare: [1.0126919129858214],
            tokens: [
              {
                type: "base-token",
                price: 2519.58,
                symbol: "ETH",
                address: "0x0000000000000000000000000000000000000000",
                network: "mode",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.050604823460804346,
                balanceRaw: "50604823460804345",
                balanceUSD: 127.50290109537342,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [2.481095186815262e-16],
              liquidity: 6.251317810795999e-13,
            },
            displayProps: {
              label: "lETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/mode/0x0000000000000000000000000000000000000000.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 6.251317810795999e-13,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 20396163649715020,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 2551.558290120816,
              },
            },
            balance: 0.04997060094180179,
            balanceRaw: "49970600941801792",
            balanceUSD: 127.50290109537342,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "3004712565",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "kim-exchange",
    appName: "Kim Exchange",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/kim-exchange.png",
    network: "mode",
    updatedAt: "2024-08-30T10:54:26.469Z",
    balanceUSD: 0.36541981930616996,
    products: [
      {
        label: "Staked",
        assets: [
          {
            type: "app-token",
            uuid: "df983ec4-608e-4074-aa6e-45b3b8333cb3",
            createdAt: "2024-08-17T18:35:06.523Z",
            key: "1771469668",
            appId: "kim-exchange",
            groupLabel: "Staked",
            groupId: "staked",
            address: "0x4d850fe01f07bed416558a34dbde88ba60ae19be",
            network: "mode",
            price: 0.00649927,
            symbol: "xKIM",
            decimals: 18,
            supply: 4.914977e-11,
            pricePerShare: [1],
            tokens: [
              {
                type: "base-token",
                price: 0.00649927,
                symbol: "KIM",
                address: "0x6863fb62ed27a9ddf458105b507c15b5d741d62e",
                network: "mode",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 56.22474821113294,
                balanceRaw: "56224748211132940000",
                balanceUSD: 0.36541981930616996,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [4.914977e-11],
              liquidity: 3.194376256679e-13,
            },
            displayProps: {
              label: "xKIM",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/mode/0x6863fb62ed27a9ddf458105b507c15b5d741d62e.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 3.194376256679e-13,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 114394733100750.9,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 0.00649927,
              },
            },
            balance: 56.22474821113294,
            balanceRaw: "56224748211132940000",
            balanceUSD: 0.36541981930616996,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "2096904816",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "ionic-protocol",
    appName: "Ionic Protcool",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/ionic-protocol.png",
    network: "mode",
    updatedAt: "2024-08-30T10:54:26.476Z",
    balanceUSD: 127.12660866280865,
    products: [
      {
        label: "Lending",
        assets: [
          {
            type: "app-token",
            uuid: "82a0d7b8-f2c1-46f2-a63a-86847589d434",
            createdAt: "2024-08-14T14:52:21.964Z",
            key: "1531617835",
            appId: "ionic-protocol",
            groupLabel: "Lending",
            groupId: "supply",
            address: "0x71ef7eda2be775e5a7aa8afd02c45f059833e9d2",
            network: "mode",
            price: 508.5064346513364,
            symbol: "ionWETH",
            decimals: 18,
            supply: 23843.217558424007,
            pricePerShare: [0.201697023827053],
            tokens: [
              {
                type: "base-token",
                price: 2521.14,
                symbol: "WETH",
                address: "0x4200000000000000000000000000000000000006",
                network: "mode",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.05042425595675316,
                balanceRaw: "50424255956753162",
                balanceUSD: 127.12660866280865,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [4809.106019995055],
              liquidity: 12124429.551250335,
            },
            displayProps: {
              label: "ionWETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/mode/0x4200000000000000000000000000000000000006.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 12124429.551250335,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.0010485162054465376,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 508.5064346513364,
              },
            },
            balance: 0.24999999999994998,
            balanceRaw: "249999999999949983",
            balanceUSD: 127.12660866280865,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "2595742118",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "balancer-v2",
    appName: "Balancer V2",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/balancer-v2.png",
    network: "arbitrum",
    updatedAt: "2024-08-30T10:54:26.265Z",
    balanceUSD: 27.53121424679899,
    products: [
      {
        label: "Weighted Pools",
        assets: [
          {
            type: "app-token",
            uuid: "83b1280d-6469-431c-8052-d9468c0ae468",
            createdAt: "2024-06-04T17:38:13.026Z",
            key: "1454401905",
            appId: "balancer-v2",
            groupLabel: "Weighted Pools",
            groupId: "weighted-pool-v4",
            address: "0x32df62dc3aed2cd6224193052ce665dc18165841",
            network: "arbitrum",
            price: 0.5225380284960871,
            symbol: "RDNT-WETH",
            decimals: 18,
            supply: 29074999.69657024,
            pricePerShare: [5.461293680300923, 0.00004138679072325558],
            tokens: [
              {
                type: "base-token",
                price: 0.076591,
                symbol: "RDNT",
                address: "0x3082cc23568ea640225c2467653db90e9250aaa0",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 287.7418258146545,
                balanceRaw: "287741825814654470468",
                balanceUSD: 22.038434180970203,
              },
              {
                type: "base-token",
                price: 2518.97,
                symbol: "WETH",
                address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                network: "arbitrum",
                decimals: "18",
                metaType: "supplied",
                priceSource: "coingecko",
                liquidityUsd: null,
                balance: 0.002180565892340436,
                balanceRaw: "2180565892340436",
                balanceUSD: 5.4927800658287875,
              },
            ],
            dataProps: {
              apy: 0,
              isDebt: false,
              reserves: [158787112.0976303, 1203.320927720672],
              liquidity: 15192793.019970143,
            },
            displayProps: {
              label: "RDNT-WETH",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x3082cc23568ea640225c2467653db90e9250aaa0.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png",
              ],
              statsItems: [
                {
                  label: "Liquidity",
                  value: {
                    type: "dollar",
                    value: 15192793.019970143,
                  },
                },
                {
                  label: "Share",
                  value: {
                    type: "pct",
                    value: 0.00018121233015292595,
                  },
                },
              ],
              secondaryLabel: {
                type: "dollar",
                value: 0.5225380284960871,
              },
            },
            balance: 52.687484442111085,
            balanceRaw: "52687484442111085040",
            balanceUSD: 27.53121424679899,
          },
        ],
        meta: [],
      },
    ],
  },
  {
    key: "481498145",
    address: "0x6d9bd8a83533de4e3b26370f18e28e5e3ec86dba",
    appId: "velodrome-v2",
    appName: "Velodrome V2",
    appImage:
      "https://storage.googleapis.com/zapper-fi-assets/apps/velodrome-v2.png",
    network: "optimism",
    updatedAt: "2024-08-28T09:16:06.830Z",
    balanceUSD: 34.81922288541098,
    products: [
      {
        label: "Voting Escrow",
        assets: [
          {
            key: "151336454",
            type: "contract-position",
            appId: "velodrome-v2",
            groupId: "voting-escrow",
            network: "optimism",
            address: "0xfaf8fd17d9840595845582fcb047df13f006787d",
            tokens: [
              {
                metaType: "supplied",
                type: "base-token",
                network: "optimism",
                address: "0x9560e827af36c94d2ac33a39bce1fe78631088db",
                symbol: "VELO",
                decimals: 18,
                price: 0.083158,
                balance: 415.804013422019,
                balanceRaw: "415804013422019000000",
                balanceUSD: 34.57743014814825,
              },
              {
                metaType: "claimable",
                type: "base-token",
                network: "optimism",
                address: "0x9560e827af36c94d2ac33a39bce1fe78631088db",
                symbol: "VELO",
                decimals: 18,
                price: 0.083158,
                balance: 2.539132004432951,
                balanceRaw: "2539132004432951000",
                balanceUSD: 0.21114913922463532,
              },
            ],
            dataProps: {},
            displayProps: {
              label: "Voting Escrow VELO",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x9560e827af36c94d2ac33a39bce1fe78631088db.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x9560e827af36c94d2ac33a39bce1fe78631088db.png",
              ],
              statsItems: [],
            },
            balanceUSD: 34.78857928737289,
          },
        ],
        meta: [],
      },
      {
        label: "Bribe",
        assets: [
          {
            key: "3667577530",
            type: "contract-position",
            appId: "velodrome-v2",
            tokens: [
              {
                type: "base-token",
                price: 2596.86,
                symbol: "WETH",
                address: "0x4200000000000000000000000000000000000006",
                balance: 0,
                network: "optimism",
                decimals: 18,
                metaType: "claimable",
                balanceRaw: "0",
                balanceUSD: 0,
              },
              {
                type: "base-token",
                price: 0.496898,
                symbol: "MAI",
                address: "0xdfa46478f9e5ea86d57387849598dbfb2e964b02",
                balance: 0.06166979548737656,
                network: "optimism",
                decimals: 18,
                metaType: "claimable",
                balanceRaw: "61669795487376560",
                balanceUSD: 0.030643598038086438,
              },
            ],
            address: "0x0cda754e20ae7ad74f4794aa86cfe70b1f40f34b",
            groupId: "bribe",
            network: "optimism",
            dataProps: {},
            balanceUSD: 0.030643598038086438,
            displayProps: {
              label: "WETH / MAI",
              images: [
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x4200000000000000000000000000000000000006.png",
                "https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0xdfa46478f9e5ea86d57387849598dbfb2e964b02.png",
              ],
              statsItems: [],
            },
          },
        ],
        meta: [],
      },
    ],
  },
];

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
  ZapperDEFIData,
  sortByNetwork,
  getTotalBalanceToken,
  getTotalBalanceDefi,
  getTokensByNetwork,
  getIconbySymbol,
  getNetworkLogobyName,
};
