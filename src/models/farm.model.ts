import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export class Farm extends Model {
  public id!: number;
  public name!: string;
  public location?: string;
  public area_hectare?: number;
  public crop_type?: string;
}

Farm.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: true },
    area_hectare: { type: DataTypes.FLOAT, allowNull: true },
    crop_type: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: "farms", timestamps: true }
);