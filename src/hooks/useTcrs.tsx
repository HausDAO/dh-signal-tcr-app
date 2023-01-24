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
    const now = new Date().getTime() / 1000;
    const getRegistries = await graphQLClient.request(
      gql`
        query registries($daoId: String!, $now: String!) {
          registries(where: { dao: $daoId, endDate_gt: $now }) {
            id
            details
            endDate
            dao
            createdAt
          }
        }
      `,
      { daoId, now: now.toFixed(0) }
    );

    return getRegistries;
    // returns { data, error, isSuccess, isLoading }
  });
};

export const useTcrData = ({ tcrId }: { tcrId?: string }) => {
  return useQuery("get-tcr", async () => {
    const baseQuery = gql`
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
            votes(where: { released: false }) {
              voteId
              choiceId
              amount
              released
            }
          }
          votes(where: { released: false }) {
            voteId
            choiceId
            amount
            released
          }
        }
      }
    `;

    const getRegistry = await graphQLClient.request(baseQuery, {
      tcrId: tcrId?.toLowerCase(),
    });

    return getRegistry;
    // returns { data, error, isSuccess, isLoading }
  });
};

export const useConnectedAddressVotes = ({
  tcrId,
  address,
}: {
  tcrId?: string;
  address: string | undefined | null;
}) => {
  console.log("address", address);

  const { data, ...rest } = useQuery(
    ["get-connected-address-votes", { address, tcrId }],
    () =>
      graphQLClient.request(
        gql`
          query voter($tcrId: String!, $address: String!) {
            votes(
              where: { registry: $tcrId, address: $address, released: false }
            ) {
              voteId
              choiceId
              amount
              released
            }
          }
        `,
        { tcrId: tcrId?.toLowerCase(), address: address?.toLowerCase() }
      ),
    { enabled: !!address }
  );

  console.log("data", data);

  // // return getRegistry;
  // return {
  //   voters: getRegistry.voters,
  //   error: getRegistry.error,
  //   isSuccess: getRegistry.isSuccess,
  //   isLoading: getRegistry.isLoading,
  // };
};
