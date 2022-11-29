import { check } from "express-validator";
import { validateCreateRequest } from "../utils/methods/validateHelpers";

export const postIndividualProductValidator = [
  check('id_global_product').exists().notEmpty().isInt(),
  check('id_product_size').exists().notEmpty().isInt(),
  check('id_product_color').exists().notEmpty().isInt(),
  check('product_stock').exists().notEmpty().isInt(),
  check('product_price').exists().notEmpty().isDecimal(),
  // check('product_sku').exists().notEmpty().isString(),
  check('product_url_img').exists().notEmpty().isString(),
  check('has_offer').isBoolean(),
  check('percent_discount').isInt(),

  (req: any, res: any, next: any) => {
    validateCreateRequest(req, res, next)
  }
]