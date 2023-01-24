import React from "react";

import { ParMd } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { useDaoTokens } from "../hooks/useDaoTokens";
import { Claim } from "./Claim";
import { fromWei } from "@daohaus/utils";

export const HAUS_RPC = {
  "0x1": `https://787b6618b5a34070874c12d7157e6661.eth.rpc.rivet.cloud/`,
  "0x5": `https://787b6618b5a34070874c12d7157e6661.goerli.rpc.rivet.cloud/`,
  "0x64": "https://rpc.gnosischain.com/",
  "0xa": "https://mainnet.optimism.io",
  "0x89": "https://polygon-rpc.com/",
  "0xa4b1": "https://arb1.arbitrum.io/rpc",
  "0xa4ec": "https://forno.celo.org",
};

export const ClaimBalance = ({
  sharesSnapshot,
  lootSnapshot,
  sharesAddress,
  lootAddress,
  userBalance,
}: {
  sharesSnapshot: any;
  lootSnapshot: any;
  sharesAddress: any;
  lootAddress: any;
  userBalance: any;
}) => {
  const { chainId, provider, address } = useDHConnect();

  const { isIdle, isLoading, error, data, refetch } = useDaoTokens({
    sharesAddress: sharesAddress,
    lootAddress: lootAddress,
    sharesSnapshot: sharesSnapshot,
    lootSnapshot: lootSnapshot,
    userAddress: address,
    chainId: "0x5",
    rpcs: HAUS_RPC,
  });

  return (
    <>
      {userBalance ? (
        <ParMd>Claimed Balance: {userBalance}</ParMd>
      ) : (
        <ParMd>
          Claimable Balance: {data?.total}{" "}
          <Claim onSuccess={() => null}></Claim>
        </ParMd>
      )}
    </>
  );
};
