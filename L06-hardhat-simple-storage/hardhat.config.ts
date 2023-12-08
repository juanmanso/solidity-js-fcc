import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "./tasks/block-number";

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

// ** Local network configuration
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111, // sepolia
    },
    localhost: {
      url: LOCALHOST_RPC_URL,
      // no need for accounts since it already gets them
      chainId: 31337, // since it's a hardhat node, it's the same chainId as hardhat
    },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // ** No need to add gas-report dependency because already in toolbox
  gasReporter: {
    enabled: false, // ** Please set to true if you want to see the report (default to false to avoid spamming calls to coinmarketcap)
    currency: "USD",
    // token: "MATIC", // ** Where to deploy
    coinmarketcap: COINMARKETCAP_API_KEY,
    // ** I prefer to see it in the console but if not, use this
    // outputFile: "gas-report.txt",
    // noColors: true,
  },
  // ** No need to add coverage dependency because already in toolbox
  // ** No need to add typeChain dependency because already in toolbox
  //    Types are automatically generated in typechain-types folder
};

export default config;
