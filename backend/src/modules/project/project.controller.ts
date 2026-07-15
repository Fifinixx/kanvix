import { Request, Response } from "express";
import { ProjectAddService } from "./project.service";

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
    return res
      .status(401)
      .json({
        message: "You do not have permission to perform the current action!",
      });
  return res.json({
    message: "Project added succesfully",
    project: insertedProject,
  });
}
