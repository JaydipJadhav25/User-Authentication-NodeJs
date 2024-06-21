
import { User } from "../models/User.models.js";
import { v4 as uuidv4, validate } from 'uuid';
import { getuser, setuser } from "../service/auth.js";
import { uploadOnCloudinary } from "../util/cloudinery.js";
import { ApiResponse  } from "../util/apiresones.js";
import { apiError } from "../util/ApiErrors.js";



async function handlusersignup (req ,res) {

    const {name , email , password }  =req.body;

    console.log(name,email , password );

    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })


    if (existedUser) {
    //  throw new apiError(409, "User with email or username already exists")
    res.json({
    //    throw  new apiError(409, "User with email or username already exists")

    
         massage : "User with email or username already exists"
        
    })

        

    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    console.log("local path : " , avatarLocalPath)
    // const avatarLocalPath = req.avatar[0].path;

    
    // if (!avatarLocalPath) {
    //     throw new apiError(400, "Avatar file is required")
    // }

    const avatarcloudinarypath = await uploadOnCloudinary(avatarLocalPath);
    console.log("avatara resones  : "  ,avatarcloudinarypath);

    
    if (!avatarcloudinarypath) {
        throw new apiError(400, "Avatar file is required")
    }

    await User.create({
       name,
       email,
       password, 
       avatar: avatarcloudinarypath.url,
    })

    
    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    return res
    .status(200)
    .json(
        {
            massage :  "User registered Successfully"
        },
        {
            createdUser
        }
    )


    // if (!createdUser) {
    //     throw new apiError(500, "Something went wrong while registering the user")
    // }

    // return res.status(201).json(
    //     new ApiResponse(200, createdUser, "User registered Successfully")
    // )

    // return res.render("home" , { user : " "})

}


///////////////////////////////


async function handluserlogin (req ,res) {

    const { email , password}  =req.body;

    // console.log(email , password)

    const exuser = await User.findOne({
        email , password
    })
    // console.log(exuser)

    if(!exuser) return res.render("login");

// const sectionid = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// setuser(sectionid , exuser); //user vr id map keli

const token = setuser(exuser);
console.log("token : ", token)

 res.cookie("uid" , token , {
    // domain : ".jaydipjadhav"
 }); //set cookies of user

/////////////////////////using header////////////


// return res.json({token})
    console.log("exuser : " ,exuser)
   req.user2 = exuser;

   console.log("req.user2  :" ,req.user2)

   const avatar = exuser.avatar

    return res.render("home" , { user : avatar})



}
const logoutuser = async(req, res) => {

    // const userid = req.user
//    console.log("req.user2  :" ,req.user2)

//    console.log("req.cookie:" ,req.cookies.uid)
   const token = req.cookies.uid;
   const decodedata = getuser(token);
//    console.log("user fined : " , decodedata)
   

   const user = await User.findOne({
    _id :decodedata._id
   });
//    console.log("user fined : " , user)


   


    
    // console.log("user   : " , userid);
    // console.log("user   : " , userid._id);
    // res.json({
    //     massgae : " ok "
    // })
    return res
    .clearCookie("uid")
    .render("home" , { user : " "})
}


const passwordchanging = async(req, res) => {
    const{ oldpassword , newpassword} = req.body;

    // console.log("email , oldpassword , newpassword" , email , oldpassword , newpassword)
          
    //       const user = await User.findOne({
    //         email:email
    //       })

    //       if(!user) return res.json({
    //         massage : "user is not find unauthorized"
    //       }).render("password")

    //     //   const correctoldpass = user.password;

        // console.log("oldpass : " , oldpassword)
        // console.log("newpass : " , newpassword)
    //     if(oldpassword != user.password) {
    //         return res.json({
    //             massage : " old password is worng "
    //           }).render("password")
    //     }

        //     user.password = newpassword;
        //    user.save();

        

        // const newuser = await User.findOneAndUpDate({email:email} , {password  : newpassword})

                   //  const newuser =  await user.update({
        //     password : newpassword
        //   })

        //   console.log("successfully passchange : ")



          /////////////////////////////////////////////////////////////////////////////////////

          //jo user logged ahe  tyacha  pass chaneg kru access geun 

         const user = req.user

             console.log("oldpassuser : " ,user);

             
        const exuser = await User.findOne({
            _id : user?._id,
        })

        console.log(" done anla user : " , exuser)
              
         if(oldpassword !=exuser.password) return res.render("password")

         exuser.password = newpassword
         exuser.save();
        console.log(" done zal change : " , exuser)


         return res.render("home"  ,{ user : " "} )





 

}



const updateDetailes  = async(req ,res ) => {

    const { neweamil , comemail ,  name } = req.body

    if(neweamil === comemail){
        return res.json({
            massgae : "new eamil and comfom eamil is not same "
        })
    }

    console.log( newemail , name)

    const newuser = await User.findByIdAndUpdate(
        req.user._id,
        {
            newemail,
            newfullname
        },
        { new :true}
    )

    req.user = newuser;

    return res.render("home")


}


const currectuser = async(req , res) =>{

    const user = req.user

    console.log("currentpassuser : " ,user);

    const exuser = await User.findOne({
        _id : user?._id,
    }).select("-password")

    console.log("currentpassuser : " , exuser);



    return res.json({
         exuser
    })
}


export{
    handlusersignup, 
    handluserlogin,
    logoutuser,
    passwordchanging,
    updateDetailes,
    currectuser
}