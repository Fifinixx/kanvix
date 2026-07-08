import { Request, Response } from "express";
import {
  OrganizationAddService,
  OrganizationFetchService,
} from "./organization.service";

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
  return res.status(200).json({
    message: "Organization added succesfully!",
    organization: insertedOrganization,
  });
}

export async function OrganizationFetchController(req: Request, res: Response) {
  const { orgId } = req.body.data;
  const userId = req.user as { id: string; iat: number; exp: number };
  if (!orgId) {
    return res
      .status(400)
      .json({ message: "Invalid organization id provided." });
  }
  const fetchedOrganization = await OrganizationFetchService(userId.id, orgId);
    if (fetchedOrganization === 404) {
    return res
      .status(403)
      .json({ message: "Organization not found!" });
  }
  if (fetchedOrganization === 403) {
    return res
      .status(403)
      .json({ message: "You do not have permission to view this data!" });
  }
  return res.json({
    message: "Organization fetched succesfully!",
    organization: fetchedOrganization,
  });
}
