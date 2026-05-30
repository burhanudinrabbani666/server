import { model, Schema } from "mongoose";

export const userSchema = new Schema({
    googleId: String,
});

export const User = model("users", userSchema);
