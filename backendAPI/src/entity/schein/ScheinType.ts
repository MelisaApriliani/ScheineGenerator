import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ScheinType {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string; // e.g., 'Mustersammlung', 'Zeugnis'

}