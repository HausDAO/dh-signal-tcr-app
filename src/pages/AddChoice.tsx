import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CustomFields } from "../legos/config";

import { FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

export const AddChoice = () => {
  const { chainId } = useDHConnect();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { chainid, daoid, tcr } = useParams();

  const onFormComplete = () => {
    navigate(`/${chainid}/${daoid}/tcr/${tcr}`);
    client.clear();
  };

  if (!chainId)
    return (
      <SingleColumnLayout>
        <ParXl>Connect wallet to continue</ParXl>
      </SingleColumnLayout>
    );

  //TODO: need a custom chocie id arg type...

  return (
    <FormBuilder
      form={FORM.ADD_TCR_CHOICE}
      targetNetwork={chainid}
      lifeCycleFns={{
        onPollSuccess: onFormComplete,
      }}
      defaultValues={{ tcrId: tcr }}
      customFields={CustomFields}
    />
  );
};
