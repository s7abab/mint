import { Button, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeedback,
  fetchAllBookings,
} from "../../redux/features/users/userActions";

const FeedbackModal = ({ close, bookingId, selectedBook }) => {
  const [rating, setRating] = useState(
    (selectedBook && selectedBook?.rating) || ""
  );
  const [feedback, setFeedback] = useState(
    (selectedBook && selectedBook?.feedback) || ""
  );
  const dispatch = useDispatch();
  const handleRating = (i) => {
    setRating(i);
  };
  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };
  // Submitting feedback
  const handleSubmit = () => {
    dispatch(addFeedback({ bookingId, rating, feedback })).then(() => {
      dispatch(fetchAllBookings());
      close();
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          onClick={() => handleRating(i)} // Pass the value 'i' when the star is clicked
          className={`w-4 h-4 cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <div className="flex">
          <p className="cursor-pointer" onClick={close}>
            X
          </p>
          <h2 className="mx-5 text-2xl font-semibold mb-4">Feedback</h2>
        </div>
        <form>
          <label
            htmlFor="date"
            className="block text-gray-600 font-medium mb-1"
          >
            Feedback
          </label>
          <Textarea
            type="text"
            onChange={handleFeedback}
            value={feedback}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <label
            htmlFor="text"
            className="block text-gray-600 font-medium mt-1"
          >
            Rating
          </label>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars()}
          </div>
          <Button onClick={handleSubmit} className="mt-3">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
