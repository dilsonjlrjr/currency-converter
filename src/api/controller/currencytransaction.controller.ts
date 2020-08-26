import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CurrencyConvertService } from '../services/currencyconvert.service';

@Controller('/api/currency/transaction')
export class CurrencyTransactionController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.service.getAll();
  }
}
