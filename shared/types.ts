export interface TokenPayload {
  id: string;
  email: string;
}
export interface RefreshToken {
  userId: string;
  token: string;
  expiresAt: Date;
}

export type ServiceFn = () => Promise<Response>;

export interface QueuedRequests {
  service: ServiceFn;
  resolve: (res: Response) => void;
  reject: (err: unknown) => void;
}

export interface NavMenuType {
  title: string;
  url: string;
  isActive: boolean;
  items?: NavMenuType[];
}

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  memberships: Memberships[];
  ownedOrganizations: Organization[];
  selectedOrganizationId: string;
  selectedOrganization: Organization;
}

export interface NotificationType {
  id: string;
  userId: string;
  text: string;
  read: boolean;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId?: string;
  memberships?: Memberships[];
  projects?: Project[];
}

export interface Memberships {
  id: string;
  org: Organization;
  orgId: string;
  role: string;
  selectedProjectId: string;
  selectedProject: Project;
}

export interface Project {
  id: string;
  name: string;
  description:string,
  orgId: string;
  tasks: Task[];
  activities: Activities[];
}

type ProjectInputContextType = {
  name: string;
  description: string;
  loading: boolean;
};
export interface ProjectContextType{
  projects: Project[] | null;
  loadingProj: boolean;
  addProject: (name: string, description: string) => Promise<void>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  projectInput: ProjectInputContextType;
  handleSetInputProject: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  dialog:boolean,
  setDialog:React.Dispatch<React.SetStateAction<boolean>>,
  fetchProject: (orgId: string) => Promise<void>;
  switchProject: (projId: string) => Promise<void>;
  handleAddProject: (e:React.SubmitEvent<HTMLFormElement>,switchProj?: string) => Promise<void>;
  deleteProject: (projId: string | null) => Promise<void>;
};

export interface OrganizationContextType  {
  selectedOrganization: Organization | null;
  memberships: Memberships[] | null;
  selectedOrganizationId: string | null;
  selectedProjectId: string | null;
  switchOrganization: (switchOrg: string) => Promise<void>;
  addOrganization: () => Promise<void>;
  handleAddOrganization: (
    e: React.SubmitEvent<HTMLFormElement>,
    switchOrg?: boolean,
  ) => Promise<void>;
  organizationInput: { name: string; loading: boolean };
  fetchUser: () => Promise<void>;
  handleAddInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  fetchOrganization: (orgId: string) => Promise<void>;
  loadingOrg: boolean;
};

export enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
}

export enum TaskStatus {
  TODO,
  "IN-PROGRESS" = 1,
  DONE,
}
export interface Task {
  id:string,
  title: String;
  description?: String;
  status: TaskStatus;
  priority: TaskPriority;
  //position: GLfloat;
  dueDate?: Date;
  projectId: String;
  assigneeId?: String;
  comments?: Comments[];
}

export interface Comments {}
export interface Activities {}

export type NavMenuGroupType = NavMenuType[];
