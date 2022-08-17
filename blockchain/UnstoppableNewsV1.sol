// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract UnstoppableNewsV1 {

    struct Article {
        string cid;
        string title;
        string source;
        string date; 
        string category;
        string user;
    }

    Article[] public articles;
    mapping (string => uint) public upvotes;
    address payable public owner;

    // Events
    event articleAdded(string cid, address creator);

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    function addItem(
        string memory cid,
        string memory title,
        string memory source,
        string memory date,
        string memory category,
        string memory user
    ) public {
        articles.push(Article(cid, title, source, date, category, user));
        upvotes[cid] = 0;
        emit articleAdded(cid, msg.sender);
    }

    function upvote(string memory cid) public {
        upvotes[cid] = upvotes[cid] + 1;
    }

    function fetchItems(uint256 cursor, uint256 howMany) public view
    returns (string[] memory values, uint256 newCursor)
    {
        uint256 length = howMany;
        if (length > articles.length - cursor) {
            length = articles.length - cursor;
        }

        values = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            values[i] = articleToStrings(articles[cursor + i]);
        }

        return (values, cursor + length);
    }

    // make it backwards
    function fetchItemsBw(uint256 cursor, uint256 howMany) public view
    returns (string[] memory values, uint256 newCursor)
    {
        uint256 length = howMany;
        if (length > articles.length - cursor) {
            length = articles.length - cursor;
        }

        values = new string[](length);
        for (uint256 i = 0; i < length; i++) {
            uint256 k = articles.length - 1 - i;
            values[i] = articleToStrings(articles[k - cursor]);
        }

        return (values, cursor + length);
    }

    function articleToStrings(Article memory a) 
        internal view returns (string memory result) {
            string memory sp = "||";
            string memory _upvotes = uintToString(upvotes[a.cid]);
            string memory _head = string(abi.encodePacked(a.cid, sp, a.title, sp, a.source, sp, a.date));
            string memory _tail = string(abi.encodePacked( a.category, sp, a.user, sp, _upvotes));
            result = string(
                abi.encodePacked(_head, sp, _tail)
            );
    }

    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}