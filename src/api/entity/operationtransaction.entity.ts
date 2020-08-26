//CREATE TABLE IF NOT EXISTS transaction (id INTEGER PRIMARY KEY AUTOINCREMENT,
// iduser INTEGER NOT NULL,
// currencyorigin varchar(4) NOT NULL,
// valueorigin NUMERIC NOT NULL,
// currencydestiny varchar(4) NOT NULL,
// valuedestiny NUMERIC NOT NULL, tax NUMERIC NOT NULL, dateoperation DATETIME NOT NULL)
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class OperationTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iduser: number;

  @Column()
  currencyorigin: string;

  @Column()
  valueorigin: number;

  @Column()
  currencydestiny: string;

  @Column()
  valuedestiny: number;

  @Column()
  tax: number;

  @Column()
  dateoperation: string;
}