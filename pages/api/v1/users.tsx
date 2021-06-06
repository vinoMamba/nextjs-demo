import {NextApiHandler} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {User} from "src/entity/User";
import md5 from "md5";
import {use} from "marked";

const Posts: NextApiHandler = async (request, response) => {
    const {username, password, passwordConfirmation} = request.body;
    type Errors = {
        username: string[];
        password: string[];
        passwordConfirmation: string[];
    }
    const errors: Errors = {username: [], password: [], passwordConfirmation: []};
    if (username.trim() === "") {
        errors.username.push("不能为空");
    }
    if (!/[a-zA-Z0-9]/.test(username.trim())) {
        errors.username.push("格式不合法");
    }
    if (username.trim().length > 42) {
        errors.username.push("用户名太长");
    }
    if (username.trim().length <= 3) {
        errors.username.push("用户名太短");
    }
    if (password === "") {
        errors.password.push("密码不能为空");
    }
    if (password !== passwordConfirmation) {
        errors.passwordConfirmation.push("密码不匹配");
    }
    const hasErrors = Object.values(errors).find(e => e.length > 0);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    if (hasErrors) {
        response.statusCode = 422;
        response.write(JSON.stringify(errors));
    } else {
        const connection = await getDatabaseConnection();
        const user = new User();
        user.username = username;
        user.password = md5(password);
        await connection.manager.save(user);
        response.statusCode = 200;
        response.write(JSON.stringify(user));
    }
    response.end();
};
export default Posts;
