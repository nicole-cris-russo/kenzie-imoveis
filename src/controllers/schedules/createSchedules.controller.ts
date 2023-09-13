import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import { createSchedulesService } from "../../services/schedules/createSchedules.service";

export const createSchedulesController = async (
  request: Request,
  response: Response
) => {
  const data: IScheduleRequest = request.body;
  const userId = request.user.id;
  const createdSchedules = await createSchedulesService({ ...data, userId });
  return response.status(201).json({
    message: "Scheduling successful"
  });
};
