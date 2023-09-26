import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedCounselorForUser } from "../../redux/features/users/userActions";

const CounselorUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { counselorId } = useParams();
  useEffect(() => {
    dispatch(fetchSelectedCounselorForUser(counselorId));
  }, [dispatch]);

  const counselor = useSelector((state) => state.user.selectedCounselor);

  if (!counselor) {
    return <Loading />;
  }

  return (
    <>
      <div className=" w-screen h-1/2 flex justify-center ">
        <div className="w-96 m-2 mt-8 py-10 b border-2 border-white object-cover object-center shadow-xl shadow-blue-gray-900/50 rounded-2xl">
          <div className="flex justify-center">
            {counselor?.image ? (
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={`${import.meta.env.VITE_BACKEND_URL}${counselor?.image}`}
                alt="John Doe"
              />
            ) : (
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
                alt="John Doe"
              />
            )}
          </div>
          <div className="flex justify-center mt-4 text-lg font-bold">
            <h1>{counselor?.name}</h1>
          </div>

          <div className="mt-2 mx-10 text-center">
            <p className="text-gray-700 mt-2">
              {counselor?.category} Specialist
            </p>
            <p className="mt-4 text-gray-700 ">
              Experience: {counselor?.experience}
            </p>
            <p className="text-gray-700 mt-2">Fee: {counselor?.fee}</p>
          </div>
          <div className="flex justify-center mt-10 gap-8">
            <Button
              onClick={() => navigate(`/book-appointment/${counselorId}`)}
              className="w-28"
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounselorUser;
