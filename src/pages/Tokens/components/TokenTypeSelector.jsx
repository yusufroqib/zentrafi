import { CoinsIcon, Flame, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function TokenTypeSelector({ tokenType, setTokenType }) {
  return (
    <div className="bg-gradient-to-r from-[#1D2538] to-[#1D2538] p-6 border-b border-[#475B74]/50">
      <Tabs
        defaultValue="basic"
        value={tokenType}
        onValueChange={(value) => setTokenType(value)}
        className="w-full h-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-bold text-[#018ABD] mb-4 md:mb-0">
            Choose Token Type
          </h2>
          <TabsList className="bg-[#1D2538]/70 border border-[#475B74]/50 p-1 rounded-xl">
            <TabsTrigger
              value="basic"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white rounded-lg transition-all duration-300 px-6 py-2",
                "data-[state=inactive]:text-[#97CBDC] data-[state=inactive]:hover:text-white"
              )}
            >
              <CoinsIcon className="h-4 w-4 mr-2" />
              Basic Token
            </TabsTrigger>
            <TabsTrigger
              value="tax"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white rounded-lg transition-all duration-300 px-6 py-2",
                "data-[state=inactive]:text-[#97CBDC] data-[state=inactive]:hover:text-white"
              )}
            >
              <Flame className="h-4 w-4 mr-2 text-orange-400" />
              Tax Token
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#004581] data-[state=active]:to-[#018ABD] data-[state=active]:text-white rounded-lg transition-all duration-300 px-6 py-2",
                "data-[state=inactive]:text-[#97CBDC] data-[state=inactive]:hover:text-white"
              )}
            >
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              Advanced Token
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic" className="mt-4">
          <div className="p-4 bg-gradient-to-r from-[#004581]/10 to-[#018ABD]/10 border border-[#475B74]/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-[#018ABD]/20 p-2 rounded-lg mt-1">
                <CoinsIcon className="h-5 w-5 text-[#018ABD]" />
              </div>
              <div>
                <p className="text-[#018ABD] font-medium mb-1">Basic Tokens</p>
                <p className="text-sm text-[#97CBDC]">
                  are secure, auto-verified token contracts that are designed
                  for hassle-free transfers & integration with other platforms.
                  Ideal for any project.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tax" className="mt-4">
          <div className="p-4 bg-gradient-to-r from-orange-900/10 to-[#018ABD]/10 border border-[#475B74]/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500/20 p-2 rounded-lg mt-1">
                <Flame className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-orange-400 font-medium mb-1">Tax Tokens</p>
                <p className="text-sm text-[#97CBDC]">
                  are auto-verified & designed to collect fees on every trade
                  (buy and sell). Simply set your wallet as the Fee Receiver to
                  start earning.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <div className="p-4 bg-gradient-to-r from-purple-900/10 to-[#018ABD]/10 border border-[#475B74]/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-purple-500/20 p-2 rounded-lg mt-1">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-400 font-medium mb-1">
                  Advanced Tokens
                </p>
                <p className="text-sm text-[#97CBDC]">
                  have multiple special functions. Max Wallet, Max Transaction,
                  Tax Fee, Rewards for Holders, Auto Burn, Whitelist Address
                  from Fees, Renounce Owner + Auto LP (V2 only)
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
