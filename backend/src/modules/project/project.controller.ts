import { Request, Response } from "express";
import { ProjectAddService, ProjectFetchService } from "./project.service";

export async function ProjectAddController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { orgId, name, setDefault } = req.body.data;
  if (!orgId || !name || !userId.id) {
    return res.status(400).json({ message: "Invalid data provided" });
  }
  const insertedProject = await ProjectAddService(
    name,
    orgId,
    setDefault,
    userId.id,
  );
  if (insertedProject === 401)
    return res.status(401).json({
      message: "You do not have permission to perform the current action!",
    });
  return res.status(201).json({
    message: "Project added succesfully",
    project: insertedProject,
  });
}

export async function ProjectFetchController(req: Request<{projId:string}>, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { projId } = req.params;

  if (!userId.id  || !projId)
    return res.status(400).json({ message: "Invalid details provided" });

  const fetchedProject = await ProjectFetchService(userId.id, projId);

  if (fetchedProject === 403)
    return res.status(403).json({
      message: "You do not have permission to perform the current action!",
    });

  return res.json({
    message: "Project fetched succesfully!",
    project: fetchedProject,
  });
}

export async function ProjectSwitchController(){}
