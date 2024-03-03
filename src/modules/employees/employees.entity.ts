import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Leaves } from '../leaves/leaves.entity';
import { Salaries } from '../salaries/salaries.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @ManyToOne(() => Departments, (department) => department.employees)
  department: Departments;

  @OneToMany(() => Leaves, (leave) => leave.employee)
  leaves: Leaves[];

  @OneToMany(() => Salaries, (salary) => salary.employee)
  salaries: Salaries[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
