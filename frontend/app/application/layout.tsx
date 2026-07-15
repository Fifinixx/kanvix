import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import AppHeader from "@/components/application/application-header";
import AuthGuard from "./authGuard";
import { IdContextProvider } from "./context/id-context";
import { UserContextProvider } from "./context/user-context";
import { OrganizationContextProvider } from "./context/organization-context";
import { ProjectContextProvider } from "./context/project-context";
import { NotificationContextProvider } from "./context/notification-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IdContextProvider>
      <AuthGuard>
        <UserContextProvider>
          <NotificationContextProvider>
            <OrganizationContextProvider>
              <ProjectContextProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <AppHeader />
                    <div className="flex h-full justify-center items-center flex-col gap-4 p-4">
                      {children}
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </ProjectContextProvider>
            </OrganizationContextProvider>
          </NotificationContextProvider>
        </UserContextProvider>
      </AuthGuard>
    </IdContextProvider>
  );
}
