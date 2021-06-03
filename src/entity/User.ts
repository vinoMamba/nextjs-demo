import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Post} from "./Post";
import {Review} from "./Review";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column("varchar")
    username!: string;
    @Column("varchar")
    password!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @OneToMany(() => Post, post => post.author)
    posts?: Post[];

    @OneToMany(() => Review, review => review.user)
    reviews?: Review[];
}
