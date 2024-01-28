import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmartPhone } from "@/types/smartphone.type";

type Props = {
  smartPhone: SmartPhone;
  openModal: (id: string) => void;
};

const SingleSmartPhone = ({ smartPhone, openModal }: Props) => {
  const {
    brand,
    cameraQuality,
    model,
    name,
    price,
    quantity,
    storageCapacity,
    operatingSystem,
    batteryLife,
    _id,
  } = smartPhone;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          price: <span className="font-semibold text-indigo-500">${price}</span>
        </p>
        <h5 className="text-lg font-semibold mt-5 mb-2">
          Smartphone Information
        </h5>
        <p>Brand: {brand}</p>
        <p>Model: {model}</p>
        <p>Quantity: {quantity}</p>
        <p>Storage Capacity: {storageCapacity} GB</p>
        <p>Operating System: {operatingSystem}</p>
        <p>Camera Quality: {cameraQuality}</p>
        <p>Battery Life: {batteryLife}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => openModal(_id)}>Sell</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleSmartPhone;
