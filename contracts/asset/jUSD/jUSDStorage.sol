/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.18;

import '../../crydr/asset/JCashCrydrStorage.sol';


contract jUSDStorage is JCashCrydrStorage {
  function jUSDStorage() public JCashCrydrStorage('jUSD') {}
}
