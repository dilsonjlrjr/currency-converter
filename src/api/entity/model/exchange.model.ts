import { RateModel } from './rate.model';

export class ExchangeModel {
  base: string
  date: string
  rates: Array<RateModel>
}