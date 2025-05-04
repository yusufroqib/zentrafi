
import { LaunchProvider } from "@/providers/FairLaunchProvider";
import FairLaunchForm from "./components/FairLaunchForm";

export default function FairLaunchPage() {
  return (
    <LaunchProvider>
      <FairLaunchForm />
    </LaunchProvider>
  );
}
