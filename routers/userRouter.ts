import express from "express";
import UserController from "../controller/userController";
import authAccess from "../middlewares/authAccess";

const router = express.Router();
const userController = new UserController();

// 유저 정보 가져오기 API
router.get("/", authAccess, userController.getUserById);
// 유저 업데이트하기 API
router.patch("/", authAccess, userController.updateUserById);
// 모든 유저 가져오기 API
router.get("/all", authAccess, userController.getAllUsers);
// 유저 회원가입 API
router.post("/register", userController.registerUser);
// Email, Name으로 유저 id찾기 API
router.post("/loginid", authAccess, userController.getIdByEmailAndName);
// 유저 비밀번호 초기화후 임시 비밀번호 발급 API
router.post("/reset", userController.resetPassword);
// 유저 비밀번호 변경 API
router.post("/change", authAccess, userController.changePassword);

export default router;
