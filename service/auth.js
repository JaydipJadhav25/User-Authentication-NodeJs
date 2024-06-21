//  const sectionidusermap = new Map()
import JsonWebTokenError  from "jsonwebtoken"
const secretkey = "jaydipjadhav2512@#$%^&*"



//  function setuser (id , user) {
//     sectionidusermap.set(id , user);
//  }

function setuser (user) {
    return JsonWebTokenError.sign({
      _id :user._id,
      email :user.email
    },secretkey)
}

//  function getuser(id) {
//    return sectionidusermap.get(id);

//  }

 function getuser(token) {
   return JsonWebTokenError.verify(token,secretkey)

 }



 export{
    setuser ,
    getuser
 }