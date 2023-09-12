import { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  ParMd,
  SingleColumnLayout,
  Link,
  Theme,
  H2,
  Select,
  Input,
  Button,
} from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";

export function SelectDao() {
  const [chainId, setChainId] = useState<string>();
  const [daoId, setDaoId] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSelectChain = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);

    setChainId(e.target.value);
  };

  const handleSelectDao = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    setDaoId(e.target.value);
  };

  return (
    <SingleColumnLayout>
      <H2>Select DAO to create a new Community Signal Poll</H2>
      <Select
        onChange={handleSelectChain}
        id="chainId"
        options={[
          {
            name: "Mainnet",
            value: "0x1",
          },
          {
            name: "Optimism",
            value: "0xa",
          },
        ]}
      />

      <Input
        address
        id="daoAddr"
        placeholder="Enter DAO address 0x..."
        onChange={handleSelectDao}
      />

      <ParMd>{error && <span style={{ color: "red" }}>{error}</span>}</ParMd>

      {chainId && daoId && (
        <RouterLink to={`/${chainId}/${daoId}`}>
          <Button>Create Signal</Button>
        </RouterLink>
      )}
    </SingleColumnLayout>
  );
}

export default SelectDao;
