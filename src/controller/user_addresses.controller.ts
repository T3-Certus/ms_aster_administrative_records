import { UserAddressModel } from "../model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import { status500InternalServerError } from "../utils/methods/httpResponses";
import { Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const model = UserAddressModel;
const resourceName = "user_addresses";

export async function getUserAddresses(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const userAddresses = await model.findAll({
      attributes: [
        "id_user_address",
        "id_user",
        "country",
        "province",
        "city",
        "address",
        "address_number",
      ],
    });
    getGenericResponseHelper(userAddresses, resourceName, res)
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`))
  }
}

export async function postUserAddress(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>){
  try {
    
  } catch (error) {
    
  }
}