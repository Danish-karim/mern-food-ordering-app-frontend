import { cuisineList } from "@/config/restaurant-option-config";
import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type CuisineFilter = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
const CuisineFilter: React.FC<CuisineFilter> = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}) => {
  const handleCuisineReset = () => {
    onChange([]);
  };
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((selected) => selected !== clickedCuisine);

    onChange(newCuisineList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={handleCuisineReset}
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          ?.slice(0, isExpanded ? cuisineList.length : 7)
          ?.map((cuisine) => {
            const isSelected = selectedCuisines?.includes(cuisine);
            return (
              <div className="flex">
                <Input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          variant={"link"}
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View more <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
