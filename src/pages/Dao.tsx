import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  Button,
  DataMd,
  DataSm,
  H2,
  ParMd,
  ProfileAvatar,
  SingleColumnLayout,
  Link,
  ParLg,
  H5,
  Card,
} from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { TARGET_DAO } from "../targetDao";
import { ListTcr, useTcrList } from "../hooks/useTcrs";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
// import { useDao } from "../hooks/useDao";

const LinkBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem 0;
`;

const TcrList = styled.div`
  margin-top: 5rem;
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

export function Dao() {
  const { data } = useTcrList({ daoId: TARGET_DAO.ADDRESS });

  return (
    <SingleColumnLayout>
      <H2>Public HAUS Signal TCRs</H2>
      <HausAnimated />
      <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        2023 is the year of the TCR right?
      </ParMd>
      <ParMd style={{ marginBottom: "3rem", textAlign: "center" }}>
        This is where the Public HAUS members signal on high level objectives
        for the DAOHaus protocol. Whoopie!
      </ParMd>

      <TcrList>
        <H5>Active Signals</H5>
        {data?.registries &&
          data.registries.map((tcr: ListTcr, i: number) => {
            return (
              <div key={tcr.id}>
                <TcrListItem>
                  <ParLg style={{ marginTop: "5rem" }}>
                    {i + 1}. {getTcrTitle(tcr.details)}
                  </ParLg>
                  <Link href={`/tcr/${tcr.id}`} type="internal">
                    View
                  </Link>
                </TcrListItem>
              </div>
            );
          })}
      </TcrList>
      <LinkBox>
        <Link href={`https://publichaus.club/`} type="external">
          Public HAUS
        </Link>
        <Link
          href={`https://admin.daohaus.club/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}`}
          type="external"
        >
          View DAO
        </Link>
        <Link href={`/create`} type="internal">
          Create TCR
        </Link>
      </LinkBox>
    </SingleColumnLayout>
  );
}

export default Dao;
