import {
  GlobalProductModel,
  IndividualProductModel,
  ProductCategoryModel,
  ProductCollectionModel,
  ProductColorModel,
  ProductMaterialModel,
  ProductSeasonModel,
  ProductSizeModel,
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
import { nanoid } from "nanoid";
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
        // "id_product_collection",
        // "id_product_season",
        // "id_product_material",
        // "id_product_category",
        "product_url_code",
        "product_name",
      ],
      include: [
        {
          model: IndividualProductModel,
          include: [
            {
              model: ProductSizeModel,
              attributes: [
                ["id_product_size", "id"],
                ["product_size_name", "name"],
              ],
            },
            {
              model: ProductColorModel,
              attributes: [
                ["id_product_color", "id"],
                ["product_color_name", "name"],
              ],
            },
          ],
        },
        {
          model: ProductCollectionModel,
          attributes: [
            ["id_product_collection", "id"],
            ["product_collection_name", "name"],
          ],
        },
        {
          model: ProductSeasonModel,
          attributes: [
            ["id_product_season", "id"],
            ["product_season_name", "name"],
          ],
        },
        {
          model: ProductMaterialModel,
          attributes: [
            ["id_product_material", "id"],
            ["product_material_name", "name"],
          ],
        },
        {
          model: ProductCategoryModel,
          attributes: [
            ["id_product_category", "id"],
            ["product_category_name", "name"],
          ],
        },
      ],
      where: getValidator(query, attributes),
    });

    getGenericResponseHelper(globalProductsData, resourceName, res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
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
    // product_url_code,
    product_name,
  } = req.body;
  const product_url_code = nanoid()

  try {
    const newGlobalProduct = await globalProductModel.create({
      id_product_collection,
      id_product_season,
      id_product_material,
      id_product_category,
      product_url_code,
      product_name,
    });
    return res.status(201).json(status201Created(newGlobalProduct, resourceName));
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
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
    // product_url_code,
    product_name,
  } = req.body;

  const { id } = req.params;

  try {
    const editedGlobalProduct = await GlobalProductModel.update(
      {
        id_product_collection,
        id_product_season,
        id_product_material,
        id_product_category,
        // product_url_code,
        product_name,
      },
      { where: { id_global_product: id } }
    );

    return res
      .status(200)
      .json(status200Ok(editedGlobalProduct, resourceName, "", true));
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function deleteGlobalProduct(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {globalProductId} = req.params

  try {
    const deleteProduct = await globalProductModel.destroy({where: {id_global_product: globalProductId}})

    return res.status(200).json(status200Ok(deleteProduct, "global_products", "", false, true))
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }

}