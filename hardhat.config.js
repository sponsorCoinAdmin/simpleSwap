require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      forking: {
        // url: "https://mainnet.infura.io/v3/{YOUR INFURA KEY HERE}"
        // or if using .env file use example similar to below
        url: process.env.MAINNET_INFURA_TEST_URL
        // url:process.env.SEPOLIA_INFURA_API_ACCESS_KEY
      }
    }
  }
};
