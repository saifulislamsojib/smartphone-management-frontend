import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import useRefetchToast from "@/hooks/useRefetchToast";
import useTitle from "@/hooks/useTitle";
import { useGetSmartphonesQuery } from "@/redux/features/smartphone/smartphoneApi";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SellDialog from "./SellDialog";
import SmartphoneList from "./SmartphoneList";

const SalesManagement = () => {
  useTitle("Sales Management");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [sellProductId, setSellProductId] = useState<string | null>(null);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const openModal = (id: string) => {
    setModalOpen(true);
    setSellProductId(id);
  };

  const handleSubmit = (e: FormEvent) => {
    const search = (e.target as HTMLFormElement)?.search?.value;
    e.preventDefault();
    setSearchParams((pre) => {
      const searchParams = new URLSearchParams(pre);
      if (search) {
        searchParams.set("search", search);
      } else {
        searchParams.delete("search");
      }

      return searchParams;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams((pre) => {
      const search = new URLSearchParams(pre);
      search.set("page", page.toString());
      return search;
    });
  };

  const handleOpenChange = (value: boolean) => {
    setModalOpen(value);
    if (!value) {
      setSellProductId(null);
    }
  };

  const {
    isLoading,
    data: { data = [], meta: { total = 0 } = {} } = {},
    isFetching,
  } = useGetSmartphonesQuery({ search, page, onStock: true });

  useRefetchToast(isFetching, isLoading);

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-indigo-500">
            Seals Management
          </h2>
        </div>
        {isLoading ? (
          <Loading className="min-h-[calc(100vh-180px)]" />
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center my-5"
            >
              <Input
                type="search"
                className="max-w-[400px] mr-2"
                placeholder="Search by name or brand or model.."
                name="search"
                defaultValue={search}
              />
              <Button>Search</Button>
            </form>
            {data.length > 0 ? (
              <div className="mb-3">
                <SmartphoneList
                  data={data}
                  isFetching={isFetching}
                  openModal={openModal}
                />
                <Pagination
                  page={page}
                  onPageChange={handlePageChange}
                  total={total}
                />
              </div>
            ) : (
              <p
                className={`text-center pt-5 font-semibold text-lg text-red-500${
                  isFetching ? " opacity-60" : ""
                }`}
              >
                No smartphone found
              </p>
            )}
          </>
        )}
      </div>
      <SellDialog
        modalOpen={modalOpen}
        onOpenChange={handleOpenChange}
        sellProductId={sellProductId}
      />
    </>
  );
};

export default SalesManagement;
