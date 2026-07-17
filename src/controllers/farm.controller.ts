import { Request, Response, NextFunction } from "express";
import { Farm } from "../models/farm.model";
import { ApiError } from "../middleware/errorHandler";
import { Op } from "sequelize";

export async function listFarms(req: Request, res: Response, next: NextFunction) {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const location = req.query.location as string | undefined;
    const where = location ? { location: { [Op.like]: `%${location}%` } } : {};
    const farms = await Farm.findAll({ where, offset: skip, limit });
    res.status(200).json(farms);
  } catch (err) {
    next(err);
  }
}

export async function getFarm(req: Request, res: Response, next: NextFunction) {
  try {
    const farm = await Farm.findByPk(req.params.id);
    if (!farm) throw new ApiError(404, `Farm with id ${req.params.id} not found`);
    res.status(200).json(farm);
  } catch (err) {
    next(err);
  }
}

export async function createFarm(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, location, area_hectare, crop_type } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new ApiError(400, "Field 'name' is required");
    }
    const farm = await Farm.create({ name, location, area_hectare, crop_type });
    res.status(201).json(farm);
  } catch (err) {
    next(err);
  }
}
