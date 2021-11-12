import {
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';

@Entity({ name: 'extlink' })
export class Extlink extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @ManyToOne((type) => Animal, (animal) => animal.images, { eager: false })
  animal: Animal;
}
