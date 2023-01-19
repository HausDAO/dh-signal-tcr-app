import { H2, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";
import { useParams } from "react-router-dom";

export const CuratedList = () => {
  const { tcr } = useParams();

  return (
    <SingleColumnLayout>
      <H2>TCR</H2>
      <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        this is the tcr page
      </ParMd>

      <Link href={`/tcr/${tcr}/add-choice`} type="internal">
        Add Choice
      </Link>
    </SingleColumnLayout>
  );
};
