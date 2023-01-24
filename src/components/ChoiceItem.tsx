import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DataLg, H5, Input, ParLg } from "@daohaus/ui";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTcrData } from "../hooks/useTcrs";
import { totalStakeForChoice } from "../utils/tcrDataHelpers";
import { TChoice } from "../utils/types";
import { toBaseUnits, toWholeUnits } from "@daohaus/utils";

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
  stakeAmounts,
  setStakeAmounts,
}: {
  choice: TChoice;
  index: number;
  stakeAmounts: any;
  setStakeAmounts: Dispatch<SetStateAction<any>>;
}) => {
  const { tcr } = useParams();
  const { tcrRecord } = useTcrData({ tcrId: tcr });

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
          totalStakeForChoice(tcrRecord.votes, choice.parsedContent.choiceId)
        )}
      </DataLg>
      <ParLg>{choice.parsedContent.title}</ParLg>
      <DataLg>
        Current Stake:{" "}
        {toWholeUnits(
          totalStakeForChoice(tcrRecord.votes, choice.parsedContent.choiceId)
        )}
      </DataLg>
      Add:
      <Input
        id={choice.parsedContent.choiceId}
        defaultValue="0"
        onChange={handleChange}
      />
    </TcrListItem>
  );
};
