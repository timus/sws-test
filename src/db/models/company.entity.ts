// src/db/models/company.entity.ts
import { Table, Column, Model, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { CompanyPriceClose } from './companyPriceClose.entity';
import { CompanyScore } from './companyScore.entity';
import { CompanyPriceCloseLatest } from './companyPriceCloseLatest.entity';
import { CompanyVolatilityScore } from './companyVolatility.entity';

@Table({ tableName: 'swsCompany',timestamps: false  })
export class Company extends Model<Company> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column(DataType.STRING)
  ticker_symbol: string;

  @Column(DataType.STRING)
  exchange_symbol: string;

  @Column(DataType.STRING)
  unique_symbol: string;

  @Column(DataType.DATE)
  date_generated: Date;

  @Column(DataType.STRING)
  security_name: string;

  @Column(DataType.STRING)
  exchange_country_iso: string;

  @Column(DataType.STRING)
  listing_currency_iso: string;

  @Column(DataType.STRING)
  canonical_url: string;

  @Column(DataType.STRING)
  unique_symbol_slug: string;

  @HasMany(() => CompanyPriceClose)
  priceCloses: CompanyPriceClose[];

  @HasMany(() => CompanyScore)
  scores: CompanyScore[];

  @HasMany(() => CompanyPriceCloseLatest)
  latestPriceCloses: CompanyPriceCloseLatest[];

  @HasMany(() => CompanyVolatilityScore)
  volatilityScores: CompanyVolatilityScore[];

}
