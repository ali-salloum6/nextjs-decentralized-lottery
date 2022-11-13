import Head from "next/head";
// import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import React from "react";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Decentralized Lottery</title>
                <meta name="description" content="Decentralized Lottery built with hardhat" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="relative container mx-auto p-6">
                <Header className="flex items-center justify-between p-5 border-b-2" />
                <LotteryEntrance />
            </div>
        </div>
    );
}
