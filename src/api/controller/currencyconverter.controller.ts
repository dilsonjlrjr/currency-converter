import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { CurrencyConvertService } from '../services/currencyconvert.service';

@Controller('/api/currency/converter')
export class CurrencyConverterController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async created(@Body() transacation: TransactionDTO): Promise<any> {
    return this.service.convertCurrency(transacation)
  }
}
