import { CoreFieldLookup } from "@daohaus/form-builder";
// s
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { ChoiceIdInput } from "../components/customFields/ChoiceIdInput";

export const CustomFields = {
  ...CoreFieldLookup,
  choiceId: ChoiceIdInput,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
