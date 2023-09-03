import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button } from "@material-tailwind/react";
import CreateSlot from "../../components/counselor/CreateSlot";
import ScheduledSlots from "../../components/counselor/ScheduledSlots";

const SlotsPage = () => {
     
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <Layout>
        <div className="w-screen">
          <Button className="" size="md" onClick={handleClick}>
            Create Time Slot
          </Button>
          {isModal && <CreateSlot close={setIsModal} />}
          <div className="">
            <ScheduledSlots />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SlotsPage;
