import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Model } from "./model.entity";

@Entity()
export class Brand extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', length: 255, nullable: true})
    name: string;

    @OneToMany(() => Model, model => model.brand)
    models: Model[];
}