import userModel from "../../model/user/index.js";
// import TokenmentModel from "../../model/auth/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenModel from "../../model/auth/index.js";
import Joi from "joi";
import sequelize from "../../db/config.js";

import joi from "joi";
const SECRET_KEY=process.env.SECRET_KEY;
const userController = {
  signup: async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(35).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(16).required(),
      });
  
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    try {
      const payload = req.body;
      const existUser = await userModel.findOne({ 
        where:{
            email:payload.email
        }
       });
        if(existUser){
            res.status(400).json({message:"user already exists."})
        }
      const hashPassword = await bcrypt.hash(payload.password, 10);
      const user = new userModel({
        name: payload.name,
        email: payload.email,
        password: hashPassword,
      });
      res.json({
        message: "user added successfully"
      });      
      await user.save();
    } 
    catch (error) {
        console.log(`This Is error signup=========> ${error}`);
      res.status(404).json({ message: "Internal Server Error." });
    }
  },
  signin: async (req, res) => {
    try {
      const payload= req.body;
      
      const schema= joi.object({
        email: joi.string().min(12).max(30).required(),
        password: joi.string().min(3).max(16).required()
      })
      const {value, error}=schema.validate(payload); 
      if(error){
        res.status(400).json({
          message:"Invalid Data"
        })
      }
      const existUser = await userModel.findOne({ 
        where:{
            email:payload.email
        }
       });
       const matchPassword=bcrypt.compare(payload.password, existUser.password);
       if(!matchPassword){
        console.log("Credentials are invalid.");
       }

      const token=jwt.sign({emial:existUser.email,id:existUser._id},SECRET_KEY,{expiresIn: '36000m'});
      res.status(200).json({
        user:existUser,
        token:token
      })
      await tokenModel.create({
        Token: token
      })
    }
    catch{
      error,
      console.log(`This Is error at signin=========> ${error}`);
      res.status(404).json({ message: "Internal Server Error." });
    }
  }
  

};

export default userController;
