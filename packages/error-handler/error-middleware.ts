import { AppError } from "./index";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if it's an instance of AppError
  if (err instanceof AppError) {
    console.error(`Error ${req.method} ${req.url} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Handle unknown/unexpected errors
  console.error("Unhandled error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong, please try again later.",
  });
};
