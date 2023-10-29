import app from "./app.js";
import {connectToDatabase} from "./database/connection.js"
const Port=process.env.PORT||6000;

connectToDatabase()
.then(()=>{app.listen(Port,()=>console.log("server is running"))})
.catch(err=>console.log(err))

