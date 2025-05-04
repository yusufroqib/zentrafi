import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Coins,
  Settings,
  Calendar,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import FairLaunchStepInfo from "./FairLaunchInfoStep";
import FairLaunchStepConfig from "./FairLaunchConfig";
import FairLaunchScheduleStep from "./FairLaunchScheduleStep";
import ProjectInfoStep from "./ProjectInfoStep";
import FairLaunchReviewStep from "./FairLaunchReviewStep";
import FairLaunchSuccessScreen from "./FairLaunchSuccessScreen";
import { useLaunch } from "@/providers/FairLaunchProvider";

export default function FairLaunchForm() {
  const { currentStep, setCurrentStep, formData, isSuccess } = useLaunch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const steps = [
    {
      id: "token",
      title: "Token Information",
      description: "Enter your token details",
      icon: Coins,
      component: <FairLaunchStepInfo />,
    },
    {
      id: "config",
      title: "Launch Configuration",
      description: "Configure your launch parameters",
      icon: Settings,
      component: <FairLaunchStepConfig />,
    },
    {
      id: "schedule",
      title: "Schedule",
      description: "Set your launch timeline",
      icon: Calendar,
      component: <FairLaunchScheduleStep />,
    },
    {
      id: "project",
      title: "Project Details",
      description: "Add project information",
      icon: FileText,
      component: <ProjectInfoStep />,
    },
    {
      id: "review",
      title: "Review & Launch",
      description: "Review and submit your launch",
      icon: CheckCircle2,
      component: <FairLaunchReviewStep />,
    },
  ];

  if (isSuccess) {
    return <FairLaunchSuccessScreen />;
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-[#004581] to-[#018ABD] text-white p-2 rounded-lg">
              <Rocket size={20} />
            </div>
            <h1 className="text-2xl font-bold text-[#97CBDC]">
              Create Token Launch
            </h1>
          </div>
          <p className="text-[#97CBDC]/70 max-w-2xl">
            Launch your token with our streamlined process. Set up your token
            sale, configure parameters, and go live in minutes with automatic
            liquidity provision and locking.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-[#1D2538]/90 backdrop-blur-sm border border-[#475B74]/50 rounded-xl shadow-lg p-4 sticky top-8">
              <div className="space-y-1 mb-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        // Only allow navigation to completed steps or the current step
                        if (isCompleted || isActive) {
                          setCurrentStep(index);
                        }
                      }}
                      className={`w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-[#0a0a20] text-[#97CBDC]"
                          : isCompleted
                          ? "text-[#97CBDC] hover:bg-[#0a0a20]/50"
                          : "text-[#97CBDC]/40 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                          isActive
                            ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
                            : isCompleted
                            ? "bg-[#018ABD]/20 text-[#018ABD]"
                            : "bg-[#475B74]/20 text-[#475B74]/50"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <StepIcon size={16} />
                        )}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[#475B74]/30 pt-4">
                <div className="text-sm text-[#97CBDC]/70 mb-2">
                  Launch Progress
                </div>
                <div className="w-full bg-[#0a0a20] rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-[#004581] to-[#018ABD] h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-[#97CBDC]/50">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] backdrop-blur-sm border border-[#475B74]/50 rounded-xl shadow-lg p-6 md:p-8"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#97CBDC] mb-1">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-[#97CBDC]/70">
                    {steps[currentStep].description}
                  </p>
                </div>

                {steps[currentStep].component}

                <div className="flex justify-between mt-8 pt-4 border-t border-[#475B74]/30">
                  {currentStep > 0 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex cursor-pointer items-center gap-2 px-4 py-2 text-[#97CBDC]/70 hover:text-[#97CBDC] transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < steps.length - 1 && (
                    <button
                      onClick={() => {
                        // In a real implementation, you would validate the current step here
                        // before allowing navigation to the next step
                        if (formData.isTokenLoaded || currentStep > 0) {
                          setCurrentStep(currentStep + 1);
                          window.scrollTo(0, 0);
                        }
                      }}
                      className={`flex cursor-pointer items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#004581] to-[#018ABD] text-white hover:from-[#003b6e] hover:to-[#0179a3] transition-colors ${
                        currentStep === 0 && !formData.isTokenLoaded
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={currentStep === 0 && !formData.isTokenLoaded}
                    >
                      <span>Next Step</span>
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
