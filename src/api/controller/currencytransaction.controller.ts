import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CurrencyConvertService } from '../services/currencyconvert.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('/api/currency/transaction')
export class CurrencyTransactionController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async findAll() {
    return this.service.getAll();
  }
}
