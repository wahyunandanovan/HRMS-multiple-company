import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Companies } from '../companies/companies.entity';

@Entity()
export class Departments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  department_name: string;

  @Column({ default: 0 })
  salary: number;

  @Column()
  company_id: string;

  @ManyToOne(() => Companies)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
