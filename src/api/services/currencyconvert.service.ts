import { Injectable } from '@nestjs/common';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { ExchangeRateService } from './exchangerate.service';
import { ExchangeModel } from '../entity/model/exchange.model';
import { RateModel } from '../entity/model/rate.model';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationTransaction } from '../entity/operationtransaction.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class CurrencyConvertService {

  constructor(
    private readonly apiExchangeRate: ExchangeRateService,
    @InjectRepository(OperationTransaction)
    private operationTransactionRepository: Repository<OperationTransaction>) {}

  async convertCurrency(transaction: TransactionDTO): Promise<OperationTransaction> {
    let operationTransaction: OperationTransaction;
    let exchange: ExchangeModel = await this.apiExchangeRate.getExchangeRate(transaction.currencyorigin);
    let rate: RateModel;
    let valueCurrency: number;
    let valueDestinyCalculated: number;

    rate = this.apiExchangeRate.getRate(exchange, transaction.currencydestiny);

    valueCurrency = (1 / rate.value);
    valueDestinyCalculated = transaction.value / valueCurrency;

    operationTransaction = new OperationTransaction();
    operationTransaction.iduser = transaction.iduser;
    operationTransaction.currencyorigin = transaction.currencyorigin;
    operationTransaction.currencydestiny = transaction.currencydestiny;
    operationTransaction.valuedestiny = valueDestinyCalculated;
    operationTransaction.valueorigin = transaction.value;
    operationTransaction.tax = rate.value
    operationTransaction.dateoperation = new Date().toISOString();

    await this.operationTransactionRepository.save(operationTransaction);

    return operationTransaction;
  }

  async getAll(): Promise<OperationTransaction[]> {
    return this.operationTransactionRepository.find();
  }
}
