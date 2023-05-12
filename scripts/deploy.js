const { ethers, network } = require("hardhat");
const verify = require("../utils/verify")
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {


  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId



  // Deploy TransferEth Contract
  const transferEth = await ethers.getContractFactory("TransferEth", deployer);
  const deployedTransferEth = await transferEth.deploy();
  await deployedTransferEth.deployed();

  console.log(`Deployed to ${chainId} with address ${deployedTransferEth.address}`)
  if (chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying")
    await verify(deployedTransferEth.address, [])
    console.log("Verified")
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });