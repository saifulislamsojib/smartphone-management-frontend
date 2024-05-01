import Loading from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRefetchToast from "@/hooks/useRefetchToast";
import useTitle from "@/hooks/useTitle";
import { useGetSellListQuery } from "@/redux/features/sell/sellApi";
import { useSearchParams } from "react-router-dom";
import SellsList from "./SellsList";

const selectTypes = ["All", "weekly", "daily", "monthly", "yearly"];

const SalesHistory = () => {
  useTitle("Sales History");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";

  const handlePageChange = (page: number) => {
    setSearchParams((pre) => {
      const search = new URLSearchParams(pre);
      search.set("page", page.toString());
      return search;
    });
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams((pre) => {
      const searchParams = new URLSearchParams(pre);
      searchParams.set("category", category);
      return searchParams;
    });
  };

  const {
    isLoading,
    data: { data = [], meta: { total = 0 } = {} } = {},
    isFetching,
  } = useGetSellListQuery({ page, category });

  useRefetchToast(isFetching, isLoading);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-indigo-600">
          Sales History
        </h2>
      </div>
      {isLoading ? (
        <Loading className="min-h-[calc(100vh-180px)]" />
      ) : (
        <>
          <Select onValueChange={handleCategoryChange} value={category}>
            <SelectTrigger className="w-[180px] mt-5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectTypes.map((item, idx) => (
                  <SelectItem key={idx} value={item.toLowerCase()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <SellsList data={data} isFetching={isFetching} />
            <Pagination
              page={page}
              onPageChange={handlePageChange}
              total={total}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SalesHistory;
