import { Request, Response } from "express";
import { listSchedulesService } from "../../services/schedules/listSchedules.service";

export const listSchedulesController = async (
  request: Request,
  response: Response
) => {
  const idProperty: string = request.params.id;
  const responseSchedules = await listSchedulesService(idProperty);
  return response.status(200).json(responseSchedules);
};
