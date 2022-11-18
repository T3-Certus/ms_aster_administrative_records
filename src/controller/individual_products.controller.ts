import { IndividualProductModel } from "../model/individual_products.model";
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

const individualProductModel = IndividualProductModel;
const resourceName = "individual_products"

export async function getIndividualProducts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const individualProducts = await individualProductModel.findAll({
      attributes: [
        "id_individual_product",
        "id_global_product",
        "id_product_size",
        "id_product_color",
        "product_stock",
        "product_price",
        "product_sku",
        "product_url_img",
        "has_offer",
        "percent_discount",
      ],
    });

    getGenericResponseHelper(individualProducts, resourceName, res)
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postIndividualProduct(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {
    id_global_product,
    id_product_size,
    id_product_color,
    product_stock,
    product_price,
    product_sku,
    product_url_img,
    has_offer,
    percent_discount,
  } = req.body;

  try {
    const newIndividualProduct = await individualProductModel.create({
      id_global_product,
      id_product_size,
      id_product_color,
      product_stock,
      product_price,
      product_sku,
      product_url_img,
      has_offer,
      percent_discount,
    });
    res
      .status(201)
      .json(status201Created(newIndividualProduct, "individual_product"));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function putIndividualProduct(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  
  const {
    id_global_product,
    id_product_size,
    id_product_color,
    product_stock,
    product_price,
    product_sku,
    product_url_img,
    has_offer,
    percent_discount,
  } = req.body;

  const {id} = req.params;
  console.log(id);

  try {
    const editedIndividualProduct = await IndividualProductModel.update(
      {
        id_global_product,
        id_product_size,
        id_product_color,
        product_stock,
        product_price,
        product_sku,
        product_url_img,
        has_offer,
        percent_discount,
      },
      { where: { id_individual_product: id } }
    );
    res
      .status(200)
      .json(
        status200Ok(editedIndividualProduct, "individual_product", "", true)
      );
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
