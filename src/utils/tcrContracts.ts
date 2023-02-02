import { Keychain } from "@daohaus/keychain-utils";

export const DEFAULT_GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli";

export const TCR_GRAPH_URL: Keychain = {
  "0x1": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr",
  "0x5": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli",
  "0x64":
    "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-gnosis",
};
