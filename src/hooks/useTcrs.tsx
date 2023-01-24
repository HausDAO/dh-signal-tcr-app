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

// TODO: types

export const useTcrList = ({ daoId }: { daoId: string }) => {
  const now = new Date().getTime() / 1000;
  const { data, ...rest } = useQuery(
    ["get-tcr-list", { daoId }],
    () =>
      graphQLClient.request(
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
        { daoId: daoId?.toLowerCase(), now: now.toFixed() }
      ),
    { enabled: !!daoId }
  );

  return {
    tcrList: data?.registries,
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
        `,
        { tcrId: tcrId?.toLowerCase() }
      ),
    { enabled: !!tcrId }
  );

  return {
    tcrRecord: data?.registry,
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
  };
};
