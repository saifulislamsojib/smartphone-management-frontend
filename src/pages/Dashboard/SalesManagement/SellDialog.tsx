import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sell } from "@/types/sell.type";
import { SmartPhone } from "@/types/smartphone.type";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import InvoicePdfDoc from "./InvoicePdfDoc";
import SellForm from "./SellForm";

type Props = {
  modalOpen: boolean;
  onOpenChange: (value: boolean) => void;
  sellProductId: string | null;
  data: SmartPhone[];
};

const SellDialog = ({
  modalOpen,
  onOpenChange,
  sellProductId,
  data,
}: Props) => {
  const [sellInfo, setSellInfo] = useState<Sell | null>(null);

  const { name = "" } = sellInfo
    ? data.find((item) => item._id === sellInfo.smartphone) || {}
    : ({} as SmartPhone);

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    if (!value) {
      setSellInfo(null);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[96%] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {sellInfo ? (
          <>
            <DialogHeader>
              <DialogTitle className="mb-5 text-green-500">
                Smartphone Sell Successfully!
              </DialogTitle>
              <PDFDownloadLink
                document={
                  <InvoicePdfDoc sellInfo={sellInfo} smartphoneName={name} />
                }
                fileName="invoice.pdf"
              >
                {({ loading }) => (
                  <Button variant="outline" className="w-full">
                    {loading ? "Loading Invoice..." : "Download Invoice PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </DialogHeader>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Sell The Smartphone</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center">
              All field&apos;s are required.
            </DialogDescription>
            <SellForm sellProductId={sellProductId} setSellInfo={setSellInfo} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
