import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import AppHeader from "@/components/application/application-header";
import AuthGuard from "./authGuard";
import { UserContextProvider } from "./context/context";
import { ApplicationNotification } from "@/components/application/application-notification";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <UserContextProvider>
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <ApplicationNotification />
          <div className="flex h-full justify-center items-center flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
    </UserContextProvider>
  );
}
