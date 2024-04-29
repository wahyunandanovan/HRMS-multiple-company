import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
