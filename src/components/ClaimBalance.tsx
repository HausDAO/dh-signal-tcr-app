import React from "react";

import styled, { DefaultTheme } from "styled-components";
import { ParMd, Theme } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { useDaoTokens } from "../hooks/useDaoTokens";
import { Claim } from "./Claim";
import { formatValueTo, toWholeUnits } from "@daohaus/utils";
import { useConnectedAddressVotes } from "../hooks/useTcrs";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { HAUS_RPC } from "@daohaus/keychain-utils";

const BalanceContainer = styled.div`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.success.step9};
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
      "0xa": `https://mainnet.optimism.io`,
      "0x64": HAUS_RPC["0x64"],
    },
  });
  const { connectedVoter, remove, refetch } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });

  return (
    <>
      {connectedVoter?.balance ? (
        <BalanceContainer>
          <ParMd>
            {formatValueTo({
              value: toWholeUnits(connectedVoter?.balance),
              decimals: 2,
              format: "number",
            })}{" "}
            / {/* {toWholeUnits(connectedVoter?.balance)} /{" "} */}
            {formatValueTo({
              value: toWholeUnits(connectedVoter?.initialClaim || "0"),
              decimals: 2,
              format: "number",
            })}
          </ParMd>
        </BalanceContainer>
      ) : (
        <>
          {data?.total && +data.total > 0 ? (
            <Claim
              onSuccess={() => {
                remove();
                refetch();
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
