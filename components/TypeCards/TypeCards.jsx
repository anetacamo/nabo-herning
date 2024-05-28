import Image from "next/image";
import styles from "./TypeCards.module.scss";
import types from "../../texts/types.json";
import Link from "next/link";
import { slugify } from "../../utils/slugify";

export default function TypeCards({ en }) {
  return (
    <div className={`${styles.container} flex-center`}>
      {types.map((type, index) => (
        <Link
          href={`/?category=${type.name}`}
          key={index}
          className={styles.link}
        >
          <div className={`${styles.card} bg-${type.color}`}>
            <div className={styles.image}>
              <Image
                src={`/images/categories/${type.image || slugify(type.name)}.png`}
                alt={type.title}
                layout="fill"
                quality="7"
                objectFit="cover"
              />
            </div>
            {type?.name && <h4 className={styles.special}>{type?.name}</h4>}
            {en
              ? type?.about_en && (
                  <h5 className={styles.small}>{type?.about_en}</h5>
                )
              : type?.about && <h5 className={styles.small}>{type?.about}</h5>}
          </div>
        </Link>
      ))}
    </div>
  );
}
