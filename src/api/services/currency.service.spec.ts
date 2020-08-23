import { CurrencyService } from "./currency.service"
import { Repository } from "typeorm";
import { Currency } from "../entity/currency.entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CoinsService', () => {
    let currencyService: CurrencyService;
    let currencyRepository: Repository<Currency>;

    const listCurrency: Array<Currency> = [
        new Currency('CAD'),
        new Currency('USD'),
        new Currency('BRL')
    ]

    beforeEach(async () => {
        const modRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Currency),
                    useValue: {
                        find: jest.fn().mockResolvedValue(listCurrency)
                    }
                }
            ]
        }).compile();

        currencyRepository = modRef.get<Repository<Currency>>(getRepositoryToken(Currency));
        currencyService = new CurrencyService(currencyRepository)
    });

    it('should be defined', () => {
        expect(currencyService).toBeDefined();
    });

    describe("getAll", () => {
        it("shouldGetAllCoinsType", async () => {
            const spyRepositoryCurrency = jest.spyOn(currencyRepository, 'find');

            await currencyService.findAll().then((value) => {
                expect(value).toBe(listCurrency);
            });
            expect(spyRepositoryCurrency).toBeCalledTimes(1);
        });

        it("shouldGenerateExceptionPersistDatabase", async () => {
            const modRefThrow = await Test.createTestingModule({
                providers: [
                    {
                        provide: getRepositoryToken(Currency),
                        useValue: {
                            find: jest.fn().mockImplementation(() => new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Error get all type currency!" }, HttpStatus.BAD_REQUEST))
                        }
                    }
                ]
            }).compile();

            currencyRepository = modRefThrow.get<Repository<Currency>>(getRepositoryToken(Currency));
            currencyService = new CurrencyService(currencyRepository)

            currencyService.findAll().catch( e => expect(e.message.error).toEqual("Error insert value in database!"))
        })
    });
})