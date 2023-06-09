// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TransferEth {
    /**
     * Send money to an address
     * @param receiver Address of the receiver
     */
    function sendMoney(address receiver) public payable {
        // Transfer the ether to the receiver
        (bool callSuccess, ) = payable(receiver).call{value: msg.value}("");
        // If transfer is not successful, return "Transfer failed"
        require(callSuccess, "Transfer failed");
    }
}
