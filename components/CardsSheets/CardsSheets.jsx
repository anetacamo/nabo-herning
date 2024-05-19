import { faLocation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getColor } from "../../utils/getColor";
import { slugify } from "../../utils/slugify";
import { truncate } from "../../utils/truncate";
import IconHolder from "../IconHolder/IconHolder";
import ImageWithFallBack from "../ImageWithFallBack/ImageWithFallBack";
import Tags from "../Tags/Tags";

export default function CardsSheets(members) {
  return (
    <div className={`flex-center card-container`}>
      {members.members.map((post, index) => (
        <Link href={`/cards/${slugify(post.title)}`} key={index}>
          <a
            className={`border-${getColor(post.category)} bg-hover-${getColor(
              post.category
            )} card-link`}
          >
            <div className={`image border-bottom-${getColor(post.category)}`}>
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
                className={`type border-${getColor(post.category)} ${getColor(
                  post.category
                )} bg-black`}
              >
                {/* {post?.supertag && post.supertag}{" "} */}
                {post?.category.split(",")[0].trim()}
              </p>
            )}
            {post?.title && <h4 className="special">{post?.title}</h4>}
            {post?.address && (
              <IconHolder
                name={post?.address}
                nolink
                icon={faLocation}
                color={getColor(post.category)}
              />
            )}

            {post?.link && (
              <IconHolder
                name="hjemmeside"
                link={post?.link}
                small
                color={getColor(post.category)}
              />
            )}
            {post?.description && (
              <h5 className="description">
                {truncate(post?.description, 150)}
              </h5>
            )}
            {post?.tags && (
              <Tags tags={post?.tags} color={getColor(post.category)} />
            )}
          </a>
        </Link>
      ))}
    </div>
  );
}
