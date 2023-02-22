import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  Button,
  Card,
  DataLg,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  H3,
  Input,
  Link,
  ParSm,
  ParXs,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import styled, { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import {
  isEmpty,
  totalStakeForChoice,
  voteIdsForChoice,
} from "../utils/tcrDataHelpers";
import { TChoice } from "../utils/types";
import { toBaseUnits, toWholeUnits } from "@daohaus/utils";
import { ReleaseVotes } from "./ReleaseVotes";
import { useDHConnect } from "@daohaus/connect";
import { VoterList } from "./VoterList";
import { useChampionRegistry } from "../hooks/useChampionRegistry";
import { TARGET_DAO } from "../targetDao";
import { HAUS_RPC } from "@daohaus/keychain-utils";

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

  /* .short-input {
    width: 30px;
  } */
`;

const LeftCard = styled.div`
  display: flex;
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
  justify-content: space-between;
  width: 40%;

  .subsection {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .point-input {
    align-items: flex-start;
  }

  @media ${widthQuery.sm} {
    max-width: 100%;
    min-width: 0;
  }
`;

const ChoiceContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

const DataH1 = styled(H1)`
  font-family: mono;
`;

const VotesButton = styled(Button)`
  min-width: 10.6rem;
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
  const { data } = useChampionRegistry({
    registryAddress: "0x76095061f675F4CcD86094b8ac9018fD96a70Fa3",
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    rpcs: {
      "0x1": `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
      "0x5": `https://${
        import.meta.env.VITE_RIVET_KEY
      }.goerli.rpc.rivet.cloud/`,
      "0x64": HAUS_RPC["0x64"],
    },
  });
  const { connectedVoter, refetch: refetchConnectedVoter } =
    useConnectedAddressVotes({
      tcrId: tcr,
      address: address,
    });
  const theme = useTheme();
  const isMobile = useBreakpoint(widthQuery.sm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "0" : event.target.value;

    if (Number(value)) {
      const newAmount = toBaseUnits(value);
      setStakeAmounts((prevState: any) => {
        return { ...prevState, [choice.parsedContent.choiceId]: newAmount };
      });
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
        <LeftCard>
          <div>
            <ParSm color={theme.secondary.step11}>Total Staked</ParSm>
            <DataH1>
              {toWholeUnits(
                totalStakeForChoice(
                  tcrRecord?.votes || [],
                  choice.parsedContent.choiceId
                )
              )}
            </DataH1>
            <Dialog>
              <DialogTrigger asChild>
                <VotesButton color="secondary" size="sm">
                  Stakers
                </VotesButton>
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
                  champions={data?.champions}
                />
              </DialogContent>
            </Dialog>
          </div>
          <ChoiceContent>
            <H3>{choice.parsedContent.title}</H3>
            <Spaced>
              <ParSm>{choice.parsedContent.description}</ParSm>
            </Spaced>
            {choice.parsedContent.link && (
              <Spaced>
                <Link href={choice.parsedContent.link}>
                  <ParXs>More details</ParXs>
                </Link>
              </Spaced>
            )}
          </ChoiceContent>
        </LeftCard>
        <RightCard>
          <div className="subsection">
            <ParSm color={theme.secondary.step11}>Your Stake</ParSm>
            <DataLg>
              {toWholeUnits(
                totalStakeForChoice(
                  connectedVoter?.votes || [],
                  choice.parsedContent.choiceId
                )
              )}
            </DataLg>
          </div>
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
          <div className="subsection point-input">
            {pointsAvailable && (
              <ParSm>Add Points ({pointsAvailable} available)</ParSm>
            )}
            {!pointsAvailable && (
              <ParSm color={theme.warning.step9}>Not enough points</ParSm>
            )}
            {!hasEnded && (
              <Input
                id={choice.parsedContent.choiceId}
                placeholder="0"
                onChange={handleChange}
                className="short-input"
                disabled={!connectedVoter}
                ref={pointInput}
              />
            )}
          </div>
        </RightCard>
      </ProposalCardContainer>
    </>
  );
};
