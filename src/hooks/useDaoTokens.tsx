import { useQuery } from "react-query";

import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain, HAUS_RPC } from "@daohaus/keychain-utils";
import { fromWei, nowInSeconds } from "@daohaus/utils";

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
  const SharesContract = createContract({
    address: sharesAddress,
    abi: DaoTokenAbi,
    chainId,
    rpcs,
  });
  const LootContract = createContract({
    address: lootAddress,
    abi: DaoTokenAbi,
    chainId,
    rpcs,
  });

  try {
    const sharesAt: string = await SharesContract.balanceOfAt(
      userAddress,
      sharesSnapshot
    );

    const lootAt: string = await LootContract.balanceOfAt(
      userAddress,
      lootSnapshot
    );

    return {
      sharesAt: sharesAt,
      lootAt: lootAt,
      total: fromWei((parseInt(sharesAt) + parseInt(lootAt)).toString()),
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
