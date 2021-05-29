import {NextApiHandler} from "next";
import {getPosts} from "lib/posts";

const Posts: NextApiHandler = async (request, response) => {
    const posts = await getPosts().then();

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(posts));
    response.end();
};
export default Posts;