import { submitTxAndWaitConfirmation } from '../../misc/SubmitTx';

const Promise = require('bluebird');

const ERC20Interface = global.artifacts.require('CrydrViewERC20Interface.sol');


/**
 * ERC20
 */

export const name = async (contractAddress) =>
  ERC20Interface.at(contractAddress).name.call();

export const symbol = async (contractAddress) =>
  ERC20Interface.at(contractAddress).symbol.call();

export const decimals = async (contractAddress) =>
  ERC20Interface.at(contractAddress).decimals.call();


export const transfer = async (crydrViewAddress, spenderAddress,
                               toAddress, valueTransferred) => {
  global.console.log('\tTransfer tokens:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tspenderAddress - ${spenderAddress}`);
  global.console.log(`\t\ttoAddress - ${toAddress}`);
  global.console.log(`\t\tvalueTransferred - ${valueTransferred}`);
  await submitTxAndWaitConfirmation(
    ERC20Interface
      .at(crydrViewAddress)
      .transfer
      .sendTransaction,
    [toAddress, valueTransferred, { from: spenderAddress }]);
  global.console.log('\tTokens successfully transferred');
  return null;
};

export const totalSupply = async (contractAddress) =>
  ERC20Interface.at(contractAddress).totalSupply.call();

export const balanceOf = async (contractAddress, ownerAddress) =>
  ERC20Interface.at(contractAddress).balanceOf.call(ownerAddress);


export const approve = async (crydrViewAddress, approverAddress,
                              spenderAddress, valueApproved) => {
  global.console.log('\tTransfer tokens:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tapproverAddress - ${approverAddress}`);
  global.console.log(`\t\tspenderAddress - ${spenderAddress}`);
  global.console.log(`\t\tvalueApproved - ${valueApproved}`);
  await submitTxAndWaitConfirmation(
    ERC20Interface
      .at(crydrViewAddress)
      .approve
      .sendTransaction,
    [spenderAddress, valueApproved, { from: approverAddress }]);
  global.console.log('\tTokens successfully transferred');
  return null;
};

export const transferFrom = async (crydrViewAddress, spenderAddress,
                                   fromAddress, toAddress, valueTransferred) => {
  global.console.log('\tTransferFrom tokens:');
  global.console.log(`\t\tcrydrViewAddress - ${crydrViewAddress}`);
  global.console.log(`\t\tspenderAddress - ${spenderAddress}`);
  global.console.log(`\t\tfromAddress - ${fromAddress}`);
  global.console.log(`\t\ttoAddress - ${toAddress}`);
  global.console.log(`\t\tvalueTransferred - ${valueTransferred}`);
  await submitTxAndWaitConfirmation(
    ERC20Interface
      .at(crydrViewAddress)
      .transferFrom
      .sendTransaction,
    [fromAddress, toAddress, valueTransferred, { from: spenderAddress }]);
  global.console.log('\tTokens successfully Transferred From');
  return null;
};

export const allowance = async (contractAddress, ownerAddress, spenderAddress) =>
  ERC20Interface.at(contractAddress).allowance.call(ownerAddress, spenderAddress);


/**
 * Events
 */

export const getTransferEvents = (contractAddress, eventDataFilter = {}, commonFilter = {}) => {
  const eventObj = ERC20Interface
    .at(contractAddress)
    .Transfer(eventDataFilter, commonFilter);
  const eventGet = Promise.promisify(eventObj.get).bind(eventObj);
  return eventGet();
};

export const getApprovalEvents = (contractAddress, eventDataFilter = {}, commonFilter = {}) => {
  const eventObj = ERC20Interface
    .at(contractAddress)
    .Approval(eventDataFilter, commonFilter);
  const eventGet = Promise.promisify(eventObj.get).bind(eventObj);
  return eventGet();
};
