import { CurrencyService } from "./currency.service"
import { Test } from "@nestjs/testing";
import { HttpModule, HttpService } from '@nestjs/common';
import { ExchangeRateService } from './exchangerate.service';

describe('CoinsService', () => {
    let currencyService: CurrencyService;
    let apiHttp: ExchangeRateService;
    let httpService: HttpService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            imports: [
                HttpModule.register({
                    timeout: 10000
                })
            ]
        }).compile();

        app.createNestApplication();
        await app.init();

        httpService = app.get<HttpService>(HttpService);
        apiHttp = new ExchangeRateService(httpService);

        currencyService = new CurrencyService(apiHttp);
    });

    it('should be defined', () => {
        expect(currencyService).toBeDefined();
    });

    describe("getAll", () => {

        it("should get all type coins", async () => {
            await currencyService.findAll().then((value) => {
                expect(value).toBeInstanceOf(Array)
            });
        });
    });
})