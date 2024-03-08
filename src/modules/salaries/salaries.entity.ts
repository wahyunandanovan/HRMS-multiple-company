import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Salaries {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employees, (employee) => employee.salaries)
  employee: Employees;

  @Column()
  amount: number;

  @Column()
  payment_date: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
