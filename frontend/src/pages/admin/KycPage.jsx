import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllKycs } from "../../redux/features/admin/adminActions";
import ViewKycModal from "../../components/Modals/ViewKycModal";
import {NoDataMessage} from "../../components/Modals/NoDataMsg"

const PaymentsAdmin = () => {
  const kycs = useSelector((state) => state.admin?.kycs);
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const [kyc, setKyc] = useState("");

  const handleModal = () => {
    setModal(!isModal);
  };

  useEffect(() => {
    dispatch(fetchAllKycs());
  }, [dispatch]);
  return (
    <>
      <Layout>
        {!kycs ? (
          <div className="flex justify-center w-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
              <h1 className="text-2xl font-bold mb-4">Kyc Requests</h1>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Document</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kycs?.map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {data?.counselorId?.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {data?.document}
                      </td>
                      <td className="border px-4 py-2 flex justify-center items-center">
                        <Button
                          onClick={() => {
                            setKyc(data);
                            handleModal();
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <NoDataMessage message={"You don't have any kyc requests."} />
        )}
        {isModal && <ViewKycModal close={handleModal} kyc={kyc} />}
      </Layout>
    </>
  );
};

export default PaymentsAdmin;
