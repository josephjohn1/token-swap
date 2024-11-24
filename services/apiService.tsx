const API_BASE_URL = "https://api.mockdex.com"; // Replace with actual API

export const fetchTokenPrice = async (inputToken: string, outputToken: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/prices?input=${inputToken}&output=${outputToken}`);
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

export const fetchOrderBook = async (pair: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orderbook?pair=${pair}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order book:", error);
    return { bids: [], asks: [] };
  }
};
