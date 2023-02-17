import React from "react";

import styled from "styled-components";
import { ParMd, Theme, Tooltip, LgTooltipIcon } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { useDaoTokens } from "../hooks/useDaoTokens";
import { Claim } from "./Claim";
import { toWholeUnits } from "@daohaus/utils";
import { useConnectedAddressVotes } from "../hooks/useTcrs";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { HAUS_RPC } from "@daohaus/keychain-utils";

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
  const { connectedVoter, remove, refetch } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });

  return (
    <>
      {connectedVoter?.balance ? (
        <div style={{display: "flex", alignItems: "center"}}>
        <BalanceContainer>
          <ParMd>
            {toWholeUnits(connectedVoter?.balance)} /{" "}
            {toWholeUnits(connectedVoter?.initialClaim || "0")} PUB Points
          </ParMd>
          
        </BalanceContainer>
        <Tooltip
              content="PUB Points represent the amount of PUB you held when this Strategic Signal Session began. You can use PUB Points to signal your support for HILOs." 
              triggerEl={<LgTooltipIcon />}
            />
        </div>
      ) : (
        <>
          {data?.total && +data.total > 0 ? (
            <>
              <Claim
                onSuccess={() => {
                  remove();
                  refetch();
                }}
                label={`Claim ${data?.total} PUB Points`}
              / >
              <Tooltip
                content="Claim your PUB Points to Signal on HILOs below. PUB Points represent the number of PUB you held when this Signal Session began." 
                triggerEl={<LgTooltipIcon />}
              />
            </>
          ) : (
            <BalanceContainer>
              <ParMd>Account not eligible</ParMd>
              <Tooltip
                content="You must be a Citizen and hold PUB to participate in Strategic Signal Sessions." 
                triggerEl={<LgTooltipIcon />}
              />
            </BalanceContainer>
          )}
        </>
      )}
    </>
  );
};
