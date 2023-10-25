const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    toNote: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Notes",
    },
    toUser:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fromUser: {
        type: String,
        required: true,
        ref: "User"
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);