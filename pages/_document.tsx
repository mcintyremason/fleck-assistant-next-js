import Document, { Head, Html, Main, NextScript } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>FRC Assistant</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 maximum-scale=1"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/frc32.png" type="image/png" />
          <link rel="shortcut icon" href="/frc32.png" type="image/png" />
          <link rel="apple-touch-icon" href="/frc180.png" type="image/png" />
          <link rel="mask-icon" href="/frc180.png" />
          <meta name="apple-mobile-web-app-title" content="FRC Assistant" />
          <meta name="description" content="More than only a website..." />
          <link type="text/css" rel="preload" as="style" href="/css/app.css" />
          <link type="text/css" rel="stylesheet" href="/css/app.css" />
          <link
            type="text/css"
            rel="preload"
            as="style"
            href="/css/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
          />
          <link
            type="text/css"
            rel="stylesheet"
            href="/css/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-J1J5941ER1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J1J5941ER1');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
