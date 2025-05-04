# Zentra

A user-friendly DeFi launchpad platform that enables anyone to create, manage, and launch their own tokens without requiring deep technical knowledge of blockchain development. Built with React, Vite, and TypeScript, Zentra provides a seamless experience for token creation and management.

## 🚀 Features

### Token Creation & Management
- 🪙 Simple token creation wizard for beginners
- 🔧 Advanced token configuration options
- 📊 Token analytics and tracking
- 🔒 Built-in security features
- 💧 Automatic liquidity pool creation
- 🏷️ Custom token parameters (name, symbol, supply, etc.)

### Launchpad Features
- 🚀 Fair launch capabilities
- 📈 Initial token offering (ITO) support
- 💰 Token presale functionality
- 🔄 Automatic token distribution
- 🎯 Price impact protection
- 📊 Launch analytics and tracking

### Token Security
- 🔐 Token locking mechanism
- 💧 LP (Liquidity Pool) locking
- 🛡️ Anti-whale measures
- 🔒 Anti-bot protection
- ⚡️ Transaction speed limits
- 🛑 Emergency pause functionality

### Additional Tools
- ✈️ Airdrop distribution system
- 📊 Staking platform
- 🔄 Token migration tools
- 📈 Price tracking and analytics
- 💼 Token vesting schedules

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Web3 Integration:** 
  - RainbowKit for wallet connection
  - Wagmi for Ethereum interactions
  - Viem for Ethereum TypeScript Interface
- **Smart Contracts:** 
  - ERC20 standard implementation
  - Custom token contracts
  - Lock contracts
  - Airdrop contracts
- **State Management:** React Query
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Type Checking:** TypeScript
- **Code Quality:** ESLint

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_APP_INFURA_ID=your_infura_id
VITE_APP_ALCHEMY_ID=your_alchemy_id
VITE_APP_CONTRACT_ADDRESS=your_contract_address
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── lib/          # Utility libraries
├── pages/        # Main feature pages
│   ├── Staking/  # Staking functionality
│   ├── Tokens/   # Token creation and management
│   ├── Lock/     # Token locking
│   ├── Airdrop/  # Airdrop distribution
│   ├── Bonding/ # Token bonding
│   └── FairLaunch/ # Fair launch mechanism
├── utils/        # Utility functions and ABIs
│   ├── ABI/      # Smart contract ABIs
│   └── AdvanceToken/ # Token creation utilities
├── providers/    # Context providers
└── utils/        # Utility functions
```

## 🎯 Key Features in Detail

### Token Creation Wizard
- Step-by-step token creation process
- Pre-configured security settings
- Automatic contract deployment
- Gas optimization
- Real-time deployment status

### Launchpad Features
- Customizable launch parameters
- Automatic liquidity provision
- Price impact protection
- Anti-whale measures
- Bot protection
- Fair distribution mechanisms

### Security Features
- Token locking with customizable durations
- LP locking for liquidity protection
- Transaction limits
- Emergency pause functionality
- Multi-signature support
- Audit trail

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Documentation](link-to-docs)
- [Demo](link-to-demo)
- [Issues](link-to-issues)
- [Discord](link-to-discord)
