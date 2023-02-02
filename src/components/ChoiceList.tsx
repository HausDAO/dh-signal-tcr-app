import React, { useMemo, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { RiPlayListAddFill } from "react-icons/ri/index.js";

import { Button, DataMd, Bold } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { TARGET_DAO } from "../targetDao";
import { ChoiceItem } from "./ChoiceItem";
import { UpdateStake } from "./UpdateStake";
import { useDHConnect } from "@daohaus/connect";
import { ReleaseVotes } from "./ReleaseVotes";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { availableStake, isEmpty } from "../utils/tcrDataHelpers";
import { toWholeUnits, formatDistanceToNowFromSeconds } from "@daohaus/utils";
import { useQueryClient } from "react-query";

const TcrList = styled.div`
  margin: 5rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const ListActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;

const ListContainer = styled.div`
  /* max-height: 60rem; */
  /* overflow-y: auto; */
  /* margin-bottom: 5rem; */
  /* padding: 1rem; */
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

export const ChoiceList = ({ tcrId }: { tcrId: string }) => {
  const { address } = useDHConnect();
  const { tcr } = useParams();
  // const client = useQueryClient();

  const { records } = useRecords({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    recordType: "signalTcrChoice",
    tcrId: tcrId,
  });
  const { connectedVoter, refetch: refetchConnectedVoter } =
    useConnectedAddressVotes({
      tcrId: tcr,
      address: address,
    });
  const { tcrRecord } = useTcrData({ tcrId: tcr });

  const [stakeAmounts, setStakeAmounts] = useState({});

  const pointsAvailable = useMemo(() => {
    if (!connectedVoter) {
      return false;
    }
    const available = availableStake(stakeAmounts, connectedVoter.balance);
    return Number(available) >= 0 ? toWholeUnits(available) : false;
  }, [connectedVoter, stakeAmounts]);

  return (
    <>
      {records && (
        <TcrList>
          <ListHeader>
            <DataMd>
              <Bold>
                Ends {formatDistanceToNowFromSeconds(tcrRecord.endDate)}
              </Bold>
            </DataMd>
            <StyledRouterLink to={`/tcr/${tcr}/add-choice`}>
              <Button
                variant="ghost"
                color="secondary"
                disabled={!connectedVoter}
                IconLeft={RiPlayListAddFill}
              >
                Add Choice
              </Button>
            </StyledRouterLink>
          </ListHeader>

          <ListContainer>
            {records.map((choice: any) => {
              return (
                <div key={choice.id}>
                  <ChoiceItem
                    choice={choice}
                    setStakeAmounts={setStakeAmounts}
                    stakeAmounts={stakeAmounts}
                    pointsAvailable={pointsAvailable}
                  />
                </div>
              );
            })}
          </ListContainer>
          <ListActions>
            <ReleaseVotes
              onSuccess={() => {
                refetchConnectedVoter();
              }}
              voteIds={connectedVoter?.votes.map((v: any) => v.voteId)}
              label="Release All"
              disabled={!connectedVoter || connectedVoter?.votes.length === 0}
            />
            <UpdateStake
              onSuccess={() => {
                setStakeAmounts({});
                refetchConnectedVoter();
              }}
              stakeAmounts={stakeAmounts}
              disabled={
                !connectedVoter || isEmpty(stakeAmounts) || !pointsAvailable
              }
            />
          </ListActions>
        </TcrList>
      )}
    </>
  );
};
