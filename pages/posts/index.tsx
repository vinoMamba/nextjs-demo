import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {Post} from "src/entity/Post";
import qs from "query-string";

type Props = {
    posts: Post[],
    count: number,
    perPage: number,
    page: number,
    totalPage: number
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, count, perPage, page, totalPage} = props;
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
                <p>
                    {page !== 1 && <Link href={`?page=${page - 1}`}><a>上一页</a></Link>}
                    每页显示:{perPage}|文章总数:{count} | {page}/{totalPage}页
                    {page < totalPage && <Link href={`?page=${page + 1}`}><a>下一页</a></Link>}
                </p>
            </div>
        </>
    );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url?.indexOf("?");
    const search = context.req.url?.substr(index! + 1);
    const query = qs.parse(search!.toString());
    const page = parseInt(query.page!.toString()) || 1;
    const connection = await getDatabaseConnection();
    const perPage = 3;
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
