import axios from 'axios';


const apiService = {
  register: async (username, password) => {
    return axios.post(`http://localhost:3001/api/auth/register`, { username, password });
  },
  login: async (username, password) => {
    return axios.post(`http://localhost:3001/api/auth/login`, { username, password });
  },
  createTask: async (token, taskData) => {
    return axios.post(`http://localhost:3001/api/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  updateTask: async (token, taskId, taskData) => {
    return axios.put(`http://localhost:3001/api/tasks/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  deleteTask: async (token, taskId) => {
    return axios.delete(`http://localhost:3001/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  getTasks: async (token) => {
    return axios.get(`http://localhost:3001/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default apiService;
