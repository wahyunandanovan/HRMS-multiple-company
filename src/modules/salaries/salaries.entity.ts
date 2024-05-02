import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Companies } from '../companies/companies.entity';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Salaries {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  amount: number;

  @Column()
  image: string;

  @Column()
  employee_id: string;

  @ManyToOne(() => Employees)
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @Column()
  company_id: string;

  @ManyToOne(() => Companies)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @Column('text', { nullable: true })
  calculation_details: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
