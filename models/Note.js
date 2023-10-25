const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: " "
  },
    cat: {
      type: Array
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", noteSchema);