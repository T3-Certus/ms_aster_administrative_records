import { ProductCollectionModel } from "../model/product_collections.model";
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

const productCollectionModel = ProductCollectionModel;
const resourceName = "product_collections"

export async function getProductCollections(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productCollections = await productCollectionModel.findAll({
      attributes: ["id_product_collection", "product_collection_name"],
    });

    getGenericResponseHelper(productCollections, resourceName, res)
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductCollection(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_collection_name } = req.body;

  if (!product_collection_name || typeof product_collection_name != "string") {
    res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_collection_name field")
      );
  } else {
    try {
      const newProductCollection = await productCollectionModel.create({
        product_collection_name,
      });
      res
        .status(201)
        .json(status201Created(newProductCollection, "product_collection"));
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}
