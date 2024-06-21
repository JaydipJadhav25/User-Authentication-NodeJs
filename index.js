import  express, { json }  from "express"
import mongoose from "mongoose";
// import ejs from "ejs";
import  path from "path";
import cookieParser from "cookie-parser";
import cors from "cors"
import { staticrouter } from "./routes/satatic.routes.js";
import { userrouter } from "./routes/user.routes.js";
import { User } from "./models/User.models.js";
import { mainrouter } from "./routes/main.routes.js";
// import  restrictloginuser  from "../middelware/auth.mid.js";
// import { handlusersignup } from "./controllers/user.js";
import { checkauth, restrictologdenusronly } from "./middle/authmiddlware.js";
import { logoutrouter } from "./routes/logout.routes.js";
import { passwordrouter } from "./routes/password.routes.js";
import { updatedetailes } from "./routes/updatedetailes.routes.js";

const app = express();
const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
const connectiondb =  await  mongoose.connect("mongodb://localhost:27017/MyData")
console.log("Datebase Connected Successfully...")


app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));
app.use(express.json({limit : "100kb"}))
app.use(express.urlencoded({
  extended : true,
  limit :"50kb"
}))
app.use(cookieParser());
app.use(cors());


//routing........................
app.use("/" , staticrouter)
app.use("/user" ,userrouter )
app.use("/main" ,restrictologdenusronly,mainrouter)//page
app.use("/logout"  ,restrictologdenusronly, logoutrouter)//page
app.use("/password"  ,restrictologdenusronly, passwordrouter) //page
app.use("/update"  ,restrictologdenusronly, updatedetailes) //page
// app.use("/main" ,checkauth,mainrouter)







app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.get('/home', (req, res) => {
//     res.render("home")
//   })
  






























































