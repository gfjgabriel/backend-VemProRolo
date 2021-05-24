import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'key', length: 255})
    key: string;

    @Column({name: 'file_name', length: 255})
    fileName: string;

    @Column({name: 'file_content_type', length: 255})
    fileContentType: string;

    @Column({name: 's3_name', length: 255})
    s3Name: string;

    @Column({name: 'processed', default: false})
    processed: boolean;

    @Column({name: 'file'})
    file: string;

    @ManyToOne(() => Vehicle, vehicle => vehicle.images, { nullable: false })
    @JoinColumn({name : 'vehicle_id', referencedColumnName: 'id'})
    vehicle: Vehicle;

}