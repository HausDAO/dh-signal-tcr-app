import { FormLego } from "@daohaus/form-builder";
import { FIELD } from "./fields";
import { TX } from "./tx";

export const FORM: Record<string, FormLego> = {
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
    title: "Create TCR",
    description: "Make a proposal to the DAO to create a Signal TCR",
    requiredFields: { title: true, daoId: true },
    log: true,
    tx: TX.POST_SIGNAL,
    fields: [
      {
        id: "daoId",
        type: "input",
        label: "DAO Address",
        placeholder: "0x0...",
      },
      { ...FIELD.TITLE, label: "TCR Title" },
      { ...FIELD.DESCRIPTION, label: "TCR Description" },
      FIELD.LINK,
      // ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
};
