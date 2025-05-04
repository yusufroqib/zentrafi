export const BASIC_TOKEN_ABI = [
	{
		type: "constructor",
		inputs: [
			{
				name: "name_",
				type: "string",
				internalType: "string",
			},
			{
				name: "symbol_",
				type: "string",
				internalType: "string",
			},
			{
				name: "decimals_",
				type: "uint8",
				internalType: "uint8",
			},
			{
				name: "totalSupply_",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "payable",
	},
	{
		type: "receive",
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "DEPLOYMENT_KEY",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "bytes32",
				internalType: "bytes32",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "allowance",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
			{
				name: "spender",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "approve",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address",
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "balanceOf",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "decimals",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint8",
				internalType: "uint8",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "name",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "owner",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "address",
				internalType: "address",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "renounceOwnership",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "symbol",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "string",
				internalType: "string",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "totalSupply",
		inputs: [],
		outputs: [
			{
				name: "",
				type: "uint256",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "transfer",
		inputs: [
			{
				name: "to",
				type: "address",
				internalType: "address",
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "transferFrom",
		inputs: [
			{
				name: "from",
				type: "address",
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				internalType: "address",
			},
			{
				name: "value",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				name: "",
				type: "bool",
				internalType: "bool",
			},
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "transferOwnership",
		inputs: [
			{
				name: "newOwner",
				type: "address",
				internalType: "address",
			},
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "Approval",
		inputs: [
			{
				name: "owner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "spender",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "value",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "OwnershipTransferred",
		inputs: [
			{
				name: "previousOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "newOwner",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "Transfer",
		inputs: [
			{
				name: "from",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "to",
				type: "address",
				indexed: true,
				internalType: "address",
			},
			{
				name: "value",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "error",
		name: "ERC20InsufficientAllowance",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address",
			},
			{
				name: "allowance",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "needed",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{
		type: "error",
		name: "ERC20InsufficientBalance",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address",
			},
			{
				name: "balance",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "needed",
				type: "uint256",
				internalType: "uint256",
			},
		],
	},
	{
		type: "error",
		name: "ERC20InvalidApprover",
		inputs: [
			{
				name: "approver",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "ERC20InvalidReceiver",
		inputs: [
			{
				name: "receiver",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "ERC20InvalidSender",
		inputs: [
			{
				name: "sender",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "ERC20InvalidSpender",
		inputs: [
			{
				name: "spender",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "OwnableInvalidOwner",
		inputs: [
			{
				name: "owner",
				type: "address",
				internalType: "address",
			},
		],
	},
	{
		type: "error",
		name: "OwnableUnauthorizedAccount",
		inputs: [
			{
				name: "account",
				type: "address",
				internalType: "address",
			},
		],
	},
];

export const BASIC_TOKEN_BYTECODE =
	"0x608080604052610d8680380380916100178285610550565b83398101906080818303126102c05780516001600160401b0381116102c0578261004291830161058e565b602082015190926001600160401b0382116102c05761006291830161058e565b9060408101519060ff821682036102c0576060015183519091906001600160401b03811161046157600354600181811c91168015610546575b602082101461044357601f81116104e3575b50602094601f8211600114610480579481929394955f92610475575b50508160011b915f199060031b1c1916176003555b82516001600160401b03811161046157600454600181811c91168015610457575b602082101461044357601f81116103e0575b506020601f821160011461037d57819293945f92610372575b50508160011b915f199060031b1c1916176004555b331561035f5760058054336001600160a01b0319821681179092556040519092916001600160a01b0384167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a36331d98b3f60e01b81527fc1283260e535c8335304213599c7f410fac47568451730554b5e5446b0800b306004820152602081602481739a76954a5b317afcc9ec85070515b2273a8c33955afa908115610354575f91610322575b5034106102dd576001600160a81b03199091163360ff60a01b19161760a09190911b60ff60a01b161760055560068190556002548082019081106102c957600255335f525f60205260405f208181540190556040519081525f7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60203393a35f80808034739a76954a5b317afcc9ec85070515b2273a8c33955af13d156102c4573d61029481610573565b906102a26040519283610550565b81525f60203d92013e5b156102c0576040516107b190816105d58239f35b5f80fd5b6102ac565b634e487b7160e01b5f52601160045260245ffd5b60405162461bcd60e51b815260206004820152601a60248201527f5365727669636520666565206973206e6f7420656e6f756768210000000000006044820152606490fd5b90506020813d60201161034c575b8161033d60209383610550565b810103126102c057515f6101e9565b3d9150610330565b6040513d5f823e3d90fd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f8061012a565b601f1982169060045f52805f20915f5b8181106103c8575095836001959697106103b0575b505050811b0160045561013f565b01515f1960f88460031b161c191690555f80806103a2565b9192602060018192868b01518155019401920161038d565b60045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b601f830160051c81019160208410610439575b601f0160051c01905b81811061042e5750610111565b5f8155600101610421565b9091508190610418565b634e487b7160e01b5f52602260045260245ffd5b90607f16906100ff565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100c9565b601f1982169560035f52805f20915f5b8881106104cb575083600195969798106104b3575b505050811b016003556100de565b01515f1960f88460031b161c191690555f80806104a5565b91926020600181928685015181550194019201610490565b60035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b601f830160051c8101916020841061053c575b601f0160051c01905b81811061053157506100ad565b5f8155600101610524565b909150819061051b565b90607f169061009b565b601f909101601f19168101906001600160401b0382119082101761046157604052565b6001600160401b03811161046157601f01601f191660200190565b81601f820112156102c0578051906105a582610573565b926105b36040519485610550565b828452602083830101116102c057815f9260208093018386015e830101529056fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f3560e01c90816306fdde031461057257508063095ea7b3146104f05780630af5525c146104b657806318160ddd1461049957806323b872dd146103ba578063313ce5671461039757806370a0823114610360578063715018a6146103055780638da5cb5b146102dd57806395d89b41146101c2578063a9059cbb14610191578063dd62ed3e146101415763f2fde38b146100b7575f61000f565b3461013d57602036600319011261013d576100d061066b565b6100d8610754565b6001600160a01b0316801561012a57600580546001600160a01b0319811683179091556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3005b631e4fbdf760e01b5f525f60045260245ffd5b5f80fd5b3461013d57604036600319011261013d5761015a61066b565b610162610681565b6001600160a01b039182165f908152600160209081526040808320949093168252928352819020549051908152f35b3461013d57604036600319011261013d576101b76101ad61066b565b6024359033610697565b602060405160018152f35b3461013d575f36600319011261013d576040515f6004548060011c906001811680156102d3575b6020831081146102bf578285529081156102a3575060011461024e575b50819003601f01601f191681019067ffffffffffffffff82118183101761023a5761023682918260405282610641565b0390f35b634e487b7160e01b5f52604160045260245ffd5b905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b5f905b82821061028d57506020915082010182610206565b6001816020925483858801015201910190610278565b90506020925060ff191682840152151560051b82010182610206565b634e487b7160e01b5f52602260045260245ffd5b91607f16916101e9565b3461013d575f36600319011261013d576005546040516001600160a01b039091168152602090f35b3461013d575f36600319011261013d5761031d610754565b600580546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b3461013d57602036600319011261013d576001600160a01b0361038161066b565b165f525f602052602060405f2054604051908152f35b3461013d575f36600319011261013d57602060ff60055460a01c16604051908152f35b3461013d57606036600319011261013d576103d361066b565b6103db610681565b6001600160a01b0382165f818152600160209081526040808320338452909152902054909260443592915f198110610419575b506101b79350610697565b83811061047e57841561046b573315610458576101b7945f52600160205260405f2060018060a01b0333165f526020528360405f20910390558461040e565b634a1406b160e11b5f525f60045260245ffd5b63e602df0560e01b5f525f60045260245ffd5b8390637dc7a0d960e11b5f523360045260245260445260645ffd5b3461013d575f36600319011261013d576020600654604051908152f35b3461013d575f36600319011261013d5760206040517fc1283260e535c8335304213599c7f410fac47568451730554b5e5446b0800b308152f35b3461013d57604036600319011261013d5761050961066b565b60243590331561046b576001600160a01b031690811561045857335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b3461013d575f36600319011261013d575f6003548060011c90600181168015610637575b6020831081146102bf578285529081156102a357506001146105e25750819003601f01601f191681019067ffffffffffffffff82118183101761023a5761023682918260405282610641565b905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5f905b82821061062157506020915082010182610206565b600181602092548385880101520191019061060c565b91607f1691610596565b602060409281835280519182918282860152018484015e5f828201840152601f01601f1916010190565b600435906001600160a01b038216820361013d57565b602435906001600160a01b038216820361013d57565b6001600160a01b0316908115610741576001600160a01b031691821561072e57815f525f60205260405f205481811061071557817fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92602092855f525f84520360405f2055845f525f825260405f20818154019055604051908152a3565b8263391434e360e21b5f5260045260245260445260645ffd5b63ec442f0560e01b5f525f60045260245ffd5b634b637e8f60e11b5f525f60045260245ffd5b6005546001600160a01b0316330361076857565b63118cdaa760e01b5f523360045260245ffdfea2646970667358221220390b97628ccfea43db583b3ae0202df19220af0f05297f7324c4d54b420bd74764736f6c634300081c0033";

export const TAX_TOKEN_ABI = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string",
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string",
			},
			{
				internalType: "uint8",
				name: "decimals_",
				type: "uint8",
			},
			{
				internalType: "uint256",
				name: "totalSupply_",
				type: "uint256",
			},
			{
				internalType: "uint24",
				name: "buyFee_",
				type: "uint24",
			},
			{
				internalType: "uint24",
				name: "sellFee_",
				type: "uint24",
			},
			{
				internalType: "address payable",
				name: "taxReceiver_",
				type: "address",
			},
			{
				internalType: "address",
				name: "pancakeRouter_",
				type: "address",
			},
			{
				internalType: "address payable",
				name: "serviceFeeReceiver_",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "serviceFee_",
				type: "uint256",
			},
		],
		stateMutability: "payable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [],
		name: "_pancakePair",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_pancakeRouter",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_taxReceiver",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "automatedMarketMakerPairs",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256",
			},
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256",
			},
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "pair",
				type: "address",
			},
			{
				internalType: "bool",
				name: "value",
				type: "bool",
			},
		],
		name: "setAutomatedMarketMakerPair",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_mainRouter",
				type: "address",
			},
			{
				internalType: "address",
				name: "_baseTokenForMarket",
				type: "address",
			},
		],
		name: "updateMainPair",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint24",
				name: "_sellTaxFee",
				type: "uint24",
			},
			{
				internalType: "uint24",
				name: "_buyTaxFee",
				type: "uint24",
			},
		],
		name: "updateTaxFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "taxReceiver_",
				type: "address",
			},
		],
		name: "updateTaxReceiver",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "withdrawETH",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
		],
		name: "withdrawToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		stateMutability: "payable",
		type: "receive",
	},
];

export const TAX_TOKEN_BYTECODE =
	"60556032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f5ffdfea26469706673582212204334eac42563b6a6a9fb578238c7bc6a1a2865a9c7aaab52ed8474c98398027764736f6c634300081d0033";

export const ADVANCED_TOKEN_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "args",
        "type": "tuple",
        "internalType": "struct AdvancedToken.Args",
        "components": [
          { "name": "name", "type": "string", "internalType": "string" },
          { "name": "symbol", "type": "string", "internalType": "string" },
          { "name": "_decimals", "type": "uint8", "internalType": "uint8" },
          {
            "name": "_totalSupply",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "_serviceFeeReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "_taxReceiver",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "maxTransaction",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "maxWallet",
            "type": "uint256",
            "internalType": "uint256"
          },
          { "name": "buyFee", "type": "uint256", "internalType": "uint256" },
          { "name": "sellFee", "type": "uint256", "internalType": "uint256" },
          { "name": "dexType", "type": "uint256", "internalType": "uint256" },
          {
            "name": "dexRouter",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "rewardToken",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "buyReward",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sellReward",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lpBuyFee",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lpSellFee",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "buyBurnPercent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "sellBurnPercent",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "serviceFee",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ],
    "stateMutability": "payable"
  },
  { "type": "receive", "stateMutability": "payable" },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "spender", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "automatedMarketMakerPairs",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "dexRouter",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "dexType",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mainPair",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "onERC721Received",
    "inputs": [
      { "name": "", "type": "address", "internalType": "address" },
      { "name": "", "type": "address", "internalType": "address" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "bytes", "internalType": "bytes" }
    ],
    "outputs": [{ "name": "", "type": "bytes4", "internalType": "bytes4" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rewardToken",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setAutomatedMarketMakerPair",
    "inputs": [
      { "name": "pair", "type": "address", "internalType": "address" },
      { "name": "value", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setWhiteList",
    "inputs": [
      { "name": "_addr", "type": "address", "internalType": "address" },
      { "name": "value", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      { "name": "from", "type": "address", "internalType": "address" },
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      { "name": "newOwner", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateBurnFee",
    "inputs": [
      { "name": "_buyBurnFee", "type": "uint256", "internalType": "uint256" },
      { "name": "_sellBurnFee", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateLpFee",
    "inputs": [
      { "name": "_lpBuyFee", "type": "uint256", "internalType": "uint256" },
      { "name": "_lpSellFee", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateMaxTransaction",
    "inputs": [
      {
        "name": "_maxTransaction",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateMaxWallet",
    "inputs": [
      { "name": "_maxWallet", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateRewardFee",
    "inputs": [
      {
        "name": "_buyRewardFee",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_sellRewardFee",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTaxFee",
    "inputs": [
      { "name": "_buyTaxFee", "type": "uint256", "internalType": "uint256" },
      { "name": "_sellTaxFee", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTaxReceiver",
    "inputs": [
      { "name": "taxReceiver_", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "whiteList",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawETH",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawToken",
    "inputs": [
      { "name": "token", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "to",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ERC20InsufficientAllowance",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" },
      { "name": "allowance", "type": "uint256", "internalType": "uint256" },
      { "name": "needed", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InsufficientBalance",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" },
      { "name": "balance", "type": "uint256", "internalType": "uint256" },
      { "name": "needed", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidApprover",
    "inputs": [
      { "name": "approver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidReceiver",
    "inputs": [
      { "name": "receiver", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSender",
    "inputs": [
      { "name": "sender", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "ERC20InvalidSpender",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ]
  },
  {
    "type": "error",
    "name": "SafeERC20FailedOperation",
    "inputs": [
      { "name": "token", "type": "address", "internalType": "address" }
    ]
  }
]

export const ADVANCED_TOKEN_BYTECODE = "0x60808060405261317880380380916100178285611276565b833981016020828203126106ac578151916001600160401b0383116106ac576102808382018303126106ac576040519161028083016001600160401b0381118482101761118957604052818401516001600160401b0381116106ac578161008191868501016112b4565b835281840160200151906001600160401b0382116106ac576100a691858401016112b4565b92836020840152604081830101519160ff831683036106ac576102609260408501526060828201015160608501526100e26080838301016112fa565b60808501526100f560a0838301016112fa565b60a085015280820160c0818101519086015260e0808201519086015261010080820151908601526101208082015190860152610140808201519086015261013f90610160016112fa565b6101608501520161018081810151908401526101a080820151908401526101c080820151908401526101e080820151908401526102008082015190840152610220808201519084015261024080820151908401520151610260820152805180519092906001600160401b03811161118957600354600181811c9116801561126c575b602082101461116b57601f811161120d575b506020601f82116001146111a857819293945f9261119d575b50508160011b915f199060031b1c1916176003555b8051906001600160401b0382116111895760045490600182811c9216801561117f575b602083101461116b5781601f849311611100575b50602090601f8311600114611097575f9261108c575b50508160011b915f199060031b1c1916176004555b33156110795760055460405190336001600160a01b0382167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a360408301516001600160a81b03199091163360ff60a01b19161760a09190911b60ff60a01b161760055560608201516006556080820151600780546001600160a01b0319166001600160a01b03929092169190911790556102608201513410611037575060018060a01b0360a08201511660018060a01b0319600854161760085560c081015160095560e0810151600a5561010081015180600b556101208201519081600c55610140830151600d5560018060a01b0361016084015116918260018060a01b0319600e541617600e55610180840151600f556101a0840151806010556101c0850151806011556101e086015190816012556102008701519283601355610220880151948560145562030d406102408a0151978860155511159081611029575b5015610fd95762030d4010159081610fcb575b5015610f785762030d4010159081610f6a575b5015610f0d5762030d4010159081610eff575b5015610ea7573015610e94578015610e8157305f52600160205260405f20815f5260205260405f205f1990556040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a36016805460ff60a01b1916600160a01b179081905560065490819060a01c60ff16610e65575b5f805260186020525f5160206131585f395f51905f525460ff1615156001148015610e4a575b1561096557505f8080936104b78294336115af565b6007546102609190910151906001600160a01b03165af16104d661130e565b50156106ac57600d54600281036107475750600e5460405163c45a015560e01b8152906001600160a01b0316602082600481845afa9182156106b8575f92610706575b506020600491604051928380926315ab88c960e31b82525afa9081156106b8575f916106c3575b506040516364e329cb60e11b81523060048201526001600160a01b03918216602482015291602091839160449183915f91165af19081156106b8575f9161067a575b50601680546001600160a01b0319166001600160a01b03929092169190911790555b6016546005546001600160a01b03918216913391160361066757805f526017602052600160ff60405f2054161515146105fc575f52601760205260405f20600160ff1982541617905560405161191b908161181d8239f35b60405162461bcd60e51b815260206004820152603860248201527f4175746f6d61746564206d61726b6574206d616b65722070616972206973206160448201527f6c72656164792073657420746f20746861742076616c756500000000000000006064820152608490fd5b63118cdaa760e01b5f523360045260245ffd5b90506020813d6020116106b0575b8161069560209383611276565b810103126106ac576106a6906112fa565b5f610582565b5f80fd5b3d9150610688565b6040513d5f823e3d90fd5b90506020813d6020116106fe575b816106de60209383611276565b810103126106ac575f9160446106f56020936112fa565b92505091610540565b3d91506106d1565b9091506020813d60201161073f575b8161072260209383611276565b810103126106ac5760206107376004926112fa565b929150610519565b3d9150610715565b6003036105a457600e546040516312a9293f60e21b81526001600160a01b0390911690602081600481855afa9081156106b8575f9161092b575b50306001600160a01b0390911611156108c1576040516312a9293f60e21b815230602082600481865afa9182156106b8575f92610882575b506084602092915b5f6001600160a01b036107d7600160c01b61135b565b6040516309f56ab160e11b81526001600160a01b039485166004820152939095166024840152610bb86044840152909316606482015293849283915af19081156106b8575f91610848575b50601680546001600160a01b0319166001600160a01b03929092169190911790556105a4565b90506020813d60201161087a575b8161086360209383611276565b810103126106ac57610874906112fa565b5f610822565b3d9150610856565b91506020823d6020116108b9575b8161089d60209383611276565b810103126106ac5760846108b26020936112fa565b92506107b9565b3d9150610890565b6040516312a9293f60e21b8152602081600481855afa80156106b8575f906108f1575b60209150608430916107c1565b506020813d602011610923575b8161090b60209383611276565b810103126106ac5761091e6020916112fa565b6108e4565b3d91506108fe565b90506020813d60201161095d575b8161094660209383611276565b810103126106ac57610957906112fa565b5f610781565b3d9150610939565b5f805260176020527fd840e16649f6b9a295d95876f4633d3a6b10b55e8162971cf78afd886d5ec89b5460ff1615610c5757506040516370a0823160e01b8152336004820152602081602481305afa80156106b85782905f90610c21575b6109cd92506115a2565b60095480610c0f575b50600a549081610bbe575b5050335f52601860205260405f20600160ff19825416179055600b5480610b90575b5060105480610ac9575b505f808093610a31829460125480610a67575b5060145480610a4a575b50336115af565b338252601860205260408220805460ff191690556104b7565b620f4240610a5b610a6192846114d6565b04611609565b5f610a2a565b610a9b620f4240610a89610ac393610a836002600d5414611556565b856114d6565b048093610a9682306115af565b6114fd565b91610abd8160011c91610ab7610ab28447936114fd565b611646565b476114fd565b9061179e565b5f610a20565b610ad7620f424091836114d6565b04600f5460018103610aea575b50610a0d565b600214610af8575b80610ae4565b905f8080610b28610b13868396610a966002600d541461150a565b95610b1e81306115af565b610ab74791611646565b335af1610b3361130e565b5015610b3f575f610af2565b60405162461bcd60e51b815260206004820152602360248201527f53656e64696e672062757920726577617264207769746820455448206661696c60448201526265642160e81b6064820152608490fd5b90620f4240610ba2610bb893836114d6565b0490610a968260018060a01b03600854166115af565b5f610a03565b11610bca575f806109e1565b60405162461bcd60e51b815260206004820152601860248201527f486f6c64696e6720657863656564206d617857616c6c657400000000000000006044820152606490fd5b610c1b9083111561148a565b5f6109d6565b50506020813d602011610c4f575b81610c3c60209383611276565b810103126106ac57816109cd91516109c3565b3d9150610c2f565b335f52601760205260ff60405f205416610c78575b50505f808080936104b7565b60095480610e38575b505f805260186020525f5160206131585f395f51905f52805460ff19166001179055600c5480610e1e575b505060115480610d41575b505f808093610cda829460135480610cf6575b5060155480610a4a5750336115af565b81805260186020526040909120805460ff191690559250610c6c565b610d1a620f4240610d12610d3b93610a836002600d5414611556565b0480936114fd565b91610d2581306115af565b610abd8160011c91610ab7610ab28447936114fd565b5f610cca565b610d4f620f424091836114d6565b0490600f54600181145f14610d7c57505f8093610cda610d71839584956114fd565b945050935050610cb7565b909190600214610d96575b505f808093610cda8294610d71565b5f8080610db68194610dac6002600d541461150a565b610b1e81306115af565b815af1610dc161130e565b5015610dcd575f610d87565b60405162461bcd60e51b8152602060048201526024808201527f53656e64696e672073656c6c20726577617264207769746820455448206661696044820152636c65642160e01b6064820152608490fd5b610e319250610ba2620f424091836114d6565b5f80610cac565b610e449082111561148a565b5f610c81565b50335f526018602052600160ff60405f2054161515146104a2565b610e6f81336115af565b6016805460ff60a01b1916905561047c565b634a1406b160e11b5f525f60045260245ffd5b63e602df0560e01b5f525f60045260245ffd5b60405162461bcd60e51b815260206004820152602a60248201527f4275726e696e672070657263656e742063616e27742062652067726561746572604482015269207468616e203230252160b01b6064820152608490fd5b62030d40915011155f6103fd565b60405162461bcd60e51b815260206004820152602f60248201527f4c697175696469747920616464696e67206665652063616e277420626520677260448201526e6561746572207468616e203230252160881b6064820152608490fd5b62030d40915011155f6103ea565b60405162461bcd60e51b815260206004820152602560248201527f526577617264206665652063616e27742062652067726561746572207468616e604482015264203230252160d81b6064820152608490fd5b62030d40915011155f6103d7565b60405162461bcd60e51b815260206004820152602260248201527f546178206665652063616e27742062652067726561746572207468616e203230604482015261252160f01b6064820152608490fd5b62030d40915011155f6103c4565b62461bcd60e51b815260206004820152601a60248201527f5365727669636520666565206973206e6f7420656e6f756768210000000000006044820152606490fd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f8061024e565b925060045f52805f20905f935b601f19841685106110e5576001945083601f198116106110cd575b505050811b01600455610263565b01515f1960f88460031b161c191690555f80806110bf565b818101518355602094850194600190930192909101906110a4565b60045f529091507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b601f840160051c810160208510611164575b90849392915b601f830160051c82018110611156575050610238565b5f8155859450600101611140565b508061113a565b634e487b7160e01b5f52602260045260245ffd5b91607f1691610224565b634e487b7160e01b5f52604160045260245ffd5b015190505f806101ec565b60035f52805f20905f5b601f19841681106111f55750600193949583601f198116106111dd575b505050811b01600355610201565b01515f1960f88460031b161c191690555f80806111cf565b9091602060018192858a0151815501930191016111b2565b60035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b601f830160051c810160208410611265575b601f830160051c8201811061125a5750506101d3565b5f8155600101611244565b5080611244565b90607f16906101c1565b601f909101601f19168101906001600160401b0382119082101761118957604052565b6001600160401b03811161118957601f01601f191660200190565b81601f820112156106ac578051906112cb82611299565b926112d96040519485611276565b828452602083830101116106ac57815f9260208093018386015e8301015290565b51906001600160a01b03821682036106ac57565b3d15611338573d9061131f82611299565b9161132d6040519384611276565b82523d5f602084013e565b606090565b8115611347570490565b634e487b7160e01b5f52601260045260245ffd5b600181111561148757806001600160801b821015611471575b60048268010000000000000000611423941015611464575b640100000000811015611457575b6201000081101561144a575b61010081101561143e575b6010811015611432575b101561142a575b60030260011c6113d2818461133d565b0160011c6113e0818461133d565b0160011c6113ee818461133d565b0160011c6113fc818461133d565b0160011c61140a818461133d565b0160011c611418818461133d565b0160011c809261133d565b8111900390565b60011b6113c2565b811c9160021b916113bb565b60081c91811b916113b1565b60101c9160081b916113a6565b60201c9160101b9161139a565b60401c9160201b9161138c565b5050608081901c68010000000000000000611374565b90565b1561149157565b60405162461bcd60e51b815260206004820152601c60248201527f416d6f756e7420657863656564206d61785472616e73616374696f6e000000006044820152606490fd5b818102929181159184041417156114e957565b634e487b7160e01b5f52601160045260245ffd5b919082039182116114e957565b1561151157565b60405162461bcd60e51b815260206004820152601960248201527f43616e277420776f726b2072657761726420666f7220563321000000000000006044820152606490fd5b1561155d57565b60405162461bcd60e51b815260206004820152601c60248201527f43616e277420776f726b206c7020616464696e6720666f7220563321000000006044820152606490fd5b919082018092116114e957565b5f5160206131385f395f51905f5260205f926115cd856002546115a2565b6002556001600160a01b031693841584146115f45780600254036002555b604051908152a3565b848452838252604084208181540190556115eb565b5f5f5160206131385f395f51905f52602061dead9361162a816002546115a2565b60025584845283825260408420818154019055604051908152a3565b60405190611655606083611276565b6002825260208201604036823782511561175057308152600e546040516315ab88c960e31b81526001600160a01b039091169290602081600481875afa9081156106b8575f91611764575b50845160011015611750576001600160a01b03166040850152823b156106ac57929060405193849263791ac94760e01b845260a484019160048501525f602485015260a060448501525180915260c4830191905f5b81811061172e5750505091815f81819530606483015242608483015203925af180156106b8576117225750565b5f61172c91611276565b565b82516001600160a01b03168452869450602093840193909201916001016116f5565b634e487b7160e01b5f52603260045260245ffd5b90506020813d602011611796575b8161177f60209383611276565b810103126106ac57611790906112fa565b5f6116a0565b3d9150611772565b60609060c460018060a01b03600e541691604051948593849263f305d71960e01b845230600485015260248401525f60448401525f606484015261dead60848401524260a48401525af180156106b8576117f55750565b606090813d8311611815575b61180b8183611276565b810103126106ac57565b503d61180156fe6080604052600436101561001a575b3615610018575f80fd5b005b5f3560e01c80630517d13d14610cfe57806306fdde0314610c435780630758d92414610c1b578063095ea7b314610b99578063150b7a0214610b0b57806318160ddd14610aee5780631c499ab014610acd57806323b872dd146109ee5780632479f339146109b15780632a1fd65f14610974578063313ce56714610951578063372c12b114610914578063510dd5fd146108d757806356b096161461084657806370a082311461080f578063715018a6146107b45780637aa19d221461079757806385af30c51461076f578063894760691461062b5780638d14e127146105765780638da5cb5b1461054e57806395d89b411461044a5780639a7a23d614610381578063a9059cbb14610350578063b62496f514610313578063da6b92ae146102d6578063dd62ed3e14610286578063e086e5ec1461020f578063f2fde38b146101895763f7c618c10361000e5734610185575f366003190112610185576020600f54604051908152f35b5f80fd5b34610185576020366003190112610185576101a2610d49565b6101aa610ed2565b6001600160a01b031680156101fc57600580546001600160a01b0319811683179091556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a3005b631e4fbdf760e01b5f525f60045260245ffd5b34610185575f36600319011261018557610227610ed2565b5f80808060018060a01b036005541647905af1610242610ea3565b501561024a57005b60405162461bcd60e51b815260206004820152601460248201527311985a5b1959081a5b881dda5d1a191c985dd85b60621b6044820152606490fd5b346101855760403660031901126101855761029f610d49565b6102a7610d5f565b6001600160a01b039182165f908152600160209081526040808320949093168252928352819020549051908152f35b34610185576102e436610dc7565b906102ed610ed2565b6102fc62030d40831115610e0c565b61030b62030d40821115610e57565b600b55600c55005b34610185576020366003190112610185576001600160a01b03610334610d49565b165f526017602052602060ff60405f2054166040519015158152f35b346101855760403660031901126101855761037661036c610d49565b6024359033610ef9565b602060405160018152f35b346101855761038f36610ddd565b90610398610ed2565b6001600160a01b03165f8181526017602052604090205490919060ff161515811515146103df57610018915f52601760205260405f209060ff801983541691151516179055565b60405162461bcd60e51b815260206004820152603860248201527f4175746f6d61746564206d61726b6574206d616b65722070616972206973206160448201527f6c72656164792073657420746f20746861742076616c756500000000000000006064820152608490fd5b34610185575f366003190112610185576040515f6004548060011c90600181168015610544575b6020831081146105305782855290811561050c57506001146104ae575b6104aa8361049e81850382610d75565b60405191829182610d1f565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b8082106104f25750909150810160200161049e61048e565b9192600181602092548385880101520191019092916104da565b60ff191660208086019190915291151560051b8401909101915061049e905061048e565b634e487b7160e01b5f52602260045260245ffd5b91607f1691610471565b34610185575f366003190112610185576005546040516001600160a01b039091168152602090f35b346101855761058436610ddd565b9061058d610ed2565b6001600160a01b03165f8181526018602052604090205490919060ff161515811515146105d457610018915f52601860205260405f209060ff801983541691151516179055565b60405162461bcd60e51b815260206004820152602960248201527f54686973206164647265737320697320616c72656164792073657420746f20746044820152686861742076616c756560b81b6064820152608490fd5b3461018557602036600319011261018557610644610d49565b61064c610ed2565b6001600160a01b031630811461073c576005546040516370a0823160e01b81523060048201526001600160a01b0390911690602081602481865afa9081156106fe575f91610709575b506020915f91604051908482019263a9059cbb60e01b845260248301526044820152604481526106c6606482610d75565b519082855af1156106fe575f513d6106f55750803b155b6106e357005b635274afe760e01b5f5260045260245ffd5b600114156106dd565b6040513d5f823e3d90fd5b90506020813d602011610734575b8161072460209383610d75565b8101031261018557516020610695565b3d9150610717565b60405162461bcd60e51b815260206004820152600b60248201526a139bdd08185b1b1bddd95960aa1b6044820152606490fd5b34610185575f366003190112610185576016546040516001600160a01b039091168152602090f35b34610185575f366003190112610185576020600d54604051908152f35b34610185575f366003190112610185576107cc610ed2565b600580546001600160a01b031981169091555f906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b34610185576020366003190112610185576001600160a01b03610830610d49565b165f525f602052602060405f2054604051908152f35b346101855760203660031901126101855761085f610d49565b610867610ed2565b6001600160a01b03168015610892576bffffffffffffffffffffffff60a01b60085416176008555f80f35b60405162461bcd60e51b815260206004820152601b60248201527f6d61726b6574696e672077616c6c65742063616e2774206265203000000000006044820152606490fd5b34610185576108e536610dc7565b906108ee610ed2565b6108fd62030d40831115610e0c565b61090c62030d40821115610e57565b601455601555005b34610185576020366003190112610185576001600160a01b03610935610d49565b165f526018602052602060ff60405f2054166040519015158152f35b34610185575f36600319011261018557602060ff60055460a01c16604051908152f35b346101855761098236610dc7565b9061098b610ed2565b61099a62030d40831115610e0c565b6109a962030d40821115610e57565b601055601155005b34610185576109bf36610dc7565b906109c8610ed2565b6109d762030d40831115610e0c565b6109e662030d40821115610e57565b601255601355005b3461018557606036600319011261018557610a07610d49565b610a0f610d5f565b6001600160a01b0382165f818152600160209081526040808320338452909152902054909260443592915f198110610a4d575b506103769350610ef9565b838110610ab2578415610a9f573315610a8c57610376945f52600160205260405f2060018060a01b0333165f526020528360405f209103905584610a42565b634a1406b160e11b5f525f60045260245ffd5b63e602df0560e01b5f525f60045260245ffd5b8390637dc7a0d960e11b5f523360045260245260445260645ffd5b3461018557602036600319011261018557610ae6610ed2565b600435600a55005b34610185575f366003190112610185576020600654604051908152f35b3461018557608036600319011261018557610b24610d49565b50610b2d610d5f565b5060643567ffffffffffffffff8111610185573660238201121561018557806004013590610b5a82610dab565b91610b686040519384610d75565b8083523660248284010111610185575f928160246020940184830137010152604051630a85bd0160e11b8152602090f35b3461018557604036600319011261018557610bb2610d49565b602435903315610a9f576001600160a01b0316908115610a8c57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b34610185575f36600319011261018557600e546040516001600160a01b039091168152602090f35b34610185575f366003190112610185576040515f6003548060011c90600181168015610cf4575b6020831081146105305782855290811561050c5750600114610c96576104aa8361049e81850382610d75565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210610cda5750909150810160200161049e61048e565b919260018160209254838588010152019101909291610cc2565b91607f1691610c6a565b3461018557602036600319011261018557610d17610ed2565b600435600955005b602060409281835280519182918282860152018484015e5f828201840152601f01601f1916010190565b600435906001600160a01b038216820361018557565b602435906001600160a01b038216820361018557565b90601f8019910116810190811067ffffffffffffffff821117610d9757604052565b634e487b7160e01b5f52604160045260245ffd5b67ffffffffffffffff8111610d9757601f01601f191660200190565b6040906003190112610185576004359060243590565b6040906003190112610185576004356001600160a01b0381168103610185579060243580151581036101855790565b15610e1357565b606460405162461bcd60e51b815260206004820152602060248201527f73656c6c206665652073686f756c64206265206c657373207468616e203230256044820152fd5b15610e5e57565b60405162461bcd60e51b815260206004820152601f60248201527f627579206665652073686f756c64206265206c657373207468616e20323025006044820152606490fd5b3d15610ecd573d90610eb482610dab565b91610ec26040519384610d75565b82523d5f602084013e565b606090565b6005546001600160a01b03163303610ee657565b63118cdaa760e01b5f523360045260245ffd5b6001600160a01b0381169291908315611455576001600160a01b038216938415611442578360ff60165460a01c16611425575b815f526018602052600160ff60405f205416151514801561140a575b15610f5b575050610f599350611631565b565b815f9594939552601760205260ff60405f2054165f146112335750506040516370a0823160e01b815260048101859052602081602481305afa80156106fe5783905f906111fd575b610fad9250611580565b600954806111eb575b50600a54908161119a575b5050835f52601860205260405f20600160ff19825416179055600b5480611169575b50601054806110a1575b5061100b926012548061103e575b5060145480611020575b50611631565b5f52601860205260405f2060ff198154169055565b620f424061103161103892866114b4565b048261158d565b5f611005565b611073620f424061106061109b9361105a6002600d5414611534565b876114b4565b04809561106e823087611631565b6114db565b936110958160011c9161108f61108a8447936114db565b6116e9565b476114db565b90611847565b5f610ffb565b6110af620f424091846114b4565b04600f54600181036110c2575b50610fed565b6002146110d0575b806110bc565b915f80806111016110eb87839661106e6002600d54146114e8565b966110f781308b611631565b61108f47916116e9565b855af161110c610ea3565b5015611118575f6110ca565b60405162461bcd60e51b815260206004820152602360248201527f53656e64696e672062757920726577617264207769746820455448206661696c60448201526265642160e81b6064820152608490fd5b91620f424061117c6111939394836114b4565b049061106e8260018060a01b036008541687611631565b905f610fe3565b116111a6575f80610fc1565b60405162461bcd60e51b815260206004820152601860248201527f486f6c64696e6720657863656564206d617857616c6c657400000000000000006044820152606490fd5b6111f790841115611468565b5f610fb6565b50506020813d60201161122b575b8161121860209383610d75565b810103126101855782610fad9151610fa3565b3d915061120b565b90945f52601760205260ff60405f205416611250575b5050505050565b600954806113f8575b50845f52601860205260405f20600160ff19825416179055600c54806113dc575b5050601154928361130c575b6112a39350601354806112c0575b50601554806110205750611631565b5f52601860205260405f2060ff1981541690555f80808080611249565b6112e4620f42406112dc6113069361105a6002600d5414611534565b0480956114db565b936112f0813085611631565b6110958160011c9161108f61108a8447936114db565b5f611294565b919261131c620f424091856114b4565b04600f54600181145f1461133e5750611338906112a3946114db565b91611286565b929392600214611353575b506112a392611286565b5f808061137481946113696002600d54146114e8565b6110f781308b611631565b875af161137f610ea3565b501561138b575f611349565b60405162461bcd60e51b8152602060048201526024808201527f53656e64696e672073656c6c20726577617264207769746820455448206661696044820152636c65642160e01b6064820152608490fd5b6113f092935061117c620f424091836114b4565b905f8061127a565b61140490821115611468565b5f611259565b50855f526018602052600160ff60405f205416151514610f48565b611430818585611631565b6016805460ff60a01b19169055610f2c565b63ec442f0560e01b5f525f60045260245ffd5b634b637e8f60e11b5f525f60045260245ffd5b1561146f57565b60405162461bcd60e51b815260206004820152601c60248201527f416d6f756e7420657863656564206d61785472616e73616374696f6e000000006044820152606490fd5b818102929181159184041417156114c757565b634e487b7160e01b5f52601160045260245ffd5b919082039182116114c757565b156114ef57565b60405162461bcd60e51b815260206004820152601960248201527f43616e277420776f726b2072657761726420666f7220563321000000000000006044820152606490fd5b1561153b57565b60405162461bcd60e51b815260206004820152601c60248201527f43616e277420776f726b206c7020616464696e6720666f7220563321000000006044820152606490fd5b919082018092116114c757565b9091906001600160a01b0316806115dc575f5160206118c65f395f51905f526020846115bf61dead9596600254611580565b6002555b845f525f825260405f20818154019055604051908152a3565b805f525f60205260405f20548381106116175760208461dead94955f5160206118c65f395f51905f5293855f525f84520360405f20556115c3565b915063391434e360e21b5f5260045260245260445260645ffd5b6001600160a01b031690816116975760205f5160206118c65f395f51905f529161165d85600254611580565b6002555b6001600160a01b031693846116825780600254036002555b604051908152a3565b845f525f825260405f20818154019055611679565b815f525f60205260405f20548381106116ce575f5160206118c65f395f51905f529184602092855f525f84520360405f2055611661565b91905063391434e360e21b5f5260045260245260445260645ffd5b604051906116f8606083610d75565b600282526020820160403682378251156117f157308152600e546040516315ab88c960e31b81526001600160a01b039091169290602081600481875afa9081156106fe575f91611805575b508451600110156117f1576001600160a01b03166040850152823b1561018557929060405193849263791ac94760e01b845260a484019160048501525f602485015260a060448501525180915260c4830191905f5b8181106117cf5750505091815f81819530606483015242608483015203925af180156106fe576117c55750565b5f610f5991610d75565b82516001600160a01b0316845286945060209384019390920191600101611798565b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161183f575b8161182060209383610d75565b8101031261018557516001600160a01b0381168103610185575f611743565b3d9150611813565b60609060c460018060a01b03600e541691604051948593849263f305d71960e01b845230600485015260248401525f60448401525f606484015261dead60848401524260a48401525af180156106fe5761189e5750565b606090813d83116118be575b6118b48183610d75565b8101031261018557565b503d6118aa56feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220f28c3ff58c9ff0862cff22836c82f8af3952a42dd37d7c042839fd7a138e0ac864736f6c634300081d0033ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef999d26de3473317ead3eeaf34ca78057f1439db67b6953469c3c96ce9caf6bd7"

export const ZENTRA_ROUTER_ADDRESS =
	"0xe1CB270f0C7C82dA9E819A4cC2bd43861F550C4F";

export const ZENTRA_V3_ROUTER_ADDRESS =
	"0xD0AAe88AF22dAE89CCF46D9033C2dB6eBf4B87F0";
