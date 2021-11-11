import { OneToMany, Unique, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Armor } from './armor.entity';
import { Health } from './health.entity';
//import { User } from './user.entity';


@Entity({ name: "player" })
export class Player extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    characterName: string;

    //@OneToOne(() => User, user => user.player)
    //user: User;

    //@OneToOne(() => Armor, armor => armor.player)
    //armor: Armor;

    //@OneToOne(() => Health, health => health.player)
    //health: Health;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
