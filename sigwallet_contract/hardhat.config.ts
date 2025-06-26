import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        localhost: {
            chainId: 31337,
            url: "http://127.0.0.1:8545",
        },
    },
};

export default config;
