import { POSTER_TAGS, ValidArgType, NestedArray } from "@daohaus/utils";
import { buildMultiCallTX } from "@daohaus/tx-builder";
import { CONTRACT } from "./contract";
import { pollLastTcrTX, testLastTcrTX } from "../utils/tcrTxHelpers";

export enum ProposalTypeIds {
  Signal = "SIGNAL",
  IssueSharesLoot = "ISSUE",
  AddShaman = "ADD_SHAMAN",
  TransferErc20 = "TRANSFER_ERC20",
  TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
  UpdateGovSettings = "UPDATE_GOV_SETTINGS",
  UpdateTokenSettings = "TOKEN_SETTINGS",
  TokensForShares = "TOKENS_FOR_SHARES",
  GuildKick = "GUILDKICK",
  WalletConnect = "WALLETCONNECT",
}

const nestInArray = (arg: ValidArgType | ValidArgType[]): NestedArray => {
  return {
    type: "nestedArray",
    args: Array.isArray(arg) ? arg : [arg],
  };
};

export const TX = {
  POST_SIGNAL: buildMultiCallTX({
    id: "POST_SIGNAL",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: "post",
        args: [
          {
            type: "JSONDetails",
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              contentURI: `.formValues.link`,
              contentURIType: { type: "static", value: "url" },
              proposalType: { type: "static", value: ProposalTypeIds.Signal },
            },
          },
          { type: "static", value: POSTER_TAGS.signalProposal },
        ],
      },
    ],
  }),
  SUMMON_TCR: buildMultiCallTX({
    id: "SUMMON_TCR",
    JSONDetails: {
      type: "JSONDetails",
      jsonSchema: {
        title: { type: "static", value: "Create a Signal TCR" },
        description: `.formValues.title`,
        contentURI: `.formValues.link`,
        contentURIType: { type: "static", value: "url" },
        proposalType: { type: "static", value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: CONTRACT.CURRENT_DAO,
        method: "executeAsBaal",
        args: [
          ".dao.sharesAddress",
          { type: "static", value: "0" },
          { type: "static", value: "0x9711715a" },
        ],
      },
      {
        contract: CONTRACT.CURRENT_DAO,
        method: "executeAsBaal",
        args: [
          ".dao.lootAddress",
          { type: "static", value: "0" },
          { type: "static", value: "0x9711715a" },
        ],
      },
      {
        contract: CONTRACT.TCR_FACTORY,
        method: "summonSignalTCR",
        args: [
          ".daoId",
          ".formValues.endDate",
          {
            type: "JSONDetails",
            jsonSchema: {
              title: `.formValues.title`,
              description: `.formValues.description`,
              link: `.formValues.link`,
              tags: `.formValues.tags`,
            },
          },
        ],
      },
    ],
  }),
  ADD_TCR_CHOICE: {
    id: "ADD_TCR_CHOICE",
    contract: CONTRACT.POSTER,
    method: "post",
    args: [
      {
        type: "JSONDetails",
        jsonSchema: {
          title: `.formValues.title`,
          description: `.formValues.description`,
          link: `.formValues.link`,
          youtube: `.formValues.youtube`,
          imgur: `.formValues.imgur`,
          daoId: `.daoId`,
          table: { type: "static", value: "signalTcrChoice" },
          queryType: { type: "static", value: "list" },
          tcrId: `.formValues.tcrId`,
          choiceId: `.formValues.choiceId`,
        },
      },
      { type: "static", value: POSTER_TAGS.daoDatabaseShares },
    ],
  },
  CLAIM: {
    id: "CLAIM",
    contract: CONTRACT.TCR,
    method: "claim",
    args: [".memberAddress"],
    customPoll: {
      fetch: pollLastTcrTX,
      test: testLastTcrTX,
    },
  },
  RELEASE: {
    id: "RELEASE",
    contract: CONTRACT.TCR,
    method: "releaseTokens",
    args: [".voteIds"],
    customPoll: {
      fetch: pollLastTcrTX,
      test: testLastTcrTX,
    },
  },
  STAKE: {
    id: "STAKE",
    contract: CONTRACT.TCR,
    method: "vote",
    customPoll: {
      fetch: pollLastTcrTX,
      test: testLastTcrTX,
    },
  },
};
