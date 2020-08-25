import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
    async findAll(): Promise<any> {
        try {

        } catch (err) {
            return Promise.reject(err.message).catch(err => {
                throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Error get all type currency!" }, HttpStatus.BAD_REQUEST);
            });
        }        
    }
}
