import express, { Express } from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

const port = 4000


// get all users with their hobbies
app.get('/users', async(req, res)=>{
    const users = await prisma.users.findMany({include:{hobbies: true}})
    res.send(users)
})


//get users with their hobbies by Id
app.get('/users/:id', async (req, res) => {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) },
      include: { hobbies: true }
    })
  
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found.' })
    }
  })


//post users
app.post('/users', async (req, res) => {
   
    let errors: string[] = []

    if (typeof req.body.name !== 'string') {
        errors.push('Add a proper Name!')
      }
      if(typeof req.body.image  !=='string') {
        errors.push('Add a proper URL')
    }
    if(typeof req.body.email  !=='string') {
        errors.push('Add a proper Email')
    }
    if( errors.length === 0)  {
    const newUser = await prisma.users.create({
      data: req.body,
      include: { hobbies: true }
    })
    res.send(newUser)
}else {
    res.status(400).send({ errors: errors })
  }
  })

//delete user
app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.delete({
      where: { id }
    })
    res.send({message: "User deleted"})
  })

//Update user

app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.update({
      where: { id },
      data: req.body,
      include: { hobbies:true}
    })
    res.send(user)
  })
  

//get all hobbies with the users
app.get('/hobbies', async(req, res)=>{
    const hobbies = await prisma.hobbies.findMany({include: { users: true }})
    res.send(hobbies)
})


//get hobbies with the users by Id
app.get('/hobbies/:id', async (req, res) => {
    const hobby = await prisma.hobbies.findUnique({
      where: { id: Number(req.params.id) },
      include: { users: true }
    })
  
    if (hobby) {
      res.send(hobby)
    } else {
      res.status(404).send({ error: 'Hobby not found.' })
    }
  })


//post hobbies
app.post('/hobbies', async (req, res) => {
   
    let errors: string[] = []

    if (typeof req.body.name !== 'string') {
        errors.push('Add a proper Name!')
      }
      if(typeof req.body.image  !=='string') {
        errors.push('Add a proper URL')
    }
    if(typeof req.body.active  !=='boolean') {
        errors.push('Boolean not correct')
    }
    if(typeof req.body.userId  !=='number') {
        errors.push('Add a proper user ID')
    }
    if( errors.length === 0)  {
    const newHobbie = await prisma.hobbies.create({
      data: req.body,
      include:{users:true}
    })
    res.send(newHobbie)
}else {
    res.status(400).send({ errors: errors })
  }
  })

//delete hobbies
app.delete('/hobbies/:id',async (req, res) => {
  const id = Number(req.params.id)
  const hobby = await prisma.hobbies.delete({
      where: {id},
      include:{users:true}
  })
  res.send({message: "Hobby deleted"})
})

//Update hobbies

app.patch('/hobbies/:id', async (req, res) => {
    const id = Number(req.params.id)
    const hobby = await prisma.hobbies.update({
      where: { id },
      data: req.body,
      include: { users:true}
    })
    res.send(hobby)
  })
  

app.listen(port, () => {
    console.log(`http://localhost:${4000}`)
})
