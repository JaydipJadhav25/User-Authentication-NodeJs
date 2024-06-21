import  express  from "express";
import { restrictologdenusronly } from "../middle/authmiddlware.js";
import { currectuser, handluserlogin, handlusersignup, logoutuser, passwordchanging, updateDetailes } from "../controllers/user.js";
import { upload } from "../middle/multer.mider.js";

const userrouter = express.Router();

userrouter.post("/signup" ,
 upload.fields(
[
  {
    name: "avatar",
    maxCount: 1
  },
  {
    name : "coverimage",
    maxCount : 1
  }
]
 ),handlusersignup )

userrouter.post("/login" , handluserlogin)

userrouter.post("/logout" , restrictologdenusronly , logoutuser)

userrouter.post("/Password" , restrictologdenusronly, passwordchanging)

userrouter.post("/Update" , restrictologdenusronly, updateDetailes)

userrouter.get("/current" , restrictologdenusronly, currectuser)
// userrouter.get("/current" , (req, res) =>{
//     res.send('Hello World!')
// })
















export {
    userrouter
}