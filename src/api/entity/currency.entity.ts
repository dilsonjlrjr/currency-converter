
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name: "CURRENCY_01_TYPES"})
export class Currency {

    @PrimaryGeneratedColumn({ name: "CURRENCY_01_PK_INT_ID" })
    id: number

    @Column({ name: "CURRENCY_01_STR_NAME" })
    name: string

    constructor(name?: string){
        this.name = name || '';
    }
}