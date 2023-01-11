import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";
import { HausAnimated } from "../components/HausAnimated";

const LinkBox = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H2>DAOhaus Signal TCRs</H2>
      <HausAnimated />
      <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        2023 is the year of the TCR right?
      </ParMd>
      <ParMd style={{ marginBottom: "3rem", textAlign: "center" }}>
        This app will enable your Moloch V3 DAO to create a TCR to signal on
        whatever you want.
      </ParMd>
      <LinkBox>
        <Link href="/create" linkType="internal">
          Create
        </Link>
        <Link href="/explore" linkType="internal">
          Explore
        </Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};
