import { FormTextAreas } from "../../types/form.type";
import FormLabel from "../FormLabel/FormLabel";
import styles from "./FormArea.module.scss";

export default function FormArea({
  data,
  name,
  onFieldChange,
  value,
}: FormTextAreas) {
  return (
    <div>
      <FormLabel
        name={name}
        label={data?.label || ""}
        required={data?.required || false}
      />
      {data?.helper && (
        <p
          className={styles.helper}
          dangerouslySetInnerHTML={{
            __html: data.helper,
          }}
        ></p>
      )}
      <textarea
        name={name}
        id={name}
        required={data?.required || false}
        value={value}
        onChange={onFieldChange}
        className={styles.textArea}
      />
    </div>
  );
}
