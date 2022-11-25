import { ProductMaterialModel } from "../model/product_materials.model"; 
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

const productMaterialModel = ProductMaterialModel;
const resourceName = "product_materials"

export async function getProductMaterials(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productMaterials = await productMaterialModel.findAll({
      attributes: ["id_product_material", "product_material_name"],
    });

    getGenericResponseHelper(productMaterials, resourceName, res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductMaterial(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_material_name } = req.body;

  if (!product_material_name || typeof product_material_name != "string") {
    return res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_material_name field")
      );
  } else {
    try {
      const newProductMaterial = await productMaterialModel.create({
        product_material_name,
      });
      return res
        .status(201)
        .json(status201Created(newProductMaterial, "product_material"));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}