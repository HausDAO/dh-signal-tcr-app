import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { utils } from "ethers";

import { Buildable, Field } from "@daohaus/ui";

export const ChoiceIdInput = (props: Buildable<Field>) => {
  const { setValue, watch } = useFormContext();

  const [title, description] = watch(["title", "description"]);

  useEffect(() => {
    if (title && description) {
      setValue("choiceId", utils.id(`${title} ${description}`));
    }
  }, [title, description]);

  return null;
};
