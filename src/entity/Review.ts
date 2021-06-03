import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column("number")
    userId!: number;
    @Column("number")
    postId!: number;
    @Column("text")
    content!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.reviews)
    user!: User;

    @ManyToOne(() => Post, post => post.reviews)
    post!: Post;
}
