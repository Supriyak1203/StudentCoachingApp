import axios from "axios";

const API_BASE = "http://localhost:8080";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAssignmentsForUser = () => {
  return axios.get(`${API_BASE}/assignments/user`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
};

export const createAssignment = (assignment) => {
  return axios.post(`${API_BASE}/assignments`, assignment, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
};

export const submitAssignment = (id) => {
  return axios.post(`${API_BASE}/assignments/submit/${id}`, null, {
    headers: {
      ...authHeaders(),
    },
  });
};

export const deleteAssignment = (id) => {
  return axios.delete(`${API_BASE}/assignments/${id}`, {
    headers: { ...authHeaders() },
  });
};

export const updateAssignment = (id, payload) => {
  return axios.put(`${API_BASE}/assignments/${id}`, payload, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
};
