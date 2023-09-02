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
        // url: process.env.GOERLI_INFURA_TEST_URL
        // url: process.env.SEPOLIA_INFURA_TEST_URL
      }
    }
    /*
    ,
    mainnet: {
      url: process.env.MAINNET_ALCHEMY_TEST_URL,
      accounts: [process.env.WALLET_SECRET]
    },
    goerli: {
      url: process.env.GOERLI_ALCHEMY_TEST_URL,
      accounts: [process.env.WALLET_SECRET]
    },
    sepolia: {
      url: process.env.SEPOLIA_ALCHEMY_TEST_URL,
      accounts: [process.env.WALLET_SECRET]
    }
    */
  }
};
