import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  value?: string,
  name?:string
  options: Option[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  value,
  name,
  options,
  onValueChange,
  placeholder,
}) => {
  return (
    <Select value={value} name={name} onValueChange={onValueChange}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder={value === "" ? placeholder : undefined} />{" "}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.label} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
