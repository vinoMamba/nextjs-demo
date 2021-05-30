import {GetStaticProps, NextPage} from "next";
import {getPosts} from "lib/posts";

type Props = { posts: Post[] }

const PostsIndex: NextPage<Props> = (props) => {
    const {posts} = props;
    return (
        <div>
            <h1>文章列表</h1>
            <ol>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ol>
        </div>
    );
};
export default PostsIndex;

export const getStaticProps = async () => {
    const posts = await getPosts();
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
};