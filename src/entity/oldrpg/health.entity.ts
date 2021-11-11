import { BeforeInsert, OneToMany, OneToOne, Unique, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { Player } from './player.entity';

//@Unique(['username'])
@Entity({ name: "health" })
export class Health extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @BeforeInsert()
    computeTotalValue() {
        //this.levelpower = 5;
        this.totalValue = 0;
        this.totalValue =+ this.head;
        this.totalValue =+ this.torso;
        this.totalValue =+ this.leftHand;
        this.totalValue =+ this.rightHand;
        this.totalValue =+ this.leftLoof;
        this.totalValue =+ this.rightLoof;
        this.totalValue =+ this.leftLeg;
        this.totalValue =+ this.rightLeg;
        this.totalValue =+ this.leftFoot;
        this.totalValue =+ this.rightFoot;
    }

    @Column()
    totalValue: number;

    @Column()
    head: number;

    @Column()
    torso: number;

    @Column()
    leftHand: number;

    @Column()
    rightHand: number;

    @Column()
    leftLoof: number;

    @Column()
    rightLoof: number;

    @Column()
    leftLeg: number;

    @Column()
    rightLeg: number;

    @Column()
    leftFoot: number;

    @Column()
    rightFoot: number;

    //@OneToOne(() => Player, player => player.health)
    //player: Player;
}