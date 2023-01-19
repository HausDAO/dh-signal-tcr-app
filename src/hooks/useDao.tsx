import { useQuery } from "react-query";

import { ValidNetwork } from "@daohaus/keychain-utils";
import { findDao, MolochV3Dao } from "@daohaus/moloch-v3-data";

const graphApiKeys = { "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const fetchDao = async ({
  daoId,
  chainId,
}: {
  daoId: string;
  chainId: ValidNetwork;
}) => {
  try {
    const res = await findDao({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
      dao: daoId,
      includeTokens: true,
    });

    return res.data?.dao as MolochV3Dao;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useDao = ({
  daoId,
  chainId,
}: {
  daoId: string;
  chainId: ValidNetwork;
}): { dao: MolochV3Dao | undefined } => {
  const { data, ...rest } = useQuery(
    ["dao", { daoId, chainId }],
    () =>
      fetchDao({
        daoId,
        chainId: chainId as ValidNetwork,
      }),
    { enabled: !!daoId && !!chainId }
  );

  return { dao: data };
};
