import { createSlice } from "@reduxjs/toolkit";
import Api from "../../../services/axios";
import { toast } from "react-hot-toast";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    selectedCategory: null,
  },
  reducers: {
    setCategories: (state, {payload}) => {
      state.categories = payload;
    },
    setSelectedCategory: (state, {payload}) => {
      state.selectedCategory = payload;
    },
  },
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;

// Featch categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await Api.get("/admin/category");
    dispatch(setCategories(res.data.categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Create category
export const createCategory = (newCategory) => async (dispatch) => {
  try {
    const res = await Api.post("/admin/category", { name: newCategory });
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(fetchCategories());
    }
  } catch (error) {
    console.log(error);
  }
};

// Edit category
export const editCategory = (categoryId, newName) => async (dispatch) => {
  try {
    const res = await Api.put(`/admin/category/${categoryId}`, {
      name: newName,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      dispatch(fetchCategories());
    }
  } catch (error) {
    console.log(error);
  }
};

// Unlist category
export const unlistCategory =
  (categoryId, currentValue) => async (dispatch) => {
    try {
      const res = await Api.patch(`/admin/category/${categoryId}`, {
        value: !currentValue,
      });

      if (res.data.success) {
        dispatch(fetchCategories());
        toast.success("Changed Category Listing");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error toggling category");
    }
  };

export default categorySlice;
