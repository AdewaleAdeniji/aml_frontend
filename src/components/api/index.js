import axios from "axios";
import config from "../../config";

const token = localStorage.getItem("authT");
const client_id = localStorage.getItem("current_app_client_id") || "";

const PR = (response) => {
  //console.log(response?.status);
  if (response?.status === 401) {
    // eslint-disable-next-line no-return-assign
    return (window.location.href = "/logout");
  }
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export const login = async (email, password) => {
  try {
    const payload = { email, password };
    const res = await axios.post(`${config.base_url}/accounts/api/v1/auth/admin/token`, payload);
    return res;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err;
  }
};
export const getUsers = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/report/users?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getAdmins = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/report/admins?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getBusinesses = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/report/businesses?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getNotifications = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/support/notifications?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getStats = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/report/stats?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getTickets = async (page, size) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/support/tickets?page=${page}&size=${size}`,
    token
  );
  return PR(res);
};
export const getTicket = async (id) => {
  const res = await getter(
    `${config.base_url}/accounts/api/v1/support/tickets/${id}/messages`,
    token
  );
  return PR(res);
};
export const sendNotifications = async (title, body) => {
  const payload = { title, body };
  const res = await poster(
    `${config.base_url}/accounts/api/v1/support/notification/send`,
    payload,
    token
  );
  return PR(res);
};
export const sendMessage = async (message,id) => {
  const payload = { message };
  const res = await poster(
    `${config.base_url}/accounts/api/v1/support/tickets/${id}/reply`,
    payload,
    token
  );
  return PR(res);
};
export const switchApps = async (clientId) => {
  const payload = { client_id: clientId };
  const res = await poster(
    `${config.base_url}/accounts/api/v1/auth/admin/token/exchange`,
    payload,
    token
  );
  return PR(res);
};
export const poster = async (url, payload, token) => {
  try {
    const post = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${token}`, clientId: client_id },
    });
    return post;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err.response;
  }
};
export const getter = async (url, token) => {
  //console.log(url, token);
  try {
    const post = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}`, clientId: client_id },
    });
    return post;
  } catch (err) {
    if (err?.response) {
      return err?.response;
    }
    return err;
  }
};
