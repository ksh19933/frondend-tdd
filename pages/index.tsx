import Head from 'next/head'
export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Jest Tdd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main data-testid="main">
        i am main
      </main>
      <footer>
        i am footer
      </footer>
    </>
  )
}
