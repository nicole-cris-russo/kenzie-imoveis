import { Request, Response } from "express";
import { IPropertyRequest } from "../../interfaces/properties";
import { createPropertyService } from "../../services/properties/createProperty.service";

export const createPropertyController = async (
  request: Request,
  response: Response
) => {
  const data: IPropertyRequest = request.body;
  const createdProperty = await createPropertyService(data);
  return response.status(201).json(createdProperty);
};
