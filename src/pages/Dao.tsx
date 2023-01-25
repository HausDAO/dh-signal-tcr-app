import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import {
  H2,
  ParMd,
  SingleColumnLayout,
  Link,
  ParLg,
  H5,
  Theme,
  border,
  Bold,
  DataSm,
  DataXs,
} from "@daohaus/ui";
import { RiArrowRightSLine } from "react-icons/ri/index.js";

import { HausAnimated } from "../components/HausAnimated";
import { TARGET_DAO } from "../targetDao";
import { ListTcr, useTcrList } from "../hooks/useTcrs";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";

const LinkBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem 0;
`;

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step6}
    solid;
`;

const ListItemLink = styled(RouterLink)`
  text-decoration: none;
  width: 100%;
  color: unset;
  :hover {
    text-decoration: none;
  }
`;

const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: ${border.radius};

  :hover {
    background: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
  max-width: 39rem;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  font-size: 3rem;
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

const SlimParMd = styled(ParMd)`
  width: 70%;
`;

export function Dao() {
  const { tcrList } = useTcrList({ daoId: TARGET_DAO.ADDRESS });

  return (
    <SingleColumnLayout>
      <H2>PublicHAUS Signals</H2>
      <SlimParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        This is where PublicHAUS members signal on High Level Objectives (HILO)
        and ecosystem contribution and output (Retroactive Grading Events).{" "}
        <Link href={`https://publichaus.club/`} type="external">
          Learn
        </Link>{" "}
        about contributing to PublicHAUS.
      </SlimParMd>
      <ParMd style={{ marginBottom: "3rem", textAlign: "center" }}></ParMd>

      {tcrList &&
        tcrList.map((tcr: ListTcr, i: number) => {
          return (
            <ListItemContainer key={tcr.id}>
              <ListItemLink to={`/tcr/${tcr.id}`}>
                <ListItemHoverContainer>
                  <ListItem>
                    <ParLg>
                      <Bold>{getTcrTitle(tcr.details)}</Bold>
                    </ParLg>
                    <DataSm>{getTcrDescription(tcr.details)}</DataSm>
                    <Spaced>
                      <DataXs>
                        <Bold>
                          Signaling ends on{" "}
                          {formatShortDateTimeFromSeconds(tcr.endDate)}
                        </Bold>
                      </DataXs>
                    </Spaced>
                  </ListItem>
                  <StyledIcon />
                </ListItemHoverContainer>
              </ListItemLink>
            </ListItemContainer>
          );
        })}
      <LinkBox>
        <Link href={`https://publichaus.club/`} type="external">
          More PublicHAUS Info
        </Link>
        <Link
          href={`https://admin.daohaus.club/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}`}
          type="external"
        >
          PublicHAUS DAO
        </Link>
        <Link href={`/create`} type="internal">
          Create Signal
        </Link>
      </LinkBox>
    </SingleColumnLayout>
  );
}

export default Dao;
