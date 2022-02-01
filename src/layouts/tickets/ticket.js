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
import "../users/pagination.css";
import { useLocation, useNavigate } from "react-router";
import profilesListData from "layouts/profile/data/profilesListData";
import ProfilesList from "examples/Lists/ProfilesList";
import { getTickets } from "components/api";
import TicketLoader from "./ticketlistloader";
import MessageLoader from "./messagelistloader";
import './ticket.css';
import { getTicket, sendMessage } from "components/api";
import Messages from "./components";

function SupportTicket(props) {
  const history = useLocation();
  const navigate = useNavigate();
  const [ticketid, setTicketID] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ticketloading, setTicketLoading] = useState(false);
  const [ticket, setTicket] = useState([]);

  //console.log(history.pathname);
  let path = history?.pathname;
  if (!path) {
    navigate("/tickets");
  }
  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      const newpath = path.split("/");
      setTicketID(newpath[newpath.length - 1]);
      fetchTicketDetails();
      openTicket(newpath[newpath.length - 1]);
    }
  }, [firstRun]);
  const openTicket = async (id,noreload) => {
      setTicketID(id);
    //console.log(id);
    if(!noreload){
        setTicketLoading(true);
    }
    const ticketdetails = await getTicket(id);
    //console.log(ticketdetails);
    setTicketLoading(false);
    if(ticketdetails.status===200){
        setTicket((ticketdetails.data.data.content).reverse())
    }
    else {
        toast.error('Ticket not found');
    }
  }
  const fetchTicketDetails = async () => {
    setLoading(true);
    const tickets = await getTickets(0, 10);
    //console.log(tickets)
    if (tickets.status === 200) {
      setTickets(tickets.data.data.content);
    }
    setLoading(false);
  };
  const sendMsg = async (message) => {
      const send = await sendMessage(message,ticketid);
      if(send.status===200){
          await openTicket(ticketid,true);
          return true;
      }
      else {
          return false;
      }
  }
  //console.log(apps);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <div className="tickets-list">
            <MDBox display="flex" justifyContent="space-between" p={3}>
              <Grid item xs={4} xl={4} sm={6}>
                {loading && <TicketLoader />}
                {!loading && (
                  <ProfilesList title="conversations" profiles={tickets} shadow={false} openTicket={openTicket}/>
                )}
              </Grid>
              <Grid item xs={8} xl={8}>
                {loading||ticketloading ? <MessageLoader /> :
                 (<Messages tickets={ticket} sendMessage={sendMsg}/>)}
              </Grid>
            </MDBox>
          </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default SupportTicket;
