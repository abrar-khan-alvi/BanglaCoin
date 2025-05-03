// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 private transactionCount;

    event Transfer(
        address indexed from,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] private transactions;

    /// @notice Add a new transaction: accepts ETH, logs it, forwards it to the receiver
    /// @param receiver The address to receive the ETH
    /// @param amount The amount of ETH (in wei) to transfer
    /// @param message A user-provided message
    /// @param keyword A user-provided keyword
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    )
        public
        payable
    {
        // Ensure the ETH sent matches the declared amount
        require(msg.value == amount, "Sent ETH must equal `amount`");

        transactionCount += 1;
        transactions.push(
            TransferStruct({
                sender:    msg.sender,
                receiver:  receiver,
                amount:    amount,
                message:   message,
                timestamp: block.timestamp,
                keyword:   keyword
            })
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );

        // Forward the ETH to the receiver
        (bool success, ) = receiver.call{ value: amount }("");
        require(success, "ETH transfer failed");
    }

    /// @notice Retrieve all recorded transactions
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    /// @notice Retrieve the total count of transactions
    function getTransactionCount()
        public
        view
        returns (uint256)
    {
        return transactionCount;
    }
}
