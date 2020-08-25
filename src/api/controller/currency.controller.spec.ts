import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from '../services/currency.service';

describe('CurrencyController Test', () => {
  let controller: CurrencyController;

  const listTypeCurrency: string[] = [
    'CAD', 'USD', 'BRL'
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listTypeCurrency)
          }
        }
      ]
    }).compile();

    controller = await module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('route findall', () => {
    it('should return all type currency', async () => {
      await expect(controller.findAll()).resolves.toEqual(listTypeCurrency);
    })
  });
});
