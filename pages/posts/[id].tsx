import {getPost, getPostId} from "../../lib/posts";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";

type Props = { post: Post }
const PostsShow: NextPage<Props> = (props) => {
    const {post} = props;
    return (
        <>
            <h1>{post.title}</h1>
            <article>{post.content}</article>
            <hr/>
            <article dangerouslySetInnerHTML={{__html: post.htmlContent}}/>
        </>
    );
};
export default PostsShow;

export const getStaticPaths = async () => {
    const ids = await getPostId();
    const paths = ids.map(id => ({params: {id: id}}));
    return {
        paths: paths,
        fallback: false
    };
};

export const getStaticProps = async (x: any) => {
    const id = x.params.id;
    const post = await getPost(id);
    return {
        props: {
            post: post
        }
    };
};