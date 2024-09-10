pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract medCoin is ERC20{

    address public admin;

    address public marketplaceSmartContract;

    constructor(uint256 initialSupply) ERC20("medCoin","med"){
        _mint(msg.sender,initialSupply);
        admin = msg.sender;
    }

    function approveSmartContract(uint amount) external{
        _approve(msg.sender, marketplaceSmartContract, amount * 1000000000000000000);
    }

    function updatemarketplaceSmartContractAddress(address _address) external{
        marketplaceSmartContract = _address;
    }
}