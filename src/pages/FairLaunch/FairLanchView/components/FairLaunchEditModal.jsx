"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Edit, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import axios from "axios";

export function FairLaunchEditModal({ token, onSubmit }) {
  const [openFake, setOpen] = useState(false);
  const open = false
  const [formData, setFormData] = useState({
    poolLogoUrl: token?.icon || "",
    poolBannerUrl: token?.bannerImage || "",
    websiteUrl: token?.socialLinks?.website || "",
    facebookUrl: token?.socialLinks?.facebook || "",
    twitterUrl: token?.socialLinks?.twitter || "",
    githubUrl: token?.socialLinks?.github || "",
    telegramUrl: token?.socialLinks?.telegram || "",
    instagramUrl: token?.socialLinks?.instagram || "",
    discordUrl: token?.socialLinks?.discord || "",
    redditUrl: token?.socialLinks?.reddit || "",
    youtubeUrl: token?.socialLinks?.youtube || "",
    brief: token?.brief || "",
    blockStart: token?.blockStart || "",
  });

  const [errors, setErrors] = useState({});
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = (name, base64) => {
    name === "poolLogoUrl"
      ? setIsUploadingLogo(true)
      : setIsUploadingBanner(true);

    axios
      .post("https://ipfs-backend.vercel.app/uploadImage", { image: base64 })
      .then((res) => {
        setFormData((prev) => ({ ...prev, [name]: res.data }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
        console.log("Uploaded image", res.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setErrors((prev) => ({
          ...prev,
          [name]: "Failed to upload image",
        }));
      })
      .finally(() => {
        name === "poolLogoUrl"
          ? setIsUploadingLogo(false)
          : setIsUploadingBanner(false);
      });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    try {
      if (files && files[0]) {
        const file = files[0];
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            [name]: "File size must be less than 2MB",
          }));
          return;
        }

        if (files.length === 1) {
          const base64 = await convertBase64(files[0]);
          uploadSingleImage(name, base64);
          return;
        }
      }
    } catch (error) {
      console.error("Error handling file:", error);
      if (name === "poolLogoUrl") {
        setIsUploadingLogo(false);
      } else {
        setIsUploadingBanner(false);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e, inputRef) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Simulate a file input change event
      const name = inputRef === logoInputRef ? "poolLogoUrl" : "poolBannerUrl";

      try {
        const file = files[0];
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            [name]: "File size must be less than 2MB",
          }));
          return;
        }

        if (name === "poolLogoUrl") {
          setIsUploadingLogo(true);
        } else {
          setIsUploadingBanner(true);
        }

        const base64 = await convertBase64(file);
        uploadSingleImage(name, base64);
      } catch (error) {
        console.error("Error handling dropped file:", error);
        if (name === "poolLogoUrl") {
          setIsUploadingLogo(false);
        } else {
          setIsUploadingBanner(false);
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.poolLogoUrl) newErrors.poolLogoUrl = "Logo image is required";
    if (!formData.poolBannerUrl)
      newErrors.poolBannerUrl = "Banner image is required";
    if (!formData.websiteUrl) {
      newErrors.websiteUrl = "Website URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = "Website must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (onSubmit) {
        // Prepare social links object
        const socialLinks = {
          website: formData.websiteUrl,
          facebook: formData.facebookUrl,
          twitter: formData.twitterUrl,
          github: formData.githubUrl,
          telegram: formData.telegramUrl,
          instagram: formData.instagramUrl,
          discord: formData.discordUrl,
          reddit: formData.redditUrl,
          youtube: formData.youtubeUrl,
        };

        // Submit with formatted data
        onSubmit({
          ...formData,
          socialLinks,
          icon: formData.poolLogoUrl,
          bannerImage: formData.poolBannerUrl,
          brief: formData.brief,
          blockStart: formData.blockStart,
        });
      }
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger  asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button disabled className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Launch
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-gradient-to-b from-[#0a0f1a] to-[#0f172a] border-[#475B74] max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full blur opacity-70"></div>
            <div className="relative bg-[#0a0f1a] rounded-full p-2">
              <Edit className="h-6 w-6 text-[#018ABD]" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
            Edit Pool Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pool Logo URL */}
          <div className="space-y-2">
            <Label
              htmlFor="poolLogoUrl"
              className="text-white text-lg font-medium flex items-center"
            >
              Pool Logo URL <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formData.poolLogoUrl ? (
                <div className="bg-[#1D2538]/60 border border-[#475B74] rounded-xl p-4 flex items-center">
                  <div className="h-16 w-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-[#475B74]">
                    <img
                      src={formData.poolLogoUrl || "/placeholder.svg"}
                      alt="Logo preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=64&width=64";
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white text-sm mb-1 truncate">
                      {formData.poolLogoUrl.split("/").pop()}
                    </p>
                    <div className="flex items-center">
                      <Input
                        id="poolLogoUrl"
                        name="poolLogoUrl"
                        value={formData.poolLogoUrl}
                        onChange={handleChange}
                        className="bg-[#1D2538]/80 border-[#475B74] text-white h-10 rounded-lg focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD] mr-2"
                        placeholder="https://example.com/logo.png"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, poolLogoUrl: "" }));
                        }}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 h-10 rounded-lg px-3 flex-shrink-0"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`bg-[#1D2538]/60 border-2 border-dashed ${
                    errors.poolLogoUrl
                      ? "border-red-500/50"
                      : "border-[#475B74]/50"
                  } rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#018ABD]/50 transition-colors`}
                  onClick={() => logoInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, logoInputRef)}
                >
                  {isUploadingLogo ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-10 h-10 border-4 border-t-[#018ABD] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-[#97CBDC] text-sm">
                        Uploading logo...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-[#1D2538]/80 p-3 rounded-full mb-3">
                        <Upload className="h-6 w-6 text-[#018ABD]" />
                      </div>
                      <p className="text-white font-medium mb-1">
                        Upload Logo Image
                      </p>
                      <p className="text-[#97CBDC] text-sm text-center mb-2">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-[#97CBDC]/70 text-xs text-center">
                        PNG, JPG or GIF (max 2MB)
                      </p>
                      {errors.poolLogoUrl && (
                        <p className="text-xs text-red-400 mt-3">
                          {errors.poolLogoUrl}
                        </p>
                      )}
                    </>
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    name="poolLogoUrl"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Pool Banner URL */}
          <div className="space-y-2">
            <Label
              htmlFor="poolBannerUrl"
              className="text-white text-lg font-medium flex items-center"
            >
              Pool Banner URL <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              {formData.poolBannerUrl ? (
                <div className="bg-[#1D2538]/60 border border-[#475B74] rounded-xl p-4 flex items-center">
                  <div className="h-16 w-32 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-[#475B74]">
                    <img
                      src={formData.poolBannerUrl || "/placeholder.svg"}
                      alt="Banner preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=64&width=128";
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white text-sm mb-1 truncate">
                      {formData.poolBannerUrl.split("/").pop()}
                    </p>
                    <div className="flex items-center">
                      <Input
                        id="poolBannerUrl"
                        name="poolBannerUrl"
                        value={formData.poolBannerUrl}
                        onChange={handleChange}
                        className="bg-[#1D2538]/80 border-[#475B74] text-white h-10 rounded-lg focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD] mr-2"
                        placeholder="https://example.com/banner.png"
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            poolBannerUrl: "",
                          }));
                        }}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 h-10 rounded-lg px-3 flex-shrink-0"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`bg-[#1D2538]/60 border-2 border-dashed ${
                    errors.poolBannerUrl
                      ? "border-red-500/50"
                      : "border-[#475B74]/50"
                  } rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#018ABD]/50 transition-colors`}
                  onClick={() => bannerInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, bannerInputRef)}
                >
                  {isUploadingBanner ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-10 h-10 border-4 border-t-[#018ABD] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-[#97CBDC] text-sm">
                        Uploading banner...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-[#1D2538]/80 p-3 rounded-full mb-3">
                        <Upload className="h-6 w-6 text-[#018ABD]" />
                      </div>
                      <p className="text-white font-medium mb-1">
                        Upload Banner Image
                      </p>
                      <p className="text-[#97CBDC] text-sm text-center mb-2">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-[#97CBDC]/70 text-xs text-center">
                        PNG, JPG or GIF (max 2MB)
                      </p>
                      {errors.poolBannerUrl && (
                        <p className="text-xs text-red-400 mt-3">
                          {errors.poolBannerUrl}
                        </p>
                      )}
                    </>
                  )}
                  <input
                    ref={bannerInputRef}
                    type="file"
                    name="poolBannerUrl"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <Label
              htmlFor="websiteUrl"
              className="text-white text-lg font-medium flex items-center"
            >
              Website URL <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://example.com"
            />
            {errors.websiteUrl && (
              <p className="text-xs text-red-400 mt-1">{errors.websiteUrl}</p>
            )}
          </div>

          {/* Facebook URL */}
          <div className="space-y-2">
            <Label
              htmlFor="facebookUrl"
              className="text-white text-lg font-medium"
            >
              Facebook URL
            </Label>
            <Input
              id="facebookUrl"
              name="facebookUrl"
              value={formData.facebookUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          {/* Twitter URL */}
          <div className="space-y-2">
            <Label
              htmlFor="twitterUrl"
              className="text-white text-lg font-medium"
            >
              Twitter URL
            </Label>
            <Input
              id="twitterUrl"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://twitter.com/yourusername"
            />
          </div>

          {/* Github URL */}
          <div className="space-y-2">
            <Label
              htmlFor="githubUrl"
              className="text-white text-lg font-medium"
            >
              Github URL
            </Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://github.com/yourusername"
            />
          </div>

          {/* Telegram URL */}
          <div className="space-y-2">
            <Label
              htmlFor="telegramUrl"
              className="text-white text-lg font-medium"
            >
              Telegram URL
            </Label>
            <Input
              id="telegramUrl"
              name="telegramUrl"
              value={formData.telegramUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://t.me/yourchannel"
            />
          </div>

          {/* Instagram URL */}
          <div className="space-y-2">
            <Label
              htmlFor="instagramUrl"
              className="text-white text-lg font-medium"
            >
              Instagram URL
            </Label>
            <Input
              id="instagramUrl"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://instagram.com/yourusername"
            />
          </div>

          {/* Discord URL */}
          <div className="space-y-2">
            <Label
              htmlFor="discordUrl"
              className="text-white text-lg font-medium"
            >
              Discord URL
            </Label>
            <Input
              id="discordUrl"
              name="discordUrl"
              value={formData.discordUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://discord.gg/yourinvite"
            />
          </div>

          {/* Reddit URL */}
          <div className="space-y-2">
            <Label
              htmlFor="redditUrl"
              className="text-white text-lg font-medium"
            >
              Reddit URL
            </Label>
            <Input
              id="redditUrl"
              name="redditUrl"
              value={formData.redditUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://reddit.com/r/yoursubreddit"
            />
          </div>

          {/* Youtube URL */}
          <div className="space-y-2">
            <Label
              htmlFor="youtubeUrl"
              className="text-white text-lg font-medium"
            >
              Youtube URL
            </Label>
            <Input
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="https://youtube.com/c/yourchannel"
            />
          </div>

          {/* Brief */}
          <div className="space-y-2">
            <Label htmlFor="brief" className="text-white text-lg font-medium">
              Brief
            </Label>
            <Textarea
              id="brief"
              name="brief"
              value={formData.brief}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-24 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="Empower your community with transparent crowdfunding, automated token distribution, LP locking and DEX listing."
            />
          </div>

          {/* BlockStart */}
          <div className="space-y-2">
            <Label
              htmlFor="blockStart"
              className="text-white text-lg font-medium"
            >
              BlockStart
            </Label>
            <Input
              id="blockStart"
              name="blockStart"
              value={formData.blockStart}
              onChange={handleChange}
              className="bg-[#1D2538]/60 border-[#475B74] text-white h-12 rounded-xl focus:border-[#018ABD] focus:ring-1 focus:ring-[#018ABD]"
              placeholder="Enter block start number"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 px-8 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium"
            >
              Submit
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
