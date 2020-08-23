import { Controller, Get, Inject } from '@nestjs/common';
import { Currency } from '../../entity/currency.entity';
import { CurrencyService } from '../../services/currency.service';

@Controller('currency')
export class CurrencyController {

  constructor(private serviceCurrency: CurrencyService) {}

  @Get()
  async findAll(): Promise<Currency[]> {
    return await this.serviceCurrency.findAll();
  }
}
