import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { CustomFields } from "../legos/config";

import { FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

export const Create = () => {
  const { chainId } = useDHConnect();
  const navigate = useNavigate();
  const client = useQueryClient();

  const onFormComplete = () => {
    navigate(`/`);
    client.clear();
  };

  if (!chainId)
    return (
      <SingleColumnLayout>
        <ParXl>Connect wallet to continue</ParXl>
      </SingleColumnLayout>
    );

  return (
    <FormBuilder
      form={FORM.SUMMON_TCR}
      targetNetwork={TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID}
      onSuccess={onFormComplete}
      customFields={CustomFields}
    />
  );
};
