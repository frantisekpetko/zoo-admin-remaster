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
import { Armor } from './armor.entity';

@Entity({ name: 'character' })
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  levelpower: number;

  @BeforeInsert()
  computeLevelpower() {
    //this.levelpower = 5;
  }

  @Column()
  race: string;

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

  @Column()
  gold: number;

  @Column()
  silver: number;

  @Column()
  cooper: number;

  //@OneToOne(() => Armor, (armor) => armor.player)
  //@JoinColumn({ name: 'armorId' })
  //armor: Armor;
}
