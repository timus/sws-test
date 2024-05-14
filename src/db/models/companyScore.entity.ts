// src/db/models/companyScore.entity.ts
import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { Company } from './company.entity';

@Table({ tableName: 'swsCompanyScore' ,timestamps: false })
export class CompanyScore extends Model<CompanyScore> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  company_id: string;

  @Column(DataType.DATE)
  date_generated: Date;

  @Column(DataType.INTEGER)
  dividend: number;

  @Column(DataType.INTEGER)
  future: number;

  @Column(DataType.INTEGER)
  health: number;

  @Column(DataType.INTEGER)
  management: number;

  @Column(DataType.INTEGER)
  past: number;

  @Column(DataType.INTEGER)
  value: number;

  @Column(DataType.INTEGER)
  misc: number;

  @Column(DataType.INTEGER)
  total: number;

  @Column(DataType.STRING)
  sentence: string;

  @BelongsTo(() => Company)
  company: Company;
}
