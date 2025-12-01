# 🚀 TSender - Gas-Optimized ERC20 Airdrop dApp

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AkotaGreat/TS-TSender-UI-CU)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Airdrop ERC20 tokens to multiple addresses in a single transaction. Save gas. Save time. Built different.**

[🌐 Live Demo](https://ts-t-sender-ui-1rimybz28-akota-greats-projects.vercel.app/) | [📖 Documentation](#documentation) | [🤝 Contributing](#contributing)

---

## 🎯 What is TSender?

TSender is a next-generation decentralized application that enables **batch token airdrops** with maximum efficiency. Instead of sending tokens one by one and paying gas fees for each transaction, TSender allows you to distribute ERC20 tokens to hundreds of addresses in a single transaction.

### 🔥 Why TSender?

- **💰 Cost Efficient**: Batch transfers mean drastically lower gas fees
- **⚡ Lightning Fast**: Send to multiple recipients in one transaction
- **🔒 Secure**: Built with industry-standard security practices
- **🎨 Clean UX**: Beautiful, intuitive interface powered by RainbowKit
- **🌐 Multi-Chain**: Support for multiple blockchain networks
- **📱 Responsive**: Works seamlessly on desktop and mobile

---

## ✨ Features

- 🦊 **Web3 Wallet Integration** - Seamless connection via RainbowKit
- 🪙 **ERC20 Token Support** - Airdrop any ERC20 token
- 📋 **Bulk Sending** - Send to multiple addresses simultaneously
- 🤖 **Smart Approval** - Automatic token approval handling
- 🌍 **Multi-Chain** - Ethereum, Polygon, and more
- ✅ **Input Validation** - Built-in address and amount validation
- 📊 **Transaction Tracking** - Real-time transaction status updates
- 💾 **Persistent State** - Form data persistence for better UX

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.3.2](https://nextjs.org/)** - React framework for production
- **[React 19.0.0](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS

### Web3 Integration
- **[RainbowKit](https://www.rainbowkit.com/)** - Wallet connection UI
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Viem](https://viem.sh/)** - TypeScript interface to Ethereum

### Testing & Development
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing
- **[Synpress](https://synpress.io/)** - Web3 E2E testing
- **[Anvil](https://book.getfoundry.sh/anvil/)** - Local Ethereum node

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
git --version   # v2.33.0 or higher
```

You'll also need:
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Some testnet tokens for testing

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AkotaGreat/TS-TSender-UI-CU.git
cd TS-TSender-UI-CU
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

4. **Run the development server**
```bash
pnpm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧪 Testing

### Unit Tests
Run unit tests with Vitest:
```bash
npm run test
# or with coverage
npm run test:coverage
```

### E2E Tests
Run end-to-end tests with Playwright:
```bash
npm run test:e2e
```

### Testing with Local Blockchain
1. Start Anvil (local Ethereum node):
```bash
anvil
```

2. Deploy contracts (if you have the contract repo):
```bash
# In your TSender contract repository
forge script script/Deploy.s.sol --broadcast --rpc-url http://localhost:8545
```

3. Update your `.env.local` with the local contract address

4. Connect MetaMask to localhost:8545

---

## 📖 How to Use

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the header
   - Select your preferred wallet from the modal
   - Approve the connection

2. **Select Token**
   - Choose the ERC20 token you want to airdrop
   - Or paste a custom token contract address

3. **Add Recipients**
   - Enter recipient addresses and amounts
   - You can use CSV format: `address,amount`
   - Or paste a JSON array

4. **Approve Token**
   - Click "Approve" to allow TSender to spend your tokens
   - Confirm the transaction in your wallet

5. **Send Airdrop**
   - Review the transaction details
   - Click "Send Airdrop"
   - Confirm the transaction
   - Wait for confirmation ✅

---

## 🌐 Supported Networks

- ✅ Ethereum Mainnet
- ✅ Ethereum Sepolia
- ✅ Polygon
- ✅ Polygon Mumbai
- ✅ Optimism
- ✅ Arbitrum
- ✅ Base
- 🔄 More coming soon...

---

## 🏗️ Project Structure

```
TS-TSender-UI-CU/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── AirdropForm.tsx   # Main airdrop form
│   ├── Header.tsx        # Navigation header
│   └── ...
├── lib/                   # Utility functions
│   ├── contracts/        # Contract ABIs & addresses
│   ├── utils/            # Helper functions
│   └── wagmi.ts          # Wagmi configuration
├── public/               # Static assets
├── tests/                # Test files
│   ├── unit/            # Unit tests
│   └── e2e/             # E2E tests
└── styles/              # Global styles
```

---

## 🔧 Configuration

### Wagmi Configuration

Customize supported chains in `lib/wagmi.ts`:

```typescript
import { mainnet, polygon, optimism } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, polygon, optimism],
  // ... other config
})
```

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Make sure all tests pass before submitting PR

---

## 🐛 Known Issues

- [ ] CSV upload feature in progress
- [ ] Transaction history tracking coming soon
- [ ] Mobile optimization improvements needed

Found a bug? [Open an issue](https://github.com/AkotaGreat/TS-TSender-UI-CU/issues)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Cyfrin](https://www.cyfrin.io/) - For the amazing Web3 education
- [Patrick Collins](https://twitter.com/PatrickAlphaC) - For blockchain development tutorials
- [RainbowKit](https://www.rainbowkit.com/) - For the beautiful wallet connection UI
- [Wagmi](https://wagmi.sh/) - For the excellent React hooks

---

## 📬 Contact

**Akota Great** 

- GitHub: [@AkotaGreat](https://github.com/AkotaGreat)
- Project Link: [https://github.com/AkotaGreat/TS-TSender-UI-CU](https://github.com/AkotaGreat/TS-TSender-UI-CU)

---

## 💎 Show Your Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the code
- 📢 Sharing with the community

---

<div align="center">

**Built with ❤️ by [Akota Great](https://github.com/AkotaGreat)**

Made possible by the Web3 community 🌐

</div>