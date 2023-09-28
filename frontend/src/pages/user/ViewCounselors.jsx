import React, { Suspense, lazy, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Select, Option, Input } from "@material-tailwind/react";
import { fetchCategories } from "../../redux/features/category/categorySlice";
import {
  searchCounselor,
} from "../../redux/features/users/userActions";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
const CounselorCard = lazy(() => import("../../components/card/CounselorCard"));
import { Loading } from "../../components/Loading";

const UserViewCounselors = () => {
  const dispatch = useDispatch();
  let debounceTimeout;
  const searchCounselors = useSelector((state) => state.user.searchCounselors);
  const totalPages = useSelector((state) => state.user.totalPages);
  const categories = useSelector((state) => state.category.categories);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setActive(1);
      handleSearch(newValue);
    }, 400);
  };
  const handleSearch = (query) => {
    dispatch(searchCounselor({ search: query, page: 1, category }));
  };
  const handleCategory = (value) => {
    setCategory(value)
    dispatch(searchCounselor({ search: query, page: 1, category: value }));
  };
  useEffect(() => {
    dispatch(searchCounselor({ search: query, page: active, category }));
    dispatch(fetchCategories());
  }, [dispatch, active, query, category]);
  // Pagination
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });
  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };
  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <>
      <Layout>
        <div className="w-screen">
          <div className="sm:flex gap-2 m-4 top-20 bg-white sticky z-10">
            <Select onChange={handleCategory} label="Specialization">
              <Option>All</Option>
              {categories
                .filter((category) => category.active)
                .map((category) => (
                  <Option value={category.name} key={category._id}>
                    {category.name}
                  </Option>
                ))}
            </Select>
            <Input onChange={handleChange} label="Search" />
          </div>
          <div>
            <div className="flex flex-wrap gap-5 mt-6 mx-2 justify-center ">
              <Suspense fallback={<Loading />}>
                {searchCounselors.map((data) => (
                  <CounselorCard key={data._id} data={data} />
                ))}
              </Suspense>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
              </Button>
              <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
              <IconButton key={index} {...getItemProps(index + 1)}>
                {index + 1}
              </IconButton>
            ))}
              </div>
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
              >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserViewCounselors;
