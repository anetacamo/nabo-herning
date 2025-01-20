import React from "react";
import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";
import CrookedImage from "../../components/CrookedImage/CrookedImage";
import IconHolder from "../../components/IconHolder/IconHolder";
import Tags from "../../components/Tags/Tags";
import styles from "./card.module.scss";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../../utils/slugify";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";
import texts from "../../texts/single-page.json";
import { fetchGoogleSheetData } from "../../hooks/data";
import CardsSheetsCarousel from "../../components/CardsSheetsCarousel/CardsSheetsCarousel";
import Link from "next/link";

interface SinglePageProps {
  blog: Blog; // Specify the type of blog here
  relatedBlogs: Blog[]; // Assuming relatedBlogs is an array of Blog objects
}

export async function getServerSideProps(context: { params: { slug: any } }) {
  const name = context.params.slug;
  const { blogs, updated } = await fetchGoogleSheetData();

  const blog = blogs.filter((card: Blog) => slugify(card?.title) === name)[0];
  const blogType = blog?.category?.split(",")[0];

  const allRelated = blogs.filter(
    (b: Blog) => b.category?.split(",")[0] === blogType
  );

  const relatedBlogs = allRelated;

  return {
    props: {
      blog,
      relatedBlogs,
      updated,
    },
  };
}

export default function SinglePage({
  blog,
  relatedBlogs,
  updated,
}: SinglePageProps) {
  const descriptionWithLineBreaks = blog?.description
    .replace(/\\n/g, "\n")
    .replace(/\\+/g, "");

  const howtouseWithLineBreaks =
    blog?.howtouse || "".replace(/\\n/g, "\n").replace(/\\+/g, "");

  return (
    <DefaultLayout
      title={blog?.title}
      description={blog?.description}
      image={slugify(blog?.title)}
      keywords={blog?.invisible}
      updated={updated}
    >
      <CrookedImage image={`/images/places/${slugify(blog?.title)}.jpg`}>
        <div className={styles.text}>
          <p className={`${getColor(blog?.category)} ${styles.tag}`}>
            {blog?.category}
          </p>
          <h1>{blog?.title}</h1>
          {blog?.address && (
            <IconHolder name={blog?.address} nolink icon={faLocation} />
          )}
          {blog?.link && (
            <IconHolder name={texts.link} link={blog?.link} small />
          )}
          {blog?.tags && (
            <Tags tags={blog?.tags} color={getColor(blog?.category)} />
          )}
        </div>
      </CrookedImage>

      {blog?.credit && <p className={styles.credit}>Foto: {blog?.credit}</p>}

      <section className={styles.texts}>
        <h4>{texts.description}</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>{descriptionWithLineBreaks}</p>
        <h4>{texts.howToUse}</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>{howtouseWithLineBreaks}</p>
      </section>
      <section className={`bg-${getColor(blog?.category)}`}>
        <h2>
          <Link
            href={`/?category=${blog?.category.split(",")[0].toLowerCase()}`}
          >
            {`${texts.other} ${blog?.category.split(",")[0]}`}
          </Link>
        </h2>

        {relatedBlogs && relatedBlogs.length > 0 ? (
          <CardsSheetsCarousel members={relatedBlogs} />
        ) : (
          <p>No related blogs found.</p>
        )}
      </section>
    </DefaultLayout>
  );
}
