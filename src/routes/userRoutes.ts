import { Router } from "express";
import chatRoutes from "./chatRoutes.js";
import { getAllUsers ,createUsers} from "../controllers/usersController.js";
import{validate ,singupValidator} from "../utils/validators.js";

const userRoutes=Router()
userRoutes.get('/',getAllUsers)
userRoutes.post('/singup', validate(singupValidator),createUsers)

userRoutes.use('/chat',chatRoutes)



export default userRoutes;