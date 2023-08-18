import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { RiArrowRightSLine } from "react-icons/ri/index.js";

import {
  Bold,
  DataMd,
  DataSm,
  DataXs,
  ParLg,
  Theme,
} from "@daohaus/ui";

import { ListTcr } from "../hooks/useTcrs";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { formatDistanceToNowFromSeconds } from "@daohaus/utils";

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }: { theme: DefaultTheme }) => theme.secondary.step6}
    solid;
`;

const ListItemLink = styled(RouterLink)`
  text-decoration: none;
  width: 100%;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

// old border-radius was ${border.radius}
const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: 5;

  &:hover {
    background: 1px ${({ theme }: { theme: DefaultTheme }) => theme.secondary.step3};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }: { theme: DefaultTheme }) => theme.primary.step9};
  font-size: 3rem;
`;

export const SignalItem = ({ tcr }: { tcr: ListTcr }) => {
  const theme = useTheme();

  const now = new Date().getTime() / 1000;
  const hasEnded = Number(tcr.endDate) < now;

  return (
    <ListItemContainer>
      <ListItemLink to={`/tcr/${tcr.id}`}>
        <ListItemHoverContainer>
          <ListItem>
            <ParLg>
              <Bold>{getTcrTitle(tcr.details)}</Bold>
            </ParLg>
            <DataSm>{getTcrDescription(tcr.details)}</DataSm>
            <Spaced>
              {hasEnded && (
                <DataXs>
                  <Bold>
                    Ended {formatDistanceToNowFromSeconds(tcr.endDate)}
                  </Bold>
                </DataXs>
              )}

              {!hasEnded && (
                <DataMd>
                  <Bold color={theme.green10}>
                    Ends {formatDistanceToNowFromSeconds(tcr.endDate)}
                  </Bold>
                </DataMd>
              )}
            </Spaced>
          </ListItem>
          <StyledIcon />
        </ListItemHoverContainer>
      </ListItemLink>
    </ListItemContainer>
  );
};
