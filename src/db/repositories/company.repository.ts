import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyPriceClose } from '../models/companyPriceClose.entity';
import { Company } from '../models/company.entity';
import { Op } from 'sequelize';
import { CompanyVolatilityScore } from '../models/companyVolatility.entity';
import { CompanyScore } from '../models/companyScore.entity';
import { FindOptions, OrderItem } from 'sequelize';
import { CompanyPriceCloseLatest } from '../models/companyPriceCloseLatest.entity';

@Injectable()
export default class CompanyRepository {
  constructor(
    @InjectModel(CompanyPriceClose)
    private companyPriceCloseModel: typeof CompanyPriceClose,
    @InjectModel(Company)
    private companyModel: typeof Company,
    @InjectModel(CompanyVolatilityScore)
    private companyVolatilityScoreModel: typeof CompanyVolatilityScore,
    @InjectModel(CompanyPriceCloseLatest)
    private companyPriceCloseLatestModel: typeof CompanyPriceCloseLatest
  ) { }

  async findPricesByCompanyId(companyId: string, days: number): Promise<CompanyPriceClose[]> {
    const latestPrices = await this.companyPriceCloseModel.findAll({
      where: {
        company_id: companyId,
      },
      order: [['date', 'DESC']],
      limit: days,
    });

    return latestPrices.reverse();
  }

  async getAllCompanyIds(): Promise<string[]> {
    const companies = await this.companyModel.findAll({
      attributes: ['id']
    });
    return companies.map(company => company.id);
  }

  async upsertVolatilityScore(companyId: string, score: number): Promise<void> {
    await this.companyVolatilityScoreModel.upsert({
      company_id: companyId,
      score
    });
  }

  async upsertLatestPrice(companyId: string, price: number, date: Date): Promise<void> {
    await this.companyPriceCloseLatestModel.upsert({
      company_id: companyId,
      price,
      date
    });
  }

  async getLatestPrice(companyId: string): Promise<CompanyPriceClose> {
    return this.companyPriceCloseModel.findOne({
      where: { company_id: companyId },
      order: [['date', 'DESC']],
    });
  }

  async findCompaniesWithDetails(): Promise<Company[]> {
    const options: FindOptions<Company> = {
      include: [
        {
          model: CompanyPriceCloseLatest,
          as: 'latestPriceCloses',
          attributes: ['price', 'date'],
          separate: true,
          order: [['date', 'DESC']],
          limit: 1
        },
        {
          model: CompanyVolatilityScore,
          as: 'volatilityScores',
          attributes: ['score'],
          separate: true,
          order: [['createdAt', 'DESC']],
          limit: 1
        },
        {
          model: CompanyScore,
          as: 'scores',
          attributes: ['total'],
        }
      ],
      where: {}
    };

    return this.companyModel.findAll(options);
  }
}

