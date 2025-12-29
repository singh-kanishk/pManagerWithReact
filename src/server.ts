import express from 'express'
import type {Request,Response,Application} from 'express'
import cors from 'cors'

const app:Application = express();
const PORT = 295;
app.use(cors())
app.use(express.json())


app.get("/",(_req:Request,res:Response)=>{
    res.send("Hello")
})
app.listen(PORT,()=>console.log(`listening at ${PORT}`))