
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name: "CURRENCY_01_TYPES"})
export class Currency {
  constructor(name?: string) {
    this.name = name;
  }


  @PrimaryGeneratedColumn({name: "CURRENCY_01_PK_INT_ID"})
    id: number

    @Column({name: "CURRENCY_01_STR_NAME", type: "varchar", length:3})
    name: string
}