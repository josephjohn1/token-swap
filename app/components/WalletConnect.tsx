"use client";

import { useEffect, useState } from "react";

const WalletConnect = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask is required!");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    useEffect(() => {
        if (window.ethereum && window.ethereum.on) {
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                setWalletAddress(accounts[0] || null);
            });
        }
    }, []);

    return (
        <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
    );
};

export default WalletConnect;
