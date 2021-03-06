const ManageableJSAPI = require('../jsapi/lifecycle/Manageable');
const PausableJSAPI = require('../jsapi/lifecycle/Pausable');
const CrydrViewBaseInterfaceJSAPI = require('../jsapi/crydr/view/CrydrViewBaseInterface');

const DeployConfig = require('../jsconfig/DeployConfig');

const DeployUtils = require('../util/DeployUtils');


export const deployCrydrView = async (crydrViewContractArtifact) => {
  global.console.log('\tDeploying view of a crydr.');

  const contractAddress = await DeployUtils.deployContract(crydrViewContractArtifact);

  global.console.log(`\tView of a crydr successfully deployed: ${contractAddress}`);
  return null;
};

export const configureCrydrViewManagers = async (crydrViewAddress) => {
  global.console.log('\tConfiguring managers of crydr view...');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);

  const { owner, managerPause, managerGeneral } = DeployConfig.getAccounts();
  global.console.log(`\t\towner - ${owner}`);
  global.console.log(`\t\tmanagerPause - ${managerPause}`);
  global.console.log(`\t\tmanagerGeneral - ${managerGeneral}`);

  await PausableJSAPI.grantManagerPermissions(crydrViewAddress, owner, managerPause);
  await ManageableJSAPI.enableManager(crydrViewAddress, owner, managerPause);

  await CrydrViewBaseInterfaceJSAPI.grantManagerPermissions(crydrViewAddress, owner, managerGeneral);
  await ManageableJSAPI.enableManager(crydrViewAddress, owner, managerGeneral);

  global.console.log('\tManagers of crydr view successfully configured');
  return null;
};
