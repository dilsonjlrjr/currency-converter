import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConvertService } from './currencyconvert.service';

describe('CurrencyConvertService', () => {
  let service: CurrencyConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyConvertService],
    }).compile();

    service = module.get<CurrencyConvertService>(CurrencyConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
