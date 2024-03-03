import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './role.enum';
import { Companies } from '../companies/companies.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @Column()
  sessions: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Companies, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Companies;
}
