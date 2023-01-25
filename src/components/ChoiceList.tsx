import React, { useState } from "react";
import styled from "styled-components";

import { H5 } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { TARGET_DAO } from "../targetDao";
import { ChoiceItem } from "./ChoiceItem";
import { UpdateStake } from "./UpdateStake";
import { useDHConnect } from "@daohaus/connect";
import { ReleaseVotes } from "./ReleaseVotes";
import { useConnectedAddressVotes } from "../hooks/useTcrs";
import { useParams } from "react-router-dom";

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
  gap: 5rem;
  margin-bottom: 3rem;
`;

const ListActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;

const ListContainer = styled.div`
  max-height: 60rem;
  overflow-y: auto;
  margin-bottom: 5rem;
  padding: 1rem;
`;

export const ChoiceList = ({ tcrId }: { tcrId: string }) => {
  const { address } = useDHConnect();
  const { tcr } = useParams();

  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: "signalTcrChoice",
    tcrId: tcrId,
  });
  const { connectedVoter } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });
  const [stakeAmounts, setStakeAmounts] = useState([]);

  return (
    <>
      {records && (
        <TcrList>
          <ListHeader>
            <div>
              <H5>Signal Choices</H5>
            </div>
          </ListHeader>

          <ListContainer>
            {records.map((choice: any) => {
              return (
                <div key={choice.id}>
                  <ChoiceItem
                    choice={choice}
                    setStakeAmounts={setStakeAmounts}
                  />
                </div>
              );
            })}
          </ListContainer>
          <ListActions>
            <ReleaseVotes
              onSuccess={() => null}
              voteIds={connectedVoter?.votes.map((v: any) => v.voteId)}
              label="Release All"
              disabled={!connectedVoter || connectedVoter?.votes.length === 0}
            />
            <UpdateStake
              onSuccess={() => setStakeAmounts([])}
              stakeAmounts={stakeAmounts}
              disabled={!connectedVoter || stakeAmounts.length === 0}
            />
          </ListActions>
        </TcrList>
      )}
    </>
  );
};
