import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SellForm from "./SellForm";

type Props = {
  modalOpen: boolean;
  onOpenChange: (value: boolean) => void;
  sellProductId: string | null;
};

const SellDialog = ({ modalOpen, onOpenChange, sellProductId }: Props) => {
  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[96%] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Sell The Smartphone</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          All field&apos;s are required.
        </DialogDescription>
        <SellForm onOpenChange={onOpenChange} sellProductId={sellProductId} />
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
