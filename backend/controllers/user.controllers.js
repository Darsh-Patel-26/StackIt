import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import { sendMessage } from "../utils/sendMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = asyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body;

  if (!email || !name || !password || !role) {
    return sendMessage(res, 400, "All fields are required");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return sendMessage(res, 400, "User already exists");
  }

  const user = await User.create({ email, name, password, role });

  if (!user) {
    return sendMessage(res, 500, "Error occurred while creating user");
  }

  const dtoToSend = {
    email:user.email,
    name:user.name,
    role:user.role
  };

  res
    .status(201)
    .json({
      status: true,
      message: {
        msg: "Logged in successfully",
        data: dtoToSend,
      },
    });
});

export const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if (!email || !password) {
    return sendMessage(res, 400, `Email and password are required`);
  }
    const user = await User.findOne({email});
    if(!user){
        sendMessage(res,400,`Cant Find User.Please Register First`);
    }
    const flag = await bcrypt.compare(password, user.password);
    if(!flag){
        sendMessage(res,400,"Password Wrong");
    }
    const data = {
    _id:user._id,
    email:user.email,
    role:user.role
  };
  const secret = "sec3t"
  const token =  jwt.sign(data,secret,{expiresIn:`1d`});

    const cachedUser = {
        _id:user._id,
        email:user.email,
        role:user.role,
        password:user.password
    };
  req.user = cachedUser;
  res.cookie("token", token, { httpOnly: true });
    sendMessage(res,201,{
        msg:"Succesfully Logged IN",
        data:token
    });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  req.user = null;
  return sendMessage(res, 202, "User logged out");
});

export const get = asyncHandler(async (req,res)=>{
  const data = await User.find();
  res.json({data});
})

export const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return sendMessage(res, 404, "User not found");
  }

  return sendMessage(res, 200, "User deleted successfully");
});