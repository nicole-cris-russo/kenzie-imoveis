import { Request, Response } from "express";
import { listAllPropertiesService } from "../../services/properties/listAllProperties.service";

export const listAllPropertiesController = async (
  request: Request,
  response: Response
) => {
  const properties = await listAllPropertiesService();
  return response.status(200).json(properties);
};
