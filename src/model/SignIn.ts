import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {User} from "../entity/User";
import md5 from "md5";

export class SignIn {
    username!: string;
    password!: string;
    user: User | undefined;

    errors: SignInErrors = {username: [], password: []};

    async validate() {
        if (this.username.trim() === "") {
            this.errors.username.push("请填写用户名");
        }
        const connection = await getDatabaseConnection();
        const user = await connection.manager.findOne(User, {where: {username: this.username}});
        this.user = user;
        if (user) {
            if (user.passwordDigest !== md5(this.password)) {
                this.errors.password.push("用户名密码不匹配");
            }
        } else {
            this.errors.username.push("用户不存在");
        }

    }

    hasErrors() {
        return !!Object.values(this.errors).find(e => e.length > 0);
    }
}