import { ProductSizeModel } from "../model/product_sizes.model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status404NotFound,
  status500InternalServerError,
} from "../../utils/methods/httpResponses";
import { Request, Response } from "express";

const productSizeModel = ProductSizeModel;

export async function getProductSizes(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productSizes = await productSizeModel.findAll({
      attributes: ["id_product_size", "product_size_name"],
    });

    if (productSizes) {
      if (productSizes.length === 0) {
        res
          .status(204)
          .json(
            status200Ok(
              [],
              "product_sizes",
              "Resource found but has not content"
            )
          );
      } else {
        res
          .status(200)
          .json(status200Ok(productSizes, "productSizes"));
      }
    } else {
      res.status(404).json(status404NotFound("productSizes"));
    }
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductSize(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_size_name } = req.body;

  if (!product_size_name || typeof product_size_name != "string") {
    res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_size_name field")
      );
  } else {
    try {
      const newProductSeason = await productSizeModel.create({
        product_size_name,
      });
      res
        .status(201)
        .json(status201Created(newProductSeason, "product_size"));
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}