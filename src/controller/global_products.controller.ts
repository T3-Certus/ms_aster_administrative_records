import {
  GlobalProductModel,
  IndividualProductModel,
  ProductCategoryModel,
  ProductCollectionModel,
  ProductMaterialModel,
  ProductSeasonModel,
} from "../model";
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
import { requestGetParamsValidator } from "../../utils/methods";
import { Request, Response } from "express";

const globalProductModel = GlobalProductModel;

const getValidator = requestGetParamsValidator;

export async function getGlobalProducts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const query = req.query;
  const attributes = [
    "id_product_collection",
    "id_product_season",
    "id_product_material",
    "id_product_category",
    "product_url_code",
    "product_name",
  ];

  try {
    let globalProducts = {};

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

    // const globalProductJoinData = await globalProductModel.findAll({
    //   attributes: [],
    //   include: [
    //     {
    //       model: ProductCollectionModel,
    //       attributes: ["product_collection_name"],
    //     },
    //     { model: ProductSeasonModel, attributes: ["product_season_name"] },
    //     { model: ProductMaterialModel, attributes: ["product_material_name"] },
    //     { model: ProductCategoryModel, attributes: ["product_category_name"] },
    //   ],
    // });

    if (globalProductsData) {
      if (globalProductsData.length === 0) {
        res
          .status(204)
          .json(
            status200Ok(
              [],
              "global_products",
              "Resource found but has not content"
            )
          );
      } else {
        // globalProducts = {"globalProducts": globalProductsData, "globalProductsData":globalProductJoinData}
        res
          .status(200)
          .json(status200Ok(globalProductsData, "global_products"));
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
      product_name,
    });
    res.status(201).json(status201Created(newGlobalProduct, "global_product"));
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
      .json(status200Ok(editedGlobalProduct, "global_product", "", true));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
