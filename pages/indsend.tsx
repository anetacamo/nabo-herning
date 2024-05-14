import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import FormArea from "../components/FormArea/FormArea";
import FormItem from "../components/FormItem/FormItem";
import FormSelect from "../components/FormSelect/FormSelect";
import FormTag from "../components/FormTag/FormTag";
import FormTypes from "../components/FormTypes/FormTypes";
import { DefaultLayout } from "../layouts/DefaultLayout/DefaultLayout";
import pagedata from "../texts/new-member.json";
import CardType, {
  emptyMember,
  TextAreas,
  MultiSelects,
  Inputs,
  Select,
} from "../types/card.type";

import styles from "./NewMember/NewMember.module.scss";
import { fetchGoogleSheetData } from "../hooks/data";
import FormTagsList from "../components/FormTagsList/FormTagsList";

export async function getStaticProps() {
  const blogs = await fetchGoogleSheetData();

  return {
    props: {
      blogs,
    },
  };
}

interface NewMemberProps {
  blogs: CardType[]; // Assuming you have a Blog type defined
  member: CardType;
  formSent: boolean;
  spam: string;
  formReady: boolean;
}

const NewMember = ({ blogs }: NewMemberProps) => {
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

  return (
    <DefaultLayout
      title={pagedata.title}
      description={pagedata.meta ?? pagedata.description}
    >
      <section>
        <form
          className={styles.form}
          method="POST"
          action={process.env.NEXT_PUBLIC_SUBMIT_FORM}
        >
          <h1>{pagedata.title}</h1>
          <p>{pagedata.description}</p>

          <FormItem
            name={pagedata.inputs[0].name as Inputs}
            required={pagedata.inputs[0].required}
            label={pagedata.inputs[0].label}
            helper={pagedata.inputs[0].helper}
            value={member[pagedata.inputs[0].name as Inputs] || ""}
            onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMember({
                ...member,
                [pagedata.inputs[0].name as Inputs]: e.target.value,
              })
            }
          />
          <FormItem
            name={pagedata.inputs[1].name as Inputs}
            required={pagedata.inputs[1].required}
            label={pagedata.inputs[1].label}
            helper={pagedata.inputs[1].helper}
            value={member[pagedata.inputs[1].name as Inputs] || ""}
            onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMember({
                ...member,
                [pagedata.inputs[1].name as Inputs]: e.target.value,
              })
            }
          />
          {pagedata.selects.map((item, index: number) => (
            <FormSelect
              key={index}
              name={item.name as Select}
              required={item.required}
              label={item.label}
              helper={item.helper}
              chosen={member.category}
              onFieldChange={(e) =>
                setMember({ ...member, [item.name]: e.target.value })
              }
            />
          ))}
          <FormTypes
            memberType={member.category}
            onMemberSet={(type) => setMember({ ...member, category: type })}
          />

          {member.category && (
            <>
              <p style={{ marginBottom: -28, fontSize: 12 }}>
                tags for existing category. Click to add to visible tags if any
                of them fits
              </p>
              <FormTagsList
                posts={blogs.filter((blog: Blog) =>
                  blog.type?.toLowerCase().includes(member.category)
                )}
                // onTagClick={onTagSet}
                onTagClick={(membertag) =>
                  setMember({
                    ...member,
                    tags: `...${member.tags}, ${membertag}`,
                  })
                }
                tags={member.tags}
                category={member.category}
              />
            </>
          )}
          {pagedata.multiselects.map((item, index: number) => (
            <FormTag
              key={index}
              name={item.name as MultiSelects}
              required={item.required}
              memberTags={member[item.name as MultiSelects]}
              label={item.label}
              helper={item.helper}
              onValueUpdate={(membertags) =>
                setMember({
                  ...member,
                  [item.name]: `${
                    member[item.name as MultiSelects]
                  }, ${membertags}`,
                })
              }
              onCloseClick={(tag: string) =>
                setMember({
                  ...member,
                  [item.name]: `${member[item.name as MultiSelects]
                    .split(",")
                    .filter((t: string) => tag !== t)}`,
                })
              }
              blogs={blogs}
            />
          ))}
          {pagedata.inputs.slice(2).map((item, index: number) => (
            <FormItem
              key={index}
              name={item.name as Inputs}
              required={item.required}
              label={item.label}
              helper={item.helper}
              value={member[item.name as Inputs] || ""}
              onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMember({ ...member, [item.name as Inputs]: e.target.value })
              }
            />
          ))}
          <FormItem
            name="email"
            value={spam}
            error={spam != ""}
            success={spam === ""}
            onFieldChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSpam(e.target.value)
            }
          />
          {pagedata.textAreas.map((item, index: number) => (
            <FormArea
              key={index}
              name={item.name as TextAreas}
              helper={item.helper}
              required={item.required}
              label={item.label}
              value={member[item.name as TextAreas] || ""}
              onFieldChange={(e) =>
                setMember({ ...member, [item.name]: e.target.value })
              }
            />
          ))}
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
                <FontAwesomeIcon icon={faClose} className={styles.icon} />
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
