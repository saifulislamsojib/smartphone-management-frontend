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
  const [isCreateVariant, setIsCreateVariant] = useState(false);

  const openModal = () => setModalOpen(true);

  const handleEditModal = (editInfo: SmartPhone) => {
    setEditInfo(editInfo);
    setModalOpen(true);
  };

  const handleCreateVariant = (editInfo: SmartPhone) => {
    handleEditModal(editInfo);
    setIsCreateVariant(true);
  };

  const handleOpenChange = (value: boolean) => {
    setModalOpen(value);
    if (!value) {
      setEditInfo(null);
      setIsCreateVariant(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-indigo-600">
            Smartphone Management
          </h2>
          <Button onClick={openModal}>Add A Smartphone</Button>
        </div>
        <SmartphoneList
          handleEditModal={handleEditModal}
          handleCreateVariant={handleCreateVariant}
        />
      </div>
      <AddSmartphoneDialog
        modalOpen={modalOpen}
        onOpenChange={handleOpenChange}
        editInfo={editInfo}
        isCreateVariant={isCreateVariant}
      />
    </>
  );
};

export default SmartphoneManagement;
