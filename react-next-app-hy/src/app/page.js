import Image from 'next/image'
import Link from 'next/link';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is the home page of the website." />
        <meta name="keywords" content="home, website" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Link href="/product">[프로덕트 리스트로 이동하기]</Link>
        </div>
      </main>
    </>
  )
}
