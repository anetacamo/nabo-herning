import styles from "./FormTagsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Blog from "../../types/card.type";
import { getColor } from "../../utils/getColor";

interface TagsProps {
  posts: Blog[];
  onTagClick: (t: string) => void;
  tag: string;
  tags: any;
  category?: string;
}

export default function FormTagsList({
  posts,
  onTagClick,
  tag,
  category,
  tags,
}: TagsProps) {
  const allTags: string[] | undefined = [];
  posts.map((item) => {
    const singleTag = item.tags?.split(",")[0].toLowerCase().trim();
    !allTags.includes(singleTag) && singleTag != "" && allTags.push(singleTag);
  });

  return (
    <div className={styles.tags}>
      {allTags.map((t, index) => (
        <div
          key={index}
          className={`type ${tag == t && "bg- chosen"} ${
            styles.tag
          } bg-${getColor(category)} `}
          aria-label={`${t} - ${tag == t ? "checked" : ""}`}
          onClick={() => onTagClick(t)}
          role="button"
          tabIndex={0}
          onKeyDown={() => onTagClick(t)}
        >
          {t}
          {t == tag && (
            <FontAwesomeIcon icon={faClose} className={styles.icon} />
          )}
        </div>
      ))}
    </div>
  );
}
