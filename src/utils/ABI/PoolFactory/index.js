export const POOL_FACTORY_ABI = [
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "IsEnabled",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "adminWallet",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address payable",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "auditPrice",
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
    name: "bondingToken",
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
    name: "bondingTokenCreationFee",
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
    name: "bondingmaster",
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
    name: "buySellFeeSettings",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
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
    name: "contributeWithdrawFee",
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
    name: "createBondingToken",
    inputs: [
      {
        name: "creator",
        type: "address",
        internalType: "address",
      },
      {
        name: "_poolDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenInfo",
        type: "string[2]",
        internalType: "string[2]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "createFairSale",
    inputs: [
      {
        name: "_addrs",
        type: "address[4]",
        internalType: "address[4]",
      },
      {
        name: "_capSettings",
        type: "uint256[2]",
        internalType: "uint256[2]",
      },
      {
        name: "_timeSettings",
        type: "uint256[3]",
        internalType: "uint256[3]",
      },
      {
        name: "_auditKRVTokenId",
        type: "uint256[3]",
        internalType: "uint256[3]",
      },
      {
        name: "_liquidityPercent",
        type: "uint256[2]",
        internalType: "uint256[2]",
      },
      {
        name: "_poolDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "_otherInfo",
        type: "string[3]",
        internalType: "string[3]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "ethLiquidity",
    inputs: [
      {
        name: "_reciever",
        type: "address",
        internalType: "address payable",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ethToBonding",
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
    name: "fairmaster",
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
    name: "fairmasterPrice",
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
    name: "feeSettings",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
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
    name: "initialize",
    inputs: [
      {
        name: "initialOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_master",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bondingmaster",
        type: "address",
        internalType: "address",
      },
      {
        name: "_poolmanager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fairmaster",
        type: "address",
        internalType: "address",
      },
      {
        name: "_version",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "_kycPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_auditPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_fairmasterPrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_contributeWithdrawFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_IsEnabled",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_bondingTokenCreationFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_ethToBonding",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_supraFeedClient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nonfungiblePositionManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_supraOraclePull",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "kycPrice",
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
    name: "masterPrice",
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
    name: "nonfungiblePositionManager",
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
    name: "partnerFee",
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
    name: "poolEmergencyWithdraw",
    inputs: [
      {
        name: "poolAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "to_",
        type: "address",
        internalType: "address payable",
      },
      {
        name: "amount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "poolEmergencyWithdrawLiquidity",
    inputs: [
      {
        name: "poolAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "token_",
        type: "address",
        internalType: "address",
      },
      {
        name: "to_",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "poolEmergencyWithdrawToken",
    inputs: [
      {
        name: "poolAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "payaddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokens",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "poolManager",
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
    name: "poolSetGovernance",
    inputs: [
      {
        name: "poolAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_governance",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "privatemaster",
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
    name: "privatemasterPrice",
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
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAdminWallet",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAuditPrice",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBondingPool",
    inputs: [
      {
        name: "_bondingPool",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBondingToken",
    inputs: [
      {
        name: "_bondingToken",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBondingTokenCreationFee",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBuySellFeeSettings",
    inputs: [
      {
        name: "_buySellFeeSettings",
        type: "uint256[4]",
        internalType: "uint256[4]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setEthToBonding",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFairAddress",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFairPoolPrice",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeManager",
    inputs: [
      {
        name: "_feeManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFinalizeFeeSettings",
    inputs: [
      {
        name: "_feeSettings",
        type: "uint256[2]",
        internalType: "uint256[2]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setIsEnabled",
    inputs: [
      {
        name: "_isEnabled",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setKycPrice",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMasterAddress",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPartnerFee",
    inputs: [
      {
        name: "_partnerFees",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPoolManager",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPoolOwner",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrivateAddress",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrivatePoolPrice",
    inputs: [
      {
        name: "_price",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setVersion",
    inputs: [
      {
        name: "_version",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setcontributeWithdrawFee",
    inputs: [
      {
        name: "_fees",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setsupraFeedClient",
    inputs: [
      {
        name: "_supraFeedClient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supraFeedClient",
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
    name: "transferAnyERC20Token",
    inputs: [
      {
        name: "payaddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokens",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
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
    type: "function",
    name: "version",
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
    type: "event",
    name: "BondingTokenCreated",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FairSaleCreated",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
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
    type: "error",
    name: "FailedDeployment",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
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
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
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
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
];

export const PAHROS_POOL_FACTORY_ADDRESS =
  "0x8901Dc6232C767ae7e974aeEA97284722905704A";
export const CELO_POOL_FACTORY_ADDRESS =
  "0x8901Dc6232C767ae7e974aeEA97284722905704A";
