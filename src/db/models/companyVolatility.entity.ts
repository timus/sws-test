import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Company } from './company.entity';

@Table({ tableName: 'swsCompanyVolatilityScore', timestamps: true })
export class CompanyVolatilityScore extends Model<CompanyVolatilityScore> {
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
    score: number;

    @BelongsTo(() => Company)
    company: Company;
}
