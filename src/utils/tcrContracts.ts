import { Keychain } from "@daohaus/keychain-utils";

export const DEFAULT_GRAPH_URL =
  `https://gateway-arbitrum.network.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY_MAINNET}/subgraphs/id/w2XuZdUEdkrXwaT5T3hfCxMjvG3e4BBJ5q3RquCygBQ`;

export const TCR_GRAPH_URL: Keychain = {
  "0x1": `https://gateway-arbitrum.network.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY_MAINNET}/subgraphs/id/CXBMbGqinokR79QvcQDDiFgmh6TgCZwRDazAQV5KzhQA`,
  "0x5": `https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli`,
  "0xa":
    `https://gateway-arbitrum.network.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY_MAINNET}/subgraphs/id/w2XuZdUEdkrXwaT5T3hfCxMjvG3e4BBJ5q3RquCygBQ`,
  "0x64":
    `https://gateway-arbitrum.network.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY_MAINNET}/subgraphs/id/72rFzkCCDfgXLb4iyxhsE5r1QF4gZBB7jMqasZnFq2Vc`,
  "0xaa36a7":
    `https://gateway-arbitrum.network.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY_MAINNET}/subgraphs/id/EDn7ojS6jcbwsm7UHrZwW75CeQhXGTGDpAjZFJ6Dej4B`,
};

