import { Request, Response, NextFunction, RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const validateID = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    if (!isValidObjectId(id)) {
      res.status(400).json({ message: "ID is not valid" });
      return;
    }
    next();
  };
};
