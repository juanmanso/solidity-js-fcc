import { expect } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
  let SimpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it("should start with a favorite number of 0", async () => {
    const expectedValue = 0
    const currentValue = await simpleStorage.retrieve()
    // ** Could use assert or expect. Expect is more flexible (comparing here a number with bigInt)
    expect(currentValue).to.equal(expectedValue)
  })
  it("should update when we call store", async () => {
    const expectedValue = 7
    const transactionResponse = await simpleStorage.store(expectedValue)
    const _ = await transactionResponse.wait() // transactionReceipt
    const currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })
})