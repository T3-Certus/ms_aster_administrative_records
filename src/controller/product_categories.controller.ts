import { ProductCategoryModel } from "../model/product_categories.model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../../utils/interfaces/responses";
import { ProductCategoryRequest } from "../../utils/interfaces/requests";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status404NotFound,
  status500InternalServerError,
} from "../../utils/methods/httpResponses";
import { Request, Response } from "express";

const productCategoryModel = ProductCategoryModel;

export async function getProductCategories(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productCategories = await productCategoryModel.findAll({
      attributes: ["id_product_category", "product_category_name"],
    });
    if (productCategories) {
      if (productCategories.length === 0) {
        res
          .status(200)
          .json(
            status200Ok(
              [],
              "productCategories",
              "Resource found but has not content"
            )
          );
      } else {
        res
          .status(200)
          .json(status200Ok(productCategories, "productCategories"));
      }
    } else {
      res.status(404).json(status404NotFound("productCategories"));
    }
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductCategory(
  req: Request,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const { product_category_name } = req.body
    if (!product_category_name) {
      res.status(400).json(status400BadRequest("Invalid value of product_category_name field"))
    }
    const newProductCategory = await productCategoryModel.create({ product_category_name })
    res.status(201).json(status201Created(newProductCategory, "product_category"))
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`))
  }

}
