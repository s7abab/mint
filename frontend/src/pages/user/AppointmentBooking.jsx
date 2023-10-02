import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSelectedCounselorForUser } from "../../redux/features/users/userActions";
import Layout from "../../components/Layout";
import { Card } from "antd";
import TimeSlots from "../../components/timeSlot/TimeSlots";

const AppointmentBooking = () => {
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.user.selectedCounselor);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForUser(counselorId));
  }, [dispatch, counselorId, user]);

  return (
    <Layout>
      <Card className="w-screen xs:w-2/3 lg:w-1/2 mx-auto mt-5 rounded-lg shadow-md h-[87vh] overflow-imp">
        <h1 className="text-3xl font-semibold mb-4">{counselor?.name}</h1>
        <p className="text-lg text-gray-600 mb-2">
          Specialization: {counselor?.category}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          Experience: {counselor?.experience} years
        </p>

        <TimeSlots counselorId={counselorId} />
      </Card>
    </Layout>
  );
};

export default AppointmentBooking;
