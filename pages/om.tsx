import CrookedImage from "../components/CrookedImage/CrookedImage";
import Section from "../components/Section/Section";
import TypeCards from "../components/TypeCards/TypeCards";
import {
  fetchGoogleSheetData,
  SHEET_REVALIDATE_SECONDS,
} from "../hooks/data";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import pagedata from "../texts/about.json";
import SectionType from "../types/section.type";

export async function getStaticProps() {
  const { updated } = await fetchGoogleSheetData();

  return {
    props: { updated },
    revalidate: SHEET_REVALIDATE_SECONDS,
  };
}

export default function About({ updated }: { updated: string | null }) {
  return (
    <DefaultLayout
      title={pagedata.title}
      description={pagedata.meta ?? pagedata.description}
      updated={updated}
    >
      <CrookedImage image={pagedata.image}>
        <h1>{pagedata.title}</h1>
        <p>{pagedata.description}</p>
      </CrookedImage>
      {pagedata.sections.map((section: SectionType, index: number) => (
        <Section key={index} {...section} />
      ))}
      <section>
        <TypeCards />
      </section>
    </DefaultLayout>
  );
}
