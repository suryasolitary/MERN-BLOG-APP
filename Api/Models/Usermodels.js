import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unquie: true, required: true, trim: true },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Model = mongoose.model("user", UserSchema);
export default Model;
