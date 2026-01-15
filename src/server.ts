import express from 'express'
import dotenv from 'dotenv'
import type {Request,Response,Application} from 'express'
import cors from 'cors'
import apiRouter from './routes/api';

dotenv.config()
const app:Application = express();
const PORT = process.env.SERVER_PORT||2995;
app.use(cors())
app.use(express.json())
app.use('/api',apiRouter)

app.get("/",(_req:Request,res:Response)=>{
    res.send("Hello")
})
app.listen(PORT,()=>console.log(`listening at ${PORT}`))