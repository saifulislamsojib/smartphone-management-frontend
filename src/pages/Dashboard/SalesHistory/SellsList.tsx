import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SellView } from "@/types/sell.type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns/format";

type Props = {
  data: SellView[];
  isFetching: boolean;
};

const columns: ColumnDef<SellView>[] = [
  {
    accessorKey: "smartphoneName",
    header: "Smartphone Name",
    cell: ({ row }) => (
      <div className={row.original.smartphoneInfo?.name ? "" : "italic"}>
        {row.original.smartphoneInfo?.name || "Smartphone deleted"}
      </div>
    ),
  },
  {
    accessorKey: "buyerName",
    header: "Buyer Name",
    cell: ({ row }) => <div>{row.getValue("buyerName")}</div>,
  },
  {
    accessorKey: "saleDate",
    header: "Sale Date",
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("saleDate")), "MM/dd/yyyy")}</div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.getValue("totalPrice"));

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Sell Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <div className={row.original.smartphoneInfo?.brand ? "" : "italic"}>
        {row.original.smartphoneInfo?.brand || "-----"}
      </div>
    ),
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div className={row.original.smartphoneInfo?.model ? "" : "italic"}>
        {row.original.smartphoneInfo?.model || "-----"}
      </div>
    ),
  },
];

const SellsList = ({ data, isFetching }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (originalRow) => originalRow._id,
  });

  return (
    <div className={`rounded-md my-5 border${isFetching ? " opacity-60" : ""}`}>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SellsList;
