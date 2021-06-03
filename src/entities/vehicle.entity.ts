import { Category } from "aws-sdk/clients/signer";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";
import { FuelType } from "./types/fuel.type";
import { TransmissionType } from "./types/transmission.type";
import { User } from "./user.entity";

@Entity()
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'brand', length: 255})
    brand: string;

    @Column({name: 'year'})
    year: number;

    @Column({name: 'color', length: 255})
    color: string;

    @Column({name: 'model', length: 255})
    model: string;

    @Column({name: 'fuel_type', length: 255})
    fuelType: FuelType;

    @Column({name: 'transmission_type', length: 255})
    transmissionType: TransmissionType; 

    @Column({name: 'category', length: 255})
    category: Category; 

    @Column({name: 'details', length: 2000})
    details: string;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

    @ManyToOne(() => User, user => user.vehicles, { nullable: false })
    @JoinColumn({name : 'user_id', referencedColumnName: 'id'})
    user: User;

    @OneToMany(() => Image, image => image.vehicle, { cascade: true })
    images: Image[];


}