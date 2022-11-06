import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type : 'varchar', length : 150 })
    fullName: string

    @Column({ type : 'varchar', length : 150 })
    email: string

    @Column({ type : 'varchar', length : 150 })
    phone: string

    @Column()
    age : number

    @Column({ type : 'varchar', length : 150 })
    password: string

    @Column({ default : true })
    isActive : boolean
  
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at : Date
  
    @Column({ type : 'varchar', length : 100, default : 1 })
    created_by : string
  
    @Column({ nullable : true })
    updated_at : Date
  
    @Column({ type : 'varchar', length : 100, nullable : true })
    updated_by : string

}