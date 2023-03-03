import { UserRoleModel } from "../model";
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
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";
import { Response2xxSuccessful, Response4xxClientError } from "restponses";
import { StatusOptions } from "restponses/dist/utils/status_options";
const model = UserRoleModel;

const resourceName = "user_roles";

export async function getUserRoles(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  try {
    const userRoles = await model.findAll({
      attributes: ["id_user_rol", "user_rol_name"],
    });

    getGenericResponseHelper(userRoles, resourceName, res);
  } catch (error) {
    // return res.status(500).json(status500InternalServerError(`${error}`));
    return Response4xxClientError(400, { errors: error },)
  }
}

export async function postUserRole(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { user_rol_name } = req.body;

  if (!user_rol_name || typeof user_rol_name != "string") {
    return res
      .status(400)
      .json(status400BadRequest("Invalid value of user_rol_name field"));
  } else {
    try {
      const newUserRole = await model.create({ user_rol_name });
      return res.status(201).json(status201Created(newUserRole, resourceName));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}

export async function putUserRole(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { user_rol_name } = req.body;
  const { id } = req.params;

  if (!user_rol_name || typeof user_rol_name != "string") {
    return res
      .status(400)
      .json(status400BadRequest("Invalid value of user_rol_name field"));
  } else {
    try {
      const updatedUserRoles = await model.update(
        { user_rol_name },
        { where: { id_user_rol: id } }
      );
      return res
        .status(200)
        .json(status200Ok(updatedUserRoles, resourceName, "", true));
    } catch (error) {
      return res.status(500).json(status500InternalServerError(`${error}`));
    }
  }
}
