import Head from "next/head";
import { ReactNode } from "react";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import styles from "./DefaultLayout.module.scss";

interface LayoutProps {
  title?: string;
  image?: string;
  keywords?: string;
  children?: ReactNode;
  description?: string;
  searchQuery?: string;
  onSearchQueryChange?: (e: string) => void;

  darkMode?: boolean;
}

export const DefaultLayout = ({
  children,
  title,
  description,
  image,
  keywords,
  searchQuery,
  onSearchQueryChange,
  darkMode,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} | Kultur Kortet Århus</title>
        <meta
          name="description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer i det Aarhusianske kulturmiljø."
          }
        />
        <meta
          name="keywords"
          content={keywords || "aarhus, culture, map, guide, interactive"}
        />
        <meta name="author" content="Aneta Camo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} | Kultur Kortet Århus`} />
        <meta
          name="twitter:description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer i det Aarhusianske kulturmiljø."
          }
        />
        <meta
          name="twitter:image"
          content={`https://www.kultur-kortet.dk/images/${
            image ? image : "aa-map"
          }.jpg`}
        />{" "}
        <meta property="og:title" content={`${title} | Kultur Kortet Århus`} />
        <meta
          property="og:description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer i det Aarhusianske kulturmiljø."
          }
        />
        <meta
          property="og:image"
          content={`https://www.kultur-kortet.dk/images/${
            image ? image : "aa-map"
          }.jpg`}
        />{" "}
        {/* URL to an image for sharing */}
        <meta property="og:url" content="https://www.kultur-kortet.dk/" />
        <meta property="og:type" content="website" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://nabohelsingorvercelapp.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/nabohelsingorvercelapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
          }}
        />
      </Head>

      <Menu
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        darkMode={darkMode}
      />

      <div
        id="content"
        className={` ${styles.content} ${darkMode && "bg-black dark"}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};
