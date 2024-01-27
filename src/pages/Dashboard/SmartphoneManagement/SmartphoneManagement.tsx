import { Button } from "@/components/ui/button";
import useTitle from "@/hooks/useTitle";
import { SmartPhone } from "@/types/smartphone.type";
import { useState } from "react";
import AddSmartphoneDialog from "./AddSmartphoneDialog";
import SmartphoneList from "./SmartphoneList";

const SmartphoneManagement = () => {
  useTitle("Smartphone Management");
  const [modalOpen, setModalOpen] = useState(false);
  const [editInfo, setEditInfo] = useState<SmartPhone | null>(null);

  const openModal = () => setModalOpen(true);

  const handleEditModal = (editInfo: SmartPhone) => {
    setEditInfo(editInfo);
    setModalOpen(true);
  };

  const handleOpenChange = (value: boolean) => {
    setModalOpen(value);
    if (!value) {
      setEditInfo(null);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-2xl">Smartphone Management</h2>
          <Button onClick={openModal}>Add A Smartphone</Button>
        </div>
        <SmartphoneList handleEditModal={handleEditModal} />
      </div>
      <AddSmartphoneDialog
        modalOpen={modalOpen}
        onOpenChange={handleOpenChange}
        editInfo={editInfo}
      />
    </>
  );
};

export default SmartphoneManagement;
