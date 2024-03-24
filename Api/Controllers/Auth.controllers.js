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

export const google = async (req, res, next) => {
  const { username, email, profilePic } = req.body;
  try {
    const user = await Model.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newuser = new Model({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePic: profilePic,
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
      res.status(200).cookie("access_token", token, { httpOnly: true });
    }
  } catch (err) {
    console.log(err);
  }
};
