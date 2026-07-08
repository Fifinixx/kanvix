"use client";

import { useState, useContext, createContext, ReactNode } from "react";
import { customFetch } from "@/lib/api";
import { useOrganization } from "@/app/application/context/organization-context";
import { ProjectAddApiService } from "@/services/project.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type Project } from "../../../../shared/types";

type ProjectContextType = {
  projects: Project[] | null;
  addProject: (name: string) => Promise<void>;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectContextProvider({ children }: { children: ReactNode }) {
  const { organization, ...rest } = useOrganization();
  const projects = organization?.projects || null;
  const selectedOrganizationId = rest.selectedOrganizationId;
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  async function addProject(name: string) {
    if (!selectedOrganizationId) return;
    try {
      const res = await customFetch(() =>
        ProjectAddApiService(selectedOrganizationId, name),
      );
      if (res === 401) {
        router.push("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to add project");
        return;
      }
      const data = await res.json();
      await rest.fetchOrganization(selectedOrganizationId);
      toast.success("Project added succesfully!");
      //setProject(data.project);
      console.log(data);
    } catch (e) {
      toast.error("Failed to add project");
      console.error(e);
    }
  }
  return (
    <ProjectContext.Provider value={{ projects, addProject, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProject must be used inside <ProjectContextProvider>");
  return context;
}
