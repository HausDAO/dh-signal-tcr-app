import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  Card,
  DataLg,
  DataXl,
  H1,
  H5,
  Input,
  Link,
  ParLg,
  ParSm,
  ParXs,
  widthQuery,
} from "@daohaus/ui";
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

const ProposalCardContainer = styled(Card)`
  display: flex;
  gap: 3rem;
  width: 100%;

  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  min-height: 23.8rem;
  @media ${widthQuery.sm} {
    gap: 2rem;
    flex-direction: column;
    height: auto;
    margin-bottom: 2rem;
  }
`;

const LeftCard = styled.div`
  width: 60%;
  @media ${widthQuery.sm} {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 40%;

  @media ${widthQuery.sm} {
    max-width: 100%;
    min-width: 0;
  }
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

export const ChoiceItem = ({
  choice,
  setStakeAmounts,
}: {
  choice: TChoice;
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
    <>
      <ProposalCardContainer>
        <LeftCard>
          <H1>
            {toWholeUnits(
              totalStakeForChoice(
                tcrRecord?.votes || [],
                choice.parsedContent.choiceId
              )
            )}
          </H1>
          <ParSm>Total Points Staked</ParSm>
          <Spaced>
            <ParLg>{choice.parsedContent.title}</ParLg>
            <ParSm>{choice.parsedContent.description}</ParSm>
          </Spaced>
          {choice.parsedContent.link && (
            <Spaced>
              <Link linkType="external" href={choice.parsedContent.link}>
                <ParXs>More details</ParXs>
              </Link>
            </Spaced>
          )}
        </LeftCard>
        <RightCard>
          <DataLg>
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
        </RightCard>
      </ProposalCardContainer>
    </>
  );
};
