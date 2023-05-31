import { Router } from 'express';
import diaryController from '../controller/diaryController';
const diaryRouter = Router();

//calendar 환경일지 등록
diaryRouter.post('/:id', diaryController.createDiary);

//calendar 환경일지 조회
diaryRouter.get('/:id', diaryController.readDiary);

//calendar 환경일지 수정
diaryRouter.put('/:id', diaryController.updateDiary);

//calendar 환경일지 삭제
diaryRouter.delete('/:id', diaryController.deleteDiary);

export default diaryRouter;