/* eslint-disable jsx-a11y/alt-text */

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
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import moment from "moment";
import MDTypography from "components/MDTypography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useEffect, useState } from "react";
import './pagination.css';
import { switchApps } from "components/api";

function Apps() {
  const [firstRun, setFirstRun] = useState(true);
  const [apps, setApps] = useState([]);
  const [clientApps, setClientApps] = useState({});
  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      fetchApps();
    }
  }, [firstRun]);
  const fetchApps = () => {
    const client_apps = localStorage.getItem("client_apps");
    setClientApps(JSON.parse(client_apps));
    if (client_apps) {
      const appss = JSON.parse(client_apps).apps || [];
      setApps(appss);
    } else {
      window.location.href = "/logout";
    }
  };
  const switchApp = async (app) => {
      //console.log(app);
    clientApps.current_app = app;
    toast.loading('Switching app to '+app.app_name+'....');
    const res = await switchApps(app.client_id);
    toast.dismiss()
    //console.log(res);
    if(res.status===200){
        //console.log(res.data.data);
        const appsdata = res.data.data;
      //console.log(appsdata)
      localStorage.setItem('client_apps',JSON.stringify(appsdata));
      localStorage.setItem('current_app_client_id',appsdata?.current_app?.client_id||'storebounty');
      localStorage.setItem('authT',res.data.token);

      toast.success('Switched successfully to '+app.app_name)
      setTimeout(()=>window.location.href="/dashboard",1200);

    }
    else {
        toast.error('Error occured while trying to switch app');
    }
    //localStorage.setItem('client_apps',JSON.stringify(clientApps));
    //localStorage.setItem('current_app_client_id',app.client_id);
  }
  //console.log(apps);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <div className="apps-list">
              {
                  apps.map((app)=>{
                      return (
                          <Card sx={{ maxWidth: 345,padding:'10px' }}>
                            <CardActionArea>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  {app.app_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <a href={`https://${app.domain}`} target="_blank">{app.domain}</a>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button size="small" color="primary" outline onClick={()=>switchApp(app)}>
                                Open {app.app_name}
                              </Button>
                            </CardActions>
                          </Card>


                      )
                  })
              }
              </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Apps;
