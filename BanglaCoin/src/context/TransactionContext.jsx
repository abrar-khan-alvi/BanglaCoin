import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant.js";

export const TransactionContext = React.createContext();

const { ethereum } = window;

// Helper to create contract instance
const createEthereumContract = async () => {
  if (!ethereum) {
    console.error("Please install MetaMask.");
    return null;
  }
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }));
  };

  // Fetch all transactions and structure them
  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        console.log("Ethereum object not found. Install MetaMask.");
        return;
      }
      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return;

      const availableTransactions = await transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(tx => ({
        addressTo: tx.receiver,
        addressFrom: tx.sender,
        timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
        message: tx.message,
        keyword: tx.keyword,
        // Use ethers.formatEther (v6) to convert BigInt wei to ether string
        amount: ethers.formatEther(tx.amount)
      }));

      //console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet is already connected:", accounts[0]);
      } else {
        console.log("No wallet connected");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // Check transaction count in storage
  const checkIfTransactionsExists = async () => {
    try {
      if (!ethereum) return;
      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return;

      const currentTransactionCount = await transactionsContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", currentTransactionCount.toString());
    } catch (error) {
      console.error("Error in checkIfTransactionsExists:", error);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      console.log("Wallet connected:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };
  const disconnectWallet = () => {
     setCurrentAccount("");
     setTransactions([]);                  // wipe fetched txns
     setTransactionCount(0);
     localStorage.removeItem("transactionCount");
   };
  // Send transaction
  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const transactionsContract = await createEthereumContract();
      if (!transactionsContract) return;

      const { addressTo, amount, keyword, message } = formData;
      if (!addressTo || !amount || !keyword || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const parsedAmount = ethers.parseEther(amount);
      setIsLoading(true);

      const tx = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword,
        { value: parsedAmount }
      );

      alert("Loading ▶️", tx.hash);
      await tx.wait();
      alert("Success ✅", tx.hash);

      const txCount = await transactionsContract.getTransactionCount();
      setTransactionCount(Number(txCount));
      localStorage.setItem("transactionCount", txCount.toString());
    } catch (error) {
      console.error("Error sending transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        getAllTransactions,
        handleChange,
        formData,
        disconnectWallet
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
