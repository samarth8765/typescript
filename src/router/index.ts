import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authentication";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user";
import { isAuthenticated, isOwner } from "../middlewares/auth";

const router = Router();

router.get("/users", isAuthenticated, getAllUsers);
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
router.patch("/users/:id", isAuthenticated, isOwner, updateUser);

export default router;
