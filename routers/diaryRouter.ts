import { Router } from 'express';
import diaryController from '../controller/diaryController';
const diaryRouter = Router();

//calendar diary 전체 조회
// diaryRouter.get('/', diaryController.getAllDiariesByMonth);
//calendar diary 등록
diaryRouter.post('/', diaryController.createDiary);
//calendar diary 조회
diaryRouter.get('/:date', diaryController.getDiary);
//calendar diary 수정
diaryRouter.patch('/:date', diaryController.updateDiary);
//calendar diary 삭제
diaryRouter.delete('/:date', diaryController.deleteDiary);

export default diaryRouter;