import { ZentraLogoShowcase } from "@/components/ZentraLogoShowcase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

export default function LogoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">
            Zentra Logo Showcase
          </h1>
          <p className="text-center sm:text-left text-muted-foreground">
            Explore different variants and usage examples of the Zentra logo
          </p>
        </div>

        <Link href="/logo/export" className="mt-4 sm:mt-0">
          <Button>
            Download Logo
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <ZentraLogoShowcase />

      <div className="mt-12 p-6 rounded-lg border bg-card">
        <h2 className="text-2xl font-bold mb-4">Implementation</h2>
        <p className="mb-4">To use the Zentra logo in your components:</p>
        <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
          <code>{`import { ZentraLogo } from "@/components/zentra-logo";
import { ZentraLogoAnimated } from "@/components/zentra-logo-animated";

// Basic usage
<ZentraLogo />

// Custom size
<ZentraLogo size="lg" />

// Without tagline
<ZentraLogo showTagline={false} />

// With animation
<ZentraLogo animated={true} />

// Advanced animation
<ZentraLogoAnimated size="lg" />

// Different color variant
<ZentraLogo variant="light" />
`}</code>
        </pre>
      </div>
    </div>
  );
}
