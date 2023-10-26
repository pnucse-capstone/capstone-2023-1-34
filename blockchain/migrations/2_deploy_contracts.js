const donation = artifacts.require("donation");
const Nft = artifacts.require("Nft");
module.exports = function(deployer) {
  deployer.deploy(donation);
  deployer.deploy(Nft);
};