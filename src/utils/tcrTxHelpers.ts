import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { IFindQueryResult } from "@daohaus/data-fetch-utils";
import { gql, GraphQLClient } from "graphql-request";
import { TARGET_DAO } from "../targetDao";

// eslint-disable-next-line
type PollFetch = (...args: any) => Promise<any>;
type PollTest = (result?: any) => boolean;

const API_URL = TARGET_DAO[import.meta.env.VITE_TARGET_KEY].TCR_GRAPH_URL;

const graphQLClient = new GraphQLClient(API_URL);

export const pollLastTcrTX: PollFetch = async ({
  txHash,
}: {
  txHash: string;
}) => {
  try {
    const result = await graphQLClient.request(
      gql`
        query eventTransaction($txHash: String!) {
          eventTransaction(id: $txHash) {
            id
          }
        }
      `,
      { txHash: txHash }
    );

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const testLastTcrTX: PollTest = (result: any | undefined) => {
  if (result?.eventTransaction) {
    return true;
  }
  return false;
};
