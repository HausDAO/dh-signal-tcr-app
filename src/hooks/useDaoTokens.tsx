import { useQuery } from "react-query";

import { ValidNetwork, Keychain, HAUS_RPC } from "@daohaus/keychain-utils";
import { createViemClient, fromWei } from "@daohaus/utils";

import DaoTokenAbi from "../abis/DaoToken.json";
import { useDebugValue } from "react";

const fetchUserBalance = async ({
  sharesAddress,
  lootAddress,
  sharesSnapshot,
  lootSnapshot,
  userAddress,
  chainId,
  rpcs,
}: {
  sharesAddress: any;
  lootAddress: any;
  sharesSnapshot: string;
  lootSnapshot: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  // todo: error?
  const client = createViemClient({
    chainId,
  });

  try {
    const sharesAt: string = (await client.readContract({
      abi: DaoTokenAbi,
      address: sharesAddress,
      functionName: 'balanceOfAt',
      args: [
        userAddress,
      sharesSnapshot
      ],
    })) as string;


    const lootAt: string = (await client.readContract({
      abi: DaoTokenAbi,
      address: lootAddress,
      functionName: 'balanceOfAt',
      args: [
        userAddress,
      sharesSnapshot
      ],
    })) as string;

    return {
      sharesAt: sharesAt,
      lootAt: lootAt,
      total: fromWei((BigInt(sharesAt) + BigInt(lootAt)).toString()),
      // memberAlocs: memberAlocs,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useDaoTokens = ({
  sharesAddress,
  lootAddress,
  sharesSnapshot,
  lootSnapshot,
  userAddress,
  chainId,
  rpcs,
}: {
  sharesAddress: string;
  lootAddress: string;
  sharesSnapshot: string;
  lootSnapshot: string;
  userAddress: string | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    ["memberData", { userAddress }],
    () =>
      fetchUserBalance({
        sharesAddress,
        lootAddress,
        sharesSnapshot,
        lootSnapshot,
        userAddress: userAddress as string,
        chainId,
        rpcs,
      }),
    { enabled: !!userAddress }
  );
  useDebugValue(data ?? "Loading");

  return { data, ...rest };
};
