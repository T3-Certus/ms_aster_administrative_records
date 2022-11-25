import { user_cart_model } from "../model";
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

const model = user_cart_model;
const resourceName = "userCart";

export async function getUserCarts(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { userId } = req.params;
  if(!userId){
    return res.status(400).json(status400BadRequest(`Invalid userId (${userId})`))
  }
  
  try {
    const userCart = await model.findOne({ userId: userId });
    if (!userCart) {
      return res
        .status(404)
        .json(status404NotFound(resourceName, "Resource not found"));
    }
    return res.status(200).json(status200Ok(userCart, resourceName));
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}
