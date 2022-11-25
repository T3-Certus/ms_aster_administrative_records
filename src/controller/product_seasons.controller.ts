import { ProductSeasonModel } from "../model/product_seasons.model"; 
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

const productSeasonModel = ProductSeasonModel;
const resourceName = "product_seasons"

export async function getProductSeasons(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productSeasons = await productSeasonModel.findAll({
      attributes: ["id_product_season", "product_season_name"],
    });

    getGenericResponseHelper(productSeasons, resourceName, res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductSeason(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_season_name } = req.body;

  if (!product_season_name || typeof product_season_name != "string") {
    return res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_season_name field")
      );
  } else {
    try {
      const newProductSeason = await productSeasonModel.create({
        product_season_name,
      });
      return res
        .status(201)
        .json(status201Created(newProductSeason, "product_season"));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}