import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSelectedCounselorForUser } from "../../redux/features/users/userActions";
import Layout from "../../components/Layout";
import { Button, Card, Space } from "antd";
import moment from "moment";
import TimeSlots from "../../components/user/TimeSlots";

const BookingPage = () => {
  const [note, setNote] = useState("");
  const [modal, setModal] = useState(false);
  const { counselorId } = useParams();
  const dispatch = useDispatch();
  const counselor = useSelector((state) => state.counselor.selectedCounselor);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSelectedCounselorForUser(counselorId));
  }, [dispatch, counselorId, user]);

  // ================= Handle Close ==============

  return (
    <Layout>
      <Card className="w-full md:w-2/3 lg:w-1/2 mx-auto mt-5 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">{counselor?.name}</h1>
        <p className="text-lg text-gray-600 mb-2">
          Specialization: {counselor?.category}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          Experience: {counselor?.experience} years
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Timings:{" "}
          {counselor
            ? moment(counselor.timings[0], "HH:mm").format("hh:mm A")
            : ""}{" "}
          -{" "}
          {counselor
            ? moment(counselor.timings[1], "HH:mm").format("hh:mm A")
            : ""}
        </p>

        {/* <Space direction="vertical" size={20}>
          <DatePicker
            className="w-full"
            placeholder="Select a date"
            value={date}
            onChange={(value) => setDate(value)}
            format="YYYY-MM-DD"
            disabled={!counselor}
          /> */}
        {/* </Space> */}

        <TimeSlots counselorId={counselorId} />
      </Card>
    </Layout>
  );
};

export default BookingPage;
