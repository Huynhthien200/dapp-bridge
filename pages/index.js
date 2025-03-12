import { useState } from "react";
import { ethers } from "ethers";

export default function BridgeApp() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      setWallet(await signer.getAddress());
    } else {
      alert("Metamask not detected!");
    }
  }

  async function bridgeTokens() {
    if (!wallet) return alert("Connect wallet first");
    setStatus("Bridging...");
    try {
      // Call Orbiter Finance bridge API (mockup, replace with actual integration)
      const response = await fetch("https://test.orbiter.finance/api/bridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "Sepolia", to: "Monad", amount })
      });
      const result = await response.json();
      setStatus(result.message || "Bridge successful!");
    } catch (error) {
      setStatus("Bridge failed: " + error.message);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold">Sepolia to Monad Bridge</h1>
      <div className="flex space-x-2 items-center">
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {wallet ? `Connected: ${wallet.slice(0, 6)}...` : "Connect Wallet"}
        </button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border p-2 rounded w-32 text-center"
        />
        <button
          onClick={bridgeTokens}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Bridge
        </button>
      </div>
      {status && <p className="text-gray-600">{status}</p>}
    </div>
  );
}
