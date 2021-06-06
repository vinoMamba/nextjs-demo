import {NextApiHandler} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {User} from "src/entity/User";
import md5 from "md5";

const Sessions: NextApiHandler = async (request, response) => {
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    const {username, password} = request.body;

    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {where: {username}});
    if (user) {
        const passwordDigest = md5(password);
        if (user.passwordDigest === passwordDigest) {
            response.statusCode = 200;
            response.end(JSON.stringify(user));
        } else {
            response.statusCode = 422;
            response.end(JSON.stringify({password: ["用户名密码不匹配"]}));
        }
    } else {
        response.statusCode = 422;
        response.end(JSON.stringify({username: ["用户名不存在"]}));
    }

    // response.statusCode = 200;
    // response.write("");
    // response.end();
};
export default Sessions;
