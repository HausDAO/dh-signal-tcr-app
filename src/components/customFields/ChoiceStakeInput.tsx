import React, { useEffect } from "react";
import { RegisterOptions } from "react-hook-form";
import {
  ignoreEmptyVal,
  isNumberish,
  toBaseUnits,
  ValidateField,
} from "@daohaus/utils";
import { Buildable, WrappedInput, Field } from "@daohaus/ui";
import { useFormBuilder } from "@daohaus/form-builder";
import { useConnectedAddressVotes } from "../../hooks/useTcrs";
import { useParams } from "react-router-dom";
import { useDHConnect } from "@daohaus/connect";

export const ChoiceStakeInput = (props: Buildable<Field>) => {
  const { address } = useDHConnect();
  const { tcr } = useParams();
  const { connectedVoter } = useConnectedAddressVotes({
    tcrId: tcr,
    address: address,
  });
  const { watch } = useFormBuilder();

  const title = watch("title");
  const description = watch("description");

  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: (val: string) => {
      return isNumberish(val) ? toBaseUnits(val) : val;
    },
    validate: (val) => {
      if (!isNumberish(val)) {
        return "Field must be a number";
      }

      if (Number(val) > connectedVoter.balance) {
        return "Not enough points";
      }

      return true;
    },
  };
  return (
    <WrappedInput
      {...props}
      rules={newRules}
      disabled={!title || !description}
    />
  );
};
