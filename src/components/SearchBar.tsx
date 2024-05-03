import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type SearchBarProps = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery: string;
};
const SearchBar: React.FC<SearchBarProps> = ({
  onSubmit,
  onReset,
  placeholder,
  searchQuery,
}) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) onReset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Input
                {...field}
                className="border-none shadow-none text-xl focus-visible:ring-0"
                placeholder={placeholder}
              />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};
export default SearchBar;
