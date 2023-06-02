import express from "express";
import UserController from "../controller/userController";
import { authenticateToken } from "../middlewares/authmiddleware";

const router = express.Router();
const userController = new UserController();

// 모든 유저 가져오기 API
router.get("/", authenticateToken, UserController.getAllUsers);
// ID로 유저 가져오기 API
router.get("/:id", authenticateToken, UserController.getUserById);
// ID로 유저 업데이트하기 API
router.patch("/:id", authenticateToken, UserController.updateUserById);
// 유저 회원가입 API
router.post("/register", userController.registerUser);
// 유저 로그인 API
router.post("/login", userController.loginUser);
// 리프레시 토큰 갱신 API
router.post("/refresh", authenticateToken, userController.refreshTokens);
// 유저 로그아웃 API
router.post("/logout", authenticateToken, userController.logoutUser);

export default router;
