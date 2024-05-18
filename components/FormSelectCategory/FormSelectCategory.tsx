import { FormCategorySelects } from "../../types/form.type";
import FormTypes from "../FormTypes/FormTypes";
import FormSelect from "../FormSelect/FormSelect";
import FormTagsList from "../FormTagsList/FormTagsList";

export default function FormSelectCategory({
  data,
  name,
  member,
  onFieldChange,
  onMemberSet,
  onTagClick,
  posts,
}: FormCategorySelects) {
  return (
    <div>
      <FormSelect
        name={name}
        required={data?.required}
        label={data?.label}
        helper={data?.helper}
        chosen={member?.category}
        onFieldChange={onFieldChange}
      />
      <FormTypes memberType={member?.category} onMemberSet={onMemberSet} />
      {member?.category && (
        <>
          <p style={{ marginBottom: -28, fontSize: 12 }}>
            tags for existing category. Click to add to visible tags if any of
            them fits
          </p>
          <FormTagsList
            posts={posts}
            onTagClick={onTagClick}
            tags={member.tags}
            category={member.category}
          />
        </>
      )}
    </div>
  );
}
