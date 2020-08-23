import { Module } from '@nestjs/common';
import { CurrencyService } from './services/currency.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Currency } from './entity/currency.entity';
import { CurrencyController } from './controller/currency/currency.controller';

@Module({
    imports: [],
    controllers: [CurrencyController],
    providers: [CurrencyService],
})
export class ApiModule {}
