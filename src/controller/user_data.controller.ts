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
      ],
      where: getValidator(query, attributes),
    });

    getGenericResponseHelper(userData, resourceName, res);
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function putUserData(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {
    id_user_rol,
    user_name,
    user_surname,
    user_document_type,
    user_document_number,
    user_cellphone,
    user_email,
  } = req.body;

  const { userId } = req.params;

  try {
    const editedUserData = await model.update(
      {
        id_user_rol,
        user_name,
        user_surname,
        user_document_type,
        user_document_number,
        user_cellphone,
        user_email,
      },
      { where: { id_user: userId } }
    );

    res.status(200).json(status200Ok(editedUserData, "user_data", "", true));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}

export async function deleteUserData(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {userId} = req.params

  try {
    const deleteUser = await model.destroy({where: {id_user: userId}})

    res.status(200).json(status200Ok(deleteUser, "user_data", "", false, true))
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`))
  }

}
