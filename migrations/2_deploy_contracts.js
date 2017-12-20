var Adoption = artifacts.require("Adoption");
var RecptPmtStates = artifacts.require("RecptPmtStates");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(RecptPmtStates);
};
