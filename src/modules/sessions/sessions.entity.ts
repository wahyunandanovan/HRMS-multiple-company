import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.sessions)
  user: Users;

  @Column({ unique: true })
  token: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
