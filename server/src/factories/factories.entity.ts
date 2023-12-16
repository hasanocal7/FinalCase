import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

/**
 * Factory Table
 * company name: text
 * membership date: date
 * membership end date: date
 * number of employees: number
 * free member: boolean
 *
 * Factory Detail Table
 * Unit using: text
 * date range: date range
 * usage(kw): number
 * usage fee: number
 * discounted price: boolean
 */

@Entity()
export class Factory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firmName: string;

  @Column('date', {
    nullable: true,
  })
  memberDate: string;

  @Column('date', {
    nullable: true,
  })
  memberEndDate: string;

  @Column()
  employeeCount: number;

  @Column()
  isFreeMember: boolean;

  @Column()
  unitUsing: string;

  @Column({
    type: 'daterange',
    nullable: true,
  })
  dateRange: string;

  @BeforeInsert()
  setdateRange() {
    console.log(this.memberDate);
    console.log(this.memberEndDate);
    if (this.memberDate && this.memberEndDate) {
      this.dateRange = `[${this.memberDate}, ${this.memberEndDate}]`;
    }
  }

  @Column()
  usage: number;

  @Column()
  usageFee: number;

  @Column()
  discountPrice: boolean;
}
