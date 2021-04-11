import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, IsNull } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'full_name', length: 255, nullable: false })
  name: string;

  @Column({ name:'email', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password_hash', length: 255, nullable: false })
  password: string;

  @Column({ name:'phone', length: 60, nullable: true })
  phone: string;
  
  @CreateDateColumn({ name: 'created_date', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date', nullable: false })
  updatedDate: Date;

}