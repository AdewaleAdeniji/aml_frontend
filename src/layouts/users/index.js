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
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { IconButton, Table } from "@mui/material";
import Holder from "./tableholder";
import { toast } from "react-toastify";
import moment from "moment";
import "./pagination.css";
import { getUsers } from "components/api";
import MDTypography from "components/MDTypography";
import { getProfile } from "components/api";

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
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "User Hash", accessor: "user_hash" },
    {
      Header: "Verification Status",
      accessor: "status",
      align: "center",
      Cell: ({ value }) => {
        return value === "11"
          ? "Failed"
          : value === "10"
          ? "Approved"
          : "Pending";
      },
    },
    { Header: "Message", accessor: "message" },
    {
      Header: "Webhook Status",
      accessor: "webhooked",
      Cell: ({ value }) => {
        return value === "0" ? "Webhook Called" : "Webhook Call Pending";
      },
    },
  ];

  const [users, setRecords] = useState([]);
  const rows = [...users];
  //console.log(rows, users);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(rows.length || 500);
  const [firstRun, setFirstRun] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      fetchRecords(page, size);
    }
  }, [firstRun]);
  const handlePageClick = async (e) => {
    const newpage = e.selected;
    //console.log(newpage);
    setPage(newpage);
    fetchRecords(newpage, size);
  };
  const fetchRecords = async (page, size) => {
    setLoading(true);
    const records = await getProfile();
    //console.log(records);

    setLoading(false);
    if (records.status === 200) {
      setRecords(records?.data?.data?.content?.amls);
    } else {
      toast.error("Error occured while fetching records");
    }
  };
  const changeSize = (pagesize) => {
    if (pagesize == "") {
      return;
    }
    setSize(pagesize);
    fetchRecords(page, pagesize);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <div style={{ display: "block" }}>
            <Card>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <MDTypography variant="h6" gutterBottom>
                  Records
                </MDTypography>
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
              {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
                      &nbsp;Showing <strong>{users.length} </strong> users of {total}
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
              </MDBox> */}
            </Card>
          </div>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Users;
