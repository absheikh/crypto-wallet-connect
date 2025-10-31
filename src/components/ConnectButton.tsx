'use client'
import React, { useEffect, useState } from "react";
import styles from "../styles/ConnectButton.module.css";

/**
 * Simple EVM wallet connector using window.ethereum (MetaMask / compatible).
 * - Displays connected state, address (short), copy button, disconnect (local)
 * - Shows animated wallet icon and gradient button
 * - Graceful fallback if no wallet is present
 *
 * NOTE: This is a light UI wrapper. For production use, integrate a wallet library
 * like wagmi or web3modal for multi-wallet support and robust session handling.
 */


// Minimal Ethereum provider type for MetaMask
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
}



const shortAddr = (addr = "") =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

export default function ConnectButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read existing connection if user already connected (only client side)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const eth = window.ethereum as unknown as EthereumProvider;
    if (!eth) return;
    // Handlers must be named for removeListener
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null);
      } else {
        setAddress(accounts[0]);
      }
    };
    const handleChainChanged = (c: string) => setChainId(c);
    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);
    // try: if already authorized, request accounts without popup if possible
    (async () => {
      try {
        const accounts: string[] = await eth.request({ method: "eth_accounts" });
        if (accounts?.length) {
          setAddress(accounts[0]);
          const c: string = await eth.request({ method: "eth_chainId" });
          setChainId(c);
        }
      } catch (e) {
        // ignore
      }
    })();
    // cleanup
    return () => {
      try {
        eth.removeListener("accountsChanged", handleAccountsChanged);
        eth.removeListener("chainChanged", handleChainChanged);
      } catch (e) {}
    };
  }, []);

  const connect = async () => {
    setLoading(true);
    setError("");
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        setError("No Ethereum wallet found. Install MetaMask or another wallet.");
        setLoading(false);
        return;
      }
      const eth = window.ethereum as unknown as EthereumProvider;
      const accounts: string[] = await eth.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      const c: string = await eth.request({ method: "eth_chainId" });
      setChainId(c);
    } catch (e: any) {
      setError(e?.message || "Connection cancelled");
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    // We can't programmatically disconnect MetaMask; just clear local UI state.
    setAddress(null);
    setChainId(null);
    setError("");
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      // small visual feedback
      setError("Address copied to clipboard ✅");
      setTimeout(() => setError(""), 1800);
    } catch {
      setError("Failed to copy address");
    }
  };

  const renderIcon = () => (
    <svg
      className={styles.walletIcon}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="1.5" y="5" width="19" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="11.5" r="1.6" fill="currentColor" />
      <path d="M3 8.5h16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className={styles.wrapper} role="region" aria-label="Wallet connect widget">
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.logoWrap}>
            <div className={styles.pulse} />
            {renderIcon()}
          </div>
          <div>
            <div className={styles.title}>Connect Wallet</div>
            <div className={styles.subtitle}>
              Tap to link your wallet for transactions and signing.
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {!address ? (
            <>
              <button
                className={styles.connectBtn}
                onClick={connect}
                disabled={loading}
                aria-disabled={loading}
              >
                <span className={styles.btnGlow} />
                <span className={styles.btnText}>
                  {loading ? "Connecting…" : "Connect Wallet"}
                </span>
              </button>
              <div className={styles.hint}>
                No wallet? Try MetaMask or a Web3 browser extension.
              </div>
            </>
          ) : (
            <>
              <div className={styles.addressRow}>
                <div className={styles.addrInfo}>
                  <div className={styles.identicon}>{shortAddr(address)}</div>
                  <div>
                    <div className={styles.addrLabel}>{shortAddr(address)}</div>
                    <div className={styles.chainLabel}>
                      {chainId ? `Network: ${chainId}` : "Unknown network"}
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.smallBtn} onClick={copyAddress}>
                    Copy
                  </button>
                  <button
                    className={styles.ghostBtn}
                    onClick={disconnect}
                    title="Disconnect (clears local session)"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </>
          )}

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.sparkle}>✨</span>
        <small>Secure signature requests powered by your wallet.</small>
      </div>
    </div>
  );
}
