import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CustomFields } from "../legos/config";

import { FORM } from "../legos/forms";
import { TARGET_DAO } from "../targetDao";

export const Create = () => {
  const { chainId } = useDHConnect();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { chainid, daoid } = useParams();

  const onFormComplete = () => {
    navigate(`/${chainid}/${daoid}`);
    client.clear();
  };

  if (!chainId)
    return (
      <SingleColumnLayout>
        <ParXl>Connect wallet to continue</ParXl>
      </SingleColumnLayout>
    );

  if (chainId !== chainid)
      return (
        <SingleColumnLayout>
          <ParXl>Wrong network</ParXl>
        </SingleColumnLayout>
      );

  return (
    <FormBuilder
      form={FORM.SUMMON_TCR}
      targetNetwork={chainid}
      lifeCycleFns={{
        onPollSuccess: onFormComplete,
      }}
      customFields={CustomFields}
    />
  );
};
