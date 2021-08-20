const Silhouettes = artifacts.require("Silhouettes");

module.exports = async (deployer) => {
  await deployer.deploy(Silhouettes); 
  const sil = await Silhouettes.deployed();
};
