// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    // ** Data Types
    // --> boolean, uint, int, address, bytes, string
    // bool hasFavoriteNumber = true;
    // uint256 favoriteNumber = 5;
    // string favoriteNumberInText = "Five";
    // int256 favoriteInt = -5;
    // address myAddress = 0x0794da2794D42E683870AcABD12EdB36B9F3529b;
    // bytes32 favoriteBytes = "cat";

    // ** Gets initialized to zero
    //    if not specified, it's assigned aas internal
    uint256 favoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // Dynamic size array
    People[] public people;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // view -> no gas because disallow change state (except called by another non-view/pure fx
    // pure -> no gas because doesn't read the blockchain
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
