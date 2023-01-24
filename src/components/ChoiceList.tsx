import React, { useState } from "react";
import styled from "styled-components";

import { H5 } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { TARGET_DAO } from "../targetDao";
import { ChoiceItem } from "./ChoiceItem";
import { UpdateStake } from "./UpdateStake";
import { useDHConnect } from "@daohaus/connect";

const TcrList = styled.div`
  margin: 5rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-around;
  gap: 5rem;
`;
export const ChoiceList = ({ tcrId }: { tcrId: string }) => {
  const { address } = useDHConnect();
  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: "signalTcrChoice",
    tcrId: tcrId,
  });
  const [stakeAmounts, setStakeAmounts] = useState([]);

  return (
    <>
      {records && (
        <TcrList>
          <ListHeader>
            <H5>Signal Choices</H5>

            <UpdateStake onSuccess={() => null} stakeAmounts={stakeAmounts} />
          </ListHeader>

          {records.map((choice: any, i: number) => {
            return (
              <div key={choice.id}>
                <ChoiceItem
                  choice={choice}
                  index={i}
                  stakeAmounts={stakeAmounts}
                  setStakeAmounts={setStakeAmounts}
                />
              </div>
            );
          })}
        </TcrList>
      )}
    </>
  );
};
