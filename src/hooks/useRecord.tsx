import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { listRecords } from "@daohaus/moloch-v3-data";
import { handleErrorMessage } from "@daohaus/utils";

const defaultGraphApiKeys = {
  "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xa":  import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
};

const fetchRecords = async ({
  daoId,
  chainId,
  recordType,
  pageSize,
  offset,
  graphApiKeys,
  tcrId,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
  tcrId?: string;
}) => {
  try {
    const data = await listRecords({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
      filter: { dao: daoId, table: recordType },
      paging: { pageSize, offset },
    });

    if (tcrId) {
      return data.items.filter(
        (item: any) => item?.parsedContent?.tcrId === tcrId
      );
    }
    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching records" })
    );
  }
};

export const useRecords = ({
  daoId,
  chainId,
  recordType,
  pageSize = 500,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
  tcrId,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
  tcrId?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`${tcrId}_${recordType}`, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        recordType,
        pageSize,
        offset,
        graphApiKeys,
        tcrId,
      }),
    { enabled: !!daoId && !!chainId }
  );

  return { records: data, error: error as Error | null, ...rest };
};
