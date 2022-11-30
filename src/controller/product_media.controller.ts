import { GlobalProductModel, product_media_model } from "../model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status401Unauthorized,
  status404NotFound,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Request, Response } from "express";

const model = product_media_model;
const resourceName = "productMedia";

export async function getProductMedia(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { categoryId, productId } = req.params;

  try {
    const productImages = await model.find(
      productId
        ? { productCategoryId: categoryId, globalProductId: productId }
        : { productCategoryId: categoryId }
    );
    if (!productImages) {
      return res
        .status(404)
        .json(status404NotFound(resourceName, "Resource not found"));
    }
    return res.status(200).json(status200Ok(productImages, resourceName));
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function createProductMedia(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { categoryId, productId} = req.body;
  console.log(req.body)
  try {
    const product = await GlobalProductModel.findOne({
      where: { id_global_product: productId, id_product_category: categoryId },
    });
    if (!product) {
      return res
        .status(404)
        .json(
          status404NotFound(
            "global product",
            `Assigned global product or category doesn't exist`
          )
        );
    }
    const newMedia = await new model({globalProductId: productId, productCategoryId: categoryId}).save();
    return res
      .status(201)
      .json(
        status201Created(
          newMedia,
          resourceName,
          "New user media has been successfully created"
        )
      );
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function updateProductMedia(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>){
  const {productId} = req.params
  const payload = req.body

  if(!payload){
    return res.status(400).json(status400BadRequest("Media payload is necessary"))
  }

  try {
    console.log(payload)
    const productMedia = await model.findOneAndUpdate({globalProductId: productId}, {images: payload}, {new: true, runValidators: true})
    if(!productMedia){
      return res.status(404).json(status404NotFound(resourceName, "Product media has not been found"))
    }
    return res.status(200).json(status200Ok(productMedia, resourceName, "", true))
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}

export async function deleteProductMedia(req: any, res: Response<GenericServiceResponse| GenericServiceErrorResponse>){
  const {productId} = req.params
  
  try {
    const deletedMedia = await model.findOneAndDelete({globalProductId: productId})
    if(!deletedMedia){
      return res.status(404).json(status404NotFound(resourceName, "Resource not found"))
    }
    return res.status(200).json(status200Ok(deletedMedia, resourceName, "", false, true))
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}