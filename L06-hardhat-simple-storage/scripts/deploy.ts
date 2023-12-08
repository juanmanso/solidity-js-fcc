import { ethers, network, run } from "hardhat";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.waitForDeployment()
  // ** Target equals to the contract address
  // ** --> Could also use `await simpleStorage.getAddress()`
  console.log(`Contract deployed to: ${simpleStorage.target}`)

  // ** Verification commented since duplicated by `hardhat-toolbox`
  // // ** Automatically verify after deployment ONLY if using a Sepolia testnet!
  // if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
  //   // ** 6 blocks is sort of a guess
  //   console.log('Waiting for block confirmations...')
  //   await simpleStorage.deploymentTransaction()?.wait(6);
  //   // ** Now we can verify
  //   await verify(simpleStorage.target.toString(), [])
  // }

  // ** Get the current value
  let currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  // ** Update the value
  console.log("Updating contract...")
  let transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait() // returns transaction receipt
  currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)
}

// Using `hardhat-toolbox` on our config, automatically verifies contracts
const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...")
  try {
    // ** task: verify, subtask: verify
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      // Just log and continue so code doesn't break
      console.error(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
