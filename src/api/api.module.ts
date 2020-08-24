import { HttpModule, Module } from '@nestjs/common';
import { CurrencyService } from './services/currency.service';
import { Currency } from './entity/currency.entity';
import { CurrencyController } from './controller/currency/currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      TypeOrmModule.forFeature([Currency]),
      HttpModule.register({
        timeout: 5000
      })
    ],
    providers: [CurrencyService],
    controllers: [CurrencyController],
})
export class ApiModule {}
