// https://eth-sepolia.g.alchemy.com/v2/TyMLV7zp7STC9binnqA1TQidj9xbd-aM


require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/TyMLV7zp7STC9binnqA1TQidj9xbd-aM",
      accounts: ["eb707386fccd9e38d60dfc6dec644194dc9afd779d2b0ab19b99dfbab89721c8"],
    },
  },
};