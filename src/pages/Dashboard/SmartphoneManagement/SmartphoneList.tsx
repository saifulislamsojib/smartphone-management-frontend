import { Alert } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Loading from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRefetchToast from "@/hooks/useRefetchToast";
import {
  useDeleteSelectedSmartphonesMutation,
  useGetSmartphonesQuery,
} from "@/redux/features/smartphone/smartphoneApi";
import { ErrorResponse } from "@/types/common.type";
import { SmartPhone } from "@/types/smartphone.type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SmartphoneFilter from "./SmartphoneFilter";

type Props = {
  handleEditModal: (editInfo: SmartPhone) => void;
  handleCreateVariant: (editInfo: SmartPhone) => void;
};

const SmartphoneList = ({ handleEditModal, handleCreateVariant }: Props) => {
  const columns: ColumnDef<SmartPhone>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <div>{row.getValue("brand")}</div>,
    },
    {
      accessorKey: "model",
      header: "Model",
      cell: ({ row }) => <div>{row.getValue("model")}</div>,
    },
    {
      accessorKey: "operatingSystem",
      header: "Operating System",
      cell: ({ row }) => <div>{row.getValue("operatingSystem")}</div>,
    },
    {
      accessorKey: "storageCapacity",
      header: "Storage",
      cell: ({ row }) => <div>{row.getValue("storageCapacity")} GB</div>,
    },
    {
      accessorKey: "screenSize",
      header: "Screen Size",
      cell: ({ row }) => <div>{row.getValue("screenSize")} Inch</div>,
    },
    {
      accessorKey: "cameraQuality",
      header: "Camera",
      cell: ({ row }) => <div>{row.getValue("cameraQuality")}</div>,
    },
    {
      accessorKey: "batteryLife",
      header: "Battery",
      cell: ({ row }) => <div>{row.getValue("batteryLife")}</div>,
    },
    {
      accessorKey: "action",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium flex gap-2 justify-end">
            <Button onClick={() => handleEditModal(row.original)}>Edit</Button>
            <Button onClick={() => handleCreateVariant(row.original)}>
              Create Variant
            </Button>
          </div>
        );
      },
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 50000;
  let releaseDate: string | undefined = searchParams.get("releaseDate")!;
  releaseDate = releaseDate
    ? new Date(releaseDate).toISOString().split("T")[0]
    : undefined;
  const brand = searchParams.get("brand") || "";
  const model = searchParams.get("model") || "";
  const operatingSystem = searchParams.get("operatingSystem") || "";
  const storageCapacity = searchParams.get("storageCapacity") || "";
  const screenSize = searchParams.get("screenSize") || "";
  const cameraQuality = searchParams.get("cameraQuality") || "";
  const batteryLife = searchParams.get("batteryLife") || "";

  const filters = {
    minPrice,
    maxPrice,
    page,
    releaseDate,
    brand,
    model,
    operatingSystem,
    storageCapacity,
    screenSize,
    batteryLife,
    cameraQuality,
  };

  const {
    isLoading,
    data: { data = [], meta: { total = 0 } = {} } = {},
    isFetching,
  } = useGetSmartphonesQuery(filters);

  const [rowSelection, setRowSelection] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteSelectedSmartphones, { status }] =
    useDeleteSelectedSmartphonesMutation();

  const ids = Object.keys(rowSelection);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    getRowId: (originalRow) => originalRow._id,
  });

  const handleDeleteAlert = () => {
    if (ids.length === 0 || status === "pending") return;
    setAlertOpen(true);
  };

  const handleDelete = async () => {
    if (ids.length === 0 || status === "pending") return;
    const toastId = toast.loading("loading...", { duration: 500000 });
    const res = await deleteSelectedSmartphones({ ids });
    toast.dismiss(toastId);
    if ("data" in res) {
      toast.success(res.data.message);
      setRowSelection({});
    } else {
      const err = (res.error as ErrorResponse)?.data?.errorMessage;
      toast.error(err || "Something went wrong!");
      console.log(res.error);
    }
  };

  useRefetchToast(isFetching, isLoading);

  const handlePageChange = (page: number) => {
    setSearchParams((pre) => {
      const search = new URLSearchParams(pre);
      search.set("page", page.toString());
      return search;
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading className="min-h-[calc(100vh-200px)]" />
      ) : (
        <div className="w-full mb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="destructive"
              disabled={ids.length === 0 || status === "pending"}
              onClick={handleDeleteAlert}
              className="w-min mb-5"
              type="button"
            >
              Delete Selected
            </Button>
            <SmartphoneFilter {...filters} />
          </div>
          <div
            className={`rounded-md mb-4 border${
              isFetching ? " opacity-60" : ""
            }`}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            page={page}
            onPageChange={handlePageChange}
            total={total}
          />
        </div>
      )}
      <Alert
        open={alertOpen}
        onOpenChange={setAlertOpen}
        onAction={handleDelete}
        description="After delete it can't be undo"
      />
    </>
  );
};

export default SmartphoneList;
