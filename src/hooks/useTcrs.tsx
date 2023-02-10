// useRequest.js
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { TARGET_DAO } from "../targetDao";
import { DEFAULT_GRAPH_URL, TCR_GRAPH_URL } from "../utils/tcrContracts";

const API_URL =
  TCR_GRAPH_URL[TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID];

const graphQLClient = new GraphQLClient(API_URL || DEFAULT_GRAPH_URL);

export type ListTcr = {
  id: string;
  details: string;
  endDate: string;
  dao: string;
  createdAt: string;
};

// TODO: types

export const useTcrList = ({ daoId }: { daoId: string }) => {
  const now = new Date().getTime() / 1000;
  const { data, ...rest } = useQuery(
    ["get-tcr-list", { daoId }],
    () =>
      graphQLClient.request(
        gql`
          query registries($daoId: String!, $now: String!) {
            registries(
              where: { dao: $daoId }
              orderBy: endDate
              orderDirection: desc
            ) {
              id
              details
              endDate
              dao
              createdAt
            }
          }
        `,
        { daoId: daoId?.toLowerCase(), now: now.toFixed() }
      ),
    { enabled: !!daoId }
  );

  return {
    tcrList: data?.registries,
    ...rest,
  };
};

export const useTcrData = ({ tcrId }: { tcrId?: string }) => {
  const { data, ...rest } = useQuery(
    ["get-tcr", { tcrId }],
    () =>
      graphQLClient.request(
        gql`
          query registry($tcrId: ID!) {
            registry(id: $tcrId) {
              id
              details
              endDate
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
                  voterAddress
                }
              }
              votes(where: { released: false }) {
                voteId
                choiceId
                amount
                released
                voterAddress
              }
            }
          }
        `,
        { tcrId: tcrId?.toLowerCase() }
      ),
    { enabled: !!tcrId }
  );

  return {
    tcrRecord: data?.registry,
    ...rest,
  };
};

export const useConnectedAddressVotes = ({
  tcrId,
  address,
}: {
  tcrId?: string;
  address: string | undefined | null;
}) => {
  const { data, ...rest } = useQuery(
    ["get-connected-address-votes", { address, tcrId }],
    () =>
      graphQLClient.request(
        gql`
          query voter($tcrId: String!, $address: String!) {
            voters(where: { registry: $tcrId, address: $address }) {
              id
              createdAt
              balance
              address
              initialClaim
              votes(where: { released: false }) {
                voteId
                choiceId
                amount
                released
              }
            }
          }
        `,
        { tcrId: tcrId?.toLowerCase(), address: address?.toLowerCase() }
      ),
    { enabled: !!address && !!tcrId }
  );

  return {
    connectedVoter: data?.voters[0],
    ...rest,
  };
};
