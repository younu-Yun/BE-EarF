import { Router } from 'express';
import diaryController from '../controller/diaryController';
const diaryRouter = Router();

//calendar diary 등록
diaryRouter.post('/:id', diaryController.createDiary);

//calendar diary 조회
diaryRouter.get('/:id', diaryController.readDiary);

//calendar diary 수정
diaryRouter.put('/:id', diaryController.updateDiary);

//calendar diary 삭제
diaryRouter.delete('/:id', diaryController.deleteDiary);

export default diaryRouter;