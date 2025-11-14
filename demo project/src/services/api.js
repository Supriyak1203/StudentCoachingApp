import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getCourses = () => {
  const user = localStorage.getItem("user");
  if (!user) throw new Error("User not logged in");
  const token = JSON.parse(user).token;

  return api.get("/courses/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addCourse = (data) => {
  const user = localStorage.getItem("user");
  if (!user) throw new Error("User not logged in");
  const token = JSON.parse(user).token;

  return api.post("/courses", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Fetch student's attendance (JWT email)
export const getAttendance = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return api.get(`/attendance/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Add attendance (admin)
export const addAttendance = (data) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  return api.post(`/attendance`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
