// pages/index.jsx
import React from "react";
import ConnectButton from "@/components/ConnectButton"; // adjust path if your project uses '@/component'
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Crypto Wallet Connect Demo</h1>
        <p className={styles.lead}>
          Connect your Ethereum wallet using Reown AppKit and Wagmi. 
          Created by Aminu Babayo Shehu.
        </p>

        <ConnectButton />

        <section className={styles.tiles}>
          <div className={styles.tile}>
            <h3>Secure</h3>
            <p>All signatures are handled by your wallet; private keys never leave it.</p>
          </div>
          <div className={styles.tile}>
            <h3>Fast</h3>
            <p>Quick connect, short UI flows, and careful feedback during signing.</p>
          </div>
          <div className={styles.tile}>
            <h3>Compatible</h3>
            <p>Works with MetaMask and most EVM-compatible wallets.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
