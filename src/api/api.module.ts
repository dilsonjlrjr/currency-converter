import { HttpModule, Module } from '@nestjs/common';
import { CurrencyController } from './controller/currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyConvertService } from './services/currencyconvert.service';
import { CurrencyService } from './services/currency.service';
import { CurrencyConverterController } from './controller/currencyconverter.controller';
import { ExchangeRateService } from './services/exchangerate.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([]),
      HttpModule.register({
        timeout: 5000
      })
    ],
    providers: [CurrencyService, CurrencyConvertService, ExchangeRateService],
    controllers: [CurrencyController, CurrencyConverterController],
})
export class ApiModule {}
