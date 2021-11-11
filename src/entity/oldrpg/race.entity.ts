import { BeforeInsert, JoinColumn, OneToMany, OneToOne, Unique, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//import { Player } from './player.entity';

@Entity({ name: "race" })
export class Race extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

}