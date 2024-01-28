import {
  useDeleteSelectedSmartphonesMutation,
  useGetSmartphonesQuery,
} from "@/redux/features/smartphone/smartphoneApi";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ErrorResponse } from "@/types/common.type";
import { SmartPhone } from "@/types/smartphone.type";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "model",
      header: "Model",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("model")}</div>
      ),
    },
    {
      accessorKey: "operatingSystem",
      header: "Operating System",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("operatingSystem")}</div>
      ),
    },
    {
      accessorKey: "storageCapacity",
      header: "Storage",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("storageCapacity")} GB</div>
      ),
    },
    {
      accessorKey: "screenSize",
      header: "Screen Size",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("screenSize")} Inch</div>
      ),
    },
    {
      accessorKey: "cameraQuality",
      header: "Camera",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cameraQuality")}</div>
      ),
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
  const maxPrice = Number(searchParams.get("maxPrice")) || 500000;
  let releaseDate: string | undefined = searchParams.get("releaseDate")!;
  releaseDate = releaseDate
    ? new Date(releaseDate).toISOString().split("T")[0]
    : undefined;
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const operatingSystem = searchParams.get("operatingSystem");
  const storageCapacity = searchParams.get("storageCapacity");
  const screenSize = searchParams.get("screenSize");
  const cameraQuality = searchParams.get("cameraQuality");
  const batteryLife = searchParams.get("batteryLife");

  const {
    isLoading,
    data: { data = [] } = {},
    isFetching,
  } = useGetSmartphonesQuery({
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
  });

  const [rowSelection, setRowSelection] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteSelectedSmartphones, { status }] =
    useDeleteSelectedSmartphonesMutation();

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const ids = Object.keys(rowSelection);

  const formRef = useRef<HTMLFormElement>(null);

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

  const handleFilter = () => {
    const getValue = (name: string) => formRef.current?.[name]?.value;
    setSearchParams((pre) => {
      const filter = new URLSearchParams(pre);
      if (priceRange[0] || priceRange[0] === 0) {
        filter.set("minPrice", priceRange[0].toString());
      } else {
        filter.delete("minPrice");
      }
      if (priceRange[1]) {
        filter.set("maxPrice", priceRange[1].toString());
      } else {
        filter.delete("maxPrice");
      }
      const releaseDate = getValue("releaseDate");
      if (releaseDate) {
        filter.set("releaseDate", releaseDate);
      } else {
        filter.delete("releaseDate");
      }
      const brand = getValue("brand");
      if (brand) {
        filter.set("brand", brand);
      } else {
        filter.delete("brand");
      }
      const model = getValue("model");
      if (model) {
        filter.set("model", model);
      } else {
        filter.delete("model");
      }
      const operatingSystem = getValue("operatingSystem");
      if (operatingSystem) {
        filter.set("operatingSystem", operatingSystem);
      } else {
        filter.delete("operatingSystem");
      }
      const storageCapacity = getValue("storageCapacity");
      if (storageCapacity) {
        filter.set("storageCapacity", storageCapacity);
      } else {
        filter.delete("storageCapacity");
      }
      const screenSize = getValue("screenSize");
      if (screenSize) {
        filter.set("screenSize", screenSize);
      } else {
        filter.delete("screenSize");
      }
      const cameraQuality = getValue("cameraQuality");
      if (cameraQuality) {
        filter.set("cameraQuality", cameraQuality);
      } else {
        filter.delete("cameraQuality");
      }
      const batteryLife = getValue("batteryLife");
      if (batteryLife) {
        filter.set("batteryLife", batteryLife);
      } else {
        filter.delete("batteryLife");
      }

      return filter;
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading className="min-h-[calc(100vh-200px)]" />
      ) : (
        <div className="w-full">
          <form ref={formRef}>
            {/* <div className="flex items-center py-4">
              <Input placeholder="Search" className="max-w-96" />
            </div> */}
            <div className="mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
              <div className="pr-5">
                <Label htmlFor="price" className="mb-2 inline-block">
                  Price Range
                </Label>
                <Slider
                  value={priceRange}
                  min={0}
                  max={500000}
                  step={500}
                  className="max-w-[400px]"
                  showThumbValue
                  minStepsBetweenThumbs={1}
                  onValueChange={setPriceRange}
                />
              </div>
              <div>
                <Label htmlFor="releaseDate" className="mb-2 inline-block">
                  Release Date
                </Label>
                <Input type="date" name="releaseDate" id="releaseDate" />
              </div>
              <div>
                <Label htmlFor="brand" className="mb-2 inline-block">
                  Brand
                </Label>
                <Input name="brand" id="brand" />
              </div>
              <div>
                <Label htmlFor="model" className="mb-2 inline-block">
                  Model
                </Label>
                <Input name="model" id="model" />
              </div>
              <div>
                <Label htmlFor="operatingSystem" className="mb-2 inline-block">
                  Operating System
                </Label>
                <Input name="operatingSystem" id="operatingSystem" />
              </div>
              <div>
                <Label htmlFor="storageCapacity" className="mb-2 inline-block">
                  Storage Capacity
                </Label>
                <Input
                  type="number"
                  name="storageCapacity"
                  id="storageCapacity"
                />
              </div>
              <div>
                <Label htmlFor="screenSize" className="mb-2 inline-block">
                  Screen Size
                </Label>
                <Input name="screenSize" id="screenSize" type="number" />
              </div>
              <div>
                <Label htmlFor="cameraQuality" className="mb-2 inline-block">
                  Camera Quality
                </Label>
                <Input name="cameraQuality" id="cameraQuality" />
              </div>
              <div>
                <Label htmlFor="batteryLife" className="mb-2 inline-block">
                  Battery Life
                </Label>
                <Input name="batteryLife" id="batteryLife" />
              </div>
              <div>
                <Button onClick={handleFilter} type="button" className="mt-6">
                  Filter
                </Button>
              </div>
            </div>
            <Button
              variant="destructive"
              disabled={ids.length === 0 || status === "pending"}
              onClick={handleDeleteAlert}
              className="w-min mb-5"
              type="button"
            >
              Delete Selected
            </Button>
          </form>
          <div
            className={`rounded-md border${isFetching ? " opacity-70" : ""}`}
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              After delete it can&apos;t be undo
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SmartphoneList;
