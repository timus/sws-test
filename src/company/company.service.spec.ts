import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { CacheService } from '../cache/cache.service';
import CompanyRepository from '../db/repositories/company.repository';

const mockCompanyRepository = {
    findCompaniesWithDetails: jest.fn(),
    upsertLatestPrice: jest.fn(),
    getLatestPrice: jest.fn(),
    getAllCompanyIds: jest.fn(),
    upsertVolatilityScore: jest.fn(),
    findPricesByCompanyId: jest.fn(),
};

const mockCacheService = {  
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
};

const companies =
                [
                    {
                        "id": "3B07801A-1C3A-46E6-A7FF-E1F59F31C466",
                        "name": "Pfizer",
                        "ticker_symbol": "PFE",
                        "exchange_symbol": "NYSE",
                        "unique_symbol": "NYSE:PFE",
                        "date_generated": "2020-05-24T02:48:09.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/pharmaceuticals-biotech/nyse-pfe/pfizer",
                        "unique_symbol_slug": "nyse-pfe",
                        "scores": [
                            {
                                "total": 20
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 37.5,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 0.890298
                            }
                        ]
                    },
                    {
                        "id": "424EB65E-8C34-42BF-A107-61F93D4E9E6D",
                        "name": "Microsoft",
                        "ticker_symbol": "MSFT",
                        "exchange_symbol": "NasdaqGS",
                        "unique_symbol": "NasdaqGS:MSFT",
                        "date_generated": "2020-05-24T03:39:14.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/software/nasdaq-msft/microsoft",
                        "unique_symbol_slug": "nasdaq-msft",
                        "scores": [
                            {
                                "total": 18
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 183.51,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 5.56835
                            }
                        ]
                    },
                    {
                        "id": "46B285BC-B25F-4814-985C-390A4BFA2023",
                        "name": "Afterpay",
                        "ticker_symbol": "APT",
                        "exchange_symbol": "ASX",
                        "unique_symbol": "ASX:APT",
                        "date_generated": "2020-05-24T11:01:59.000Z",
                        "security_name": "Ordinary Shares",
                        "exchange_country_iso": "AU",
                        "listing_currency_iso": "AUD",
                        "canonical_url": "/stocks/au/software/asx-apt/afterpay-shares",
                        "unique_symbol_slug": "asx-apt",
                        "scores": [
                            {
                                "total": 9
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 44.51,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 7.07336
                            }
                        ]
                    },
                    {
                        "id": "49A0E7C9-F918-4E97-AECA-D8D37F9A3F4F",
                        "name": "Delta Air Lines",
                        "ticker_symbol": "DAL",
                        "exchange_symbol": "NYSE",
                        "unique_symbol": "NYSE:DAL",
                        "date_generated": "2020-05-23T03:14:10.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/transportation/nyse-dal/delta-air-lines",
                        "unique_symbol_slug": "nyse-dal",
                        "scores": [
                            {
                                "total": 15
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 22.69,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 1.74056
                            }
                        ]
                    },
                    {
                        "id": "4BE2C01F-F390-479C-A166-8E0DD73CF7B9",
                        "name": "BHP Group",
                        "ticker_symbol": "BHP",
                        "exchange_symbol": "ASX",
                        "unique_symbol": "ASX:BHP",
                        "date_generated": "2020-05-24T10:36:54.000Z",
                        "security_name": "LTD Ordinary Shares",
                        "exchange_country_iso": "AU",
                        "listing_currency_iso": "AUD",
                        "canonical_url": "/stocks/au/materials/asx-bhp/bhp-group-shares",
                        "unique_symbol_slug": "asx-bhp",
                        "scores": [
                            {
                                "total": 12
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 34.32,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 1.50292
                            }
                        ]
                    },
                    {
                        "id": "65DCE5EA-70D6-417F-9CAC-1EAA92FB7F1C",
                        "name": "Tesla",
                        "ticker_symbol": "TSLA",
                        "exchange_symbol": "NasdaqGS",
                        "unique_symbol": "NasdaqGS:TSLA",
                        "date_generated": "2020-05-23T08:32:49.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/automobiles/nasdaq-tsla/tesla",
                        "unique_symbol_slug": "nasdaq-tsla",
                        "scores": [
                            {
                                "total": 11
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 816.88,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 45.1859
                            }
                        ]
                    },
                    {
                        "id": "743F0744-8987-4339-B565-DEE3A93E9934",
                        "name": "Apple",
                        "ticker_symbol": "AAPL",
                        "exchange_symbol": "NasdaqGS",
                        "unique_symbol": "NasdaqGS:AAPL",
                        "date_generated": "2020-05-24T02:20:41.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/tech/nasdaq-aapl/apple",
                        "unique_symbol_slug": "nasdaq-aapl",
                        "scores": [
                            {
                                "total": 9
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 318.89,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 15.5112
                            }
                        ]
                    },
                    {
                        "id": "8ACBC59A-0EC5-42D1-9F7B-6D31ABD4421E",
                        "name": "Facebook",
                        "ticker_symbol": "FB",
                        "exchange_symbol": "NasdaqGS",
                        "unique_symbol": "NasdaqGS:FB",
                        "date_generated": "2020-05-24T04:51:37.000Z",
                        "security_name": "Class A Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/media/nasdaq-fb/facebook",
                        "unique_symbol_slug": "nasdaq-fb",
                        "scores": [
                            {
                                "total": 11
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 234.91,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 17.8386
                            }
                        ]
                    },
                    {
                        "id": "A0A1A293-FDA8-48DF-9EBF-35556CDE3235",
                        "name": "Walt Disney",
                        "ticker_symbol": "DIS",
                        "exchange_symbol": "NYSE",
                        "unique_symbol": "NYSE:DIS",
                        "date_generated": "2020-05-24T02:40:27.000Z",
                        "security_name": "Common Shares",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/media/nyse-dis/walt-disney",
                        "unique_symbol_slug": "nyse-dis",
                        "scores": [
                            {
                                "total": 8
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 118.02,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 5.57342
                            }
                        ]
                    },
                    {
                        "id": "C8250615-877A-4AE1-BEF3-636B69CD83E8",
                        "name": "Alibaba Group Holding",
                        "ticker_symbol": "BABA",
                        "exchange_symbol": "NYSE",
                        "unique_symbol": "NYSE:BABA",
                        "date_generated": "2020-05-24T06:23:25.000Z",
                        "security_name": "ADS EACH REPR 1 ORD SHS (SPON) (CDI)",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/retail/nyse-baba/alibaba-group-holding",
                        "unique_symbol_slug": "nyse-baba",
                        "scores": [
                            {
                                "total": 13
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 199.7,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 6.69045
                            }
                        ]
                    },
                    {
                        "id": "D0665877-9EC5-4568-8A29-E8FFF77DF072",
                        "name": "Amazon.com",
                        "ticker_symbol": "AMZ",
                        "exchange_symbol": "NasdaqGS",
                        "unique_symbol": "NasdaqGS:AMZ",
                        "date_generated": "2020-05-24T02:31:18.000Z",
                        "security_name": "Common Stock",
                        "exchange_country_iso": "US",
                        "listing_currency_iso": "USD",
                        "canonical_url": "/stocks/us/retail/nasdaq-amzn/amazoncom",
                        "unique_symbol_slug": "nasdaq-amz",
                        "scores": [
                            {
                                "total": 13
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 2436.88,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 64.5223
                            }
                        ]
                    },
                    {
                        "id": "FC7B296B-300B-4710-8F84-D68A5BFBC75B",
                        "name": "Telstra",
                        "ticker_symbol": "TLS",
                        "exchange_symbol": "ASX",
                        "unique_symbol": "ASX:TLS",
                        "date_generated": "2020-05-23T14:07:15.000Z",
                        "security_name": "Ordinary Shares",
                        "exchange_country_iso": "AU",
                        "listing_currency_iso": "AUD",
                        "canonical_url": "/stocks/au/telecom/asx-tls/telstra-shares",
                        "unique_symbol_slug": "asx-tls",
                        "scores": [
                            {
                                "total": 10
                            }
                        ],
                        "latestPriceCloses": [
                            {
                                "price": 3.06,
                                "date": "2020-05-22T00:00:00.000Z"
                            }
                        ],
                        "volatilityScores": [
                            {
                                "score": 0.0446169
                            }
                        ]
                    }
                ]


describe('CompanyService', () => {
    let service: CompanyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                { provide: CompanyRepository, useValue: mockCompanyRepository },
                { provide: CacheService, useValue: mockCacheService },
            ],
        }).compile();

        service = module.get<CompanyService>(CompanyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('databasevscache tests', () => {
        it('should fetch companies from cache if its not expired', async () => {
            
            mockCacheService.get.mockResolvedValue(JSON.stringify(companies));
            const result = await service.getCompaniesWithDetails('score', 'DESC', 'NYSE', 10);

            expect(result).toBeInstanceOf(Array);
            expect(mockCacheService.get).toHaveBeenCalled();
            expect(mockCompanyRepository.findCompaniesWithDetails).not.toHaveBeenCalled(); 
        });

        it('should fetch companies from the database if cache is empty', async () => {
            mockCacheService.get.mockResolvedValue(null); 
            mockCompanyRepository.findCompaniesWithDetails.mockResolvedValue(companies);
          
            const result = await service.getCompaniesWithDetails('volatility', 'ASC', undefined, undefined);
            expect(mockCacheService.get).toHaveBeenCalled();
            expect(mockCompanyRepository.findCompaniesWithDetails).toHaveBeenCalled(); 
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0); 
          });
          
    });

    describe('Sorting and Filtering', () => {
    
        it('should sort companies by volatility in ASC order when cache is hit', async () => {
          mockCacheService.get.mockResolvedValue(JSON.stringify(companies));  
      
          const result = await service.getCompaniesWithDetails('volatility', 'ASC', undefined, undefined);
      
          expect(result[0].id).toEqual('FC7B296B-300B-4710-8F84-D68A5BFBC75B'); 
          expect(result[result.length - 1].id).toEqual('D0665877-9EC5-4568-8A29-E8FFF77DF072'); 
        });
      
       
        it('should filter companies by exchange symbol', async () => {
          mockCacheService.get.mockResolvedValue(null);  
          mockCompanyRepository.findCompaniesWithDetails.mockResolvedValue(companies);
      
          const result = await service.getCompaniesWithDetails('score', 'DESC', 'ASX', undefined);
      
          result.forEach(company => {
            expect(company.exchange_symbol).toEqual('ASX');
          });
          expect(result.length).toBeGreaterThan(0);
        });
      
        
        it('should filter companies by minimum score', async () => {
          mockCacheService.get.mockResolvedValue(null);  
          mockCompanyRepository.findCompaniesWithDetails.mockResolvedValue(companies);
      
          const result = await service.getCompaniesWithDetails('score', 'DESC', undefined, 15);
      
          result.forEach(company => {
            expect(company.scores[0].total).toBeGreaterThanOrEqual(15);
          });
          expect(result.length).toBeGreaterThan(0);
        });
      });
      

});
