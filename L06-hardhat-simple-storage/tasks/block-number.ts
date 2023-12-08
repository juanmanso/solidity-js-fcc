import { task } from "hardhat/config"

// ** Example of a task that prints the current block number
// **** Tasks could be better for plugins and Scripts for projects
export default task(
  "block-number",
  "Prints the current block number"
).setAction(async (_taskArgs, hre) => {
    // ** `hre` is the Hardhat Runtime Environment,
    // **   equivalent to import ... from "hardhat"
    await hre.ethers.provider.getBlockNumber().then((blockNumber: number) => {
    console.log(`Current block number: ${blockNumber}`)
    })
})