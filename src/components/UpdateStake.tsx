import React from "react";
import { handleErrorMessage, TXLego } from "@daohaus/utils";
import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Loading, useToast } from "@daohaus/ui";

import { TX } from "../legos/tx";
import { GatedButton } from "./GatedButton";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";

export const UpdateStake = ({
  onSuccess,
  stakeAmounts,
  disabled = false,
}: {
  onSuccess: () => void;
  stakeAmounts: any;
  disabled?: boolean;
}) => {
  const { fireTransaction } = useTxBuilder();
  const { chainId } = useDHConnect();
  const { chainid, tcr } = useParams();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const stakeArg = Object.keys(stakeAmounts).map((choiceId) => {
    return [choiceId, stakeAmounts[choiceId]];
  });

  const handleStake = () => {
    setIsLoading(true);
    fireTransaction({
      tx: { ...TX.STAKE, staticArgs: [stakeArg] } as TXLego,
      callerState: { tcr },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Stake Failed", description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Stake Success",
            description: "Please wait for subgraph to sync",
          });
          setIsLoading(false);
        },
        onPollError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Poll Error", description: errMsg });
          setIsLoading(false);
        },
        onPollSuccess: () => {
          successToast({
            title: "Stake Success",
            description: "Stake success",
          });
          onSuccess();
          setIsLoading(false);
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === chainid
      ? true
      : "You are not connected to the same network as the DAO";
  return (
    <GatedButton
      color="primary"
      rules={[isConnectedToDao]}
      onClick={handleStake}
      disabled={disabled}
      style={{ padding: "1.2rem" }}
    >
      {isLoading ? <Loading size={20} /> : "Update Stake"}
    </GatedButton>
  );
};
