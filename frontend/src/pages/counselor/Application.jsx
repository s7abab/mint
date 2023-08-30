import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/category/categorySlice";
import { applyAsCounselor } from "../../redux/features/counselor/counselorsSlice";
import VerifyCounselorOTP from "../../components/VerifyCounselorOTP";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        applyAsCounselor({
          name,
          email,
          password,
          confirmPassword,
          address,
          specialization,
          experience,
          fee,
        })
      );
      if (res.payload.success) {
        console.log(res.payload);
        toast.success(res.payload.message);
        setModal(!modal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Close Modal
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Layout sidebar={true}>
        <div className="flex  justify-center mt-10 h-screen w-screen">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Apply as counselor
            </Typography>
            <form
              onSubmit={handleApply}
              className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-2">
                <Input
                  onChange={(e) => setName(e.target.value)}
                  size="md"
                  label="Name"
                  required
                />
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  size="md"
                  label="Email"
                  required
                />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  size="md"
                  type="password"
                  label="Password"
                  required
                />
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="md"
                  type="password"
                  label="Confirm Password"
                  required
                />
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  size="md"
                  label="Address"
                  required
                />
                <Select
                  label="Specialization"
                  value={specialization}
                  onChange={(e)=> setSpecialization(e)}
                  required
                >
                  {categories
                    .filter((category) => category.active)
                    .map((category) => (
                      <Option  value={category.name} key={category._id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
                <Input
                  onChange={(e) => setExperience(e.target.value)}
                  size="md"
                  label="Experince"
                  required
                />
                <Input
                  onChange={(e) => setFee(e.target.value)}
                  size="md"
                  label="Fee"
                  required
                />
              </div>

              <Button type="submit" className="mt-6" fullWidth>
                {email ? "Send otp" : "Apply"}
              </Button>
            </form>
          </Card>
        </div>
        {modal && <VerifyCounselorOTP closeModal={closeModal} email={email} />}
      </Layout>
    </>
  );
};

export default Application;
