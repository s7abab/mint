import React, { useEffect, useMemo } from "react";
import Layout from "../../components/Layout";
import { TotalProfit } from "../../components/dashboard/TotalProfit";
import { TotalUsers } from "../../components/dashboard/TotalUsers";
import { TotalCounselors } from "../../components/dashboard/TotalCounselors";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfitDataForAdmin,
  getTotalCounselors,
  getTotalUsers,
} from "../../redux/features/dashboard/dashboardActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.dashboard?.usersData);
  const counselors = useSelector((state) => state.dashboard?.counselorsData);
  const monthlyProfits = useSelector(
    (state) => state.dashboard?.monthlyProfits
  );

  useEffect(() => {
    dispatch(getProfitDataForAdmin());
    dispatch(getTotalUsers());
    dispatch(getTotalCounselors());
  }, [dispatch]);

  // Calculate the total profit using useMemo
  const totalProfit = useMemo(() => {
    if (monthlyProfits) {
      return monthlyProfits.reduce((acc, profitData) => acc + profitData.profit, 0);
    }
    return 0;
  }, [monthlyProfits]);

  return (
    <Layout>
      <div className="h-screen w-screen overflow-x-hidden p-4 ">
        <div className="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md mb-4">
          <div className=" w-full md:w-1/2 bg-gray-900 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-3xl font-semibold mb-2">
              Total Profit
            </h1>
            <h2 className="text-4xl font-semibold text-white">
              {totalProfit}
            </h2>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            {monthlyProfits && <TotalProfit monthlyProfits={monthlyProfits} />}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-4 bg-white rounded-lg shadow-md">
          <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <TotalUsers users={users} />
          </div>
          <div className="w-full md:w-1/2 bg-[#43436b] h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-3xl font-semibold mb-2">
              Total Users
            </h1>
            <h2 className="text-4xl font-semibold text-white text-center">
              {users?.totalUsers}
            </h2>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-4 bg-white rounded-lg shadow-md">
          <div className="w-full md:w-1/2 bg-gray-900 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-3xl font-semibold mb-2">
              Total Counselors
            </h1>
            <h2 className="text-4xl font-semibold text-white">
              {counselors?.totalCounselors}
            </h2>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-lg p-6 flex flex-col justify-center items-center text-center">
            <TotalCounselors counselors={counselors} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
