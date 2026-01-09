import express from 'express'
import type {Request,Response,Application} from 'express'
import cors from 'cors'
import apiRouter from './routes/api';

const app:Application = express();
const PORT = 2995;
app.use(cors())
app.use(express.json())
app.use('/api',apiRouter)

app.get("/",(_req:Request,res:Response)=>{
    res.send("Hello")
})
app.listen(PORT,()=>console.log(`listening at ${PORT}`))