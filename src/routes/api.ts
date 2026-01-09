import express from 'express'
import db from '../db'
import type{Request,Response} from 'express'
const apiRouter=express.Router()



const insertInDB=db.prepare(`INSERT INTO data (itemName,folderId,url,userName,password,note) VALUES (?, ?, ?, ?, ?, ?)`)



apiRouter.get('/',(_req:Request,res:Response)=>{
    res.send("Helo")
})
apiRouter.post('/save',(req:Request,res:Response)=>{
    try{
    const data= req.body;
    const pushedValue=insertInDB.run(data.itemName,data.folderId,data.url,data.userName,data.password,data.note)
    
    console.log(data)
    res.status(201).json({
        message:"Succesfully Added",
        id:pushedValue.lastInsertRowid
    })
   }
   catch {
    res.status(404).json(
        {
            message:"Unsuccesfull"
        }
    )
   }
})

export default apiRouter