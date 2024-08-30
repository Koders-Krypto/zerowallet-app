const BASE_URL = "https://api.zapper.xyz/v2/";
const GET_TOKEN_DATA = `${BASE_URL}balances/tokens?addresses%5B%5D=`;
const GET_DEFI_DATA = `${BASE_URL}balances/apps?addresses%5B%5D=`;
const GET_NFT_DATA = `${BASE_URL}nft/user/tokens?userAddress=`;

export { GET_TOKEN_DATA, GET_DEFI_DATA, GET_NFT_DATA };
