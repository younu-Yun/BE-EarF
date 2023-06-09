import { Router } from 'express';
import diaryController from '../controller/diaryController';
import { authenticateToken } from "../middlewares/authmiddleware";
import { upload } from "../utils/multer";

const diaryRouter = Router();

//calendar diary 전체 조회
diaryRouter.get("/month", authAccess, diaryController.getAllDiariesByMonth);
//calendar diary 등록
diaryRouter.post('/:date', authenticateToken, diaryController.createDiary);
//calendar diary 사진 등록
diaryRouter.post('/image/:date', authenticateToken, upload.none(), diaryController.photoRegisterInDiary);
//calendar diary 조회
diaryRouter.get("/:date", authAccess, diaryController.getDiary);
//calendar diary 수정
diaryRouter.patch("/:date", authAccess, diaryController.updateDiary);
//calendar diary 삭제
diaryRouter.delete("/:date", authAccess, diaryController.deleteDiary);

export default diaryRouter;