"use client";

import { useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  transactionDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: {
    inputToken: string;
    outputToken: string;
    inputAmount: string;
    outputAmount: string;
    fees: string;
    slippage: string;
    status?: string; // Optional: "pending", "success", or "failed"
  };
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold text-white mb-4">Transaction Details</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>
            <strong>From:</strong> {transactionDetails.inputAmount} {transactionDetails.inputToken}
          </li>
          <li>
            <strong>To:</strong> {transactionDetails.outputAmount} {transactionDetails.outputToken}
          </li>
          <li>
            <strong>Fees:</strong> {transactionDetails.fees} {transactionDetails.inputToken}
          </li>
          <li>
            <strong>Slippage:</strong> {transactionDetails.slippage}%
          </li>
        </ul>
        {transactionDetails.status && (
          <p className={`mt-4 text-center font-bold ${
            transactionDetails.status === "success" ? "text-green-500" : "text-red-500"
          }`}>
            {transactionDetails.status === "pending"
              ? "Pending..."
              : transactionDetails.status === "success"
              ? "Transaction Successful!"
              : "Transaction Failed"}
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
