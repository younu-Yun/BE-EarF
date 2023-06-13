import express from "express";
import UserController from "../controller/userController";
import authAccess from "../middlewares/authAccess";
import { upload } from "../utils/multer";

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
router.post("/loginid", userController.getIdByEmailAndName);
// 유저 비밀번호 확인 API
router.post("/check", authAccess, userController.checkPassword);
// 유저 비밀번호 초기화후 임시 비밀번호 발급 API
router.post("/reset", userController.resetPassword);
// 유저 비밀번호 변경 API
router.post("/change", authAccess, userController.changePassword);
// 유저 프로필이미지 변경 API
router.post(
  "/profile",
  authAccess,
  upload.single("profileImage"),
  userController.changeProfile
);
// 유저 프로필이미지 삭제 API
router.delete(
  "/profile",
  authAccess,
  upload.single("profileImage"),
  userController.deleteProfile
);
// 유저 회원 탈퇴 API
router.delete("/delete", authAccess, userController.deleteUser);

export default router;
