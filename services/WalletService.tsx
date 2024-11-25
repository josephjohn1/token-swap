

export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask is required!");
    return null;
  }
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};

export const fetchTokenBalance = async (address: string, tokenAddress: string) => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is required to fetch the token balance.");
    }

    // Define ERC-20 function signatures
    const balanceOfSignature = "0x70a08231"; // balanceOf(address)
    const decimalsSignature = "0x313ce567"; // decimals()

    // Encode address for balanceOf call
    const balanceOfData = `${balanceOfSignature}${address.slice(2).padStart(64, "0")}`;

    // Fetch balance
    const balance = await window.ethereum.request({
      method: "eth_call",
      params: [
        {
          to: tokenAddress,
          data: balanceOfData,
        },
        "latest",
      ],
    });

    // Fetch decimals
    const decimals = await window.ethereum.request({
      method: "eth_call",
      params: [
        {
          to: tokenAddress,
          data: decimalsSignature,
        },
        "latest",
      ],
    });

    // Convert the values to readable numbers
    const balanceValue = parseInt(balance, 16) / 10 ** parseInt(decimals, 16);

    return balanceValue.toString();
  } catch (error) {
    console.error("Error fetching token balance:", error);
    return "0.0";
  }
};
