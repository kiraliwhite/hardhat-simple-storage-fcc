// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract SimpleStorage {
  uint256 favoriteNumber;

  struct People {
    uint256 favoriteNumber;
    string name;
  }
  People[] public people;

  mapping(string => uint256) public nameToFavoriteNumber;

  function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
  }

  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    people.push(People(_favoriteNumber, _name));
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }

  function viewNumberofName(string memory _name) public view returns (uint256) {
    return nameToFavoriteNumber[_name];
  }

  function viewPersonNumber(uint256 _index) public view returns (uint256 Number)
  {
    return people[_index].favoriteNumber;
  }

  function viewPersonName(uint256 _index) public view returns (string memory Name)
  {
    return people[_index].name;
  }

  //一次回傳兩個變數
  function viewPerson(uint256 _index) public view returns (string memory Name, uint256 Number)
  {
    return (people[_index].name, people[_index].favoriteNumber);
  }
}
