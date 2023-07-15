import express from "express";
import AdminUserController from "../controller/adminUserController";
import authAdmin from "../middlewares/authAdmin";
import authAccess from "../middlewares/authAccess";

const router = express.Router();
const adminUserController = new AdminUserController();

// admin 전체 유저수 조회
router.get("/", authAccess, authAdmin, adminUserController.getUserAll);

// admin 이름으로 유저 검색
router.post("/", authAccess, authAdmin, adminUserController.getUserByName);

// admin 유저 정보 수정
router.patch(
  "/:_id",
  authAccess,
  authAdmin,
  adminUserController.updateUserById
);

// admin 유저 정보 삭제
router.delete("/:_id", authAccess, authAdmin, adminUserController.deleteUser);

export default router;
