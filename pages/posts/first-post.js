import React from "react";
import Link from "next/link";

export default function FirstPost() {
    return (
        <>
            <h1>First Post</h1>
            <hr/>
            <Link href="/">
                <a>回到首页</a>
            </Link>
        </>
    )
}