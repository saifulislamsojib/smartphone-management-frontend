import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SmartPhone } from "@/types/smartphone.type";
import AddSmartphoneForm from "./AddSmartphoneForm";

type Props = {
  modalOpen: boolean;
  onOpenChange: (value: boolean) => void;
  editInfo?: SmartPhone | null;
  isCreateVariant?: boolean;
};

const AddSmartphoneDialog = ({
  modalOpen,
  onOpenChange,
  editInfo,
  isCreateVariant,
}: Props) => {
  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[96%] max-w-[600px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {isCreateVariant ? "Edit & Add a" : editInfo ? "Edit" : "Add a"}{" "}
            Smartphone
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          All field&apos;s are required.
        </DialogDescription>
        <AddSmartphoneForm
          onOpenChange={onOpenChange}
          editInfo={editInfo}
          isCreateVariant={isCreateVariant}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddSmartphoneDialog;
