import { useParams } from "react-router-dom";
import styled from "styled-components";

import { H2, H5, Link, ParLg, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { useRecords } from "../hooks/useRecord";
import { useConnectedAddressVotes, useTcrData } from "../hooks/useTcrs";
import { TARGET_DAO } from "../targetDao";
import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { useDHConnect } from "@daohaus/connect";

const TcrList = styled.div`
  margin: 5rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TcrListItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 5rem;
`;

// TODO: how to typeguard parsedContent

export const CuratedList = () => {
  const { address } = useDHConnect();
  const { tcr } = useParams();
  // const { data } = useTcrData({ tcrId: tcr });
  // const { records } = useRecords({
  //   daoId: TARGET_DAO.ADDRESS,
  //   chainId: TARGET_DAO.CHAIN_ID,
  //   recordType: "signalTcrChoice",
  //   tcrId: tcr,
  // });
  const res = useConnectedAddressVotes({ tcrId: tcr, address: address });

  console.log("res", res);

  // console.log("data", data);
  // console.log("records", records);

  return (
    <SingleColumnLayout>
      {/* {data?.registry && (
        <>
          <H2>{getTcrTitle(data.registry.details)}</H2>
          <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
            {getTcrDescription(data.registry.details)}
          </ParMd>
        </>
      )} */}

      <TcrList>
        <H5>Choices</H5>

        {/* here */}
      </TcrList>

      <Link href={`/tcr/${tcr}/add-choice`} type="internal">
        Add Choice
      </Link>
    </SingleColumnLayout>
  );
};

// {
//   records &&
//     records.map((choice, i: number) => {
//       return (
//         <div key={choice.id}>
//           <TcrListItem>
//             <ParLg style={{ marginTop: "5rem" }}>
//               {/* @ts-ignore:next-line */}
//               {i + 1}. {choice.parsedContent.title}
//             </ParLg>
//             {/* <Link href={`/tcr/${tcr.id}`} type="internal">
//             View
//           </Link> */}
//           </TcrListItem>
//         </div>
//       );
//     });
// }
