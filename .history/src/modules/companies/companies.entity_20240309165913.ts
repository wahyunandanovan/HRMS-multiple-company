import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
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

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true })
  code: string;

  @Column()
  address: string;

  @Column()
  contact_number: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Departments, (department) => department.company)
  departments: Departments[];

  @ManyToOne(() => Users, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_id: string;

  @OneToMany(() => Plans, (plan) => plan.companies)
  @JoinColumn({ name: 'plan_id' })
  plan: Plans;

  @Column({ nullable: true })
  plan_id: string;

  @Column({
    type: 'enum',
    enum: CompanyPlanStatus,
    default: CompanyPlanStatus.ONGOING,
  })
  plan_status: CompanyPlanStatus;

  @Column({ nullable: true })
  plan_end_date: Date;

  @BeforeInsert()
  generateCode() {
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      return 'PWI-' + result;
    };

    this.code = generateRandomCode();
  }
}
