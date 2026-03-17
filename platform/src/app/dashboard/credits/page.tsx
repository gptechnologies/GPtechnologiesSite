"use client";

import { useState, useEffect } from "react";
import { Coins, Loader2, ShoppingCart } from "lucide-react";

export default function CreditsPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [buying, setBuying] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(5);

  useEffect(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((d) => setBalance(d.balance));
  }, []);

  async function handlePurchase() {
    setBuying(true);
    try {
      const res = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setBuying(false);
    }
  }

  const packages = [
    { amount: 5, label: "5 Credits" },
    { amount: 10, label: "10 Credits" },
    { amount: 25, label: "25 Credits" },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Credits</h2>

      <div className="bg-surface-raised border border-border rounded-xl p-8 text-center space-y-2">
        <Coins size={32} className="mx-auto text-brand-light" />
        <div className="text-4xl font-bold">
          {balance === null ? (
            <Loader2 size={24} className="animate-spin mx-auto" />
          ) : (
            balance
          )}
        </div>
        <p className="text-sm text-text-muted">credits remaining</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Buy Credits</h3>

        <div className="grid grid-cols-3 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.amount}
              onClick={() => setSelectedAmount(pkg.amount)}
              className={`p-4 rounded-lg border text-center transition-colors ${
                selectedAmount === pkg.amount
                  ? "border-brand-light bg-brand/10"
                  : "border-border bg-surface-raised hover:border-brand-light/50"
              }`}
            >
              <div className="text-lg font-bold">{pkg.amount}</div>
              <div className="text-xs text-text-muted">{pkg.label}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handlePurchase}
          disabled={buying}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-light transition-colors disabled:opacity-50"
        >
          {buying ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ShoppingCart size={18} />
          )}
          Purchase {selectedAmount} Credits
        </button>
      </div>

      <div className="text-sm text-text-muted space-y-1">
        <p>1 credit = 1 generation run or 1 AI edit request</p>
        <p>Credits never expire</p>
      </div>
    </div>
  );
}
