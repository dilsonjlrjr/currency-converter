import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExchangeRateService } from './exchangerate.service';
import { RateModel } from '../entity/model/rate.model';

@Injectable()
export class CurrencyService {
    constructor(private readonly apiExchangeRate: ExchangeRateService) {}

    async findAll(): Promise<string[]> {
        let listRateModel: RateModel[];
        let listTypeCurrency: Array<string> = new Array<string>();

        try {
            listRateModel = await this.apiExchangeRate.getExchangeRate().then((result) => {
                return result.rates;
            });

            listRateModel.map((rateModel) => {
                listTypeCurrency.push(rateModel.name);
            });

            return listTypeCurrency;
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Error get all type currency!" }, HttpStatus.BAD_REQUEST);
        }        
    }
}
