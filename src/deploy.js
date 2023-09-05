deployToNetwork = async(_ethers, _networkName, _deployer, _tokenSymbol) => {
  let networkURL = "https://"
  if (_networkName === "mainnet")
    networkURL += "etherscan.io/address/";
  else
    networkURL += _networkName+".etherscan.io/address/";

  console.log("Deploying " + _tokenSymbol + " To Network", _networkName, "from wallet account:", _deployer.address);
  console.log("Ethereum wallet account balance:", (await _deployer.getBalance()).toString());
  console.log("Etherscan wallet URL:", networkURL + _deployer.address);
  console.log("");

  const tokenFactory = await _ethers.getContractFactory(_tokenSymbol);
  const deployedToken = await tokenFactory.deploy();

  console.log("Token contract", await deployedToken.name(),"Deployed to contract address:", deployedToken.address);
  console.log("Etherscan contract URL:", networkURL + deployedToken.address);
}

module.exports = {
  deployToNetwork,
}

main = async() => {
  const [deployer] = await ethers.getSigners();
  const networkName = hre.network.name

  const impSigner = await HARDHAT.ethers.getImpersonatedSigner(SIGNER_ADDRESS);

  networkName = HARDHAT.network.name
  chainId = HARDHAT.network.config.chainId
  
    
  console.log(JSON.stringify(HARDHAT.network.config, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))

  console.log("main(",networkName, impSigner.address,")")
  console.log("ChainId:", chainId)



  
  const tokenSymbol = "SPCoin"
  await deployToNetwork(ethers, networkName, deployer, tokenSymbol);
}
    
main()
  .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  