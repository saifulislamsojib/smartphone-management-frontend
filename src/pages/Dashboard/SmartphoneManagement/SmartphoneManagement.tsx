import { Button } from "@/components/ui/button";
import useTitle from "@/hooks/useTitle";
import { useState } from "react";
import AddSmartphoneDialog from "./AddSmartphoneDialog";
import SmartphoneList from "./SmartphoneList";

const SmartphoneManagement = () => {
  useTitle("Smartphone Management");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-2xl">Smartphone Management</h2>
          <Button onClick={openModal}>Add A Smartphone</Button>
        </div>
        <SmartphoneList />
      </div>
      <AddSmartphoneDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default SmartphoneManagement;
