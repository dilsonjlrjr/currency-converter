import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConvertService } from './currencyconvert.service';
import { ExchangeRateService } from './exchangerate.service';
import { ExchangeModel } from '../entity/model/exchange.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OperationTransaction } from '../entity/operationtransaction.entity';
import { Repository } from 'typeorm/index';
import { RateModel } from '../entity/model/rate.model';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { HttpService } from '@nestjs/common';

describe('CurrencyConvertService', () => {
  let service: CurrencyConvertService;
  let apiExchangeRate: ExchangeRateService = new ExchangeRateService(new HttpService());
  let repositoryOperationTransaction: Repository<OperationTransaction>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(OperationTransaction),
          useValue: {
            save: jest.fn().mockResolvedValue(new OperationTransaction())
          }
        }
      ]
    }).compile();

    repositoryOperationTransaction = module.get<Repository<OperationTransaction>>(getRepositoryToken(OperationTransaction));
  });

  it('should be test currency convert', async() => {
    const exchangeModel: ExchangeModel = new ExchangeModel();
    exchangeModel.base = "USD";
    exchangeModel.date = "2020-08-01";

    const rate: RateModel = new RateModel();
    rate.value = 10;

    jest.spyOn(apiExchangeRate.getExchangeRate().then(), 'then').mockImplementation(async () => exchangeModel);
    jest.spyOn(apiExchangeRate, 'getRate').mockImplementation(() => rate);
    const service: CurrencyConvertService = new CurrencyConvertService(apiExchangeRate,repositoryOperationTransaction);

    expect(service.convertCurrency(new TransactionDTO())).toBeInstanceOf(Promise);
  });
});
