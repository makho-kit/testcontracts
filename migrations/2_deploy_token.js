var TakToken = artifacts.require("./TakToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TakToken);
};
