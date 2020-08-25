import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';

@Controller('/api/currency')
export class CurrencyController {

  constructor(private serviceCurrency: CurrencyService) {}

  @Get()
  async findAll(): Promise<string[]> {
    return await this.serviceCurrency.findAll();
  }
}
