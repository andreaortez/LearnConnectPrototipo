import "@/styles/globals.css";
import "@/styles/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
  return <Component {...pageProps} />;
}
