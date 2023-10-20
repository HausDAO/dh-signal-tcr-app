import React, { ReactNode, forwardRef, useState } from "react";

import {
  Buildable,
  Button,
  Field,
  FieldWrapper,
  Label,
  SingleColumnLayout,
} from "@daohaus/ui";
import { useFormContext } from "react-hook-form";

import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { RiArrowDropDownFill, RiCalendar2Fill } from "react-icons/ri";


export const DateInput = (props: Buildable<Field>) => {
  const { setValue, watch } = useFormContext();
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
    setValue(props.id, +date / 1000);
  };
  interface Props {
    children?: ReactNode;
    type?: "submit" | "button";
    onClick?: () => void;
    value?: string | number;
  }
  const ExampleCustomInput = forwardRef<HTMLButtonElement, Props>(
    ({ value, onClick }, ref) => (
      <Button
        IconLeft={RiCalendar2Fill}
        IconRight={RiArrowDropDownFill}
        className="example-custom-input"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </Button>
    )
  );

  return (
    <FieldWrapper id={props.id} label={props?.label || "End Date"}>
      <DatePicker
        id={props.id}
        selected={startDate}
        onChange={(date: Date) => handleChange(date)}
        showTimeSelect
        customInput={<ExampleCustomInput />}
        wrapperClassName="datePicker"
      />
    </FieldWrapper>
  );
};
