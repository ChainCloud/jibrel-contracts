require('babel-register');
require('babel-polyfill');

global.artifacts = artifacts; // eslint-disable-line no-undef


const CrydrControllerMintableInterfaceJSAPI = require('../jsroutines/jsapi/crydr/controller/CrydrControllerMintableInterface');
const TxConfig = require('../jsroutines/jsconfig/TxConfig');

const DeployConfig = require('../jsroutines/jsconfig/DeployConfig');

const JNTController = global.artifacts.require('JNTController.sol');
const jUSDController = global.artifacts.require('jUSDController.sol');
const jKRWController = global.artifacts.require('jKRWController.sol');


/* Migration actions */

const executeMigration = async () => {
  const { managerMint, testInvestor1, testInvestor2, testInvestor3 } = DeployConfig.getAccounts();
  global.console.log(`\t\tmanagerPause - ${managerMint}`);
  global.console.log(`\t\tmanagerPause - ${testInvestor1}`);
  global.console.log(`\t\tmanagerPause - ${testInvestor2}`);
  global.console.log(`\t\tmanagerPause - ${testInvestor3}`);

  const JNTControllerInstance = await JNTController.deployed();
  const JNTControllerAddress = JNTControllerInstance.address;

  const jUSDControllerInstance = await jUSDController.deployed();
  const jUSDControllerAddress = jUSDControllerInstance.address;

  const jKRWControllerInstance = await jKRWController.deployed();
  const jKRWControllerAddress = jKRWControllerInstance.address;

  await CrydrControllerMintableInterfaceJSAPI.mint(JNTControllerAddress,
                                                   managerMint,
                                                   testInvestor1,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(JNTControllerAddress,
                                                   managerMint,
                                                   testInvestor2,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(JNTControllerAddress,
                                                   managerMint,
                                                   testInvestor3,
                                                   10000 * (10 ** 18));

  await CrydrControllerMintableInterfaceJSAPI.mint(jUSDControllerAddress,
                                                   managerMint,
                                                   testInvestor1,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(jUSDControllerAddress,
                                                   managerMint,
                                                   testInvestor2,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(jUSDControllerAddress,
                                                   managerMint,
                                                   testInvestor3,
                                                   10000 * (10 ** 18));

  await CrydrControllerMintableInterfaceJSAPI.mint(jKRWControllerAddress,
                                                   managerMint,
                                                   testInvestor1,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(jKRWControllerAddress,
                                                   managerMint,
                                                   testInvestor2,
                                                   10000 * (10 ** 18));
  await CrydrControllerMintableInterfaceJSAPI.mint(jKRWControllerAddress,
                                                   managerMint,
                                                   testInvestor3,
                                                   10000 * (10 ** 18));
};

const verifyMigration = async () => {
  // todo verify migration, make integration tests
};


/* Migration */

module.exports = (deployer, network, accounts) => {
  global.console.log('  Start migration');
  global.console.log(`  Accounts: ${accounts}`);
  global.console.log(`  Network:  ${network}`);

  TxConfig.setWeb3(web3); // eslint-disable-line no-undef
  TxConfig.setNetworkType(network);

  DeployConfig.setDeployer(deployer);
  DeployConfig.setAccounts(accounts);

  deployer.then(() => executeMigration())
          .then(() => verifyMigration())
          .then(() => global.console.log('  Migration finished'));
};
