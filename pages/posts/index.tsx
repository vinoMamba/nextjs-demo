import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {Post} from "src/entity/Post";
import qs from "query-string";
import {usePager} from "../../hooks/usePager";

type Props = {
    posts: Post[],
    count: number,
    perPage: number,
    page: number,
    totalPage: number
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, count, perPage, page, totalPage} = props;
    const {pager} = usePager({count, perPage, page, totalPage});
    return (
        <>
            <div>
                <h1>Vino Blog Site</h1>
                <hr/>
                <h4>文章列表</h4>
                <ol>
                    {posts.map(post =>
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )}
                </ol>
                <footer>
                    {pager}
                </footer>
            </div>
        </>
    );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url?.indexOf("?");
    const search = context.req.url?.substr(index === undefined ? -1 : index + 1);
    const query = qs.parse(search!.toString());
    const page = (query.page && parseInt(query.page.toString())) || 1;
    const connection = await getDatabaseConnection();
    const perPage = 1;
    const [posts, count] = await connection.manager.findAndCount(Post, {skip: (page - 1) * perPage, take: perPage});
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            count,
            perPage,
            page,
            totalPage: Math.ceil(count / perPage)
        }
    };
};
