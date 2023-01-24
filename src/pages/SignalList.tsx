import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useDHConnect } from "@daohaus/connect";
import { H2, H5, Link, ParLg, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { TARGET_DAO } from "../targetDao";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { ClaimBalance } from "../components/ClaimBalance";
import { useDao } from "../hooks/useDao";
import { ChoiceList } from "../components/ChoiceList";

const TcrList = styled.div`
  margin: 5rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TcrListItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 5rem;
`;

// TODO: how to typeguard parsedContent

export const SignalList = () => {
  const { address } = useDHConnect();
  const { tcr } = useParams();
  const { tcrRecord } = useTcrData({ tcrId: tcr });
  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: "signalTcrChoice",
    tcrId: tcr,
  });
  const { connectedVoter } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });
  const { dao } = useDao({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  return (
    <SingleColumnLayout>
      {tcrRecord && dao && address && (
        <>
          <ClaimBalance
            lootSnapshot={tcrRecord.lootSnapshotId}
            sharesSnapshot={tcrRecord.sharesSnapshotId}
            lootAddress={dao.lootAddress}
            sharesAddress={dao.sharesAddress}
            userBalance={connectedVoter?.balance}
          ></ClaimBalance>
          <H2>{getTcrTitle(tcrRecord.details)}</H2>
          <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
            {getTcrDescription(tcrRecord.details)}
          </ParMd>
        </>
      )}

      {tcr && dao && <ChoiceList tcrId={tcr} />}

      <Link href={`/tcr/${tcr}/add-choice`} type="internal">
        Add Choice
      </Link>
    </SingleColumnLayout>
  );
};
