import { Router } from "express";
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

const router = Router();

router.get("/categories", getProductCategories);
router.post("/categories", postProductCategory);

router.get("/collections", getProductCollections);
router.post("/collections", postProductCollection);

router.get("/materials", getProductMaterials);
router.post("/materials", postProductMaterial);

router.get("/seasons", getProductSeasons);
router.post("/seasons", postProductSeason);

export default router;
