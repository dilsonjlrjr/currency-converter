import { HttpService, Injectable } from '@nestjs/common';
import { ExchangeModel } from '../entity/model/exchange.model';
import { AxiosResponse } from 'axios'
import { RateModel } from '../entity/model/rate.model';
import any = jasmine.any;

@Injectable()
export class ExchangeRateService {
  urlBase = "https://api.exchangeratesapi.io/latest?base=";

  constructor(private httpService: HttpService) {}

  async getExchangeRate(coinType: string): Promise<ExchangeModel> {
    try {
      let apiService: AxiosResponse<any> = await this.httpService.get(this.mountUrl(coinType)).toPromise();

      let exchange: ExchangeModel = new ExchangeModel();

      exchange = this.buildExchangeModel(apiService);

      return new Promise((resolve, reject) => {
        resolve(exchange);
      })
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      })
    }
  }

  private mountUrl(coinType: string) {
    return this.urlBase + coinType;
  }

  private buildExchangeModel(apiData: any): ExchangeModel {
    let exchange: ExchangeModel = new ExchangeModel();

    exchange.base = apiData.data.base;
    exchange.date = apiData.data.date;
    exchange.rates = new Array<RateModel>();

    let objectArrayCurrency: any;
    objectArrayCurrency = Object.entries(apiData.data.rates);

    objectArrayCurrency.map((value) => {
      let rate = new RateModel()
      rate.name = value[0]
      rate.value = value[1]
      exchange.rates.push(rate)
    })

    return exchange;
  }
}