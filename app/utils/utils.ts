const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const getUserTokens = async (address: string) => {
  const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [address, "erc20"],
  });

  try {
    await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result.tokenBalances);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return [];
      });
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const convertTokenBalanceToUSD = (balance: string, decimals: number) => {
  const balanceInUSD = parseInt(balance) / 10 ** decimals;
  return balanceInUSD;
};

export const getTokenDecimals = async (address: string) => {
  const url = `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getTokenMetadata",
    params: [address],
  });
  try {
    await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result.decimals);
        return data.result.decimals;
      })
      .catch((error) => {
        console.error("Error:", error);
        return 0;
      });
  } catch (error) {
    console.error("Error:", error);
    return 0;
  }
};

export const getTokenPrice = async (address: string) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${address}&vs_currencies=usd`;
  const response = await fetch(url);
  const data = await response.json();
  return data[address].usd;
};
