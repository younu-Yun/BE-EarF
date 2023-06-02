import { Router } from 'express';
import todoController from '../controller/todoController';
const todoRouter = Router();

//todo-list 등록
todoRouter.post('/', todoController.createTodo);

//todo-list 조회
todoRouter.get('/:id', todoController.readTodo);

//todo-list 수정
todoRouter.patch('/:id', todoController.updateTodo);

//todo-list 삭제
todoRouter.delete('/:id', todoController.deleteTodo);

export default todoRouter;