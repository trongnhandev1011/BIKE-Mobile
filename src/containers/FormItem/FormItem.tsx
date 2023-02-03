import { FormControl } from "native-base";
import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";

export default function FormItem({
  name,
  control,
  render,
  label,
  rules,
  defaultValue,
  isInvalid = false,
}: {
  name: string;
  label?: string;
  control: Control<FieldValues, any> | undefined;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => React.ReactElement;
  rules?: any;
  defaultValue?: any;
  isInvalid?: boolean;
}) {
  return (
    <FormControl isInvalid={isInvalid} key={name}>
      {label ? <FormControl.Label>{label}</FormControl.Label> : null}
      <Controller
        control={control}
        render={render}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
      />
      <FormControl.ErrorMessage>
        {control?.getFieldState(name).error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
