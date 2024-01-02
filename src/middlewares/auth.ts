import express from "express";
import { getUserBySessionToken } from "../schema/user";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["cookies"];
    if (!sessionToken) {
      return res.status(400).json({
        error: "Cookie Token not found",
      });
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({
        error: "Access forbidden Invalid token",
      });
    }

    (req as any).user = existingUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Some error occured",
    });
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;
    const currentUserID = currentUser._id.toString();
    if (!id || !currentUserID) {
      return res.status(400).json({
        message: "yoyo error",
      });
    }

    if (currentUserID !== id) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Some error occured",
    });
  }
};
