import { JoinColumn, OneToMany, OneToOne, Unique, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: "weapon" })
export class Weapon extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    attackModifier: number;

    @Column()
    damage: number;

    @Column()
    destruction: number;

    @Column()
    defenseModifier: number;

    @Column()
    speed: number;

    @Column({
        nullable: true,
    })
    smallRange!: number;

    @Column({
        nullable: true,
    })
    mediumRange!: number;

    @Column({
        nullable: true,
    })
    bigRange!: number;

    @Column()
    isFirearm: boolean;

    @Column({
        nullable: true,
    })
    armor!: number;

    @Column({
        nullable: true,
    })
    blocking!: number;

    @Column()
    isShield: boolean;

    @Column()
    equipmentSlots: number;


}