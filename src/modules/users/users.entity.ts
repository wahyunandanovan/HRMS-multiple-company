import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from './role.enum';
import { Companies } from '../companies/companies.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role: UserRole;

  @Column()
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Companies, (company) => company.users, { nullable: true })
  @JoinTable()
  companies: Companies[];
}
