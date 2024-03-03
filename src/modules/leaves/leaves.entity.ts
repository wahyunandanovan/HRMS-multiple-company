import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Leaves {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employees, (employee) => employee.leaves)
  employee: Employees;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
