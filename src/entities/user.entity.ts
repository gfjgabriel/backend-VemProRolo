import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, IsNull, BeforeInsert, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

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

  @Column({ name: 'is_email_verified', default: false, nullable: false })
  isEmailVerified: Boolean;

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles: Vehicle[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

}