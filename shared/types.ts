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

export interface QueuedRequests  {
  service: ServiceFn;
  resolve: (res:Response) => void;
  reject: (err:unknown) => void
};

export interface NavMenuType{
  title:string, 
  url:string,
  isActive:boolean,
  items?:NavMenuType[]
}

export interface UserType{
  id:string,
  email:string,
  firstName:string,
  lastName:string
  memberships:Memberships[]
  ownedOrganizations: Organization[],
  selectedOrganizationId:string,
  selectedOrganization:Organization
}

export interface NotificationType{
  id:string,
  userId:string,
  text:string,
  read:boolean,
  createdAt: Date
}

export interface Organization{
  id:string,
  name:string,
  slug:string,
  ownerId?:string
}

export interface Memberships{
  id:string,
  org:Organization,
  orgId:string,
  role:string,
}



export type NavMenuGroupType = NavMenuType[];
