const medToken = artifacts.require("medCoin");
const medSupply = artifacts.require("MedicineSupplyChain");

module.exports = async function (deployer) {

  const initialSupply = BigInt(100000 * 10 ** 18);
  await deployer.deploy(medToken,initialSupply);
  const token = await medToken.deployed();

  await deployer.deploy(medSupply, token.address);
  const supplychain = await medSupply.deployed();
  await token.updatemarketplaceSmartContractAddress(supplychain.address);

};