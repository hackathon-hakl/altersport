import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#070314] px-8 pt-3">
        {children}
      </div>
    </SidebarProvider>
  );
}
