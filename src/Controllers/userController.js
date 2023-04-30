const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {
    // Existing user Check
    // Hashed Password
    // User Creation
    // Token Generate


    const { username, email, password } = req.body;
    try {
        // Existing user Check
        const ExistingUser = await userModel.findOne({ email: email });
        if (ExistingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        console.log("ExistUser:");
        console.log(ExistingUser);
        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // User Creation
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        // Token Generate
        // jwt method sign()
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}

const signin =async (req, res) => {
    const {email,password}=req.body;
    try{
        // Existing user Check
        const ExistingUser = await userModel.findOne({ email: email });
        console.log("ExistingUser::")
        console.log(ExistingUser);
        if (!ExistingUser) {
            return res.status(404).json({ message: "User does not exists!" });
        }
        const matchPassword=await bcrypt.compare(password,ExistingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({ email: ExistingUser.email, id: ExistingUser._id }, SECRET_KEY);
        res.status(201).json({ user: ExistingUser, token: token });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }
}

module.exports = { signup, signin };