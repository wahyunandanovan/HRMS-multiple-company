import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Companies } from '../companies/companies.entity';

@Entity()
export class Plans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  max_employee: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Companies, (company) => company.plan, { nullable: true })
  companies: Companies[];
}
