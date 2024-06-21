import mongoose, { Types } from "mongoose";

const subscriptionsShcema = mongoose.Schema(
    {

        subscriber : {
            type : Schema.Types.ObjectId,
             ref : "User"
        },
        
        channel : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    },
    {
        timestamps :true
    }
)

export const Subscription = mongoose.model("Subscription" , subscriptionsShcema)