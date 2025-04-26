import { AppSidebarLanding } from "@/components/app-sidebar-landing";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarLanding />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#070314] px-8 py-3">
        {children}
      </div>
    </SidebarProvider>
  );
}
