import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  editCategory,
  fetchCategories,
  unlistCategory,
} from "../../redux/features/category/categorySlice";

const CategoryPage = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  // Handle create
  const handleCreate = (e) => {
    e.preventDefault();
    setModal(!modal);
    dispatch(createCategory(newCategory));
  };
  // Handle edit
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editCategory(categoryId, newCategory));
    setEditModal(!editModal);
  };

  // Handle unlist
  const handleUnlist = (e, category) => {
    console.log(category)
    e.preventDefault();
    dispatch(unlistCategory(category._id, category.active));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Card className="h-full w-full overflow-scroll mt-10">
          <Button onClick={() => setModal(!modal)} className="w-44 mb-5">
            Add new category
          </Button>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Category Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    onClick={() => setCategoryId(categoryId)}
                  >
                    Edit
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Unlist
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {category.name}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      onClick={() => {
                        setEditModal(!editModal);
                        setCategoryId(category._id);
                      }}
                      variant="small"
                      color="blue-gray"
                      className="font-normal cursor-pointer"
                    >
                      Edit
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      onClick={(e)=>handleUnlist(e,category)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal cursor-pointer"
                    >
                      {category.active?"Unlist": "List"}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        {modal && (
          <div className="flex justify-center items-center fixed inset-0">
            <Card
              className=" bg-gray-200 p-5"
              color="transparent"
              shadow={false}
            >
              <p onClick={() => setModal(!modal)} className="cursor-pointer">
                X
              </p>
              <form
                onSubmit={handleCreate}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="Category Name"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button type="submit" fullWidth>
                    Add
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
        {editModal && (
          <div className="flex justify-center items-center fixed inset-0">
            <Card
              className=" bg-gray-200 p-5"
              color="transparent"
              shadow={false}
            >
              <p
                onClick={() => setEditModal(!editModal)}
                className="cursor-pointer"
              >
                X
              </p>
              <form
                onSubmit={handleEdit}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    onChange={(e) => setNewCategory(e.target.value)}
                    size="lg"
                    label="Edit Category"
                  />
                  <Button type="submit" fullWidth>
                    Add
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </Layout>
    </>
  );
};

export default CategoryPage;
