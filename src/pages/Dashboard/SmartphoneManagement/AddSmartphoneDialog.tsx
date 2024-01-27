import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddSmartphoneMutation } from "@/redux/features/smartphone/smartphoneApi";
import { ErrorResponse } from "@/types/common.type";
import { SmartPhonePayload } from "@/types/smartphone.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

const AddSmartphoneDialog = ({ modalOpen, setModalOpen }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SmartPhonePayload>();

  const [addSmartphone, { status }] = useAddSmartphoneMutation();

  const onSubmit: SubmitHandler<SmartPhonePayload> = async (data) => {
    if (status === "pending") return;
    const toastId = toast.loading("loading...");
    const res = await addSmartphone(data);
    if ("data" in res) {
      toast.success("Smartphone added successfully!", { id: toastId });
      reset();
      setModalOpen(false);
    } else {
      const err = (res.error as ErrorResponse)?.data?.errorMessage;
      toast.error(err || "Smartphone not added!", { id: toastId });
      console.log(res.error);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="w-[96%] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add a Smartphone</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          All field&apos;s are required.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className={`col-span-3${
                  errors.name
                    ? " focus-visible:ring-red-500 border-red-500"
                    : ""
                }`}
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
                className={`col-span-3${
                  errors.price
                    ? " focus-visible:ring-red-500 border-red-500"
                    : ""
                }`}
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
                  errors.brand
                    ? " focus-visible:ring-red-500 border-red-500"
                    : ""
                }`}
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
                  errors.model
                    ? " focus-visible:ring-red-500 border-red-500"
                    : ""
                }`}
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
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="screenSize" className="text-right">
                Screen Size
              </Label>
              <Input
                id="screenSize"
                type="number"
                className={`col-span-3${
                  errors.screenSize
                    ? " focus-visible:ring-red-500 border-red-500"
                    : ""
                }`}
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
                {...register("batteryLife", { required: true })}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="block ml-auto"
            disabled={status === "pending"}
          >
            Add Smartphone
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSmartphoneDialog;
