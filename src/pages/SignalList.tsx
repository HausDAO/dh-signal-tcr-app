import { useParams } from "react-router-dom";

import { useDHConnect } from "@daohaus/connect";
import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { TARGET_DAO } from "../targetDao";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { ClaimBalance } from "../components/ClaimBalance";
import { useDao } from "../hooks/useDao";
import { ChoiceList } from "../components/ChoiceList";

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
