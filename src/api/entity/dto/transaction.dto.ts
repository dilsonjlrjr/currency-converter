import { ApiProperty } from '@nestjs/swagger';

export class TransactionDTO {
  @ApiProperty({
    description: "User identification.",
    type: Number
  })
  iduser: number

  @ApiProperty({
    description: "Enter the type currency of origin. More information, cosume endpoint /api/currency;",
    type: String
  })
  currencyorigin: string

  @ApiProperty({
    description: "Enter the type currency of destiny. More information, cosume endpoint /api/currency.",
    type: String
  })
  @ApiProperty()
  currencydestiny: string

  @ApiProperty({
    description: "The amount that will be converted.",
    type: Number
  })
  value: number
}