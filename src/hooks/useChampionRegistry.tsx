import { useQuery } from "react-query";

import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain, HAUS_RPC } from "@daohaus/keychain-utils";
import { fromWei } from "@daohaus/utils";

import ChampionRegistryAbi from "../abis/ChampionRegistry.json";
import { useDebugValue } from "react";

const fetchChampions = async ({
  registryAddress,
  chainId,
  rpcs,
}: {
  registryAddress: any;

  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  // todo: error?
  const RegistryContract = createContract({
    address: registryAddress,
    abi: ChampionRegistryAbi,
    chainId,
    rpcs,
  });


  try {
    const champions: string[] = await RegistryContract.getMembers();

    // console.log("champions reg", champions);

    return {
      champions: champions.map((c: any) => c.account.toLowerCase()),
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useChampionRegistry = ({
  registryAddress,
  chainId,
  rpcs,
}: {
  registryAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    ["championData", { registryAddress }],
    () =>
      fetchChampions({
        registryAddress,
        chainId,
        rpcs,
      }),
    { enabled: !!registryAddress }
  );
  useDebugValue(data ?? "Loading");

  return { data, ...rest };
};
