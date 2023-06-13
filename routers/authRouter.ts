import express from "express";
import UserController from "../controller/userController";
import authRefresh from "../middlewares/authRefresh";
import authAccess from "../middlewares/authAccess";

const router = express.Router();
const userController = new UserController();

// 유저 로그인 API
router.post("/", userController.loginUser);
// refresh토큰으로 access토큰 갱신 API
router.get("/", authRefresh, userController.createAccessToken);
// 유저 로그아웃 API
router.get("/logout", authAccess, userController.logoutUser);

export default router;
