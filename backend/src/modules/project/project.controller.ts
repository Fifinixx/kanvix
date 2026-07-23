import { Request, Response } from "express";
import {
  ProjectAddService,
  ProjectDeleteService,
  ProjectFetchService,
  ProjectSwitchService,
} from "./project.service";

export async function ProjectAddController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { orgId, name, setDefault, description } = req.body.data;
  if (
    !orgId ||
    !name ||
    !userId.id ||
    !description ||
    description.length > 200
  ) {
    return res.status(400).json({ message: "Invalid data provided" });
  }
  const insertedProject = await ProjectAddService(
    name,
    orgId,
    setDefault,
    userId.id,
    description,
  );
  if (insertedProject === 403)
    return res.status(401).json({
      message: "You do not have permission to perform the current action!",
    });
  return res.status(201).json({
    message: "Project added succesfully",
    project: insertedProject,
  });
}

export async function ProjectFetchController(
  req: Request<{ projId: string }>,
  res: Response,
) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { projId } = req.params;

  if (!userId.id || !projId)
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

export async function ProjectSwitchController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { projId } = req.body.data;
  if (!userId.id || !projId)
    return res.status(400).json({ message: "Invalid details provided" });

  const setDefaultProject = await ProjectSwitchService(userId.id, projId);
  if (setDefaultProject === 403)
    return res.status(403).json({
      message: "You do not have permission to perform the current action!",
    });

  return res.json({
    message: "Project switched succesfully!",
    project: setDefaultProject,
  });
}

export async function ProjectDeleteController(req: Request<{ projId: string }>, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { projId } = req.params;
  if (!userId.id || !projId) {
    return res.status(400).json({ message: "Invalid details provided" });
  }
  const deletedProject = await ProjectDeleteService(userId.id, projId);
  if (deletedProject === 403)
    return res
      .status(403)
      .json({
        message: "You do not have permission to perform the current action!",
      });
   return res.status(204).send();
}
