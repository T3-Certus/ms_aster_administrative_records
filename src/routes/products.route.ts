import { Router } from "express";
import {
  createProductMedia,
  deleteGlobalProduct,
  deleteIndividualProduct,
  deleteProductMedia,
  getGlobalProducts,
  getIndividualProducts,
  getProductCategories,
  getProductCollections,
  getProductColors,
  getProductMaterials,
  getProductMedia,
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
  updateProductMedia,
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
router.put("/globals/:id", postGlobalProductValidator, putGlobalProduct);
router.delete("/globals/:globalProductId", deleteGlobalProduct);

router.get("/individuals", getIndividualProducts);
router.get("/individuals/:idGlobal", getIndividualProducts);
router.get("/individuals/:idGlobal/:idIndividual", getIndividualProducts);
router.post(
  "/individuals",
  postIndividualProductValidator,
  postIndividualProduct
);
router.put(
  "/individuals/:id",
  postIndividualProductValidator,
  putIndividualProduct
);
router.delete("/individuals/:individualProductId", deleteIndividualProduct);

router.get("/media/:categoryId", getProductMedia)
router.get("/media/:categoryId/:productId", getProductMedia)
router.post("/media/create", createProductMedia)
router.put("/media/update/:productId", updateProductMedia)
router.delete("/media/delete/:productId", deleteProductMedia)

export default router;
