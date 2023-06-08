import express from "express";
import UserController from "../controller/userController";
import authAccess from "../middlewares/authAccess";

const router = express.Router();
const userController = new UserController();

// 모든 유저 가져오기 API
router.get("/", authAccess, userController.getAllUsers);
// ID로 유저 가져오기 API
router.get("/:id", authAccess, userController.getUserById);
// ID로 유저 업데이트하기 API
router.patch("/:id", authAccess, userController.updateUserById);
// 유저 회원가입 API
router.post("/register", userController.registerUser);
// Email, Name으로 유저 id찾기 API
router.post("/loginid", authAccess, userController.getIdByEmailAndName);

export default router;
