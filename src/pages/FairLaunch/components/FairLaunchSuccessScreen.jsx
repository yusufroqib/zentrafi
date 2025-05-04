"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function FairLaunchSuccessScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#97CBDC] mb-2">
            Launch Created Successfully!
          </h2>
          <p className="text-[#97CBDC]/70 mb-8">
            Your token launch has been created and is now pending. You can track
            its status in the dashboard.
          </p>

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#004581] to-[#018ABD] text-white hover:from-[#003b6e] hover:to-[#0179a3] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#004581]/20"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/token-locks"
              className="w-full px-6 py-3 rounded-xl bg-[#0a0a20]/80 text-[#97CBDC] border border-[#475B74]/50 hover:bg-[#0a0a20] transition-colors flex items-center justify-center gap-2"
            >
              <span>View All Launches</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* <div className="bg-[#0a0a20]/80 p-4 border-t border-[#475B74]/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#97CBDC]/70">
              <span className="font-medium">Need help?</span> Contact our
              support team
            </div>
            <Link
              href="/support"
              className="text-sm text-[#018ABD] hover:text-[#97CBDC] font-medium"
            >
              Get Help
            </Link>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}
