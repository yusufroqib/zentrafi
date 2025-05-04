export const POOL_MANAGER_ABI = [
    { "type": "receive", "stateMutability": "payable" },
    {
        "type": "function",
        "name": "addAllowedPools",
        "inputs": [
            { "name": "_pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addPoolFactory",
        "inputs": [
            { "name": "factory", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "decreaseTotalValueLocked",
        "inputs": [
            { "name": "currency", "type": "address", "internalType": "address" },
            { "name": "value", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "emergencyRemoveFairPoolForToken",
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ethLiquidity",
        "inputs": [
            {
                "name": "_reciever",
                "type": "address",
                "internalType": "address payable"
            },
            { "name": "_amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "ethUSDTPool",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IUniswapV2Pair"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "fairPoolForToken",
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllBondingPools",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllContributedPools",
        "inputs": [
            { "name": "user", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllFairPools",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBondingPoolsOf",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBondingPoolsRange",
        "inputs": [
            { "name": "from", "type": "uint256", "internalType": "uint256" },
            { "name": "to", "type": "uint56", "internalType": "uint56" }
        ],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getContributedPoolAtIndex",
        "inputs": [
            { "name": "user", "type": "address", "internalType": "address" },
            { "name": "index", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCumulativeBondingInfo",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct PoolManager.CumulativeBondingInfo[]",
                "components": [
                    {
                        "name": "poolAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "token", "type": "address", "internalType": "address" },
                    { "name": "poolState", "type": "uint8", "internalType": "uint8" },
                    { "name": "poolType", "type": "uint8", "internalType": "uint8" },
                    { "name": "decimals", "type": "uint8", "internalType": "uint8" },
                    {
                        "name": "ethAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "tokenAAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "kycStatus",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "auditStatus",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "markectCap",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "circulatingSupply",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "symbol", "type": "string", "internalType": "string" },
                    {
                        "name": "poolDetails",
                        "type": "string",
                        "internalType": "string"
                    },
                    { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
                    { "name": "v3Pair", "type": "address", "internalType": "address" },
                    {
                        "name": "_holders",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "tokenPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "tokenTotalSupply",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCumulativeFairPoolInfo",
        "inputs": [
            { "name": "start", "type": "uint256", "internalType": "uint256" },
            { "name": "end", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct PoolManager.CumulativeLockInfo[]",
                "components": [
                    {
                        "name": "poolAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "token", "type": "address", "internalType": "address" },
                    {
                        "name": "currency",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "poolState", "type": "uint8", "internalType": "uint8" },
                    { "name": "poolType", "type": "uint8", "internalType": "uint8" },
                    { "name": "decimals", "type": "uint8", "internalType": "uint8" },
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "endTime", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "totalRaised",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "hardCap", "type": "uint256", "internalType": "uint256" },
                    { "name": "softCap", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "minContribution",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "maxContribution",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "rate", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "liquidityListingRate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "liquidityPercent",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "liquidityUnlockTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "symbol", "type": "string", "internalType": "string" },
                    {
                        "name": "poolDetails",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "routerVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
                    { "name": "v3Pair", "type": "address", "internalType": "address" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFairPoolsOf",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFairPoolsRange",
        "inputs": [
            { "name": "from", "type": "uint256", "internalType": "uint256" },
            { "name": "to", "type": "uint56", "internalType": "uint56" }
        ],
        "outputs": [
            { "name": "", "type": "address[]", "internalType": "address[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPoolAt",
        "inputs": [
            { "name": "version", "type": "uint8", "internalType": "uint8" },
            { "name": "index", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalNumberOfBondingPools",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalNumberOfContributedPools",
        "inputs": [
            { "name": "user", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalNumberOfFairPools",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalNumberOfPoolsForVersion",
        "inputs": [
            { "name": "version", "type": "uint8", "internalType": "uint8" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUserContributedPoolInfo",
        "inputs": [
            { "name": "userAddress", "type": "address", "internalType": "address" },
            { "name": "start", "type": "uint256", "internalType": "uint256" },
            { "name": "end", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct PoolManager.CumulativeLockInfo[]",
                "components": [
                    {
                        "name": "poolAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "token", "type": "address", "internalType": "address" },
                    {
                        "name": "currency",
                        "type": "address",
                        "internalType": "address"
                    },
                    { "name": "poolState", "type": "uint8", "internalType": "uint8" },
                    { "name": "poolType", "type": "uint8", "internalType": "uint8" },
                    { "name": "decimals", "type": "uint8", "internalType": "uint8" },
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "endTime", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "totalRaised",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "hardCap", "type": "uint256", "internalType": "uint256" },
                    { "name": "softCap", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "minContribution",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "maxContribution",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "rate", "type": "uint256", "internalType": "uint256" },
                    {
                        "name": "liquidityListingRate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "liquidityPercent",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "liquidityUnlockTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "symbol", "type": "string", "internalType": "string" },
                    {
                        "name": "poolDetails",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "routerVersion",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
                    { "name": "v3Pair", "type": "address", "internalType": "address" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "increaseTotalValueLocked",
        "inputs": [
            { "name": "currency", "type": "address", "internalType": "address" },
            { "name": "value", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            { "name": "initialOwner", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "isFairPoolGenerated",
        "inputs": [
            { "name": "pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
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
        "name": "recordContribution",
        "inputs": [
            { "name": "user", "type": "address", "internalType": "address" },
            { "name": "pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registerBondingPool",
        "inputs": [
            { "name": "pool", "type": "address", "internalType": "address" },
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "owner", "type": "address", "internalType": "address" },
            { "name": "version", "type": "uint8", "internalType": "uint8" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registerFairPool",
        "inputs": [
            { "name": "pool", "type": "address", "internalType": "address" },
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "owner", "type": "address", "internalType": "address" },
            { "name": "version", "type": "uint8", "internalType": "uint8" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removeFairPoolForToken",
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" },
            { "name": "pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "removePoolFactory",
        "inputs": [
            { "name": "factory", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
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
        "name": "totalLiquidityRaised",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalParticipants",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalValueLocked",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferAnyERC20Token",
        "inputs": [
            { "name": "payaddress", "type": "address", "internalType": "address" },
            {
                "name": "tokenAddress",
                "type": "address",
                "internalType": "address"
            },
            { "name": "tokens", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
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
        "name": "updateETHUSDtPool",
        "inputs": [
            { "name": "pool", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ContributionUpdated",
        "inputs": [
            {
                "name": "totalParticipations",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
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
        "name": "PoolForTokenRemoved",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "pool",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TvlChanged",
        "inputs": [
            {
                "name": "currency",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "totalLocked",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "totalRaised",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "sender",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    { "type": "error", "name": "InvalidInitialization", "inputs": [] },
    { "type": "error", "name": "NotInitializing", "inputs": [] },
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
    }
]
  
  export const PHAROS_POOL_MANAGER_ADDRESS =
    "0xEDBe3C2004C9f3C84597ECBbC65ded1808987DEa";
  