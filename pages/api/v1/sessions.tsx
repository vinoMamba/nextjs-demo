import {NextApiHandler} from "next";
import {SignIn} from "src/model/SignIn";

const Sessions: NextApiHandler = async (request, response) => {
    const {username, password} = request.body;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    const signIn = new SignIn();
    signIn.username = username;
    signIn.password = password;
    await signIn.validate();
    if (signIn.hasErrors()) {
        response.statusCode = 422;
        response.write(JSON.stringify(signIn.errors));
        response.end();
    } else {
        response.statusCode = 200;
        response.end(JSON.stringify(signIn.user));
    }
};
export default Sessions;
