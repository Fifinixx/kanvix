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
  ProjectDeleteApiService,
  ProjectFetchApiService,
  ProjectSwitchApiService,
} from "@/services/project.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  type Project,
  type ProjectContextType,
} from "../../../../shared/types";

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectContextProvider({ children }: { children: ReactNode }) {
  const { selectedOrganization, ...rest } = useOrganization();
  const projects = selectedOrganization?.projects || null;
  const selectedOrganizationId = rest?.selectedOrganizationId || null;
  const selectedProjectId = rest?.selectedProjectId || null;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProj, setLoadingProj] = useState(false);
  const [projectInput, setProjectInput] = useState({
    name: "",
    description: "",
    loading: false,
  });
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  async function addProject(
    name: string,
    description: string,
    setDefault?: string,
  ) {
    if (!selectedOrganizationId) return;
    setProjectInput(prev => ({
      ...prev,
      loading: true,
    }));
    try {
      const res = await customFetch(() =>
        ProjectAddApiService(
          selectedOrganizationId,
          name,
          description,
          setDefault,
        ),
      );
      if (res === 401) {
        router.push("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to add project");
        setDialog(false);
        return;
      }
      const data = await res.json();
      //setSelectedProject(data.project);
      await rest.fetchOrganization(selectedOrganizationId);
      toast.success("Project added succesfully!");
      return data;
    } catch (e) {
      toast.error("Failed to add project");
      console.error(e);
    } finally {
      setProjectInput((prev) => ({ name:"", description:"", loading: false }));
    }
  }

  function handleSetInputProject(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setProjectInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddProject(
    e: React.SubmitEvent<HTMLFormElement>,
    switchProj = projects?.length && projects?.length > 0 ? "false" : "true",
  ) {
    e.preventDefault();
    const addedProject = await addProject(projectInput?.name, projectInput.description, switchProj);
    if(switchProj === "true"){
      switchProject(addedProject.project.id);
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
      toast.error("Something went wrong while fetching project details!");
    } finally {
      setLoadingProj(false);
    }
  }

  async function deleteProject(projId:string | null){
    if(!selectedOrganizationId || !projId) return;
    try{
      const res = await customFetch(() => ProjectDeleteApiService(projId));
      if(res === 401){
        router.push("/auth");
        return
      }
      if(!res.ok){
        const data = await res.json();
        toast.error(data.message || "Error while deleting this project!");
        return;
      }
      await rest.fetchOrganization(selectedOrganizationId);
      setSelectedProject(null);
      toast.success("Project was succesfully deleted!");
    }catch(e){
      console.error(e);
      toast.error("Something went wrong while deleting this project!")
    }
  }

  useEffect(() => {
    if (selectedProjectId) {
      fetchProject(selectedProjectId);
    }
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
    } finally {
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
        projectInput,
        handleSetInputProject,
        dialog,
        setDialog,
        loadingProj,
        switchProject,
        fetchProject,
        handleAddProject,
        deleteProject
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
