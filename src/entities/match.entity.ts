import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Like} from "./like.entity";

@Entity()
export class Match extends BaseEntity {

    @PrimaryGeneratedColumn()
    match_id: number;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

    @OneToOne(() => Like, { nullable: false })
    @JoinColumn({name : 'first_like_id', referencedColumnName: 'like_id'})
    firstLike: Like;

    @OneToOne(() => Like, { nullable: false })
    @JoinColumn({name : 'second_like_id', referencedColumnName: 'like_id'})
    secondLike: Like;

}