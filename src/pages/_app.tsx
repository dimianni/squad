import { Layout } from '../components'
import { AppProps } from 'next/app';
import '@/styles/globals.css'
import { Router } from 'next/router';
import { Poppins } from 'next/font/google'
import NProgress from 'nprogress';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

interface CustomAppProps extends AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: CustomAppProps) {

  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>

      <div className={poppins.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  )
}
