import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {Post} from "src/entity/Post";

type Props = { post: Post }
const PostsShow: NextPage<Props> = (props) => {
    const {post} = props;
    return (
        <>
            <h1>{post.title}</h1>
            <hr/>
            <article dangerouslySetInnerHTML={{__html: post.content}}/>
            <hr/>
            <Link href="/"><a>返回首页</a></Link>
        </>
    );
};
export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, (context.params!).id);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    };
};
