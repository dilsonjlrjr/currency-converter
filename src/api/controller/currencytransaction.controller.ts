import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CurrencyConvertService } from '../services/currencyconvert.service';
import { ApiOkResponse, ApiParam, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { OperationTransaction } from '../entity/operationtransaction.entity';

@Controller('/api/currency/transaction')
export class CurrencyTransactionController {

  constructor(private readonly service: CurrencyConvertService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiResponse({
    description: "Returns all transactions previously made.",
    status: 200,
    type: OperationTransaction
  })
  async findAll() {
    return this.service.getAll();
  }

  @Get('/user/:id')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiResponse({
    description: "Returns all transactions previously made by a user.",
    status: 200,
    type: OperationTransaction
  })
  @ApiParam({
    name: 'id',
    type: Number
  })
  async findOne(@Param() params) {
    return this.service.getOne(params.id);
  }
}
