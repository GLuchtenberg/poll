import mongoose, { Document, Model, Types } from "mongoose";

const asnwerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number
  }
});

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    answer: {
      type: [asnwerSchema]
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    },
    collection: "poll"
  }
);

export interface IPoll extends Document {
  name: string;
  description: string;
  answer: [any];
  active: boolean;
}

const PollModel: Model<IPoll> = mongoose.model("Poll", schema);

export default PollModel;
