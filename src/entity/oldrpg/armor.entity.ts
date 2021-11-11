import { BeforeInsert, OneToMany, OneToOne, Unique, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { Player } from './player.entity';

//@Unique(['username'])
@Entity({ name: "armor" })
export class Armor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headName: string;

    @Column()
    headValue: number;

    @Column()
    torsoName: string;

    @Column()
    torsoValue: number;

    @Column()
    leftHandName: string;

    @Column()
    leftHandValue: number;

    @Column()
    rightHandName: string;

    @Column()
    rightHandValue: number;

    @Column()
    leftPalmName: string;

    @Column()
    leftLoofName: string;

    @Column()
    leftLoofValue: number;

    @Column()
    righLoofName: string;

    @Column()
    rightLoofValue: number;

    @Column()
    rightPalmName: string;

    @Column()
    rightPalmValue: number;

    @Column()
    leftLegName: string;

    @Column()
    leftLegValue: number;

    @Column()
    rightLegName: string;

    @Column()
    rightLegValue: number;

    @Column()
    leftFootName: string;

    @Column()
    leftFootValue: number;

    @Column()
    rightFootName: string;

    @Column()
    rightFootValue: number;

    //@OneToOne(() => Player, player => player.armor) // specify inverse side as a second parameter
    //player: Player;
}