import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { TXBuilder } from "@daohaus/tx-builder";
import { H3, ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

//todo: scope to dao

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
      targetNetwork={TARGET_DAO.CHAIN_ID}
      onSuccess={onFormComplete}
    />
  );
};
