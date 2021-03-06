const JNTPayableServiceMock = global.artifacts.require('JNTPayableServiceMock.sol');
const JNTControllerStub = global.artifacts.require('JNTControllerStub.sol');

const ManageableJSAPI = require('../../../jsroutines/jsapi/lifecycle/Manageable');
const PausableJSAPI = require('../../../jsroutines/jsapi/lifecycle/Pausable');
const JNTPayableServiceJSAPI = require('../../../jsroutines/jsapi/crydr/jnt/JNTPayableServiceInterface');

const DeployConfig = require('../../../jsroutines/jsconfig/DeployConfig');

const CheckExceptions = require('../../../jsroutines/util/CheckExceptions');


global.contract('JNTPayableService', (accounts) => {
  let jntPayableServiceInstance;
  let jntControllerStubInstance01;
  let jntControllerStubInstance02;

  DeployConfig.setAccounts(accounts);
  const { owner, managerPause, managerJNT, jntBeneficiary, testInvestor1, testInvestor2 } = DeployConfig.getAccounts();


  global.beforeEach(async () => {
    jntPayableServiceInstance = await JNTPayableServiceMock.new({ from: owner });
    jntControllerStubInstance01 = await JNTControllerStub.new({ from: owner });  // we need to mock it
    jntControllerStubInstance02 = await JNTControllerStub.new({ from: owner });  // we need to mock it

    await PausableJSAPI.grantManagerPermissions(jntPayableServiceInstance.address, owner, managerPause);
    await JNTPayableServiceJSAPI.grantManagerPermissions(jntPayableServiceInstance.address, owner, managerJNT);
    await ManageableJSAPI.enableManager(jntPayableServiceInstance.address, owner, managerPause);
    await ManageableJSAPI.enableManager(jntPayableServiceInstance.address, owner, managerJNT);

    await JNTPayableServiceJSAPI.setJntController(jntPayableServiceInstance.address, managerJNT,
                                                  jntControllerStubInstance01.address);
    await JNTPayableServiceJSAPI.setJntBeneficiary(jntPayableServiceInstance.address, managerJNT, jntBeneficiary);

    await PausableJSAPI.unpauseContract(jntPayableServiceInstance.address, managerPause);
  });

  global.it('should test setJntController method', async () => {
    await PausableJSAPI.pauseContract(jntPayableServiceInstance.address, managerPause);

    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntController,
                                              [jntPayableServiceInstance.address, testInvestor1,
                                               jntControllerStubInstance02.address],
                                              'Only manager should be able to set JntController');
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntController,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               testInvestor1],
                                              'Should be a valid address of JntController');
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntController,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               0x0],
                                              'Should be a valid address of JntController');
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntController,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               jntControllerStubInstance01.address],
                                              'Not possible to set the same address');

    await JNTPayableServiceJSAPI.setJntController(jntPayableServiceInstance.address, managerJNT,
                                                  jntControllerStubInstance02.address);

    await PausableJSAPI.unpauseContract(jntPayableServiceInstance.address, managerPause);

    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntController,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               jntControllerStubInstance01.address],
                                              'Not possible to configure unpaused contract');
  });

  global.it('should test setJntBeneficiary method', async () => {
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntBeneficiary,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               jntBeneficiary],
                                              'Not possible to configure unpaused contract');

    await PausableJSAPI.pauseContract(jntPayableServiceInstance.address, managerPause);

    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntBeneficiary,
                                              [jntPayableServiceInstance.address, testInvestor1,
                                               testInvestor2],
                                              'Only manager should be able to set JntBeneficiary');
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntBeneficiary,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               0x0],
                                              'Should be a valid address of JntBeneficiary');
    await CheckExceptions.checkContractThrows(JNTPayableServiceJSAPI.setJntBeneficiary,
                                              [jntPayableServiceInstance.address, managerJNT,
                                               jntBeneficiary],
                                              'Not possible to set the same address');

    await JNTPayableServiceJSAPI.setJntBeneficiary(jntPayableServiceInstance.address, managerJNT,
                                                   testInvestor1);
  });
});
