import { HttpModule, HttpService, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ExchangeRateService } from './exchangerate.service';


describe("ExchangeRate cosume service", () => {
  let apiHttp: ExchangeRateService;
  let httpService: HttpService;
  let app: INestApplication;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000
        })
      ]
    }).compile();

    app.createNestApplication();
    await app.init();

    httpService = app.get<HttpService>(HttpService);
    apiHttp = new ExchangeRateService(httpService);
  })

  it("Should get result api", () => {
    apiHttp.getExchangeRate("USD").then((result) => {
      console.log("teste")
      console.log(result.data)
    }).catch((rejects) => {
      console.log(rejects)
    })
  });

  afterAll(async () => {
    await app.close();
  });
})