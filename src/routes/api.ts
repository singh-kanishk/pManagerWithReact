import express from 'express'
import type{Request,Response} from 'express'
const apiRouter=express.Router()

apiRouter.get('/',(_req:Request,res:Response)=>{
    res.send("Helo")
})