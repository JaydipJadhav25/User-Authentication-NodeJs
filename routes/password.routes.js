import  express  from "express";


const passwordrouter = express.Router();


passwordrouter.get("/" , (req , res) => {
    res.render("password")
})

export{ 
    passwordrouter
   
   
}