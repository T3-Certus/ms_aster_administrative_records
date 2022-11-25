import { ProductCategoryModel } from "../model/product_categories.model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status404NotFound,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Request, Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const productCategoryModel = ProductCategoryModel;
const resourceName = "product_categories"

export async function getProductCategories(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productCategories = await productCategoryModel.findAll({
      attributes: ["id_product_category", "product_category_name"],
    });
    
    getGenericResponseHelper(productCategories, resourceName, res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductCategory(
  req: Request,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_category_name } = req.body;

  if (!product_category_name || typeof product_category_name != "string") {
    return res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_category_name field")
      );
  } else {
    try {
      const newProductCategory = await productCategoryModel.create({
        product_category_name,
      });
      return res
        .status(201)
        .json(status201Created(newProductCategory, "product_category"));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}
