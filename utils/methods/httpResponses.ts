import {GenericServiceResponse, GenericServiceErrorResponse} from '../interfaces'

export const status200Ok = (responseBody: any, resourceFound?: String, detailMessage?: String): GenericServiceResponse => {
  if(!resourceFound || resourceFound.length === 0){
    return {
      httpStatus: 200,
      serverMessage: 'Resource found',
      moreDetails: { responseMessage: detailMessage },
      responseBody: responseBody
    }
  }
  return {
    httpStatus: 200,
    serverMessage: `Resource ${resourceFound} found`,
    moreDetails: { responseMessage: detailMessage },
    responseBody: responseBody
  }
}

export const status201Created = (responseBody: any, resourceCreated?: String, detailMessage?: String): GenericServiceResponse => {
  if(!resourceCreated || resourceCreated.length === 0){
    return {
      httpStatus: 201,
      serverMessage: 'Resource created',
      moreDetails: {responseMessage: detailMessage},
      responseBody: responseBody
    }
  }
  return{
    httpStatus: 201,
    serverMessage: `Resource ${resourceCreated} created`,
    moreDetails: {responseMessage: detailMessage},
    responseBody: responseBody
  }
}

export const status400BadRequest = (motiveBadRequest?: String, detailMessage?: String | Array<any>): GenericServiceErrorResponse =>{
  if(!motiveBadRequest || motiveBadRequest.length === 0){
    return {
      httpStatus: 400,
      serverMessage: 'Bad request',
      errorMessage: detailMessage 
    }
  }
  return {
    httpStatus: 400,
    serverMessage: `Bad request: ${motiveBadRequest}`,
    errorMessage: detailMessage 
  }
}

export const status404NotFound = (resourceNotFound?: String, detailMessage?: String):GenericServiceErrorResponse => {
  return {
    httpStatus: 404,
    serverMessage: `Resource ${resourceNotFound} not found`,
    errorMessage: detailMessage    
  }
}

export const status500InternalServerError = (detailMessage?: String): GenericServiceErrorResponse => {
  return {
    httpStatus: 500,
    serverMessage: 'Internal server error',
    errorMessage: detailMessage
  }
}