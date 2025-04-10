import { AppSidebar } from "@/components/custom/AppSidebar";
import { ThemeButton } from "@/components/custom/ThemeButton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ListView } from "@/components/views/ListView";
import { TableSkeleton } from "@/components/views/TableSkeleton";
import { Suspense } from "react";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden">
        {/* Navbar  */}
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-[#374151] text-white dark:bg-[#374151]">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            {/* Logo */}
            <div className="text-xl font-bold">LOGO</div>
          </div>

          {/* ThemeToggleButton */}
          <ThemeButton />
        </nav>
        <div className="p-10">
          <Suspense fallback={<TableSkeleton />}>
            <ListView />
          </Suspense>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
