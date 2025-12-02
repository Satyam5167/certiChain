require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],   // Your account private key
        providerOrUrl: process.env.INFURA_URL,   // Infura Sepolia endpoint
        pollingInterval: 60000                    // 10 seconds polling to reduce rate-limiting errors
      }),
      network_id: 11155111,       // Sepolia testnet network ID
      gas: 5500000,               // Gas limit per transaction
      confirmations: 1,           // Wait for 2 block confirmations
      timeoutBlocks: 500,         // Timeout if not mined within 200 blocks
      skipDryRun: true            // Skip test migration before actual deployment
    }
  },

  compilers: {
    solc: {
      version: "0.8.20",          // Solidity compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200               // Optimize for 200 runs
        }
      }
    }
  }
};
