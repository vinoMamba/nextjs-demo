import {NextApiHandler} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {User} from "src/entity/User";

const Posts: NextApiHandler = async (request, response) => {
    const {username, password, passwordConfirmation} = request.body;
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username;
    if (password !== passwordConfirmation) {
        const errors = {passwordConfirmation: ["密码不匹配"]};
        response.statusCode = 422;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(errors));
        response.end();
    }
};
export default Posts;
