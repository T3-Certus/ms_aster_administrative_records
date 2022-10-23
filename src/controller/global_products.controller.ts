import { GlobalProductModel } from "../model/global_products.model";
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
import { Interface } from "readline";

const globalProductModel = GlobalProductModel;

export async function getGlobalProducts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const globalProducts = await globalProductModel.findAll({
      attributes: [
        "id_global_product",
        "id_product_collection",
        "id_product_season",
        "id_product_material",
        "id_product_category",
        "product_url_code",
        "product_name",
      ],
    });

    if (globalProducts) {
      if (globalProducts.length === 0) {
        res
          .status(200)
          .json(
            status200Ok(
              [],
              "global_products",
              "Resource found but has not content"
            )
          );
      } else {
        res.status(200).json(status200Ok(globalProducts, "global_products"));
      }
    } else {
      res.status(404).json(status404NotFound("global_products"));
    }
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postGlobalProduct(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {
    id_product_collection,
    id_product_season,
    id_product_material,
    id_product_category,
    product_url_code,
    product_name,
  } = req.body;

  try {
    const newGlobalProduct = await globalProductModel.create({
      id_product_collection,
      id_product_season,
      id_product_material,
      id_product_category,
      product_url_code,
      product_name
    })
    res.status(201).json(status201Created(newGlobalProduct, "global_product"))
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
    
  }

}
