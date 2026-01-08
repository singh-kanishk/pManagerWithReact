import express from 'express'
import db from '../db'
import type{Request,Response} from 'express'
const apiRouter=express.Router()

interface dataInterface{
    itemName:string;
    folder:number;
    url?:string;
    userName:string;
    password:string;
    note?:string;    
}

const insertInDB=db.prepare(`INSERT INTO data (itemName,folder,url,userName,password,note) VALUES (?, ?, ?, ?, ?, ?)`)



apiRouter.get('/',(_req:Request,res:Response)=>{
    res.send("Helo")
})
apiRouter.post('/save',(req:Request,res:Response)=>{
    try{
    const data:dataInterface= req.body;
    const pushedValue=insertInDB.run(data.itemName,data.folder,data.url,data.userName,data.password,data.note)
    
    res.status(200).json({
        message:"Succesfully Added",
        id:pushedValue.lastInsertRowid
    })
   }
   catch {
    res.status(401).json(
        {
            message:"Unsuccesfull"
        }
    )
   }
})

export default apiRouter