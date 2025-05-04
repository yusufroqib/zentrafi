import { createContext, useContext, useState } from "react";

const LaunchContext = createContext(undefined);

export function LaunchProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Token Info
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 18,
    tokenSupply: "",
    isTokenLoaded: false,

    // Launch Configuration
    launchType: "fair",
    dex: "Zentra V2",
    currency: "",
    fee: "0.015",
    totalSaleAmount: "",
    refundType: "Burn",
    softcap: "",
    hardcap: "",
    liquidity: "51",
    liquidityPercentage: 51,
    startTime: "",
    endTime: "",
    liquidityLockDuration: 30,
    minContribution: "0.1",
    maxContribution: "5",

    // Vesting
    enableVesting: false,
    vestingFirstRelease: 20,
    vestingPeriod: 30,
    vestingRelease: 20,

    // Project Info
    logoUrl: "",
    bannerUrl: "",
    website: "",
    description: "",
    socials: {
      twitter: "",
      telegram: "",
      discord: "",
      github: "",
    },
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <LaunchContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        isSubmitting,
        setIsSubmitting,
        isSuccess,
        setIsSuccess,
      }}
    >
      {children}
    </LaunchContext.Provider>
  );
}

export function useLaunch() {
  const context = useContext(LaunchContext);
  if (context === undefined) {
    throw new Error("useLaunch must be used within a LaunchProvider");
  }
  return context;
}
