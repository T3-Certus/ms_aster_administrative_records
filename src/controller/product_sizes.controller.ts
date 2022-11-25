import { ProductSizeModel } from "../model/product_sizes.model";
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
import { Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const productSizeModel = ProductSizeModel;
const resourceName = "product_sizes"

export async function getProductSizes(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productSizes = await productSizeModel.findAll({
      attributes: ["id_product_size", "product_size_name"],
    });

    getGenericResponseHelper(productSizes, resourceName, res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductSize(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_size_name } = req.body;

  if (!product_size_name || typeof product_size_name != "string") {
    return res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_size_name field")
      );
  } else {
    try {
      const newProductSeason = await productSizeModel.create({
        product_size_name,
      });
      return res
        .status(201)
        .json(status201Created(newProductSeason, "product_size"));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}