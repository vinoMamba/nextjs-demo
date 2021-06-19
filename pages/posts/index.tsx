import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {Post} from "src/entity/Post";

type Props = { browser: { name: string; version: string; major: string }, posts: Post[] }
const PostsIndex: NextPage<Props> = (props) => {
    const {posts} = props;
    return (
        <>
            <div>
                <h1>Vino Blog Site</h1>
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
            </div>
        </>
    );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDatabaseConnection();
    const posts = await connection.manager.find(Post);
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
};
