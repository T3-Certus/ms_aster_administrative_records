import { Router } from "express";
import { getGlobalProducts, postGlobalProduct } from "../controller/global_products.controller";
import {
  getProductCategories,
  postProductCategory,
} from "../controller/product_categories.controller";
import {
  getProductCollections,
  postProductCollection,
} from "../controller/product_collections.controller";
import {
  getProductMaterials,
  postProductMaterial,
} from "../controller/product_materials.controller";
import {
  getProductSeasons,
  postProductSeason,
} from "../controller/product_seasons.controller";
import { getProductSizes, postProductSize } from "../controller/product_sizes.controller";
import { postGlobalProductValidator } from "../validators/global_products.validator";

const router = Router();

router.get("/categories", getProductCategories);
router.post("/categories", postProductCategory);

router.get("/collections", getProductCollections);
router.post("/collections", postProductCollection);

router.get("/materials", getProductMaterials);
router.post("/materials", postProductMaterial);

router.get("/seasons", getProductSeasons);
router.post("/seasons", postProductSeason);

router.get("/sizes", getProductSizes)
router.post("/sizes", postProductSize)

router.get("/globals", getGlobalProducts)
router.post("/globals", postGlobalProductValidator, postGlobalProduct)

export default router;
