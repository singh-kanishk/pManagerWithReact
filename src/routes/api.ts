import express from 'express'
import db from '../db'
import type{Request,Response} from 'express'
const apiRouter=express.Router()



const insertNewEntryInDb=db.prepare(`INSERT INTO data (itemName,folderId,url,userName,password,note) VALUES (?, ?, ?, ?, ?, ?)`)
const getItems=db.prepare(`SELECT itemId , itemName , createdAt FROM data`)
const getTime=db.prepare(`SELECT createdAt FROM data WHERE itemId = ?`)
const getItemData=db.prepare(`SELECT itemName , url , userName, password, note FROM data WHERE itemId = ?`)
const updateEntryInDb= db.prepare(`UPDATE data SET itemName = ?, url = ?, userName = ? ,password =?, note =? WHERE itemId = ?`)

const getFolders = db.prepare('SELECT * FROM folder');
const insertFolder = db.prepare('INSERT INTO folder (folderName) VALUES (?)');

apiRouter.get('/folders', (_req: Request, res: Response) => {
    try {
        const folders = getFolders.all();
        res.status(200).json({
            message: "Success",
            data: folders
        });
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({
            message: "Error fetching folders"
        });
    }
});

apiRouter.post('/folders', (req: Request, res: Response) => {
    try {
        const { folderName } = req.body;
        if (!folderName) {
            res.status(400).json({ message: "Folder name is required" });
            return;
        }
        const result = insertFolder.run(folderName);
        res.status(201).json({
            message: "Folder Created",
            id: result.lastInsertRowid,
            folderName: folderName
        });
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
             res.status(409).json({ message: "Folder already exists" });
             return; 
        }
        console.error("Error creating folder:", error);
        res.status(500).json({
            message: "Error creating folder"
        });
    }
});

apiRouter.get('/',(_req:Request,res:Response)=>{
    
    try{
        const data=getItems.all()
        res.status(200).json({
            message:"Success",
            data:data
        })

    }
    catch{
        res.status(500).json({
            message:"Error while fetching data from server"
        })
    }
})


apiRouter.post('/save',(req:Request,res:Response)=>{
    try{
    const data= req.body;
    const pushedValue=insertNewEntryInDb.run(data.itemName,data.folderId,data.url,data.userName,data.password,data.note)
    console.log(data)
    const time= getTime.get(pushedValue.lastInsertRowid) as { createdAt: string } | undefined;
    res.status(201).json({
        message:"Succesfully Added",
        id:pushedValue.lastInsertRowid,
        time:time
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

apiRouter.put('/save/:itemId',(req:Request,res:Response)=>{

    try{
            const itemId= req.params.itemId;
            const data= req.body
            console.log(data)
             updateEntryInDb.run(data.itemName,data.url,data.userName,data.password,data.note,itemId)
            
            res.status(200).json({
                message:"Successfull",
                body:data
            })
    }
    catch(error){
        console.error(error)
        res.status(400).json({
            message:"Unsuccessfull"            
        })
    }
})

apiRouter.get('/view/:itemId',(req:Request,res:Response)=>{
    try{
            const itemId= req.params.itemId
            if (isNaN(parseInt(itemId))) {
             res.status(400).json({ message: "Invalid ID format" });
             return;
        }
            const result= getItemData.get(parseInt(itemId))
            if (!result) {
             res.status(404).json({
                message: "Item not found"
            });
            return;
        }
            res.status(200).json({
                message:"Successfull",
                body:result,
            })
    }
    catch{        
        res.status(400).json({
            message:"Error From Server Side"
        })
    }
})

export default apiRouter