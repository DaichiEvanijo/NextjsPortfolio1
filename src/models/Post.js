import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
    },
    reactions: {
      type: Number, 
      default: 0 ,
    },
    reactedUsers: {
      type: [String],
      default: [],
    },
    provider:{
      type:String,
      required:true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Post || mongoose.model("Post", postSchema)