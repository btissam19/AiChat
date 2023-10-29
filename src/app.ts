import  express  from "express";
import { config } from "dotenv";
import morgan from "morgan";

import indexRoute from './routes/indexRoute.js'
config();

const app=express();

app.use(express.json())
app.use(morgan("dev"))
app.use("/api/v1" ,indexRoute)

export default app;