import { BeforeInsert, OneToMany, OneToOne, Unique, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { Player } from './player.entity';

//@Unique(['username'])
@Entity({ name: "monster" })
export class Armor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    levelpower: number;

    @Column()
    strength: number;

    @Column()
    dexterity: number;

    @Column()
    knack: number;

    @Column()
    constitution: number;

    @Column()
    intelligence: number;

    @Column()
    perception: number;

    @Column()
    will: number;

    @Column()
    charisma: number;

    @Column()
    bodySize: string;

    @Column()
    hit: number;

    @Column()
    damage: number;

    @Column()
    destruction: number;

    @Column()
    defense: number;

    @Column()
    speed: number;

    @Column()
    movement: number;

}