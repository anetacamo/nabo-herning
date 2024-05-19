import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";
import { slugify } from "../../utils/slugify";
import ImageWithFallBack from "../ImageWithFallBack/ImageWithFallBack";
import styles from "./CardsSheetsCarousel.module.scss";

export default function CardsSheetsCarousel(members: { members: Blog[] }) {
  const slides = members.members;
  const slidesLength = members.members?.length;
  const [slide, setSlide] = useState<number>(0);
  const [displayedItems, setDisplayedItem] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      setDisplayedItem(Math.floor(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showItems = () => {
    const items = [];
    for (let i = 0; i < displayedItems; i++) {
      items.push(slides[getAdjustedIndex(slide + i)]);
    }
    return items;
  };

  const moveRight = () => {
    setSlide((prevSlide) => (prevSlide + 1) % slidesLength);
  };

  const moveLeft = () => {
    setSlide((prevSlide) => (prevSlide - 1 + slidesLength) % slidesLength);
  };

  const getAdjustedIndex = (index) => {
    if (index < 0) {
      return slidesLength + index;
    } else if (index >= slidesLength) {
      return index % slidesLength;
    }
    return index;
  };

  return (
    <>
      <h4 style={{ marginTop: -16 }}>
        showing {slide + 1} - {slide + displayedItems} out of {slidesLength}
      </h4>
      <div className={`flex-center ${styles.flex}`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`${styles.icon} ${styles.left}`}
          onClick={moveLeft}
          onKeyDown={moveLeft}
          role="button"
          tabIndex={0}
        />
        <div className={`flex-center card-container ${styles.container}`}>
          {showItems().map((post: Blog, index: number) => (
            <Link href={`/cards/${slugify(post.title)}`} key={index}>
              <a
                className={`${
                  styles.card
                } card-link border-black bg-hover-${getColor(post.category)}`}
              >
                <div className={`border-bottom-black image ${styles.image}`}>
                  {post.image ? (
                    <img src={post.image} alt={post?.title} />
                  ) : (
                    <ImageWithFallBack
                      src={`/images/places/${slugify(post?.title)}.jpg`}
                      alt={post?.title}
                    />
                  )}
                </div>

                {post?.category && (
                  <p
                    className={`type border-black
                    )} ${getColor(post.category)} bg-black`}
                  >
                    {/* {post?.supertag && post.supertag}{" "} */}
                    {post?.category.split(",")[0].trim()}
                  </p>
                )}
                {post?.title && <h4 className="special">{post?.title}</h4>}
              </a>
            </Link>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={`${styles.icon} ${styles.right}`}
          onClick={moveRight}
          onKeyDown={moveRight}
          role="button"
          tabIndex={0}
        />
      </div>
    </>
  );
}
