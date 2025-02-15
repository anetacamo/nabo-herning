import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

import { useForm, ValidationError } from "@formspree/react";
import FormArea from "../components/FormArea/FormArea";
import FormItem from "../components/FormItem/FormItem";
import FormSelectCategory from "../components/FormSelectCategory/FormSelectCategory";
import FormTag from "../components/FormTag/FormTag";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import pagedata from "../texts/new-member.json";
import formdata from "../texts/form.json";

import CardType, {
  emptyMember,
  TextAreas,
  MultiSelects,
  Inputs,
  Select,
} from "../types/card.type";

import styles from "./NewMember/NewMember.module.scss";
import { fetchGoogleSheetData } from "../hooks/data";

export async function getStaticProps() {
  const { blogs, updated } = await fetchGoogleSheetData();

  return {
    props: {
      blogs,
      updated,
    },
  };
}

interface NewMemberProps {
  blogs: CardType[];
  member: CardType;
  formSent: boolean;
  spam: string;
  formReady: boolean;
  updated: any;
}

const NewMember = ({ blogs, updated }: NewMemberProps) => {
  const [state, handleSubmit] = useForm("myzknpoj");

  const [member, setMember] = useState(emptyMember);
  const [formSent, setFormSent] = useState(false);
  const [spam, setSpam] = useState("");
  const [formReady, setFormReady] = useState(false);

  useMemo(() => {
    if (
      member.title !== "" &&
      member.description !== "" &&
      member.category !== ""
    ) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
  }, [member.title, member.description, member.category]);

  if (state.succeeded) {
    return (
      <DefaultLayout
        updated={updated}
        title={pagedata.title}
        description={pagedata.meta ?? pagedata.description}
      >
        <section>
          <h1>{pagedata.title}</h1>
          <p>{pagedata.description}</p>
          <p>{pagedata.form_submitted_message}</p>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout
      updated={updated}
      title={pagedata.title}
      description={pagedata.meta ?? pagedata.description}
    >
      <section>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          // method="POST"
          // action={process.env.NEXT_PUBLIC_SUBMIT_FORM}
        >
          <h1>{pagedata.title}</h1>
          <p>{pagedata.description}</p>
          {Object.keys(formdata).map((key) => {
            return formdata[key].type === "formarea" ? (
              <FormArea
                data={formdata[key as TextAreas]}
                key={key as TextAreas}
                name={key as TextAreas}
                value={member[key as TextAreas] || ""}
                onFieldChange={(e) =>
                  setMember({ ...member, [key as TextAreas]: e.target.value })
                }
              />
            ) : formdata[key].type === "select" ? (
              <FormSelectCategory
                data={formdata[key as Select]}
                key={key as Select}
                name={key as Select}
                member={member}
                onMemberSet={(type) => setMember({ ...member, category: type })}
                posts={blogs.filter((blog: CardType) =>
                  blog?.category?.toLowerCase().includes(member.category)
                )}
                onTagClick={(membertag) =>
                  setMember({
                    ...member,
                    tags: `${member.tags}, ${membertag}`,
                  })
                }
                onFieldChange={(e) =>
                  setMember({ ...member, [key as Select]: e.target.value })
                }
              />
            ) : formdata[key].type === "multiselect" ? (
              <FormTag
                data={formdata[key as MultiSelects]}
                key={key as MultiSelects}
                name={key as MultiSelects}
                memberTags={member[key as MultiSelects]}
                onValueUpdate={(membertags) =>
                  setMember({
                    ...member,
                    [key as MultiSelects]: `${
                      member[key as MultiSelects]
                    }, ${membertags}`,
                  })
                }
                onCloseClick={(tag: string) =>
                  setMember({
                    ...member,
                    [key]: `${member[key as MultiSelects]
                      .split(",")
                      .filter((t: string) => tag !== t)}`,
                  })
                }
                blogs={blogs}
              />
            ) : (
              <FormItem
                data={formdata[key as Inputs]}
                key={key as Inputs}
                name={key as Inputs}
                value={member[key as Inputs] || ""}
                onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMember({
                    ...member,
                    [key as Inputs]: e.target.value,
                  })
                }
              />
            );
          })}

          <FormItem
            name="email"
            value={member.email}
            onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMember({
                ...member,
                email: e.target.value,
              })
            }
          />

          <FormItem
            name="email"
            value={spam}
            error={spam != ""}
            success={spam === ""}
            onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSpam(e.target.value)
            }
          />

          <div>
            <button
              type="submit"
              disabled={!formReady}
              className={`${styles.submit} ${formSent && "green"} ${
                formReady ? "button-green" : "button-red"
              }`}
            >
              <span className="flex-center-hor">
                <FontAwesomeIcon
                  icon={formReady ? faCheck : faClose}
                  className={styles.icon}
                />
                {pagedata.submit_button}
              </span>
            </button>
          </div>
          <div style={{ marginTop: "-1rem" }}>
            {!formReady && (
              <div className="red flex-center-hor">
                {/* <FontAwesomeIcon icon={faClose} className={styles.icon} /> */}
                <p>{pagedata.required_fields_message}</p>
              </div>
            )}
            {formSent && (
              <div className="green flex-center-hor">
                <FontAwesomeIcon icon={faCheck} className={styles.icon} />
                <p>{pagedata.form_submitted_message}</p>
              </div>
            )}
            <p className={styles.helper}>{pagedata.helper}</p>
          </div>
        </form>
      </section>
    </DefaultLayout>
  );
};

export default NewMember;
