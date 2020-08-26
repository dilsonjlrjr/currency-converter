import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionDTO } from '../entity/dto/transaction.dto';
import { CurrencyConvertService } from '../services/currencyconvert.service';
import { OperationTransaction } from '../entity/operationtransaction.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/currency/converter')
export class CurrencyConverterController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  async created(@Body() transacation: TransactionDTO): Promise<OperationTransaction> {
    return this.service.convertCurrency(transacation)
  }
}
