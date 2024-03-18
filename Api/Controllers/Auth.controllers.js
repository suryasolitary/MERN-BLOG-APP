import Model from "../Models/Usermodels.js";
import bcrypt from "bcrypt";

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
  console.log(hashedPassword);

  const newuser = await new Model({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newuser.save();
    res.send("SignUp Successfull...");
  } catch (err) {
    console.log(err);
  }
};