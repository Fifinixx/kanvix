import { prisma } from "../../lib/prisma"
export async function ProjectAddService(name:string, orgId:string){
    const organization = await prisma.organization.findUnique({where:{id:orgId}});
    if(!organization){
        return 404;
    }
    const instertedProject = await prisma.project.create({data:{name, orgId}})
    return instertedProject;
}

export async function ProjectFetchService(projId:string){
    // const project = 
}

