const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")

describe("Unit test for transferEth contract", function () {
  // Put global constant variables here if any
  let deployer, account2, deployedTransferEth
  const etherAmount = ethers.utils.parseEther("1")

  beforeEach(async () => {
    const accounts = await ethers.getSigners()
    deployer = accounts[0]
    account2 = accounts[1]

    // Deploy TransferEth Contract
    const transferEth = await ethers.getContractFactory("TransferEth", deployer);
    deployedTransferEth = await transferEth.deploy(); // No args in the constructor
    await deployedTransferEth.deployed();
  })

  describe("sendEth", function () {
    it("sends Eth to another account", async () => {

      // Getting deployer's initial balance
      const deployerBal = await ethers.provider.getBalance(deployer.address)
      const deployerInitBal = ethers.utils.formatEther(deployerBal)
      console.log(`Deployer's initial balance  is ${deployerInitBal}`)
      console.log(`-----------------------------------------------`)

      // Getting account2 initial balance
      const accountTwoBal = await ethers.provider.getBalance(account2.address)
      const accountTwoInitBal = ethers.utils.formatEther(accountTwoBal)
      console.log(`Account2's initial balance  is ${accountTwoInitBal}`)
      console.log(`-----------------------------------------------`)

      // Sending 1 Eth from deployer to account2
      const transaction = await deployedTransferEth.sendMoney(account2.address, { value: etherAmount })

      // Getting deployer's final balance
      const deployerBall = await ethers.provider.getBalance(deployer.address)
      const deployerFinalBal = ethers.utils.formatUnits(deployerBall)
      console.log(`Deployer's Final balance  is ${deployerFinalBal}`)
      console.log(`-----------------------------------------------`)

      // Getting account2 final balance
      const accountTwoBall = await ethers.provider.getBalance(account2.address)
      const accountTwoFinalBal = ethers.utils.formatUnits(accountTwoBall).toString()
      console.log(`Account2's final balance  is ${accountTwoFinalBal}`)
      console.log(`-----------------------------------------------`)

      const etherSent = Number(ethers.utils.formatEther(etherAmount))

      //Check if starting bal === endingBal - amount rececived

      assert.equal(accountTwoInitBal.toString(), Number(accountTwoFinalBal) - etherSent)
    })
  })
})