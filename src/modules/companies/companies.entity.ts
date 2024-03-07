import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Departments } from '../departments/departments.entity';
import { Users } from '../users/users.entity';

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
}
