import mongoose, { Schema } from "mongoose";

const Address = new Schema(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { _id: false }
);
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    adress: { type: Address, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
