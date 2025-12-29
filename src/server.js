import express from 'express'
import cors from 'cors'
import router from '../../pManager/src/routes/api';
const app = express();
const PORT = 295;
app.use(cors())
app.use(express.json())

app.use('/api',router)
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.listen(PORT,console.log(`listening at ${PORT}`))