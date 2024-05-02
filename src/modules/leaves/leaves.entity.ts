import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LeaveType } from './leaves.enum';

@Entity()
export class Leaves {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @Column({
    type: 'enum',
    enum: LeaveType,
    default: 'sakit',
  })
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
