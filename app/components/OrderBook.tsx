"use client";

import { useEffect, useState } from "react";

const OrderBook = () => {
  const [orderBook, setOrderBook] = useState<{ bids: number[]; asks: number[] }>({ bids: [], asks: [] });

  useEffect(() => {
    const fetchOrderBook = () => {
      // Mock data for demo
      setOrderBook({
        bids: [101, 100, 99, 98, 97],
        asks: [103, 104, 105, 106, 107],
      });
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Order Book</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Bid</th>
            <th className="text-left">Ask</th>
          </tr>
        </thead>
        <tbody>
          {orderBook.bids.map((bid, index) => (
            <tr key={index}>
              <td>{bid}</td>
              <td>{orderBook.asks[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
