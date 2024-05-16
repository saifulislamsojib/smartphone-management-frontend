import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddSellMutation } from "@/redux/features/sell/sellApi";
import { ErrorResponse } from "@/types/common.type";
import { Sell, SellPayload } from "@/types/sell.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  sellProductId: string | null;
  setSellInfo: (info: Sell) => void;
};

const SellForm = ({ sellProductId, setSellInfo }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SellPayload>({
    defaultValues: {
      saleDate: new Date().toISOString()?.split("T")?.[0],
    },
  });

  const [addSell, { status }] = useAddSellMutation();

  const fetching = status === "pending";

  const onSubmit: SubmitHandler<SellPayload> = async (data) => {
    if (fetching) return;
    const toastId = toast.loading("loading...", { duration: 500000 });
    const res = await addSell({ ...data, smartphone: sellProductId! });
    toast.dismiss(toastId);
    if ("data" in res) {
      toast.success(res.data.message || "Sell the smartphone successfully!");
      reset();
      setSellInfo(res.data.data);
    } else {
      const err = (res.error as ErrorResponse)?.data?.errorMessage;
      toast.error(err || "Something went wrong!");
      console.log(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            className={`col-span-3${
              errors.quantity
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            type="number"
            {...register("quantity", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="buyerName" className="text-right">
            Buyer name
          </Label>
          <Input
            id="buyerName"
            className={`col-span-3${
              errors.buyerName
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            {...register("buyerName", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="saleDate" className="text-right">
            Sale date
          </Label>
          <Input
            id="saleDate"
            className={`col-span-3${
              errors.saleDate
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            type="date"
            {...register("saleDate", { required: true })}
          />
        </div>
      </div>
      <Button type="submit" className="block ml-auto" disabled={fetching}>
        Sell
      </Button>
    </form>
  );
};

export default SellForm;
