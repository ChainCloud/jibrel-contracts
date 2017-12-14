/* Author: Aleksey Selikhov  aleksey.selikhov@gmail.com */

pragma solidity ^0.4.18;


import '../../lifecycle/ManageableInterface.sol';
import './BytecodeExecutorInterface.sol';


/**
 * @title BytecodeExecutor
 * @dev Implementation of a contract that execute any bytecode on behalf of the contract
 * @dev Last resort for the immutable and not-replaceable contract :)
 */
contract BytecodeExecutor is ManageableInterface,
                             BytecodeExecutorInterface {

  /* Storage */

  bool underExecution = false;


  /* BytecodeExecutorInterface */

  ///// [review] This is very dangerous feature
  ///// [review] Consider removing it
  function executeCall(
    address _target,
    uint256 _suppliedGas,
    uint256 _ethValue,
    bytes _transactionBytecode
  )
    external
    onlyAllowedManager('execute_call')
  {
    require(underExecution == false);

    underExecution = true; // Avoid recursive calling
    _target.call.gas(_suppliedGas).value(_ethValue)(_transactionBytecode);
    underExecution = false;

    CallExecutedEvent(_target, _suppliedGas, _ethValue, keccak256(_transactionBytecode));
  }

  ///// [review] This is very dangerous feature
  ///// [review] Consider removing it
  function executeDelegatecall(
    address _target,
    uint256 _suppliedGas,
    bytes _transactionBytecode
  )
    external
    onlyAllowedManager('execute_delegatecall')
  {
    require(underExecution == false);

    underExecution = true; // Avoid recursive calling
    _target.delegatecall.gas(_suppliedGas)(_transactionBytecode);
    underExecution = false;

    DelegatecallExecutedEvent(_target, _suppliedGas, keccak256(_transactionBytecode));
  }
}
