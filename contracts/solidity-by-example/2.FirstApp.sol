// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.20 and less than 0.9.0
pragma solidity ^0.8.20;

import "hardhat/console.sol";

error NotNegativeNumber(uint number);

contract Counter {
    // public变量会自动生成同名的getter函数，用于查询数值
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        // count += 1; // TypeError
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This function will fail if count = 0
        if (count <= 0) {
            console.log("count is already zero");
            revert NotNegativeNumber(count);
        }
        count -= 1;
    }
}