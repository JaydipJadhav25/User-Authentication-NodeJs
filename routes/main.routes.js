import  express  from "express";


const mainrouter = express.Router();


mainrouter.get("/" , (req , res) => {
    res.render("main")
})

export{ 
    mainrouter
}