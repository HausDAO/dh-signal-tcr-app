import React from "react";
import { handleErrorMessage, TXLego } from "@daohaus/utils";
import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Spinner, useToast } from "@daohaus/ui";

import { TX } from "../legos/tx";
import { GatedButton } from "./GatedButton";
import { useParams } from "react-router-dom";

export const UpdateStake = ({
  onSuccess,
  stakeAmounts,
}: {
  onSuccess: () => void;
  stakeAmounts: any;
}) => {
  const daochain = "0x5";

  const { fireTransaction } = useTxBuilder();
  const { chainId, address } = useDHConnect();
  const { tcr } = useParams();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClaim = () => {
    // const args = [[choiceId, amount], [choiceId, amount]]
    const args = Object.keys(stakeAmounts).map((choiceId) => {
      return [choiceId, stakeAmounts[choiceId]];
    });

    console.log("args", args);
    setIsLoading(true);
    fireTransaction({
      tx: { ...TX.STAKE, staticArgs: [args] } as TXLego,
      callerState: { tcr },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Claim Failed", description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Claim Success",
            description: "Please wait for subgraph to sync",
          });
          // todo: poll for claim success?
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
            title: "Claim Success",
            description: "Claim success",
          });
          setIsLoading(false);
          onSuccess();
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === daochain
      ? true
      : "You are not connected to the same network as the DAO";

  return (
    <GatedButton
      color="secondary"
      rules={[isConnectedToDao]}
      onClick={handleClaim}
    >
      {isLoading ? <Spinner size="2rem" strokeWidth=".2rem" /> : "Update Stake"}
    </GatedButton>
  );
};
