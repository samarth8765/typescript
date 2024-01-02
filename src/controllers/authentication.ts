import express from "express";
import { getUserByEmail, createUser } from "../schema/user";
import { authentication, random } from "../helpers/index";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please send all the required fields",
      });
    }

    //check for existing user
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // create a new user
    const salt = random();
    const newUser = await createUser({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json({
      message: "created user successfully",
    });
  } catch (error) {
    console.log("Some error occured", error);
    return res.status(404).send("Some error occured");
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }

    // extracting user from the database
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    // if user is not present
    if (!user) {
      return res.status(400).json({
        error: "User doesn't exists",
      });
    }

    // comparing hash of passwords
    const expectHash = authentication(user.authentication?.salt, password);
    if (expectHash !== user.authentication?.password) {
      return res.status(401).json({
        error: "Incorrect Password",
      });
    }

    // creating a session token for user
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("cookies", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Some error occured",
    });
  }
};
