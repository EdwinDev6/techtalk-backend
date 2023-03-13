import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    content: String,
    author: String,
    imgURL:String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model ('Post', postSchema);
