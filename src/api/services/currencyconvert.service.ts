import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { ExchangeRateService } from './exchangerate.service';
import { ExchangeModel } from '../entity/model/exchange.model';
import { RateModel } from '../entity/model/rate.model';

@Injectable()
export class CurrencyConvertService {

  constructor(private readonly apiExchangeRate: ExchangeRateService) {}

  async convertCurrency(transaction: TransactionDTO): Promise<any> {
    let exchange: ExchangeModel = await this.apiExchangeRate.getExchangeRate(transaction.currencyorigin)
    let rate: RateModel
    let valueDestinyCalculated: number

    rate = this.apiExchangeRate.getRate(exchange, transaction.currencydestiny);

    valueDestinyCalculated = (1 / rate.value);

    return {
      'idtransaction': 1,
      'iduser': transaction.iduser,
      'currencyorigin': transaction.currencyorigin,
      'valueorigin': transaction.value,
      'currencydestiny': transaction.currencydestiny,
      'valuedestiny': valueDestinyCalculated
    }
  }
}
