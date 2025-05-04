import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, AlertCircle, CheckCircle2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function CreatePoolModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    stakingToken: "",
    rewardToken: "",
    duration: "30",
    rewardAmount: "",
    bannerImage: null,
    profileImage: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "bannerImage") {
          setBannerPreview(reader.result);
        } else {
          setProfilePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const isStep1Valid =
    formData.name &&
    formData.stakingToken &&
    formData.duration &&
    formData.rewardAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl"
          >
            {/* Decorative background elements */}
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#018ABD]/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#004581]/20 blur-3xl"></div>

            <div className="relative bg-gradient-to-b from-[#1D2538] to-[#142029] border border-[#475B74]/30 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with glowing border */}
              <div className="relative p-6 border-b border-[#475B74]/30">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#018ABD]/50 to-transparent"></div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#018ABD] to-[#97CBDC]">
                    Create a Staking Pool
                  </h2>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1.5 bg-[#1D2538] cursor-pointer border border-[#475B74]/50 text-[#97CBDC] hover:text-white hover:bg-[#475B74]/30 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-[#97CBDC]/80 text-sm">
                  Create your own single or dual-asset staking pool and set your
                  own rewards.
                </p>

                {/* Steps indicator */}
                <div className="flex items-center mt-4 space-x-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep === 1
                          ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
                          : "bg-[#1D2538] border border-[#475B74] text-[#97CBDC]"
                      )}
                    >
                      {currentStep > 1 ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        "1"
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#97CBDC]">
                      Pool Details
                    </span>
                  </div>

                  <div
                    className={cn(
                      "h-0.5 w-8",
                      currentStep > 1 ? "bg-[#018ABD]" : "bg-[#475B74]/50"
                    )}
                  ></div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep === 2
                          ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white"
                          : "bg-[#1D2538] border border-[#475B74] text-[#97CBDC]"
                      )}
                    >
                      2
                    </div>
                    <span className="text-sm font-medium text-[#97CBDC]">
                      Appearance
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div className="bg-[#1D2538]/50 p-3 rounded-lg border border-[#475B74]/30 text-sm text-[#97CBDC]">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-[#018ABD] shrink-0 mt-0.5" />
                            <p>
                              3 wallet confirmations are needed to create a
                              pool: fee/gas, approve tokens, and stake initial
                              amount.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="name"
                              className="text-[#97CBDC] mb-1.5 block"
                            >
                              Pool Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="My Awesome Pool"
                              className="bg-[#1D2538]/80 border-[#475B74] focus:border-[#018ABD] text-white"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <Label
                                htmlFor="stakingToken"
                                className="text-[#97CBDC]"
                              >
                                Staking Token (address)
                              </Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="cursor-help">
                                      <Info className="h-4 w-4 text-[#97CBDC]" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-[#1D2538] border-[#475B74] text-[#97CBDC]">
                                    <p>
                                      Enter the contract address of the token
                                      users will stake
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input
                              id="stakingToken"
                              name="stakingToken"
                              value={formData.stakingToken}
                              onChange={handleChange}
                              placeholder="0x..."
                              className="bg-[#1D2538]/80 border-[#475B74] focus:border-[#018ABD] text-white font-mono text-sm"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <Label
                                htmlFor="rewardToken"
                                className="text-[#97CBDC]"
                              >
                                Reward Token (address)
                              </Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="cursor-help">
                                      <Info className="h-4 w-4 text-[#97CBDC]" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-[#1D2538] border-[#475B74] text-[#97CBDC]">
                                    <p>Leave empty if same as staking token</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input
                              id="rewardToken"
                              name="rewardToken"
                              value={formData.rewardToken}
                              onChange={handleChange}
                              placeholder="0x... (optional if single-token)"
                              className="bg-[#1D2538]/80 border-[#475B74] focus:border-[#018ABD] text-white font-mono text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="duration"
                                className="text-[#97CBDC] mb-1.5 block"
                              >
                                Duration (days)
                              </Label>
                              <Input
                                id="duration"
                                name="duration"
                                type="number"
                                min="1"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="30"
                                className="bg-[#1D2538]/80 border-[#475B74] focus:border-[#018ABD] text-white"
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="rewardAmount"
                                className="text-[#97CBDC] mb-1.5 block"
                              >
                                Reward Amount (tokens)
                              </Label>
                              <Input
                                id="rewardAmount"
                                name="rewardAmount"
                                type="number"
                                min="0"
                                value={formData.rewardAmount}
                                onChange={handleChange}
                                placeholder="100000"
                                className="bg-[#1D2538]/80 border-[#475B74] focus:border-[#018ABD] text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                      >
                        <div className="bg-[#1D2538]/50 p-3 rounded-lg border border-[#475B74]/30 text-sm text-[#97CBDC]">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-[#018ABD] shrink-0 mt-0.5" />
                            <p>
                              Customize how your pool appears to users. Adding
                              images will make your pool more attractive.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <Label
                              htmlFor="bannerImage"
                              className="text-[#97CBDC] mb-1.5 block"
                            >
                              Banner Image
                            </Label>
                            <input
                              type="file"
                              id="bannerImage"
                              ref={bannerInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(e, "bannerImage")
                              }
                            />
                            <div
                              onClick={() => bannerInputRef.current?.click()}
                              className="relative h-32 bg-[#1D2538]/80 border border-dashed border-[#475B74] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#018ABD] transition-colors overflow-hidden"
                            >
                              {bannerPreview ? (
                                <>
                                  <image
                                    src={bannerPreview || "/placeholder.svg"}
                                    alt="Banner preview"
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <p className="text-white text-sm font-medium">
                                      Change Image
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="h-8 w-8 text-[#97CBDC]/70 mb-2" />
                                  <p className="text-sm text-[#97CBDC]">
                                    Click to upload banner image
                                  </p>
                                  <p className="text-xs text-[#97CBDC]/70 mt-1">
                                    Recommended: 1200×400px
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor="profileImage"
                              className="text-[#97CBDC] mb-1.5 block"
                            >
                              Profile Image
                            </Label>
                            <input
                              type="file"
                              id="profileImage"
                              ref={profileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(e, "profileImage")
                              }
                            />
                            <div className="flex items-start gap-4">
                              <div
                                onClick={() => profileInputRef.current?.click()}
                                className="relative h-24 w-24 bg-[#1D2538]/80 border border-dashed border-[#475B74] rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-[#018ABD] transition-colors overflow-hidden"
                              >
                                {profilePreview ? (
                                  <>
                                    <Image
                                      src={profilePreview || "/placeholder.svg"}
                                      alt="Profile preview"
                                      fill
                                      className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                      <p className="text-white text-xs font-medium">
                                        Change
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <ImageIcon className="h-6 w-6 text-[#97CBDC]/70 mb-1" />
                                    <p className="text-xs text-[#97CBDC]/70">
                                      Upload
                                    </p>
                                  </>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-[#97CBDC] mb-1">
                                  Profile Image
                                </p>
                                <p className="text-xs text-[#97CBDC]/70">
                                  This image will appear as your pool's avatar.
                                  Square images work best.
                                </p>
                                <p className="text-xs text-[#97CBDC]/70 mt-2">
                                  Recommended: 400×400px
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#1D2538]/80 rounded-lg p-4 border border-[#475B74]/30">
                            <h3 className="text-sm font-medium text-[#97CBDC] mb-3">
                              Preview
                            </h3>
                            <div className="relative h-32 rounded-lg overflow-hidden bg-[#142029]/50">
                              {bannerPreview ? (
                                <image
                                  src={bannerPreview || "/placeholder.svg"}
                                  alt="Banner preview"
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 bg-[#142029]/30 flex items-center justify-center">
                                  <p className="text-[#97CBDC]/50">
                                    No banner image
                                  </p>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2538] to-transparent opacity-70"></div>

                              <div className="absolute bottom-3 left-3 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#1D2538] border-2 border-white flex items-center justify-center overflow-hidden">
                                  {profilePreview ? (
                                    <image
                                      src={profilePreview || "/placeholder.svg"}
                                      alt="Profile preview"
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <span className="text-xs text-[#97CBDC]/50">
                                      No image
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white">
                                    {formData.name || "Your Pool Name"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 border-t border-[#475B74]/30 flex justify-between">
                  {currentStep === 1 ? (
                    <div></div>
                  ) : (
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="bg-[#1D2538] border cursor-pointer border-[#475B74] hover:bg-[#475B74]/30 text-[#97CBDC]"
                    >
                      Back
                    </Button>
                  )}

                  {currentStep === 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        "Create Pool"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
