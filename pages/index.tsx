import Link from "next/link";

const Home = () => {
    return (
        <div>
            <h1>Vino Blog Site</h1>
            <p>
                <Link href="/posts/first-post">
                    <a>第一篇博客</a>
                </Link>
            </p>
        </div>
    )
}

export default Home