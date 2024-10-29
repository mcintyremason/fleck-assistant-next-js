import Head from "next/head";
import { ReactNode } from "react";
import { ErrorContextProvider } from "../../contexts/ErrorContext";
import { LoadingContextProvider } from "../../contexts/LoadingContext";

type Props = {
  children?: ReactNode;
  title?: string;
  styles?: string;
};

const Layout = ({
  children,
  title = "Fleck Assistant",
  styles = "",
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        href="/img/icons/favicon-1/rwf.png"
        type="image/png"
      />
      <link
        rel="apple-touch-icon"
        sizes="32x32"
        href="/img/icons/favicon-1/rwf.png"
      ></link>
      <link
        rel="apple-touch-startup-image"
        href="/img/icons/favicon-1/rwf.png"
      />
      <link rel="icon" type="image/png" href="/img/icons/favicon-1/rwf.png" />
      <meta name="apple-mobile-web-app-title" content="Fleck Assistant" />
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
      {styles}
    </Head>
    <LoadingContextProvider>
      <ErrorContextProvider>{children}</ErrorContextProvider>
    </LoadingContextProvider>
  </div>
);

export default Layout;
