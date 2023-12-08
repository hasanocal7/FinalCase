import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type Authority = 'editor' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['editor', 'admin'],
    default: 'editor',
  })
  authority: Authority;
}
