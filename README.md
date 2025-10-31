⚡ Crypto Wallet Connect UI (Next.js + React)

A beautifully designed, lightweight Web3 wallet connect page built with Next.js and React.
It provides a modern, responsive, and secure Connect Wallet interface that works with MetaMask and other EVM-compatible wallets.

🚀 Features

🎨 Modern glassmorphism UI with gradient animations

🦊 MetaMask / EVM wallet support using window.ethereum

🔗 Connect / Disconnect / Copy address functionality

🌐 Auto-detects connected wallets

🧩 Reusable ConnectButton component

🪶 Lightweight — no external Web3 libraries required

📱 Fully responsive and mobile-friendly

🏗️ Project Structure
components/
│── ConnectButton.jsx

pages/
│── index.jsx

styles/
│── Home.module.css
│── ConnectButton.module.css

README.md

💻 Setup & Installation

1️⃣ Clone the repository
git clone https://github.com/absheikh/crypto-wallet-connect.git
cd crypto-wallet-connect-ui

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Run the development server
npm run dev
# or
yarn dev


Then open http://localhost:3000
 to view your app.

🧠 Usage

The ConnectButton component manages all wallet interactions.

Example:
```bash
import ConnectButton from "@/components/ConnectButton";

export default function Home() {
  return (
    <main>
      <ConnectButton />
    </main>
  );
}
```

This component will:

Detect MetaMask (or compatible wallet)

Prompt the user to connect

Display wallet address and network info

Allow copying the address

Provide a simple disconnect button (UI reset)

🧩 Customization

Edit ConnectButton.module.css to change the UI theme or colors

Adjust layout or background in Home.module.css

Replace the SVG icon with your project’s logo

For multi-wallet support, integrate wagmi or web3modal

🔒 Security Notes

Private keys are never accessed.

Wallet interactions occur only through the user’s chosen provider (e.g., MetaMask).

No backend or sensitive data handling is required.

📦 Tech Stack
Technology	Purpose
Next.js	Framework
React	UI rendering
CSS Modules	Styling
MetaMask / EVM	Wallet provider
JSX + ES Modules	Component system
🧰 Future Enhancements

 Add WalletConnect and Coinbase Wallet support

 Integrate with wagmi and viem

 ENS name resolution

 Light/Dark theme toggle

🧑‍💻 Author

Developed by: Aminu Babayo Shehu (ABSheikh)

💼 Software Engineer | Web3 & Full-Stack Developer

📄 License

This project is licensed under the MIT License — feel free to use, modify, and share.

MIT License © 2025 ABSheikh


⭐ If you like this project, please give it a star on GitHub!

“Secure, simple, and stunning wallet connection — made for modern dApps.”