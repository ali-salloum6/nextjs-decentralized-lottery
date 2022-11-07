import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/ManualHeader";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Decentralized Lottery</title>
                <meta name="description" content="Decentralized Lottery built with hardhat" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </div>
    );
}
