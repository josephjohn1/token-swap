"use client";

const TokenSelect = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) => {
  const tokens = ["ETH", "USDT", "DAI", "BTC"]; // Mock token list

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-4 p-2 bg-gray-700 rounded"
    >
      {tokens.map((token) => (
        <option key={token} value={token}>
          {token}
        </option>
      ))}
    </select>
  );
};

export default TokenSelect;
