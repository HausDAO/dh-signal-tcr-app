import { gql, GraphQLClient } from "graphql-request";
import { TARGET_DAO } from "../targetDao";
import { DEFAULT_GRAPH_URL, TCR_GRAPH_URL } from "./tcrContracts";
import { useParams } from "react-router-dom";
import { ValidNetwork } from "@daohaus/keychain-utils";

// eslint-disable-next-line
type PollFetch = (...args: any) => Promise<any>;
type PollTest = (result?: any) => boolean;

export const pollLastTcrTX: PollFetch = async ({
  txHash,
  chainid
}: {
  txHash: string;
  chainid: string;
}) => {
  
  // TODO: is this inside bad?
  const API_URL = TCR_GRAPH_URL[chainid as ValidNetwork];
  const graphQLClient = new GraphQLClient(API_URL || DEFAULT_GRAPH_URL);
  
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
