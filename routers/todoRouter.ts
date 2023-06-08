import { Router } from 'express';
import todoController from '../controller/todoController';
import { authenticateToken } from "../middlewares/authmiddleware";

const todoRouter = Router();
//todo-list 등록
todoRouter.post('/:date', authenticateToken, todoController.createTodo);
//todo-list 조회
todoRouter.get('/:date', authenticateToken, todoController.getTodo);
//todo-list 완료 여부
todoRouter.patch('/:date/:todoIndex', authenticateToken, todoController.completeStatusUpdateTodo);
//todo-list 삭제
todoRouter.delete('/:date/:todoIndex', authenticateToken, todoController.deleteTodo);

export default todoRouter;