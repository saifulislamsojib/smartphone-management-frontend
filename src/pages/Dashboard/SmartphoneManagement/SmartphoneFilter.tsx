import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { FormEvent, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SmartphoneFilterProps = {
  minPrice: number;
  maxPrice: number;
  page: number;
  releaseDate: string | undefined;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: string;
  screenSize: string;
  batteryLife: string;
  cameraQuality: string;
};

const SmartphoneFilter = ({
  minPrice,
  maxPrice,
  releaseDate,
  brand,
  model,
  operatingSystem,
  storageCapacity,
  screenSize,
  batteryLife,
  cameraQuality,
}: SmartphoneFilterProps) => {
  const [, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const fromRef = useRef<HTMLFormElement>(null);

  const handleClear = () => {
    setSearchParams({});
    setPriceRange([0, 50000]);
    fromRef.current?.reset?.();
  };

  const handleFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getValue = (name: string) =>
      (event.target as HTMLFormElement)?.[name]?.value;
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
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-indigo-700">Filtering Smartphone</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Smartphone</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleFilter}
          ref={fromRef}
          className="mt-5 grid grid-cols-1 gap-3 items-center"
        >
          <div className="pr-5 ps-2">
            <Label htmlFor="price" className="mb-2 inline-block">
              Price Range
            </Label>
            <Slider
              value={priceRange}
              min={0}
              max={50000}
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
            <Input
              type="date"
              name="releaseDate"
              id="releaseDate"
              defaultValue={releaseDate}
            />
          </div>
          <div>
            <Label htmlFor="brand" className="mb-2 inline-block">
              Brand
            </Label>
            <Input name="brand" id="brand" defaultValue={brand} />
          </div>
          <div>
            <Label htmlFor="model" className="mb-2 inline-block">
              Model
            </Label>
            <Input name="model" id="model" defaultValue={model} />
          </div>
          <div>
            <Label htmlFor="operatingSystem" className="mb-2 inline-block">
              Operating System
            </Label>
            <Input
              name="operatingSystem"
              id="operatingSystem"
              defaultValue={operatingSystem}
            />
          </div>
          <div>
            <Label htmlFor="storageCapacity" className="mb-2 inline-block">
              Storage Capacity
            </Label>
            <Input
              type="number"
              name="storageCapacity"
              id="storageCapacity"
              defaultValue={storageCapacity}
            />
          </div>
          <div>
            <Label htmlFor="screenSize" className="mb-2 inline-block">
              Screen Size
            </Label>
            <Input
              name="screenSize"
              id="screenSize"
              type="number"
              defaultValue={screenSize}
            />
          </div>
          <div>
            <Label htmlFor="cameraQuality" className="mb-2 inline-block">
              Camera Quality
            </Label>
            <Input
              name="cameraQuality"
              id="cameraQuality"
              defaultValue={cameraQuality}
            />
          </div>
          <div>
            <Label htmlFor="batteryLife" className="mb-2 inline-block">
              Battery Life
            </Label>
            <Input
              name="batteryLife"
              id="batteryLife"
              defaultValue={batteryLife}
            />
          </div>
          <div className="mt-5 flex items-center justify-between gap-2">
            <SheetClose asChild>
              <Button type="submit">Filter</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button onClick={handleClear} type="button" variant="outline">
                Clear Filter
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SmartphoneFilter;
