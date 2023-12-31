import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button } from "@material-tailwind/react";
import CreateSlot from "../../components/timeSlot/CreateSlot";
import ScheduledSlots from "../../components/timeSlot/ScheduledSlots";

const Slots = () => {
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <Layout>
        <div className="w-screen">
          <Button className="mt-10 mx-2" onClick={handleClick}>
            Create Time Slot
          </Button>
          {isModal && <CreateSlot close={handleClick} />}
          <div className="">
            <ScheduledSlots />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Slots;
