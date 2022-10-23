import { Response } from "express";
import { check } from "express-validator";
import { GenericServiceErrorResponse } from "../../utils/interfaces";
import {validateCreateRequest} from "../../utils/methods/validateHelpers"

export const postGlobalProductValidator = [
  check('id_product_collection').exists().notEmpty().isInt(),
  check('id_product_season').exists().notEmpty().isInt(),
  check('id_product_material').exists().notEmpty().isInt(),
  check('id_product_category').exists().notEmpty().isInt(),
  check('product_url_code').exists().notEmpty().isString(),
  check('product_name').exists().notEmpty().isString(),

  (req: any, res: any, next: any) => {
    validateCreateRequest(req, res, next)
  }
]