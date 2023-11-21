// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Variables are declared as either storage, memory or calldata to explicitly specify the location of the data.

// storage - variable is a state variable (store on blockchain)
// memory - variable is in memory and it exists while a function is being called
// calldata - special data location that contains function arguments

contract DataLocations {
    uint[] public arr;
    mapping(uint => address) map;
    struct MyStruct {
        uint foo;
    }
    mapping(uint => MyStruct) myStructs;
    MyStruct mySingleStruct;

    function f() public {
        // call _f with state variables
        _f(arr, map, myStructs[1]);

        // get a struct from a mapping
        MyStruct storage myStruct = myStructs[1];
        require(myStruct.foo != 0, "MyStruct.foo should be initialized.");

        // create a struct in memory
        MyStruct memory myMemStruct = MyStruct(0);
        myStructs[2] = myMemStruct;
        myMemStruct.foo++;
        require(myStructs[2].foo == 0, "myMemStruct.foo should not be modified.");
    }

    function _f(
        uint[] storage _arr,
        mapping(uint => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
        uint[] storage storageNewArr = _arr;
        uint[] memory memoryNewArr = _arr;

        _arr.push(42);

        require(storageNewArr.length != memoryNewArr.length, "Array and storage array should have different lengths");
        require(_arr.length == storageNewArr.length, "Arrays should have the same length");

        storageNewArr.push(10);
        require(_arr.length == storageNewArr.length, "Arrays should have the same length after modification");

        //update the value of a mapping
        _map[1] = msg.sender;
        // modify the struct
        _myStruct.foo++;
    }

    // You can return memory variables
    function setMemoryArr(uint[] memory _arr) public view returns (uint[] memory) {

        // Member "push" is not available in uint256[] memory outside of storage.
        // _arr.push(10);

        for (uint i = 0; i < _arr.length; i++) {
            require(_arr[i] == arr[i], "in function, _arr's value equal to arr");
             _arr[i] = 10;
            require(_arr[i] != arr[i], "memory array should not modify original array");
        }
        return _arr;
    }

    function g() public {
        
        arr.push(1);
        arr.push(2);
        arr.push(3);
        uint[] memory _arr = setMemoryArr(arr);
        require(arr[0] != _arr[0] && _arr[0] == 10, "arr should not be modified");
        require(arr[1] != _arr[1] && _arr[0] == 10, "arr should not be modified");
        require(arr[2] != _arr[2] && _arr[0] == 10, "arr should not be modified");
        
        uint[] memory _arr2 = _arr;
        _arr[0] = 7788;
        require(_arr[0] ==_arr2[0] && _arr2[0] == 7788, "memory array should be modified");


        MyStruct memory k = MyStruct(0);
        MyStruct memory k1 = k;
        MyStruct memory k2 = k;
        mySingleStruct = k;
        k.foo = 123;
        bool allMemoryEqual = k.foo == k1.foo && k.foo == k2.foo;
        require(allMemoryEqual, "k.foo should be equal to all kX.foo");
        require(k.foo != mySingleStruct.foo, "storage should not be modified");
    }

    function h(uint[] calldata _arr, uint firstEle) external view{
        require(_arr[0] == firstEle, "calldata array should be equal to firstEle");
        // calldata variables are read-only, so you cannot assign new values to them
        // _arr[0] = 123; // this will cause an error
    }
}

