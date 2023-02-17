import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toWholeUnits } from "@daohaus/utils";
import { ValidNetwork } from "@daohaus/keychain-utils";

import { DataMd, MemberCard, ParMd, Tooltip, widthQuery } from "@daohaus/ui";

import { totalVoterVotesForChoice } from "../utils/tcrDataHelpers";
import { useMemo } from "react";

import {
  RiMedalFill,
} from 'react-icons/ri';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  min-width: 50rem;
  @media ${widthQuery.sm} {
    min-width: 100%;
  }
  overflow: auto;
  padding-right: 1rem;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media ${widthQuery.sm} {
    margin: 1.2rem 0;
  }
`;

const Spacer = styled.div`
  height: 10rem;
`;

type VoteListProps = {
  voters: any[];
  choiceId: string;
  champions: any[] | undefined;
};

export const VoterList = ({ voters, choiceId, champions }: VoteListProps) => {
  const { daochain } = useParams();

  const choiceVoters = useMemo(() => {
    return voters.reduce((acc, voter) => {
      const votesForChoice = totalVoterVotesForChoice(voter.votes, choiceId);
      if (Number(votesForChoice)) {
        return [...acc, { ...voter, votesForChoice }];
      }
      return acc;
    }, []);
  }, [voters]);

  return (
    <MainContainer>
      <VotesContainer>
        {choiceVoters?.map((voter: any) => (
          <div key={voter.address}>
            <VoteContainer>
              <MemberCard
                explorerNetworkId={daochain as ValidNetwork}
                minWidth="4rem"
                profile={{
                  address: voter.address,
                }}
              />

              <DataMd>
                <>
                  {champions?.includes(voter.address) && (
                    <Tooltip 
                    triggerEl={<RiMedalFill color="hsla(50, 100%, 58%, 1)" size="2rem"/>}
                    content="DAO Elected Champion" />
                  )}{" "}
                  {toWholeUnits(voter.votesForChoice)}
                </>
              </DataMd>
            </VoteContainer>
          </div>
        ))}
        <Spacer />
      </VotesContainer>
    </MainContainer>
  );
};
