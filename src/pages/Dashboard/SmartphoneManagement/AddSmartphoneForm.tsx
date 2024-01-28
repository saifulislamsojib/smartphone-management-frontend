import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddSmartphoneMutation,
  useEditSmartphoneMutation,
} from "@/redux/features/smartphone/smartphoneApi";
import { type ErrorResponse, type Response } from "@/types/common.type";
import {
  type SmartPhone,
  type SmartPhonePayload,
} from "@/types/smartphone.type";
import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  onOpenChange: (value: boolean) => void;
  editInfo?: SmartPhone | null;
  isCreateVariant?: boolean;
};

const AddSmartphoneForm = ({
  onOpenChange,
  editInfo,
  isCreateVariant,
}: Props) => {
  const formPayload = {} as { defaultValues?: SmartPhonePayload };
  if (editInfo) {
    const copyOfEditInfo = { ...editInfo } as Partial<SmartPhone>;
    delete copyOfEditInfo._id;
    delete copyOfEditInfo.createdBy;
    delete copyOfEditInfo.createdAt;
    delete copyOfEditInfo.updatedAt;

    formPayload.defaultValues = {
      ...(copyOfEditInfo as SmartPhonePayload),
      releaseDate: new Date(editInfo.releaseDate).toISOString().split("T")[0],
    };
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SmartPhonePayload>(formPayload);

  const [addSmartphone, { status }] = useAddSmartphoneMutation();
  const [editSmartphone, { status: editStatus }] = useEditSmartphoneMutation();

  const fetching = status === "pending" || editStatus === "pending";

  const onSubmit: SubmitHandler<SmartPhonePayload> = async (data) => {
    if (fetching) return;
    const toastId = toast.loading("loading...", { duration: 500000 });
    let res:
      | {
          data: Response<SmartPhone>;
        }
      | {
          error: FetchBaseQueryError | SerializedError;
        }
      | undefined;

    if (editInfo && !isCreateVariant) {
      res = await editSmartphone({ id: editInfo._id, ...data });
    } else {
      res = await addSmartphone(data);
    }
    toast.dismiss(toastId);
    if ("data" in res) {
      toast.success(res.data.message);
      reset();
      onOpenChange(false);
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
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            className={`col-span-3${
              errors.name ? " focus-visible:ring-red-500 border-red-500" : ""
            }`}
            defaultValue={editInfo?.name}
            {...register("name", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            step={0.01}
            className={`col-span-3${
              errors.price ? " focus-visible:ring-red-500 border-red-500" : ""
            }`}
            defaultValue={editInfo?.price}
            {...register("price", { required: true })}
          />
        </div>
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
            defaultValue={editInfo?.quantity}
            {...register("quantity", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="releaseDate" className="text-right">
            Release Date
          </Label>
          <Input
            id="releaseDate"
            className={`col-span-3${
              errors.releaseDate
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            type="date"
            defaultValue={
              editInfo?.releaseDate
                ? new Date(editInfo?.releaseDate).toISOString().split("T")[0]
                : undefined
            }
            {...register("releaseDate", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="brand" className="text-right">
            Brand
          </Label>
          <Input
            id="brand"
            className={`col-span-3${
              errors.brand ? " focus-visible:ring-red-500 border-red-500" : ""
            }`}
            defaultValue={editInfo?.brand}
            {...register("brand", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="model" className="text-right">
            Model
          </Label>
          <Input
            id="model"
            className={`col-span-3${
              errors.model ? " focus-visible:ring-red-500 border-red-500" : ""
            }`}
            defaultValue={editInfo?.model}
            {...register("model", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="operatingSystem" className="text-right">
            Operating System
          </Label>
          <Input
            id="operatingSystem"
            className={`col-span-3${
              errors.operatingSystem
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            {...register("operatingSystem", { required: true })}
            defaultValue={editInfo?.operatingSystem}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="storageCapacity" className="text-right">
            Storage Capacity
          </Label>
          <Input
            id="storageCapacity"
            type="number"
            className={`col-span-3${
              errors.storageCapacity
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            {...register("storageCapacity", { required: true })}
            defaultValue={editInfo?.storageCapacity}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="screenSize" className="text-right">
            Screen Size
          </Label>
          <Input
            id="screenSize"
            type="number"
            step={0.01}
            className={`col-span-3${
              errors.screenSize
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            defaultValue={editInfo?.screenSize}
            {...register("screenSize", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cameraQuality" className="text-right">
            Camera Quality
          </Label>
          <Input
            id="cameraQuality"
            className={`col-span-3${
              errors.cameraQuality
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            defaultValue={editInfo?.cameraQuality}
            {...register("cameraQuality", { required: true })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="batteryLife" className="text-right">
            Battery Life
          </Label>
          <Input
            id="batteryLife"
            className={`col-span-3${
              errors.batteryLife
                ? " focus-visible:ring-red-500 border-red-500"
                : ""
            }`}
            defaultValue={editInfo?.batteryLife}
            {...register("batteryLife", { required: true })}
          />
        </div>
      </div>
      <Button type="submit" className="block ml-auto" disabled={fetching}>
        {isCreateVariant ? "Edit & Add" : editInfo ? "Edit" : "Add"} Smartphone
      </Button>
    </form>
  );
};

export default AddSmartphoneForm;
