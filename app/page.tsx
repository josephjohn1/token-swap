"use client";

import WalletConnect from "./components/WalletConnect";
import SwapInterface from "./components/SwapInterface";
import OrderBook from "./components/OrderBook";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">DEX Token Swapper</h1>
          <WalletConnect />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <SwapInterface />
          <OrderBook />
        </div>
      </div>
    </main>
  );
}
