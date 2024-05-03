import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type SortOptionsDropdownProps = {
  onChange: (value: string) => void;
  sortOption: string;
};
const SortOptionsDropdown: React.FC<SortOptionsDropdownProps> = ({
  onChange,
  sortOption,
}) => {
  const SORT_OPTION = [
    {
      label: "Best match",
      value: "bestMatch",
    },
    {
      label: "Delivery price",
      value: "deliveryPrice",
    },
    {
      label: "Estimated Delivery Time",
      value: "estimatedDeliveryTime",
    },
  ];
  const selectedSortLabel =
    SORT_OPTION?.find((option) => option.value === sortOption)?.label ||
    SORT_OPTION[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTION?.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionsDropdown;
