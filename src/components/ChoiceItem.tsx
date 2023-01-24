import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DataLg, H5, Input, ParLg } from "@daohaus/ui";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { totalStakeForChoice, voteIdsForChoice } from "../utils/tcrDataHelpers";
import { TChoice } from "../utils/types";
import { toBaseUnits, toWholeUnits } from "@daohaus/utils";
import { ReleaseVotes } from "./ReleaseVotes";
import { useDHConnect } from "@daohaus/connect";

const TcrListItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 5rem;
`;

export const ChoiceItem = ({
  choice,
  index,
  setStakeAmounts,
}: {
  choice: TChoice;
  index: number;
  setStakeAmounts: Dispatch<SetStateAction<any>>;
}) => {
  const { tcr } = useParams();
  const { address } = useDHConnect();
  const { tcrRecord } = useTcrData({ tcrId: tcr });
  const { connectedVoter } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      const newAmount = toBaseUnits(event.target.value);
      setStakeAmounts((prevState: any) => {
        return [...prevState, [choice.parsedContent.choiceId, newAmount]];
      });
    }
  };

  return (
    <TcrListItem>
      <DataLg>{index + 1}. </DataLg>
      <DataLg>
        Total Stake:{" "}
        {toWholeUnits(
          totalStakeForChoice(
            tcrRecord?.votes || [],
            choice.parsedContent.choiceId
          )
        )}
      </DataLg>
      <ParLg>{choice.parsedContent.title}</ParLg>
      <DataLg>
        Your Current Stake:{" "}
        {toWholeUnits(
          totalStakeForChoice(
            connectedVoter?.votes || [],
            choice.parsedContent.choiceId
          )
        )}
      </DataLg>
      <ReleaseVotes
        label="Release"
        size="sm"
        voteIds={voteIdsForChoice(
          connectedVoter?.votes || [],
          choice.parsedContent.choiceId
        )}
        onSuccess={() => null}
      />
      Add:
      <Input
        id={choice.parsedContent.choiceId}
        defaultValue="0"
        onChange={handleChange}
      />
    </TcrListItem>
  );
};
