import { CoreFieldLookup } from "@daohaus/form-builder";
// s
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { ChoiceIdInput } from "../components/customFields/ChoiceIdInput";
import { ChoiceStakeInput } from "../components/customFields/ChoiceStakeInput";

export const CustomFields = {
  ...CoreFieldLookup,
  choiceId: ChoiceIdInput,
  stakeAmount: ChoiceStakeInput,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
