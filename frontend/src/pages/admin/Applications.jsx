import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Api from "../../services/axios";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { BsViewStacked } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  // Handle View Profile
  const handleViewProfile = (counselorId) => {
    navigate(`/admin/applications/${counselorId}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("/admin/applications");
        if (res.data.success) {
          setApplications(res.data.applications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <>
          <Card className="w-screen mt-2">
            <List>
              {applications.map((data) => (
                <ListItem
                  key={data._id}
                  ripple={false}
                  className=" border-2"
                >
                  {data.name}
                  <ListItemSuffix onClick={() => handleViewProfile(data._id)}>
                    <BsViewStacked />
                    View
                    <IconButton variant="text" color="blue-gray"></IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        </>
      </Layout>
    </>
  );
};

export default ApplicationsPage;
