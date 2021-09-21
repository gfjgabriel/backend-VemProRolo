import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";
import { User } from "./user.entity";
import {Like} from "./like.entity";
import {Match} from "./match.entity";
import { Model } from "./model.entity";
import { monitorEventLoopDelay } from "node:perf_hooks";

@Entity()
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'year'})
    year: number;

    @Column({name: 'color', length: 255, nullable: true})
    color: string;

    @ManyToOne(() => Model, { nullable: false })
    @JoinColumn({name : 'model_id', referencedColumnName: 'id'})
    model: Model;
    
    @Column({name: 'doors_number', nullable: true})
    doorsNumber: number;

    @Column({name: 'kilometers', nullable: true})
    kilometers: number;

    @Column({name: 'fuel_type', length: 255, nullable: true})
    fuelType: string;

    @Column({name: 'transmission_type', length: 255, nullable: true})
    transmissionType: string; 

    @Column({name: 'category', length: 255, nullable: true})
    category: string; 

    @Column({name: 'details', length: 2000, nullable: true})
    details: string;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

    @ManyToOne(() => User, user => user.vehicles, { nullable: false })
    @JoinColumn({name : 'user_id', referencedColumnName: 'id'})
    user: User;

    @OneToMany(() => Image, image => image.vehicle, { cascade: true, onDelete: 'CASCADE' })
    images: Image[];

    @OneToMany(() => Like, like => like.vehicle, { cascade: true, onDelete: 'CASCADE' })
    likes: Like[];

    @Column({name: 'price', precision: 10, scale: 2, nullable: true})
    price: number;

    @Column({ name: 'is_to_like', default: false, nullable: false })
    isToLike: Boolean;

    @Column({ name: 'is_for_sale', default: false, nullable: false })
    isForSale: Boolean;

}