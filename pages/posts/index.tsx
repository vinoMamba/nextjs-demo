import {GetStaticProps, NextPage} from "next";
import {getPosts} from "lib/posts";
import Link from "next/link";

type Props = { posts: Post[] }

const PostsIndex: NextPage<Props> = (props) => {
    const {posts} = props;
    return (
        <div>
            <h1>文章列表</h1>
            <ol>{posts.map(p => <li key={p.id}>
                <Link href={`/posts/${p.id}`}>
                    <a>{p.title}</a>
                </Link>
            </li>)}</ol>
        </div>
    );
};
export default PostsIndex;

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getPosts();
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
};