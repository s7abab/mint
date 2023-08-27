import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCounselors } from "../../redux/features/users/counselorsSlice";
import CounselorCard from "../../components/card/CounselorCard";
import { Select, Option, Input } from "@material-tailwind/react";
import { fetchCategories } from "../../redux/features/category/categorySlice";

const ViewAllCounselors = () => {
  const dispatch = useDispatch();
  const counselors = useSelector((state) => state.counselors.counselors);
  const categories = useSelector((state) => state.category.categories);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllCounselors());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCounselors = counselors
    .filter((data) => !data.isBlocked)
    .filter((data) => {
      // Filter by category if a category is selected
      if (category) {
        return data.category === category;
      }
      return true;
    })
    .filter((data) => {
      // Filter by search query if a search query is provided
      if (searchQuery) {
        const counselorName = data.name.toLowerCase();
        return counselorName.includes(searchQuery.toLowerCase());
      }
      return true;
    });

  return (
    <>
      <Layout>
        <div>
          <div className="flex gap-2 m-2">
            <Select onChange={(e) => setCategory(e)} label="Specialization">
              <Option>All</Option>
              {categories.filter((category)=>category.active).map((category) => (
                <Option value={category.name} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              label="Search"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-10 mx-2 justify-center">
            {filteredCounselors.map((data) => (
              <CounselorCard data={data} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewAllCounselors;
