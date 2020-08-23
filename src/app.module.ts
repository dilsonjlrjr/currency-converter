import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
  imports: [ApiModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'currency-convert',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
