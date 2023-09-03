import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedCounselor,
  updateCounselorProfile,
  uploadCounselorProfilePhoto,
} from "../../redux/features/counselor/counselorActions";
import Layout from "../Layout";
import { Form, Col, Input, Row } from "antd";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import { Loading } from "../Loading";

const CounselorCounselor = () => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state?.counselor?.selectedCounselor);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(user ? user.timings[0]: "00:00");
  const [endTime, setEndTime] = useState(user? user.timings[1]: "00:00"); 

  useEffect(() => {
    if (counselorId !== null) {
      dispatch(fetchSelectedCounselor(counselorId)).then(() => {
        setIsLoading(false);
      });
    }
    if (file) {
      dispatch(uploadCounselorProfilePhoto(file, counselorId));
    }
  }, [dispatch, counselorId, file]);

  const onFinishHandler = (values) => {
    dispatch(
      updateCounselorProfile({
        values: {
          ...values,
          timings: [startTime, endTime],
        },
        counselorId: counselorId,
      })
    );
  };

  // const handleTimeChange = (time, timeString) => {
  //   console.log(time);
  //   const startTime = moment(timeString[0], "HH:mm").format("HH:mm");
  //   const endTime = moment(timeString[1], "HH:mm").format("HH:mm");
  //   setStartTime(startTime);
  //   setEndTime(endTime);
  // };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="overflow-y-auto">
        {/* Profile Photo */}
        <div className="w-full mx-auto mt-5 p-6  rounded-lg ">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src={`http://localhost:8080${user?.image}`}
                alt="Profile Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-70 transition duration-300 opacity-0 hover:opacity-100">
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-white"
                >
                  Change Photo
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    name="image"
                    accept="image/*"
                    id="photo-upload"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Photo */}
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="m-3"
          initialValues={{
            ...user,
          }}
        >
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fullname"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="category"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fee"
                name="fee"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8} className="mb-4">
              <label
                htmlFor="startTime"
                className="text-lg font-medium text-gray-700"
              >
                Start Time:
              </label>
              <input
                id="startTime"
                type="time"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-gray-700"
              />
            </Col>
            <Col xs={24} md={24} lg={8} className="mb-4">
              <label
                htmlFor="endTime"
                className="text-lg font-medium text-gray-700"
              >
                End Time:
              </label>
              <input
                id="endTime"
                type="time"
                name="endtime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-gray-700"
              />
            </Col>
          </Row>
          <Button className="" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CounselorCounselor;
