import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Companies } from '../companies/companies.entity';
import { Plans } from '../plans/plan.entity';

@Entity()
export class CompanyPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @ManyToOne(() => Companies)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @Column()
  reference_plan_id: string;

  @ManyToOne(() => Plans)
  @JoinColumn({ name: 'reference_plan_id' })
  plan: Plans;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column()
  price: number;

  @Column()
  max_employee: number;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
