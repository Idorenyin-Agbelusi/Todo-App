  import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: String,
    complete: {type: Boolean, default:false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

export default mongoose.model("Todo", todoSchema);