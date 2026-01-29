import Todo from "../models/Todo.js";

export const getTodo = async (req, res, next) => {
    try{    
        const todos = await Todo.find({userId: req.session.userId});
        res.render("index", {todo: todos});
    }catch(error){
        next(error)
    }
};

export const addTodo = async(req, res, next) => {
    try{
        await Todo.create({
            task: req.body.todo,
            userId: req.session.userId
        });
        res.redirect("/");
    }catch(error){
        next(error);
    }
};

export const toggleTodo = async (req, res, next) => {
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.status(404).send("Todo not found")
        }
        todo.complete = !todo.complete;
        await todo.save();
            console.log(todo);

        res.redirect("/");
    } catch(error){
        next(error);
    }
};

export const deleteTodo = async (req, res, next) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch(error){
        next(error);
    }
};

export const editTodoForm = async (req, res, next) => {
    try{
        const todo = await Todo.findById(req.params.id);
        res.render("edit", {todo:todo});
    } catch(error){
        next(error);
    }
};

export const editTodo = async (req, res, next) => {
    try{
        await Todo.findByIdAndUpdate(req.params.id, {task:req.body.todo});
        res.redirect("/");
    } catch(error){
        next(error);
    }
};