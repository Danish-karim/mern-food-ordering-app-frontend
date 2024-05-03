import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCards from "@/components/SearchResultCards";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(SearchState, city);
  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (!results?.data || !city) {
    return <span>No Results Found</span>;
  }
  console.log("results", results);

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={SearchState?.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={SearchState.searchQuery}
          placeholder="Search by cuisine or Restaurant name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultsInfo total={results?.pagination?.total} city={city} />

          <SortOptionsDropdown
            sortOption={SearchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results?.data?.map((restaurant) => (
          <SearchResultCards restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results?.pagination?.page}
          pages={results?.pagination?.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
