/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.18;

import '../../crydr/asset/JCashCrydrViewERC20.sol';


contract JNTViewERC20 is JCashCrydrViewERC20 {
  ///// [review] JNT ticker is used in 2 places -> in the Storage and in the View
  function JNTViewERC20() public JCashCrydrViewERC20('JNT', 'Jibrel Network Token', 'JNT', 18) {}
}
