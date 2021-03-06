import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function SearchHead() {
    const router = useRouter();
    const res = router.query.q;
    return (
        <Head>
            {res ? (
                <title>&quot;{res}&quot; 검색 결과 - sdv</title>
            ) : (
                <title>sdv</title>
            )}
        </Head>
    );
}

export default SearchHead;
