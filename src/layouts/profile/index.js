/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import './style.css';

// @mui icons
import Icon from "@mui/material/Icon";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import { toast } from "react-toastify";
// Images
import { useSelector } from "react-redux";
import { saveWebhookUrl } from "components/api";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { saveUser } from "redux/user";

function Overview() {
  const dispatch = useDispatch();
  const user = useSelector((user)=>user.user.user);
  const [editWebhook, setEditWebhook] = useState(false);
  const [webhook, setWebhook] = useState(user?.webhook_url);
  const edithook = async () =>{
    if(editWebhook){
      await saveWebhook();
    }
    setEditWebhook(!editWebhook);
  }
  const saveWebhook = async () => {
    toast.loading('Saving Webhook..');
      const res = await saveWebhookUrl(user?.secret_key,webhook);
      toast.dismiss();
      if(res.status===200){
        const newuser = {...user};
        newuser.webhook_url = webhook;
        setWebhook(webhook);
        dispatch(saveUser(JSON.stringify(newuser)));
        toast.success('Webhook Updated Successfully');
      }
      else {
        toast.warning('Webhook update failed');
      }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={user?.company_name}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={6}>
              <ProfileInfoCard
                title="profile information"
                info={{
                  companyName: user?.company_name,
                  companyEmail: user?.company_email,
                  location: "Nigeria",
                  APICalls:user?.api_calls,
                  apiKey:user?.secret_key
                }}
                social={[
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Webhook URL
        </MDTypography>
              <div className="webhook_area">
              <input type="text" value={webhook} onChange={(e)=>setWebhook(e.target.value)} className="webhook_url" disabled={!editWebhook}/>
              <MDButton variant={editWebhook ? "contained" : "outlined"} color="info" onClick={edithook}>{editWebhook ? 'Save' : 'Edit'}</MDButton>
             
              </div>
            </Grid>
          </Grid>
        </MDBox>
       
        </Header>
    </DashboardLayout>
  );
}

export default Overview;
