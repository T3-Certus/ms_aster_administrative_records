import { ProductColorModel } from "../model/product_colors.model";
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

const productColorModel = ProductColorModel
const resourceName = "product_colors"

export async function getProductColors(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>){
  try {
    const productColors = await productColorModel.findAll({
      attributes: ["id_product_color", "product_color_name"]
    })

    getGenericResponseHelper(productColors, resourceName, res)
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`))
  }
}

export async function postProductColor(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse> ){
  const {product_color_name} = req.body

  if(!product_color_name || typeof product_color_name != "string"){
    res.status(400).json(status400BadRequest("Invalid product of product_color_name field"))
  }else{
    try {
      const newProductColor = await productColorModel.create({
        product_color_name
      })
      res.status(201).json(status201Created(newProductColor, "product_color"))
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`))
    }
  }
}