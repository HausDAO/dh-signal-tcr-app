import { isJSON } from "@daohaus/utils";
import { BigNumber } from "ethers";

export const getTcrTitle = (details?: string): string => {
  if (!details || !isJSON(details)) return "Unnamed TCR";
  const detailObj = JSON.parse(details);
  return detailObj.title || "Unnamed TCR";
};

export const getTcrDescription = (details?: string): string => {
  if (!details || !isJSON(details)) return "--";
  const detailObj = JSON.parse(details);
  return detailObj.description || "--";
};

export const getTcrLink = (details?: string): string | undefined => {
  if (!details || !isJSON(details)) return;
  const detailObj = JSON.parse(details);
  return detailObj.link;
};

export const totalStakeForChoice = (votes: any[], choiceId: string): string => {
  const total = votes.reduce((sum: BigNumber, vote: any) => {
    if (vote.choiceId == parseInt(choiceId)) {
      sum = sum.add(BigNumber.from(vote.amount));
    }
    return sum;
  }, BigNumber.from("0"));

  return total.toString();
};
