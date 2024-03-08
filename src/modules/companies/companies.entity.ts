import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Users } from '../users/users.entity';
import { Plans } from '../plans/plan.entity';
import { CompanyPlanStatus } from './companies.enum';

@Entity()
export class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column({ unique: true })
  registration_number: string;

  @Column()
  address: string;

  @Column()
  contact_number: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Departments, (department) => department.company)
  departments: Departments[];

  @ManyToMany(() => Users, (user) => user.companies)
  users: Users[];

  @ManyToOne(() => Plans, (plan) => plan.companies)
  plan: Plans;

  @Column({
    type: 'enum',
    enum: CompanyPlanStatus,
    default: CompanyPlanStatus.ONGOING,
  })
  plan_status: CompanyPlanStatus;

  @Column({ nullable: true })
  plan_end_date: Date;
}
