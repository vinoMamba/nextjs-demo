import {getPost} from "../../lib/posts";
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
    return {
        paths: [
            {
                params: {id: "第一篇博客"}
            },
            {
                params: {id: "第二篇博客"}
            }
        ],
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