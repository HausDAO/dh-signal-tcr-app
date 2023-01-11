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
} from "@daohaus/ui";
// import { useDao } from "../hooks/useDao";

const AvatarBox = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export function Dao() {
  const { daochain, daoid } = useParams();

  // const { dao } = useDao({
  //   chainId: daochain as ValidNetwork,
  //   daoId: daoid,
  // });

  const dao = {
    id: "0x3dea7058a19bf6854bb63384707139636efb99ea",
    name: "Kings of the Goerli TCR",
    avatarImg: "",
  };

  return (
    <SingleColumnLayout>
      <AvatarBox>
        <ProfileAvatar size="xl" address={dao?.id} image={dao?.avatarImg} />
        <H2>{dao?.name}</H2>
      </AvatarBox>
      <Link href={`/molochv3/${daochain}/${daoid}/create`} type="internal">
        Create
      </Link>
      <ParMd style={{ marginTop: "5rem" }}>some list of tcrs</ParMd>
    </SingleColumnLayout>
  );
}

export default Dao;
