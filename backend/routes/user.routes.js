import express from "express";
import { register,login, logout, get, deleteUserById } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/get",get);
userRouter.delete("/del/:id",deleteUserById);
export default userRouter;