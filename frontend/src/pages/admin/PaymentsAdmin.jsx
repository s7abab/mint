import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWithdrawals,
  settlement,
} from "../../redux/features/admin/adminActions";
import BankDetailsAdmin from "../../components/Modals/BankDetailsAdmin";
import { NoDataMessage } from "../../components/Modals/NoDataMsg";

const PaymentsAdmin = () => {
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const withdrawalReq = useSelector((state) => state.admin.withdrawalReq);
  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, [dispatch]);

  const handleModal = () => {
    setModal(!isModal);
  };

  const handleSettlement = () => {
    dispatch(settlement(withdrawalReq[0]._id)).then(() => {
      handleModal();
      dispatch(fetchWithdrawals());
    });
  };

  const noDataMessage = (
    <div className="flex justify-center w-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Payment Requests</h1>
        <p className="text-center text-gray-500">
          You don't have any payment requests.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Layout>
        {withdrawalReq[0] ? (
          <div className="flex justify-center w-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
              <h1 className="text-2xl font-bold mb-4">Payment Requests</h1>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalReq.map((data) => (
                    <tr key={data._id}>
                      <td className="border px-4 py-2">{data.name}</td>
                      <td className="border px-4 py-2 text-center">
                        {data.wallet.balance}
                      </td>
                      <td className="border px-4 py-2 flex justify-center items-center">
                        {data.isWithdraw && (
                          <Button onClick={handleModal}>View</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <NoDataMessage message={"You don't have any payment requests."} />
        )}
        {isModal && (
          <BankDetailsAdmin close={handleModal} confirm={handleSettlement} />
        )}
      </Layout>
    </>
  );
};

export default PaymentsAdmin;
