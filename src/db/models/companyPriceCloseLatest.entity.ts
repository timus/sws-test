import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { Company } from './company.entity';

@Table({ tableName: 'swsCompanyPriceCloseLatest', timestamps: true })
export class CompanyPriceCloseLatest extends Model<CompanyPriceCloseLatest> {
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

    @BelongsTo(() => Company)
    company: Company;
}
