import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entity/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
    constructor(private currencyRepository: Repository<Currency>) {}

    async findAll(): Promise<Currency[]> {
        try {
            return this.currencyRepository.find();
        } catch (err) {
            return Promise.reject(err.message).catch(err => {
                throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Error get all type currency!" }, HttpStatus.BAD_REQUEST);
            });
        }        
    }
}
