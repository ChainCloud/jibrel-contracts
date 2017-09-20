import { submitTxAndWaitConfirmation } from '../../../routine/misc/SubmitTx';

const JNTPayableService = global.artifacts.require('JNTPayableService.sol');
const JNTController     = global.artifacts.require('JNTController.sol');

const UtilsTestRoutines         = require('../../../routine/misc/UtilsTest');
const ManageableRoutines        = require('../../../routine/lifecycle/Manageable');
const PausableRoutines          = require('../../../routine/lifecycle/Pausable');
const JNTPayableServiceRoutines = require('../../../routine/crydr/jnt/JNTPayableService');


global.contract('JNTPayableService', (accounts) => {
  let jntPayableServiceContract;
  let jntControllerContract;

  const owner       = accounts[0];
  const manager01   = accounts[1];
  const manager02   = accounts[2];
  const manager03   = accounts[3];
  const manager04   = accounts[4];
  const manager05   = accounts[5];
  const beneficiary = accounts[6];

  global.beforeEach(async () => {
    jntPayableServiceContract = await JNTPayableService.new({ from: owner });
    jntControllerContract = await JNTController.new({ from: owner });

    await ManageableRoutines.grantManagerPermissions(jntPayableServiceContract.address, owner, manager01,
                                                     ['pause_contract']);
    await ManageableRoutines.grantManagerPermissions(jntPayableServiceContract.address, owner, manager02,
                                                     ['unpause_contract']);
    await ManageableRoutines.grantManagerPermissions(jntPayableServiceContract.address, owner, manager03,
                                                     ['set_jnt_controller']);
    await ManageableRoutines.grantManagerPermissions(jntPayableServiceContract.address, owner, manager04,
                                                     ['set_jnt_beneficiary']);
    await ManageableRoutines.grantManagerPermissions(jntPayableServiceContract.address, owner, manager05,
                                                     ['withdraw_jnt']);
    await ManageableRoutines.enableManager(jntPayableServiceContract.address, owner, manager01);
    await ManageableRoutines.enableManager(jntPayableServiceContract.address, owner, manager02);
    await ManageableRoutines.enableManager(jntPayableServiceContract.address, owner, manager03);
    await ManageableRoutines.enableManager(jntPayableServiceContract.address, owner, manager04);
    await ManageableRoutines.enableManager(jntPayableServiceContract.address, owner, manager05);
  });

  global.it('should test that contract works as expected', async () => {
    global.console.log(`\tjntPayableServiceContract: ${jntPayableServiceContract.address}`);
    global.assert.notStrictEqual(jntPayableServiceContract.address, '0x0000000000000000000000000000000000000000');

    global.console.log(`\tjntControllerContract: ${jntControllerContract.address}`);
    global.assert.notStrictEqual(jntControllerContract.address, '0x0000000000000000000000000000000000000000');

    let isPaused = await jntPayableServiceContract.getPaused.call();
    global.assert.strictEqual(isPaused, true, 'Just deployed jntPayableService contract must be paused');

    let controllerAddress = await jntPayableServiceContract.getJntController.call();
    global.assert.strictEqual(controllerAddress, '0x0000000000000000000000000000000000000000', 'Just deployed jntPayableService contract should have noninitialized jntController address');

    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntController.sendTransaction,
      [jntControllerContract.address, { from: manager03 }]);
    controllerAddress = await jntPayableServiceContract.getJntController.call();
    global.assert.strictEqual(controllerAddress, jntControllerContract.address, 'Expected that jntController is set');

    let beneficiaryAddress = await jntPayableServiceContract.getJntBeneficiary.call();
    global.assert.strictEqual(beneficiaryAddress, '0x0000000000000000000000000000000000000000', 'Just deployed jntPayableService contract should have noninitialized jntBeneficiary address');

    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
      [beneficiary, { from: manager04 }]);
    beneficiaryAddress = await jntPayableServiceContract.getJntBeneficiary.call();
    global.assert.strictEqual(beneficiaryAddress, beneficiary, 'Expected that jntBeneficiary is set');

    await PausableRoutines.unpauseContract(jntPayableServiceContract.address, manager02);
    isPaused = await jntPayableServiceContract.getPaused.call();
    global.assert.strictEqual(isPaused, false, 'Expected that contract is unpaused');

    await PausableRoutines.pauseContract(jntPayableServiceContract.address, manager01);
    isPaused = await jntPayableServiceContract.getPaused.call();
    global.assert.strictEqual(isPaused, true, 'Expected that contract is unpaused');

    //todo test withdraw
  });

  global.it('should test that functions throw if general conditions are not met', async () => {
    global.console.log(`\tjntPayableServiceContract: ${jntPayableServiceContract.address}`);
    global.assert.notStrictEqual(jntPayableServiceContract.address, '0x0000000000000000000000000000000000000000');

    global.console.log(`\tjntControllerContract: ${jntControllerContract.address}`);
    global.assert.notStrictEqual(jntControllerContract.address, '0x0000000000000000000000000000000000000000');

    let isPaused = await jntPayableServiceContract.getPaused.call();
    global.assert.strictEqual(isPaused, true, 'Just deployed pausable contract must be paused');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntController.sendTransaction,
                                                [jntControllerContract.address, { from: manager01 }],
                                                'Only manager should be able to set JntController');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntController.sendTransaction,
                                                [0x0, { from: manager03 }],
                                                'Should be a valid address of JntController');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntController.sendTransaction,
                                                [manager01, { from: manager03 }],
                                                'Should be a valid address of JntController');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
                                                [beneficiary, { from: manager01 }],
                                                'Only manager should be able to set JntBeneficiary');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
                                                [0x0, { from: manager04 }],
                                                'Should be a valid address of JntBeneficiary');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.unpauseContract.sendTransaction,
                                                [{ from: manager03 }],
                                                'Only manager should be able to unpause contract');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.pauseContract.sendTransaction,
                                                [{ from: manager03 }],
                                                'It should not be possible to pause already paused contract');

    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntController.sendTransaction,
      [jntControllerContract.address, { from: manager03 }]);
    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
      [beneficiary, { from: manager04 }]);
    await PausableRoutines.unpauseContract(jntPayableServiceContract.address, manager02);
    isPaused = await jntPayableServiceContract.getPaused.call();
    global.assert.strictEqual(isPaused, false, 'Expected that contract is unpaused');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.pauseContract.sendTransaction,
                                                [{ from: manager02 }],
                                                'Only manager should be able to pause contract');
    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.unpauseContract.sendTransaction,
                                                [{ from: manager01 }],
                                                'It should not be possible to unpause already unpaused contract');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntController.sendTransaction,
                                                [jntControllerContract.address, { from: manager03 }],
                                                'It should not be possible to set JntController while contract is unpaused');

    await UtilsTestRoutines.checkContractThrows(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
                                                [beneficiary, { from: manager04 }],
                                                'It should not be possible to set JntBebeficiary while contract is unpaused');

    //todo test withdraw
  });

  global.it('should test that functions fire events', async () => {
    let blockNumber = global.web3.eth.blockNumber;
    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntController.sendTransaction,
      [jntControllerContract.address, { from: manager03 }]);
    let pastEvents = await JNTPayableServiceRoutines.getJNTControllerChangedEvents(jntPayableServiceContract.address,
                                                             {},
                                                             {
                                                               fromBlock: blockNumber + 1,
                                                               toBlock:   blockNumber + 1,
                                                               address:   manager03,
                                                             });
    global.assert.strictEqual(pastEvents.length, 1);


    blockNumber = global.web3.eth.blockNumber;
    await submitTxAndWaitConfirmation(jntPayableServiceContract.setJntBeneficiary.sendTransaction,
      [beneficiary, { from: manager04 }]);
    pastEvents = await JNTPayableServiceRoutines.getJNTBeneficiaryChangedEvents(jntPayableServiceContract.address,
                                                       {},
                                                       {
                                                         fromBlock: blockNumber + 1,
                                                         toBlock:   blockNumber + 1,
                                                         address:   manager04,
                                                       });
    global.assert.strictEqual(pastEvents.length, 1);

    //todo charge event test not possible
  });
});