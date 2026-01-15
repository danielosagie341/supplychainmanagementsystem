// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    event ProductCreated(string id, string name, string category, address indexed user);
    event InventoryUpdated(string id, string productId, string location, string quantity, address indexed user);

    function logProduct(string memory id, string memory name, string memory category) public {
        emit ProductCreated(id, name, category, msg.sender);
    }

    function logInventory(string memory id, string memory productId, string memory location, string memory quantity) public {
        emit InventoryUpdated(id, productId, location, quantity, msg.sender);
    }
}
