import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { TotalbookingsCounselor } from "../../components/dashboard/TotalbookingsCounselor";
import { TotalProfit } from "../../c../../components/dashboard/TotalProfit"
import { useDispatch, useSelector } from "react-redux";
import { getBookingData, getProfitDataForCounselor } from "../../redux/features/dashboard/dashboardActions";

const CounselorDashboard = () => {
  const dispatch = useDispatch()
  const bookings = useSelector(state=>state.dashboard?.bookingsData)
  const monthlyProfits = useSelector(state=>state.dashboard?.monthlyProfits)
  useEffect(()=>{
    dispatch(getProfitDataForCounselor())
    dispatch(getBookingData())
  },[])
  return (
    <Layout>
      <div className="h-screen w-screen overflow-x-hidden p-4 ">
        <div className="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md mb-4">
          <div className="w-full md:w-1/2 bg-gray-900 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-3xl font-semibold mb-2">
              Total Profit
            </h1>
            <h2 className="text-4xl font-semibold text-white">₹140,000</h2>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            {monthlyProfits &&
            <TotalProfit monthlyProfits={monthlyProfits} />
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md mb-4">
          <div className="w-full md:w-1/2 bg-gray-200 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-semibold mb-2 text-gray-900">Total Bookings</h1>
            <h2 className="text-4xl font-semibold text-gray-900">{bookings?.totalBookings}</h2>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <TotalbookingsCounselor bookings={bookings} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CounselorDashboard;
