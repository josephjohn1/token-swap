"use client";

import { useEffect, useState } from "react";

const Metrics = ({
  inputToken,
  outputToken,
  inputAmount,
}: {
  inputToken: string;
  outputToken: string;
  inputAmount: string;
}) => {
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const [fees, setFees] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(0);

  useEffect(() => {
    if (inputAmount) {
      // Mock calculations for metrics
      const amount = parseFloat(inputAmount) || 0;
      setPriceImpact(parseFloat((Math.random() * 2).toFixed(2))); // Convert to number
      setFees(parseFloat((amount * 0.005).toFixed(4))); // Convert to number
      setSlippage(parseFloat((Math.random() * 0.5).toFixed(2))); // Convert to number      
    }
  }, [inputAmount, inputToken, outputToken]);

  return (
    <div className="mt-6 text-sm text-gray-400">
      <div className="flex justify-between">
        <span>Price Impact:</span>
        <span>{priceImpact}%</span>
      </div>
      <div className="flex justify-between">
        <span>Fees:</span>
        <span>{fees} {inputToken}</span>
      </div>
      <div className="flex justify-between">
        <span>Slippage:</span>
        <span>{slippage}%</span>
      </div>
    </div>
  );
};

export default Metrics;
