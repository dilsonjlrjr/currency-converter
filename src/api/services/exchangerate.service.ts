import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExchangeInterface } from '../entity/interface/exchange.interface';
import { AxiosResponse } from 'axios'

@Injectable()
export class ExchangeRateService {
  urlBase = "https://api.exchangeratesapi.io/latest?base=";

  constructor(private httpService: HttpService) {}

  async getExchangeRate(coinType: string): Promise<AxiosResponse<ExchangeInterface>> {
    return await this.httpService.get(this.mountUrl(coinType)).toPromise();
  }

  private mountUrl(coinType: string) {
    return this.urlBase + coinType;
  }
}