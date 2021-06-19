import {NextApiHandler} from "next";
import {Post} from "../../../src/entity/Post";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {withSession} from "../../../lib/withSession";

const Posts: NextApiHandler = withSession(async (request, response) => {
    if (request.method === "POST") {
        const {title, content} = request.body;
        const post = new Post();
        post.title = title;
        post.content = content;
        const user = request.session.get("currentUser");
        if (!user) {
            response.statusCode = 401;
            response.end();
        } else {
            response.statusCode = 200;
            post.author = user.id;
            const connection = await getDatabaseConnection();
            await connection.manager.save(post);
            response.json(post);
        }
    }
});
export default Posts;