import { Router } from 'express';
import todoController from '../controller/todoController';
import { authenticateToken } from "../middlewares/authmiddleware";

const todoRouter = Router();
//todo-list 등록
todoRouter.post('/:date',  todoController.createTodo);
//todo-list 조회
todoRouter.get('/:date',  todoController.getTodo);
//todo-list 완료 여부
todoRouter.patch('/:date/:todoIndex',  todoController.completeStatusUpdateTodo);
//todo-list 삭제
todoRouter.delete('/:date/:todoIndex',  todoController.deleteTodo);

export default todoRouter;