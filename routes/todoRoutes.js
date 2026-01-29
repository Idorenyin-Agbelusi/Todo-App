import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { 
    getTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoForm,
    editTodo
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", isAuthenticated, getTodo);
router.post("/add", isAuthenticated, addTodo);
router.get("/toggle/:id", isAuthenticated, toggleTodo);
router.get("/delete/:id", isAuthenticated, deleteTodo);
router.get("/edit/:id", isAuthenticated, editTodoForm);
router.post("/edit/:id", isAuthenticated, editTodo);

export default router;