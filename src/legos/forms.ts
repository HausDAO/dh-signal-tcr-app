import { FormLego } from "@daohaus/form-builder";
import { CustomFormLego } from "./config";
import { FIELD } from "./fields";
import { TX } from "./tx";

export const FORM: Record<string, CustomFormLego> = {
  SIGNAL: {
    id: "SIGNAL",
    title: "Signal Form",
    subtitle: "Signal Proposal",
    description: "Ratify on-chain using a DAO proposal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  SUMMON_TCR: {
    id: "SUMMON_TCR",
    title: "Create Signal",
    description: "Make a proposal to the DAO to create a Signal TCR",
    requiredFields: { title: true, endDate: true, description: true },
    log: true,
    tx: TX.SUMMON_TCR,
    fields: [
      { ...FIELD.TITLE, label: "Signal Title" },
      { ...FIELD.DESCRIPTION, label: "Signal Description" },
      FIELD.LINK,
      {
        id: "endDate",
        type: "input",
        label: "End Date/Time (seconds)",
        placeholder: "0",
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  ADD_TCR_CHOICE: {
    id: "ADD_TCR_CHOICE",
    title: "Add Signal Choice",
    description:
      "Create a choice for this Signal. You must be a member of the DAO to create a choice.",
    requiredFields: { title: true, description: true },
    log: true,
    // @ts-expect-error
    tx: TX.ADD_TCR_CHOICE,
    fields: [
      { ...FIELD.TITLE, label: "Choice Title" },
      { ...FIELD.DESCRIPTION, label: "Choice Description" },
      FIELD.LINK,
      // {id: 'stakeAmount', }
      {
        id: "choiceId",
        type: "choiceId",
      },
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};
