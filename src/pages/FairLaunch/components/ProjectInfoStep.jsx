import { useLaunch } from "@/providers/FairLaunchProvider";
import { Globe, Twitter, MessageCircle, Github, Info } from "lucide-react";

export default function ProjectInfoStep() {
  const { formData, updateFormData } = useLaunch();

  const updateSocial = (key, value) => {
    updateFormData({
      socials: {
        ...formData.socials,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="logoUrl"
              className="text-sm font-medium text-[#97CBDC]"
            >
              Logo URL <span className="text-[#F0B90B]">*</span>
            </label>
            <input
              id="logoUrl"
              type="text"
              value={formData.logoUrl}
              onChange={(e) => updateFormData({ logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
            />
            <p className="text-xs text-[#97CBDC]/50">
              URL to your project logo (recommended size: 200x200)
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="bannerUrl"
              className="text-sm font-medium text-[#97CBDC]"
            >
              Banner Image URL <span className="text-[#F0B90B]">*</span>
            </label>
            <input
              id="bannerUrl"
              type="text"
              value={formData.bannerUrl}
              onChange={(e) => updateFormData({ bannerUrl: e.target.value })}
              placeholder="https://example.com/banner.png"
              className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
            />
            <p className="text-xs text-[#97CBDC]/50">
              URL to your banner image (recommended size: 1400x400)
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="website"
              className="text-sm font-medium text-[#97CBDC]"
            >
              Website <span className="text-[#F0B90B]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Globe className="h-5 w-5 text-[#97CBDC]/50" />
              </div>
              <input
                id="website"
                type="text"
                value={formData.website}
                onChange={(e) => updateFormData({ website: e.target.value })}
                placeholder="https://yourproject.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[#97CBDC] flex items-center gap-2">
            Social Media
            <div className="group relative">
              <Info className="h-4 w-4 text-[#97CBDC]/50 cursor-pointer" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0a0a20] border border-[#475B74]/50 text-[#97CBDC] text-xs p-2 rounded-md w-48 z-10">
                Add your project's social media links to build credibility
              </div>
            </div>
          </h3>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label
                htmlFor="twitter"
                className="text-sm font-medium text-[#97CBDC]"
              >
                Twitter
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Twitter className="h-5 w-5 text-[#97CBDC]/50" />
                </div>
                <input
                  id="twitter"
                  type="text"
                  value={formData.socials.twitter || ""}
                  onChange={(e) => updateSocial("twitter", e.target.value)}
                  placeholder="https://twitter.com/yourproject"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="telegram"
                className="text-sm font-medium text-[#97CBDC]"
              >
                Telegram
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MessageCircle className="h-5 w-5 text-[#97CBDC]/50" />
                </div>
                <input
                  id="telegram"
                  type="text"
                  value={formData.socials.telegram || ""}
                  onChange={(e) => updateSocial("telegram", e.target.value)}
                  placeholder="https://t.me/yourproject"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="github"
                className="text-sm font-medium text-[#97CBDC]"
              >
                GitHub
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Github className="h-5 w-5 text-[#97CBDC]/50" />
                </div>
                <input
                  id="github"
                  type="text"
                  value={formData.socials.github || ""}
                  onChange={(e) => updateSocial("github", e.target.value)}
                  placeholder="https://github.com/yourproject"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[#97CBDC]"
        >
          Project Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Describe your project in detail. What problem does it solve? What are its unique features?"
          rows={5}
          className="w-full px-4 py-2.5 rounded-xl border border-[#475B74] bg-[#0a0a20]/80 text-[#97CBDC] focus:border-[#018ABD] focus:outline-none transition-all duration-200"
        ></textarea>
        <p className="text-xs text-[#97CBDC]/50">
          A detailed description helps investors understand your project better
        </p>
      </div>

      <div className="bg-[#0a0a20]/60 border border-[#018ABD]/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-[#018ABD] mt-0.5" />
        <div>
          <h3 className="font-medium text-[#97CBDC]">
            Project Information Tips
          </h3>
          <ul className="text-sm text-[#97CBDC]/70 list-disc pl-5 mt-1 space-y-1">
            <li>Use high-quality images for your logo and banner</li>
            <li>Make sure your website is live and functional</li>
            <li>Active social media channels increase investor confidence</li>
            <li>
              Write a clear, concise description that explains your project's
              value proposition
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
