// src/components/Transactions.jsx
import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
}) => {
  const shortenAddress = (address = "") =>
    address.length > 10
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-col justify-start w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        {keyword && (
          <img
            src={keyword}
            alt="transaction visual"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />
        )}
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount, getAllTransactions } = useContext(TransactionContext);
  //console.log("Transactions:", getAllTransactions);
  //const txs = transactions || [];
  // Fetch fresh transactions when account changes
  useEffect(() => {
    if (currentAccount) {
      getAllTransactions();
    }
  }, [currentAccount, getAllTransactions]);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          {currentAccount
            ? `Latest Transactions ${currentAccount}`
            : "Connect your account to see the latest transactions"}
        </h3>

        <div className="flex flex-wrap justify-center items-center mt-10">
          {currentAccount && transactions.length === 0 && (
            <p className="text-white">No transactions found.</p>
          )}

          {transactions
            .slice()  
            .reverse()  
            .map((tx, i) => <TransactionsCard key={i} {...tx} />)}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
