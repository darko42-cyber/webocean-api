import mongoose from "mongoose";
const { Schema } = mongoose;

const schoolSchema = new Schema(
  {
    school_name: {
      type: String,
      required: true,
      unique: true,
    },
    head_name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("School", schoolSchema);
