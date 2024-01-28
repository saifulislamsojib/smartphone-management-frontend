import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { cn } from "@/lib/utils";

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showThumbValue?: boolean;
  }
>(({ className, showThumbValue, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
      {
        "mt-11": showThumbValue,
      }
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {(props.value || props.defaultValue)?.map((number, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {showThumbValue && (
          <span className="absolute -top-[33px] right-[50%] min-w-[32px] h-[32px] text-center translate-x-1/2 text-sm bg-[#212121] text-white px-2 py-1 pt-[0.4rem] rounded-full after:absolute after:w-0 after:h-0 after:right-[50%] after:translate-x-1/2 after:z-[-1000] range-slider-arrow">
            {number?.toLocaleString() || "?"}
          </span>
        )}
      </SliderPrimitive.Thumb>
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
