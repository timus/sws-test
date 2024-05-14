import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Company } from './company.entity';

@Table({ tableName: 'swsCompanyPriceClose',timestamps: false })
export class CompanyPriceClose extends Model<CompanyPriceClose> {
  @PrimaryKey
  @Column(DataType.DATE)
  date: Date;

  @PrimaryKey
  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID
  })
  company_id: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  date_created: Date;

  @BelongsTo(() => Company)
  company: Company;
}
