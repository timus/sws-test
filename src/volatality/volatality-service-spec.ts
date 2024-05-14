import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from 'src/company/company.service';
import { CompanyPriceClose } from 'src/db/models/companyPriceClose.entity';
import { VolatilityService } from './volatality-service';

const mockCompanyService = {
  findPricesByCompanyId: jest.fn(),
  upsertVolatilityScore: jest.fn(),
};

describe('VolatilityService', () => {
  let service: VolatilityService;
  let companyService: jest.Mocked<CompanyService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolatilityService,
        { provide: CompanyService, useValue: mockCompanyService },
      ],
    }).compile();

    service = module.get<VolatilityService>(VolatilityService);
    companyService = module.get(CompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateVolatility', () => {
    it('should calculate and return volatility when there is enough data', async () => {
      const mockPrices: Partial<CompanyPriceClose>[] = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(),
        company_id: 'test-company',
        price: 100 + i,
      }));

      companyService.findPricesByCompanyId.mockResolvedValue(mockPrices as CompanyPriceClose[]);

      const result = await service.calculateVolatility('test-company');

      expect(result).toBeDefined();
      expect(companyService.findPricesByCompanyId).toHaveBeenCalledWith('test-company', 30);
      expect(companyService.upsertVolatilityScore).toHaveBeenCalledWith('test-company', result);
    });

    it('should throw an error when there is not enough data', async () => {
      const mockPrices: Partial<CompanyPriceClose>[] = Array.from({ length: 20 }, (_, i) => ({
        date: new Date(),
        company_id: 'test-company',
        price: 100 + i,
      }));

      companyService.findPricesByCompanyId.mockResolvedValue(mockPrices as CompanyPriceClose[]);

      await expect(service.calculateVolatility('test-company')).rejects.toThrow('Not enough data to calculate volatility.');
      expect(companyService.findPricesByCompanyId).toHaveBeenCalledWith('test-company', 30);
      expect(companyService.upsertVolatilityScore).not.toHaveBeenCalled();
    });
  });
});
