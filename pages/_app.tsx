import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '@/css/katex.css';
import '@/css/globals.css';
import '@/css/prism.css';

import siteMetadata from '@/data/siteMetadata';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
