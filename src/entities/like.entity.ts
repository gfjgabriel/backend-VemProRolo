import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import {Vehicle} from "./vehicle.entity";
import {LikeType} from "./types/like.type";

@Entity('like_interest')
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn()
    like_id: number;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

    @Column({name: 'type', length: 255, nullable: false})
    type: LikeType;

    @Column({name: 'matched', nullable: false, default: false})
    matched: boolean;

    @ManyToOne(() => User, user => user.vehicles, { nullable: false })
    @JoinColumn({name : 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Vehicle, vehicle => vehicle.likes, { nullable: false })
    @JoinColumn({name : 'vehicle_id', referencedColumnName: 'id'})
    vehicle: Vehicle;

}