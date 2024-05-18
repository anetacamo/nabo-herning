import { FormInputs } from "../../types/form.type";
import FormLabel from "../FormLabel/FormLabel";
import styles from "./FormItem.module.scss";

export default function FormItem({
  data,
  name,
  onFieldChange,
  value,
  success,
  error,
}: FormInputs) {
  return (
    <div className={`${name === "email" && styles.dark}`}>
      <FormLabel
        name={name}
        label={data?.label || ""}
        required={data?.required || false}
      />
      <input
        type="text"
        name={name}
        required={data?.required || false}
        id={name}
        value={value}
        onChange={onFieldChange}
        placeholder={`skriv dit ${name}`}
        className={`${styles.input} ${error && styles.error} ${
          success && styles.success
        } `}
      />
      {data?.helper && (
        <p
          className={styles.helper}
          dangerouslySetInnerHTML={{
            __html: data.helper,
          }}
        ></p>
      )}
    </div>
  );
}
