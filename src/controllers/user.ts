import express from "express";
import { deleteUserById, getUserById, getUsers } from "../schema/user";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allusers = await getUsers();
    return res.status(200).json(allusers);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Some error occured",
    });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.json(400).json({
      message: "Some error occured",
    });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await getUserById(id);
    (user as any).username = username;
    await user?.save();

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.json(400).json({
      message: "Some error occured",
    });
  }
};
