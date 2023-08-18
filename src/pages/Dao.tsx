import styled from "styled-components";

import { H2, ParMd, SingleColumnLayout, Link, Theme } from "@daohaus/ui";

import { TARGET_DAO } from "../targetDao";
import { ListTcr, useTcrList } from "../hooks/useTcrs";
import { useDao } from "../hooks/useDao";
import { SignalItem } from "../components/SignalItem";
import { EthAddress } from "@daohaus/utils";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useParams } from "react-router-dom";

const LinkBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem 0;
`;

const SlimParMd = styled(ParMd)`
  width: 70%;
`;

export function Dao() {
  const { chainid, daoid } = useParams();
  const { dao } = useDao({
    daoId: daoid as EthAddress,
    chainId: chainid as ValidNetwork,
  });
  const { tcrList } = useTcrList({
    daoId: daoid as EthAddress,
  });

  console.log("tcrList", tcrList);

  return (
    <SingleColumnLayout>
      <H2>{dao?.name} Signals</H2>
      <SlimParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        {TARGET_DAO[import.meta.env.VITE_TARGET_KEY].HOME_PAR}{" "}
        {TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL && (
          <Link href={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL}>
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
          <Link href={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].DAO_INFO_URL}>
            More {dao?.name} Info
          </Link>
        )}
        <Link
          href={`https://admin.daohaus.club/#/molochv3/${chainid}/${daoid}`}
        >
          {dao?.name}
        </Link>
        {/* <Link href={`/create`}>
          Create Signal
        </Link> */}
      </LinkBox>
    </SingleColumnLayout>
  );
}

export default Dao;
