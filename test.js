const [participants, setParticipants] = useState([]);

// Fetch token data
useEffect(() => {
  // Simulate fetching token data
  setTimeout(() => {
    setToken({
      id: contractAddress.id,
      name: "Zentra",
      symbol: "ZTR",
      decimals: "18",
      icon: "/vite.svg",
      bannerImage: "/Pharos-chain.jpg",
      address: "0x24b10ecdb3646ca4659155bfaa43d7943c278e93",
      contractAddress: "0xc1a06eda5c6c7fc99de1a2bee611ae06a35312f4",
      supply: "899,889,090,909",
      rate: "1 ETH = 1,000,000 ZTR",
      softcap: "0.5 ETH",
      hardcap: "5 ETH",
      minContribution: "0.01 ETH",
      maxContribution: "1 ETH",
      unsold: "Refund",
      startTimeRaw: "2025-05-02T16:04:00",
      endTimeRaw: "2025-05-03T16:04:00",
      listing: "Uniswap V3",
      liquidity: "55%",
      lpUnlock: "365 days",
      brief:
        "Zentra is a next-generation decentralized finance platform that combines yield farming, staking, and NFT marketplace in one ecosystem. Our mission is to provide a seamless DeFi experience with enhanced security and user-friendly interfaces.",
      progress: 35,
      raised: "1.75",
      participants: 42,
      status: "LIVE",
      socialLinks: {
        website: "https://example.com",
        twitter: "https://twitter.com",
        telegram: "https://telegram.org",
        discord: "https://discord.com",
        github: "https://github.com",
      },
    });

    // Generate mock participants
    const mockParticipants = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      address: `0x${Math.random()
        .toString(16)
        .substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
      amount: (Math.random() * 0.5 + 0.01).toFixed(3),
      time: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
    }));

    setParticipants(mockParticipants);
    setLoading(false);
  }, 1000);
}, [contractAddress]);

// Calculate time left
