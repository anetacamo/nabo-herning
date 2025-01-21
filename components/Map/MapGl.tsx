import { useState } from "react";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl";
import styles from "./MapGl.module.scss";
import { slugify } from "../../utils/slugify";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { organizePosts } from "../../utils/organizePosts";

interface MapGlProps {
  posts: Blog[];
}

export default function MapGl({ posts }: MapGlProps) {
  const [name, setName] = useState("");
  const [item, setItem] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 56.135554609420794,
    longitude: 8.95243742557034,
    zoom: 11,
  });

  organizePosts(posts);

  return (
    <div className={`${styles.mapwhole} desktop`}>
      <div className={styles.textContainer}>
        <div className={styles.mainTitle}>
          <h1>
            <span className={`${styles.highlighted} bg-blue`}>
              Kultur Kortet
            </span>
            <br />
            <span className={`${styles.highlighted} bg-blue`}>Herning</span>
          </h1>
          <p>
            {/* <span className="highlighted bg-blue">{pagedata.description}</span> */}
            <span className={`${styles.highlighted} bg-blue`}>
              Kort og liste over organisationer,
            </span>{" "}
            <span className={`${styles.highlighted} bg-blue`}>
              udstillingsteder, venues, eventskabere,
            </span>{" "}
            <span className={`${styles.highlighted} bg-blue`}>
              fælleskaber, og andre ressourcer
            </span>{" "}
          </p>
        </div>
      </div>
      <Map
        style={{ width: "100vw", height: "500px", position: "relative" }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        maxZoom={17}
        minZoom={10}
        scrollZoom={false}
        mapStyle={process.env.MAPBOX_STYLE_URL}
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
      >
        <NavigationControl />
        {organizePosts(posts).map(
          (post, index: number) =>
            !isNaN(post.posts[0].longitude || 0) &&
            !isNaN(post.posts[0].latitude || 0) && (
              <Marker
                key={index}
                latitude={post.posts[0].latitude}
                longitude={post.posts[0].longitude}
                style={item === index ? { zIndex: 5 } : { zIndex: 1 }}
              >
                <Link
                  href={`cards/${slugify(post?.posts[0].title)}`}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div
                    className={`${styles.point} bg-${getColor(
                      post.posts[0].category
                    )} ${item === index ? styles.pointed : ""}`}
                    onMouseEnter={() => setItem(index)}
                    onMouseLeave={() => setItem(null)}
                  >
                    {post.children > 1 && (
                      <div className={`${styles.number} bg-red`}>
                        {post.children}
                      </div>
                    )}
                    <img
                      src={`/images/icons/${getCategoryIcon(
                        post.posts[0].category
                      )}.png`}
                      alt={`icon`}
                      className={styles.icon}
                    />

                    <div
                      className={`${styles.title} ${
                        item === index && styles.opened
                      }`}
                    >
                      {item === index &&
                        post.posts.map((child, childindex) => (
                          <p
                            className={`${getColor(child.category)} ${
                              styles.main
                            }`}
                            key={childindex}
                            style={{
                              marginBottom: post.posts.length > 1 ? null : 0,
                            }}
                          >
                            {child.title}
                          </p>
                        ))}
                      {item === index && (
                        <span style={{ color: "black" }}>
                          {" "}
                          {post.posts[0].address}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Marker>
            )
        )}
      </Map>
    </div>
  );
}
