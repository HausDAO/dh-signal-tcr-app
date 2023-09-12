import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Card,
  DataLg,
  DataXs,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  H2,
  H3,
  Input,
  Link,
  ParSm,
  ParXs,
  Theme,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { RiZoomInLine } from "react-icons/ri";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import {
  isEmpty,
  totalQuadraticVotesForChoice,
  totalStakeForChoice,
  totalVoterQuadraticVotesForChoice,
  voteIdsForChoice,
} from "../utils/tcrDataHelpers";
import { TChoice } from "../utils/types";
import { toBaseUnits, toWholeUnits } from "@daohaus/utils";
import { ReleaseVotes } from "./ReleaseVotes";
import { useDHConnect } from "@daohaus/connect";
import { VoterList } from "./VoterList";
import YoutubeEmbed from "./YouTubeEmbed";
import ReactMarkdown from "react-markdown";

const ProposalCardContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  width: 100%;

  margin-bottom: 3rem;
  padding: 2.3rem 2.5rem;
  border: none;
  min-height: 23.8rem;
`;

const ReactMarkdownContainer = styled(Card)`
  brder: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  font-size: 1.5rem;
`;

const StakeSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  .point-input {
    align-items: flex-start;
    margin-top: 1rem;
  }
`;

const StakeHeadline = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ChoiceContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

const DataH2 = styled(H2)`
  font-family: mono;
`;

const TotalSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const StakersIcon = styled(RiZoomInLine)`
  color: ${({ theme }) => theme.primary.step10};
  font-size: 2rem;

  &:hover {
    color: ${({ theme }) => theme.primary.step12};
    cursor: pointer;
  }
`;

export const ChoiceItem = ({
  choice,
  setStakeAmounts,
  stakeAmounts,
  pointsAvailable,
  hasEnded,
}: {
  choice: TChoice;
  setStakeAmounts: Dispatch<SetStateAction<any>>;
  stakeAmounts: any;
  pointsAvailable: string | boolean;
  hasEnded: boolean;
}) => {
  const { tcr } = useParams();
  const { address } = useDHConnect();
  const { tcrRecord } = useTcrData({ tcrId: tcr });
  const { connectedVoter, refetch: refetchConnectedVoter } =
    useConnectedAddressVotes({
      tcrId: tcr,
      address: address,
    });
  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.sm);
  const [touched, setTouched] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "0" : event.target.value;

    if (Number(value)) {
      const newAmount = toBaseUnits(value);
      setStakeAmounts((prevState: any) => {
        return { ...prevState, [choice.parsedContent.choiceId]: newAmount };
      });
      setTouched(true);
    } else {
      setStakeAmounts((prevState: any) => {
        const newObj = { ...prevState };
        delete newObj[choice.parsedContent.choiceId];
        return newObj;
      });
    }
  };

  const pointInput = useRef(null);

  useEffect(() => {
    if (isEmpty(stakeAmounts) && pointInput.current) {
      // @ts-ignore-error
      pointInput.current.value = "";
    }
  }, [stakeAmounts]);

  return (
    <>
      <ProposalCardContainer>
        <StakeSection>
          <StakeHeadline>
            <div>
              <TotalSection>
                <ParSm color={theme.secondary.step11}>Total Staked</ParSm>
                {tcrRecord?.voters && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div>
                        <StakersIcon />
                      </div>
                    </DialogTrigger>
                    <DialogContent
                      alignButtons="end"
                      rightButton={{
                        closeDialog: true,
                        fullWidth: isMobile,
                      }}
                      title="Stakers"
                    >
                      <VoterList
                        voters={tcrRecord?.voters}
                        choiceId={choice.parsedContent.choiceId}
                        champions={[]}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </TotalSection>
              <DataH2>
                {Number(
                  toWholeUnits(
                    totalStakeForChoice(
                      tcrRecord?.votes || [],
                      choice.parsedContent.choiceId
                    )
                  )
                ).toFixed(2)}{" "}
                /{" "}
                <span style={{ color: "red" }}>
                  {Number(
                    toWholeUnits(
                      totalQuadraticVotesForChoice(
                        tcrRecord?.voters,
                        choice.parsedContent.choiceId
                      )
                    )
                  ).toFixed(2)}
                </span>
              </DataH2>
            </div>
            <H2 style={{ marginBottom: "2rem" }}>
              {choice.parsedContent.title}
            </H2>
          </StakeHeadline>

          <div className="subsection">
            <ParSm color={theme.secondary.step11}>Your Stake</ParSm>
            <DataLg>
              {Number(
                toWholeUnits(
                  totalStakeForChoice(
                    connectedVoter?.votes || [],
                    choice.parsedContent.choiceId
                  )
                )
              ).toFixed(2)}{" "}
              /{" "}
              {Number(
                toWholeUnits(
                  totalVoterQuadraticVotesForChoice(
                    connectedVoter?.votes || [],
                    choice.parsedContent.choiceId
                  ).toString()
                )
              ).toFixed(2)}
            </DataLg>
            {!hasEnded && (
              <ReleaseVotes
                label={`Release`}
                size="sm"
                voteIds={voteIdsForChoice(
                  connectedVoter?.votes || [],
                  choice.parsedContent.choiceId
                )}
                onSuccess={() => {
                  refetchConnectedVoter();
                }}
              />
            )}
            <div className="subsection point-input">
              {pointsAvailable && !hasEnded && (
                <ParSm>Add Points ({pointsAvailable} available)</ParSm>
              )}
              {!pointsAvailable && !hasEnded && (
                <ParSm color={theme.warning.step9}>Not enough points</ParSm>
              )}
              {!hasEnded && (
                <>
                  <Input
                    id={choice.parsedContent.choiceId}
                    placeholder="0"
                    onChange={handleChange}
                    className="short-input"
                    disabled={!connectedVoter}
                    ref={pointInput}
                  />
                  {touched && <DataXs>save button is below</DataXs>}
                </>
              )}
            </div>
          </div>
        </StakeSection>
        <ChoiceContent>
          <ReactMarkdownContainer>
            <ReactMarkdown>{choice.parsedContent.description}</ReactMarkdown>
          </ReactMarkdownContainer>

          {choice.parsedContent.imgur && (
            <Spaced>
              <img src={choice.parsedContent.imgur} width="200px" />
            </Spaced>
          )}
          {choice.parsedContent.youtube && (
            <Spaced>
              <YoutubeEmbed embedId={choice.parsedContent.youtube} />
            </Spaced>
          )}
          {choice.parsedContent.link && (
            <Spaced>
              <Link href={choice.parsedContent.link}>
                <ParXs>More details</ParXs>
              </Link>
            </Spaced>
          )}
        </ChoiceContent>
      </ProposalCardContainer>
    </>
  );
};
