import  express  from "express";


const updatedetailes = express.Router();


updatedetailes.get("/" , (req , res) => {
    res.render("updatadetailes")
})

export{ 
    updatedetailes
   
   
}