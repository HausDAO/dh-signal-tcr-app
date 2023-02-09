import styled from "styled-components";

import { H2, ParMd, SingleColumnLayout, Link, Theme } from "@daohaus/ui";

import { TARGET_DAO } from "../targetDao";
import { ListTcr, useTcrList } from "../hooks/useTcrs";
import { useDao } from "../hooks/useDao";
import { SignalItem } from "../components/SignalItem";

const LinkBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem 0;
`;

const SlimParMd = styled(ParMd)`
  width: 70%;
`;

export function Dao() {
  const { tcrList } = useTcrList({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
  });
  const { dao } = useDao({
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
    chainId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
  });

  return (
    <SingleColumnLayout>
      <H2>{dao?.name} Signals</H2>
      <SlimParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        {TARGET_DAO[import.meta.env.VITE_TARGET_KEY].HOME_PAR}{" "}
        {TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL && (
          <Link
            href={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL}
            linkType="external"
          >
            Learn more
          </Link>
        )}
      </SlimParMd>
      <ParMd style={{ marginBottom: "3rem", textAlign: "center" }}></ParMd>

      {tcrList &&
        tcrList.map((tcr: ListTcr, i: number) => {
          return <SignalItem tcr={tcr} key={i} />;
        })}
      <LinkBox>
        {TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL && (
          <Link
            href={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL}
            linkType="external"
          >
            More {dao?.name} Info
          </Link>
        )}
        <Link
          href={`https://admin.daohaus.club/#/molochv3/${
            TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
          }/${TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS}`}
          linkType="external"
        >
          {dao?.name}
        </Link>
        {/* <Link href={`/create`} linkType="internal">
          Create Signal
        </Link> */}
      </LinkBox>
    </SingleColumnLayout>
  );
}

export default Dao;
