/* Author: Aleksey Selikhov  aleksey.selikhov@mgmail.com */

pragma solidity ^0.4.15;


import "../feature/assetid/AssetID.sol";
import "../crydr/storage/CrydrStorageBaseInterface.sol";
import "../crydr/storage/CrydrStorageERC20Interface.sol";


/**
 * @title CrydrStorageERC20Proxy
 * @dev This contract used only to test functions of CrydrStorage contract
 * @dev CrydrStorage allows calls only from CrydrController, which should be a contract,
 * @dev therefore we have to create proxy contract
 */
contract CrydrStorageERC20Proxy is AssetID,
                                   CrydrStorageBaseInterface,
                                   CrydrStorageERC20Interface {

  /* Storage */

  address crydrStorage;

  function CrydrStorageERC20Proxy(
    string _assetID,
    address _crydrStorage
  )
    AssetID(_assetID)
  {
    require(_crydrStorage != address(0x0));

    crydrStorage = _crydrStorage;
  }

  function setCrydrController(address _newController) { crydrStorage = _newController; }
  function getCrydrController() constant returns (address) { return crydrStorage; }


  /* Low-level change of balance. Implied that totalSupply kept in sync. */

  function increaseBalance(address _account, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).increaseBalance(_account, _value);
  }

  function decreaseBalance(address _account, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).decreaseBalance(_account, _value);
  }

  function getBalance(address _account) constant returns (uint)
  {
    return CrydrStorageBaseInterface(crydrStorage).getBalance(_account);
  }

  function getTotalSupply() constant returns (uint)
  {
    return CrydrStorageBaseInterface(crydrStorage).getTotalSupply();
  }


  /* Low-level change of allowance */

  function increaseAllowance(address _owner, address _spender, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).increaseAllowance(_owner, _spender, _value);
  }

  function decreaseAllowance(address _owner, address _spender, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).decreaseAllowance(_owner, _spender, _value);
  }

  function getAllowance(address _owner, address _spender) constant returns (uint)
  {
    return CrydrStorageBaseInterface(crydrStorage).getAllowance(_owner, _spender);
  }


  /* Low-level change of blocks and getters */

  function blockAccount(address _account)
  {
    CrydrStorageBaseInterface(crydrStorage).blockAccount(_account);
  }

  function unblockAccount(address _account)
  {
    CrydrStorageBaseInterface(crydrStorage).unblockAccount(_account);
  }

  function getAccountBlocks(address _account) constant returns (uint)
  {
    return CrydrStorageBaseInterface(crydrStorage).getAccountBlocks(_account);
  }


  function blockAccountFunds(address _account, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).blockAccountFunds(_account, _value);
  }

  function unblockAccountFunds(address _account, uint _value)
  {
    CrydrStorageBaseInterface(crydrStorage).unblockAccountFunds(_account, _value);
  }

  function getAccountBlockedFunds(address _account) constant returns (uint)
  {
    return CrydrStorageBaseInterface(crydrStorage).getAccountBlockedFunds(_account);
  }


  /* CrydrStorageERC20Interface */

  function transfer(address _msgsender, address _to, uint _value)
  {
    CrydrStorageERC20Interface(crydrStorage).transfer(_msgsender, _to, _value);
  }

  function transferFrom(address _msgsender, address _from, address _to, uint _value)
  {
    CrydrStorageERC20Interface(crydrStorage).transferFrom(_msgsender, _from, _to, _value);
  }

  function approve(address _msgsender, address _spender, uint _value)
  {
    CrydrStorageERC20Interface(crydrStorage).approve(_msgsender, _spender, _value);
  }
}