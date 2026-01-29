import express from "express"
import mongoose from "mongoose";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

const urii = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER_DETAIL}/`

if(process.env.NODE_ENV !== "test"){
    mongoose.connect(uri);
}
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use("/", todoRoutes);
app.use("/", authRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
})

if(process.env.NODE_ENV !== "test"){
    app.listen(port, (req, res) => {
        console.log(`Server listening on Port: ${port}`);    
    })
}

export default app;