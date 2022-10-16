import { ProductSeasonModel } from "../model/product_seasons.model"; 
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

const productSeasonModel = ProductSeasonModel;

export async function getProductSeasons(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productSeasons = await productSeasonModel.findAll({
      attributes: ["id_product_season", "product_season_name"],
    });

    if (productSeasons) {
      if (productSeasons.length === 0) {
        res
          .status(200)
          .json(
            status200Ok(
              [],
              "product_seasons",
              "Resource found but has not content"
            )
          );
      } else {
        res
          .status(200)
          .json(status200Ok(productSeasons, "productSeasons"));
      }
    } else {
      res.status(404).json(status404NotFound("productSeasons"));
    }
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductSeason(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_season_name } = req.body;

  if (!product_season_name || typeof product_season_name != "string") {
    res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_season_name field")
      );
  } else {
    try {
      const newProductSeason = await productSeasonModel.create({
        product_season_name,
      });
      res
        .status(201)
        .json(status201Created(newProductSeason, "product_collection"));
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}