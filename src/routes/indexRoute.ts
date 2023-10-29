import { Router } from "express";
import userRoutes from "./userRoutes.js";

const indexRoute=Router()


indexRoute.use('/user',userRoutes);

export default indexRoute;