/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.18;


import '../../lifecycle/PausableInterface.sol';
import './CrydrViewBaseInterface.sol';
import './CrydrViewERC20Interface.sol';
import './CrydrViewERC20LoggableInterface.sol';


contract CrydrViewERC20Loggable is PausableInterface,
                                   CrydrViewBaseInterface,
                                   CrydrViewERC20Interface,
                                   CrydrViewERC20LoggableInterface {

  function emitTransferEvent(
    address _from,
    address _to,
    uint256 _value
  )
    external
    whenContractNotPaused
  {
    require(msg.sender == getCrydrController());

    Transfer(_from, _to, _value);
  }

  function emitApprovalEvent(
    address _owner,
    address _spender,
    uint256 _value
  )
    external
    whenContractNotPaused
  {
    require(msg.sender == getCrydrController());

    Approval(_owner, _spender, _value);
  }
}
