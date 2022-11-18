import { UserCartModel } from "../model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const model = UserCartModel;
const resourceName = "user_carts";

export async function getUserCarts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { id } = req.params;

  try {
    const userCartsData = await model.findAll({
      attributes: ["id_user_cart", "id_user", "selected_products"],
      where: !id ? {} : { id_user: id },
    });
    getGenericResponseHelper(userCartsData, resourceName, res);
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
