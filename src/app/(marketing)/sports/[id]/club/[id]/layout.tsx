"use client";

import { AppSidebarLanding } from "@/components/app-sidebar-landing";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const sportId = Array.isArray(id) ? id[0] : (id as string);

  return (
    <SidebarProvider>
      <AppSidebarLanding viewType="league" selectedSportId={sportId} />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#070314] px-8 py-3">
        {children}
      </div>
    </SidebarProvider>
  );
}
