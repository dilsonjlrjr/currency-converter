import { RateInterface } from './rate.interface';

export class ExchangeInterface {
  base: string
  date: string
  rates: Array<RateInterface>
}