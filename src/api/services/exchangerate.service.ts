import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { ExchangeModel } from '../entity/model/exchange.model';
import { AxiosResponse } from 'axios'
import { RateModel } from '../entity/model/rate.model';
import any = jasmine.any;

@Injectable()
export class ExchangeRateService {
  urlBase = "https://api.exchangeratesapi.io/latest?base=";

  constructor(private httpService: HttpService) {}

  async getExchangeRate(coinType = 'BRL'): Promise<ExchangeModel> {
    try {
      const apiService: AxiosResponse<any> = await this.httpService.get(this.mountUrl(coinType)).toPromise();
      let exchange: ExchangeModel = new ExchangeModel();

      exchange = this.buildExchangeModel(apiService);

      return new Promise((resolve) => {
        resolve(exchange);
      })
    } catch (e) {
      throw new HttpException("The selected currency type is not found!", HttpStatus.BAD_REQUEST)
    }
  }

  private mountUrl(coinType: string) {
    return this.urlBase + coinType;
  }

  private buildExchangeModel(apiData: any): ExchangeModel {
    const exchange: ExchangeModel = new ExchangeModel();

    exchange.base = apiData.data.base;
    exchange.date = apiData.data.date;
    exchange.rates = new Array<RateModel>();

    let objectArrayCurrency = Object.entries(apiData.data.rates);

    objectArrayCurrency.map((value) => {
      const rate = new RateModel()
      rate.name = value[0]
      rate.value = <number> value[1]
      exchange.rates.push(rate)
    })

    return exchange;
  }

  getRate(exchangeModel: ExchangeModel, currencyOrigin: string): RateModel {
    const rateModel: RateModel[] = exchangeModel.rates.filter((value) => value.name === currencyOrigin);

    if (rateModel.length == 0)
      throw new HttpException("The selected currency type is not found", HttpStatus.BAD_REQUEST)

    return rateModel[0];
  }
}