import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyConvertService } from './services/currencyconvert.service';
import { CurrencyService } from './services/currency.service';
import { ExchangeRateService } from './services/exchangerate.service';
import { OperationTransaction } from './entity/operationtransaction.entity';
import { CurrencyController } from './controller/currency.controller';
import { CurrencyConverterController } from './controller/currencyconverter.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([ OperationTransaction ]),
      HttpModule.register({
        timeout: 5000
      })
    ],
    providers: [CurrencyService, CurrencyConvertService, ExchangeRateService],
    controllers: [CurrencyController, CurrencyConverterController],
})
export class ApiModule {}
