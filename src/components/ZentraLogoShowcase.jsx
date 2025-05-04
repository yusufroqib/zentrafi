import { ZentraLogo } from "./ZentraLogo";
import { ZentraLogoAnimated } from "./ZentraLogoAnimated";

export function ZentraLogoShowcase() {
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const variants = ["default", "light", "dark"];

  return (
    <div className="space-y-12 bg-inherit">
      {/* Logo Concept */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Logo Concept</h2>
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <ZentraLogo size="xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3">Design Elements</h3>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <strong>Z Shape:</strong> Represents the Zentra brand name
                  with a distinctive, modern design
                </li>
                <li>
                  <strong>Swap Arrows:</strong> Symbolize the DEX/swap
                  functionality with directional arrows
                </li>
                <li>
                  <strong>Center Token:</strong> Represents the token/launchpad
                  aspect of the platform
                </li>
                <li>
                  <strong>Circular Border:</strong> Unifies the elements and
                  creates a cohesive, balanced design
                </li>
                <li>
                  <strong>Gradient Colors:</strong> Uses the platform's
                  signature blue gradient for brand consistency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Size Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-end">
          {sizes.map((size) => (
            <div
              key={size}
              className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card"
            >
              <ZentraLogo size={size} />
              <p className="mt-4 text-sm text-muted-foreground">
                {size.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Color Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {variants.map((variant) => (
            <div
              key={variant}
              className={`flex flex-col items-center justify-center p-6 rounded-lg border ${
                variant === "dark"
                  ? "bg-gray-900"
                  : variant === "light"
                  ? "bg-gray-100"
                  : "bg-card"
              }`}
            >
              <ZentraLogo variant={variant} size="lg" />
              <p
                className={`mt-4 text-sm ${
                  variant === "dark" ? "text-gray-300" : "text-muted-foreground"
                }`}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* With/Without Tagline */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Tagline Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card">
            <ZentraLogo size="lg" showTagline={true} />
            <p className="mt-4 text-sm text-muted-foreground">With Tagline</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card">
            <ZentraLogo size="lg" showTagline={false} />
            <p className="mt-4 text-sm text-muted-foreground">
              Without Tagline
            </p>
          </div>
        </div>
      </section>

      {/* Animated Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Animated Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card">
            <ZentraLogo size="lg" animated={true} />
            <p className="mt-4 text-sm text-muted-foreground">
              Simple Animation
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card">
            <ZentraLogoAnimated size="lg" />
            <p className="mt-4 text-sm text-muted-foreground">
              Advanced Animation
            </p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Usage Examples</h2>

        {/* Header Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Header</h3>
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <ZentraLogo size="sm" />
              <div className="flex space-x-4">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
          <div className="p-8 rounded-lg border bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center">
            <ZentraLogoAnimated size="xl" variant="light" />
            <div className="h-4 w-48 bg-gray-200/20 rounded mt-6"></div>
            <div className="h-4 w-64 bg-gray-200/20 rounded mt-2"></div>
            <div className="mt-6 flex space-x-4">
              <div className="h-10 w-24 bg-blue-500 rounded"></div>
              <div className="h-10 w-24 bg-gray-200/20 rounded border border-gray-200/40"></div>
            </div>
          </div>
        </div>

        {/* Footer Example */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Footer</h3>
          <div className="p-4 rounded-lg border bg-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <ZentraLogo size="xs" variant="light" />
              <div className="mt-4 md:mt-0 flex space-x-4">
                <div className="h-4 w-16 bg-gray-600 rounded"></div>
                <div className="h-4 w-16 bg-gray-600 rounded"></div>
                <div className="h-4 w-16 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="h-px w-full bg-gray-700 my-4"></div>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Zentra. All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
