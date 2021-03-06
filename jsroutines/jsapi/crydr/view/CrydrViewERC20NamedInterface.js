import { submitTxAndWaitConfirmation } from '../../misc/SubmitTx';

const CrydrViewERC20NamedInterface = global.artifacts.require('CrydrViewERC20NamedInterface.sol');


export const setName = async (crydrViewAddress, managerAddress,
                              newName) => {
  global.console.log('\tSet name of the crydr view:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tmanagerAddress - ${managerAddress}`);
  global.console.log(`\t\tnewName - ${newName}`);
  await submitTxAndWaitConfirmation(
    CrydrViewERC20NamedInterface
      .at(crydrViewAddress)
      .setName
      .sendTransaction,
    [newName, { from: managerAddress }]);
  global.console.log('\tName of crydr view configured');
  return null;
};

export const setSymbol = async (crydrViewAddress, managerAddress,
                                newSymbol) => {
  global.console.log('\tSet symbol of the crydr view:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tmanagerAddress - ${managerAddress}`);
  global.console.log(`\t\tnewSymbol - ${newSymbol}`);
  await submitTxAndWaitConfirmation(
    CrydrViewERC20NamedInterface
      .at(crydrViewAddress)
      .setSymbol
      .sendTransaction,
    [newSymbol, { from: managerAddress }]);
  global.console.log('\tSymbol of crydr view configured');
  return null;
};

export const setDecimals = async (crydrViewAddress, managerAddress,
                                  newDecimals) => {
  global.console.log('\tSet decimals of the crydr view:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tmanagerAddress - ${managerAddress}`);
  global.console.log(`\t\tnewSymbol - ${newDecimals}`);
  await submitTxAndWaitConfirmation(
    CrydrViewERC20NamedInterface
      .at(crydrViewAddress)
      .setDecimals
      .sendTransaction,
    [newDecimals, { from: managerAddress }]);
  global.console.log('\tDecimals of crydr view configured');
  return null;
};
