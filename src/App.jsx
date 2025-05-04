import React from "react";
import RootLayout from "@/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import Staking from "@/pages/Staking/Staking";
import CreateToken from "@/pages/Tokens/CreateToken";
import Bonding from "@/pages/Bonding";
import Airdrop from "@/pages/Airdrop/Airdrop";
import TokenLockPage from "@/pages/Lock";
import LPLockListPage from "@/pages/Lock/LP";
import TokenLock from "@/pages/Lock/TOKEN";
import FairLaunchPage from "@/pages/FairLaunch/FairLaunch";
import FairLaunchViewPage from "@/pages/FairLaunch/FairLanchView";
import Launchpad from "@/pages/Launchpad";
import BondingTrading from "@/pages/Bonding/BondingTrading";
import { BondingPoolContextProvider } from "@/context/bondingPoolContext";
import { LaunchPadContextProvider } from "@/context/launchPadContext";
import { FairPoolContextProvider } from "@/context/fairPoolContext";
import LandingPage from "@/pages/LandingPage";
import LogoPage from "@/pages/LogoGuide";
import { PortfolioDashboard } from "@/pages/Portfolio";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/logo" element={<LogoPage />} />

        <Route element={<RootLayout />}>
          <Route
            path="/launchpad"
            element={
              <LaunchPadContextProvider>
                <Launchpad />
              </LaunchPadContextProvider>
            }
          />
          <Route path="/portfolio" element={<PortfolioDashboard />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/token" element={<CreateToken />} />
          <Route
            path="/bonding-token-sale"
            element={
              <BondingPoolContextProvider>
                <Bonding />
              </BondingPoolContextProvider>
            }
          />
          <Route
            path="/bonding-details/:bondingAddress"
            element={<BondingTrading />}
          />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/fair-launch" element={<FairLaunchPage />} />
          <Route
            path="/fairlaunch-details/:contractAddress"
            element={
              <FairPoolContextProvider>
                <FairLaunchViewPage />
              </FairPoolContextProvider>
            }
          />
          <Route path="/lock" element={<TokenLockPage />} />
          <Route path="/token-lock" element={<TokenLock />} />
          <Route path="/lp-lock" element={<LPLockListPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
