import { OrderStateModel, UserOrderModel } from "../model";
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

const model = OrderStateModel;
const resourceName = "user_orders";

export async function getOrderStates(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const orderStatesData = await model.findAll({
      attributes: ["id_order_state", "order_state"],
    });
    getGenericResponseHelper(orderStatesData, resourceName, res);
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function postOrderState(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { order_state } = req.body;

  if (!order_state || typeof order_state != "string") {
    res
      .status(400)
      .json(status400BadRequest("Invalid value of order_state field"));
  } else {
    try {
      const newOrderState = await model.create({
        order_state,
      });
      res.status(201).json(status201Created(newOrderState, resourceName));
    } catch (error) {
      res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}
