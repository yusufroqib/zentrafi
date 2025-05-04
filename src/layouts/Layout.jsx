import { ZentraLayout } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout() {
  return (
    <ZentraLayout>
      <Outlet />
    </ZentraLayout>
  );
}
