// useRequest.js
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli`;

const graphQLClient = new GraphQLClient(API_URL);

export type ListTcr = {
  id: string;
  details: string;
  endDate: string;
  dao: string;
  createdAt: string;
};

// TODO: this won't scale - need pagination if this grows
// TODO: shape more like our hooks
// TODO: need to create types
export const useTcrList = ({ daoId }: { daoId: string }) => {
  return useQuery("get-tcr-list", async () => {
    const getRegistries = await graphQLClient.request(
      gql`
        query registries($daoId: String!) {
          registries(where: { dao: $daoId }) {
            id
            details
            endDate
            dao
            createdAt
          }
        }
      `,
      { daoId }
    );

    return getRegistries;
    // returns { data, error, isSuccess, isLoading }
  });
};

export const useTcrData = ({ tcrId }: { tcrId: string }) => {
  return useQuery("get-tcr", async () => {
    const getRegistry = await graphQLClient.request(
      gql`
        query registry($tcrId: ID!) {
          registry(id: $tcrId) {
            id
            details
            dao
            createdAt
            sharesSnapshotId
            lootSnapshotId
            voters {
              address
              balance
              votes(where: { release: false }) {
                voteId
                choiceId
                amount
                released
              }
            }
            votes(where: { release: false }) {
              voteId
              choiceId
              amount
              released
            }
          }
        }
      `,
      { tcrId }
    );

    return getRegistry;
    // returns { data, error, isSuccess, isLoading }
  });
};
