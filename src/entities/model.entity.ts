import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "./brand.entity";

@Entity()
export class Model extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', length: 255, nullable: true})
    name: string;

    @ManyToOne(() => Brand, brand => brand.models, { nullable: false })
    @JoinColumn({name : 'brand_id', referencedColumnName: 'id'})
    brand: Brand;

}