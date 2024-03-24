import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unquie: true, required: true, trim: true },
    password: { type: String, trim: true, required: true },
    profilePic: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th?id=OIP.x7X2oAehk5M9IvGwO_K0PgHaHa&pid=Api&P=0&h=180",
    },
  },
  { timestamps: true, versionKey: false }
);

const Model = mongoose.model("user", UserSchema);
export default Model;
