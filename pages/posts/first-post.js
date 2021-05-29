import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
    return (
        <>
            <Head>
                <title>第一篇博客</title>
            </Head>
            <h1>First Post</h1>
            <hr/>
            <Link href="/">
                <a>回到首页</a>
            </Link>
        </>
    )
}