import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AppError from "../errors/appError";

const validResult = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation errors", 400, errors.array());
  }
  next();
};

export { validResult };
