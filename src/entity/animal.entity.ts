import {
  BeforeInsert,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';
import { Extlink } from './extlink.entity';

//@Unique(['username'])
@Entity({ name: 'animal' })
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latinname: string;

  @Column()
  description: string;

  @OneToMany((type) => Image, (image) => image.animal)
  images: Image[];

  @OneToMany((type) => Extlink, (extlink) => extlink.animal)
  extlinks: Extlink[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /*
  @Column('simple-json')
  description: {
    title: string;
    content: string;
    items?: [
      {
        title: string;
        content: string;
      },
    ][];
  }[];
  */
  /*
    @ManyToOne(type => User, user => user.animals, { eager: false })
    user: User;
  */
}
