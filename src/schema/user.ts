import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findOne({ _id: id });
export const getUserBySessionToken = (token: string) =>
  UserModel.findOne({ "authentication.sessionToken": token });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values)
    .save()
    .then((user) => user.toObject())
    .catch((err) => {
      console.log("Some error occured while saving the user");
    });

export const deleteUserById = (id: string) => UserModel.deleteOne({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ _id: id }, values);
