import Head from 'next/head'

import { Chip } from '../packages/sivasifr-ui/src/Chip'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Siva-UI
        </h1>

        <div className={styles.description}>
          <Chip
            label="default"
            onClick={()=>{}}
          />
          <Chip
            label="primary"
            color="primary"
            onClick={()=>{}}
          />
          <Chip
            label="accent"
            color="accent"
            onClick={()=>{}}
          />
          <Chip
            label="secondary"
            color="secondary"
            onClick={()=>{}}
          />
        </div>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
