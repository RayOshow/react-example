
'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  function goToProductPage() {
    router.push('/product')
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is the home page of the website." />
        <meta name="keywords" content="home, website" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Link href="/product">[프로덕트 리스트로 SSR로 이동하기]</Link>
          <p></p>
          <button onClick={goToProductPage}>[프로덕트 리스트 CSR로 이동하기]</button>
        </div>
      </main>
    </>
  )
}
