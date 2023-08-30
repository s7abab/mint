import React from "react";
import { useSelector} from "react-redux";
import Layout from "../Layout";
import { Loading } from "../Loading";

const UserAdmin = () => {
  const user = useSelector((state) => state.user.selectedUser);
  if(!user){
    return <Loading />
  }

  return (
    <>
     <Layout>
     <div className="w-full">
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {user[0].name}'s Profile
            </h3>
          </div>
          <div className="mb-5">
          {user[0].image ? (<img
                className="w-32 h-32 rounded-full mx-auto"
                src= {`http://localhost:8080${user[0].image}`}
                alt="John Doe"
              />) :(
                <img
                className="w-32 h-32 rounded-full mx-auto"
                src= "https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
                alt="John Doe"
              />
              )}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user[0].name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user[0].email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
     </Layout>
    </>
  );
};

export default UserAdmin;
