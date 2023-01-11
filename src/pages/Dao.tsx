import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  DataMd,
  DataSm,
  H2,
  ParMd,
  ProfileAvatar,
  SingleColumnLayout,
} from "@daohaus/ui";
// import { useDao } from "../hooks/useDao";
// import { ReportSelect } from "../components/ReportSelect";
import { useState } from "react";
// import { Report } from "../components/Report";

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

export function Dao({}: {}) {
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
    </SingleColumnLayout>
  );
}

export default Dao;
