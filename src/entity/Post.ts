import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Review} from "./Review";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column("varchar")
    title!: string;
    @Column("text")
    content!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.posts)
    author!: User;

    @OneToMany(() => Review, review => review.post)
    reviews!: Review[];
}
