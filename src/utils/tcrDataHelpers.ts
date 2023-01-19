import { isJSON } from "@daohaus/utils";

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
