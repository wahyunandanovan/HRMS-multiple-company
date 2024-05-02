import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Companies } from '../companies/companies.entity';

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

  @Column()
  company_id: string;

  @ManyToOne(() => Companies)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @Column({
    nullable: true,
  })
  department_id: string;

  @ManyToOne(() => Departments)
  @JoinColumn({ name: 'department_id' })
  department: Departments;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
