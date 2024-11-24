"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Metrics from "./Metrices"
import Modal from "./Modal";
import { connectWallet, fetchTokenBalance } from "../../services/WalletService";
import { fetchTokenPrice } from "../../services/apiService";

const SwapInterface = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [inputToken, setInputToken] = useState<string>("ETH");
  const [outputToken, setOutputToken] = useState<string>("USDC");
  const [inputAmount, setInputAmount] = useState<string>("0");
  const [outputAmount, setOutputAmount] = useState<string>("0");
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [tokenBalances, setTokenBalances] = useState<{ [key: string]: string }>({});

  const supportedTokens = [
    { symbol: "ETH", address: "0x..." },
    { symbol: "USDC", address: "0x..." },
    { symbol: "DAI", address: "0x..." },
    { symbol: "WBTC", address: "0x..." },
  ];

  const handleWalletConnect = async () => {
    const address = await connectWallet();
    if (address) setWalletAddress(address);
  };

  const fetchBalances = async () => {
    if (!walletAddress) return;

    const balances: { [key: string]: string } = {};
    for (const token of supportedTokens) {
      balances[token.symbol] = await fetchTokenBalance(walletAddress, token.address);
    }
    setTokenBalances(balances);
  };

  const handleTokenSwap = async () => {
    setModalOpen(true);
    setTransactionStatus("pending");

    try {
      // Simulate swap (replace with real transaction logic)
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Mock delay
      setTransactionStatus("success");
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionStatus("failed");
    }
  };

  const calculateOutputAmount = async () => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) return;
    const price = await fetchTokenPrice(inputToken, outputToken);
    if (price) {
      setOutputAmount((parseFloat(inputAmount) * parseFloat(price)).toFixed(6));
    }
  };

  useEffect(() => {
    if (walletAddress) fetchBalances();
  }, [walletAddress]);

  useEffect(() => {
    calculateOutputAmount();
  }, [inputAmount, inputToken, outputToken]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Token Swap Interface</h2>

      {!walletAddress ? (
        <button
          onClick={handleWalletConnect}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="mb-6">
          <p>Connected Wallet: {walletAddress}</p>
          <div className="mt-4 text-sm">
            {supportedTokens.map((token) => (
              <p key={token.symbol}>
                {token.symbol}: {tokenBalances[token.symbol] || "0.0"}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="inputToken">From</label>
          <div className="flex space-x-4">
            <select
              id="inputToken"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="flex-1 bg-gray-800 p-2 rounded"
            >
              {supportedTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="flex-1 bg-gray-800 p-2 rounded"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="outputToken">To</label>
          <div className="flex space-x-4">
            <select
              id="outputToken"
              value={outputToken}
              onChange={(e) => setOutputToken(e.target.value)}
              className="flex-1 bg-gray-800 p-2 rounded"
            >
              {supportedTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={outputAmount}
              readOnly
              className="flex-1 bg-gray-800 p-2 rounded"
              placeholder="Output amount"
            />
          </div>
        </div>
      </div>

      <Metrics inputToken={inputToken} outputToken={outputToken} inputAmount={inputAmount} />

      <button
        onClick={handleTokenSwap}
        disabled={!walletAddress || parseFloat(inputAmount) <= 0}
        className="mt-6 w-full py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
      >
        Swap
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        transactionDetails={{
          inputToken,
          outputToken,
          inputAmount,
          outputAmount,
          fees: (parseFloat(inputAmount) * 0.005).toFixed(4), // Mock fee
          slippage: (Math.random() * 0.5).toFixed(2), // Mock slippage
          status: transactionStatus,
        }}
      />
    </div>
  );
};

export default SwapInterface;
