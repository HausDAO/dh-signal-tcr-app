import React from "react";
import { handleErrorMessage, TXLego } from "@daohaus/utils";
import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Loading, useToast } from "@daohaus/ui";

import { TX } from "../legos/tx";
import { GatedButton } from "./GatedButton";
import { useParams } from "react-router-dom";
import { TARGET_DAO } from "../targetDao";

export const ReleaseVotes = ({
  onSuccess,
  voteIds,
  label,
  size = "md",
  disabled = false,
}: {
  onSuccess: () => void;
  voteIds: string[];
  label: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) => {
  const { fireTransaction } = useTxBuilder();
  const { chainId } = useDHConnect();
  const { tcr } = useParams();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRelease = () => {
    setIsLoading(true);
    fireTransaction({
      tx: TX.RELEASE as TXLego,
      callerState: { tcr, voteIds },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Release Failed", description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Release Success",
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
            title: "Release Success",
            description: "Release success",
          });
          setIsLoading(false);
          onSuccess();
        },
      },
    });
  };

  const isConnectedToDao =
    chainId === TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID
      ? true
      : "You are not connected to the same network as the DAO";

  if (voteIds?.length === 0) {
    return null;
  }

  return (
    <GatedButton
      variant="outline"
      rules={[isConnectedToDao]}
      onClick={handleRelease}
      size={size}
      disabled={disabled}
      style={{ padding: "1.2rem" }}
    >
      {isLoading ? <Loading size={20} /> : label}
    </GatedButton>
  );
};
