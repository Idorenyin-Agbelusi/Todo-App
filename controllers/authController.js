import User from "../models/User.js";
import bcrypt from "bcrypt"

export const getRegister = (req, res) =>{
    res.render("auth/register.ejs");
};

export const postRegister = async (req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(user){
            return res.render("auth/register", {resp:`username: ${req.body.username} already exists`})
        }
        const hashed = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            password: hashed
        });
        res.redirect("/login");
    } catch(error){
        next(error);
    }    
};

export const getLogin = (req, res) =>{
    res.render("auth/login.ejs");
};

export const postLogin = async (req, res, next) => {
    try{    
        // check if user exists
        const user = await User.findOne({username: req.body.username});
        if(!user)return res.redirect("/login");

        //validate user
        const valid = await bcrypt.compare(req.body.password, user.password);
        if(!valid) return res.redirect("/login");

        //save userId to session
        req.session.userId = user._id;

        res.redirect("/");
    }catch(error){
        next(error);
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });    
};