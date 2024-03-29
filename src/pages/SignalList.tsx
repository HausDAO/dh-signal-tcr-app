import { useParams, Link as RouterLink } from "react-router-dom";

import { useDHConnect } from "@daohaus/connect";
import { Button, Link, Loading, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { TARGET_DAO } from "../targetDao";
import {
  getTcrDescription,
  getTcrLink,
  getTcrTitle,
} from "../utils/tcrDataHelpers";
import { ClaimBalance } from "../components/ClaimBalance";
import { useDao } from "../hooks/useDao";
import { ChoiceList } from "../components/ChoiceList";
import styled from "styled-components";
import { useMemo } from "react";
import { EthAddress } from "@daohaus/utils";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { RiArrowGoBackFill, RiPlayListAddFill, RiSendBackward } from "react-icons/ri";

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

export const SignalList = () => {
  const { address } = useDHConnect();
  const { chainid, daoid, tcr } = useParams();
  const { tcrRecord } = useTcrData({ tcrId: tcr });
  const { dao } = useDao({
    daoId: daoid as EthAddress,
    chainId: chainid as ValidNetwork,
  });
  
  // console.log("dao", daoid);
  // console.log("dao", dao);



  const hasEnded = useMemo(() => {
    if (tcrRecord) {
      const now = new Date().getTime() / 1000;
      return Number(tcrRecord.endDate) < now;
    }
    return undefined;
  }, [tcrRecord]);

  if (!tcrRecord || !dao) {
    return (
      <SingleColumnLayout>
        <Loading />
      </SingleColumnLayout>
    );
  }

  return (
    <SingleColumnLayout
      title={getTcrTitle(tcrRecord.details)}
      subtitle="Signal"
      actions={
        address &&
        !hasEnded && (
          <ClaimBalance
            lootSnapshot={tcrRecord.lootSnapshotId}
            sharesSnapshot={tcrRecord.sharesSnapshotId}
            lootAddress={dao.lootAddress}
            sharesAddress={dao.sharesAddress}
          />
        )
      }
    >
      <DetailsContainer>
        <ParMd style={{ marginBottom: "2.4rem" }}>
          {getTcrDescription(tcrRecord.details)}
        </ParMd>
        <Link href={getTcrLink(tcrRecord.details)}>More details</Link>
        <StyledRouterLink to={`/${chainid}/${daoid}`}>
          <Button
            variant="ghost"
            color="secondary"
            IconLeft={RiArrowGoBackFill}
          >
            Back To Signal Board
          </Button>
        </StyledRouterLink>
      </DetailsContainer>
      {tcr && dao && <ChoiceList tcrId={tcr} hasEnded={hasEnded} />}
    </SingleColumnLayout>
  );
};
