import Model from "../Models/Usermodels.js";
import bcrypt from "bcrypt";
import { errHandlers } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    !username ||
    !email ||
    !password
  ) {
    return res.status(400).json({ Message: "All fields are Required..." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  //console.log(hashedPassword);

  const newuser = new Model({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newuser.save();
    res.json("SignUp Successfull...");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errHandlers(400, "All fields are required..."));
  }

  const validuser = await Model.findOne({ email });
  if (!validuser) {
    return next(errHandlers(404, "user not Found..."));
  }
  const ValidPassword = bcrypt.compareSync(password, validuser.password);
  //console.log(ValidPassword);
  if (!ValidPassword) {
    return next(errHandlers(401, "UnAuthorized user."));
  }
  const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
  const { password: pass, ...data } = validuser._doc;
  res.status(200).cookie("Access_token", token, { httpOnly: true }).json(data);
};
