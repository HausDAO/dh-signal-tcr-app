import {
  Card,
  DataMd,
  H2,
  H4,
  Link,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";

export const Explore = () => {
  return (
    <SingleColumnLayout>
      <H2>Explore</H2>
      <ParMd style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        Might need a search or something
      </ParMd>

      <Card>
        <Link
          href="/molochv3/0x5/0x3dea7058a19bf6854bb63384707139636efb99ea"
          type="internal"
        >
          <H4>DAO w/ TCRs</H4>
        </Link>
      </Card>
    </SingleColumnLayout>
  );
};
