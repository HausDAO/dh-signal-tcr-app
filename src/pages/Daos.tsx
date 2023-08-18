import {
  Button,
  Card,
  ParMd,
  ParSm,
  ParXl,
  SingleColumnLayout,
} from "@daohaus/ui";

import { TARGET_DAO } from "../targetDao";
import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

export function Daos() {
  const daoList = () => {
    return Object.keys(TARGET_DAO).map((key, index) => {
      return (
        <Card key={index} title="DAO">
          <ParMd>🚩</ParMd>
            <ParMd>{TARGET_DAO[key].NAME}</ParMd>
          <ParSm>{TARGET_DAO[key].ADDRESS}</ParSm>
          <ParSm>{TARGET_DAO[key].HOME_PAR}</ParSm>
          <StyledRouterLink
            to={`/${TARGET_DAO[key].CHAIN_ID}/${TARGET_DAO[key].ADDRESS}`}
          >
            <Button>More</Button>
          </StyledRouterLink>
        </Card>
      );
    });
  };

  return (
    <SingleColumnLayout>
      <ParXl>DAO Yardarms</ParXl>
      {daoList()}
    </SingleColumnLayout>
  );
}
