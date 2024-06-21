
import { getuser } from "../service/auth.js";

function restrictologdenusronly  (req , res, next ){

    //genret zaleli cookies getli
     const userid = req.cookies.uid;


     if(!userid) return res.redirect("login")

     const user = getuser(userid);//cookies bhetlya 

     if(!user) return res.redirect("login")

         console.log("user bhetla : " , user)
        



     req.user = user; //user mde tya user add kela
    


     next();




    }


    //using heades auth processes

async function checkauth(req, res, next){

    const userid = req.headers["authorization"];
    console.log(req.headers)
    console.log(userid)

    if(!userid) return res.redirect("login")

    const token = userid.split("Bearer ")[1];
    console.log(token)
  
    if(!token) return res.redirect("login")

    const user = getuser(token);
    console.log(user)



    req.user = user;
    console.log(req.user)
    next();

    
}

    export {restrictologdenusronly 
    ,checkauth}