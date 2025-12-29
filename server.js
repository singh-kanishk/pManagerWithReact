import express from 'express'
const app = express();
const PORT = 5173;
app.use(cors())
app.use(express.json())

app.listen('PORT',console.log(`listening at ${PORT}`))