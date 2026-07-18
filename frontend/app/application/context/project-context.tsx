"use client";

import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { customFetch } from "@/lib/api";
import { useOrganization } from "@/app/application/context/organization-context";
import {
  ProjectAddApiService,
  ProjectFetchApiService,
  ProjectSwitchApiService,
} from "@/services/project.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type Project } from "../../../../shared/types";

type ProjectContextType = {
  projects: Project[] | null;
  loadingProj: boolean;
  addProject: (name: string) => Promise<void>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  fetchProject: (orgId: string) => Promise<void>;
  switchProject: (projId:string) => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectContextProvider({ children }: { children: ReactNode }) {
  const { selectedOrganization, ...rest } = useOrganization();
  const projects = selectedOrganization?.projects || null;
  const selectedOrganizationId = rest?.selectedOrganizationId || null;
  const selectedProjectId = rest?.selectedProjectId || null;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProj, setLoadingProj] = useState(false);
  const router = useRouter();

  async function addProject(name: string, setDefault?: string) {
    if (!selectedOrganizationId) return;
    try {
      const res = await customFetch(() =>
        ProjectAddApiService(
          selectedOrganizationId,
          name,
          (setDefault =
            projects?.length && projects?.length > 0 ? "false" : "true"),
        ),
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
      //setSelectedProject(data.project);
      await rest.fetchOrganization(selectedOrganizationId);
      toast.success("Project added succesfully!");
    } catch (e) {
      toast.error("Failed to add project");
      console.error(e);
    }
  }

  async function fetchProject(projId: string) {
    setLoadingProj(true);
    try {
      const res = await customFetch(() => ProjectFetchApiService(projId));
      if (res === 401) {
        router.push("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Error while fetching project!");
        return;
      }
      const data = await res.json();
      setSelectedProject(data.project);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while project details!");
    } finally {
      setLoadingProj(false);
    }
  }

  useEffect(() => {
    if (selectedProjectId) fetchProject(selectedProjectId);
  }, [selectedProjectId]);

  async function switchProject(projId: string) {
    setLoadingProj(true);
    try {
      const res = await customFetch(() => ProjectSwitchApiService(projId));
      if (res === 401) {
        router.push("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Error while switching project!");
        return;
      }
      const data = await res.json();
      setSelectedProject(data.project);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while switching projects!");
    }finally{
      setLoadingProj(false);
    }
  }
  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        selectedProject,
        setSelectedProject,
        loadingProj,
        switchProject,
        fetchProject,
      }}
    >
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
