import express from "express";
import { userController } from "../controler/user_controler";

const userRouter: express.Router = express.Router();

userRouter.post(`/signUp`, userController.signup);
userRouter.post(`/signIn`, userController.signIn);
userRouter.get(`/myProfile`, userController.myProfile);
userRouter.put(`/updateProfile`, userController.updateProfile);

export default userRouter;
