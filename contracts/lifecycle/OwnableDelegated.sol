/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.13;


/**
 * @title OwnableDelegated
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract OwnableDelegated {
  address owner;


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender account.
   */
  function OwnableDelegated(address _owner) {
    owner = _owner;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require (msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }

  /**
   * @dev The getter for "owner" contract variable
   */
  function getOwner() constant returns (address) {
    return owner;
  }
}
