import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { CurrencyConvertService } from '../services/currencyconvert.service';
import { OperationTransaction } from '../entity/operationtransaction.entity';

@Controller('/api/currency/converter')
export class CurrencyConverterController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async created(@Body() transacation: TransactionDTO): Promise<OperationTransaction> {
    return this.service.convertCurrency(transacation)
  }
}
