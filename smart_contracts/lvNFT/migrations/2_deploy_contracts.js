const Certificate = artifacts.require("Certificate.sol");
const Marketplace = artifacts.require("Marketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(Certificate);
  deployer.deploy(Marketplace, 5);
};
