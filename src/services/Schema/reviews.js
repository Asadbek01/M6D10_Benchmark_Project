import mongoose from "mongoose"

const {Schema, model} = mongoose
const ReviewSchema = new Schema({

    text: {type: String, required: true},

}, {timestamps: true},
)
export default model("Product", ReviewSchema);