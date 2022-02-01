
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Holder from "../users/tableholder";
import { toast } from "react-toastify";
import moment from "moment";
import "../users/pagination.css";
import MDTypography from "components/MDTypography";
import { getAdmins } from "components/api";
import { getTickets } from "components/api";
import { Link } from "react-router-dom";

function Tickets() {
  const columns = [
    {
      Header: "",
      id: "row",
      Cell: (index) => {
        return <div>{index.row.index + 1}</div>;
      },
    },
    { Header: "Category", accessor: "category"},
    { Header: "Subject", accessor: "subject"},
    {
      Header: "Created Date",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return <span>{moment(value).format("LLL")}</span>;
      },
    },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Action", Cell: ({ row }) => {
        const {original} = row;
        return <Link to={`/ticket/${original.id}`}>Open Ticket</Link>;
      }
    }
  ];

  const [tickets, setTickets] = useState([]);
  const rows = [...tickets];
  //console.log(rows, users);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      fetchTickets(page, size);
    }
  }, [firstRun]);
  const handlePageClick = async (e) => {
    const newpage = e.selected;
    setPage(newpage);
    fetchTickets(newpage, size);
  };
  const fetchTickets = async (page, size) => {
    setLoading(true);
    const userslist = await getTickets(page, size);
    setLoading(false);
    if (userslist.status === 200) {
      //console.log(userslist.data.data);
      setTickets(userslist.data.data.content);
      setPageCount(userslist.data.data.total_pages);
      setTotal(userslist.data.data.total_elements);
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
          fetchTickets(page, pagesize);

  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <div style={{ display: "block" }}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <MDTypography variant="h6" gutterBottom>
                 Support Tickets
                </MDTypography>
              </MDBox>
              {
                  loading ? (
                    <Holder/>
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
                      &nbsp;Showing <strong>{tickets.length} </strong> tickets of {total}
                    </MDTypography>
                  </div>
                  <div>
                    <select className="select-size" onChange={(e)=>changeSize(e.target.value)} value={size}>
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
  );
}

export default Tickets;
