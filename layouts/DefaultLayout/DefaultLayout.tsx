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
  updated,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} | Kultur Kortet Herning</title>
        <meta
          name="description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer."
          }
        />
        <meta
          name="keywords"
          content={keywords || "Herning, culture, map, guide, interactive"}
        />
        <meta name="author" content="Aneta Camo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${title} | Kultur Kortet Herning`}
        />
        <meta
          name="twitter:description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer."
          }
        />
        <meta
          name="twitter:image"
          content={`https://www.kultur-kortet.dk/images/${
            image ? `places/${image}.jpg` : "about.png"
          }`}
        />{" "}
        <meta
          property="og:title"
          content={`${title} | Kultur Kortet Herning`}
        />
        <meta
          property="og:description"
          content={
            description ||
            "Kort og liste over organisationer, udstillingsteder, venues, eventskabere, fælleskaber, og andre ressourcer."
          }
        />
        <meta
          property="og:image"
          content={`https://www.kultur-kortet.dk/images/${
            image ? `places/${image}.jpg` : "about.png"
          }`}
        />
        {/* URL to an image for sharing */}
        <meta property="og:url" content="https://www.kultur-kortet.dk/" />
        <meta property="og:type" content="website" />
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
      <Footer updated={updated} />
    </>
  );
};
