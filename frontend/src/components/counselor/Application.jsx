import React, { useState } from "react";
import Layout from "../Layout";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Api from "../../services/axios";
import toast from "react-hot-toast";

const Application = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/counselor/apply", {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        address,
        specialization,
        experience,
        fee,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("by", error);
    }
  };
  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-screen w-screen">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Apply as counselor
            </Typography>
            <form
              onSubmit={handleApply}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-2">
                <Input
                  onChange={(e) => setFirstname(e.target.value)}
                  size="md"
                  label="Firstname"
                />
                <Input
                  onChange={(e) => setLastname(e.target.value)}
                  size="md"
                  label="Lastname"
                />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  label="Email"
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  size="md"
                  type="password"
                  label="Password"
                />
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="md"
                  type="password"
                  label="Confirm Password"
                />
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  size="md"
                  label="Address"
                />
                <Input
                  onChange={(e) => setSpecialization(e.target.value)}
                  size="md"
                  label="Specialization"
                />
                <Input
                  onChange={(e) => setExperience(e.target.value)}
                  size="md"
                  label="Experince"
                />
                <Input
                  onChange={(e) => setFee(e.target.value)}
                  size="md"
                  label="Fee"
                />
              </div>

              <Button type="submit" className="mt-6" fullWidth>
                Register
              </Button>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Application;
