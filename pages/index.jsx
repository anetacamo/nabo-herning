import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardsSheets from "../components/CardsSheets/CardsSheets";
import CategoryList from "../components/CategoryList/CategoryList";
import FilterDisplay from "../components/FilterDisplay/FilterDisplay";
import MapGl from "../components/Map/MapGl";
import TagsList from "../components/TagsList/TagsList";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import pagedata from "../texts/home.json";
import { fetchGoogleSheetData } from "../hooks/data";
import styles from "./Home/Home.module.scss";

export async function getStaticProps() {
  const { blogs, updated } = await fetchGoogleSheetData();

  return {
    props: {
      blogs,
      updated,
    },
  };
}

export default function Home({ blogs, updated }) {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [entryPerPage, setEntryPerPage] = useState(36);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [routeWasRead, setRouteWasRead] = useState(false);

  const router = useRouter();

  // watch for changes in tag, search and category and filter the blogs!
  useEffect(() => {
    const fil = blogs.filter((blog) =>
      blog?.category?.toLowerCase().includes(category)
    );
    const filtered = blogs
      .filter((blog) => blog.tags?.toLowerCase().includes(tag))
      .filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchQuery) ||
          blog.description?.toLowerCase().includes(searchQuery) ||
          blog.howtouse?.toLowerCase().includes(searchQuery)
      );
    // .filter((blog) => blog?.type?.toLowerCase().includes(category));
    // .filter((blog) => blog?.category?.toLowerCase().includes(category));
    setFilteredBlogs(filtered);
  }, [category, tag, searchQuery]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.category) {
        setCategory(router.query.category);
      }
      if (router.query.tag) {
        setTag(router.query.tag);
      }
      setRouteWasRead(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (routeWasRead) {
      const query = {};
      if (category) query.category = category.toLowerCase();
      if (tag) query.tag = tag.toLowerCase();

      router.push(
        {
          pathname: "/",
          query: query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [category, tag, routeWasRead]);

  const onCategorySet = (cat) => {
    if (category === cat) {
      setCategory("");
    } else {
      setCategory(cat.toLowerCase());
    }
  };

  const onTagSet = (t) => {
    setTag(t === tag ? "" : t.toLowerCase());
  };

  return (
    <DefaultLayout
      updated={updated}
      title={pagedata.title}
      description={pagedata.meta || pagedata.description}
      searchQuery={searchQuery}
      onSearchQueryChange={(query) => setSearchQuery(query.toLowerCase())}
      darkMode
    >
      <div className={styles.filtration}>
        <FilterDisplay
          category={category}
          onCloseCategoryClick={() => setCategory("")}
          tag={tag}
          onCloseTagClick={() => setTag("")}
          searchQuery={searchQuery}
          onCloseSearchClick={() => setSearchQuery("")}
          filteredLength={filteredBlogs.length}
        />
      </div>

      <div className={styles.menuSpace}></div>
      <div className={styles.menuSpaceFixed}></div>
      <MapGl posts={filteredBlogs} />

      <section style={{ marginTop: -40 }}>
        <div className={styles.tagsHolder}>
          <CategoryList
            posts={blogs}
            onCategoryClick={onCategorySet}
            category={category}
          />
          {blogs.length !== filteredBlogs.length &&
            filteredBlogs.length > 0 && (
              <TagsList
                posts={filteredBlogs}
                onTagClick={onTagSet}
                tag={tag}
                category={category}
              />
            )}
        </div>
        <CardsSheets members={filteredBlogs.slice(0, entryPerPage)} />
        {entryPerPage < filteredBlogs.length && (
          <div className="flex-center-hor">
            <button onClick={() => setEntryPerPage(entryPerPage + 36)}>
              {pagedata.load_more_button}
            </button>
            <p className="blue" style={{ marginLeft: 12 }}>
              showing {entryPerPage} of {filteredBlogs.length}
            </p>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
