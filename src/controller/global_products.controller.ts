import {
  GlobalProductModel,
  IndividualProductModel,
} from "../model";
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
import { requestGetParamsValidator } from "../utils/methods";
import { Request, Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const globalProductModel = GlobalProductModel;

const getValidator = requestGetParamsValidator;
const resourceName = "global_products"

export async function getGlobalProducts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const query = req.query;
  const attributes = [
    "id_global_product",
    "id_product_collection",
    "id_product_season",
    "id_product_material",
    "id_product_category",
    "product_url_code",
    "product_name",
  ];

  try {
    const globalProductsData = await globalProductModel.findAll({
      attributes: [
        "id_global_product",
        "id_product_collection",
        "id_product_season",
        "id_product_material",
        "id_product_category",
        "product_url_code",
        "product_name",
      ],
      include: { model: IndividualProductModel },
      where: getValidator(query, attributes),
    });

    getGenericResponseHelper(globalProductsData, resourceName, res)
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
      product_name,
    });
    res.status(201).json(status201Created(newGlobalProduct, resourceName));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function putGlobalProduct(
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

  const { id } = req.params;
  console.log(id);

  try {
    const editedGlobalProduct = await GlobalProductModel.update(
      {
        id_product_collection,
        id_product_season,
        id_product_material,
        id_product_category,
        product_url_code,
        product_name,
      },
      { where: { id_global_product: id } }
    );

    res
      .status(200)
      .json(status200Ok(editedGlobalProduct, resourceName, "", true));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
