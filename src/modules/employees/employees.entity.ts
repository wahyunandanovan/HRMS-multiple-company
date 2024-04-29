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

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Departments, (department) => department.employees, {
    nullable: true,
  })
  department: Departments;

  @OneToMany(() => Leaves, (leave) => leave.employee, { nullable: true })
  leaves: Leaves[];

  @OneToMany(() => Salaries, (salary) => salary.employee, { nullable: true })
  salaries: Salaries[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
