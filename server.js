import express from 'express'
import connectDB from './database/connectDB.js'
import bcrypt from 'bcrypt'
import User from './models/User.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())


const port = process.env.PORT || 5060;


//register Endpoint

app.post("/register", async(req,res)=> {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({msg:"Bitte geben Sie eine E-Mail und ein Passwort an"})
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    const user = await User.create({email,password: hashedpassword})
    res.status(201).json(user);

   
})
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Verbindung mit MongoDB hat geklappt");
    app.listen(port, () => {
      console.log("Server läuft auf:", port);
    });
} catch (error) {
    console.log(error);
  }
};

startServer();