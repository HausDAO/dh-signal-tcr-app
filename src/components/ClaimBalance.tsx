import React from "react";

import styled from "styled-components";
import { ParMd, Theme } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { useDaoTokens } from "../hooks/useDaoTokens";
import { Claim } from "./Claim";
import { toWholeUnits } from "@daohaus/utils";
import { useQueryClient } from "react-query";
import { useConnectedAddressVotes } from "../hooks/useTcrs";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { ValidNetwork } from "@daohaus/keychain-utils";

export const HAUS_RPC = {
  "0x1": `https://787b6618b5a34070874c12d7157e6661.eth.rpc.rivet.cloud/`,
  "0x5": `https://787b6618b5a34070874c12d7157e6661.goerli.rpc.rivet.cloud/`,
  "0x64": "https://rpc.gnosischain.com/",
  "0xa": "https://mainnet.optimism.io",
  "0x89": "https://polygon-rpc.com/",
  "0xa4b1": "https://arb1.arbitrum.io/rpc",
  "0xa4ec": "https://forno.celo.org",
};

const BalanceContainer = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.success.step9};
  border-radius: 0.4rem;
  padding: 1rem;
  p {
    font-weight: 700;
    color: black;
  }
`;

export const ClaimBalance = ({
  sharesSnapshot,
  lootSnapshot,
  sharesAddress,
  lootAddress,
}: {
  sharesSnapshot: any;
  lootSnapshot: any;
  sharesAddress: any;
  lootAddress: any;
}) => {
  const { address } = useDHConnect();
  const { tcr } = useParams();
  const { data } = useDaoTokens({
    sharesAddress: sharesAddress,
    lootAddress: lootAddress,
    sharesSnapshot: sharesSnapshot,
    lootSnapshot: lootSnapshot,
    userAddress: address,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    rpcs: {
      "0x1": `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
      "0x5": `https://${
        import.meta.env.VITE_RIVET_KEY
      }.goerli.rpc.rivet.cloud/`,
      "0x64": HAUS_RPC["0x64"],
    },
  });
  const { connectedVoter, refetch } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });
  const client = useQueryClient();

  return (
    <>
      {connectedVoter?.balance ? (
        <BalanceContainer>
          <ParMd>
            {toWholeUnits(connectedVoter?.balance)} /{" "}
            {toWholeUnits(connectedVoter?.initialClaim || "0")} Points
          </ParMd>
        </BalanceContainer>
      ) : (
        <>
          {data?.total && +data.total > 0 ? (
            <Claim
              onSuccess={() => {
                client.clear();
              }}
              label={`Claim ${data?.total} Points`}
            ></Claim>
          ) : (
            <BalanceContainer>
              <ParMd>Account not eligible</ParMd>
            </BalanceContainer>
          )}
        </>
      )}
    </>
  );
};
