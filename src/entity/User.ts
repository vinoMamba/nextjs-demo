import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post";
import {Review} from "./Review";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import md5 from "md5";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id?: number;
    @Column("varchar")
    username!: string;
    @Column("varchar")
    passwordDigest!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @OneToMany(() => Post, post => post.author)
    posts?: Post[];

    @OneToMany(() => Review, review => review.user)
    reviews?: Review[];

    password!: string;
    passwordConfirmation!: string;
    errors: UsersErrors = {username: [], password: [], passwordConfirmation: []};

    async validate() {
        if (this.username.trim() === "") {
            this.errors.username.push("不能为空");
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push("格式不合法");
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push("用户名太长");
        }
        if (this.username.trim().length <= 3) {
            this.errors.username.push("用户名太短");
        }
        const found = await (await getDatabaseConnection()).manager.find(User, {username: this.username});
        if (found.length > 0) {
            this.errors.username.push("用户名已存在");
        }
        if (this.password === "") {
            this.errors.password.push("密码不能为空");
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push("密码不匹配");
        }
    }

    hasErrors() {
        return !!Object.values(this.errors).find(e => e.length > 0);
    }

    @BeforeInsert()
    generatePasswordDigest() {
        this.passwordDigest = md5(this.password!);
    }
}
