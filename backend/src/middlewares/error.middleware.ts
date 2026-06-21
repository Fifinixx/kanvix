import { Request, Response, NextFunction } from "express";

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";

import {z} from "zod";
import {fromZodError} from "zod-validation-error"


const PRISMA_KNOWN_ERROR_MAP: Record<
  string,
  { message: string; status: number }
> = {
  P2002: { message: "A record with this value already exists.", status: 409 },
  P2025: { message: "The requested record was not found.", status: 404 },
  P2003: {
    message: "This action violates a relational constraint.",
    status: 409,
  },
  P2014: { message: "Relation violation.", status: 400 },
};

function mapKnownRequestError(err: PrismaClientKnownRequestError) {
  return (
    PRISMA_KNOWN_ERROR_MAP[err.code] ?? {
      message: "Unknown request error.",
      status: 500,
    }
  );
}
export default function ErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if(err instanceof z.ZodError){
    console.log(err);
    const error = fromZodError(err);
    return res.status(400).json({message: error});
  }
  if (err instanceof PrismaClientKnownRequestError) {
    console.log(err);
    const { message, status } = mapKnownRequestError(err);
    return res.status(status).json({ message });
  }
  if (err instanceof PrismaClientUnknownRequestError) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error occurred!" });
  }
  if (err instanceof PrismaClientRustPanicError) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error occurred!" });
  }
  if (err instanceof PrismaClientInitializationError) {
    console.error(err);
    return res
      .status(503)
      .json({ message: "Database unreachable, please try again!" });
  }
  if (err instanceof PrismaClientValidationError) {
    console.log(err);
    return res.status(400).json({
      message:
        "Invalid input provided. Please check your inputs, and try again.",
    });
  }

  // catch all for anything else
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
