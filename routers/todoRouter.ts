import { Router } from 'express';
import todoController from '../controller/todoController';
const todoRouter = Router();

//todo-list 등록
todoRouter.post('/', todoController.createTodo);

//todo-list 조회
todoRouter.get('/:id', todoController.getTodo);

//todo-list 완료 여부
todoRouter.patch('/:id', todoController.completeTodo);

//todo-list 삭제
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;