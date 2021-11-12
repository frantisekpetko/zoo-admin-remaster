import {
  BeforeInsert,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Animal } from './animal.entity';

@Entity({ name: 'user' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  /*
    @OneToMany(type => Animal, animal => animal.user, {eager: true})
    animals: Animal[];
    */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
