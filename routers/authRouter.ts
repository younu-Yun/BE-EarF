import express from "express";
import UserController from "../controller/userController";
import authRefresh from "../middlewares/authRefresh";

const router = express.Router();
const userController = new UserController();

// refresh토큰으로 access토큰 갱신 API
router.get("/", authRefresh, userController.createAccessToken);
// 유저 로그인 API
router.post("/", userController.loginUser);

export default router;
