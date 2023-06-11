import { Router } from "express";
import todoController from "../controller/todoController";
import authAccess from "../middlewares/authAccess";

const todoRouter = Router();
//todo-list 등록
todoRouter.post("/:date", authAccess, todoController.createTodo);
//todo-list 조회
todoRouter.get("/:date", authAccess, todoController.getTodo);
//todo-list 완료 여부
todoRouter.patch(
  "/:date/:todoIndex",
  authAccess,
  todoController.completeStatusUpdateTodo
);
//todo-list 삭제
todoRouter.delete("/:date/:todoIndex", authAccess, todoController.deleteTodo);

export default todoRouter;
