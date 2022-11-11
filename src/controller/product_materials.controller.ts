import { ProductMaterialModel } from "../model/product_materials.model"; 
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

const productMaterialModel = ProductMaterialModel;

export async function getProductMaterials(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const productMaterials = await productMaterialModel.findAll({
      attributes: ["id_product_material", "product_material_name"],
    });

    if (productMaterials) {
      if (productMaterials.length === 0) {
        res
          .status(204)
          .json(
            status200Ok(
              [],
              "product_materials",
              "Resource found but has not content"
            )
          );
      } else {
        res
          .status(200)
          .json(status200Ok(productMaterials, "productMaterials"));
      }
    } else {
      res.status(404).json(status404NotFound("productMaterials"));
    }
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postProductMaterial(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { product_material_name } = req.body;

  if (!product_material_name || typeof product_material_name != "string") {
    res
      .status(400)
      .json(
        status400BadRequest("Invalid value of product_material_name field")
      );
  } else {
    try {
      const newProductMaterial = await productMaterialModel.create({
        product_material_name,
      });
      res
        .status(201)
        .json(status201Created(newProductMaterial, "product_material"));
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}