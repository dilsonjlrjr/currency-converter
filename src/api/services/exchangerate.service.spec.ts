import { HttpModule, HttpService, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ExchangeRateService } from './exchangerate.service';


describe("external consume service", () => {
  let apiHttp: ExchangeRateService;
  let httpService: HttpService;
  let app: INestApplication;

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
  })

  it("should get result api",async() => {
    const base = "USD";
    await apiHttp.getExchangeRate(base).then((result) => {
      expect(result.base).toBe(base)
    })
  });

  it("should capture exception api", async () => {
    const base = "aaa";
    await apiHttp.getExchangeRate(base).catch((reason => {
      expect(reason.status).toEqual(400);
      expect(reason.message).toEqual(`The selected currency type is not found!`)
    }))
  });

  afterAll(async () => {
    await app.close();
  });
})