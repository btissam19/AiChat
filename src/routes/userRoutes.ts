import { Router } from "express";
import chatRoutes from "./chatRoutes.js";
import { getAllUsers ,createUsers ,loginUsers} from "../controllers/usersController.js";
import{validate ,singupValidator, loginValidator } from "../utils/validators.js";

const userRoutes=Router()
userRoutes.get('/',getAllUsers)
userRoutes.post('/singup', validate(singupValidator),createUsers)
userRoutes.post('/login', validate( loginValidator ),loginUsers)

userRoutes.use('/chat',chatRoutes)



export default userRoutes;