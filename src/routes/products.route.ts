import { Router } from "express";
import {
  getGlobalProducts,
  getIndividualProducts,
  getProductCategories,
  getProductCollections,
  getProductColors,
  getProductMaterials,
  getProductSeasons,
  getProductSizes,
  postGlobalProduct,
  postIndividualProduct,
  postProductCategory,
  postProductCollection,
  postProductColor,
  postProductMaterial,
  postProductSeason,
  postProductSize,
  putGlobalProduct,
  putIndividualProduct,
} from "../controller";

import { postGlobalProductValidator } from "../validators/global_products.validator";
import { postIndividualProductValidator } from "../validators/individual_products.validator";

const router = Router();

router.get("/categories", getProductCategories);
router.post("/categories", postProductCategory);

router.get("/collections", getProductCollections);
router.post("/collections", postProductCollection);

router.get("/materials", getProductMaterials);
router.post("/materials", postProductMaterial);

router.get("/seasons", getProductSeasons);
router.post("/seasons", postProductSeason);

router.get("/sizes", getProductSizes);
router.post("/sizes", postProductSize);

router.get("/colors", getProductColors);
router.post("/colors", postProductColor);

router.get("/globals", getGlobalProducts);
router.post("/globals", postGlobalProductValidator, postGlobalProduct);
router.put("/globals/:id", putGlobalProduct);

router.get("/individuals", getIndividualProducts);
router.get("/individuals/:idGlobal", getIndividualProducts);
router.get("/individuals/:idGlobal/:idIndividual", getIndividualProducts);
router.post(
  "/individuals",
  postIndividualProductValidator,
  postIndividualProduct
);
router.put("/individuals/:id", putIndividualProduct);

export default router;
