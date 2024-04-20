import styles from "./CardsSheets.module.scss";
import React, { useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../../utils/slugify";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";
import Link from "next/link";
import ImageWithFallBack from "../ImageWithFallBack/ImageWithFallBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardsSheetsCarousel(members: { members: Blog[] }) {
  const slides = members.members;
  const slidesLength = members.members?.length;
  const [slide, setSlide] = useState<number>(0);
  const displayedItems = 4;

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
    <div className={`flex-center ${styles.container}`}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={`${styles.icon} ${styles.left}`}
        onClick={moveLeft}
        // onClick={() => setSlide(slide - 1)}
        // onKeyDown={(event) => {
        //   if (event.key === "ArrowLeft" || event.key === " ") {
        //     () => setSlide(slide === 0 ? slides : slides - 1);
        //   }
        // }}
        // role="button"
        // tabIndex="0"
      />
      <div className={`flex-center ${styles.container}`}>
        {showItems().map((post: Blog, index: number) => (
          <Link href={`/cards/${slugify(post.title)}`} key={index}>
            <a
              className={`${styles.link} border-black bg-hover-${getColor(
                post.type
              )}`}
            >
              <div className={`${styles.image} border-bottom-black`}>
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post?.title}
                    className={styles.image}
                  />
                ) : (
                  <ImageWithFallBack
                    src={`/images/${slugify(post?.title)}.jpg`}
                    alt={post?.title}
                  />
                )}
              </div>

              {post?.type && (
                <p
                  className={`${styles.type} border-black
                    )} ${getColor(post.type)} bg-black`}
                >
                  {post?.supertag && post.supertag}{" "}
                  {post?.type.split(",")[0].trim()}
                </p>
              )}
              {post?.title && <h4 className={styles.special}>{post?.title}</h4>}
            </a>
          </Link>
        ))}
      </div>
      <FontAwesomeIcon
        icon={faArrowRight}
        className={`${styles.icon} ${styles.right}`}
        onClick={moveRight}
      />
    </div>
  );
}
