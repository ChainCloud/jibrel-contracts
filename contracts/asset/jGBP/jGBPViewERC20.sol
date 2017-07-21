/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.11;


import '../../crydr/view/CrydrViewERC20.sol';


contract jGBPViewERC20 is CrydrViewERC20 {
  function jGBPViewERC20() CrydrViewERC20("Pound sterling", "jGBP", 18) {}
}
