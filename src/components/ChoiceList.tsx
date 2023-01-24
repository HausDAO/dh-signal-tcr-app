import React, { useEffect, useState } from "react";
import { Button, H5, ParLg } from "@daohaus/ui";
import styled from "styled-components";
import { useRecords } from "../hooks/useRecord";
import { TARGET_DAO } from "../targetDao";
import { ChoiceItem } from "./ChoiceItem";
import { UpdateStake } from "./UpdateStake";
import { useConnectedAddressVotes } from "../hooks/useTcrs";
import { useDHConnect } from "@daohaus/connect";
import { TChoice } from "../utils/types";
import { totalStakeForChoice } from "../utils/tcrDataHelpers";

const TcrList = styled.div`
  margin: 5rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
  gap: 5rem;
`;
export const ChoiceList = ({ tcrId }: { tcrId: string }) => {
  const { address } = useDHConnect();
  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: "signalTcrChoice",
    tcrId: tcrId,
  });
  const { connectedVoter } = useConnectedAddressVotes({
    tcrId,
    address: address,
  });

  const [stakeAmounts, setStakeAmounts] = useState({});

  useEffect(() => {
    if (records && connectedVoter) {
      console.log("connectedVoter", connectedVoter);
      const currentStake = records.reduce((acc: any, choice: any) => {
        acc[choice.parsedContent.choiceId] = totalStakeForChoice(
          connectedVoter.votes,
          choice.parsedContent.choiceId
        );
        return acc;
      }, {});

      console.log("currentStake", currentStake);

      setStakeAmounts(currentStake);
    }
  }, [records, connectedVoter]);

  return (
    <>
      {records && (
        <TcrList>
          <ListHeader>
            <H5>Signal Choices</H5>

            <UpdateStake onSuccess={() => null} stakeAmounts={stakeAmounts} />
          </ListHeader>

          {records.map((choice: any, i: number) => {
            return (
              <div key={choice.id}>
                <ChoiceItem
                  choice={choice}
                  index={i}
                  // currentStake={totalStakeForChoice(
                  //   connectedVoter.votes,
                  //   choice.parsedContent.choiceId
                  // )}
                  stakeAmounts={stakeAmounts}
                  setStakeAmounts={setStakeAmounts}
                />
              </div>
            );
          })}
        </TcrList>
      )}
    </>
  );
};
