import express, { Express } from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

const port = 4000

app.get('/users', async(req, res)=>{
    const users = await prisma.users.findMany({include:{hobbies: true}})
    res.send(users)
})
app.get('/hobbies', async(req, res)=>{
    const hobbies = await prisma.hobbies.findMany({include:{user:true}})
    res.send(hobbies)
})



app.listen(port, () => {
    console.log(port)
})
