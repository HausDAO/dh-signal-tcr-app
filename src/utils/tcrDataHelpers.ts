import { isJSON } from "@daohaus/utils";
import { BigNumber } from "ethers";

export const getTcrTitle = (details?: string): string => {
  if (!details || !isJSON(details)) return "Unnamed Signal";
  const detailObj = JSON.parse(details);
  return detailObj.title || "Unnamed Signal";
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
export const voteIdsForChoice = (votes: any[], choiceId: string): string[] => {
  return votes.reduce((acc: string[], vote: any) => {
    if (vote.choiceId == parseInt(choiceId)) {
      acc = [...acc, vote.voteId];
    }

    return acc;
  }, []);
};

export const totalPendingStake = (stakeAmounts: {
  [key: string]: string;
}): string => {
  const totalPending = Object.values(stakeAmounts).reduce(
    (sum: BigNumber, stake: string) => {
      sum = sum.add(BigNumber.from(stake));
      return sum;
    },
    BigNumber.from("0")
  );
  return totalPending.toString();
};
export const availableStake = (
  stakeAmounts: {
    [key: string]: string;
  },
  currentBalance: string
): string => {
  const pending = totalPendingStake(stakeAmounts);
  const avail = BigNumber.from(currentBalance).sub(BigNumber.from(pending));
  return avail.toString();
};
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};
