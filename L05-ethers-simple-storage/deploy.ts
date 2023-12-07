import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

async function main() {
  if (process.env.PRIVATE_KEY && process.env.RPC_URL) {
    // Blockchain provided by Ganache -> RPC Provider + Wallet
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // ** We could also use the encrypted key to secure our private key
    // ** and not let it be exposed in this codebase.
    // -->
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
    // const wallet = ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD!
    // );

    const abi = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.abi",
      "utf-8",
    );
    const binary = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.bin",
      "utf-8",
    );

    // ** Deploying the contract
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    // You can add overrides to the deployment as shown below with the gas price
    const contract = await contractFactory.deploy({ gasPrice: 1000000000 });
    const transactionReceipt = await contract.deploymentTransaction()?.wait(1);
    console.log(`Contract deployed to ${(contract as any).address}`);

    // ** Deployment transaction -> The response you get when you deploy
    //  console.log(contract.deploymentTransaction);
    // ** Transaction Receipt -> What you get when you wait for a block confirmation
    //  console.log(transactionReceipt);

    // ** We could deploy using just the wallet that we get from ethers
    // await deploymentViaWallet(wallet);
    // ** Look at the code for more info, but it's a grinder way of doing it

    // ** Check current favorite number
    const currentFavoriteNumber = await (contract as any).retrieve();
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

    // ** Write new favorite number and check it was successfully updated
    const transactionResponse = await (contract as any).store("7");
    const _ = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await (contract as any).retrieve();
    console.log(`Updated Favorite Number: ${updatedFavoriteNumber.toString()}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
