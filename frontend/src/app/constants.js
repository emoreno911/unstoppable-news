export const contractAddress = "0x100C3675f5F20c7dC8BAF34c1308F5b199B626e8";

export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "articleAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			}
		],
		"name": "addItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "articles",
		"outputs": [
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "upvotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cursor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "howMany",
				"type": "uint256"
			}
		],
		"name": "fetchItems",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "newCursor",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cursor",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "howMany",
				"type": "uint256"
			}
		],
		"name": "fetchItemsBw",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "newCursor",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "upvote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]