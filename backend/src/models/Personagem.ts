import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Personagem extends Model {
  public id!: number;
  public nome!: string;
  public raca!: string;
  public poderDeLuta!: number;
  public planetaOrigem!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Personagem.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  raca: { type: DataTypes.STRING(50), allowNull: false },
  poderDeLuta: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  planetaOrigem: { type: DataTypes.STRING(100), allowNull: true }
}, { 
  sequelize, 
  tableName: 'personagens', 
  timestamps: true 
});