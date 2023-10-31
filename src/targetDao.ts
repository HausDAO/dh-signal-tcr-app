import { ValidNetwork } from "@daohaus/keychain-utils";

export const REPO = "https://github.com/HausDAO/dh-signal-tcr-app/pulls";

export const TARGETS: {
  TCR_FACTORIES: {
    [key: string]: string;
  };
} = {
  TCR_FACTORIES: {
    "0x1": "0x8E7d5b1EB2d2d212574eF363168e5B2ba750b20e",
    "0x5": "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    "0xa": "0x29ff7b9c945158ccd973b7c190a73ab9e110fc74",
    "0x64": "0x3F0443a6985b0AB585D376cC84f6d42e74A3e1F1",
  }
}

export const TARGET_DAO: {
  [key: string]: {
    NAME: string;
    ADDRESS: string;
    SAFE_ADDRESS: string;
    CHAIN_ID: ValidNetwork;
    TCR_FACTORY: string;
    HOME_PAR: string;
    DAO_INFO_URL?: string;
    HIDE_LIST?: string;
  };
} = {
  "0x3dea7058a19bf6854bb63384707139636efb99ea": {
    NAME: "RAIDBROOD Goerli",
    ADDRESS: "0x3dea7058a19bf6854bb63384707139636efb99ea",
    SAFE_ADDRESS: "0x47f327bdde3c92d82872d686bb6d7a994c22b4a5",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://publichaus.club/`,
    HOME_PAR:
      "This is where members signal on High Level Objectives (HILO) and ecosystem contribution and output (Retroactive Grading Events).",
  },
  "0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923": {
    NAME: "PublicHAUS Mainnet",
    ADDRESS: "0xf844b98df9ccdfbe5d460d0d7bdca232cf9da923",
    SAFE_ADDRESS: "0xeb0dc703b854791914f30b5a73dd04d8d22a9aff",
    CHAIN_ID: "0x1",
    TCR_FACTORY: "0x8E7d5b1EB2d2d212574eF363168e5B2ba750b20e",
    DAO_INFO_URL: `https://publichaus.club/`,
    HOME_PAR:
      "This is where members signal on High Level Objectives (HILO) and ecosystem contribution and output (Retroactive Grading Events).",
  },
  "0xaf52e108fe716261c35051517ce235a1e67c695a": {
    NAME: "Amaro",
    ADDRESS: "0xaf52e108fe716261c35051517ce235a1e67c695a",
    SAFE_ADDRESS: "0x19cbb9c15b674089d589a6a4a97ff69695f09841",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://en.wikipedia.org/wiki/Amaro_(liqueur)`,
    HOME_PAR: `We love Amaro! We also can't ever remember all of the names and types. As 2023 is the year of the TCR, we've dedicated ourselves to curating a list of Amaro varieties. You can watch the list grow right here.`,
  },
  "0x140x1490062bcc6e421ef77568be9fa6f8b175e1d60390": {
    NAME: "Amaro Goerli",
    ADDRESS: "0x1490062bcc6e421ef77568be9fa6f8b175e1d603",
    SAFE_ADDRESS: "0x1755d0bce90dfc128c83d9fa234d119e46c94dd5",
    CHAIN_ID: "0x5",
    TCR_FACTORY: "0x017eD0e82bCD242C7Cd89F02c2Eee9826BEaBC67",
    DAO_INFO_URL: `https://en.wikipedia.org/wiki/Amaro_(liqueur)`,
    HOME_PAR: `Test out some signal TCRs below!`,
  },
  "0xe11f0eb60de58f62b77bda48bbda23056b2a5170": {
    NAME: "AUTOMATON Gnosis",
    ADDRESS: "0xe11f0eb60de58f62b77bda48bbda23056b2a5170",
    SAFE_ADDRESS: "0x4db5161f20572d44d09a034b601d85db7e809ae8",
    CHAIN_ID: "0x64",
    TCR_FACTORY: "0x3F0443a6985b0AB585D376cC84f6d42e74A3e1F1",
    HOME_PAR: `AUTOMATON ENGAGE`,
  },
  "0xc17f71ecd0c9d8a5ecc455c56ec553d14505d769": {
    NAME: "RAIDBROOD",
    ADDRESS: "0xc17f71ecd0c9d8a5ecc455c56ec553d14505d769",
    SAFE_ADDRESS: "0x96b0d2077f740c861cc7ed322ae20153ea80da74",
    CHAIN_ID: "0x64",
    TCR_FACTORY: "0x3F0443a6985b0AB585D376cC84f6d42e74A3e1F1",
    HOME_PAR: `We make lists of beers!`,
    HIDE_LIST: "0x2cf1bdc2d0267d1790a50672acefece59d48305d",
  },
  "0xf5d6b637a9185707f52d40d452956ca49018247a": {
    NAME: "PublicHAUS Optimism",
    ADDRESS: "0xf5d6b637a9185707f52d40d452956ca49018247a",
    SAFE_ADDRESS: "0xf84f1ad490029716d8a599613bb8671f56bfbbdc",
    CHAIN_ID: "0xa",
    TCR_FACTORY: "0x29ff7b9c945158ccd973b7c190a73ab9e110fc74",
    DAO_INFO_URL: `https://publichaus.club/`,
    HOME_PAR: `OP PublicHAUS Signal Sessions`,
  },
  "0xf02fd4286917270cb94fbc13a0f4e1ed76f7e986": {
    NAME: "RaidGuild",
    ADDRESS: "0xf02fd4286917270cb94fbc13a0f4e1ed76f7e986",
    SAFE_ADDRESS: "0x181ebdb03cb4b54f4020622f1b0eacd67a8c63ac",
    CHAIN_ID: "0x64",
    TCR_FACTORY: "0x3F0443a6985b0AB585D376cC84f6d42e74A3e1F1",
    DAO_INFO_URL: `https://raidguild.org`,
    HOME_PAR: `RaidGuild Signal Sessions`,
  },
};
