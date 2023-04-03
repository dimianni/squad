import Spinner from '@/UI/Spinner';
import '@/styles/globals.css'
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import {Poppins} from 'next/font/google'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})


export default function App({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={poppins.className}>
            <Component {...pageProps} />
        </div>
      )}
    </>
  )
}
