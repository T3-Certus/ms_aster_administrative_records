import mongoose from "mongoose";

const ProductMediaSchema = new mongoose.Schema(
  {
    globalProductId: { type: Number, required: true },
    productCategoryId: {type: Number, required: true},
    images: { type: Array },
  },
  { versionKey: false }
);

export default mongoose.models.ProductMedia || mongoose.model("ProductMedia", ProductMediaSchema);
