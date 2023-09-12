import {
  AddressDisplay,
  Button,
  Card,
  Label,
  ParMd,
  ParSm,
  ParXl,
  SingleColumnLayout,
  Tag,
  widthQuery,
} from "@daohaus/ui";

import { TARGET_DAO } from "../targetDao";
import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { ZERO_ADDRESS } from "@daohaus/utils";

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

const StyledContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.secondary.step3};
  border: 1px solid white;
  padding: 3rem;
  width: 100%;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .right-section {
    display: flex;
  }

`;

export const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;


export function Daos() {
  const daoList = () => {
    return Object.keys(TARGET_DAO).map((key, index) => {
      return (
        <StyledCard key={index} title="DAO">
          <StyledCardHeader>
            <div>
              <ParMd>🚩</ParMd>
              <ParMd>{TARGET_DAO[key].NAME}</ParMd>
              <ParMd style={{ marginBottom: ".4rem" }}>
                {TARGET_DAO[key].HOME_PAR}
              </ParMd>

              <TagSection>
                <Label>DAO:</Label>
                <AddressDisplay
                  address={TARGET_DAO[key].ADDRESS || ZERO_ADDRESS}
                  copy
                  truncate
                  explorerNetworkId={TARGET_DAO[key].CHAIN_ID}
                />
              </TagSection>
            </div>
          </StyledCardHeader>

          <StyledRouterLink
            to={`/${TARGET_DAO[key].CHAIN_ID}/${TARGET_DAO[key].ADDRESS}`}
          >
            <Button variant="outline">More</Button>
          </StyledRouterLink>
        </StyledCard>
      );
    });
  };

  return (
    <SingleColumnLayout>
      <ParXl>DAO Yardarms</ParXl>
      <ParXl>Community signal pools </ParXl>
      <StyledRouterLink to="/selectDao">
        <Button>Create New</Button></StyledRouterLink>
      <StyledContainer>{daoList()}</StyledContainer>
    </SingleColumnLayout>
  );
}
