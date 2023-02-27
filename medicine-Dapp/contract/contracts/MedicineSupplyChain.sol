pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MedicineSupplyChain{

    IERC20 public token1;
    address public owner1;

    enum SupplyChainSteps{Created, Paid, Delivered}
    struct S_Item {
        MedicineSupplyChain.SupplyChainSteps step;
        string customername;
        uint id;   
    }
    mapping(uint => S_Item) public items;
   
    event SupplyChainStep(uint id, uint step);

    constructor(
        address _token1
    ) {
        token1 = IERC20(_token1);
        owner1 = msg.sender;
    }

    function transferTokenAmount(address _toadd, uint amount) public{
        token1.transferFrom(msg.sender,_toadd , amount * 1000000000000000000 );
    }

    function getTokenBalance() public view returns(uint){
        uint balance = token1.balanceOf(msg.sender);
        balance = balance/1000000000000000000;
        return balance;
    }

    function createItem(string memory customername, uint id) public{
        items[id].step = SupplyChainSteps.Created;
        items[id].customername = customername;
        emit SupplyChainStep(id, uint(items[id].step));
    }

    function triggerPayment(uint id) public{
        items[id].step = SupplyChainSteps.Paid;
        // Allowing sender to transfer funds to owner account
        // token1.allowance(owner1, msg.sender);
        // Transfer from function  to send tokens from sender to owner address
        // For each and every medicine the user buy, we take 10 med tokens from the user
        _safeTransferFrom(token1, msg.sender, owner1);
        emit SupplyChainStep(id, uint(items[id].step));
    }

    function triggerDelivery(uint id) public{
        items[id].step = SupplyChainSteps.Delivered;
        // Transfer from function  to send tokens from sender to owner address
        // For every medicine delivery, we take 5 med tokens from the user
        token1.transferFrom(msg.sender, owner1, 5 * 1000000000000000000 );
        emit SupplyChainStep(id, uint(items[id].step));
    }

    function trackOrder(uint index) public view returns (MedicineSupplyChain.SupplyChainSteps){
        S_Item memory o = items[index];
        return o.step;
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient
    ) private {
        token.transferFrom(sender, recipient, 10 * 1000000000000000000 );
        
    }
}