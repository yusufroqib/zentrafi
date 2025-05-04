export const FAIR_POOL_ABI = [
    { "type": "receive", "stateMutability": "payable" },
    {
        "type": "function",
        "name": "MINIMUM_LOCK_DAYS",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "VERSION",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "audit",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "auditLink",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "auditStatus",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "cancel",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claim",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claimedOf",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "completedKyc",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "contribute",
        "inputs": [
            { "name": "_amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "contributionOf",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "convert",
        "inputs": [
            { "name": "amountInWei", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "currency",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "emergencyWithdraw",
        "inputs": [
            { "name": "to_", "type": "address", "internalType": "address payable" },
            { "name": "amount_", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "emergencyWithdrawLiquidity",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "emergencyWithdrawToken",
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
        "name": "endTime",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "feesWithdraw",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "finalize",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getDecimal",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPoolInfo",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "address", "internalType": "address" },
            { "name": "", "type": "uint8[]", "internalType": "uint8[]" },
            { "name": "", "type": "uint256[]", "internalType": "uint256[]" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "address", "internalType": "address" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPrice",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getUpdatedState",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "uint8", "internalType": "uint8" },
            { "name": "", "type": "bool", "internalType": "bool" },
            { "name": "", "type": "uint256", "internalType": "uint256" },
            { "name": "", "type": "string", "internalType": "string" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "governance",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "_addrs",
                "type": "address[4]",
                "internalType": "address[4]"
            },
            {
                "name": "_capSettings",
                "type": "uint256[2]",
                "internalType": "uint256[2]"
            },
            {
                "name": "_timeSettings",
                "type": "uint256[3]",
                "internalType": "uint256[3]"
            },
            {
                "name": "_feeSettings",
                "type": "uint256[2]",
                "internalType": "uint256[2]"
            },
            {
                "name": "_auditKRVTokenId",
                "type": "uint256[3]",
                "internalType": "uint256[3]"
            },
            {
                "name": "_liquidityPercent",
                "type": "uint256[2]",
                "internalType": "uint256[2]"
            },
            { "name": "_poolDetails", "type": "string", "internalType": "string" },
            {
                "name": "_linkAddress",
                "type": "address[3]",
                "internalType": "address[3]"
            },
            { "name": "_version", "type": "uint8", "internalType": "uint8" },
            {
                "name": "_feesWithdraw",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_otherInfo",
                "type": "string[3]",
                "internalType": "string[3]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "kyc",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "kycLink",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "kycStatus",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "liquidityBalance",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "liquidityLockDays",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "liquidityPercent",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "liquidityUnlockTime",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
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
        "name": "ownerMail",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "poolDetails",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "poolManager",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "poolState",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "enum FairPool.PoolState"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "poolType",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "enum FairPool.PoolType"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "purchasedOf",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "rate",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "refundType",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "refundedOf",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
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
        "name": "router",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "routerVersion",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setGovernance",
        "inputs": [
            { "name": "governance_", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setKycAudit",
        "inputs": [
            { "name": "_kyc", "type": "bool", "internalType": "bool" },
            { "name": "_audit", "type": "bool", "internalType": "bool" },
            { "name": "_kyclink", "type": "string", "internalType": "string" },
            { "name": "_auditlink", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "softCap",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "startTime",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "token",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenId",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalClaimed",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalRaised",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalRefunded",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalToken",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalVolumePurchased",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
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
        "name": "updateCompletedKyc",
        "inputs": [
            { "name": "completed_", "type": "bool", "internalType": "bool" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updatePoolDetails",
        "inputs": [
            { "name": "details_", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "userAvalibleClaim",
        "inputs": [
            { "name": "_userAddress", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "v3Pair",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "withdrawContribution",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawLeftovers",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawLiquidity",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Cancelled",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Claimed",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "volume",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "total",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Contributed",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Finalized",
        "inputs": [
            {
                "name": "liquidity",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
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
        "name": "KycUpdated",
        "inputs": [
            {
                "name": "completed",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LiquidityWithdrawn",
        "inputs": [
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "timestamp",
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
        "name": "PoolUpdated",
        "inputs": [
            {
                "name": "timestamp",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "WithdrawnContribution",
        "inputs": [
            {
                "name": "user",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    { "type": "error", "name": "FailedCall", "inputs": [] },
    {
        "type": "error",
        "name": "InsufficientBalance",
        "inputs": [
            { "name": "balance", "type": "uint256", "internalType": "uint256" },
            { "name": "needed", "type": "uint256", "internalType": "uint256" }
        ]
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
    },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
    {
        "type": "error",
        "name": "SafeERC20FailedOperation",
        "inputs": [
            { "name": "token", "type": "address", "internalType": "address" }
        ]
    }
]