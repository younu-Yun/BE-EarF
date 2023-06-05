import express from "express";
import UserController from "../controller/userController";
import { authenticateToken } from "../middlewares/authmiddleware";

const router = express.Router();
const userController = new UserController();

// 모든 유저 가져오기 API
router.get("/", authenticateToken, userController.getAllUsers);
// ID로 유저 가져오기 API
router.get("/:id", authenticateToken, userController.getUserById);
// ID로 유저 업데이트하기 API
router.patch("/:id", authenticateToken, userController.updateUserById);
// 유저 회원가입 API
router.post("/register", userController.registerUser);
// 유저 로그인 API
router.post("/login", userController.loginUser);
// 리프레시 토큰 갱신 API
router.post("/refresh", authenticateToken, userController.refreshTokens);
// 유저 로그아웃 API
router.post("/logout", authenticateToken, userController.logoutUser);
// Email, Name으로 유저 id찾기 API
router.post("/loginid", authenticateToken, userController.getIdByEmailAndName);

export default router;
