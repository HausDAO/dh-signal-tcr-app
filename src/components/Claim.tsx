import React from "react";
import { handleErrorMessage, TXLego } from "@daohaus/utils";
import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Spinner, useToast } from "@daohaus/ui";

import { TX } from "../legos/tx";
import { GatedButton } from "./GatedButton";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";
import { useQueryClient } from "react-query";

export const Claim = ({
  onSuccess,
  label,
}: {
  onSuccess: () => void;
  label: string;
}) => {
  const { fireTransaction } = useTxBuilder();
  const { chainId } = useDHConnect();
  const { tcr } = useParams();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useQueryClient();

  const handleClaim = () => {
    setIsLoading(true);
    fireTransaction({
      tx: TX.CLAIM as TXLego,
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
          client.clear();
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
      ? true
      : "You are not connected to the same network as the DAO";

  return (
    <GatedButton
      color="success"
      rules={[isConnectedToDao]}
      onClick={handleClaim}
      // centerAlign
    >
      {isLoading ? <Spinner size="2rem" strokeWidth=".2rem" /> : label}
    </GatedButton>
  );
};
