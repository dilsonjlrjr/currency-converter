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

  it("should get result api",async() => {
    const base: string = "USD";
    await apiHttp.getExchangeRate(base).then((result) => {
      expect(result.base).toBe(base)
    })
  });

  it("should capture exception api", async () => {
    const base: string = "aaa";
    await apiHttp.getExchangeRate(base).catch((reason => {
      expect(Object.keys(reason.response.data)[0]).toEqual("error")
      expect(reason.response.data.error).toEqual(`Base '${base}' is not supported.`)
    }))
  });

  afterAll(async () => {
    await app.close();
  });
})