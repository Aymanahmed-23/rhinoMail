import User from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET =process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN =process.env.JWT_EXPIRES_IN;

export const  getUsers = async(req, res, next) =>{
    try{
        const users =await User.find();
        res.status(200).json({sucess: true, data:users});
    }
    catch(error){
        next(error);
    }
};

export const  getUser = async(req, res, next) =>{
    try{
        const user =await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('can not find user');
            error.statusCode=404;
            throw(error);
        }
        res.status(200).json({sucess: true, data:user});
    }
    catch(error){
        next(error);
    }
};
