import mongoose, { Schema } from "mongoose";

interface ISelectedProduct {
  globalProductId: Number,
  individualProductId: Number,
  quantity: Number
}

const UserCartSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  // selectedProducts: {type: Array<ISelectedProduct>, default: []}
  selectedProducts: {type: Array}
},
{
  versionKey: false
});

export default mongoose.models.UserCart || mongoose.model("UserCart", UserCartSchema);
