import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LeaveStatus, LeaveType } from './leaves.enum';
import { Employees } from '../employees/employees.entity';
import { Companies } from '../companies/companies.entity';

@Entity()
export class Leaves {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.WAITING,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: LeaveType,
    default: LeaveType.SICK,
  })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
