/* Author: Victor Mezrin  victor@mezrin.com */

pragma solidity ^0.4.11;


import "../lifecycle/Manageable.sol";


/**
 * @title JibrelAPIInterface
 * @dev Interface of the Jibrel API contract
 */
contract JibrelAPIInterface {

  /* Events */

  event BODCChangedEvent(address indexed newAddress);
  event JibrelDAOChangedEvent(address indexed newAddress);
  event InvestorRegistryChangedEvent(address indexed newAddress);
  event CryDRRegistryChangedEvent(address indexed newAddress);


  /* Public functions */

  function getBODC() constant returns (address);
  function getJibrelDAO() constant returns (address);
  function getInvestorRegistry() constant returns (address);
  function getCryDRRegistry() constant returns (address);
}


/**
 * @title JibrelAPI
 * @dev Contract that implements the Jibrel API Interface. Just a draft
 */
contract JibrelAPI is JibrelAPIInterface, Manageable {

  /* Storage */

  address public BODC;
  address public JibrelDAO;
  address public InvestorRegistry;
  address public CryDRRegistry;


  /* Constructor */

  function JibrelAPI(
    address _BODC,
    address _JibrelDAO,
    address _InvestorRegistry,
    address _CryDRRegistry
  )
    checkAddress(_BODC)
    checkAddress(_JibrelDAO)
    checkAddress(_InvestorRegistry)
    checkAddress(_CryDRRegistry)
  {
    BODC = _BODC;
    JibrelDAO = _JibrelDAO;
    InvestorRegistry = _InvestorRegistry;
    CryDRRegistry = _CryDRRegistry;
  }


  /* Setters */

  function setBODC(address _newAddress) checkAddress(_newAddress) onlyAllowedManager('set_bodc') {
    BODC = _newAddress;
    BODCChangedEvent(_newAddress);
  }

  function setJibrelDAO(address _newAddress) checkAddress(_newAddress) onlyAllowedManager('set_jibrel_dao') {
    JibrelDAO = _newAddress;
    JibrelDAOChangedEvent(_newAddress);
  }

  function setInvestorRegistry(address _newAddress) checkAddress(_newAddress) onlyAllowedManager('set_investor_repo') {
    InvestorRegistry = _newAddress;
    InvestorRegistryChangedEvent(_newAddress);
  }

  function setCryDRRegistry(address _newAddress) checkAddress(_newAddress) onlyAllowedManager('set_crydr_repo') {
    CryDRRegistry = _newAddress;
    CryDRRegistryChangedEvent(_newAddress);
  }


  /* Getters */

  function getBODC() constant returns (address) {
    return BODC;
  }

  function getJibrelDAO() constant returns (address) {
    return JibrelDAO;
  }

  function getInvestorRegistry() constant returns (address) {
    return InvestorRegistry;
  }

  function getCryDRRegistry() constant returns (address) {
    return CryDRRegistry;
  }


  /**
   * @dev Modifier to check new address
   */
  modifier checkAddress(address _address) {
    if (_address == 0x0) {
      throw;
    }
    _;
  }
}