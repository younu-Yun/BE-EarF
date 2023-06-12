import { Router } from 'express';
import diaryController from '../controller/diaryController';
import authAccess from "../middlewares/authAccess";
import { upload } from "../utils/multer";

const diaryRouter = Router();

//calendar diary 전체 조회
diaryRouter.get("/monthDiary/:month", authAccess, diaryController.getAllDiariesByMonth);
//calendar diary 전체 태그 조회
diaryRouter.get("/month/:month", authAccess, diaryController.getAllDiariesTagByMonth);
//calendar diary 등록
diaryRouter.post('/:date', authAccess, upload.single("imageUrl"), diaryController.createDiary);
//calendar diary 조회
diaryRouter.get("/:date", authAccess, diaryController.getDiary);
//calendar diary 수정
diaryRouter.patch("/:date", authAccess, upload.single("imageUrl"), diaryController.updateDiary);
//calendar diary 삭제
diaryRouter.delete("/:date", authAccess, diaryController.deleteDiary);

export default diaryRouter;