// import ProductCategoriesController from "../controller/product_categories.controller";
import {
  getProductCategories,
  postProductCategory,
} from "../controller/product_categories.controller";
import { Router } from "express";

const router = Router();

router.get("/categories", getProductCategories);
router.post("/categories", postProductCategory);

export default router;
