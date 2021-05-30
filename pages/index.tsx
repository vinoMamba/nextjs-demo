import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {UAParser} from "ua-parser-js";

type Props = { browser: { name: string; version: string; major: string } }
const Home: NextPage<Props> = (props) => {
    const {browser: {name, version, major}} = props;
    return (
        <>
            <div>
                <h1>Vino Blog Site</h1>
                <p>
                    <Link href="/posts/first-post">
                        <a>第一篇博客</a>
                    </Link>
                </p>
            </div>
            <h2>你的浏览器是{`${name}-${version}-${major}`}{}</h2>
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers["user-agent"];
    const result = new UAParser(ua).getResult();
    return {
        props: {
            browser: result.browser
        }
    };
};