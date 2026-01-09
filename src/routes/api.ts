import express from 'express'
import db from '../db'
import type{Request,Response} from 'express'
const apiRouter=express.Router()



const insertInDB=db.prepare(`INSERT INTO data (itemName,folderId,url,userName,password,note) VALUES (?, ?, ?, ?, ?, ?)`)
const getItems=db.prepare(`SELECT itemName , createdAt FROM data`)


apiRouter.get('/',(_req:Request,res:Response)=>{
    
    try{
        const data=getItems.all()
        res.status(200).json({
            message:"Success",
            data:data
        })

    }
    catch{
        res.status(404).json({
            message:"Error while fetching data from server"
        })
    }
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