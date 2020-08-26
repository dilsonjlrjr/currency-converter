import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyTransactionController } from './currencytransaction.controller';

describe('CurrencyTransactionController', () => {
  let controller: CurrencyTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyTransactionController],
    }).compile();

    controller = module.get<CurrencyTransactionController>(CurrencyTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
