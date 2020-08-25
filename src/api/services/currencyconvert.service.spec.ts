import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyconvertService } from './currencyconvert.service';

describe('CurrencyconvertService', () => {
  let service: CurrencyconvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyconvertService],
    }).compile();

    service = module.get<CurrencyconvertService>(CurrencyconvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
