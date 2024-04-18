import { useState } from "react";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl";
import styles from "./MapGl.module.scss";
import { slugify } from "../../utils/slugify";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";
import pagedata from "../../texts/home.json";

interface MapGlProps {
  posts: Blog[];
}

export default function MapGl({ posts }: MapGlProps) {
  const [name, setName] = useState("");
  const [viewState, setViewState] = useState({
    latitude: 56.03550959531433,
    longitude: 12.582182444184792,
    zoom: 11,
  });

  return (
    <div className={`${styles.mapwhole} desktop`}>
      <div className={styles.textContainer}>
        <div className={styles.mainTitle}>
          <h1>
            <span className={`${styles.highlighted} bg-blue`}>
              Kultur Kortet
            </span>
            <br />
            <span className={`${styles.highlighted} bg-blue`}>Helsingør</span>
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
            <span className={`${styles.highlighted} bg-blue`}>
              i det Aarhusianske kulturmiljø.
            </span>
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
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl />
        {posts.map(
          (post: Blog, index: number) =>
            !isNaN(post.longitude || 0) &&
            !isNaN(post.latitude || 0) && (
              <Marker
                key={index}
                latitude={post.latitude}
                longitude={post.longitude}
                style={name === post.title ? { zIndex: 5 } : { zIndex: 1 }}
              >
                <Link
                  href={`cards/${slugify(post?.title)}`}
                  key={index}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div
                    className={`${styles.point} bg-${getColor(post.type)} ${
                      name === post.title ? styles.pointed : ""
                    }`}
                    onMouseEnter={() => setName(post.title)}
                    onMouseLeave={() => setName("")}
                  >
                    <img
                      src={`/categories/${getColor(post.type)}2.png`}
                      alt={`icon`}
                      className={styles.icon}
                    />
                    <div
                      className={`${styles.title} ${getColor(post.type)} ${
                        name === post.title ? styles.opened : ""
                      }`}
                    >
                      {name === post.title ? name : ""}
                      <span style={{ color: "black" }}>
                        {" "}
                        {name === post.title ? post.address : ""}
                      </span>
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
