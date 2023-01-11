import { useDHConnect } from "@daohaus/connect";
import { FormBuilder } from "@daohaus/form-builder";
import { TXBuilder } from "@daohaus/tx-builder";
import { H3, ParXl, SingleColumnLayout } from "@daohaus/ui";

import { FORM } from "../legos/forms";

//todo: scope to dao

export const Create = () => {
  const { provider, chainId } = useDHConnect();

  if (!chainId)
    return (
      <SingleColumnLayout>
        <ParXl>Connect wallet to continue</ParXl>
      </SingleColumnLayout>
    );

  return (
    <TXBuilder provider={provider} chainId={chainId} appState={{}}>
      <FormBuilder form={FORM.SUMMON_TCR} targetNetwork={chainId} />
    </TXBuilder>
  );
};
