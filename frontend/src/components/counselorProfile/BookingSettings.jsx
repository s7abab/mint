import React, { useEffect } from "react";
import Layout from "../Layout";
import { Col, Input, Row, Space, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedCounselor,
  updateTime,
} from "../../redux/features/counselor/counselorActions";
import moment from "moment";
import { DatePicker, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "@material-tailwind/react";

const BookingSettings = () => {
  const dispatch = useDispatch();
  const counselorId = useSelector((state) => state.auth._id);
  const user = useSelector((state) => state.counselor.selectedCounselor);

  // Handle time change
  const handleTimeChange = (time, timeString) => {
    console.log(timeString);
    const startTime = moment(timeString[0], "HH:mm").format("HH:mm");
    const endTime = moment(timeString[1], "HH:mm").format("HH:mm");
    dispatch(updateTime({ timings: [startTime, endTime], counselorId }));
  };

  useEffect(() => {
    if (counselorId !== null) {
      dispatch(fetchSelectedCounselor(counselorId));
    }
  }, [dispatch, counselorId]);
  return (
    <>
      <Layout>
        <div>
          <h1 className="text-xl text-center mt-10 mb-10 underline">
            Manage Profile
          </h1>
          {/* Profile Photo */}
          <Form
            layout="vertical"
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
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>
            <Button className="" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default BookingSettings;
