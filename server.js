import express from "express";
import connectDB from "./database/connectDB.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5060;

//register Endpoint

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Bitte geben Sie eine E-Mail und ein Passwort an" });
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);

      const user = await User.create({ email, password: hashedpassword });
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error.message);
  }
});

//login endpoint
app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid login" });

      
    }


      //find the user by email
      const user = await User.findOne({email})
      if(!user) {
        return res.status(400).json({ message: "Benutzer not found"})
      }
      console.log(user)

    //check if password is correct
    const richtigePassword = await bcrypt.compare(password, user.password)

    if(!richtigePassword) {
       
        return res.status(400).json({ message:`password stimmt nicht`})
    }

    res.status(200).json({message:'login success',user})
    }
)


//get all users

app.get("/users", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})


const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("Connection to MongoDB succeeded");
        app.listen(port, () => {
            console.log("Server is running on:", port);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
