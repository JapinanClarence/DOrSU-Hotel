import UserModel from "../model/User.js";
import jwt from "jsonwebtoken";


const ACCESS_KEY = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

export const register = async (req, res, next) => {
  const { firstname, lastname, middlename, email, password } = req.body;
  try {
    const username = `${firstname}${lastname}`;

    await UserModel.create({
      firstname,
      lastname,
      middlename,
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res, next) =>{
    const { username, password } = req.body;
  try {
    //find username or email
    const user = await UserModel.findOne({
      $or: [
        {
          email: username,
        },
        { username },
      ],
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //generate jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      ACCESS_KEY,
      { expiresIn: ACCESS_EXPIRATION }
    );
   
    //send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data:{
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        middlename: user.middlename,
        email: user.email,
        username: user.username,
        role: user.role,
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
