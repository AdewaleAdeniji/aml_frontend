import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Businesses from "layouts/users/businesses";
import Admins from "layouts/users/admins";
import Apps from "layouts/users/apps";

// @mui icons
import Icon from "@mui/material/Icon";
import { Logout } from "layouts/authentication/logout";
import Tickets from "layouts/tickets";
import SupportTicket from "layouts/tickets/ticket";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    shownav:true,
    admin:true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">people_outline</Icon>,
    route: "/users",
    component: <Users />,
    shownav:true,
    admin:true
  },
  {
    type: "collapse",
    name: "Businesses",
    key: "businesses",
    icon: <Icon fontSize="small">store</Icon>,
    route: "/businesses",
    component: <Businesses/>,
    shownav:true,
    admin:true
  },
  {
    type: "collapse",
    name: "Admin Users",
    key: "admin-users",
    icon: <Icon fontSize="small">people_outline</Icon>,
    route: "/admin-users",
    component: <Admins />,
    shownav:true,
    admin:true
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    shownav:true,
    admin:true
  },
  {
    type: "collapse",
    name: "Tickets",
    key: "tickets",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/tickets",
    component:<Tickets/>,
    shownav:true,
    admin:true
  },
  {
    type: "collapse",
    name: "Tickets",
    key: "tickets",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/ticket/:id",
    component:<SupportTicket/>,
  }, 
   {
    type: "collapse",
    name: "Apps",
    key: "apps",
    icon: <Icon fontSize="small">apps</Icon>,
    route: "/apps",
    component: <Apps/>,
    admin:true
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/logout",
    component: <Logout/>,
    shownav:true,
    admin:true
  }
  
];

export default routes;
