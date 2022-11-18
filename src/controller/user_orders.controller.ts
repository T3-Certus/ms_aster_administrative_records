import { UserOrderModel } from "../model";
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
import { requestGetParamsValidator } from "../utils/methods";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const model = UserOrderModel;
const resourceName = "user_orders";

export async function getUserOrders(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const userOrders = await model.findAll({
      attributes: [
        "id_user_order",
        "id_user",
        "id_order_state",
        "total_price",
        "order_date",
        "delivery_date",
        "total_items_quantity",
        "products",
      ],
    });
    getGenericResponseHelper(userOrders, resourceName, res);
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
