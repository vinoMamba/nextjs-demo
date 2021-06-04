import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {UAParser} from "ua-parser-js";
import {getDatabaseConnection} from "lib/getDatabaseConnection";
import {Post} from "src/entity/Post";

type Props = { browser: { name: string; version: string; major: string }, posts: Post[] }
const Home: NextPage<Props> = (props) => {
    const {browser: {name, version, major}, posts} = props;
    return (
        <>
            <div>
                <h1>Vino Blog Site</h1>
                <h4>文章列表</h4>
                <ul>
                    {posts.map(post =>
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <footer>你的浏览器是{`${name}-${version}-${major}`}{}</footer>
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDatabaseConnection();
    const posts = await connection.manager.find(Post);
    const ua = context.req.headers["user-agent"];
    const result = new UAParser(ua).getResult();
    return {
        props: {
            browser: result.browser,
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
};