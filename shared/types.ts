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
}



export type NavMenuGroupType = NavMenuType[];
