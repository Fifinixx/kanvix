import { Request, Response } from "express";
import { OrganizationAddService } from "./organization.service";

export async function OrganizationAddController(req: Request, res: Response) {
  const userId = req.user as { id: string; iat: number; exp: number };
  const { name } = req.body.data;
  if (!name) {
    return res.status(400).json({ message: "Invalid inputs provided!" });
  }
  const insertedOrganization = await OrganizationAddService(
    undefined,
    name,
    userId.id,
  );
  return res
    .status(200)
    .json({
      message: "Organization added succesfully!",
      organization: insertedOrganization,
    });
}
