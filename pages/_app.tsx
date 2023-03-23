/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '../Context/UserContext';
import { Header } from '../components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Next-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}
