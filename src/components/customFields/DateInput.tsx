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

import "react-datepicker/dist/react-datepicker.css";

import { RiArrowDropDownFill, RiCalendar2Fill } from "react-icons/ri";
import { createGlobalStyle } from "styled-components";
import { setHours } from "date-fns";

export const DateInput = (props: Buildable<Field>) => {
  const { setValue, watch } = useFormContext();
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date) => {
    setStartDate(date);
    setValue(props.id, +date / 1000);
  };

  const DatePickerWrapperStylesLg = createGlobalStyle`

        .react-datepicker {
          font-size: 2rem;
        }
        .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
          width: 5rem;
          height: 3rem;
        }
        .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box, .react-datepicker__time-container {
          width: 150px;
          height: 200px;
        }
        .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
          height: 200px;
        }


`;
  interface Props {
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

  // TODO: how to check if required?
  return (
    <FieldWrapper id={props.id} label={props?.label} rules={props?.rules}>
      <DatePicker
        id={props.id}
        selected={startDate}
        onChange={(date: Date) => handleChange(date)}
        showTimeSelect
        customInput={<ExampleCustomInput />}
        wrapperClassName={props?.className}
        dateFormat="Pp"
      />
      {props?.className === "lg" && <DatePickerWrapperStylesLg />}
    </FieldWrapper>
  );
};
