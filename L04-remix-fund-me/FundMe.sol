// ** What do we want here? **
// - Get funds from users
// - Withdraw funds
// - Set a minimum funding value in USD

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public number;
    uint256 public minimumUsd = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        // Want to be able to set a minimum fund amount of ETH
        // 1. How do we send ETH to this contract?
        number = 5;
        require(msg.value >= minimumUsd, "Didn't send enough ETH! (1 ETH)"); // revert if condition is not met
        // What is reverting?
        // Undo any prior action, and send remaining gas back
        // -> With `number` variable we can see that number didn't change.

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }
}
