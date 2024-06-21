import mongoose from "mongoose";

const usershema = mongoose.Schema({

    name :{
        type :String,

    },
    email:{
        type :String,
        required :true,
    },
     password :{
        type :String,
        required :true,
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    }

},
{
    timestamps :true
})

export const User = mongoose.model("User" , usershema)