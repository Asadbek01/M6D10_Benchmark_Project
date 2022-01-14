import mongoose from "mongoose"

const {Schema, model} = mongoose
const ProductSchema = new Schema({

    product_name: {type: String, required: true},
    product_description: {type: String, required: true},
    product_brand: {type: String, required: true},
    product_price: {type: Number, required: true},
    
})
export default model("Product", ProductSchema);