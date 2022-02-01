import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Holder from "../users/tableholder";
import { toast } from "react-toastify";
import moment from "moment";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { getNotifications } from "components/api";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { sendNotifications } from "components/api";

function Users() {
  const columns = [
    {
      Header: "",
      id: "row",
      maxWidth: 50,
      filterable: false,
      Cell: (index) => {
        return <div>{index.row.index + 1}</div>;
      },
    },
    { Header: "Type", accessor: "label_type", align: "left" },
    { Header: "Title", accessor: "title",Cell: ({ row, value }) => {
      const { original } = row;
      return <div title="Click to view more" style={{cursor:'pointer'}} onClick={()=>handleClickOpen(value, original.body)}>{value}</div>;
    }, },
    {
      Header: "Notification body",
      width: "10%",
      overflow: "scroll",
      accessor: "body",
      Cell: ({ row, value }) => {
        const { original } = row;
        const newbody = value.slice(0,20);
        return <div title="Click to view more" style={{cursor:'pointer'}} onClick={()=>handleClickOpen(original.title, value)}>{newbody}...</div>;
      },
    },

    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return <span>{moment(value).format("LLL")}</span>;
      },
    },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  const [users, setUsers] = useState([]);
  const rows = [...users];
  //console.log(rows, users);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({});
  const [sendNote, setSendNote] = useState(false);
  const [notebody, setNoteBody] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      fetchUsers(page, size);
    }
  }, [firstRun]);
  const handlePageClick = async (e) => {
    const newpage = e.selected;
    //console.log(newpage);
    setPage(newpage);
    fetchUsers(newpage, size);
  };
  const fetchUsers = async (page, size) => {
    setLoading(true);
    const userslist = await getNotifications(page, size);
    setLoading(false);
    if (userslist.status === 200) {
      //console.log(userslist.data.data);
      setUsers(userslist.data.data.content);
      setPageCount(userslist.data.data.total_pages);
      setTotal(userslist.data.data.total_elements);
      //console.log(userslist.data.data.total_elements);
    } else {
      toast.error("Unknown error Occured", {
        position: "bottom-left",
      });
    }
  };
  const changeSize = (pagesize) => {
      if(pagesize==""){
        return;
      }
    setSize(pagesize);
    fetchUsers(page, pagesize);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseForm = () => {
    setSendNote(!sendNote);
  };
  const handleClickOpen = (title,body) => {
    setModal({title,body});
    setOpen(true);
  };
  const handleSendNotification = async () => {
      toast.loading('Sending Notification....');
      setSendNote(false);
      const res = await sendNotifications(title,notebody);
      toast.dismiss();
      //console.log(res);
      if(res.status==200){
        toast.success('Notification sent successfully.');
      }
      else {
        toast.error(res?.data?.message||"An unknown error occured");
      }
  }
  return (
    <>
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <div style={{ display: "block" }}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                  Notifications
                </MDTypography>
                <div>
                  <MDButton variant="gradient" color="dark" onClick={handleCloseForm}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Send a new Notification
                  </MDButton>
                </div>
              </MDBox>
              {loading ? (
                <Holder />
              ) : (
                <DataTable
                  className="hidden"
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  isSorted={false}
                  size={size}
                  noEndBorder
                  entriesPerPage={false}
                  style={{ display: "none" }}
                  pagination={false}
                />
              )}
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<i className="fa fa-angle-double-right"></i>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={size}
                    pageCount={pageCount}
                    previousLabel={<i className="fa fa-angle-double-left"></i>}
                    containerClassName="pagination"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    renderOnZeroPageCount={false}
                  />
                </MDTypography>
                <MDBox
                  display="flex"
                  alignItems="center"
                  lineHeight={0}
                  justifyContent="space-between"
                >
                  <div>
                    <MDTypography variant="button" fontWeight="regular" color="text">
                      &nbsp;Showing <strong>{users.length} </strong> notifications of {total}
                    </MDTypography>
                  </div>
                  <div>
                    <select
                      className="select-size"
                      onChange={(e) => changeSize(e.target.value)}
                      value={size}
                    >
                     <option value="">Page Size</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </MDBox>
              </MDBox>
            </Card>
          </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {modal?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modal?.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={sendNote} onClose={handleCloseForm} fullWidth>
        <DialogTitle>Send Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Send notifications to user devices
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="notification"
            label="Notification Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <br/><br/>
          <TextField
            margin="dense"
            id="note"
            label="Notification Body"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setNoteBody(e.target.value)}
          />
          <MDBox display="flex" justifyContent="space-between" alignItems="center" p={0}>
            <p style={{fontSize:'10px'}}>Message has a limit of 1024 characters</p>
            <p style={{fontSize:'10px',color:notebody.length>1024?'red':'black'}}>{notebody.length}/1024</p>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button disabled={title==''||notebody==''||notebody.length>1024} onClick={handleSendNotification}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Users;
