import { CoreFieldLookup } from "@daohaus/form-builder";
// s
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { ChoiceIdInput } from "../components/customFields/ChoiceIdInput";
import { ChoiceStakeInput } from "../components/customFields/ChoiceStakeInput";
import { DateInput } from "../components/customFields/DateInput";

export const CustomFields = {
  ...CoreFieldLookup,
  choiceId: ChoiceIdInput,
  stakeAmount: ChoiceStakeInput,
  dateField: DateInput,
};

export type CustomFieldLego = FieldLegoBase<typeof CustomFields>;
export type CustomFormLego = FormLegoBase<typeof CustomFields>;
