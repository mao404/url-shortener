import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUrl extends Document {
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    fullUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model<IUrl>("Url", urlSchema);
export default Url;
