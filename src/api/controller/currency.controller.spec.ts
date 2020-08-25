import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from '../services/currency.service';
import { Currency } from '../entity/currency.entity';

describe('CurrencyController Test', () => {
  let controller: CurrencyController;
  let service: CurrencyService;

  const listCurrency: Array<Currency> = [
    new Currency('CAD'),
    new Currency('USD'),
    new Currency('BRL')
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listCurrency)
          }
        }
      ]
    }).compile();

    service = await module.get<CurrencyService>(CurrencyService);
    controller = await module.get<CurrencyController>(CurrencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('route findall', () => {
    it('should return all type currency', async () => {
      await expect(controller.findAll()).resolves.toEqual(listCurrency);
    })
  });
});
