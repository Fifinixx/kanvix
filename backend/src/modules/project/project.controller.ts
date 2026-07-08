import {Request, Response} from "express";
import { ProjectAddService } from "./project.service";

export async function ProjectAddController(req:Request, res:Response){
    const {orgId, name} = req.body.data;
    if(!orgId || !name){
        return res.status(400).json({message:"Invalid data provided"});
    }
    const insertedProject = await ProjectAddService(name, orgId);
    if(insertedProject === 404){
        return res.status(404).json({message:"Organization not found"});
    }
    return res.json({message:"Project added succesfully", project:insertedProject});
}