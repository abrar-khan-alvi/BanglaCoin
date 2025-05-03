# BanglaCoin - Decentralized Crypto Transaction Platform

BanglaCoin is a decentralized web application that allows users to send and receive Ethereum-based cryptocurrency transactions seamlessly. The platform leverages blockchain technology to ensure secure, transparent, and fast transactions. It also provides a user-friendly interface for interacting with the Ethereum blockchain.

## Features

- **Connect Wallet**: Users can connect their MetaMask wallet to interact with the application.
- **Send Transactions**: Send Ethereum to any wallet address with a custom message and keyword.
- **Transaction History**: View the latest transactions, including sender and receiver addresses, amounts, and timestamps.
- **Responsive Design**: Fully responsive UI built with React and TailwindCSS.
- **Smart Contract Integration**: Interacts with a Solidity smart contract deployed on the Ethereum blockchain.

## Project Structure

The project is divided into two main parts:

### 1. **Frontend (BanglaCoin)**

The frontend is a React-based web application built with Vite. It provides the user interface for interacting with the Ethereum blockchain.

#### Key Files and Directories:
- **`src/components`**: Contains reusable React components like `Navbar`, `Footer`, `LandingPage`, `Services`, and `Transaction`.
- **`src/context/TransactionContext.jsx`**: Manages the application's state and handles interactions with the Ethereum blockchain via the smart contract.
- **`src/utils/constant.js`**: Stores the smart contract's ABI and deployed address.
- **`src/utils/Transaction.json`**: Contains the ABI of the `Transactions` smart contract.
- **`src/index.css`**: Defines global styles, including gradient backgrounds and glassmorphism effects.

#### Frontend Features:
- **Landing Page**: Displays a hero section with wallet connection functionality.
- **Transaction Form**: Allows users to input recipient address, amount, message, and keyword for transactions.
- **Transaction History**: Displays a list of recent transactions fetched from the blockchain.

### 2. **Smart Contract (smart_contract)**

The backend consists of a Solidity smart contract deployed on the Ethereum blockchain. It handles the core functionality of recording and processing transactions.

#### Key Files and Directories:
- **`contracts/Transation.sol`**: The Solidity smart contract that manages transactions. It includes:
  - `addToBlockchain`: Adds a new transaction to the blockchain.
  - `getAllTransactions`: Retrieves all recorded transactions.
  - `getTransactionCount`: Returns the total number of transactions.
- **`scripts/deploy.js`**: Script to deploy the smart contract using Hardhat.
- **`test/Lock.js`**: Contains unit tests for a sample `Lock` contract.
- **`hardhat.config.js`**: Configuration file for the Hardhat development environment.

## Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Ethereum Sepolia testnet account with test ETH
