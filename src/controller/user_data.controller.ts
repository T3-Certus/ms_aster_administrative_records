import { UserAddressModel, UserCartModel, UserDataModel } from "../model";
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

const model = UserDataModel;

const resourceName = "user_data";
const getValidator = requestGetParamsValidator;

export async function getUserData(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const query = req.query;
  const attributes = [
    "id_user",
    "id_user_rol",
    "user_name",
    "user_surname",
    "user_document_type",
    "user_document_number",
    "user_cellphone",
    "user_email",
  ];

  try {
    const userData = await model.findAll({
      attributes: [
        "id_user",
        "id_user_rol",
        "user_name",
        "user_surname",
        "user_document_type",
        "user_document_number",
        "user_cellphone",
        "user_email",
      ], include: [{model: UserAddressModel}, {model: UserCartModel}],
      where: getValidator(query, attributes),
    });

    getGenericResponseHelper(userData, resourceName, res)
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
