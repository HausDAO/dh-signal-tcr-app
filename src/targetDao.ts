import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {
  [key: string]: {
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
    TCR_FACTORY: string;
    HOME_PAR: string;
    DAO_INFO_URL?: string;
  };
} = {
  "0xc035": {
    ADDRESS: "0x3dea7058a19bf6854bb63384707139636efb99ea",
    SAFE_ADDRESS: "0x47f327bdde3c92d82872d686bb6d7a994c22b4a5",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://publichaus.club/`,
    HOME_PAR:
      "This is where members signal on High Level Objectives (HILO) and ecosystem contribution and output (Retroactive Grading Events).",
  },
  "0xf844": {
    ADDRESS: "0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923",
    SAFE_ADDRESS: "0xeb0dc703b854791914f30b5a73dd04d8d22a9aff",
    CHAIN_ID: "0x1",
    TCR_FACTORY: "0x8E7d5b1EB2d2d212574eF363168e5B2ba750b20e",
    DAO_INFO_URL: `https://publichaus.club/`,
    HOME_PAR:
      "This is where members signal on High Level Objectives (HILO) and ecosystem contribution and output (Retroactive Grading Events).",
  },
  "0xaf52": {
    ADDRESS: "0xaf52e108fe716261c35051517ce235a1e67c695a",
    SAFE_ADDRESS: "0x19cbb9c15b674089d589a6a4a97ff69695f09841",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://en.wikipedia.org/wiki/Amaro_(liqueur)`,
    HOME_PAR: `We love Amaro! We also can't ever remember all of the names and types. As 2023 is the year of the TCR, we've dedicated ourselves to curating a list of Amaro varieties. You can watch the list grow right here.`,
  },
  "0x1490": {
    ADDRESS: "0x1490062bcc6e421ef77568be9fa6f8b175e1d603",
    SAFE_ADDRESS: "0x1755d0bce90dfc128c83d9fa234d119e46c94dd5",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://en.wikipedia.org/wiki/Amaro_(liqueur)`,
    HOME_PAR: `Test out some signal TCRs below!`,
  },
};
