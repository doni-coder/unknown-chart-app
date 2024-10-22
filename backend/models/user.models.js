import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    }
})

const User = mongoose.model("user",userSchema)
export {User}