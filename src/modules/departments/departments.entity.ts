import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Companies } from '../companies/companies.entity';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Departments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  department_name: string;

  @ManyToOne(() => Companies, (company) => company.departments)
  company: Companies;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Employees, (employee) => employee.department)
  employees: Employees[];
}
