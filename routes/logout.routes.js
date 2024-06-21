import  express  from "express";


const logoutrouter = express.Router();


logoutrouter.get("/" , (req , res) => {
    const exuser = req.user
    const email = exuser.email
    res.render("logout" , {user : email || " "})
})

export{ 
    logoutrouter
   
}